---
layout: skill
date: 2023-05-17
title: CSS Display - block, inline, inline-block
description: HTML 요소를 Web browser에 어떻게 보여줄지 결정하는 display 속성엔 block, inline, inline-block 등의 세 가지 값을 지정할 수 있습니다.
---


## `display` 속성

- HTML의 모든 요소는 각각의 `display` 속성값을 가지고 있습니다.
- `display` 속성은 HTML 요소를 Web browser에 어떻게 보여줄지 결정하는 속성입니다.

- display 속성은 layout을 사용자가 원하는 대로 제어하기 위한 중요한 속성입니다.
    - 예를 들어, `block` 형태를 띄는 요소에게 `display: inline` 속성을 주면 `inline` 형태로 사용자에게 보여집니다.
    - 반대로, `inline` 형태를 띄는 요소에게 `display: block` 속성을 주면 `block` 형태로 사용자에게 보여집니다.

- 대부분의 HTML 요소는 `display` 속성의 기본 값으로 `block`과 `inline` 중 하나의 값을 가집니다.
    - `inline` : 필요한 폭만 차지하며, 요소의 좌우에 다른 요소가 올 수 있습니다.
    - `block` : 새 줄에서 시작하며 browser 창 전체 너비를 차지합니다.


---


## `block`과 `inline`에 대한 `display`의 속성값

| 속성값 | 설명 |
| --- | --- |
| `block` | 영역(문단)을 차지하기 위한 특징을 가집니다. |
| `inline` | text에 효과를 주기 위한 특징을 가집니다. |
| `inline-block` | `block`과 `inline`의 특징을 모두 가집니다. |


### `block`

- 기본적으로 가로 영역을 모두 채우며, `block` 요소 다음에 등장하는 요소는 줄바꿈이 된 것처럼 보입니다.
    - `block` 요소의 `width` 속성 기본 값은 `100%`입니다.

- `width`, `height`, `margin`, `padding` 속성값을 지정할 수 있습니다.
- `block` 요소 뒤에 등장하는 요소가 그 이전 `block` 요소의 오른쪽에 배치될 수 있어도 항상 다음 줄에 위치합니다.

- 예를 들어, `<div>`, `<h1>`, `<p>`, `<ul>`, `<ol>`, `<form>`.


### `inline`

- text에 효과를 주기 위해 존재하는 요소입니다.
    - 예를 들어, bold, italic, underline, color, link.
    - `inline` 요소의 `width`와 `height` 속성 기본 값은 content 영역의 크기로 자동 설정됩니다.

- `width`, `height` 속성값을 지정할 수 없습니다.
- `margin`, `padding` 속성값은 부분적으로 적용됩니다.
    - `margin`은 위아래엔 적용되지 않습니다.
    - `padding`의 좌우는 공간과 시각적인 부분이 모두 적용됩니다.
    - `padding`의 위아래는 시각적으로는 추가되지만 공간을 차지하지는 않습니다.

- `inline` 요소 뒤에 등장하는 요소는 `inline` 요소의 바로 오른쪽에 위치합니다.

- 예를 들어, `<span>`, `<a>`, `<img>`.


### `inline-block`

- 줄바꿈하지 않으며, 크기를 지정할 수 있습니다.
    - `inline` 요소의 특징과 `block` 요소의 특징을 모두 가진 요소입니다.

- `width`, `height`, `margin`, `padding` 속성값을 지정할 수 있습니다.
    - 만약 `width`와 `height` 속성값을 지정하지 않으면, `inline` 요소처럼 content 영역의 크기로 자동 설정됩니다.


---


## Reference

- <http://www.tcpschool.com/css/css_position_display>
- <https://ofcourse.kr/css-course/display-속성>
