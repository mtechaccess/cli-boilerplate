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
 * Loop through the config items and check that none have the default `{{ }}` markers.
 * <br>
 * called recursively as config might be comlex.
 * @method _checkConfig
 * @param {object} level depth of config to check
 * @private
 */
function _checkConfig(level) {
//check config is valid
  _.forOwn(level, (v, k)=>{
    log.debug(`${k}:${v}`);
    if (typeof v === `object`) {
      _checkConfig(v);
    } else {
      if (v.startsWith(`{{`) || v.endsWith(`}}`)) {
        throw new Error(`Invalid config parameter [${k}] with value [${v}]`);
      }
    }
  });
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

    _checkConfig(_config);

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
