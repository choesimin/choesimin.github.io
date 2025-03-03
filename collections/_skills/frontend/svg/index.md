---
layout: skill
date: 2023-08-26
title: SVG - Vector 기반 Image
description: SVG는 vector로 그려지는, XML 기반의 Web graphic입니다.
---


## SVG : Scalable Vector Graphics

- SVG는 HTML 문서에 vector graphic을 그리기 위해 사용되는 XML 기반 web 기술입니다.
    - vector graphic은 확대하더라도 raster/bitmap graphic처럼 계단 현상이 발생하지 않기 때문에(Scalable), 다양한 크기의 화면을 지원해야하는 Web 환경에서 큰 이점이 있습니다.

- SVG(`<svg>`)는 점, 직선, 곡선, 원, 사각형, 다각형 등과 같은 하나의 graphic 영역을 이루는 요소를 markup하기 위해서 사용됩니다.
    - 예를 들어, HTML은 제목(`<h1>`, `<h2>`), 단락(`<p>`), 목록(`<ul>`, `<ol>`), 표(`<table>`)과 같은 문서를 이루는 요소를 markup하기 위해서 사용됩니다.

- SVG graphic은 `<svg>` tag를 사용하여 다른 HTML 요소처럼 HTML 문서 안에 바로 markup하는 것이 가능합니다.
- `<object>`, `<img>`, `<iframe>` 요소를 통해 외부 file(`.svg`)에 작성된 SVG를 HTML 문서로 불러올 수도 있습니다.

- SVG는 CSS로 꾸미거나 JavaScript로 동적 효과를 적용할 수 있으며, 상호 작용(interactive)이 가능하고 동적(dynamic)입니다.
    - 예를 들어, 특정 event에 반응하는 animation을 적용할 수 있습니다.




### SVG의 3가지 Graphic 객체

- SVG는 세 가지 유형의 Graphic 객체를 제공합니다.

| Graphic Object | 설명 |
| --- | --- |
| Vector Graphic Shape | 직선과 곡선으로 이루어진 도형을 표현합니다. |
| Image | 그림, 사진을 표현합니다. |
| Text | 문자를 표현합니다. |

- SVG Graphic 객체는 내용 수정, 꾸미기가 가능합니다.
- 객체를 다른 유형의 객체로 변환할 수 있습니다.
- 여러 객체의 grouping과 합성이 가능합니다.


---


## Reference

- <https://www.w3.org/TR/SVG2/>
