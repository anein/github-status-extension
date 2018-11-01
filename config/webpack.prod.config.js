const plugins = require("./helpers.plugins");
const webpackDevConfig = require("./webpack.dev.config");

module.exports = (env) => {
  return [plugins.webpackMerge(webpackDevConfig[0], {
    mode        : "production",
    devtool     : "source-map",
    cache       : true,
    optimization: {
      // for Opera, we should disable obfuscation
      minimize         : (!env || env.browser !== "opera"),
      mangleWasmImports: true,
      occurrenceOrder  : true
    },

    stats: {
      colors     : true,
      entrypoints: true,
      env        : true,
      depth      : true
    }

  })];
};
