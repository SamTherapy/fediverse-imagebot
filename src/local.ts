import { createReadStream, ReadStream } from "fs";
import { readdir } from "fs/promises";
import { exit } from "process";

import args from "./helpers/cli";
import crashHandler from "./helpers/errors";
import post from "./post";

export default async function getLocalImage() {
    const sfw_files: string[] = await readdir(`${args.directory}/sfw`).catch(e => {
        crashHandler("Error reading SFW image directory.", e);
        return [];
    });
    const nsfw_files: string[] = await readdir(`${args.directory}/nsfw`).catch(e => {
        crashHandler("Error reading NSFW image directory.", e);
        return [];
    });
    const random = Math.floor(Math.random() * (sfw_files.length + nsfw_files.length));

    // Filler that is used to get a random file from the directories
    let image: ReadStream;
    let sensitivity: boolean;
    let file = "";

    if (random >= sfw_files.length) {
        // Image is NSFW, mark it sensitive
        file = `${args.directory}/nsfw/${nsfw_files[ random - sfw_files.length ]}`;
        image = createReadStream(file)
            .on("error", (err: Error) => {
                crashHandler(`Error reading file "${file}"`, err);
            });
        sensitivity = true;
    }
    else {
        // Image is SFW, mark it not sensitive
        file = `${args.directory}/sfw/${sfw_files[ random]}`;
        image = createReadStream(file)
            .on("error", (err: Error) => {
                crashHandler(`Error reading file "${file}"`, err);
            });
        sensitivity = false;
    }

    if (args.verbose) {
        console.error(`File being sent: ${file}`);
        console.error(`Sensitivity: ${sensitivity}`);
    }

    await post(image, sensitivity);
    exit(0);
}

getLocalImage();