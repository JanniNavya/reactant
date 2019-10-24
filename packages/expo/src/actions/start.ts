import fs from 'fs-extra';
import path from 'path';
import { Config, Logger, PlatformApi } from '@reactant/platform';

export default async function start(
  config: Config,
  logger: Logger,
  platformApi: PlatformApi
): Promise<any> {
  const cracoConfigPath = path.resolve(config.rootPath, 'craco.config.js');
  logger.spinner.start('preparing start');
  await platformApi.prepareLocal(config);
  await platformApi.createCracoConfig(cracoConfigPath, config);
  logger.spinner.succeed('prepared start');
  await fs.copy(
    path.resolve(config.rootPath, config.platformName, 'index.js'),
    path.resolve(config.rootPath, 'node_modules/expo/AppEntry.js')
  );
  return platformApi.spawn('expo-cli', 'expo', [
    'start',
    '--config',
    path.resolve(config.rootPath, config.platformName, 'app.json'),
    '--web',
    '--clear'
  ]);
}
