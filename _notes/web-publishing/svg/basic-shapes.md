---
layout: note
title: SVG - 기본 도형 그리기
date: 2023-08-28
---




- SVG는 직사각형(`rect`), 원(`circle`), 타원(`ellipse`), 직선(`line`), 여러 점을 연결한 선(`polyline`), 다각형(`polygon`)과 같은 기본 모양을 그릴 수 있는 요소 모음을 제공합니다.
- 각 요소는 좌표 위치(`x`, `y`), 크기(`width`, `height`) 등의 속성을 설정할 수 있습니다.

- 도형을 그릴 때, 도형의 크기에 맞추어 SVG 요소의 크기도 설정해야 합니다.
    - SVG 요소의 viewport 크기 기본값은 너비 300px, 높이 150px입니다.
    - SVG 요소의 크기가 도형 요소의 크기보다 작으면, 도형 요소는 SVG 요소의 크기만큼만 보이고, 나머지는 잘리게 됩니다.




---




## 사각형 (Rectangle)

- `<rect>` 요소는 사각형을 그립니다.
- 너비(`width`), 높이(`height`), 색상(`fill`) 등을 속성으로 설정할 수 있습니다.

```html
<svg>
    <rect width="200" height="100" fill="#ffffff" />
</svg>
```

<svg height="100">
    <rect width="200" height="100" fill="#ffffff" />
</svg>


### 사각형 테두리 둥글게 하기

- 둥근 테두리(`rx`, `ry`) 속성을 설정하면 테두리가 둥글게 돌려진 사각형을 그릴 수 있습니다.

```html
<svg>
    <rect width="200" height="100" fill="#ffffff" rx="20" ry="20" />
</svg>
```

<svg height="100">
    <rect width="200" height="100" fill="#ffffff" rx="20" ry="20" />
</svg>


### 사각형 이동시키기

- viewport 내부의 특정 지점으로 위치(`x`, `y`)를 이동시킬 수 있습니다.

```html
<svg>
    <rect width="200" height="100" fill="#ffffff" x="100" y="50" />
</svg>
```

<svg>
    <rect width="200" height="100" fill="#ffffff" x="100" y="50" />
</svg>




---




## 원 (Circle)

- `<circle>` 요소는 원을 그립니다.
- 원의 중심(`rx`, `ry`), 반지름(`r`), 색상(`fill`) 등을 속성으로 설정할 수 있습니다.

```html
<svg>
    <circle cx="50" cy="50" r="50" fill="#ffffff" />
</svg>
```

<svg height="100">
    <circle cx="50" cy="50" r="50" fill="#ffffff" />
</svg>


### 원의 테두리 그리기

- 테두리 색상(`stroke`), 테두리 두께(`stroke-width`) 속성을 설정하면 테두리를 그릴 수 있습니다.
- 테두리의 두꼐는 테두리 안과 밖으로 늘어납니다.
    - e.g., `stroke-width`를 `10`으로 지정하면 테두리의 바깥쪽과 안쪽에 각각 `5px`씩 두께가 설정됩니다.

```html
<svg>
    <circle cx="60" cy="60" r="50" fill="none" stroke="#ffffff" stroke-width="20" />
</svg>
```

<svg height="120">
    <circle cx="60" cy="60" r="50" fill="none" stroke="#ffffff" stroke-width="20" />
</svg>




---




## 타원 (Ellipse)

- `<ellipse>` 요소는 타원을 그립니다.
- 타원을 그리기 위한 반지름(`rx`, `ry`) 속성을 설정할 수 있습니다.

```html
<svg>
    <ellipse cx="100" cy="50" rx="100" ry="50" fill="#ffffff" />
</svg>
```

<svg height="100">
    <ellipse cx="100" cy="50" rx="100" ry="50" fill="#ffffff" />
</svg>


### 타원의 테두리 그리기

- 원의 테두리 그리기와 동일합니다.

```html
<svg>
    <ellipse cx="110" cy="60" rx="100" ry="50" fill="none" stroke="#ffffff" stroke-width="20" />
</svg>
```

<svg height="120">
    <ellipse cx="110" cy="60" rx="100" ry="50" fill="none" stroke="#ffffff" stroke-width="20" />
</svg>




---




## 직선 (Line)

- `<line>` 요소는 직선을 그립니다.
- 선의 시작점(`x1`, `y1`)과 끝점(`x2`, `y2`) 속성을 설정할 수 있습니다.

```html
<svg>
    <line x1="50" y1="50" x2="200" y2="100" stroke="#ffffff" stroke-width="5" />
</svg>
```

<svg>
    <line x1="50" y1="50" x2="200" y2="100" stroke="#ffffff" stroke-width="5" />
</svg>




---




## 여러 점을 연결한 선 (Polyline)

- `<polyline>` 요소는 2개 이상의 점들이 직선으로 연결된 도형 그립니다.
- 각 점들의 위치(`points`) 속성을 설정할 수 있습니다.
- 각 점(`x,y`)은 공백으로 구분됩니다.
    - e.g., `x1,y1 x2,y2 x3,y3`

<svg>
  <polyline points="0,0 30,30 30,60 60,60 60,90 90,90 120,120" fill="none" stroke="#ffffff" stroke-width="5" />
</svg>




---




## 다각형 (Polygon)

- `<polygon>` 요소는 3개 이상의 점들이 연결된 다각형을 그립니다.

```html
<svg>
  <polygon points="50,5 100,5 125,30 125,80 100,105 50,105 25,80 25,30" fill="#ffffff" />
</svg>
```
<svg height="105">
  <polygon points="50,5 100,5 125,30 125,80 100,105 50,105 25,80 25,30" fill="#ffffff" />
</svg>




---




# Reference

- <https://a11y.gitbook.io/graphics-aria/svg-graphics/svg-basic-shapes>
