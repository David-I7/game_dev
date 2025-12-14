const circle1 = {
    x: 50,
    y: 50,
    r: 10,
};
const circle2 = {
    x: 25,
    y: 25,
    r: 16,
};
const prnt = console.log;
function intersect(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let sumOfRadii = a.r + b.r;
    if (distance < sumOfRadii) {
        // circles intersect
        prnt("Intersection");
    }
    else if (distance == sumOfRadii) {
        // circles are touching
        prnt("Touching");
    }
    else if (distance > sumOfRadii) {
        // no collision
        prnt("No collison");
    }
}
intersect(circle1, circle2);
export default {};
