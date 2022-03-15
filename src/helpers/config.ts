import { readFile } from "fs/promises";
import stripJsonComments from "strip-json-comments";
import args from "./cli.js";
import crashHandler from "./error.js";
import { config } from "./types.js";

/**
 * Reads the config file and returns the config object
 * @returns The config object
 */
async function readConfig(): Promise<string> {
  const conf = await readFile(args.config, "utf8").catch((err) => {
    crashHandler("Error reading config file.", err);
    return "CRASH";
  });
  return conf;
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
  let conf: config;
  try {
    conf = JSON.parse(
      stripJsonComments(
        await readConfig().catch((err) => {
          crashHandler("Error reading config file.", err);
          return "";
        })
      )
    );
  } catch (err: unknown) {
    crashHandler("Error parsing config file.", Error(err as string));
    return {} as config;
  }
  if (args.verbose) {
    console.log(`Read config file: ${args.config}\n${JSON.stringify(conf)}`);
  }
  return conf;
}
