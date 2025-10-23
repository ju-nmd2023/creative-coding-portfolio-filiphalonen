function setup() {
  createCanvas(750, 750);
  background(255, 154, 0);
  field = generateField();
  agents = generateAgents();
}

const cell = 20;
const cols = Math.ceil(750 / cell);
const rows = Math.ceil(750 / cell);

const scale = 1 / 70;
const numAgents = 200;
const maxSpeed = 2.5;
const maxForce = 3;

let field = [];
let agents = [];

class Agent {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.prev = this.pos.copy();
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
  }

  follow(dir) {
    const desired = dir.copy().mult(maxSpeed);
    const steer = p5.Vector.sub(desired, this.vel).limit(maxForce);
    this.acc.add(steer);
  }

  update() {
    this.prev = this.pos.copy();
    this.vel.add(this.acc).limit(maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  wrap() {
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.prev.x = width;
    } else if (this.pos.x > width) {
      this.pos.x = 0;
      this.prev.x = 0;
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.prev.y = height;
    } else if (this.pos.y > height) {
      this.pos.y = 0;
      this.prev.y = 0;
    }
  }

  draw() {
    stroke(255, 219, 0);
    strokeWeight(0.3);
    line(this.prev.x, this.prev.y, this.pos.x, this.pos.y);
  }
}

function generateField() {
  const f = [];
  noiseSeed(Math.random() * 100);
  for (let x = 0; x < cols; x++) {
    f.push([]);
    for (let y = 0; y < rows; y++) {
      const angle = noise(x * scale, y * scale) * TWO_PI;
      f[x].push(p5.Vector.fromAngle(angle));
    }
  }
  return f;
}

function generateAgents() {
  const list = [];
  for (let i = 0; i < numAgents; i++) {
    list.push(new Agent(random(width), random(height)));
  }
  return list;
}

function draw() {
  for (let a of agents) {
    const cx = constrain(floor(a.pos.x / cell), 0, cols - 1);
    const cy = constrain(floor(a.pos.y / cell), 0, rows - 1);
    a.follow(field[cx][cy]);
    a.update();
    a.wrap();
    a.draw();
  }
}
