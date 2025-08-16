let cells = new Set();

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
        cell = new Cell(r, c);
        cells.add(cell);
      }
    }
  }
}

function draw() {
  background(0);

  const cellCandidates = new Set();

  for (const cell of cells.values()) {
    // draw currently alive cells
    cell.draw();

    // add cell candidates for next iteration
    cell.addCellCandidates(cellCandidates);
  }
  console.log(cellCandidates.size);

  const nextCells = new Set();

  for (const cell of cellCandidates) {
    // count the cells neighbors in the current generation of cells
    numNeighbors = cell.countNeighbors(cells);
    console.log(numNeighbors);

    if (numNeighbors == 3 || (cells.has(cell) && numNeighbors == 2)) {
      nextCells.add(cell);
    }
  }

  cells = nextCells;
}
