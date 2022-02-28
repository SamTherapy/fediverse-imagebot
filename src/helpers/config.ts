import args from "./cli";
import crashHandler from "./errors";
import { readFile } from "fs/promises";

// Read the config file and return the contents as a JSON object
export default async function config() {
    try {
        return JSON.parse(
            await readFile(args.config, "utf8")
                .catch(err => {
                    crashHandler("Error reading config file.", err);
                    return ("");
                })
        );
    }
    catch (e: unknown) {
        crashHandler("Error reading config file.", e);
    }
}

