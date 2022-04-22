---
title: Echart v5.x
date: 2021-04-27
---

## 在打包环境中使用 Echarts v5.x

初始化

```javascript
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";

// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, LineChart } from "echarts/charts";

// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";

// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";

// 注册必须的组件
echarts.use([
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer,
]);
```

使用

```javascript
const el = document.getElementById("ID");
const chart = echarts.init(el);
const option = {
  // ...
};

chart.setOption(option);
```

## Echarts 相关

[Echarts 经纬度坐标实现地图定位](https://blog.csdn.net/liwan09/article/details/109689996)

[echarts 根据经纬度坐标在地图上描点](https://www.cnblogs.com/heyiming/p/11361666.html)

[ecomfe/awesome-echarts](https://github.com/ecomfe/awesome-echarts)

[plainheart/echarts-extension-gmap](https://github.com/plainheart/echarts-extension-gmap)

[sakitam-fdd/ol3Echarts](https://github.com/sakitam-fdd/ol3Echarts)
