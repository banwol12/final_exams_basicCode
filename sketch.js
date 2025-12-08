// ============================================
// Classic Particle System - Main Sketch
// 클래식한 파티클 시스템 메인 스케치
// ============================================

let particleSystem;
let attractor;
let repeller;

function setup() {
  createCanvas(800, 600);

  // 파티클 시스템 생성 (화면 상단 중앙에서 파티클 방출)
  particleSystem = new ParticleSystem(createVector(width / 2, 50));

  // Attractor (끌어당기는 힘) - 화면 중앙
  attractor = new Attractor(width / 2, height / 2, 150);

  // Repeller (밀어내는 힘) - 화면 하단
  repeller = new Repeller(width / 2, height - 100, 100);
}

function draw() {
  background(30);

  // 드래그 중이면 위치 업데이트
  attractor.drag(mouseX, mouseY);
  repeller.drag(mouseX, mouseY);

  // 중력 (아래 방향 힘)
  let gravity = createVector(0, 0.1);
  particleSystem.applyForce(gravity);

  // Attractor의 힘 적용
  particleSystem.applyAttractor(attractor);

  // Repeller의 힘 적용
  particleSystem.applyRepeller(repeller);

  // 파티클 시스템 업데이트 및 렌더링
  particleSystem.addParticle();
  particleSystem.update();
  particleSystem.display();

  // Attractor와 Repeller 표시
  attractor.display();
  repeller.display();

  // 정보 표시
  displayInfo();
}

function displayInfo() {
  fill(255);
  noStroke();
  textSize(14);
  text(`Particles: ${particleSystem.particles.length}`, 20, 30);
  text('녹색 원: Attractor (끌어당김) - 드래그로 이동', 20, 50);
  text('빨간색 원: Repeller (밀어냄) - 드래그로 이동', 20, 70);
}

// ============================================
// 마우스 이벤트 핸들러
// ============================================

// 마우스 클릭 시
function mousePressed() {
  // Attractor 클릭 확인
  if (attractor.contains(mouseX, mouseY)) {
    attractor.startDrag(mouseX, mouseY);
  }
  // Repeller 클릭 확인
  if (repeller.contains(mouseX, mouseY)) {
    repeller.startDrag(mouseX, mouseY);
  }
}

// 마우스 버튼 놓을 때
function mouseReleased() {
  attractor.stopDrag();
  repeller.stopDrag();
}
