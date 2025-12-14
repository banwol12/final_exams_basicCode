// ============================================
// PlasmaArc 클래스
// 플라즈마 구슬의 번개 가닥
// ============================================
class PlasmaArc {
    constructor(centerX, centerY, radius) {
        this.center = createVector(centerX, centerY);
        this.radius = radius;
        this.segments = 15;  // 번개 세그먼트 수
        this.points = [];
        this.targetAngle = random(TWO_PI);
        this.currentAngle = this.targetAngle;
        this.hue = random(260, 320);  // 보라~분홍 색상
        this.flickerSpeed = random(0.02, 0.05);
    }

    // 번개 경로 생성
    generatePath(targetX, targetY) {
        this.points = [];

        // 시작점 (구슬 표면)
        let startAngle = atan2(targetY - this.center.y, targetX - this.center.x);
        let startX = this.center.x + cos(startAngle) * 30;
        let startY = this.center.y + sin(startAngle) * 30;

        // 끝점 (구슬 경계 근처, 마우스 방향)
        let endX = this.center.x + cos(startAngle) * this.radius * 0.9;
        let endY = this.center.y + sin(startAngle) * this.radius * 0.9;

        for (let i = 0; i <= this.segments; i++) {
            let t = i / this.segments;

            // 기본 직선 보간
            let x = lerp(startX, endX, t);
            let y = lerp(startY, endY, t);

            // 지그재그 효과 (중간 부분에서 더 강하게)
            let jitter = sin(t * PI) * 20;
            x += random(-jitter, jitter);
            y += random(-jitter, jitter);

            this.points.push(createVector(x, y));
        }
    }

    // 렌더링
    display() {
        if (this.points.length < 2) return;

        // 여러 레이어로 글로우 효과
        for (let layer = 3; layer >= 0; layer--) {
            let alpha = map(layer, 3, 0, 30, 200);
            let weight = map(layer, 3, 0, 12, 2);

            stroke(this.hue, 200, 255, alpha);
            strokeWeight(weight);
            noFill();

            beginShape();
            for (let p of this.points) {
                vertex(p.x, p.y);
            }
            endShape();
        }
    }
}
