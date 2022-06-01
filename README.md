# Conway's Game of Life

In this project I implemented Conway's Game of Life using using Two.js to draw the game board and the cells. The game board is a grid of cells. Each cell has a state, either alive or dead. The game rules are as follows:

1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.

2. Any live cell with two or three live neighbours lives on to the next generation.

3. Any live cell with more than three live neighbours dies, as if by overcrowding.

4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

In my implementation I assigned a random hue to each cell. Each time the cell survives, it's saturation gets increased. This helps distinguish which cells on the grid are more dominant.

The initial state of the game board is set randomly and allows for 10% of the cells to be alive at the start of the game. After 300 iterations, the game board is set to a random state and the game starts again. Or in the case where there is no possible moves the game board will be automatically reset.

## Citations

[Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

[Two.js](https://two.js.org/)
