import { exit } from "node:process";

import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage";
import writeConfig from "./writeConfig.js";

const optionDefinitions = [
  {
    name: "help",
    type: Boolean,
    alias: "h",
    description: "Print this usage guide.",
  },
  {
    name: "verbose",
    type: Boolean,
    alias: "v",
    defaultValue: false,
    description: "Print debugging output.",
  },
  {
    name: "config",
    type: String,
    alias: "c",
    description:
      "Path to the JSON configuration file. (default: ./config.jsonc)",
    defaultValue: "./config.jsonc",
    typeLabel: "<file.json[c,5]>",
  },
  {
    name: "writeConfig",
    type: Boolean,
    alias: "w",
    description:
      "Write a default configuration file to the current directory and exit.",
  },
  {
    name: "message",
    type: String,
    alias: "m",
    description: "The message to post with the image.",
    defaultValue: "",
    typeLabel: "<message>",
  },
];

const args = commandLineArgs(optionDefinitions);

if (args.help) {
  const usage = commandLineUsage([
    {
      header: "Fediverse Image Bot",
      content:
        "A bot that posts images from a local directory to the Fediverse.",
    },
    {
      header: "Options",
      optionList: optionDefinitions,
    },
    {
      content:
        "Project home: {underline https://git.froth.zone/Sam/fediverse-imagebot}",
    },
  ]);
  console.log(usage);
  exit(0);
}

if (args.verbose) console.log("Running in verbose mode.\n");

if (args.writeConfig) {
  writeConfig(args.verbose).then(() => {
    console.log("Wrote default config file to ./config.jsonc");
    exit(0);
  });
}

export default args;
