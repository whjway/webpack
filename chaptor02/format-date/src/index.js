/**
 * 时间戳转换日期
 * @param {number} timestamp - 时间戳
 * @param {string} format
 * @return {string}
 */
export default function formatDate(
  timestamp = Date.now(),
  format = "Y-M-D h:m"
) {
  let date = new Date(timestamp);
  let dateInfo = {
    Y: date.getFullYear(),
    M: date.getMonth() + 1,
    D: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
  };
  let formatNumber = (n) => (n >= 10 ? n : "0" + n);
  let res = format
    .replace("Y", dateInfo.Y)
    .replace("M", dateInfo.M)
    .replace("D", dateInfo.D)
    .replace("h", formatNumber(dateInfo.h))
    .replace("m", formatNumber(dateInfo.m))
    .replace("s", formatNumber(dateInfo.s));
  return res;
}

// add('999', '1');
// add('1', '999');
// add('123', '321');
// console.log(add('999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999', '1'));
