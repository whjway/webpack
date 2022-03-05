const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook,
} = require("tapable");

class Car {
  constructor() {
    this.hooks = {
      accelerate: new SyncHook(["newSpeed"]),
      brake: new SyncHook(),
      calculateRoutes: new AsyncParallelHook([
        "source",
        "target",
        "routesList",
      ]),
    };
  }
}

const myCar = new Car();

myCar.hooks.accelerate.tap("accelerate", (speed) => {
  console.log(`new speed: ${speed}`);
});

myCar.hooks.brake.tap("brake", () => console.log("brake"));

myCar.hooks.calculateRoutes.tapPromise("calculate", () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.timeEnd("cost");
      resolve();
    }, 2000);
  });
});

myCar.hooks.accelerate.call("100");
myCar.hooks.brake.call();
console.time("cost");
myCar.hooks.calculateRoutes.promise();
