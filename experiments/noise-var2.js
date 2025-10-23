function setup() {
  createCanvas(750, 750);
}

const size = 7.5;
const rows = 100;
const cols = 100;
const scale = 1 / 7;
let t = 0;

function draw() {
  background(173, 216, 230);
  noStroke();
  fill(0, 76, 153);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const n = noise(x * scale, y * scale, t * 1.5);
      const d = n * size * 1.6;
      ellipse(size / 2 + x * size, size / 2 + y * size, d * 1.2);
    }
  }

  t += 0.05;
}

let synth = null;
const notes = ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"];
const waves = ["sine", "square", "sawtooth", "triangle"];

function mousePressed() {
  if (Tone.getContext().state !== "running") {
    Tone.start();
  }

  if (!synth) {
    synth = new Tone.MonoSynth({
      oscillator: { type: "sine" },
      envelope: { attack: 0.2, decay: 0.3, sustain: 0.5, release: 0.8 },
    }).toDestination();
  }

  synth.oscillator.type = random(waves);
  const note = random(notes);
  synth.triggerAttackRelease(note, "4n");
}
