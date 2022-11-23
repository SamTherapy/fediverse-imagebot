import { writeFile } from "node:fs/promises"
/**
 * Writes the sample config file to disk
 * @returns Nothing
 */
export default async function writeConfig(verbose: boolean) {
  if (verbose) console.log("Writing sample config to config.jsonc")
  await writeFile(
    "./config.jsonc",
    // eslint-disable-next-line prettier/prettier
    // prettier-ignore
    "{ \n  //Instance and token settings \n  \"instance\": \"INSTANCE_URL\", // example https://test.com \n  \"type\": \"INSTANCE_TYPE\", // examples: \"mastodon\", \"misskey\", \"pleroma\" \n  \"accessToken\": \"ACCESS_TOKEN\", // Get a token from https://git.froth.zone/Sam/js-feditoken \n  \"refreshToken\": \"REFRESH_TOKEN\", // optional \n \n  // Post settings \n  \"message\": \"\", // example: \"Hello, world!\" \n  \"visibility\": \"unlisted\", // example: \"public\", \"unlisted\", \"private\", \"direct\" \n \n  \"remote\": false, // **Set this to `true` if you want to serve a file from a booru!** \n  /* THESE SETTINGS WILL BE IGNORED IF YOU SET `remote` TO `false` */ \n  \"booru\": \"safebooru.org\", // example: \"safebooru.org\" \n  \"tags\": [\"\"], // example: [\"tohsaka_rin\", \"-feet\"] \n  \"rating\": \"safe\", // example: \"safe\", \"questionable\", \"explicit\" \n  /* END OF SETTINGS THAT WILL BE IGNORED IF YOU SET `remote` TO `false` */ \n \n  /* THESE SETTINGS WILL BE IGNORED IF YOU SET `remote` TO `true` */ \n  \"directory\": \"./images\" // example: \"./images\" \n  /* \n    Directory structure should be as follows: \n    folder/ \n      - sfw/ \n        - image1.jpg \n      - nsfw/ \n        - image1.jpg \n  */ \n  /* END OF SETTINGS THAT WILL BE IGNORED IF YOU SET `remote` TO `true` */ \n} \n"
  )
}
