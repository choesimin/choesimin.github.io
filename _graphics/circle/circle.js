export class Circle {
  constructor(parent = null) {
    if (parent === null) {
      const stageWitdh = document.body.clientWidth;
      const stageHeight = document.body.clientHeight;

      this.x = stageWitdh / 2;
      this.y = stageHeight / 2;
      this.radius =
        (stageWitdh > stageHeight ? stageHeight : stageWitdh) * (0.95 / 2);
      this.color = "#FFFFFF";
      this.velocity = 0;
    } else {
      this.parent = parent;
      this.color = parent.color === "#000000" ? "#FFFFFF" : "#000000";
      this.velocity = parent.velocity + 0.01;
    }

    this.angle = 0;
  }

  updatePosition() {
    if (this.parent) {
      const radius = this.parent.radius * 0.9;

      this.x =
        this.parent.x + (this.parent.radius - radius) * Math.cos(this.angle);
      this.y =
        this.parent.y + (this.parent.radius - radius) * Math.sin(this.angle);
      this.radius = radius;
    }

    this.angle += this.velocity;
  }

  animate(ctx) {
    this.updatePosition();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function getRandomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
