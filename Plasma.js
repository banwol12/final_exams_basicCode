// ============================================
// Plasma 클래스
// 여러 전자들을 관리하는 플라즈마 시스템
// ============================================
class Plasma {
    constructor(numElectrons) {
        this.electrons = [];
        this.nucleus = createVector(width / 2, height / 2);

        // 전자들 생성
        for (let i = 0; i < numElectrons; i++) {
            let angle = random(TWO_PI);
            let radius = random(50, 200);
            let x = width / 2 + cos(angle) * radius;
            let y = height / 2 + sin(angle) * radius;
            this.electrons.push(new Electron(x, y));
        }
    }

    // 핵 위치 업데이트 (마우스 따라가기)
    updateNucleus(x, y) {
        // 부드럽게 따라가기 (lerp)
        this.nucleus.x = lerp(this.nucleus.x, x, 0.1);
        this.nucleus.y = lerp(this.nucleus.y, y, 0.1);
    }

    // 전자들 업데이트
    update() {
        for (let electron of this.electrons) {
            // 핵에 대한 인력 적용
            let attraction = electron.attractTo(this.nucleus);
            electron.applyForce(attraction);

            // 궤도 운동 추가
            electron.addOrbitalVelocity(this.nucleus);

            // 약간의 마찰력 (안정화)
            electron.velocity.mult(0.99);

            // 업데이트
            electron.update();
            electron.edges();
        }
    }

    // 전자들 사이의 연결선 (플라즈마 아크)
    drawArcs() {
        for (let i = 0; i < this.electrons.length; i++) {
            for (let j = i + 1; j < this.electrons.length; j++) {
                let d = p5.Vector.dist(
                    this.electrons[i].position,
                    this.electrons[j].position
                );

                // 가까운 전자들끼리 아크(번개) 연결
                if (d < 60) {
                    let alpha = map(d, 0, 60, 150, 0);
                    stroke(220, 200, 255, alpha);
                    strokeWeight(1);
                    line(
                        this.electrons[i].position.x,
                        this.electrons[i].position.y,
                        this.electrons[j].position.x,
                        this.electrons[j].position.y
                    );
                }
            }
        }
    }

    // 핵 표시
    displayNucleus() {
        // 핵 글로우
        noStroke();
        for (let i = 5; i > 0; i--) {
            let alpha = map(i, 5, 0, 10, 60);
            let size = 30 + i * 15;
            fill(300, 200, 255, alpha);
            ellipse(this.nucleus.x, this.nucleus.y, size);
        }

        // 핵 코어
        fill(320, 150, 255, 200);
        ellipse(this.nucleus.x, this.nucleus.y, 25);

        // 핵 중심
        fill(0, 0, 255, 220);
        ellipse(this.nucleus.x, this.nucleus.y, 12);
    }

    // 전체 렌더링
    display() {
        // 아크 먼저 그리기 (뒤에)
        this.drawArcs();

        // 전자들 표시
        for (let electron of this.electrons) {
            electron.display();
        }

        // 핵 표시 (맨 위에)
        this.displayNucleus();
    }
}
