class Camera {
  constructor(x, y, fov) {
    this.pos = createVector(x, y);
    this.dir = createVector(1, 0);

    // fov is measured in degrees but for the rest of calculations
    // radians will be used
    const rays = [];
    const offsetStart = -fov / 2;
    const offsetStep = fov / columns;
    for (let i = 0; i < columns; i++) {
      rays.push(
        new Ray(this.pos, this.dir, radians(offsetStart + i * offsetStep)),
      );
    }
    this.rays = rays;
  }

  // lookAt(x, y) {
  //   const dx = x - this.pos.x;
  //   const dy = y - this.pos.y;
  //   this.dir = createVector(dx, dy).normalize();

  //   // update ray angle
  //   for (const ray of this.rays) {
  //     ray.updateAngle(this.dir);
  //   }
  // }

  turn(angle) {
    this.dir.rotate(angle);

    for (const ray of this.rays) {
      ray.updateAngle(this.dir);
    }
  }

  draw() {
    for (const ray of this.rays) {
      ray.draw();
    }

    push();
    strokeWeight(5);
    point(this.pos.x, this.pos.y);
    pop();
  }
}
