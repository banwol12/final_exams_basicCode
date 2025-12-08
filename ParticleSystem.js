// ============================================
// ParticleSystem 클래스
// 여러 파티클을 관리하고 제어하는 시스템
// ============================================
class ParticleSystem {
    constructor(origin) {
        this.origin = origin.copy();
        this.particles = [];
    }

    // 새 파티클 추가
    addParticle() {
        this.particles.push(new Particle(this.origin));
    }

    // 모든 파티클에 힘 적용
    applyForce(force) {
        for (let particle of this.particles) {
            particle.applyForce(force);
        }
    }

    // Attractor의 힘 적용
    applyAttractor(attractor) {
        for (let particle of this.particles) {
            let force = attractor.calculateForce(particle);
            particle.applyForce(force);
        }
    }

    // Repeller의 힘 적용
    applyRepeller(repeller) {
        for (let particle of this.particles) {
            let force = repeller.calculateForce(particle);
            particle.applyForce(force);
        }
    }

    // 업데이트 (죽은 파티클 제거 포함)
    update() {
        // 뒤에서부터 순회하며 죽은 파티클 제거
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update();
            if (this.particles[i].isDead()) {
                this.particles.splice(i, 1);
            }
        }
    }

    // 모든 파티클 렌더링
    display() {
        for (let particle of this.particles) {
            particle.display();
        }
    }
}
