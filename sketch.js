// ============================================
// Plasma Simulation - Main Sketch
// 플라즈마 시뮬레이션 메인 스케치
// NOC 기반 파티클 시스템
// ============================================

let plasma;

function setup() {
  createCanvas(800, 600);
  colorMode(HSB, 360, 255, 255, 255);  // HSB 컬러 모드 (글로우 효과용)

  // 플라즈마 생성 (50개 전자)
  plasma = new Plasma(50);
}

function draw() {
  // 잔상 효과를 위한 반투명 배경
  background(240, 50, 20, 40);

  // 핵 위치를 마우스로 업데이트
  plasma.updateNucleus(mouseX, mouseY);

  // 플라즈마 업데이트 및 렌더링
  plasma.update();
  plasma.display();

  // 정보 표시
  displayInfo();
}

function displayInfo() {
  fill(0, 0, 255);
  noStroke();
  textSize(14);
  text('마우스를 움직여 플라즈마 핵을 조종하세요', 20, 30);
  text(`전자 수: ${plasma.electrons.length}`, 20, 50);
}

// 클릭으로 전자 추가
function mousePressed() {
  let angle = random(TWO_PI);
  let radius = random(30, 80);
  let x = mouseX + cos(angle) * radius;
  let y = mouseY + sin(angle) * radius;
  plasma.electrons.push(new Electron(x, y));
}

// 키보드로 전자 초기화
function keyPressed() {
  if (key === 'r' || key === 'R') {
    plasma = new Plasma(50);
  }
}
