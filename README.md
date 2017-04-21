# cli-boilerplate

CLI tool boilerplate written in ES6/7 with options handler and documentation generator.

- clone
- edit/set github repo url: `git remote set-url origin <new url>`
- `npm init` and adjust as necessary
- edit `package.json`:
  - set repo url
  - set `bin` name.
  - set description
- edit `.config.json` as necessary
- run `npm install` to get devDependencies
- run `gulp build` to create output, or `gulp` to build in watcher mode
- run `npm link` to make it globally accessible (this only needs to be done once)
- run `<bin> --help` to check it works!

## Default options

- `-c, --config`: use config file
- `-C, --create`: create template config file in current directory
- `-D, --debug`: enable debug output
