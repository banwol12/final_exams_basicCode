// ============================================
// PlasmaArc 클래스
// 더 얇고 파란 전기
// ============================================
class PlasmaArc {
    constructor(angle) {
        this.baseAngle = angle;
        this.currentAngle = angle;
        this.segments = 10;
        this.points = [];
        this.hue = random(180, 220);  // 파란색 범위로 변경

        // 느린 움직임
        this.noiseOffset = random(1000);
        this.speed = random(0.005, 0.01);
        this.amplitude = random(0.3, 0.5);
    }

    // 번개 경로 생성
    generatePath(centerX, centerY, radius) {
        this.points = [];

        this.noiseOffset += this.speed;
        let angleVariation = (noise(this.noiseOffset) - 0.5) * TWO_PI * this.amplitude;
        this.currentAngle = this.baseAngle + angleVariation;

        let startX = centerX + cos(this.currentAngle) * 15;
        let startY = centerY + sin(this.currentAngle) * 15;

        let endX = centerX + cos(this.currentAngle) * radius * 0.9;
        let endY = centerY + sin(this.currentAngle) * radius * 0.9;

        for (let i = 0; i <= this.segments; i++) {
            let t = i / this.segments;
            let x = lerp(startX, endX, t);
            let y = lerp(startY, endY, t);

            // 지그재그 (더 작게)
            let jitter = sin(t * PI) * 15;
            x += (noise(this.noiseOffset + i * 0.3) - 0.5) * jitter * 2;
            y += (noise(this.noiseOffset + i * 0.3 + 50) - 0.5) * jitter * 2;

            this.points.push(createVector(x, y));
        }
    }

    // 렌더링 (더 얇게)
    display() {
        if (this.points.length < 2) return;

        // 글로우 (2레이어만, 더 얇게)
        for (let layer = 2; layer >= 0; layer--) {
            let alpha = map(layer, 2, 0, 30, 200);
            let weight = map(layer, 2, 0, 6, 1);  // 더 얇게

            stroke(this.hue, 200, 255, alpha);
            strokeWeight(weight);
            noFill();

            beginShape();
            for (let p of this.points) {
                curveVertex(p.x, p.y);
            }
            endShape();
        }
    }
}
