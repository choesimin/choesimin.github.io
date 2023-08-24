---
layout: note
title: SVG - HTML 문서에 SVG로 그림 그리기
date: 2023-08-24
---




- SVG(Scalable Vector Graphics)는 HTML 문서에 vector graphic을 그리기 위해 사용되는 XML 기반 web 기술입니다.
- vector graphic은 확대하더라도 raster/bitmap graphic처럼 계단 현상이 발생하지 않기 때문에, 다양한 크기의 화면을 지원해야하는 web 환경에서 큰 이점이 있습니다.

- SVG는 점, 직선, 곡선, 원, 사각형, 다각형 등과 같은 하나의 graphic 영역을 이루는 요소를 markup하기 위해서 사용됩니다.
    - e.g., HTML은 제목(`h1`, `h2`), 단락(`p`), 목록(`ul`, `ol`), 표(`table`)과 같은 문서를 이루는 요소를 markup하기 위해서 사용됩니다.

- SVG graphic은 `<svg>` tag를 사용하여 다른 HTML 요소처럼 HTML 문서 안에 바로 markup하는 것이 가능합니다.
- `<object>`, `<img>`, `<iframe>` 요소를 통해 외부 file(`.svg`)에 작성된 SVG를 HTML 문서로 불러올 수도 있습니다.




---




## SVG 요소의 viewport와 viewbox

- SVG Spec에서 최상위 요소인 `<svg>`는 graphic 영역을 markup하기 위해 사용합니다.
- SVG의 graphic 요소들은 기본적으로 무한한 크기의 canvas에 그려지기 때문에, HTML 문서에서 `<svg>` 요소를 사용할 때는 canvas의 어느 위치를 얼마나 보여줄지 설정해야 합니다.
    - canvas 좌표계에서 요소들은 x 좌표가 커질수록 오른쪽 방향으로, y 좌표가 커질수록 아래쪽 방향으로 이동하게 됩니다.
- `<svg>`의 viewport(`width`, `height`)와 viewbox(`viewBox`) 속성에 속성값을 지정하여 canvas의 크기와 위치를 정할 수 있습니다.


### `<svg>`의 viewport 속성 : `width`, `height`

- 그래픽 영역이 HTML 문서 상에서 실제로 얼마만큼의 크기로 나타낼지는 width와 height 속성을 통해 제어하는데요.
- viewBox 속성과 width, height 속성 함께 잘 사용하면 그래픽을 축소하거나 확대하는 효과를 얻을 수 있습니다.


### `<svg>`의 viewbox 속성 : `viewBox`

- `viewBox` 속성은 SVG의 canvas를 들여다 볼 창문의 위치와 크기를 결정합니다.
- 속성값을 창문의 좌측 상단 x 좌표와 y 좌표, 너비, 높이 순으로 띄어쓰기하여 나열합니다.
    - 대부분의 경우, 시작 xy 좌표는 `0 0`으로 설정하고, 너비와 높이를 내부에 그릴 도형의 크기를 고려하여 결정합니다.






---




# Reference

- <https://www.daleseo.com/html-svg/>
- <https://tecoble.techcourse.co.kr/post/2021-10-24-svg-viewBox/>
