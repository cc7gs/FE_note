---
title: 调试
order: 1
nav:
  title: 基础篇
  path: /basic
  order: 1
group:
  title: other
  path: /other
---

# vsocde 调试概念

1. launch / attach 要使用 vscode 的调试功能，首先就得配置 .vscode/launch.json 文件。以最简单的 Node 调试配置为例：

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch",
            "program": "${workspaceRoot}/index.js"
        },
        {
            "type": "node",
            "request": "attach",
            "name": "Attach",
            "port": 5858
        }
    ]
}
```

其中最重要的参数是 request ，它的取值有两种 launch 和 attach。

- launch 模式：由 vscode 来启动一个独立的具有 debug 模式的程序
- attach 模式：附加于（也可以说“监听”）一个已经启动的程序（必须已经开启 Debug 模式）

## 浏览器调试

```
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch index.html",
      "sourceMaps": true,
      "file": "${workspaceRoot}/index.html"
    },
  ]
}
```

# 调试 ts

## 直接调试(vscode)

**在 tsconfig.json 中 打开 sourceMap**

```
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "noImplicitAny": true,
        "outDir": "./dist",
        "sourceMap": true
    },
    "include": [
        "src/**/*"
    ]
}
```

**配置自动编译** 添加或编辑文件 /.vscode/launch.json

```
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "launch",
            "type": "node",
            "request": "launch",
            "program": "${workspaceRoot}/dist/main.js",
            "args": [],
            "cwd": "${workspaceRoot}",
            "protocol": "inspector"
        }
    ]
}
```

注意 : program 需设置为你要调试的 ts 生成的对应的 js。 假如需要调试 /src/main.ts,则此处为 ${workspaceRoot}/dist/main.js。 **调试** 打开 main.ts，在左侧添加断点，进行调试。

## 通过 ts-node

- 安装 npm 依赖包

```
npm install typescript --save-dev
npm install ts-node --save-dev
```

- 配置 tsconfig.json

```
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "noImplicitAny": true,
        "outDir": "./dist",
        "sourceMap": true  //主要是这个配置
    },
    "include": [
        "src/**/*"
    ]
}
```

- 配置 launch.json 打开 DEBUG 界面，添加 配置或者编辑 /.vscode/launch.json。

```
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5",
        "noImplicitAny": true,
        "outDir": "./dist",
        "sourceMap": true
    },
    "include": [
        "src/**/*"
    ]
}
```

- 调试
  1. 打开要调试的 ts 文件，添加 debugger。
  2. 打开 debug 界面。
  3. 在 DEBUG 后 选择 launch.json 中对应的配置，此处为 Current TS File。
  4. 点击运行按键或者按 F5 运行。

# 参考原文

[参考仓库地址](https://github.com/Enterprise-JS/vscode-ts-node-debugging) [英文版原文](https://medium.com/@dupski/debug-typescript-in-vs-code-without-compiling-using-ts-node-9d1f4f9a94a) [关于 vscode 调试概念原文地址](https://jerryzou.com/posts/vscode-debug-guide/) [关于浏览器调试原文地址](http://shooterblog.site/2018/05/19/%E6%89%8B%E6%8A%8A%E6%89%8B%E6%95%99%E4%BD%A0%E7%94%A8Vscode%20Debugger%E8%B0%83%E8%AF%95%E4%BB%A3%E7%A0%81/#%E6%9C%89%E7%82%B9%E9%AB%98%E7%BA%A7%E7%9A%84%E7%94%A8%E6%B3%95-%E5%8A%A0Attach)
