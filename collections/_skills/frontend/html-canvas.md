---
layout: skill
title: HTML Canvas - Pixel로 그림 그리기
date: 2023-08-15
---




## Canvas 요소 : `<canvas>`

```html
<canvas id="canvas" style="border: 2px solid black">
    이 문장은 사용자의 browser가 canvas 요소를 지원하지 않을 때 나타납니다.
</canvas>

<script>
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.fillStyle = "yellow";
    context.fillRect(0, 0, 150, 100);
</script>
```

- Canvas 요소(`<canvas>` tag)는 HTML5에서 새롭게 추가된 요소이며, browser에 graphic contents를 그릴 때 사용합니다.
- Canvas 요소는 도화지(graphic contents container)일 뿐, 그림을 그리는 동작(function)은 JavaScript를 이용하여 구현합니다.
 

### Canvas의 속성 : `height`와 `width`

- Canvas 요소는 container이기 때문에, 높이와 너비에 대한 속성만 가집니다.

| 속성 | 설명 |
| --- | --- |
| height | 높이를 pixel 단위로 명시합니다. 기본 값은 `150px`입니다. |
| width | 너비를 pixel 단위로 명시합니다. 기본 값은 `300px`입니다. |

#### Canvas 요소로 화면 전체를 채우는 방법

- Canvas 요소로 화면 전체를 채우고 싶다면 CSS로 기본 요소들의 크기를 늘리고, Canvas 요소가 전체 화면을 차지하도록 `<script>` tag에 JavaScript code를 작성합니다.
- 만약, `<canvas>` tag의 `height`, `width` 속성값만 `100%`로 지정하여 전체 화면을 만들면, 부모 요소(browser 창)의 높이와 너비가 변함에 따라 Canvas 요소 내용물(graphic contents)의 가로 세로 비율도 비례하여 변하게 됩니다.

```html
<html>
<head>
    <style>
        * { margin: 0; padding: 0; }    /* 공백을 제거합니다. */
        html, body { width: 100%; height: 100%; }    /* Canvas 요소의 부모 요소가 화면 전체를 차지하도록 합니다. */
        canvas { display: block; }    /* scroll 막대가 보이지 않도록 합니다. */
    </style>
</head>
<body>
    <canvas id="canvas"></canvas>
    <script>
        var canvas = document.getElementById('canvas');
        window.addEventListener('resize', resizeCanvas, false);
        resizeCanvas();

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            draw();    // resizeCanvas() 함수 안에 동작을 정의해야, 창 크기가 변할 때도 contents가 유지됩니다.
        }
        function draw() {
            const context = canvas.getContext("2d");
            context.fillStyle = "yellow";
            context.fillRect(0, 0, 150, 100);
        }
    </script>
</body>
</html>
```




---




## Canvas에 도형 그리는 방법

```html
<html>
<body>
    <canvas id="canvas"></canvas>    <!-- 1. 도형이 그려질 Canvas 요소를 선언합니다. -->
    <script>
        const canvas = document.getElementById("canvas");    // 2. Canvas 요소를 JavaScript로 가져옵니다.
        const context = canvas.getContext("2d");    // 3. Canvas 요소의 2D Context를 정의합니다.
        // context.method();    // 4. context를 조작하는 함수를 사용하여 도형을 그립니다.
    </script>
</body>
</html>
```


### 도형의 색상 정하기 : 모든 도형 공통

| Context 함수 | 설명 |
| --- | --- |
| `fillStyle = "color"` | 도형을 채울 색상을 설정합니다.<br>색상값만을 사용(`rgb`)할 수도 있고, 투명도까지 명시(`rgba`)할 수도 있습니다. |

```js
context.fillStyle = "red";
context.fillStyle = "#0099FF";
context.fillStyle = "rgba(255, 0, 0)";
context.fillStyle = "rgba(255, 0, 0, 0.7)";
```

#### Gradient 색상 설정하기

- 도형에 gradient 색상을 적용하기 위해서는 먼저 Context의 gradient를 생성해야 합니다.
- 생성한 gradient를 설정하고, context의 `fillStyle` 속성에 설정한 gradient를 넣습니다.
- gradient는 선형 방향과 원형 방향으로 설정할 수 있습니다.

