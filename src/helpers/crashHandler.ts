import { exit } from "node:process"

import args from "./args.js"

/**
 * The function that gets called when the program runs into an error.
 * @param msg Custom error message
 * @param e Error object passed in from the error handler
 * @returns This function will never return.
 */
export default function crashHandler(msg: string, e: Error, res?: string) {
  console.error(`${msg}: ${e.name}`)
  if (args.verbose) {
    console.error(`--BEGIN FULL ERROR--\n${e}\n${res}\n--END FULL ERROR--`)
  } else console.error("Run with -v to see the full error.")

  exit(1)
}
