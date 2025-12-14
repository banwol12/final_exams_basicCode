// ============================================
// PlasmaBall 클래스
// 핵이 마우스를 따라감
// ============================================
class PlasmaBall {
    constructor(x, y, radius) {
        this.position = createVector(x, y);
        this.radius = radius;
        this.numArcs = 10;
        this.arcs = [];

        // 다방면으로 번개 생성
        for (let i = 0; i < this.numArcs; i++) {
            let angle = (i / this.numArcs) * TWO_PI;
            this.arcs.push(new PlasmaArc(angle));
        }

        // 코어
        this.coreHue = 200;  // 파란색
        this.pulsePhase = 0;
    }

    // 핵 위치를 마우스로 업데이트
    updatePosition(mx, my) {
        this.position.x = mx;
        this.position.y = my;
    }

    // 번개 업데이트
    update() {
        this.pulsePhase += 0.03;

        for (let arc of this.arcs) {
            arc.generatePath(this.position.x, this.position.y, this.radius);
        }
    }

    // 중심 코어 렌더링
    displayCore() {
        let pulse = sin(this.pulsePhase) * 0.2 + 1;

        // 코어 글로우 (파란색)
        noStroke();
        for (let i = 4; i > 0; i--) {
            let alpha = map(i, 4, 0, 20, 150);
            let size = 25 * pulse + i * 12;
            fill(this.coreHue, 200, 255, alpha);
            ellipse(this.position.x, this.position.y, size);
        }

        // 밝은 코어
        fill(this.coreHue, 100, 255, 200);
        ellipse(this.position.x, this.position.y, 20 * pulse);

        // 가장 밝은 중심
        fill(0, 0, 255, 220);
        ellipse(this.position.x, this.position.y, 8 * pulse);
    }

    // 전체 렌더링
    display() {
        // 번개들
        for (let arc of this.arcs) {
            arc.display();
        }

        // 코어
        this.displayCore();
    }
}
