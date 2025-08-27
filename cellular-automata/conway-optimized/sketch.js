let cells;

const rows = 400;
const cols = 400;

let cellW;
let cellH;
let totalCells;

function setup() {
  createCanvas(1000, 1000);

  cells = new Set();

  cellW = width / cols;
  cellH = height / rows;

  totalCells = rows * cols;

  for (let i = 0; i < totalCells; i++) {
    if (floor(random(2)) > 0) {
      cells.add(i);
    }
  }
}

function draw() {
  background(0);
  fill(255);
  stroke(0);

  const nextCells = new Set();

  for (const cellIndex of cells.values()) {
    const [x, y] = indexToCoords(cellIndex);

    // draw currenly alive cells
    rect(x, y, cellW, cellH);

    // add cell candidates for next iteration
    addCellCandidates(cellIndex, nextCells);
  }

  for (const cellIndex of nextCells.values()) {
    const numNeighbors = countNeighbors(cellIndex, cells);

    if (!(numNeighbors == 3 || (cells.has(cellIndex) && numNeighbors == 2))) {
      nextCells.delete(cellIndex);
    }
  }

  cells = nextCells;
  // noLoop();
}

function indexToCoords(i) {
  const x = (i % cols) * cellW;
  const y = floor(i / rows) * cellH;

  return [x, y];
}

// all surrounding cells are potential candidates that
// have to be checked before the next generation
// in the row: index - 1, index, index + 1
// in the column: index - cols, index, index + cols
function addCellCandidates(index, candidates) {
  const col = index % cols;
  for (let i = -1; i <= 1; i++) {
    const newCol = col + i;

    if (newCol < 0 || newCol >= cols) {
      continue;
    }

    for (let j = -cols; j <= index + cols + 1; j += cols) {
      const newIndex = index + i + j;

      if (newIndex < 0 || newIndex >= totalCells) {
        continue;
      }

      candidates.add(newIndex);
    }
  }
}

// counts the number of neighbors a cell with the index index
// has inside of the cells set
function countNeighbors(index, cells) {
  let sum = 0;
  const col = index % cols;
  const row = floor(index / rows);

  for (let currentCol = col - 1; currentCol <= col + 1; currentCol++) {
    if (currentCol < 0 || currentCol >= cols) {
      continue;
    }

    for (let currentRow = row - 1; currentRow <= row + 1; currentRow++) {
      // don't count the cell itself
      if (
        currentRow < 0 ||
        currentRow >= rows ||
        (col == currentCol && row == currentRow)
      ) {
        continue;
      }

      const currentIndex = currentRow * rows + currentCol;
      if (cells.has(currentIndex)) {
        sum++;
      }
    }
  }

  return sum;
}
