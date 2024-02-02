export class Line {
    constructor(x, height) {
        this.x = x;
        this.height = height;
    }

    animate(ctx, rgb) {
        ctx.beginPath();
        ctx.moveTo(this.x, 0);
        ctx.lineTo(this.x, this.height);
        ctx.strokeStyle = rgb;
        ctx.stroke();
    }
}