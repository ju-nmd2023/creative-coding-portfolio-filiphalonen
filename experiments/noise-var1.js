function setup() {
  createCanvas(750, 750);
}

const size = 5;
const rows = 150;
const cols = 150;
const scale = 1 / 7;

function draw() {
  background(180, 200, 140);
  noStroke();
  fill(40, 60, 20);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const n = noise(x * scale, y * scale);
      const d = n * size * 1.5;
      ellipse(size / 2 + x * size, size / 2 + y * size, d);
    }
  }

  noLoop();
}
