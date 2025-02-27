---
layout: skill
title: SVG - Website 접근성을 높이는 SVG
date: 2023-08-20
---


- 그림(image), 소리(sound), 문자(text), 상호 작용(interaction) 등의 매체(multimedia)는 사용자가 이해하기 쉽게 정보를 간소화하고 분명하게 만들어 전달하기 때문에 그 자체로 접근성이 좋습니다.
- 그러나 그림이나 문자 같은 그려진 내용(rendered contents)는 비가시적 장치(non-visual device) 사용자에 대한 접근성이 매우 떨어집니다.
    - 예를 들어, 시각 장애인과 같이 audio 장치만 사용할 수 있는 환경의 사용자는 그림으로부터 정보를 얻을 수 없습니다.
- 따라서 Web 개발자와 contents 작성자는 원본과 동일한 수준의 대안(alternative equivalent)을 제공하여 정보를 전달받을 수 있도록 해야 합니다.
- SVG는 alternative equivalent로써 여러 가지 metadata를 포함하고 있기 때문에, SVG의 사용은 접근성을 높입니다.


---


## SVG의 특징 1 : Vector Graphic

- SVG는 vector로 그려지며, 따라서 raster image(pixel image)의 단점을 가지지 않습니다.


### 확대해도 깨지지 않는(Scalable) SVG

- SVG는 Vector graphic이기 때문에 수만배 확대하여도 깨지지 않습니다.
- 시력이 낮은 사용자가 화면을 확대해도 선명한 image를 그대로 볼 수 있습니다.
    - pixel 기반의 image는 확대했을 때, 계단이 생기거나 선명도가 떨어집니다.

<svg width="100" height="100"><circle cx="50" cy="50" r="50" fill="gray"></circle></svg>

- 위의 SVG로 그린 원을 크게 확대해도 선명함이 유지됩니다.


### 구조(Structure)를 가지는 SVG

- SVG는 구조 정보(structural information)를 가지고 있습니다.

|  | SVG | PNG |
| --- | --- | --- |
| Image의 요소 | Vector | Pixel |
| 그리는 방법 | 여러 개의 vector graphic component를 만들고 component들을 조합하여 하나의 SVG를 그립니다. | 각 pixel에 색상값을 설정하여 PNG를 그립니다. |
| 구조 정보의 유무 | SVG는 구조 정보를 가지고 있습니다.<br>SVG를 구성하는 vector graphic component들의 역할과 배치, vector graphic component를 구성하는 path, color 등의 정보로 전체 image의 구조적인 특징을 설명할 수 있습니다. | PNG는 구조 정보를 가지고 있지 않습니다.<br>각 좌표의 pixel이 어떤 색상값을 가졌는지만 알 수 있으며, pixel들의 색상값만으로는 구조적인 특징을 설명할 수 없습니다. |


---


## SVG의 특징 2 : XML

- SVG는 Web graphic을 생성하기 위한 XML(eXtensible Markup Language) application입니다.


### 일반 문자(Plain Text)로 작성되는 SVG

- SVG는 XML application이기 때문에 plain text로 작성됩니다.
- text 기반이기 때문에 작성자는 text editor나 XML 작성 도구를 사용하여 image를 쉽게 수정할 수 있습니다.
    - Web design tool들은 대부분이 text editor에 기능을 추가한 것이며, 이는 어떤 design tool에서든 SVG의 수정이 가능하다는 것을 의미합니다.
    - SVG editor나 SVG plugin을 사용하면 SVG를 더 쉽게 수정할 수 있습니다.


### 자유롭게 꾸밀 수 있는(Stylable) SVG

- XML로 작성된 모든 markup 문서는 CSS와 XSL style sheet를 사용하여 꾸밀 수 있으며, 따라서 SVG도 style 수정이 가능합니다.
    - CSS를 사용할 수 있기 때문에 CSS에 정의된 수많은 style 속성을 사용하여 SVG를 꾸밀 수 있습니다.
    - 저시력(low vision), 색맹(color deficiencies) 등 보조 기술(assistive technology)이 필요한 사용자를 위한 CSS Style을 SVG Image에도 그대로 적용할 수 있습니다.


### DOM Interface를 사용할 수 있는 SVG

- SVG는 XML 기반 DOM(Document Object Model)을 사용할 수 있습니다.
- DOM interface는 접근성 높은(accessible) 상호 작용(interaction)의 추가가 가능하기 때문에, SVG에 여러 보조 기술(assistive technology)을 지원하는 것이 가능합니다.


### 다른 XML 언어와 호환 가능한 SVG

- 다른 XML 언어로 작성된 문서에 SVG 문서를 포함하는 것이 가능합니다.
- 반대로 SVG 문서가 다른 XML 언어로 작성된 markup을 포함하는 것도 가능합니다.
- markup 언어를 섞어 쓸 수 있기 때문에, 문서의 각 부분에 가장 적합한 markup 언어를 사용할 수 있으며, 이는 접근성을 높이는 요소입니다.
    - 예를 들어, HTML 문서에서 SVG를 사용하여 도형과 문자를 그릴 수 있습니다.
    - 예를 들어, MathML 문서에서 SVG를 사용하여 방정식을 배치하고 graph를 그릴 수 있습니다.


---


## Reference

- <https://www.w3.org/TR/SVG-access/>
