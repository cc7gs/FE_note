/**
 *@description 初识ts,包含函数定义、类、接口使用
 */
/**
 * @description 类型注解
 * @param person
 */
function greeter(person) {
    return "hello, " + person;
}
var user = 'cc';
console.log('类型注解', greeter(user));
/**
 * @description 接口使用
 * @param person
 */
function greeterTwo(person) {
    return "Hello\uFF0C " + person.firstName + " " + person.lastName;
}
var userTwo = { firstName: 'wu', lastName: 'chen' };
console.log('接口', greeterTwo(userTwo));
/**
 * 类
 */
var Student = /** @class */ (function () {
    function Student(firstName, lastName) {
        this.fullName = firstName + '' + lastName;
    }
    return Student;
}());
function greeterCls(fullName) {
    return "Hello\uFF0C" + fullName;
}
var userThree = new Student('wu', 'chen');
console.log('class:', greeterCls(userThree.fullName));
