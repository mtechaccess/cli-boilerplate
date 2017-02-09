#!/usr/bin/env node
'use strict';
import "babel-polyfill";

import commander from 'commander';
import log from '../lib/logger';
import * as lib from '../lib/lib';
import pkg from '../../package.json';

// ====================================
// main
log.info(`${pkg.name} ${pkg.version}`);

commander
  .version(pkg.version)
  .option(`-a, --arg`, `cli arg`)
  .parse(process.argv);

if (commander.debug) {
  log.transports.console.level = `debug`;
}

if (commander.arg) {
  lib.command();
} else {
  commander.outputHelp();
}
