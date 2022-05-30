//My scripts

// Get drawing for drawing
const container = document.querySelector("section");

// Set parameters for container
let params = {
  width: 1000,
  height: 1000
};

// `new` instantiation Two.js
const two = new Two(params);
// append to `container`
two.appendTo(container);

let shape = two.makeRectangle(10, 10, 20, 20);
shape.fill = "black";

let shape2 = two.makeRectangle(30, 10, 20, 20);
shape.fill = "black";


two.play();

