import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage";
import * as fs from "fs";
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
        name: "directory",
        type: String,
        alias: "d",
        description: "The directory of images for the bot to post.",
        defaultValue: "./images",
        typeLabel: "<files>"
    },
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

const data = JSON.parse(fs.readFileSync("./config.json", "utf8"));
console.log(data);
