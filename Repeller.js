// ============================================
// Repeller 클래스
// 파티클을 밀어내는 외부의 힘
// Attractor를 상속받아 반대 방향 힘 적용
// ============================================
class Repeller extends Attractor {
    constructor(x, y, strength) {
        super(x, y, strength);
    }

    // Attractor의 힘을 반대로 (밀어냄)
    calculateForce(particle) {
        let force = super.calculateForce(particle);
        force.mult(-1);  // 방향 반전
        return force;
    }

    display() {
        noStroke();
        fill(200, 100, 100, 150);
        ellipse(this.position.x, this.position.y, this.radius * 2);

        // 중심점
        fill(255, 100, 100);
        ellipse(this.position.x, this.position.y, 10);
    }
}
