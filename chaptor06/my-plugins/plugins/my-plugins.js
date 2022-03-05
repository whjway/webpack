module.exports = class MyPlugins {
  constructor(options) {
    this.options = options;
  }

  apply() {
    console.log("my plugin is executed");
    console.log("options:", this.options);
  }
};
