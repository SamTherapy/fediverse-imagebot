# fediverse-imagebot

[![Build Status](https://ci.git.froth.zone/api/badges/sam/fediverse-imagebot/status.svg)](https://ci.git.froth.zone/sam/fediverse-imagebot)

A bot that posts local and booru images to the Fediverse.

Compatible with Mastodon, Misskey and Pleroma!

## MIGRATING MAJOR VERSIONS

See [the wiki](https://git.froth.zone/sam/fediverse-imagebot/wiki/Migrating).

## Boorus supported

The full list of boorus supported is found [here](https://github.com/AtoraSuunva/booru/blob/master/src/sites.json).

## Downloading the bot

There are currently two ways to do this, either with a pre-built binary or building from source. Both are listed below.

### Downloading pre-built binaries

Download prebuilt binaries from [here](https://git.froth.zone/sam/fediverse-imagebot/releases/latest). (currently supports x86_64 and arm64 on Linux
[glibc or musl], macOS and Windows)

1. Run the bot with the `-w` flag to have it generate a configuration file to the local directory.

2. Edit it for your use case.

- If you want to generate a key you can use https://git.froth.zone/sam/js-feditoken

3. Run the bot by launching the executable!

### Running from Source

1. You need to have `npm` and `nodejs` installed.
   - Node 16 or greater is required.
2. Install `pnpm`: \
   `corepack enable` \
    Check <https://pnpm.io/installation> for more information.
3. Clone the repository: \
   `git clone https://git.froth.zone/sam/fediverse-imagebot.git`
4. Install dependencies: \
   `pnpm i`
5. Build: \
   `pnpm build`
6. Edit the config file: \
   `cp config.sample.jsonc config.jsonc`
   - If you want to generate a key you can use https://git.froth.zone/sam/js-feditoken
7. Run the bot: \
   `yarn bot`

You're done! The bot should post a local image to the fediverse instance of your choosing!

## Automating the bot

_TODO: Elaborate more_

The bot can be automated to post images at set times using a cronjob. \
Example cron configuration:

```
0 * * * * cd /path/to/fediverse-imagebot && /usr/local/bin/yarn bot -c ./config.sample.jsonc
```

This example will run the bot every hour on the hour with no message using images from the default `images` directory.

An example of this pleroma configuration can be found at https://froth.zone/rinbot.
