---
layout: note
permalink: /200
title: CSS background-attach fixed - 여러 개의 배경 Image를 중첩하여 고정하기
description: background-attach를 fixed로 설정하여 여러 개의 배경 Image를 중첩하여 고정할 수 있습니다.
date: 2024-01-22
---


## 여러 개의 배경 Image를 중첩하여 고정하기

- 화면을 scroll할 때, 여러 개의 배경 image를 중첩하여 고정시키기 위해 2가지 방법을 사용할 수 있습니다.
    1. `background-attach: fixed` 사용하기.
    2. 배경 Layer를 따로 나누어서 적용하기.

- background image는 고정되어 있지만, scroll할 때 다른 배경 image가 나타나는 효과를 줄 수 있습니다.

- 두 방법 모두 Safari에서는 제대로 동작하지 않기 때문에 활용성이 떨어지지만, 독특한 시각적 효과를 줄 수 있습니다.


---


## `background-attach: fixed`

- CSS 속성 중 하나인 `background-attach` 속성은 web page의 CSS에서 배경 image가 어떻게 scroll되어야 하는지를 지정합니다.
- 그러나 이 속성에 `fixed` 값을 주어 사용하는 것은 권장하지 않습니다.
    - Safari에서 성능 문제로 완전히 지원되지 않습니다.
    - mobile browser에서 지원하지 않습니다.
    - 툭정 환경에서 scroll하면 배경 화면이 덜컹거리고 버벅입니다.

```html
<div class="bg first"></div>
<div class="bg second"></div>
<div class="bg third"></div>
```

```css
html,
body {
    margin: 0;
    padding: 0;
}

.bg {
    width: 100vw;
    height: 100vh;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.first {
    background-image: url(./first.jpg);
}
.second {
    background-image: url(./second.jpg);
}
.third {
    background-image: url(./third.jpg);
}
```


---


## 배경 Layer 직접 나누기

- 배경 layer를 따로 나누어 적용하는 방식은 구현 방법이 좀 더 복잡합니다.
- 하지만 `background-attach: fixed`를 사용했을 때 발생하는 mobile에서 동작하지 않는 문제를 해결합니다.

```html
<div class="container first">
    <div class="bg-wrap">
        <div class="bg"></div>
    </div>
</div>
<div class="container second">
    <div class="bg-wrap">
        <div class="bg"></div>
    </div>
</div>
<div class="container third">
    <div class="bg-wrap">
        <div class="bg"></div>
    </div>
</div>
```

```css
html,
body {
    margin: 0;
    padding: 0;
}

.container {
    width: 100vw;
    height: 100vh;
    position: relative;
}

.bg-wrap {
    clip: rect(0, auto, auto, 0);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.bg {
    position: fixed;
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center center;
}

.first .bg {
    background-image: url(./first.jpg);
}
.second .bg {
    background-image: url(./second.jpg);
}
.third .bg {
    background-image: url(./third.jpg);
}
```


---


## Reference

- <https://marshall-ku.tistory.com/257>
