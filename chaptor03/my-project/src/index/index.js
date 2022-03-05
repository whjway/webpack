import { hellowebpack } from "./hellowebpack";
import "./scope-hoisting";
import { utils } from "../common/utils2";
import formatDate from "format-date-js";

// build error异常终端测试
// import "../scope-hoisting";

console.log(formatDate());

utils();
document.write(hellowebpack());
