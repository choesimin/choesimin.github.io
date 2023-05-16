---
layout: note
title: CSS Display - block과 inline
version: 2023-05-15
---




## `display` 속성

- HTML의 모든 요소는 각각의 `display` 속성값을 가지고 있습니다.
    - `display` 속성은 HTML 요소가 web browser에 언제 어떻게 보이는가를 결정합니다.


### `block`과 `inline`

- 대부분의 HTML 요소는 `display` 속성의 기본값으로 `block`과 `inline` 중 하나의 값을 가집니다.




---




## `block`과 `inline`에 대한 `display`의 속성값

| 속성값 | 설명 |
| - | - |
| block | block |
| inline |  |
| inline-block |  |


### `block`


- 기본적으로 가로 영역을 모두 채우며, block 요소 다음에 등장하는 태그는 줄바꿈이 된 것처럼 보입니다. 이는 word 같은 문서에서 문단을 표시할 때, 한 문단이 끝난 뒤에 나타나는 요소는 항상 다음 줄에 표시되던 것과 비슷한 맥락입니다.

- width, height 속성을 지정 할 수 있으며, block 요소 뒤에 등장하는 태그가 그 이전 block 요소에 오른쪽에 배치될 수 있어도 항상 다음 줄에 렌더링됩니다.


- block은 한 영역을 차지 하는 박스형태을 가지는 성질입니다. 그렇기 때문에 기본적으로 block은 width값이 100%가 됩니다. 그리고 라인이 새로 추가된다는 것을 알 수 있습니다. 

- block은 height와 width 값을 지정 할 수 있다.
- block은 margin과 padding을 지정 할 수 있다.

- <div>, <h1>, <p>, <ul>, <ol>, <form>요소는 대표적인 블록(block) 요소입니다.



### `inline`

- block 과 달리 줄 바꿈이 되지 않고, width와 height를 지정 할 수 없습니다. word 같은 문서에서 볼드, 이탤릭, 색상, 밑줄 등 글자나 문장에 효과를 주기 위해 존재하는 단위라고 할 수 있습니다. 문서에서 특정 부분에 색상을 입힌다고 다음에 나오는 글이 줄바꿈 되지 않듯이 inline 요소 뒤에 나오는 태그 또한 줄바꿈 되지 않고 바로 오른쪽에 표시됩니다.

- inline은 주로 텍스트를 주입 할 때 사용 되는 형태입니다. 그렇기 때문에 기본적으로 block처럼 width값이 100%가 아닌 컨텐츠 영역 만큼 자동으로 잡히게 되며 라인이 새로 추가 되지 않습니다. 높이 또한 폰트의 크기만큼 잡힙니다.(line-height로 설정이 가능 하긴 합니다.)

- width와 height를 명시 할 수 없다.
- margin은 위아래엔 적용 되지 않는다.
- padding은 좌우는 공간과 시각적인 부분이 모두 적용 되지만 위아래는 시각적으로는 추가되지만 공간을 차지 하지는 않는다.

- <span>, <a>, <img>요소는 대표적인 인라인(inline) 요소입니다.




### `inline-block`

- block과 inline의 중간 형태라고 볼 수 있는데, 줄 바꿈이 되지 않지만 크기를 지정 할 수 있습니다.

- inline-block 은 말그대로 inline의 특징과 block의 특징을 모두 가진 요소입니다. inline-block의 특징은 다음과 같습니다.

- 줄바꿈이 이루어지지 않는다.
- block처럼 width와 height를 지정 할 수 있다.
- 만약 width와 height를 지정하지 않을 경우, inline과 같이 컨텐츠만큼 영역이 잡힌다.





---




# Reference

- <http://www.tcpschool.com/css/css_position_display>
- <https://ofcourse.kr/css-course/display-속성>
