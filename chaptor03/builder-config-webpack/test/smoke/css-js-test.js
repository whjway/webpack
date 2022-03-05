const glob = require("glob-all");

// 判断html文件是否生成
describe("checking generated css&js files", () => {
  it("should generate css&js files", (done) => {
    const files = glob.sync([
      "./dist/css/index_*.css",
      "./dist/js/index_*.js",
      "./dist/css/search_*.css",
      "./dist/js/search_*.js",
    ]);

    if (files.length > 0) {
      done();
    } else {
      throw new Error("no css&js files generated");
    }
  });
});
