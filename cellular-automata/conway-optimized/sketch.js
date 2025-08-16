let cells = new Map();

const rows = 200;
const cols = 200;

let cellW;
let cellH;

function setup() {
  createCanvas(1000, 1000);

  cellW = width / cols;
  cellH = height / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (floor(random(2)) > 0) {
        const key = hashKey(r, c);
        const cell = new Cell(r, c);
        cells.set(key, cell);
      }
    }
  }
}

function hashKey(row, col) {
  return (row << 10) | col;
}

function draw() {
  background(0);

  const cellCandidates = new Map();

  for (const cell of cells.values()) {
    // draw currently alive cells
    cell.draw();

    // add cell candidates for next iteration
    cell.addCellCandidates(cellCandidates);
  }

  const nextCells = new Map();

  for (const cell of cellCandidates.values()) {
    // count the cells neighbors in the current generation of cells
    numNeighbors = cell.countNeighbors(cells);

    const key = hashKey(cell.row, cell.col);
    if (numNeighbors == 3 || (cells.has(key) && numNeighbors == 2)) {
      nextCells.set(key, cell);
    }
  }

  cells = nextCells;
}
