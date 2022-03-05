if (process.env.NODE_ENV === "production") {
  module.exports = require("./dist/format-date.js");
} else {
  module.exports = require("./dist/format-date.min.js");
}
