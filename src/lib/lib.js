'use strict';

import _ from 'lodash';
import fs from 'fs-extra-promise';
import path from 'path';

import log from './logger';
import * as utils from './utils';

let _config;
const _cwd = process.cwd();

/**
 * Use config file for options
 * @method useConfig
 * @param {Object} options containing path to csv
 */
export async function useConfig(options) {
  try {
    _config = await utils.loadConfig();

    console.log(_config);
  } catch (e) {
    log.error(e);
    throw e;
  }
}

/**
 * Custom command handler
 * @method command
 * @param {Object} args arguments
 */
export function command(args) {
  log.info(`command`);
}
