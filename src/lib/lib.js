'use strict';

import fs from 'fs-extra-promise';
import log from './logger';

let config;

/**
 * Get config file
 * @method _getConfig
 * @private
 */
async function _getConfig() {
  try {
    config = await fs.readJsonAsync(`../../config.json`);
  } catch (e) {
    log.debug(`No config found!`);
    throw e;
  }
}

/**
 * Command handler
 * @method command
 * @param {Object} args arguments
 */
export function command(args) {
  log.info(`command`);
}
