let cells;

const rows = 500;
const cols = 500;

let cellW;
let cellH;

function setup() {
  createCanvas(1000, 1000);

  cells = new Set();

  cellW = width / cols;
  cellH = height / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (floor(random(2)) > 0) {
        cells.add(toKey(r, c, cols));
      }
    }
  }
}

function draw() {
  background(0);
  fill(255);

  const cellCandidates = new Set();

  for (const cellKey of cells.values()) {
    const [row, col] = toRowCol(cellKey, cols);

    // draw currently alive cells
    rect(col * cellW, row * cellH, cellW, cellH);

    // add cell candidates for next iteration
    addCellCandidates(row, col, cols, cellCandidates);
  }

  const nextCells = new Set();

  for (const cellKey of cellCandidates.values()) {
    const [row, col] = toRowCol(cellKey, cols);

    // count the cells neighbors in the current generation of cells
    const numNeighbors = countNeighbors(row, col, cols, cells);

    if (numNeighbors == 3 || (cells.has(cellKey) && numNeighbors == 2)) {
      nextCells.add(cellKey);
    }
  }

  cells = nextCells;
}

function toKey(row, col, numCols) {
  return col + row * numCols;
}

function toRowCol(key, numCols) {
  const row = floor(key / numCols);
  const col = key % numCols;
  return [row, col];
}

function addCellCandidates(row, col, numCols, candidates) {
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      // don't add the cell itself
      if (dr == 0 && dc == 0) {
        continue;
      }

      const r = row + dr;
      const c = col + dc;
      const key = toKey(r, c, numCols);

      candidates.add(key);
    }
  }
}

function countNeighbors(row, col, numCols, cells) {
  let sum = 0;

  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      // don't count the cell itself
      if (dr == 0 && dc == 0) {
        continue;
      }

      const r = row + dr;
      const c = col + dc;
      const key = toKey(r, c, numCols);
      if (cells.has(key)) {
        sum += 1;
      }
    }
  }

  return sum;
}
