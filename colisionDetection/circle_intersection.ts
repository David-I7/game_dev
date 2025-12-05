type circle_coord = {
  x: number;
  y: number;
  r: number;
};

const circle1: circle_coord = {
  x: 50,
  y: 50,
  r: 10,
};
const circle2: circle_coord = {
  x: 25,
  y: 25,
  r: 16,
};

const prnt = console.log;

function intersect(a: circle_coord, b: circle_coord) {
  let dx = a.x - b.x;
  let dy = a.y - b.y;

  let distance = Math.sqrt(dx * dx + dy * dy);
  let sumOfRadii = a.r + b.r;

  if (distance < sumOfRadii) {
    // circles intersect
    prnt("Intersection");
  } else if (distance == sumOfRadii) {
    // circles are touching
    prnt("Touching");
  } else if (distance > sumOfRadii) {
    // no collision
    prnt("No collison");
  }
}

intersect(circle1, circle2);
export default {};
