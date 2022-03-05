const path = require("path");
const ZipPlugin = require("./plugins/zip-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.join(__dirname, "dist"),
  },
  plugins: [
    new ZipPlugin({
      filename: "offline",
    }),
  ],
};