| Gradient 함수 | 설명 |
| --- | --- |
| `createLinearGradient(startX, startY, endX, endY)` | 선형 gradient를 그리기 시작할 시작 위치와 종료 위치의 좌표를 설정합니다. |
| `createRadialGradient(startX, startY, startRadius, endX, endY, endRadius)` | 원형 gradient를 그리기 시작할 큰 원의 중심 좌표, 반지름과 gradient가 끝날 작은 원의 중심 좌표, 반지름을 설정합니다. |
| `addColorStop(point, color)` | gradient의 색을 설정합니다.<br>시작점인 0에서부터 종료점인 1까지 다양한 색을 지정할 수 있습니다. |

```js
var gradient = context.createLinearGradient(0, 0, 200, 0);
gradient.addColorStop(0, "#FFCC00");
gradient.addColorStop(1, "#FFCCCC");

context.fillStyle = gradient;
context.font = "45px Arial";
context.fillText("CANVAS", 15, 120);
```

```js
var gradient = context.createRadialGradient(100, 100, 200, 150, 150, 30);
gradient.addColorStop(0, "black");
gradient.addColorStop(1, "white");

context.fillStyle = gradient;
context.fillRect(0, 0, 300, 300);
```


### 사각형 그리기

| Context 함수 | 설명 |
| --- | --- |
| `fillRect(x, y, width, height)` | 사각형을 그리기 시작할 시작점의 x, y 좌표와 사각형의 너비, 높이를 설정합니다. |
| `strokeRect(x, y, width, height)` | 사각형 영역에 테두리를 그릴 때 사용합니다. |
| `clearRect(x, y, width, height)` | 지정된 사각형 영역을 투명하게 만듭니다. |

```js
context.strokeRect(10, 10, 250, 130);
context.fillStyle = "rgb(255, 0, 0)";
context.fillRect(20, 20, 200, 100);
context.clearRect(30, 30, 150, 50);
```


### 선 그리기

| Context 함수 | 설명 |
| --- | --- |
| `moveTo(x, y)` | 선이 시작될 좌표를 설정합니다. |
| `lineTo(x, y)` | 선이 끝나는 좌표를 설정합니다.<br>`lineTo()` 함수를 연속적으로 사용할 때의 시작 위치는 이전 선 그리기가 끝난 위치로 자동 설정됩니다. |
| `stroke()` | 선 그리기를 시작합니다. |

```js
context.moveTo(0, 0);
context.lineTo(300, 100);
context.lineTo(150, 150);
context.stroke();
```

- 선 그리기를 이용하면 도형을 만들 수 있으며, 만든 도형에 색을 채울 수도 있습니다.

```js
context.moveTo(0, 0);
context.lineTo(300, 200);
context.lineTo(150, 0);
context.lineTo(0, 0);
context.fillStyle = "#0099FF";
context.fill();
context.stroke();
```


### 원 그리기

| Context 함수 | 설명 |
| --- | --- |
| `beginPath()` | 원 그리기를 시작합니다. |
| `arc(x, y, radius, startAngle, endAngle)` | 원의 중심 좌표와 반지름, 원을 그리기 시작할 시작 위치와 종료 위치의 좌표, 그리는 방향 등을 설정합니다. |
| `closePath()` | 원 그리기를 마칩니다. |

```js
context.beginPath();
context.arc(150, 100, 50, 0, 2 * Math.PI);
context.stroke();
```

- 원 그리기를 이용하여 원호를 그릴 수 있습니다.

```js
context.beginPath();
context.moveTo(100, 100);
context.arc(100, 100, 120, 0, 45 * Math.PI / 180);
context.closePath();
context.stroke();
```


### 문자 그리기

| Context 함수 | 설명 |
| --- | --- |
| `font = "fontSize fontFamily"` | 문자의 크기와 font를 설정합니다. |
| `fillText(text, x, y)` | 문자의 내용과 문자를 그리기 시작할 시작 위치의 좌표를 설정합니다. |
| `strokeText(text, x, y)` | 테두리만 있는 문자를 그릴 때 사용합니다. |

```js
context.font = "40px Arial";
context.fillText("CANVAS", 50, 90);
context.strokeText("HTML5", 80, 150);
```





---




## Reference

- <http://www.tcpschool.com/html-tags/canvas>
- <http://www.tcpschool.com/html/html5_graphic_canvas>
- <https://stackoverflow.com/questions/4288253/html5-canvas-100-width-height-of-viewport>
