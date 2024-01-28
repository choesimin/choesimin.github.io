export class Block {
    constructor(width, height, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.maxX = width + x;
        this.maxY = height + y;
    }

    draw(ctx) {
        const xGap = 40;
        const yGap = 30;

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();

        // ctx.fillStyle = '#dddddd';
        // ctx.beginPath();
        // ctx.moveTo(this.maxX, this.maxY);
        // ctx.lineTo(this.maxX - xGap, this.maxY + yGap);
        // ctx.lineTo(this.x - xGap, this.maxY + yGap);
        // ctx.lineTo(this.x, this.maxY);
        // ctx.fill();

        // ctx.fillStyle = '#cccccc';
        // ctx.beginPath();
        // ctx.moveTo(this.x, this.y);
        // ctx.lineTo(this.x, this.maxY);
        // ctx.lineTo(this.x - xGap, this.maxY + yGap);
        // ctx.lineTo(this.x - xGap, this.maxY + yGap - this.height);
        // ctx.fill();
    }
}