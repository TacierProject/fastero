const { override, addWebpackPlugin } = require('customize-cra');
const webpack = require('webpack');

module.exports = override(
  // Konfigurasi resolve.fallback untuk polyfill
  (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      buffer: require.resolve('buffer'),
      process: require.resolve('process/browser'),
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util'),
      // Tambahkan fallback lain jika diperlukan (misalnya 'crypto', 'http', dll.)
    };
    return config;
  },

  // Tambahkan ProvidePlugin untuk menyediakan Buffer dan process secara global
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    })
  )
);
