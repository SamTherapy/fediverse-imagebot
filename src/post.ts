import { ReadStream } from "fs";
import generator, { Entity, Response } from "megalodon";

import config from "./helpers/config";
import crashHandler from "./helpers/errors";
import args from "./helpers/cli";

// Uploads an image to the Fediverse
// image: The image to upload
// sensitivity: Whether or not the image is sensitive
export default async function post(image: ReadStream, sensitivity: boolean) {
    // Get config
    const cfg: {
        instance: string,
        type: "misskey" | "mastodon" | "pleroma",
        accessToken: string,
        refreshToken: string | null
    } = await config();

    // Make a client to upload
    const client = generator(cfg.type, cfg.instance, cfg.accessToken, cfg.refreshToken);

    // Upload the image
    const res: Response<Entity.Attachment> = await client.uploadMedia(image).catch(err => {
        crashHandler("Error uploading image.", err);
        return ({} as Response<Entity.Attachment>);
    });

    // Make a status with the image
    await client.postStatus(args.message,
        {
            media_ids: [ res.data.id ],
            // Change this to make the post visibility you wish
            visibility: "unlisted",
            sensitive: sensitivity
        }
    ).catch(err => {
        crashHandler("Error posting status.", err);
    });
    if (args.verbose)
        console.log(`Successfully posted to ${cfg.instance}`);
    return;
}