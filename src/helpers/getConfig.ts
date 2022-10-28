import { readFile } from "node:fs/promises"

import JSON5 from "json5"
import args from "./args.js"
import crashHandler from "./crashHandler.js"
import { config } from "./types.js"

/**
 * Reads the config file and returns the config object
 * @returns The config object
 */
async function readConfig(): Promise<string> {
  return readFile(args.config, "utf8").catch((err) => {
    crashHandler("Error reading config file.", err)
    return "CRASH"
  })
}
/**
 * Parses the config file and returns it as a JSON object
 *
 * See config.sample.jsonc for an example of the config file
 * @returns {Promise<config>} The config file as a JSON object(see {@link config})
 * @example
 * const cfg = await getConfig();
 * console.log(cfg.instance);
 * // Prints "https://mastodon.social"
 */
export default async function getConfig(): Promise<config> {
  let conf: config
  try {
    conf = JSON5.parse(
      await readConfig().catch((err) => {
        crashHandler("Error reading config file.", err)
        return ""
      })
    )
    // Backwards compatibility for older versions
    conf.retries ??= 5
    if (conf.retries < 1) conf.retries = 1
  } catch (err: unknown) {
    crashHandler("Error parsing config file.", Error(err as string))
    return {} as config
  }
  if (args.verbose) {
    console.log(`Read config file: ${args.config}\n${JSON.stringify(conf)}`)
  }
  return conf
}
