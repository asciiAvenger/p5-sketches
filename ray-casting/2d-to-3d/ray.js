class Ray {
  constructor(position, cameraDirection, offset) {
    this.pos = position;
    this.offset = offset;

    this.updateAngle(cameraDirection);
  }

  draw() {
    push();
    stroke(125);
    translate(this.pos.x, this.pos.y);
    line(0, 0, this.dir.x * 100, this.dir.y * 100);
    pop();
  }

  updateAngle(cameraDirection) {
    const newDir = cameraDirection.copy();
    newDir.rotate(this.offset);
    this.dir = newDir;
  }

  // intersect using intersection logic with two line segments
  // https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
  intersect(boundary) {
    const x1 = boundary.start.x;
    const y1 = boundary.start.y;
    const x2 = boundary.end.x;
    const y2 = boundary.end.y;

    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;

    // the denominator is used in both equations for t and u
    // and can additionally be 0 if both line segments are parallel
    const sharedDenominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (sharedDenominator == 0) {
      return;
    }

    const t =
      ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / sharedDenominator;
    const u =
      -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / sharedDenominator;

    if (t > 0 && t < 1 && u > 0) {
      const ix = x1 + t * (x2 - x1);
      const iy = y1 + t * (y2 - y1);
      const intersection = createVector(ix, iy);
      return intersection;
    }
  }
}
