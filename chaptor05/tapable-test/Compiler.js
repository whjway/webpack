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

module.exports = class Car {
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

  run() {
    this.accelerate(100);
    this.brake();
    this.calculateRoutes();
  }

  accelerate(speed) {
    this.hooks.accelerate.call(speed);
  }

  brake() {
    this.hooks.brake.call();
  }

  calculateRoutes() {
    this.hooks.calculateRoutes
      .promise(...arguments)
      .then(() => {})
      .catch((err) => console.log(err));
  }
};
