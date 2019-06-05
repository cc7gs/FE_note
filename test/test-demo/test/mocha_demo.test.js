const { expect } = require('chai');
const name = 'cc';
describe('String', () => {
  it('name should be a string', () => {
    expect(name).to.be.a('String');
  })
});
//异步代码
describe('Asynchronous', () => {
  it('done should be executed after 200s', done => {
    const fn = () => {
      expect(name).to.have.lengthOf(2);
      done();
    };
    setTimeout(fn, 200);
  })
});

describe('Promise', () => {
  it('use Promise', () => {
    return new Promise(resolve => {
      expect(name).to.equal('cc');
      resolve();
    })
  })
});
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
describe('hooks', () => {
  before(() => {
    console.log('所以测试用例之前执行');
  });
  after(() => {
    console.log('所有测试用例之后执行');
  });
  beforeEach(() => {
    console.log('在本区块每个用例之前执行');
  });
  afterEach(() => {
    console.log('本区块每个测试用例之后执行');
  })
})