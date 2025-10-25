// how many columns are rendered via ray casting
// also how many rays are cast from the camera to any boundary
const columns = 50;
const renderWidth = 500;
const renderHeight = 500;

let camera;
let bounds;

function setup() {
  createCanvas(renderWidth * 2, renderHeight);
  camera = new Camera(250, 250, 90);
  bounds[0] = new Boundary(400, 100, 400, 400);
}

function draw() {
  // update everything in the scene
  camera.turn(0.01);

  camera.raycast();

  background(0);
  stroke(255);
  strokeWeight(1);

  camera.draw();
  testBoundary.draw();
}
