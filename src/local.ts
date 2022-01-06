#!/usr/bin/env node
import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage";
import * as fs from "fs";
import generator, { Entity, Response } from "megalodon";
import { exit } from "process";



const optionDefinitions = [
    {
        name: "help",
        type: Boolean,
        alias: "h",
        description: "Print this usage guide."
    },
    {
        name: "verbose",
        type: Boolean,
        alias: "v",
        description: "Print debugging output."
    },
    {
        name: "config",
        type: String,
        alias: "c",
        description: "Path to the configuration file. (default: ./config.json)",
        defaultValue: "./config.json",
        typeLabel: "<file>"
    },
    {
        name: "sfw_directory",
        type: String,
        alias: "s",
        description: "The directory of (SFW) images for the bot to post. (default: ./sfw)",
        defaultValue: "./images/sfw",
        typeLabel: "<folder>"
    },
    {
        name: "nsfw_directory",
        type: String,
        alias: "n",
        description: "The directory of (NSFW) images for the bot to post. If it chooses these, they will be marked sensitive. (default: ./nsfw)",
        defaultValue: "./images/nsfw",
        typeLabel: "<folder>"
    },
    {
        name: "message",
        type: String,
        alias: "m",
        description: "The message to post with the image.",
        defaultValue: "",
        typeLabel: "<message>"
    }
];

const args = commandLineArgs(optionDefinitions);

if (args.help) {
    const usage = commandLineUsage([
        {
            header: "Fediverse Image Bot",
            content: "A bot that posts images from a directory to the Fediverse."
        },
        {
            header: "Options",
            optionList: optionDefinitions
        },
        {
            content: "Project home: {underline https://git.freecumextremist.com/NotSam/fediverse-imagebot}"
        }
    ]);
    console.log(usage);
    exit(0);
}
// JSON object read from config file
const data = JSON.parse(fs.readFileSync("./config.json", "utf8"));

const sfw_files = fs.readdirSync(args.sfw_directory);
const nsfw_files = fs.readdirSync(args.nsfw_directory);
const random = Math.floor(Math.random() * (sfw_files.length + nsfw_files.length));

// Get image from directory and mark it as sensitive if it's in the nsfw directory
let image: fs.ReadStream;
let sensitive: boolean;
if (random >= sfw_files.length) {
    // Random Image is NSFW, mark it sensitive
    image = fs.createReadStream(args.nsfw_directory + "/" + nsfw_files[ random - sfw_files.length ]);
    sensitive = true;
}
else {
    // Image is SFW, mark it not sensitive
    image = fs.createReadStream(args.sfw_directory + "/" + sfw_files[ random ]);
    sensitive = false;
}
    
const client = generator(data.type, data.instance, data.accessToken);
client.uploadMedia(image).then((res: Response<Entity.Attachment>) => {
    client.postStatus(args.message, {
        media_ids: [ res.data.id ],
        visibility: "unlisted",
        sensitive: sensitive
    }
    ).then((res: Response<Entity.Status>) => {
        console.log("Successfully posted to " + data.instance);
        if (args.verbose) 
            console.log(console.log(res.data));
        exit(0);
    }
    ).catch((err: Error) => {
        console.error("Error posting to " + data.instance);
        console.error("Run with -v to see the full error.");
        if (args.verbose)
            console.error(err);
        exit(1);
    }
    );
}).catch((err: Error) => {
    console.error("Error uploading image to " + data.instance);
    console.error("Run with -v to see the full error.");
    if (args.verbose)
        console.error(err);
    exit(1);
});

