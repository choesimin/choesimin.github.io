---
layout: note
title: HTML SVG - Vector로 그림 그리기
date: 2023-08-18
---




## SVG : Scalable Vector Graphics

- SVG는 **2차원 Vector Graphic** 또는 **Vector와 Raster가 혼합된 Graphic**을 서술하기 위한 언어입니다.
- SVG은 기본적으로 XML 문법으로 작성하며, HTML 문서에서 사용할 때는 HTML 문법(`<svg>`)을 사용합니다.

- SVG는 CSS로 꾸밀 수 있습니다.
- SVG로 작성한 그림은 상호 작용(interactive)이 가능하고 동적(dynamic)입니다.
    - e.g., 특정 event에 반응하는 animation을 적용할 수 있습니다.


### SVG의 3가지 Graphic 객체

- SVG는 세 가지 유형의 Graphic 객체를 제공합니다.

| Graphic Object | 설명 |
| - | - |
| Vector Graphic Shape | 직선과 곡선으로 이루어진 도형을 표현합니다. |
| Image | 그림, 사진을 표현합니다. |
| Text | 문자를 표현합니다. |

- SVG Graphic 객체는 내용 수정, 꾸미기가 가능합니다.
- 객체를 다른 유형의 객체로 변환할 수 있습니다.
- 여러 객체의 grouping과 합성이 가능합니다.




---




## Web 접근성을 높이는 SVG

- 그림(image), 소리(sound), 문자(text), 상호 작용(interaction) 등의 매체(multimedia)는 사용자가 이해하기 쉽게 정보를 간소화하고 분명하게 만들어 전달하기 때문에 그 자체로 접근성이 좋습니다.
- 그러나 그림이나 문자 같은 rendered contents는 비가시적 장치(non-visual device) 사용자에 대한 접근성이 매우 떨어집니다.
    - e.g., 시각 장애인과 같이 audio 장치만 사용할 수 있는 환경의 사용자는 그림으로부터 정보를 얻을 수 없습니다.
- 따라서 Web 개발자와 contents 작성자는 원본과 동일한 수준의 대안(alternative equivalent)을 제공하여 정보를 전달받을 수 있도록 해야 합니다.
- SVG는 alternative equivalent로써 여러 가지 metadata를 포함하고 있기 때문에, SVG의 사용은 접근성을 높이는 데에 도움이 됩니다.


### SVG의 특징 1 : Vector Graphic

#### 확대에 용이한(Scalable) Image

- SVG는 Vector graphic이기 때문에 수만배 확대하여도 깨지지 않습니다.
- 시력이 낮은 사용자가 화면을 확대해도 선명한 image를 그대로 볼 수 있습니다.
    - pixel 기반의 image는 확대했을 때, 계단이 생기거나 선명도가 떨어집니다.

<svg><circle cx="40" cy="20" r="20" fill="red"></circle></svg>

- 위의 SVG로 그린 원을 크게 확대해도 테두리의 선명함이 유지됩니다.


#### 구조적인(Structured) Image

- SVG는 구조 정보(structural information)를 가지고 있습니다.

|  | SVG | PNG |
| - | - | - |
| 기반 기술 | Vector Image | Pixel |
| 그리는 방법 | 여러 개의 vector graphic component를 만들고 component들을 조합하여 하나의 SVG를 그립니다. | 각 pixel에 색상값을 설정하여 PNG를 그립니다. |
| 구조 정보(structural information)의 유무 | SVG는 구조 정보를 가지고 있습니다.<br>1. vector graphic component를 작성할 때 각 역할을 설정하며, component를 그리는 것도 설정된 역할에 대한 정보를 가지고 있습니다.<br>따라서 SVG를 이루 component의 갯수, component의 구성, component의 위치 등의 구조적인 정보를 가지고 있습니다. | PNG는 구조 정보를 가지고 있지 않습니다. |


### SVG의 특징 2 : XML

- SVG는 Web graphic을 생성하기 위한 XML(eXtensible Markup Language) application입니다.





---




# Reference

- <https://www.w3.org/TR/SVG2/>
- <https://www.w3.org/TR/SVG-access/>
