import CircularJSON from 'circular-json';
import fs from 'fs-extra';
import path from 'path';
import { log } from '@reactant/core';
import Socket, { socketGetConfig } from './socket';
import createConfig from './createConfig';
import { loadReactantPlatform } from '../platform';

let globalConfig = null;

function loadConfig(...args) {
  if (!globalConfig) {
    globalConfig = createConfig(...args);
    const { paths, options } = globalConfig;
    log.debug('config', globalConfig);
    if (options.debug) {
      fs.mkdirsSync(path.resolve(paths.debug, options.platform));
      fs.writeFileSync(
        path.resolve(paths.debug, options.platform, 'config.json'),
        CircularJSON.stringify(globalConfig, null, 2)
      );
    }
  }
  return globalConfig;
}

function saveConfig(platform) {
  const config = sanitizeConfig(globalConfig);
  const configPath = path.resolve(config.paths[platform], 'config.json');
  fs.writeFileSync(configPath, CircularJSON.stringify(config));
  return `config saved to ${configPath}`;
}

function sanitizeConfig(config) {
  config = {
    ...config,
    options: {
      debug: config.options.debug,
      platform: config.options.platform,
      storybook: config.options.storybook,
      verbose: config.options.verbose
    }
  };
  delete config.babel;
  delete config.eslint;
  delete config.publish;
  return config;
}

function rebuildConfig({
  action = 'start',
  defaultEnv = 'development',
  options
}) {
  const socketConfig = socketGetConfig();
  if (socketConfig) {
    ({ action } = socketConfig);
    defaultEnv = socketConfig.env;
    options = {
      ...options,
      ...socketConfig.options,
      platform: options.platform
    };
  }
  const platformName = socketConfig.platforms[options.platform];
  const platform = loadReactantPlatform(socketConfig, platformName);
  return loadConfig({
    options,
    defaultEnv,
    action,
    platformConfig: platform.config || {}
  });
}

export {
  loadConfig,
  saveConfig,
  sanitizeConfig,
  Socket,
  rebuildConfig,
  createConfig
};
export default {
  loadConfig,
  saveConfig,
  sanitizeConfig,
  Socket,
  rebuildConfig,
  createConfig
};
