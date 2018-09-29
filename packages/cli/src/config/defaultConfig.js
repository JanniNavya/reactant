const { env } = process;

export default {
  title: 'Reactant',
  moduleName: 'reactant',
  host: env.REACTANT_HOST || 'localhost',
  port: env.REACTANT_PORT || 6001,
  ports: {
    dev: null
  },
  envs: {},
  level: 'info',
  ignore: {
    errors: [],
    warnings: []
  },
  initialState: {},
  whitelist: [],
  blacklist: [],
  offline: false,
  paths: {
    debug: 'reactant/debug',
    dist: 'dist',
    reactant: '.reactant',
    root: '',
    src: 'src'
  },
  publish: {},
  babel: {
    babelrc: false,
    presets: [
      [
        'env',
        {
          targets: {
            node: '6'
          }
        }
      ],
      'stage-0'
    ],
    plugins: ['transform-decorators-legacy']
  },
  eslint: {
    extends: ['jam']
  },
  platforms: {},
  webpack: (config, webpack) => webpack,
  storybook: (config, webpack) => webpack
};
