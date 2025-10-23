function setup() {
  createCanvas(750, 750);
}

const size = 10;
const rows = 75;
const cols = 75;
const scale = 1 / 15;

function draw() {
  background(0);
  noStroke();
  fill(255);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const n = noise(x * scale, y * scale);
      const d = n * size;
      ellipse(size / 2 + x * size, size / 2 + y * size, d);
    }
  }

  noLoop();
}
