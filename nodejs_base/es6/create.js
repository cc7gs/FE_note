// var person=Object.create(null);
// person.name='cc';
// console.log(typeof person);
// console.log(person,'person');
prototypeObject={
    fullName:function(){
        return this.firstName+''+this.lastName
    }
}

var person=Object.create(prototypeObject);
// console.log(prototypeObject);
person.firstName='w';
person.lastName='cc'
let res=person.fullName();

