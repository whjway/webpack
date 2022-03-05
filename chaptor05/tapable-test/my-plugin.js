const Compiler = require("./Compiler.js");

class MyPlugin {
  constructor() {}

  apply(compiler) {
    compiler.hooks.accelerate.tap("accelerate", (speed) => {
      console.log(`new speed: ${speed}`);
    });
    compiler.hooks.brake.tap("brake", () => console.log("brake"));
    console.time("cost");
    compiler.hooks.calculateRoutes.tapPromise("calculate", () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.timeEnd("cost");
          resolve();
        }, 2000);
      });
    });
  }
}

const myPlugin = new MyPlugin();

const options = {
  plugins: [myPlugin],
};

const complier = new Compiler();

// 1 插件需要有allpy方法，接收compiler参数
// 2 插件对compiler hooks事件监听

for (const plugin of options.plugins) {
  if (typeof plugin === "function") {
    plugin.call(complier, complier);
  } else {
    plugin.apply(complier);
  }
}

complier.run();
