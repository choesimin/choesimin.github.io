export class Circle {
  constructor(x, y, radius, rgb, parent = null) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.rgb = rgb;
    this.angle = 0;
    this.parent = parent;
  }

  updatePosition() {
    if (this.parent) {
      const radius = this.parent.radius * 0.8;
      this.radius = radius;
      this.x = this.parent.x + radius * Math.cos(this.angle);
      this.y = this.parent.y + radius * Math.sin(this.angle);

      // console.log(this.x, this.y);
    }

    this.angle += 0.5;
  }

  animate(ctx) {
    this.updatePosition();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.rgb;
    ctx.fill();
  }
}
