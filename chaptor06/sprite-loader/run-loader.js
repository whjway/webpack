const fs = require("fs");
const path = require("path");
const { runLoaders } = require("loader-runner");

runLoaders(
  {
    resource: path.join(__dirname, "./src/index.css"),
    // String: Absolute path to the resource (optionally including query string)

    loaders: [
      {
        loader: path.join(__dirname, "./src/sprite-loader.js"),
        options: {
          name: "Jun",
        },
      },
    ],
    // String[]: Absolute paths to the loaders (optionally including query string)
    // {loader, options}[]: Absolute paths to the loaders with options object

    context: {
      minimize: true,
      getOptions: () => ({
        name: "Jun",
      }),
      emitFile: () => {},
    },
    // Additional loader context which is used as base context

    readResource: fs.readFile.bind(fs),
    // Optional: A function to read the resource
    // Only used when 'processResource' is not provided
    // Must have signature function(path, function(err, buffer))
    // By default fs.readFile is used
  },
  function (err, result) {
    err ? console.log(err) : console.log(result);
  }
);
