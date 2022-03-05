const JSzip = require("jszip");
const path = require("path");
const RawSource = require("webpack").sources.RawSource;
const Compilation = require("webpack").Compilation;

const zip = new JSzip();
module.exports = class ZipPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync("zip-plugin", (compilation, callback) => {
      const folder = zip.folder(this.options.filename);

      for (const assets in compilation.getAssets()) {
        // 获取rawSource
        const source = assets.source;

        folder.file(assets.filename, source);
      }

      zip
        .generateAsync({
          type: "nodebuffer",
        })
        .then((content) => {
          const outputPath = path.join(
            compilation.options.output.path,
            this.options.filename + ".zip"
          );

          const outputRelativePath = path.relative(
            compilation.options.output.path,
            outputPath
          );
          // console.log(Compilation.PROCESS_ASSETS_STAGE_ADDITIONS);

          // compilation.hooks.processAssets.tap(
          //   {
          //     name: "ZipPlugin",
          //     stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS, // see below for more stages
          //   },
          //   (assets) => {
          //     console.log("List of assets and their sizes:");
          //     Object.entries(assets).forEach(([pathname, source]) => {
          //       console.log(`— ${pathname}: ${source.size()} bytes`);
          //     });
          //   }
          // );

          // compilation.assets[outputRelativePath] = new RawSource(content);
          compilation.emitAsset(outputRelativePath, new RawSource(content));

          callback();
          //
        });
    });
  }
};
