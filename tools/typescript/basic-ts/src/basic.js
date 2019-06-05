var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
console.log('enum:', c); //1
var ColorTwo;
(function (ColorTwo) {
    ColorTwo[ColorTwo["Red"] = 1] = "Red";
    ColorTwo[ColorTwo["Green"] = 2] = "Green";
    ColorTwo[ColorTwo["Blue"] = 3] = "Blue";
})(ColorTwo || (ColorTwo = {}));
var colorName = ColorTwo[1];
console.log('enum2:', colorName); //Green
function printLabel(labelledObj) {
    console.log(labelledObj.label);
}
var myobj = { size: 10, label: 'size 10 Object' };
printLabel(myobj);
var mySearch = function (source, subString) {
    return source.search(subString) > -1;
};
var myArray = ['cc', 'wgs'];
function getCounter() {
    var counter = function (start) {
    };
    counter.interval = 23;
    counter.reset = function () {
        console.log('reset call func');
    };
    return counter;
}
var counter = getCounter();
counter(10);
counter.reset();
counter.interval = 5;
