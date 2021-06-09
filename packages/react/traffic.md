---
nav:
  title: React基础篇
  path: /react
group:
  title: 练习题
  path: /demo
---

# js 版 实现红绿灯

题目:

> 默认情况下，红灯亮 20 秒，并且最后 5 秒闪烁绿灯亮 20 秒，并且最后 5 秒闪烁黄灯亮 10 秒，次序为：红-绿-黄-红-绿-黄灯的个数、颜色、持续时间、闪烁时间、灯光次序都可配置，如：lights=[{color: '#fff', duration: 10000, twinkleDuration: 5000}, ... ]

# js 版

```js
function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
async function changeLight(color, duration) {
  console.log(color);
  await sleep(duration);
}

async function trafficLight() {
  await changeLight('green', 10000);
  await changeLight('yellow', 2000);
  await changeLight('red', 5000);
  trafficLight();
}

trafficLight();
```

# React 版

<code src="./demo/traffic/index.tsx" title="react 版本">
