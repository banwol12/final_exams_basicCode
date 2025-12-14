// ============================================
// PlasmaBall 클래스
// 플라즈마 구슬 - 중심에서 번개가 뻗어나감
// ============================================
class PlasmaBall {
    constructor(x, y, radius) {
        this.position = createVector(x, y);
        this.radius = radius;
        this.numArcs = 8;  // 번개 가닥 수
        this.arcs = [];

        // 번개 가닥들 생성
        for (let i = 0; i < this.numArcs; i++) {
            this.arcs.push(new PlasmaArc(x, y, radius));
        }

        // 내부 글로우 색상
        this.coreHue = 280;
        this.pulsePhase = 0;
    }

    // 위치 업데이트
    updatePosition(x, y) {
        this.position.x = lerp(this.position.x, x, 0.08);
        this.position.y = lerp(this.position.y, y, 0.08);

        // 모든 아크의 중심 업데이트
        for (let arc of this.arcs) {
            arc.center = this.position.copy();
        }
    }

    // 번개 업데이트 (마우스를 향해)
    update(targetX, targetY) {
        this.pulsePhase += 0.05;

        for (let i = 0; i < this.arcs.length; i++) {
            // 각 번개가 약간씩 다른 방향으로
            let angleOffset = (i / this.arcs.length) * TWO_PI;
            let spreadAngle = atan2(targetY - this.position.y, targetX - this.position.x);

            // 마우스 방향 + 분산
            let finalAngle = spreadAngle + sin(frameCount * 0.02 + angleOffset) * 0.5;

            let arcTargetX = this.position.x + cos(finalAngle) * this.radius;
            let arcTargetY = this.position.y + sin(finalAngle) * this.radius;

            this.arcs[i].generatePath(arcTargetX, arcTargetY);
        }
    }

    // 구슬 외곽 렌더링
    displaySphere() {
        // 외곽 글로우
        noStroke();
        for (let i = 5; i > 0; i--) {
            let alpha = map(i, 5, 0, 5, 30);
            let size = this.radius * 2 + i * 20;
            fill(280, 150, 200, alpha);
            ellipse(this.position.x, this.position.y, size);
        }

        // 유리 구슬 외곽
        noFill();
        stroke(200, 50, 255, 100);
        strokeWeight(3);
        ellipse(this.position.x, this.position.y, this.radius * 2);

        // 하이라이트
        stroke(200, 30, 255, 60);
        strokeWeight(1);
        arc(this.position.x - this.radius * 0.3,
            this.position.y - this.radius * 0.3,
            this.radius * 1.2, this.radius * 1.2,
            PI + 0.5, TWO_PI - 0.3);
    }

    // 중심 코어 렌더링
    displayCore() {
        let pulse = sin(this.pulsePhase) * 0.3 + 1;

        // 코어 글로우
        noStroke();
        for (let i = 4; i > 0; i--) {
            let alpha = map(i, 4, 0, 30, 150);
            let size = 30 * pulse + i * 15;
            fill(this.coreHue, 200, 255, alpha);
            ellipse(this.position.x, this.position.y, size);
        }

        // 밝은 코어
        fill(this.coreHue, 100, 255, 200);
        ellipse(this.position.x, this.position.y, 20 * pulse);

        // 가장 밝은 중심
        fill(0, 0, 255, 230);
        ellipse(this.position.x, this.position.y, 8 * pulse);
    }

    // 전체 렌더링
    display() {
        // 구슬 외곽 (뒤에)
        this.displaySphere();

        // 번개들
        for (let arc of this.arcs) {
            arc.display();
        }

        // 코어 (앞에)
        this.displayCore();
    }
}
