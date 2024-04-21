import { Circle } from "./circle.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.circles = [];

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.circles.push(new Circle());
    for (let i = 0; i < 30; i++) {
      this.circles.push(new Circle(this.circles.at(-1)));
    }
  }

  animate(t) {
    window.requestAnimationFrame(this.animate.bind(this));
    this.circles.forEach((circle) => circle.animate(this.ctx));
  }
}

window.onload = () => {
  new App();
};
