# Migrating
Migrating to any version in the same major version (e.g. `1.0.0` -> `1.1.0`) is a safe operation, nothing additional is required. 

Migrating to a major version (e.g. `1.1.0` -> `2.0.0`) can be done by following the instructions below.

## Migrating to 2.0.0 from 1.x.x
Version 2.0.0 changes the configuration file and flags considerably, to make it easier to use and allow for more flexibility. An example configuration migration can be found below.

### Migrating the configuration file
   1. Make a backup of your old `config.json`
   2. Migrate your configuration file
      * If running from source, edit the `config.sample.jsonc` file to your liking and save it as `config.jsonc`, the configuration location flag `-c` still works as before.
      * If running from binary, run the file with `-w` to write a new configuration file `config.jsonc` to the current directory.
   3. Migrate the runtime flags
      - `-m` is now `message` in the config.
      - `-d` is now `directory` in the config.