const path = require("path");
const fs = require("fs");
const { getAST, getDependencies, transform } = require("./parser");

module.exports = class Compiler {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
  }
  run() {
    const entryModule = this.bindModule(this.entry, true);

    this.modules.push(entryModule);

    this.modules.map((_module) => {
      _module.dependencies.map((_dependency) => {
        this.modules.push(this.bindModule(_dependency, false));
      });
    });
    console.log(this.modules);
    this.emitFiles();
  }

  bindModule(fileName, isEntry) {
    let ast;
    if (isEntry) {
      ast = getAST(fileName);
    } else {
      let absoultePath = path.join(process.cwd(), "./src/", fileName);
      ast = getAST(absoultePath);
    }
    return {
      fileName,
      dependencies: getDependencies(ast),
      source: transform(ast),
    };
  }

  emitFiles() {
    const outputPath = path.join(this.output.path, this.output.filename);
    let modules = "";
    this.modules.map((_module) => {
      modules += `
      '${_module.fileName}': function (require, module, exports) {
        ${_module.source};
      },
      `;
    });

    const bundle = `
      (function(modules){
        function require(fileName) {
          const fn = modules[fileName]
          const module = {exports:{}}

          fn(require,module,module.exports)

          return module.exports
        }

        require('${this.entry}')
      })({${modules}})
    `;

    fs.writeFileSync(outputPath, bundle, "utf-8");
  }
};
