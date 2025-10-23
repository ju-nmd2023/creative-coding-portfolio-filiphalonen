function setup() {
  createCanvas(750, 750);
}

const size = 50;
const layers = 15;
const variance = size / layers;
const blues = ["#1565c0", "#42a5f5", "#90caf9"];

function getRandomValue(pos, variance) {
  return pos + map(Math.random(), 0, 1, -variance, variance);
}

function drawLayers(x, y, size, layers) {
  noFill();
  for (let i = 0; i < layers; i++) {
    if (Math.random() > 0.7) continue;

    stroke(blues[Math.floor(Math.random() * blues.length)]);

    const d = (size / layers) * i;
    const cx = getRandomValue(x, variance * 0.2);
    const cy = getRandomValue(y, variance * 0.2);
    const jd = d + map(Math.random(), 0, 1, -variance * 0.6, variance * 0.6);

    ellipse(cx, cy, jd, jd);
  }
}

function draw() {
  background(255);
  for (let y = 0; y < 15; y++) {
    for (let x = 0; x < 15; x++) {
      drawLayers(size / 2 + x * size, size / 2 + y * size, size, layers);
    }
  }
  noLoop();
}
