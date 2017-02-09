'use strict';

import log from './logger';

let config;

/**
 * Get config file
 * @method _getConfig
 * @private
 */
async function _getConfig() {
  try {
    config = await fs.readJsonASync(`../../config.json`);
  } catch (e) {
    log.debug(`No config found!`);
    throw e;
  }
}

export function command() {
  log.info(`command`);
}
