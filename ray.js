class Ray {
  constructor(pos, angle) {
    this.pos = pos;
    this.dir = p5.Vector.fromAngle(angle);
  }

  // set new angle
  setAngle(angle) {
    this.dir = p5.Vector.fromAngle(angle);
  }

  // test to see if ray is pointing at boundary
  lookAt(x, y) {
    this.dir.x = x - this.pos.x;
    this.dir.y = y - this.pos.y;
    this.dir.normalize();
  }

  show() {
    stroke(255);
    push();
    translate(this.pos.x, this.pos.y);
    line(0, 0, this.dir.x * 10, this.dir.y * 10);
    pop();
  }

  // see if ray casts on wall
  cast(wall) {
    // walls start and end point
    const x1 = wall.a.x;
    const y1 = wall.a.y;
    const x2 = wall.b.x;
    const y2 = wall.b.y;
    // position of array and end point of the array
    const x3 = this.pos.x;
    const y3 = this.pos.y;
    const x4 = this.pos.x + this.dir.x;
    const y4 = this.pos.y + this.dir.y;

    // denomoninator
    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    // lines are parallel
    if (den == 0) {
      return;
    }
    // value of t
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    // value of u
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

    // see if points are intersected
    if (t > 0 && t < 1 && u > 0) {
      // creates a point on the wall if their is an intersection
      const pt = createVector();
      pt.x = x1 + t * (x2 - x1);
      pt.y = y1 + t * (y2 - y1);
      return pt;
    } else {
      return;
    }
  }
}
