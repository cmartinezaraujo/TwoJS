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
two.appendTo(container);


let aliveColor = "hsl(255, 0%, 0%)";
let deadColor = "hsl(255, 100%, 100%)";
let generation = 0;
const generationLimit = 300;

const initializeGrid = (cells, shapes) => {
    for(let i = 0; i < 50; i++) {
        for(let j = 0; j < 50; j++) {
            let shape = two.makeRectangle(i * 20 + 10, j * 20 + 10, 20, 20);
            // let shape = two.makeCircle(i * 20 + 10, j * 20 + 10, 10);
            shape.fill = deadColor;
            shape.stroke = "rgba(0, 0, 0, 0.5)";
            let cell = {
                alive : false,
                generation : 0,
                survives: 0,
                deaths: 0,
                hue: generateHue()
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
    let changes = 0;

    for(let i = 0; i < 50; i++) {
        for(let j = 0; j < 50; j++) {
            let sum = nieghborSum(currentGen, currentGen[i].length, i, j);
            if(currentGen[i][j].alive) {
                if(sum < 2 || sum > 3) {
                    nextGen[i][j].alive = false;
                    nextGen[i][j].deaths+=1;
                    changes++;
                }
                nextGen[i][j].survives++;
            }else{
                if(sum == 3) {
                    nextGen[i][j].alive = true;
                    nextGen[i][j].generation++;
                    changes++;
                }
            }
        }
    }

    return changes;
}

const updateShapes = (cells, shapes) => {
    for(let i = 0; i < 50; i++) {
        for(let j = 0; j < 50; j++) {
            if(cells[i][j].alive) {
                let s = Math.floor(cells[i][j].survives/((generationLimit/100) + 1));
                let color = `hsl(${cells[i][j].hue}, ${s}%, 50%)`;
                colorSample = color;
                shapes[i][j].fill = color;
            }else{
                shapes[i][j].fill = deadColor;
            }
        }
    }
}

const generateHue = () => {
    return Math.floor(Math.random() * 300);
}


initializeGrid(lastGenCells, shapes);
initializeLife(lastGenCells, shapes);
nextGenCells = Array.from(lastGenCells);



setInterval(function(){ 
    let changes = nextGeneration(lastGenCells, nextGenCells);
    generation++;
    let temp = Array.from(lastGenCells);
    lastGenCells = Array.from(nextGenCells);
    nextGenCells = Array.from(temp);
    updateShapes(lastGenCells, shapes);
    temp = null;

    if(generation % generationLimit == 0 || changes == 0) {
        initializeGrid(lastGenCells, shapes);
        initializeLife(lastGenCells, shapes);
        nextGenCells = Array.from(lastGenCells);
    }
    console.log(generation);

}, 100);

two.play();


