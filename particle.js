// create that Particle that shoots the rays
class Particle {
  constructor() {
    // field of view
    this.fov = 45;
    this.pos = createVector(width / 2, height / 2);
    this.rays = [];
    // heading for particle rotation
    this.heading = 0;
    // increments the angles how much beams/rays shootout
    // where the particle is spreading its rays
    // field of vision of particle
    for (let angle = -this.fov / 2; angle < this.fov / 2; angle += 1) {
      this.rays.push(new Ray(this.pos, radians(angle)));
    }
  }

  // updates Field of View, resets the rays array
  updateFOV(fov) {
    this.fov = fov;
    this.rays = [];
    for (let angle = -this.fov / 2; angle < this.fov / 2; angle += 1) {
      this.rays.push(new Ray(this.pos, radians(angle) + this.heading));
    }
  }

  // rotating the heading and setting the angle of the array
  rotate(angle) {
    this.heading += angle;
    let index = 0;
    for (let a = -this.fov / 2; a < this.fov / 2; a += 1) {
      this.rays[index].setAngle(radians(a) + this.heading);
      index++;
    }
  }

  // moves the particle around
  move(amount) {
    const velocity = p5.Vector.fromAngle(this.heading);
    velocity.setMag(amount);
    this.pos.add(velocity);
  }

  // updates the particle position
  update(x, y) {
    this.pos.set(x, y);
  }

  look(walls) {
    // scene array of what the particle is looking at
    let scene = [];
    // see if rays hits wall
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];
      //  set variables for closest and record
      let closest = null;
      let record = Infinity;

      for (let wall of walls) {
        // if it hits wall draw a line
        const pt = ray.cast(wall);
        if (pt) {
          // p5 Vector function to calculate distance
          let distance = p5.Vector.dist(this.pos, pt);

          // angle relative to camera
          // prevent fish eye effect
          const angleRelativeToCamera = ray.dir.heading() - this.heading;
          distance *= cos(angleRelativeToCamera);

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
      // detecting the distance and keeping it in my SCENE array
      scene[i] = record;
    }
    // return the scene
    return scene;
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
