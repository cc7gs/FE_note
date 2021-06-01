---
title: require源码分析
nav:
  title: node源码
  path: /node-source
---

# node 模块加载浅析

> 通过分析 require 加载模块流程,实现简易版本,本文环境 node v15.4.0

**调试数据**

```js
// main.js

require('./test');

// test.js
let a = 1;
console.log(this === module.exports, 'this');
module.exports = a;
```

\*\* 提示: vscode 断点调试要进入源码文件需要将 launch.json 中 `skipFiles`文件注释。

```
 // "skipFiles": [
 //   "<node_internals>/**"
 // ],
```

通过在`main.js`中打断点，进入`require`函数。

1. 首先会调用`makeRequireFunction`函数中 require 方法，传递当前路径`./test`

```js
// https://github.com/nodejs/node/blob/v15.4.0/lib/internal/modules/cjs/helpers.js#L48

(function (exports, require, module, process, internalBinding) {
  'use strict';

  function makeRequireFunction(mod) {
    const Module = mod.constructor;
    function require(path) {
      return mod.require(path);
    }
  }
});
```

1. 然后我们进入 `Module`构造函数原型方法 require 方法中

```js
// https://github.com/nodejs/node/blob/v15.4.0/lib/internal/modules/cjs/loader.js#L989

Module.prototype.require = function (id) {
  // 忽略其它校验条件
  return Module._load(id, this, /* isMain */ false);
};
```

