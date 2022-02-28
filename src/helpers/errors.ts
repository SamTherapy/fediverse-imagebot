import { exit } from "process";
import args from "./cli";

// Boilerplate for the event any error occurs
export default function crashHandler(msg: string, e: Error | unknown) {
    console.error(msg);
    if (args.verbose) {
        console.error(`--BEGIN FULL ERROR--\n${e}\n--END FULL ERROR--`);
    } else
        console.error("Run with -v to see the full error.");
    
    exit(1);
}