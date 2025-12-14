// ============================================
// PlasmaBall 클래스
// 핵 + 전자 파티클 + 전기
// ============================================
class PlasmaBall {
    constructor(x, y, radius) {
        this.position = createVector(x, y);
        this.radius = radius;
        this.numArcs = 8;
        this.arcs = [];

        // 번개 생성
        for (let i = 0; i < this.numArcs; i++) {
            let angle = (i / this.numArcs) * TWO_PI;
            this.arcs.push(new PlasmaArc(angle));
        }

        // 전자 파티클들
        this.electrons = [];
        this.numElectrons = 30;
        for (let i = 0; i < this.numElectrons; i++) {
            this.electrons.push(new Electron(x, y, radius));
        }

        // 코어
        this.coreHue = 200;
        this.pulsePhase = 0;
    }

    // 핵 위치 업데이트
    updatePosition(mx, my) {
        this.position.x = mx;
        this.position.y = my;
    }

    // 업데이트
    update() {
        this.pulsePhase += 0.03;

        // 번개 업데이트
        for (let arc of this.arcs) {
            arc.generatePath(this.position.x, this.position.y, this.radius);
        }

        // 전자 업데이트
        for (let electron of this.electrons) {
            electron.update(this.position.x, this.position.y);
        }
    }

    // 전자 파티클 렌더링
    displayElectrons() {
        for (let electron of this.electrons) {
            electron.display();
        }
    }

    // 코어 렌더링
    displayCore() {
        let pulse = sin(this.pulsePhase) * 0.2 + 1;

        noStroke();
        for (let i = 4; i > 0; i--) {
            let alpha = map(i, 4, 0, 20, 150);
            let size = 25 * pulse + i * 12;
            fill(this.coreHue, 200, 255, alpha);
            ellipse(this.position.x, this.position.y, size);
        }

        fill(this.coreHue, 100, 255, 200);
        ellipse(this.position.x, this.position.y, 20 * pulse);

        fill(0, 0, 255, 220);
        ellipse(this.position.x, this.position.y, 8 * pulse);
    }

    // 전체 렌더링
    display() {
        // 전자 파티클
        this.displayElectrons();

        // 번개
        for (let arc of this.arcs) {
            arc.display();
        }

        // 코어
        this.displayCore();
    }
}

// ============================================
// Electron 클래스 (전자 파티클)
// ============================================
class Electron {
    constructor(centerX, centerY, maxRadius) {
        this.maxRadius = maxRadius;
        this.angle = random(TWO_PI);
        this.orbitRadius = random(50, maxRadius * 0.85);
        this.speed = random(0.005, 0.02);
        this.size = random(2, 5);
        this.hue = random(180, 220);
        this.alpha = random(100, 200);

        // 위치
        this.x = centerX + cos(this.angle) * this.orbitRadius;
        this.y = centerY + sin(this.angle) * this.orbitRadius;
    }

    update(centerX, centerY) {
        // 궤도 회전
        this.angle += this.speed;

        // 약간의 흔들림
        let wobble = noise(this.angle * 2) * 20 - 10;

        this.x = centerX + cos(this.angle) * (this.orbitRadius + wobble);
        this.y = centerY + sin(this.angle) * (this.orbitRadius + wobble);
    }

    display() {
        noStroke();

        // 글로우
        fill(this.hue, 200, 255, this.alpha * 0.3);
        ellipse(this.x, this.y, this.size * 3);

        // 코어
        fill(this.hue, 150, 255, this.alpha);
        ellipse(this.x, this.y, this.size);
    }
}
