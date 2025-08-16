let cells = [];

const rows = 200;
const cols = 200;

let cellW;
let cellH;

function setup() {
  createCanvas(1000, 1000);

  cellW = width / cols;
  cellH = height / rows;

  for (let r = 0; r < rows; r++) {
    cells[r] = [];
    for (let c = 0; c < cols; c++) {
      cells[r][c] = floor(random(2));
    }
  }
}

function draw() {
  background(0);
  fill(255);
  // stroke(0);

  const nextCells = [];

  for (let r = 0; r < rows; r++) {
    nextCells[r] = [];

    for (let c = 0; c < cols; c++) {
      // draw the currently alive cells
      if (cells[r][c] > 0) {
        rect(c * cellW, r * cellH, cellW, cellH);
      }

      // update cells for next iteration
      neighbors = countNeighbors(cells, r, c, rows, cols);
      nextCells[r][c] = 0;
      if (neighbors == 3 || (cells[r][c] > 0 && neighbors == 2)) {
        nextCells[r][c] = 1;
      }
    }
  }

  cells = nextCells;
}

function countNeighbors(cells, row, col, numRows, numCols) {
  sum = 0;

  for (let dr = -1; dr <= 1; dr++) {
    // skip counting if the row is outside of the cells matrix
    if (row + dr < 0 || row + dr > numRows - 1) {
      continue;
    }

    for (let dc = -1; dc <= 1; dc++) {
      // don't count the cell itself and skip counting if the column is outside of the cells matrix
      if ((dr == 0 && dc == 0) || col + dc < 0 || col + dc > numCols - 1) {
        continue;
      }

      sum += cells[row + dr][col + dc];
    }
  }

  return sum;
}
