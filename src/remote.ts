import { search } from "booru";
import Post from "booru/dist/structures/Post"; // Ce n'est pas bien
import { createReadStream, createWriteStream } from "fs";
import { unlink } from "fs/promises";
import got from "got-cjs";
import stream from "node:stream";
import { promisify } from "node:util";
import { exit } from "process";
import args from "./helpers/cli.js";
import crashHandler from "./helpers/error.js";
import { config } from "./helpers/types.js";
import postImage from "./post.js";

/**
 * Get a remote image from a booru
 *
 * Currently this also downloads the image locally but idc nmp it gets deleted
 * @param conf Configuration object (see {@link config})
 * @calls postImage with the image it randomly selects from the booru given
 */
export default async function getRemoteImage(conf: config) {
  const searchResults = await search(conf.booru, conf.tags, {
    limit: 1,
    random: true,
  }).catch((e) => {
    crashHandler("Error searching for posts.", e);
    return [] as Post[];
  });
  if (searchResults.length === 0) {
    crashHandler("Error searching for posts.", Error("No posts found."));
    return;
  }
  const post = searchResults[0];
  if (args.verbose) console.log(`Found post: ${post.id} at ${post.file_url}`);
  // Set the post as sensitive if the rating is not safe
  const sensitivity: boolean = post.rating !== "s";
  // Make an HTTP request for the image
  const filename: string = post.fileUrl?.split("/").pop() as string; // Type checks for type checks
  const pipeline = promisify(stream.pipeline);

  // Make the HTTP request as a stream so it can be piped to the file system
  await pipeline(
    got.stream(post.file_url as string),
    createWriteStream(filename)
  ).catch((err: Error) => {
    crashHandler("Error saving downloading image.", err);
    return;
  });
  if (args.verbose) console.log(`Saved image to ${filename}`);
  const str = createReadStream(filename).on("error", (err: Error) => {
    crashHandler("Error reading downloaded image.", err);
  });

  if (args.verbose) {
    console.log(`File being sent: ${filename}\nSensitivity: ${sensitivity}`);
  }
  // Make a status with the image
  await postImage(str, sensitivity, conf);

  // Delete the image that it downloaded
  await unlink(filename).catch((err: Error) => {
    crashHandler("Error deleting downloaded image.", err);
  });
  if (args.verbose) console.log(`Successfully deleted image ${filename}`);
  exit(0);
}
