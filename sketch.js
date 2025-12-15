// ============================================
// Plasma Ball - Main Sketch
// 화면 중앙 원형 캔버스 + 전자 파티클
// ============================================

let plasmaBall;
let canvasSize;

function setup() {
  // 화면 크기에 따라 캔버스 크기 결정 (작은 쪽의 80%)
  canvasSize = min(windowWidth, windowHeight) * 0.8;

  let canvas = createCanvas(canvasSize, canvasSize);
  canvas.style('border-radius', '50%');

  // 캔버스를 화면 중앙에 배치
  canvas.position((windowWidth - canvasSize) / 2, (windowHeight - canvasSize) / 2);

  colorMode(HSB, 360, 255, 255, 255);

  // 플라즈마 구슬
  plasmaBall = new PlasmaBall(width / 2, height / 2, width / 2 - 20);
}

// 창 크기 변경 시 재조정
function windowResized() {
  canvasSize = min(windowWidth, windowHeight) * 0.8;
  resizeCanvas(canvasSize, canvasSize);

  let canvas = document.querySelector('canvas');
  canvas.style.left = (windowWidth - canvasSize) / 2 + 'px';
  canvas.style.top = (windowHeight - canvasSize) / 2 + 'px';

  plasmaBall = new PlasmaBall(width / 2, height / 2, width / 2 - 20);
}

function draw() {
  // 어두운 파란 배경
  background(220, 80, 15, 80);

  // 핵 위치를 마우스로 업데이트 (캔버스 내 좌표로 변환)
  plasmaBall.updatePosition(mouseX, mouseY);

  // 업데이트 및 렌더링
  plasmaBall.update();
  plasmaBall.display();
}

// 클릭으로 전자 추가
function mousePressed() {
  plasmaBall.addElectron(mouseX, mouseY);
}

// R키로 리셋
function keyPressed() {
  if (key === 'r' || key === 'R') {
    plasmaBall = new PlasmaBall(width / 2, height / 2, width / 2 - 20);
  }
}
