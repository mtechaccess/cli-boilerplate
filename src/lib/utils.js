'use strict';

import _ from 'lodash';
import fs from 'fs-extra-promise';
import path from 'path';
import pkg from '../../package.json';

import log from './logger';

let _config;
const _cwd           = process.cwd();
const _configPath = path.join(_cwd, `${pkg.name}-config.json`);

/**
 * Get config file
 * @method _getConfig
 * @param {string} [arg=null] path to config file.
 * @private
 */
async function _getConfig(arg=null) {
  try {
    _config = await fs.readJsonAsync(arg ? arg : path.join(__dirname, `../../.config.json`));
  } catch (e) {
    log.debug(`No config found!`);
    throw e;
  }
}

/**
 * Load config file.
 * <br>if config is invalid, throw error
 * @method loadConfig
 * @return {Object} config contents
 */
export async function loadConfig() {
  try {
    await _getConfig(_configPath);

    //check config is valid
    _.forOwn(_config, (v, k)=>{
      log.debug(`${k}:${v}`);
      if (v.startsWith(`{{`) || v.endsWith(`}}`)) {
        throw new Error(`Invalid config paramter [${k}] with value [${v}]`);
      }
    });

    return _config;
  } catch (e) {
    throw e;
  }
}

/**
 * Create default config file in current working directory
 * @method createConfig
 * @param {Object} options holder
 */
export async function createConfig(options) {
  try {
    await _getConfig();
    await fs.writeJsonAsync(_configPath, _config);
    log.info(`Created stub config at: ${_configPath}

Edit this to set the import paths and locale.
    `);
  } catch (e) {
    log.error(e);
    throw e;
  }
}
