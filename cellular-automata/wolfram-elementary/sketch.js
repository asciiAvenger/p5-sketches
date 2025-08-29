let cells;

const rows = 200;
const cols = 200;

let cellW;
let cellH;

let input;
let resetButton;
let rule = 1;
let binRule;

function setup() {
  createCanvas(1000, 1000);

  cellW = width / cols;
  cellH = height / rows;

  resetCells();

  input = createInput(1, "number");
  input.changed(updateRule);

  resetButton = createButton("Reset Simulation");
  resetButton.mousePressed(resetCells);

  binRule = decimalRuleToBinary(rule);
}

function draw() {
  background(0);
  noStroke();
  fill(255);

  // draw active cells
  for (let row = 0; row < cells.length; row++) {
    for (let col = 0; col < cells[row].length; col++) {
      if (cells[row][col] > 0) {
        rect(col * cellW, row * cellH, cellW, cellH);
      }
    }
  }

  // calculate cell values for the next iteration
  const nextCells = [];
  const lastCells = cells[cells.length - 1];

  for (let i = 0; i < cols; i++) {
    let leftIndex = i - 1;
    if (leftIndex < 0) {
      leftIndex = cols - 1;
    }

    let rightIndex = i + 1;
    if (rightIndex > cols - 1) {
      rightIndex = 0;
    }

    nextCells[i] = applyRule(
      lastCells[leftIndex],
      lastCells[i],
      lastCells[rightIndex],
    );
  }

  // append new cell row to the end of the cells array
  cells.push(nextCells);

  if (cells.length > rows) {
    cells.shift();
  }
}

// returns the value (0 or 1) for the globally set rule
// according to the cell value and its neighbor values
// interpreted as three digit binary number (0 - 7)
function applyRule(left, center, right) {
  const combinationStr = "" + left + center + right;
  return binRule[7 - parseInt(combinationStr, 2)];
}

function updateRule() {
  const rule = parseInt(input.value());
  binRule = decimalRuleToBinary(rule);
}

function resetCells() {
  cells = [];

  cells[0] = [];
  for (let i = 0; i < cols; i++) {
    cells[0][i] = 0;
  }
  cells[0][floor(cols / 2)] = 1;
}

function decimalRuleToBinary(decRule) {
  const strRule = decRule.toString(2).split("");
  const leadingZeros = 8 - strRule.length;

  const rule = [];
  for (let i = 0; i < 8; i++) {
    if (i < leadingZeros) {
      rule[i] = 0;
      continue;
    }

    rule[i] = parseInt(strRule[i - leadingZeros]);
  }

  return rule;
}
