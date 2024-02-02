export class Point {
    constructor(index, x, y, speed) {
        this.x = x;
        this.y = y;
        this.fixedY = y;
        this.speed = speed;
        this.cur = index;
        this.max = Math.random() * 100 + 250;
    }

    update() {
        this.cur += this.speed;
        this.y = this.fixedY + (Math.sin(this.cur) * this.max);
    }

    setSpeed(speed) {
        this.speed = speed;
    }
}