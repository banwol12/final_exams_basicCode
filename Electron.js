// ============================================
// Electron 클래스
// 각 전자가 핵과 1:1 전기 연결을 가짐
// ============================================
class Electron {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = createVector(random(-1, 1), random(-1, 1));
        this.acceleration = createVector(0, 0);

        // 전자 속성
        this.mass = random(0.5, 1.5);
        this.radius = this.mass * 3;
        this.charge = random(0.8, 1.2);

        // 색상
        this.hue = random(180, 220);  // 파란색
        this.energy = random(150, 255);

        // 전기 경로 (핵과 연결)
        this.arcPoints = [];
    }

    // 힘 적용: F = ma
    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
    }

    // 핵에 대한 인력
    attractTo(nucleus) {
        let force = p5.Vector.sub(nucleus, this.position);
        let distance = force.mag();
        distance = constrain(distance, 20, 300);

        let strength = (80 * this.charge) / (distance * distance);

        force.normalize();
        force.mult(strength);

        return force;
    }

    // 궤도 속도
    addOrbitalVelocity(nucleus) {
        let toNucleus = p5.Vector.sub(nucleus, this.position);
        let distance = toNucleus.mag();

        let orbitalSpeed = map(distance, 20, 300, 0.2, 0.03);

        let tangent = createVector(-toNucleus.y, toNucleus.x);
        tangent.normalize();
        tangent.mult(orbitalSpeed);

        this.velocity.add(tangent);
    }

    // 물리 업데이트
    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(5);
        this.position.add(this.velocity);
        this.acceleration.mult(0);

        this.energy = constrain(this.energy + random(-5, 5), 120, 255);
    }

    // 핵과의 전기 경로 생성
    generateArc(nucleus) {
        this.arcPoints = [];

        let segments = 8;
        for (let i = 0; i <= segments; i++) {
            let t = i / segments;
            let x = lerp(nucleus.x, this.position.x, t);
            let y = lerp(nucleus.y, this.position.y, t);

            // 지그재그 (양 끝은 약하게, 중간은 강하게)
            let jitter = sin(t * PI) * 12;
            x += random(-jitter, jitter);
            y += random(-jitter, jitter);

            this.arcPoints.push(createVector(x, y));
        }
    }

    // 전기 렌더링
    displayArc() {
        if (this.arcPoints.length < 2) return;

        // 글로우 레이어
        for (let layer = 2; layer >= 0; layer--) {
            let alpha = map(layer, 2, 0, 30, 180);
            let weight = map(layer, 2, 0, 5, 1);  // 얇게

            stroke(this.hue, 200, 255, alpha);
            strokeWeight(weight);
            noFill();

            beginShape();
            for (let p of this.arcPoints) {
                curveVertex(p.x, p.y);
            }
            endShape();
        }
    }

    // 전자 렌더링
    display() {
        noStroke();

        // 글로우
        for (let i = 2; i > 0; i--) {
            let alpha = map(i, 2, 0, 30, 100);
            let size = this.radius * 2 + i * 6;
            fill(this.hue, 200, this.energy, alpha);
            ellipse(this.position.x, this.position.y, size);
        }

        // 코어
        fill(this.hue, 100, 255, 200);
        ellipse(this.position.x, this.position.y, this.radius * 2);

        // 밝은 중심
        fill(0, 0, 255, 200);
        ellipse(this.position.x, this.position.y, this.radius * 0.8);
    }
}
