// const { assert } = require("console");
const assert = require("assert");
const expect = require("chai").expect;

describe("webpack.base.js test case", () => {
  const baseConfig = require("../../lib/webpack.base");

  it("entry", () => {
    // expect(baseConfig.entry.index).to.match(
    //   /builder\-config\-webpack\/test\/smoke\/template\/src\/index\/index.js$/
    // );
    // expect(baseConfig.entry.search).to.match(
    //   /builder\-config\-webpack\/test\/smoke\/template\/src\/search\/index.js$/
    // );
    assert.match(
      baseConfig.entry.search,
      /builder-config-webpack\/test\/smoke\/template\/src\/search\/index.js/
    );
    assert.match(
      baseConfig.entry.index,
      /builder-config-webpack\/test\/smoke\/template\/src\/index\/index.js/
    );
  });
});
