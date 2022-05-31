//My scripts

// Get drawing for drawing
const container = document.querySelector("section");

let shapes = [...Array(50)].map(e => Array(50));;
let lastGenCells = [...Array(50)].map(e => Array(50));
let nextGenCells = [...Array(50)].map(e => Array(50));

// Set parameters for container
let params = {
  width: 1000,
  height: 1000
}; 

// `new` instantiation Two.js
const two = new Two(params);
// append to `container`
two.appendTo(container);
// shape.fill = "black";

let aliveColor = "rgb(255, 0, 0)";
let deadColor = "white";
let generation = 0;

const initializeGrid = (cells, shapes) => {
    for(let i = 0; i < 50; i++) {
        for(let j = 0; j < 50; j++) {
            let shape = two.makeRectangle(i * 20 + 10, j * 20 + 10, 20, 20);
            shape.fill = deadColor;
            // shape.stroke = "black";
            let cell = {
                alive : false,
                generation : 0,
                survives: 0,
                deaths: 0
            }
            cells[i][j] = cell;
            shapes[i][j] = shape;
        }
    }
};

const initializeLife = (cells, shapes) => {
    for(let i = 0; i < Math.floor(50 *50*.1); i++) {
        let x = Math.floor(Math.random() * 50);
        let y = Math.floor(Math.random() * 50);
        cells[x][y].alive = true;
        cells[x][y].generation++;
        shapes[x][y].fill = aliveColor;
    }

}



const nieghborSum =  (cells, columns, x, y) => {
    let sum = 0;

    //Wrapp arround by adding columns
    cells[(x-1+columns)%columns][(y-1+columns)%columns].alive ? sum++ : sum;
    cells[(x-1+columns)%columns][y].alive ? sum++ : sum;
    cells[(x-1+columns)%columns][(y+1+columns)%columns].alive ? sum++ : sum;
    cells[x][(y-1+columns)%columns].alive ? sum++ : sum;
    cells[x][(y+1+columns)%columns].alive ? sum++ : sum;
    cells[(x+1+columns)%columns][(y-1+columns)%columns].alive ? sum++ : sum;
    cells[(x+1+columns)%columns][y].alive ? sum++ : sum;
    cells[(x+1+columns)%columns][(y+1+columns)%columns ].alive ? sum++ : sum;
    
    return sum;
}

const nextGeneration = (currentGen, nextGen) => {
    for(let i = 0; i < 50; i++) {
        for(let j = 0; j < 50; j++) {
            let sum = nieghborSum(currentGen, currentGen[i].length, i, j);
            if(currentGen[i][j].alive) {
                if(sum < 2 || sum > 3) {
                    nextGen[i][j].alive = false;
                    nextGen[i][j].deaths+=2;
                }
                nextGen[i][j].survives++;
            }else{
                if(sum == 3) {
                    nextGen[i][j].alive = true;
                    nextGen[i][j].generation++;
                }
            }
        }
    }
}

const updateShapes = (cells, shapes) => {
    let colorSample;
    for(let i = 0; i < 50; i++) {
        for(let j = 0; j < 50; j++) {
            if(cells[i][j].alive) {

                //TODO: Limit the number of generations and reset after that

                let r = cells[i][j].generation % 255;
                let g = cells[i][j].survives % 255;
                let b = cells[i][j].deaths % 255;


                let color = `rgb(${r}, ${g}, ${b})`;
                colorSample = color;
                shapes[i][j].fill = color;
            }else{
                shapes[i][j].fill = deadColor;
            }
        }
    }
    console.log(colorSample);
}


initializeGrid(lastGenCells, shapes);
initializeLife(lastGenCells, shapes);
nextGenCells = Array.from(lastGenCells);



setInterval(function(){ 
    nextGeneration(lastGenCells, nextGenCells);
    generation++;
    let temp = Array.from(lastGenCells);
    lastGenCells = Array.from(nextGenCells);
    nextGenCells = Array.from(temp);
    updateShapes(lastGenCells, shapes);
    temp = null;
}, 100);






two.play();


