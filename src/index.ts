import getConfig from "./helpers/getConfig.js";
import { config } from "./helpers/types.js";
import getLocalImage from "./getLocalImage.js";
import getRemoteImage from "./getRemoteImage.js";

/**
 * Main function
 */
async function main() {
  const conf: config = await getConfig();

  if (conf.remote) await getRemoteImage(conf);
  else await getLocalImage(conf);
}

// Run the main function, obviously.
main();
