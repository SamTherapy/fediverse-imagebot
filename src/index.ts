import getConfig from "./helpers/config.js";
import { config } from "./helpers/types.js";
import getLocalImage from "./local.js";
import getRemoteImage from "./remote.js";

/**
 * Main function
 */
async function main() {
  const conf: config = await getConfig();

  if (conf.remote) await getRemoteImage(conf);
  else await getLocalImage(conf);
  return;
}

// Run the main function, obviously.
main();
