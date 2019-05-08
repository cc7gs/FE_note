chapter-7 单元测试
- TDD 测试驱动开发 倡导首先测试程序,然后编码实现其功能
- BDD 对测试开发的回应, 倡导软件项目开发者、测试人员和非技术人员进行协作,通过自然语言书写非程序员可度的测试用例扩展测试驱动开发方法。
# Chai断言库
Chai 包含3个断言库,其中BDD风格的 Expect/Should和 TDD风格的Assert。
** 案例在 test目录下**

> npm install chai --save
# Mocha 使用
Mocka 是一个功能丰富且流行的Javascript测试框架。所谓测试框架就是运行测试的工具会接管单元测试代码的执行。
**安装**
> npm i mocha -D
## 使用
1. describe 和it
```javascript
const { expect } = require('chai');
const name = 'cc';
describe('String', () => {
  it('name should be a string', () => {
    expect(name).to.be.a('String');
  })
});
```
2. 异步代码
   
``` javascript
   //方式一、回调函数
describe('Asynchronous', () => {
  it('done should be executed after 200s', done => {
    const fn = () => {
      expect(name).to.have.lengthOf(2);
      done();
    };
    setTimeout(fn, 200);
  })
});
 //方式二、Promise
describe('Promise', () => {
  it('use Promise', () => {
    return new Promise(resolve => {
      expect(name).to.equal('cc');
      resolve();
    })
  })
});
//方式三、 使用 saync/await
describe('use async', () => {
  it('use async', async () => {
    var testPromise = ()=>new Promise((resolve) => {
      setTimeout(() => {
        resolve('cc');
      }, 200);
    });
    const result = await testPromise();
    expect(result).to.equal('cc');
  });
});
```



