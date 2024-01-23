import { Wave } from './wave.js';

export class WaveGroup {
    constructor(speed) {
        this.speed = speed;
        this.totalWaves = 3;
        this.totalPoints = 5;

        this.color = [
            'rgba(255,255,255,0.1)',
            'rgba(255,255,255,0.1)',
            'rgba(255,255,255,0.1)'
        ];

        this.waves = [];
        for (let i = 0; i < this.totalWaves; i++) {
            this.waves[i] = new Wave(
                i,
                this.totalPoints,
                this.speed,
                this.color[i]
            );
        }
    }

    resize(stageWidth, stageHeight) {
        for (let i = 0; i < this.totalWaves; i++) {
            const wave = this.waves[i];
            wave.resize(stageWidth, stageHeight)
        }
    }

    draw(ctx) {
        for (let i = 0; i < this.totalWaves; i++) {
            const wave = this.waves[i];
            wave.draw(ctx);
        }
    }

    setSpeed(speed) {
        for (let i = 0; i < this.totalWaves; i++) {
            this.speed = speed;
            this.waves[i].setSpeed(this.speed);
        }
    }
}