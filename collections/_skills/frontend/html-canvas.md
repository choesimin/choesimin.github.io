---
layout: skill
permalink: /214
title: HTML Canvas - Pixel로 그림 그리기
description: HTML5의 Canvas 요소를 사용하여 Pixel 단위로 그림을 그릴 수 있습니다.
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
| 