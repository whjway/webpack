const path = require("path");
const MyPlugin = require("./plugins/my-plugins");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.join(__dirname, "dist"),
  },
  plugins: [
    new MyPlugin({
      name: "Jun",
    }),
  ],
};
 