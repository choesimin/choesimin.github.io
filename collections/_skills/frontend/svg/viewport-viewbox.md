---
layout: skill
permalink: /224
title: SVG - Viewport와 Viewbox
description: SVG의 viewport와 viewbox는 graphic 영역을 markup하기 위해 사용합니다.
date: 2023-08-24
---


## Viewport와 Viewbox

- SVG Spec에서 최상위 요소인 `<svg>`는 graphic 영역을 markup하기 위해 사용합니다.
- SVG의 graphic 요소들은 기본적으로 무한한 크기의 canvas에 그려집니다.
- 따라서 HTML 문서에서 `<svg>` 요소를 사용할 때는 canvas의 어느 위치를 얼마나 보여줄지 설정해야 합니다.
- `<svg>`의 viewport(`width`, `height`)와 viewbox(`viewBox`) 속성에 속성값을 지정하여 canvas의 크기와 위치를 정할 수 있습니다.