此时我们先暂停探究`_load`方法实现细节，来去看看`Module`构造函数结构可能对后面会有一个宏观的理解。 [Module 源码戳这里](https://github.com/nodejs/node/blob/v15.4.0/lib/internal/modules/cjs/loader.js#L163)

```js
function Module(id = '', parent) {
  this.id = id;
  this.path = path.dirname(id);
  this.exports = {};
}
Module._cache = ObjectCreate(null); // ObjectCreate --> Object.create
Module._pathCache = ObjectCreate(null);
Module._extensions = ObjectCreate(null);

Module._load = function (request, parent, isMain) {};
Module._resolveFilename = function (request, parent, isMain) {};
Module.prototype.load = function (filename) {};
Module.prototype._compile = function (content, filename) {};
Module._extensions['.json'] = function (module, filename) {};
Module._extensions['.js'] = function (module, filename) {};
```

1. 加载`Module.load`方法

首先会检查缓存，是否存在请求方法，如果存在则立即返回，否则获取 filename 并缓存。该方法返回 `module.exports`即`Module`实例的 exports 属性。

```js
Module._load = function (request, parent, isMain) {
  const filename = Module._resolveFilename(request, parent, isMain);
  const cachedModule = Module._cache[filename];
  if (cachedModule) {
    return cachedModule.exports;
  }
  var module = new Module(filename, parent);
  Module._cache[filename] = module;
  tryModuleLoad(module, filename);
  return module.exports;
};
```

4. 解析文件名变成绝对路径且尝试加后缀 `resolveFilename`

[戳这里执行研究](https://github.com/nodejs/node/blob/v15.4.0/lib/internal/modules/cjs/loader.js#L769)

1. 加载模块 `tryModuleLoad`

```ts
function tryModuleLoad(module, filename) {
  var threw = true;
  try {
    module.load(filename);
    threw = false;
  } finally {
    if (threw) {
      delete Module._cache[filename];
    }
  }
}
```

```ts
Module.prototype.load = function (filename) {
  //
  var extension = findLongestRegisteredExtension(filename);
  Module._extensions[extension](this, filename);
  //...
};
```

6. 根据扩展名加载对应模块 `Module._extensions[extension](this,filename)`

今天主要关注`.js`文件加载流程，因此其它后缀执行研究，具体代码如下:

```ts
Module._extensions['.js'] = function (module, filename) {
  var content = fs.readFileSync(filename, 'utf8');
  module._compile(stripBOM(content), filename);
};

Module._extensions['.json'] = function (module, filename) {
  var content = fs.readFileSync(filename, 'utf8');
  try {
    module.exports = JSON.parse(stripBOM(content));
  } catch (err) {
    err.message = filename + ': ' + err.message;
    throw err;
  }
};

Module._extensions['.node'] = function (module, filename) {
  return process.dlopen(module, path.toNamespacedPath(filename));
};
```

7. 沙箱环境运行文件内容`compile`

   > 对该内容有兴趣的可以 了解本文该问题产生原因与解决方案[stripBOM](https://cnodejs.org/topic/5a138c5d9cae544d6e3838a6)

1. 通过 `(function (exports, require, module, __filename, __dirname) {})`包裹文件内容
1. vm.runInThisContext 创建沙箱环境
1. 执行该环境，参数含义如下：
   1. thisValue ==> exports
   2. exports ==> this.exports
   3. module ==> this
   4. filename ==> filename
   5. dirname ==> path.dirname(filename)

```ts
Module.prototype._compile = function(content, filename) {
  // ...
   const compiledWrapper = wrapSafe(filename, content, this);
  let result;
  const dirname = path.dirname(filename);
  const require = makeRequireFunction(this, redirects);
  const exports = this.exports;
  const thisValue = exports;
  const module = this;
  if (inspectorWrapper) {
    result = inspectorWrapper(compiledWrapper, thisValue, exports,
                              require, module, filename, dirname);
  } else {
    result = ReflectApply(compiledWrapper, thisValue,
                          [exports, require, module, filename, dirname]);
  }
   return result;
}

function wrapSafe(filename, content, cjsModuleInstance) {
   if (patched) {
    const wrapper = Module.wrap(content);
    return vm.runInThisContext(wrapper, {
      filename,
      lineOffset: 0,
      displayErrors: true,
      importModuleDynamically: async (specifier) => {
        const loader = asyncESM.ESMLoader;
        return loader.import(specifier, normalizeReferrerURL(filename));
      },
    });
  }
}
Module.wrap=function (content)=>  `(function (exports, require, module, __filename, __dirname) {
  ${content}
  \n})`;
```

🌰: 理解沙箱环境

```ts
let a = 1;

vm.runInThisContext('a'); // a is not defined
```

## 实践简易 require

```ts
import { extname, resolve, dirname } from 'path';
import { existsSync, readFileSync } from 'fs';
import { runInThisContext } from 'vm';

class Module {
  protected id: string;
  protected fileName: string;
  protected exports: {};

  constructor(id) {
    this.id = id;
    this.fileName = `${id}.js`;
    this.exports = {};
  }
  static extensions = {
    '.json': (mod) => {
      const content = readFileSync(mod.id, 'utf8');
      mod.exports = content;
    },
    '.js': (mod) => {
      const content = readFileSync(mod.id, 'utf8');
      const fnStr = Module.wrap(content);
      const fn = runInThisContext(fnStr);
      const exports = mod.exports;
      const require = myRequire;
      const __filename = mod.id;
      const __dirname = dirname(mod.id);
      fn.call(exports, exports, require, mod, __filename, __dirname);
    },
  };

  load(filename) {
    let extName = extname(filename);
    Module.extensions[extName](this);
  }
  static wrap(script) {
    const wrapper = [
      '(function (exports, require, module, __filename, __dirname) { ',
      script,
      '\n});',
    ];
    return wrapper.join('');
  }
  static cache = {};

  static load(filePath) {
    const fileName = Module.resolveFileName(filePath);
    if (!fileName) return;

    if (Module.cache[fileName]) {
      return Module.cache[fileName].exports;
    }

    const mod = new Module(fileName);
    Module.cache[fileName] = mod;
    mod.load(fileName);
    return mod.exports;
  }

  static resolveFileName(filePath) {
    // 返回该路径绝对路径
    const resFilePath = resolve(__dirname, filePath);
    // 判断路径是否存在
    const existPath = existsSync(resFilePath);
    if (existPath) {
      return resFilePath;
    }
    // 尝试添加后缀
    for (const key of Object.keys(Module.extensions)) {
      const finalFilePath = `${resFilePath}${key}`;
      if (existsSync(finalFilePath)) {
        return finalFilePath;
      }
    }
  }
}

function myRequire(path) {
  return Module.load(path);
}

// 用于测试

const content = myRequire('./test.js');
console.log(content);
```
