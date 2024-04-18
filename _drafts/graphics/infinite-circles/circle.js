// export class Circle {
//   constructor(x, y, r, rgb) {
//     this.x = x;
//     this.y = y;
//     this.r = r;
//     this.rgb = rgb;
//   }

//   animate(ctx) {
//     this.x += 5;
//     this.y += 5;

//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
//     ctx.fillStyle = this.rgb;
//     ctx.fill();
//   }
// }

export class Circle {
  constructor(x, y, radius, parent) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.parent = parent;
    this.angle = 0; // 초기 각도
  }

  // 각 원의 위치를 업데이트하는 함수
  updatePosition() {
    if (this.parent) {
      // 부모 원의 위치와 각도를 사용하여 자신의 위치 계산
      this.x = this.parent.x + this.parent.radius * 0.8 * Math.cos(this.angle);
      this.y = this.parent.y + this.parent.radius * 0.8 * Math.sin(this.angle);
      this.radius = this.parent.radius * 0.8; // 부모 원 반지름의 80%

      console.log(this.x, this.y);
    }

    // 각도 업데이트 (예를 들어 시간에 따라 각도가 변하게 설정)
    this.angle += 0.05; // 회전 속도 조절
  }

  animate(ctx) {
    // 원의 위치 업데이트
    this.updatePosition();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
  }
}
