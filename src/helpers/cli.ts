import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage";
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
            content: "A bot that posts images from a local directory to the Fediverse."
        },
        {
            header: "Options",
            optionList: optionDefinitions
        },
        {
            content: "Project home: {underline https://git.froth.zone/Sam/fediverse-imagebot}"
        }
    ]);
    console.log(usage);
    exit(0);
}

if (args.verbose) {
    console.log("Running in verbose mode.\n");
}


export default args;