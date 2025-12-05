"use strict";
const obj1 = {
    x: 100,
    y: 400,
    width: 50,
    height: 50,
};
const obj2 = {
    x: 50,
    y: 300,
    width: 100,
    height: 100,
};
function _intersect(a, b) {
    const x_collison = b.x < a.x + a.width && b.x + b.width > a.x;
    const y_collision = b.y < a.y + a.height && b.y + b.height > a.y;
    return x_collison && y_collision;
}
function intersects_rect(a, b) {
    if (b.x >= a.x + a.width ||
        b.x + b.width <= a.x ||
        b.y >= a.y + a.height ||
        b.y + b.height <= a.y) {
        return false;
    }
    else
        return true;
}
console.log(_intersect(obj1, obj2));
