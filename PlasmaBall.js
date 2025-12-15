// ============================================
// PlasmaBall 클래스
// 핵 + 전자들 (각 전자가 핵과 1:1 전기 연결)
// ============================================
class PlasmaBall {
    constructor(x, y, radius) {
        this.position = createVector(x, y);
        this.radius = radius;

        // 전자 파티클들
        this.electrons = [];
        this.numElectrons = 15;  // 개수 조정
        for (let i = 0; i < this.numElectrons; i++) {
            let angle = (i / this.numElectrons) * TWO_PI + random(-0.3, 0.3);
            let dist = random(60, radius * 0.75);
            let ex = x + cos(angle) * dist;
            let ey = y + sin(angle) * dist;
            this.electrons.push(new Electron(ex, ey));
        }

        // 코어
        this.coreHue = 200;
        this.pulsePhase = 0;
    }

    // 핵 위치 업데이트 (마우스 따라감)
    updatePosition(mx, my) {
        this.position.x = mx;
        this.position.y = my;
    }

    // 전자 추가 (클릭 시)
    addElectron(mx, my) {
        // 클릭 위치 근처에 전자 생성
        let angle = random(TWO_PI);
        let dist = random(50, this.radius * 0.7);
        let ex = this.position.x + cos(angle) * dist;
        let ey = this.position.y + sin(angle) * dist;
        this.electrons.push(new Electron(ex, ey));
    }

    // 업데이트
    update() {
        this.pulsePhase += 0.03;

        for (let electron of this.electrons) {
            // 핵에 대한 인력
            let attraction = electron.attractTo(this.position);
            electron.applyForce(attraction);

            // 궤도 속도
            electron.addOrbitalVelocity(this.position);

            // 마찰력
            electron.velocity.mult(0.98);

            // 물리 업데이트
            electron.update();

            // 구슬 안에 유지
            this.constrainElectron(electron);

            // 전기 경로 생성 (핵과 1:1 연결)
            electron.generateArc(this.position);
        }
    }

    // 전자를 구슬 안에 유지
    constrainElectron(electron) {
        let d = p5.Vector.dist(electron.position, this.position);
        if (d > this.radius * 0.85) {
            let dir = p5.Vector.sub(electron.position, this.position);
            dir.normalize();
            electron.position = p5.Vector.add(this.position, dir.mult(this.radius * 0.85));
            electron.velocity.mult(-0.3);
        }
        // 너무 가까우면 밀어냄
        if (d < 40) {
            let dir = p5.Vector.sub(electron.position, this.position);
            dir.normalize();
            electron.position = p5.Vector.add(this.position, dir.mult(40));
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
        // 전기 (뒤에)
        for (let electron of this.electrons) {
            electron.displayArc();
        }

        // 전자들
        for (let electron of this.electrons) {
            electron.display();
        }

        // 코어 (앞에)
        this.displayCore();
    }
}
