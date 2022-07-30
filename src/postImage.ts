import { ReadStream } from "fs";
import generator, { Entity, Response } from "megalodon";
import { Readable } from "stream";
import args from "./helpers/args.js";
import crashHandler from "./helpers/crashHandler.js";
import { config } from "./helpers/types.js";

/**
 * Uploads an image to a fediverse instance
 * @param image The image to upload
 * @param sensitivity The sensitivity of the image
 * @param cfg {@link config} object
 * @returns { Promise<void> } Nothing
 */
export default async function postImage(
  image: ReadStream | Readable,
  sensitivity: boolean,
  cfg: config
): Promise<void> {
  // Make a client to upload
  const client = generator(
    cfg.type,
    cfg.instance,
    cfg.accessToken,
    cfg.refreshToken
  );

  // Upload the image
  const res: Response<Entity.Attachment> = await client
    .uploadMedia(image)
    .catch((err) => {
      crashHandler("Error uploading image.", err, err.response.data);
      return {} as Response<Entity.Attachment>;
    });

  // Make a status with the image
  await client
    .postStatus(cfg.message, {
      media_ids: [res.data.id],
      // Change this to make the post visibility you wish
      visibility: cfg.visibility,
      sensitive: sensitivity,
    })
    .catch((err: Error) => {
      crashHandler("Error posting status.", err);
    });
  if (args.verbose) console.log(`Successfully posted to ${cfg.instance}`);
}
