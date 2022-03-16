# fediverse-imagebot

[![Build Status](https://ci.git.froth.zone/api/badges/Sam/fediverse-imagebot/status.svg)](https://ci.git.froth.zone/Sam/fediverse-imagebot)

A bot that posts local and booru images to the Fediverse.

Compatible with Mastodon, Misskey and Pleroma!

## MIGRATING MAJOR VERSIONS

See [the wiki](https://git.froth.zone/Sam/fediverse-imagebot/wiki/Migrating).

## Boorus supported

The full list of boorus supported is found [here](https://github.com/AtoraSuunva/booru/blob/master/src/sites.json).

## Downloading the bot

There are currently two ways to do this, either with a pre-built binary or building from source. Both are listed below.

### Downloading pre-built binaries

Download prebuilt binaries from [here](https://git.froth.zone/Sam/fediverse-imagebot/releases/latest). (currently only supports x86_64)

1. Run the bot with the `-w` flag to have it generate a configuration file to the local directory.

2. Edit it for your use case.

- If you want to generate a key you can use https://git.froth.zone/Sam/js-feditoken

3. Run the bot by launching the executable!

### Running from Source

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
