// ============================================
// Particle 클래스
// Vector 기반의 위치, 속도, 가속도를 가지며
// 외부 힘에 의해 움직이는 기본 파티클
// ============================================
class Particle {
    constructor(position) {
        // 위치: 시작점에서 시작
        this.position = position.copy();

        // 속도: 초기 랜덤 속도
        this.velocity = createVector(random(-1, 1), random(-2, 0));

        // 가속도: 초기값 0
        this.acceleration = createVector(0, 0);

        // 질량 (힘 계산에 사용)
        this.mass = random(1, 3);

        // 수명 (0이 되면 제거)
        this.lifespan = 255;

        // 크기
        this.radius = this.mass * 4;
    }

    // 힘 적용: F = ma → a = F/m
    applyForce(force) {
        let f = p5.Vector.div(force, this.mass);
        this.acceleration.add(f);
    }

    // 물리 업데이트
    update() {
        // 속도에 가속도 더하기
        this.velocity.add(this.acceleration);

        // 위치에 속도 더하기
        this.position.add(this.velocity);

        // 가속도 초기화 (매 프레임 힘이 새로 적용되므로)
        this.acceleration.mult(0);

        // 수명 감소
        this.lifespan -= 2;
    }

    // 렌더링
    display() {
        stroke(255, this.lifespan);
        strokeWeight(1);
        fill(255, 150, 100, this.lifespan);
        ellipse(this.position.x, this.position.y, this.radius * 2);
    }

    // 파티클이 죽었는지 확인
    isDead() {
        return this.lifespan < 0;
    }
}
