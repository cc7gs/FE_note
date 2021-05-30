const { assert } = require('chai');
const name = 'cc';
const stu = { name: 'cc', hobby: ['run', 'play basketball', 'play code'] };
assert.typeOf(name, 'string'); //判断name 是否是string
assert.typeOf(name, 'string', 'name is string'); //添加判断说明
assert.equal(name, 'c', `name equal 'cc'`); //判断name是不是等于 cc
assert.lengthOf(name, 2, 'name value has length of 2'); //判断name的字符串长度
assert.lengthOf(stu.hobby, 3, 'stu  has 3 type of hobby'); //判读bobby数组的长度
