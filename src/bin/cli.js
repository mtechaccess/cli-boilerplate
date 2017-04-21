#!/usr/bin/env node
'use strict';
import "babel-polyfill";

import commander from 'commander';
import log from '../lib/logger';
import * as lib from '../lib/lib';
import * as utils from '../lib/utils';
import pkg from '../../package.json';

// ====================================
// main
log.info(`${pkg.name} ${pkg.version}`);

commander
  .version(pkg.version)
  .option(`-a, --arg`, `custom cli arg`)
  .option(`-c, --config`, `use config file`)
  .option(`-C, --create`, `create template config file in current directory`)
  .option(`-D, --debug`, `enable debug output`)
  .parse(process.argv);

if (commander.debug) {
  log.transports.console.level = `debug`;
}

if (commander.config) {
  lib.useConfig(commander);
} else if (commander.create) {
  utils.createConfig(commander);
} else if (commander.arg) {
  lib.command(commander);
} else {
  commander.outputHelp();
}
