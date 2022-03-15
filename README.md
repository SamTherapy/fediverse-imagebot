# fediverse-imagebot

[![Build Status](https://ci.git.froth.zone/api/badges/Sam/fediverse-imagebot/status.svg)](https://ci.git.froth.zone/Sam/fediverse-imagebot)

A bot that posts local and booru images to the Fediverse.

Compatible with Mastodon, Misskey and Pleroma!

## MIGRATING MAJOR VERSIONS
See [MIGRATING.md](./MIGRATING.md)

## Boorus supported 
The full list of boorus supported is found [here](https://github.com/AtoraSuunva/booru/blob/master/src/sites.json).

## Downloading pre-built binaries

Download prebuilt binaries from [here](https://git.froth.zone/Sam/fediverse-imagebot/releases/latest) (currently only supports x64), or build from source, instructions below.

## Running from Source

1. You need to have `npm` and `nodejs` installed.

- Node 15 or greater is required.

2. Install `yarn`: \
   `corepack enable` \
    Check https://yarnpkg.com/getting-started/install for more information.

- This may be need to ran with `sudo` depending on your installation.

3. Clone the repository: \
   `git clone https://git.froth.zone/Sam/fediverse-imagebot.git`

4. Install dependencies: \
   `yarn`

5. Build: \
   `yarn build`

6. Edit the config file: \
   `cp config.sample.jsonc config.jsonc`
   - If you want to generate a key you can use https://git.froth.zone/Sam/js-feditoken

6. Run the bot: \
   `yarn bot`

You're done! The bot should post a local image to the fediverse instance of your choosing!

## Running the bot

1. Obtain a token. I have another tool that does this for you, which can be found [here](https://git.froth.zone/Sam/js-feditoken) and put it in `config.jsonc`, following the sample jsonc file.

2. Put images in the `images` folder.

- By default the bot will look for SFW images at `images/sfw` and NSFW images at `images/nsfw`. This can be configured with the `directory` config setting.

## Automating the bot

_TODO: Elaborate more_

The bot can be automated to post images at set times using a cronjob. \
Example cron configuration:

```
0 * * * * cd /path/to/fediverse-imagebot && /usr/local/bin/yarn bot -c ./config.sample.jsonc
```

This example will run the bot every hour on the hour with no message using images from the default `images` directory.

An example of this pleroma configuration can be found at https://froth.zone/rinbot.
