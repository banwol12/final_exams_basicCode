// ============================================
// Plasma Ball - Main Sketch
// 원형 캔버스 플라즈마 구슬
// ============================================

let plasmaBall;
let canvasSize = 500;

function setup() {
  // 원형 캔버스 생성
  let canvas = createCanvas(canvasSize, canvasSize);
  canvas.style('border-radius', '50%');  // p5.js로 원형 만들기

  colorMode(HSB, 360, 255, 255, 255);

  // 플라즈마 구슬
  plasmaBall = new PlasmaBall(width / 2, height / 2, width / 2 - 20);
}

function draw() {
  // 어두운 파란 배경
  background(220, 80, 15, 80);

  // 핵 위치를 마우스로 업데이트
  plasmaBall.updatePosition(mouseX, mouseY);

  // 업데이트 및 렌더링
  plasmaBall.update();
  plasmaBall.display();
}

// 클릭으로 번개 추가
function mousePressed() {
  let angle = random(TWO_PI);
  plasmaBall.arcs.push(new PlasmaArc(angle));
}

// R키로 리셋
function keyPressed() {
  if (key === 'r' || key === 'R') {
    plasmaBall = new PlasmaBall(width / 2, height / 2, width / 2 - 20);
  }
}
