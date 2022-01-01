---
title: JavaScript Date 对象
---

`new Date(2021, 0, 0).toLocaleString()` => '2020/12/31 上午 12:00:00'

`new Date(2021, 11, 31).toLocaleString()` => '2021/12/31 上午 12:00:00'

`new Date(2021, 12, 0).toLocaleString()` => '2021/12/31 上午 12:00:00'

## 创建日期

Date 对象用于处理日期和时间。

可以通过 new 关键词来定义 Date 对象。以下代码定义了名为 myDate 的 Date 对象：

有四种方式初始化日期:

```js
new Date();
new Date(value);
new Date(dateString);
new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);
```

/utils/time.js

```js
const DATE = new Date();
const DAY = DATE.getDate();
const DAY_OF_WEEK = DATE.getDay();
const MONTH_INDEX = DATE.getMonth();
const YEAR = DATE.getFullYear();

/**
 * 本周
 * ['yyyy-MM-dd 00:00:00', 'yyyy-MM-dd 23:59:59']
 * @returns
 */
export const getThisWeek = () => {
  const currentTime = new Date(YEAR, MONTH_INDEX, DAY).getTime();
  const startTime = currentTime - (DAY_OF_WEEK - 1) * 24 * 3600000;
  const endTime = currentTime + (8 - DAY_OF_WEEK) * 24 * 3600000 - 1000;
  return [startTime, endTime];
};

/**
 * 本月
 * ['yyyy-MM-dd 00:00:00', 'yyyy-MM-dd 23:59:59']
 * @returns
 */
export const getThisMonth = () => {
  const startTime = new Date(YEAR, MONTH_INDEX, 1).getTime();

  // 当前为 12 月
  if (MONTH_INDEX === 11) {
    const endTime = new Date(YEAR + 1, 0, 1).getTime() - 1000;
    return [startTime, endTime];
  }

  // 当前非 12 月
  const endTime = new Date(YEAR, MONTH_INDEX + 1, 1).getTime() - 1000;
  return [startTime, endTime];
};

/**
 * 获取前 x 月
 * ['yyyy-MM-dd 00:00:00', 'yyyy-MM-dd 23:59:59']
 * @param {*} x
 * @returns
 */
export const getWithinXMonth = (x) => {
  const startTime = new Date(YEAR, MONTH_INDEX - x + 1, 1).getTime();

  // 当前为 12 月
  if (MONTH_INDEX === 11) {
    const endTime = new Date(YEAR + 1, 0, 1).getTime() - 1000;
    return [startTime, endTime];
  }

  // 当前非 12 月
  const endTime = new Date(YEAR, MONTH_INDEX + 1, 1).getTime() - 1000;
  return [startTime, endTime];
};

/**
 * 获取本年
 * ['yyyy-MM-dd 00:00:00', 'yyyy-MM-dd 23:59:59']
 * @returns
 */
export const getThisYear = () => {
  return [new Date(YEAR, 0, 1).getTime(), new Date(YEAR + 1, 0, 1).getTime() - 1000];
};
```

- [JavaScript Date（日期） 对象](https://www.runoob.com/js/js-obj-date.html)

- [Date - MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)
