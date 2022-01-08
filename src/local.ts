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
        description: "Path to the JSON configuration file. (default: ./config.json)",
        defaultValue: "./config.json",
        typeLabel: "<file.json>"
    },
    {
        name: "directory",
        type: String,
        alias: "d",
        description: "The directory of images to upload. (default: ./images)",
        defaultValue: "./images",
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

if (args.verbose) {
    console.log("Running in verbose mode.");
    console.log();
}

// JSON object read from config file
const data = JSON.parse(fs.readFileSync("./config.json", "utf8"));

const sfw_files = fs.readdirSync(args.directory + "/sfw");
const nsfw_files = fs.readdirSync(args.directory + "/nsfw");
const random = Math.floor(Math.random() * (sfw_files.length + nsfw_files.length));

// Get image from directory and mark it as sensitive if it's in the nsfw directory
let image: fs.ReadStream;
let sensitivity: boolean;
if (random >= sfw_files.length) {
    // Image is NSFW, mark it sensitive
    image = fs.createReadStream(args.directory + "/nsfw/" + nsfw_files[ random - sfw_files.length ])
        .on("error", (err: Error) => {
            console.error("Error reading image from NSFW directory: " + err.message);
            if (args.verbose) {
                console.error("--BEGIN FULL ERROR--");
                console.error(err);
            } else 
                console.error("Run with -v to see the full error.");
            exit(1);
        });
    sensitivity = true;
}
else {
    // Image is SFW, mark it not sensitive
    image = fs.createReadStream(args.directory + "/sfw/" + sfw_files[ random ])
        .on("error", (err: Error) => {
            console.error("Error reading image from SFW directory:" + err.message);
            if (args.verbose) {
                console.error("--BEGIN FULL ERROR--");
                console.error(err);
            } else 
                console.error("Run with -v to see the full error.");
            exit(1);
        });
    sensitivity = false;
}

const client = generator(data.type, data.instance, data.accessToken);
client.uploadMedia(image).then((res: Response<Entity.Attachment>) => {
    if (args.verbose)
        console.log(res.data);
    client.postStatus(args.message, {
        media_ids: [ res.data.id ],
        visibility: "unlisted",
        sensitive: sensitivity
    }
    ).then((res: Response<Entity.Status>) => {
        console.log("Successfully posted to " + data.instance);
        if (args.verbose) 
            console.log(res.data);
        exit(0);
    }
    ).catch((err: Error) => {
        console.error("Error posting to " + data.instance + ": " + err.message);
        if (args.verbose) {
            console.error("--BEGIN FULL ERROR--");
            console.error(err);
        } else 
            console.error("Run with -v to see the full error.");
    }
    );
}).catch((err: Error) => {
    console.error("Error uploading image to " + data.instance + ": " + err.message);
    if (args.verbose) {
        console.error("--BEGIN FULL ERROR--");
        console.error(err);
    } else 
        console.error("Run with -v to see the full error.");
    exit(1);
});

