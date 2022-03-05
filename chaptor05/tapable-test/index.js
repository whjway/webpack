const { SyncHook } = require("tapable");

const hook = new SyncHook(["arg1", "arg2", "arg3"]);

hook.tap("hook1", (...args) => {
  console.log(...args);
});

hook.call(1, 2, 3);
