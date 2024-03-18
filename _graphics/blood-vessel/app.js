import { Line } from "./line.js";

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.lines = [];

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth;
        this.canvas.height = this.stageHeight;

        this.createLines();

        console.log(this.lines);
    }

    createLines() {
        this.lines = [];

        for (let i = 0; i <= this.stageWidth; i++) {
            this.lines[i] = new Line(i, this.stageHeight);
        }
    }

    animate(t) {
        window.requestAnimationFrame(this.animate.bind(this));

        for (let i = 0; i <= this.stageWidth; i++) {
            this.lines[i].animate(this.ctx, '#' + Math.round(Math.random() * 0xff).toString(16) + '0000');
        }
    }
}

window.onload = () => {
    new App();
};