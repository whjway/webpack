import Vue from "vue";
import app from "./app.vue";
import { utils } from "../common/utils2";
// import { funca } from "./tree-shaking";
import "./search.css";
import "./search-less.less";
// import "./search-scss.scss";
import img from "./images/logo.png";

// funca();

utils();

console.log(img);
let a = 1333;
console.log(a);

setTimeout(() => {
  console.log("searchjjjjjjjjjj");
}, 1000);

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);

const App = new Vue({
  render: (h) => h(app),
}).$mount("#app");

export default App;
