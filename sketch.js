let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 10000;

function setup() {
  createCanvas(400, 400);
  // create random walls/boundaries
  for (let i = 0; i < 5; i++) {
    let x1 = random(width);
    let x2 = random(width);
    let y1 = random(height);
    let y2 = random(height);
    walls[i] = new Boundary(x1, y1, x2, y2);
  }
  // put boundaries along each of the 4 edges
  // top wall
  walls.push(new Boundary(0, 0, width, 0));
  // right wall
  walls.push(new Boundary(width, 0, width, height));
  // bottom wall
  walls.push(new Boundary(width, height, 0, height));
  // left wall
  walls.push(new Boundary(0, height, 0, 0));

  particle = new Particle();
}

function draw() {
  background(0);
  // show all the walls
  for (let wall of walls) {
    wall.show();
  }
  // move the particle with your own mouse
  // particle.update(mouseX, mouseY);

  // use noise function to move particle automatically with offset
  particle.update(noise(xoff) * width, noise(yoff) * height);
  particle.show();
  particle.look(walls);

  xoff += 0.01;
  yoff += 0.01;
  // ray.show()s
  // ray.lookAt(mouseX, mouseY);

  // let pt = ray.cast(wall);
  // // console.log(pt);
  // if (pt) {
  //   fill(255);
  //   ellipse(pt.x, pt.y, 8, 8);
  // }
}
