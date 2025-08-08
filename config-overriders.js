const { override } = require('customize-cra');

module.exports = override(
  // Add your custom Webpack configurations here
  // For example, to add support for polyfills:
  (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      process: require.resolve('process/browser'),
      buffer: require.resolve('buffer'),
    };
    return config;
  }
);
