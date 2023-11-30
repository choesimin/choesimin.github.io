---
layout: note
title: SVG - Viewport와 Viewbox
date: 2023-08-24
---




- SVG Spec에서 최상위 요소인 `<svg>`는 graphic 영역을 markup하기 위해 사용합니다.
- SVG의 graphic 요소들은 기본적으로 무한한 크기의 canvas에 그려집니다.
- 따라서 HTML 문서에서 `<svg>` 요소를 사용할 때는 canvas의 어느 위치를 얼마나 보여줄지 설정해야 합니다.
- `<svg>`의 viewport(`width`, `height`)와 viewbox(`viewBox`) 속성에 속성값을 지정하여 canvas의 크기와 위치를 정할 수 있습니다.




---




## Viewport : SVG를 보는 창문

- viewport는 "사용자가 볼 수 있는(view)" "구멍 뚫린 창문(porthole window)"입니다.
- viewport를 설정하며 SVG graphic 요소를 그릴 수 있는 무한한 영역 중에서 얼마나 많이 보여줄지 결정합니다.
- viewport의 크기는 `width`, `height` 속성으로 설정합니다.

| viewport 속성 | 설명 |
| --- | --- |
| width | viewport의 너비를 설정합니다. |
| height | viewport의 높이를 설정합니다. |


### Viewport 크기가 Graphic 크기에 딱 맞을 때

<svg width="100" height="100">
    <circle cx="50" cy="50" r="50" fill="white"></circle>
</svg>

```html
<svg width="100" height="100">
    <circle cx="50" cy="50" r="50"></circle>
</svg>
```


### Viewport 크기가 Graphic 크기보다 작을 때

<svg width="70" height="70">
    <circle cx="50" cy="50" r="50" fill="white"></circle>
</svg>

```html
<svg width="70" height="70">
    <circle cx="50" cy="50" r="50"></circle>
</svg>
```




---




## Viewbox : SVG를 보는 망원경

- `viewbox ⊂ viewport` : viewbox의 설정은 viewport 영역 안에서 이루어집니다.
    - viewport는 틀(frame)을 정하고, viewbox는 그 안의 세부 사항(detail)을 정합니다.
    - viewport가 얼마만큼의 영역을 보여줄지 정한다면, viewbox는 보여지는 영역을 어떻게 보여줄지 결정합니다.
    - viewbox의 값을 설정하는 것은 viewport에 mapping되는 공간을 명시하는 것입니다.

- viewbox를 설정하여 view 영역(box)을 이동(pan)하고, 확대/축소(zoom)할 수 있습니다.
- viewbox는 `viewBox` 속성값 parameter 4개(`x`, `y`, `width`, `height`)를 순서대로 지정하여 설정합니다.

```html
<svg viewBox="[x] [y] [width] [height]"></svg>
```

| `viewBox` 속성값 인자 | 종류 | 설명 |
| --- | --- | --- |
| x | 이동 | viewbox의 x 좌표를 설정합니다.<br>값이 커질수록 viewBox가 오른쪽으로 이동합니다. |
| y | 이동 | viewbox의 y 좌표를 설정합니다.<br>값이 커질수록 viewBox가 아래쪽으로 이동합니다. |
| width | 확대/축소 | viewbox의 너비를 설정합니다. |
| height | 확대/축소 | viewbox의 높이를 설정합니다.  |


### Viewbox 이동시키기

- `viewBox` 속성의 `x`, `y` parameter를 설정하여 viewbox를 이동시킬 수 있습니다.
- viewbox를 이동시키면 실제로는 보이는 영역이 이동한 것이지만, 상대적으로 viewbox 내부의 graphic 요소들은 veiwbox가 이동한 방향의 반대로 이동한 것처럼 보입니다.

| 좌표 이동 | viewbox의 위치 변화 |
| --- | --- |
| x 증가 | 오른쪽으로 이동합니다. |
| x 감소 | 왼쪽으로 이동합니다. |
| y 증가 | 아래쪽으로 이동합니다. |
| y 감소 | 위쪽으로 이동합니다. |

#### Viewbox를 오른쪽으로 이동시키기

<svg width="100" height="100" viewBox="30 0 100 100">
    <circle cx="50" cy="50" r="50" fill="white"></circle>
</svg>

```html
<svg width="100" height="100" viewBox="30 0 100 100">
    <circle cx="50" cy="50" r="50"></circle>
</svg>
```

#### Viewbox를 왼쪽으로 이동시키기

<svg width="100" height="100" viewBox="-30 0 100 100">
    <circle cx="50" cy="50" r="50" fill="white"></circle>
</svg>

```html
<svg width="100" height="100" viewBox="-30 0 100 100">
    <circle cx="50" cy="50" r="50"></circle>
</svg>
```

#### Viewbox 아래쪽으로 이동시키기

<svg width="100" height="100" viewBox="0 30 100 100">
    <circle cx="50" cy="50" r="50" fill="white"></circle>
</svg>

```html
<svg width="100" height="100" viewBox="0 30 100 100">
    <circle cx="50" cy="50" r="50"></circle>
</svg>
```

#### Viewbox 위쪽으로 이동시키기

<svg width="100" height="100" viewBox="0 -30 100 100">
    <circle cx="50" cy="50" r="50" fill="white"></circle>
</svg>

```html
<svg width="100" height="100" viewBox="0 -30 100 100">
    <circle cx="50" cy="50" r="50"></circle>
</svg>
```


### Viewbox 확대/축소하기

- `viewBox` 속성의 `width`, `height` parameter를 설정하여 viewbox를 확대하고 축소시킬 수 있습니다.

- viewport의 크기가 정해진 상테에서, 내부 graphic 요소의 view 영역(viewbox) 크기를 다시 정함으로써, viewbox가 확대되거나 축소됩니다.

- viewbox를 확대하면, 내부의 graphic 요소는 상대적으로 작아집니다.
- viewbox를 축소하면, 내부의 graphic 요소는 상대적으로 커집니다.


#### 기존 Viewbox

<svg width="100" height="100" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="50" fill="white"></circle>
</svg>

```html
<svg width="100" height="100" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="50" fill="white"></circle>
</svg>
```

#### Viewbox 확대하기

<svg width="100" height="100" viewBox="0 0 130 130">
    <circle cx="50" cy="50" r="50" fill="white"></circle>
</svg>

```html
<svg width="100" height="100" viewBox="0 0 130 130">
    <circle cx="50" cy="50" r="50"></circle>
</svg>
```

#### Viewbox 축소하기

<svg width="100" height="100" viewBox="0 0 70 70">
    <circle cx="50" cy="50" r="50" fill="white"></circle>
</svg>

```html
<svg width="100" height="100" viewBox="0 0 70 70">
    <circle cx="50" cy="50" r="50"></circle>
</svg>
```




---




# Reference

- <https://webdesign.tutsplus.com/svg-viewport-and-viewbox-for-beginners--cms-30844t>
