var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
console.log('enum:', c);
var ColorTwo;
(function (ColorTwo) {
    ColorTwo[ColorTwo["Red"] = 1] = "Red";
    ColorTwo[ColorTwo["Green"] = 2] = "Green";
    ColorTwo[ColorTwo["Blue"] = 3] = "Blue";
})(ColorTwo || (ColorTwo = {}));
var colorName = ColorTwo[1];
console.log(ColorTwo[0], ColorTwo[1], ColorTwo[2], ColorTwo[3]);
console.log('enum2:', colorName);
