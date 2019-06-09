let walls = [];
let ray;
let particle;
let xoff = 0;
let yoff = 10000;

// hardcode scene dimensions
const sceneW = 400;
const sceneH = 400;
// slider for field of view
let sliderFOV;

function setup() {
  createCanvas(800, 400);
  // create random walls/boundaries within the scene
  for (let i = 0; i < 5; i++) {
    let x1 = random(sceneW);
    let x2 = random(sceneW);
    let y1 = random(sceneH);
    let y2 = random(sceneH);
    walls[i] = new Boundary(x1, y1, x2, y2);
  }
  // put boundaries along each of the 4 edges inside the scene

  // top wall
  walls.push(new Boundary(0, 0, sceneW, 0));
  // right wall
  walls.push(new Boundary(sceneW, 0, sceneW, sceneH));
  // bottom wall
  walls.push(new Boundary(sceneW, sceneH, 0, sceneH));
  // left wall
  walls.push(new Boundary(0, sceneH, 0, 0));

  particle = new Particle();
  // creates the slider from 0 to 360 field of view starting at 45 degrees
  sliderFOV = createSlider(0, 360, 45);
  // event listener for slider
  sliderFOV.input(changeFOV);
}

// change field of view event listener for grabbing slider's value
function changeFOV() {
  const fov = sliderFOV.value();
  particle.updateFOV(fov);
}

function draw() {
  // p5 function for setting key to rotate particle
  if (keyIsDown(LEFT_ARROW)) {
    particle.rotate(-0.1);
  } else if (keyIsDown(RIGHT_ARROW)) {
    particle.rotate(0.1);
  } else if (keyIsDown(UP_ARROW)) {
    particle.move(1);
  } else if (keyIsDown(DOWN_ARROW)) {
    particle.move(-1);
  }

  background(0);
  // show all the walls
  for (let wall of walls) {
    wall.show();
  }
  // move the particle with your own mouse
  // particle.update(mouseX, mouseY);

  // use noise function to move particle automatically with offset
  // particle.update(noise(xoff) * width, noise(yoff) * height);
  particle.show();

  // xoff += 0.01;
  // yoff += 0.01;

  // put scenes into this array of what the particle is looking at
  const scene = particle.look(walls);

  // actual width of scene
  const w = sceneW / scene.length;
  push();
  // translate to the middle, move to right hand side
  translate(sceneW, 0);

  // draw what the particle is looking at on the other screen
  for (let i = 0; i < scene.length; i++) {
    // describe what the first person view graphics wise looks like
    noStroke();

    const sceneSq = scene[i] * scene[i];
    const widthSq = sceneW * sceneW;
    //  brightness should be inverted to make it look more life like
    // map function to map distance with brightness
    const brightness = map(sceneSq, 0, widthSq, 255, 0);

    // map the height since rectangle is centered
    // futher away the shorted the height, the closer the longer the height
    const height = map(scene[i], 0, sceneW, sceneH, 0);

    fill(brightness);
    rectMode(CENTER);

    rect(i * w + w / 2, sceneH / 2, w + 1, height);
  }
  pop();

  // ray.show()s
  // ray.lookAt(mouseX, mouseY);

  // let pt = ray.cast(wall);
  // // console.log(pt);
  // if (pt) {
  //   fill(255);
  //   ellipse(pt.x, pt.y, 8, 8);
  // }
}
