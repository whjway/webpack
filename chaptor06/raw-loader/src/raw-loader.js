const loaderUtils = require("loader-utils");
const fs = require("fs");
const path = require("path");

module.exports = function (source) {
  const options = this.getOptions();
  const url = loaderUtils.interpolateName(this, "[name].[ext]", source);
  console.log(url);

  this.emitFile(path.join(__dirname, url), source);

  const json = JSON.stringify(source)
    .replace("foo", "replace")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

  // 同步异常1 throw new Error("Error");
  // return `export default ${json}`;

  // 同步异常2
  // this.callback(new Error("error"), json);

  this.callback(null, json);

  // 异步loader
  // const callback = this.async();

  // fs.readFile(path.join(__dirname, "./async.txt"), "utf-8", (err, data) => {
  //   // setTimeout(() => {
  //   console.log("raw-loader");
  //   if (err) {
  //     callback(err, "");
  //   } else {
  //     callback(null, data, json);
  //   }
  //   // }, 5000);
  // });
};
