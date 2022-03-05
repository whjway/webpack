const babylon = require("babylon"); // 解析ast
const fs = require("fs");
const traverse = require("babel-traverse").default; // 获取文件依赖
const { transformFromAst } = require("babel-core");

module.exports = {
  // es6=>ast
  getAST(path) {
    const source = fs.readFileSync(path, "utf-8");
    return babylon.parse(source, {
      sourceType: "module",
    });
  },
  getDependencies(ast) {
    const dependencies = [];
    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value);
      },
    });
    return dependencies;
  },
  // ast=>es5
  transform(ast) {
    const { code } = transformFromAst(ast, null, {
      presets: ["env"],
    });
    return code;
  },
};
