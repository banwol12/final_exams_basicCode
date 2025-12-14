// ============================================
// Plasma Ball Simulation - Main Sketch
// 플라즈마 구슬 시뮬레이션
// NOC 기반
// ============================================

let plasmaBall;

function setup() {
  createCanvas(800, 600);
  colorMode(HSB, 360, 255, 255, 255);

  // 플라즈마 구슬 생성 (화면 중앙, 반지름 150)
  plasmaBall = new PlasmaBall(width / 2, height / 2, 150);
}

function draw() {
  // 어두운 배경 (잔상 효과)
  background(260, 80, 15, 50);

  // 플라즈마 구슬 위치 업데이트 (마우스 따라가기)
  plasmaBall.updatePosition(mouseX, mouseY);

  // 번개 업데이트 (마우스 방향으로)
  plasmaBall.update(mouseX, mouseY);

  // 렌더링
  plasmaBall.display();

  // 정보 표시
  displayInfo();
}

function displayInfo() {
  fill(0, 0, 255);
  noStroke();
  textSize(14);
  text('마우스를 움직여 플라즈마 구슬을 조종하세요', 20, 30);
  text('클릭: 번개 가닥 추가 | R: 리셋', 20, 50);
}

// 클릭으로 번개 가닥 추가
function mousePressed() {
  plasmaBall.arcs.push(new PlasmaArc(
    plasmaBall.position.x,
    plasmaBall.position.y,
    plasmaBall.radius
  ));
  plasmaBall.numArcs++;
}

// R키로 리셋
function keyPressed() {
  if (key === 'r' || key === 'R') {
    plasmaBall = new PlasmaBall(width / 2, height / 2, 150);
  }
}
