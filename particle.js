// create that Particle that shoots the rays
class Particle {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.rays = [];
    // increments the angles how much beams/rays shootout
    for (let a = 0; a < 360; a += 1) {
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }

  // move particle around
  update(x, y) {
    this.pos.set(x, y);
  }

  look(walls) {
    // see if rays hits wall
    for (let ray of this.rays) {
      //  set variables for closest and record
      let closest = null;
      let record = Infinity;

      for (let wall of walls) {
        // if it hits wall draw a line
        const pt = ray.cast(wall);
        if (pt) {
          // p5 Vector function to calculate distance
          const distance = p5.Vector.dist(this.pos, pt);
          if (distance < record) {
            // set new distance to record
            record = distance;
            // set closest to the new point
            closest = pt;
          }
        }
      }
      // if their is a closest point then draw a line to the boundary
      if (closest) {
        // give the lines some alpha
        stroke(255, 100);
        line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    }
  }

  // show the particles/rays
  show() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 4);
    for (let ray of this.rays) {
      ray.show();
    }
  }
}
