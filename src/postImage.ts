import { ReadStream } from "node:fs"
import { Readable } from "node:stream"

import generator, { Entity, Response } from "megalodon"
import pRetry from "p-retry"

import args from "./helpers/args.js"
import crashHandler from "./helpers/crashHandler.js"
import { config } from "./helpers/types.js"

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
  )

  // Upload the image
  const upload = async () => client.uploadMedia(image)
  const res = await pRetry(upload, {
    retries: cfg.retries,
    onFailedAttempt: logRetry,
  }).catch((err) => {
    crashHandler("Error uploading image.", err, err.response.data)
    return {} as Response<Entity.Attachment>
  })

  // Make the post
  const post = async () =>
    client.postStatus(args.message || cfg.message, {
      media_ids: [res.data.id],
      // Change this to make the post visibility you wish
      visibility: cfg.visibility,
      sensitive: sensitivity,
    })
  await pRetry(post, {
    retries: cfg.retries,
    onFailedAttempt: logRetry,
  }).catch((err) => {
    crashHandler("Error uploading image", err, err.response.data)
  })

  console.log(`Successfully posted to ${cfg.instance}`)
}

function logRetry(error: unknown) {
  console.error("Retrying, error:")
  console.error(error)
}
