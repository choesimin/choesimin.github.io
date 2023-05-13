---
layout: note
title: CSS position - 요소의 위치를 결정하기
version: 2023-05-13
---




## `position` 속성

- 문서 상에 요소를 배치하는 방법을 지정합니다.
- `top`, `right`, `bottom`, `left` 속성이 요소를 배치할 최종 위치를 결정합니다.




---




## `position: static`

- 기본값입니다.
- 요소를 일반적인 문서 흐름에 따라 배치합니다.
- `top`, `right`, `bottom`, `left`, `z-index` 속성이 아무런 영향도 주지 않습니다.


## `position: relative`

- 요소를 일반적인 문서 흐름에 따라 배치합니다.
- `top`, `right`, `bottom`, `left` 속성으로 offset을 적용합니다.
    - offset은 자기 자신을 기준으로 하며, 다른 요소에는 영향을 주지 않습니다.
    - offset을 적용해도 page layout에서 요소가 차지하는 공간은 `static`일 때와 같습니다.
        - `relative` 요소가 offset에 의해 다른 요소의 공간을 침범해도, 다른 요소는 밀려나지 않고 겹쳐집니다.

- `z-index`의 값이 `auto`가 아니라면, 새로운 쌓임 맥락을 생성합니다.


## `position: absolute`

- 요소를 일반적인 문서 흐름에서 제거하고, page layout에 공간도 배정하지 않습니다.
    - 따라서 `absolute` 요소 아래에 쌓인 요소들이 `absolute` 요소의 위치를 차지하며 위로 올라오게 됩니다.

- `absolute` 요소의 배치는 위치가 지정된 조상 요소들 중에서 가장 가까운 요소를 기준으로 합니다.
    - 기준 요소에 상대적으로 배치됩니다.
    - 최종 위치는 `top`, `right`, `bottom`, `left`이 지정합니다.
    - 조상 중 위치 지정 요소가 없다면 초기 Containing Block을 기준으로 삼습니다.

- `z-index`의 값이 `auto`가 아니라면 새로운 쌓임 맥락을 생성합니다.

- `absolute` 요소의 `margin`은 서로 상쇄되지 않습니다.
    - 일반적으로 인접한 형제 요소 간의 `margin`은 서로 상쇄됩니다.


## `position: fixed`

- 요소를 일반적인 문서 흐름에서 제거하고, page layout에 공간도 배정하지 않습니다.
- viewport의 초기 Containing Block을 기준으로 삼아 배치합니다.
    - viewport : 현재 화면에 보여지고 있는 다각형(보통 직사각형)의 영역입니다.
        - web browser에서는 현재 창에서 문서를 볼 수 있는 부분을 말합니다.
            - viewport 바깥의 content는 scroll 하기 전엔 보이지 않습니다.
    - 최종 위치는 `top`, `right`, `bottom`, `left`이 지정합니다.
    - 요소의 조상 중 하나가 `transform`, `perspective`, `filter` 속성 중 어느 하나라도 `none`이 아니라면, viewport 대신 그 조상을 Containing Block으로 삼습니다.

- `fixed` 요소는 항상 새로운 쌓임 맥락을 생성합니다.


## `position: sticky`

- 요소를 일반적인 문서 흐름에 따라 배치합니다.
    - scroll하기 전에는 `static` 요소와 같이 일반적인 흐름에 따릅니다.
    - scroll 위치가 임계점에 이르면, `fixed` 요소처럼 viewport에 고정합니다.

- scroll 요소를 기준으로 `top`, `right`, `bottom`, `left`의 값에 따라 offset을 적용합니다.
    - offset의 기준이 되는 scroll 요소는 `overflow: auto` 또는 `overflow: scroll` 속성을 적용한 가장 가까운 조상 요소입니다.
    - offset은 다른 요소에는 영향을 주지 않습니다.

- `sticky` 요소는 항상 새로운 쌓임 맥락을 생성합니다.




---




# Reference

- <https://developer.mozilla.org/ko/docs/Web/CSS/position>
