import { extname, resolve, dirname } from 'path';
import { existsSync, readFileSync } from 'fs';
import { runInThisContext } from 'vm';

/**
 *
 */

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

const content = myRequire('./test.js');
console.log(content);
