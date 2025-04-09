---
layout: note
permalink: /226
title: SVG - JavaScript를 이용하여 SVG 요소를 동적으로 추가하기
description: SVG 요소를 JavaScript를 통해 동적으로 추가할 때는 namespace를 지정해주어야 합니다.
date: 2023-09-11
---


## SVG 요소를 JavaScript로 동적으로 추가하기

- SVG 도형을 JavaScript를 이용하여 동적으로 그릴 때는 namespace를 반드시 지정해주어야 합니다.
- namespace는 `http://www.w3.org/2000/svg`으로 지정하며, 이는 HTML 문서에게 "여기에 SVG 요소를 만들겠습니다"라고 말하는 것과 같습니다.


### 1. 요소를 생성할 때는 Namespace를 지정하기

- HTML 문서에 SVG 요소를 동적으로 추가하기 위해서는 namespace를 지정해주어야 합니다.
- 따라서 SVG graphic 요소를 생성할 때 `document.createElementNS()` method를 사용해야 합니다.
    - `document.createElementNS()` method는 사용할 수 없습니다.

```js
const svgns = 'http://www.w3.org/2000/svg';

let rect = document.createElementNS(svgns, 'rect');
let text = document.createElementNS(svgns, 'text');
let circle = document.createElementNS(svgns, 'circle');
```


### 2. Style 속성을 지정할 때는 `setAttribute` Method 사용하기

- 요소의 `setAttribute` method를 사용하여 style 속성을 지정합니다.

```js
const svgns = 'http://www.w3.org/2000/svg';

let rect = document.createElementNS(svgns, 'rect');

rect.setAttribute("x", "150");
rect.setAttribute("y", "150");
rect.setAttribute("width", "100");
rect.setAttribute("height", "100");
rect.setAttribute("fill", "#5cceee");
```


### 3. SVG 요소에 Graphic 요소를 추가하기

- SVG 요소의 `appendChild()` method를 사용하여 graphic 요소를 추가합니다.

```js
const svg = document.querySelector("svg");

const svgns = 'http://www.w3.org/2000/svg';
let rect = document.createElementNS(svgns, 'rect');
rect.setAttribute("width", "100");
rect.setAttribute("height", "100");
rect.setAttribute("fill", "#5cceee");

svg.appendChild(rect);
```


---


## Reference

- <https://www.motiontricks.com/creating-dynamic-svg-elements-with-javascript/>
