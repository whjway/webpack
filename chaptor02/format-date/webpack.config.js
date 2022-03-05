const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    "format-date": "./src/index.js",
    "format-date.min": "./src/index.js",
  },
  output: {
    filename: "[name].js",
    library: "formatDate",
    libraryTarget: "umd",
    libraryExport: "default",
  },
  mode: "none",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
      }),
    ],
  },
};
