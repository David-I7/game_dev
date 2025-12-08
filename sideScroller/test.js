"use strict";
var hello;
(function (hello) {
  hello[(hello["one"] = 0)] = "one";
  hello[(hello["two"] = 1)] = "two";
})(hello || (hello = {}));
let x = "three";
console.log(hello[1], hello["one"], hello[10], hello[x]);
console.log((hello["one"] = 1));
