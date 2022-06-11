import { createReadStream, ReadStream } from "fs";
import { readdir } from "fs/promises";
import { exit } from "process";
import args from "./helpers/args.js";
import crashHandler from "./helpers/crashHandler.js";
import { config } from "./helpers/types.js";
import postImage from "./postImage.js";

/**
 * Get a local image from the filesystem
 * @param conf Configuration object (see {@link config})
 * @calls postImage with the image it randomly selects from the local directory
 */
export default async function getLocalImage(conf: config) {
  // Get SFW directory
  const sfw_files: string[] = await readdir(`${conf.directory}/sfw`).catch(
    (e) => {
      crashHandler("Error reading SFW image directory.", e);
      return [];
    }
  );
  // Get NSFW directory
  const nsfw_files: string[] = await readdir(`${conf.directory}/nsfw`).catch(
    (e) => {
      crashHandler("Error reading NSFW image directory.", e);
      return [];
    }
  );
  const random = Math.floor(
    Math.random() * (sfw_files.length + nsfw_files.length)
  );

  // Filler that is used to get a random file from the directories
  let image: ReadStream;
  let sensitivity: boolean;
  let file: string;

  if (random >= sfw_files.length) {
    // Image is NSFW, mark it sensitive
    file = `${conf.directory}/nsfw/${nsfw_files[random - sfw_files.length]}`;
    image = createReadStream(file).on("error", (err: Error) => {
      crashHandler(`Error reading file "${file}"`, err);
    });
    sensitivity = true;
  } else {
    // Image is SFW, mark it not sensitive
    file = `${conf.directory}/sfw/${sfw_files[random]}`;
    image = createReadStream(file).on("error", (err: Error) => {
      crashHandler(`Error reading file "${file}"`, err);
    });
    sensitivity = false;
  }

  if (args.verbose) {
    console.log(`File being sent: ${file}`);
    console.log(`Sensitivity: ${sensitivity}`);
  }

  await postImage(image, sensitivity, conf);
  exit(0);
}
