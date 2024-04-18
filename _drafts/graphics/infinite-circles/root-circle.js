import { Circle } from "./circle.js";

export class RootCircle extends Circle {
  constructor(x, y, radius, rgb) {
    this.rgb = rgb;
    this.x = x;
    this.y = y;
    this.radius = radius;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.rgb;
    ctx.fill();
  }
}
