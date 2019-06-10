/**
 *@description 初识ts,包含函数定义、类、接口使用
 */


/**
 * @description 类型注解
 * @param person 
 */
function greeter(person: string) {
  return `hello, ${person}`
}
let user = 'cc';
console.log('类型注解',greeter(user));


interface Persion {
  firstName: string;
  lastName: string;
}
/**
 * @description 接口使用
 * @param person
 */
function greeterTwo(person: Persion) {
  return `Hello， ${person.firstName} ${person.lastName}`;
}
let userTwo = { firstName: 'wu', lastName: 'chen' };
console.log('接口',greeterTwo(userTwo));

/**
 * 类
 */
class Student {
  fullName: string;
  constructor(firstName: string, lastName: string) {
    this.fullName = firstName + '' + lastName;
  }
}

function greeterCls(fullName: string) {
  return `Hello，${fullName}`;
}
let userThree = new Student('wu', 'chen');
console.log('class:',greeterCls(userThree.fullName));