// ============================================
// Attractor 클래스
// 파티클을 끌어당기는 외부의 힘
// ============================================
class Attractor {
    constructor(x, y, strength) {
        this.position = createVector(x, y);
        this.strength = strength;  // 끌어당기는 힘의 세기
        this.radius = 30;
        this.dragging = false;     // 드래그 상태
        this.dragOffset = createVector(0, 0);  // 드래그 오프셋
    }

    // 마우스가 이 객체 위에 있는지 확인
    contains(mx, my) {
        let d = dist(mx, my, this.position.x, this.position.y);
        return d < this.radius;
    }

    // 드래그 시작
    startDrag(mx, my) {
        this.dragging = true;
        this.dragOffset.x = this.position.x - mx;
        this.dragOffset.y = this.position.y - my;
    }

    // 드래그 중
    drag(mx, my) {
        if (this.dragging) {
            this.position.x = mx + this.dragOffset.x;
            this.position.y = my + this.dragOffset.y;
        }
    }

    // 드래그 종료
    stopDrag() {
        this.dragging = false;
    }

    // 파티클에 작용할 인력 계산
    calculateForce(particle) {
        // Attractor → Particle 방향 벡터
        let force = p5.Vector.sub(this.position, particle.position);

        // 거리 계산 (너무 가깝거나 멀면 제한)
        let distance = force.mag();
        distance = constrain(distance, 5, 200);

        // 중력 공식: F = G * m1 * m2 / d^2
        // 단순화: F = strength / d^2
        let magnitude = this.strength / (distance * distance);

        // 방향 정규화 후 크기 적용
        force.normalize();
        force.mult(magnitude);

        return force;
    }

    display() {
        noStroke();
        fill(100, 200, 100, 150);
        ellipse(this.position.x, this.position.y, this.radius * 2);

        // 중심점
        fill(100, 255, 100);
        ellipse(this.position.x, this.position.y, 10);
    }
}
