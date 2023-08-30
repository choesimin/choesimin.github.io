---
layout: note
title: SVG - Path 도형 그리기
date: 2023-08-29
---




- **`<path>` 요소**를 사용하여 기본 도형보다 복잡한 모양의 **path 도형**을 그릴 수 있습니다.
- path 도형은 기본 도형(직사각형, 원, 직선 등)에서 사용하는 `x`, `y`, `fill`, `stroke`, `stroke-width` 속성을 기본적으로 지원합니다.
- 복잡한 path 도형을 그릴 때는 Adobe Illustrator와 같은 vector drawing tool 사용을 권장합니다.

<svg height="180">
    <path 
        d="M248.761,92c0,9.801-7.93,17.731-17.71,17.731c-0.319,0-0.617,0-0.935-0.021c-10.035,37.291-51.174,65.206-100.414,65.206 c-49.261,0-90.443-27.979-100.435-65.334c-0.765,0.106-1.531,0.149-2.317,0.149c-9.78,0-17.71-7.93-17.71-17.731 c0-9.78,7.93-17.71,17.71-17.71c0.787,0,1.552,0.042,2.317,0.149C39.238,37.084,80.419,9.083,129.702,9.083c49.24,0,90.379,27.937,100.414,65.228h0.021c0.298-0.021,0.617-0.021,0.914-0.021C240.831,74.29,248.761,82.22,248.761,92z" 
        fill="#f9ef21" stroke="#f9cf01" stroke-width="7" stroke-linejoin="round" />
</svg>




---




## Paths Data(`d`) 속성으로 Path 그리기

- `<path>` 요소의 **paths data(`d`)** 속성으로 path 도형의 모양을 결정하는 path를 어뗗게 그릴지 설정할 수 있습니다.
- paths data 속성은 data의 약어인 `d`로 선언하며, `d` 속성의 속성값은 **Command Alphabet**과 **XY 좌표값**으로 이루어집니다.

```html
<path d="
    [command_1] [x_1],[y_2]
    [command_2] [x_2],[y_2]

    [command_3] [x_3]
    [command_4] [y_4]

    [command_5] [x_5-1],[y_5-1] [x_5-2],[y_5-2]
" />
```

| `d` 속성값의 구성 요소 | 설명 |
| - | - |
| Command Alphabet | path를 그리는 방식에 대한 명령(command)을 대표하는 Alphabet입니다.<br>`moveTo`, `lineTo`, `closePath`, `curve` 등의 명령이 있으며, 여러 명령을 이어 복잡한 path을 그릴 수 있습니다. |
| XY 좌표값 | 좌표값은 정수 또는 실수로 표현하고, Alphabet이 대문자면 절대 좌표값을, 소문자면 상대 좌표값을 의미합니다.<br>x 좌표와 y 좌표는 쉼표(`,`)로 구분하며, 둘 중 하나만 필요한 경우에는 생략하여 하나의 좌표만 지정할 수도 있습니다.<br>곡선(`curve`) 명령같이 좌표값이 여러 개 필요한 명령은 공백(` `)으로 구분하여 나열합니다. |


### Path 시작하기 (moveTo)

- moveTo 명령(`M`, `m`)은 path의 시작 위치를 이동시킵니다.
    - 그림을 그리기 위해 canvas 위에 pen을 댄 것과 같습니다.

```html
<svg>
    <path d="M 10,10" />
</svg>
```


### 선 그리기 (lineTo)

- lineTo 명령(`L`, `l`, `H`, `h`, `V`, `v`)으로 직선, 수평선, 수직선을 그릴 수 있습니다.

| 명령 | 종류 | 설명 |
| - | - | - |
| `L`, `l` | 직선 | 현재 위치에서 다음 위치까지 직선을 그립니다. |
| `H`, `h` | 수평선 | 현재 위치에서 수평선을 그립니다.<br>y 좌표값만 설정하며, 그려진 선은 다음 위치의 x 좌표값까지 이어집니다. |
| `V`, `v` | 수직선 | 현재 위치에서 수직선을 그립니다.<br>x 좌표값만 설정하며, 그려진 선은 다음 위치의 y 좌표값까지 이어집니다. |

<svg height="100">
    <path d="
        M 10,10
        H 50
        L 90,50
        V 90
    " fill="none" stroke="red" stroke-width="5" />
</svg>

```html
<svg>
    <path d="
        M 10,10
        H 50
        L 90,50
        V 90
    " fill="none" stroke="red" stroke-width="5" />
</svg>
```


### Path 닫기 (closePath)

- closePath 명령(`Z`, `z`)은 현재 위치(closePath)에서 시작 위치(moveTo)까지 직선을 그리고 path 그리기를 종료합니다.

- closePath 명령은 다른 명령들과 다르게 좌표값을 입력하지 않습니다.
    - closePath 명령을 사용하면 시작 위치(moveTo)로 path가 이어져 지정할 좌표값이 없기 때문입니다.
    - 따라서 Alphabet의 대소문자(절대 좌표, 상태 좌표)도 구분하지 않으며, 대소문자의 역할이 동일합니다.

<svg height="100">
    <path d="
        M 10,10
        H 50
        L 90,50
        V 90
        z
    " fill="blue" stroke="red" stroke-width="5" />
</svg>

```html
<svg>
    <path d="
        M 10,10
        H 50
        L 90,50
        V 90
        z
    " fill="blue" stroke="red" stroke-width="5" />
</svg>
```




---




# Reference

- <https://a11y.gitbook.io/graphics-aria/svg-graphics/svg-paths-shape>
- <https://www.w3.org/TR/SVG/paths.html#PathDataCurveCommands>
