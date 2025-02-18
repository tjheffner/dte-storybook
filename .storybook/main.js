const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  core: {
    builder: 'webpack5',
  },

  stories: ['../components/**/*.stories.js'],

  addons: [
      "@storybook/addon-essentials"
  ],

  webpackFinal: async config => {
    config.experiments = {
      ...(config.experiments ? config.experiments : {}),
      topLevelAwait: true,
    };

    // make twing-loader compatible with webpack5
    config.plugins.push(new NodePolyfillPlugin({
      // exclude everything except `Buffer` b/c that's all we need
      excludeAliases: ['buffer', 'console', 'process', 'assert', 'constants', 'crypto', 'domain', 'events', 'http', 'https', 'os', 'path', 'punycode', 'querystring', 'stream', '_stream_duplex', '_stream_passthrough', '_stream_readable', '_stream_transform', '_stream_writable', 'string_decoder', 'sys', 'timers', 'tty', 'url', 'util', 'vm', 'zlib'],
    }));

    config.module.rules.push({
      test: /\.twig/,
      use: [
        {
          loader: 'twing-loader',
          options: {
            environmentModulePath: path.resolve(__dirname, 'twing-environment.js'),
          },
        },
      ],
      include: path.resolve(__dirname, '..', 'components'),
    });

    return config;
  },
};