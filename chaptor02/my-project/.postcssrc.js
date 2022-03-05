const AutoPrefixer = require("autoprefixer");

module.exports = ({ file }) => {
  return {
    plugins: {
      autoprefixer: {
        overrideBrowserslist: [
          "last 2 version",
          ">1%",
          "Android >= 4.0",
          "iOS >= 7",
        ],
      },
      "postcss-pxtorem": {
        rootValue: 75,
        minPixelValue: 2,
      },
    },
  };
};
