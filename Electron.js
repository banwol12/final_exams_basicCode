// ============================================
// Electron 클래스
// 플라즈마를 구성하는 전자 파티클
// 중심 핵(마우스)을 기준으로 궤도 운동을 함
// ============================================
class Electron {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = createVector(random(-2, 2), random(-2, 2));
        this.acceleration = createVector(0, 0);

        // 전자 속성
        this.mass = random(0.5, 1.5);
        this.radius = this.mass * 3;
        this.charge = random(0.8, 1.2);  // 전하량 (인력 강도에 영향)

        // 플라즈마 시각 효과를 위한 색상
        this.hue = random(180, 260);  // 파란색~보라색 범위
        this.energy = random(150, 255);  // 에너지 레벨 (밝기)
    }

    // 힘 적용: F = ma → a = F/m
    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
    }

    // 핵(마우스)에 대한 인력 계산
    attractTo(nucleus) {
        let force = p5.Vector.sub(nucleus, this.position);
        let distance = force.mag();
        distance = constrain(distance, 20, 300);

        // 쿨롱 법칙 기반 인력: F = k * q / d^2
        let strength = (100 * this.charge) / (distance * distance);

        force.normalize();
        force.mult(strength);

        return force;
    }

    // 궤도 운동을 위한 접선 속도 추가
    addOrbitalVelocity(nucleus) {
        let toNucleus = p5.Vector.sub(nucleus, this.position);
        let distance = toNucleus.mag();

        // 거리에 따른 궤도 속도 (가까울수록 빠르게)
        let orbitalSpeed = map(distance, 20, 300, 0.3, 0.05);

        // 접선 방향 벡터 (90도 회전)
        let tangent = createVector(-toNucleus.y, toNucleus.x);
        tangent.normalize();
        tangent.mult(orbitalSpeed);

        this.velocity.add(tangent);
    }

    // 물리 업데이트
    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(8);  // 최대 속도 제한
        this.position.add(this.velocity);
        this.acceleration.mult(0);

        // 에너지 변동 (깜빡임 효과)
        this.energy = constrain(this.energy + random(-10, 10), 100, 255);
    }

    // 플라즈마 렌더링
    display() {
        // 외부 글로우 (발광 효과)
        noStroke();
        for (let i = 3; i > 0; i--) {
            let alpha = map(i, 3, 0, 20, 80);
            let size = this.radius * 2 + i * 8;
            fill(this.hue, 200, this.energy, alpha);
            ellipse(this.position.x, this.position.y, size);
        }

        // 코어 (밝은 중심)
        fill(this.hue, 100, 255, 200);
        ellipse(this.position.x, this.position.y, this.radius * 2);

        // 가장 밝은 중심점
        fill(255, 50, 255, 180);
        ellipse(this.position.x, this.position.y, this.radius);
    }

    // 화면 경계 처리
    edges() {
        if (this.position.x < 0) this.position.x = width;
        if (this.position.x > width) this.position.x = 0;
        if (this.position.y < 0) this.position.y = height;
        if (this.position.y > height) this.position.y = 0;
    }
}
