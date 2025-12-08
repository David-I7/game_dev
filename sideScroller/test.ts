enum hello {
  one,
  two,
}

let x: "one" = "three" as "one";

console.log(hello[1], hello["one"], hello[10], hello[x]);
