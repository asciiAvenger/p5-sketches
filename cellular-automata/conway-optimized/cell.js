class Cell {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }

  draw() {
    fill(255);
    rect(this.col * cellW, this.row * cellH, cellW, cellH);
  }

  // adds this cells neighbors as candidates
  // for cells in the next generation
  addCellCandidates(cells) {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        // don't add the cell itself
        if (dr == 0 && dc == 0) {
          continue;
        }
        
        const row = this.row + dr;
        const col = this.col + dc;
        const key = hashKey(row, col);

        if (!cells.has(key)) {
          const cell = new Cell(row, col);
          cells.set(key, cell);
        }
      }
    }
  }

  countNeighbors(cells) {
    let sum = 0;

    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        // don't count the cell itself
        if (dr == 0 && dc == 0) {
          continue;
        }

        const key = hashKey(this.row + dr, this.col + dc);
        if (cells.has(key)) {
          sum += 1;
        }
      }
    }

    return sum;
  }
}
