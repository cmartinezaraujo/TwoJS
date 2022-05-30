//My scripts

// Get drawing for drawing
const container = document.querySelector("section");

let cells = [...Array(50)].map(e => Array(50));

// Set parameters for container
let params = {
  width: 1000,
  height: 1000
};

// `new` instantiation Two.js
const two = new Two(params);
// append to `container`
two.appendTo(container);

// let shape = two.makeRectangle(10, 10, 20, 20);
// shape.fill = "black";

// let shape2 = two.makeRectangle(30, 10, 20, 20);
// shape.fill = "black";


const initializeGrid = () => {
    for(let i = 0; i < 50; i++) {
        for(let j = 0; j < 50; j++) {
            let shape = two.makeRectangle(i * 20 + 10, j * 20 + 10, 20, 20);
            shape.fill = "white";
            // shape.stroke = "black";
            let cell = {
                shape: shape,
                alive : false
            }
            cells[i][j] = cell;
        }
    }
};

const initializeLife = () => {
    for(let i = 0; i < Math.floor(50 *50*.3); i++) {
        let x = Math.floor(Math.random() * 50);
        let y = Math.floor(Math.random() * 50);
        cells[x][y].alive = true;
        cells[x][y].shape.fill = "black";
    }

}

initializeGrid();
initializeLife();

two.play();


