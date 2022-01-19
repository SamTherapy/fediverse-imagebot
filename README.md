# fediverse-imagebot

[![Build Status](https://ci.git.froth.zone/api/badges/Sam/fediverse-imagebot/status.svg)](https://ci.git.froth.zone/Sam/fediverse-imagebot)

A bot that posts (currently only local) images to the Fediverse.

Should be compatible with Mastodon, Misskey and Pleroma!

## Quick start guide
1. You need to have `npm` and `nodejs` installed.
- Node 15 or greater is required.

2. Install `yarn`: \
`npm install --global yarn`
- This may be need to ran with `sudo` depending on your installation.

3. Clone the repository: \
`git clone https://git.freecumextremist.com/NotSam/fediverse-imagebot.git`

4. Install dependencies: \
`yarn`

5. Build: \
`yarn build`

6. Obtain a token. This can be done with an external tool or obtained by running `yarn token` and following the directions.
- `yarn token` will generate a configuration file located at `config.json`

7. Put images in the `images` folder.
- By default the bot will look for SFW images at `images/sfw` and NSFW images at `images/nsfw`. This can be configured with the `-d` flag.

8. Run the bot: \
`yarn local`

You're done! The bot should post a local image to the fediverse instance of your choosing!

## Automating the bot
*TODO: Elaborate more* 

The bot can be automated to post images at set times using a cronjob. \
Example cron configuration:
```
0 * * * * cd /path/to/fediverse-imagebot && /usr/local/bin/yarn local -m "Message"
```
This example will run the bot every hour on the hour with the post message `Message` using images from the default `images` directory.

An example of this configuration can be found at https://froth.zone/rinbot.
## Additional information
Additional help can be found by running `yarn local -h` or `yarn token -h`.


