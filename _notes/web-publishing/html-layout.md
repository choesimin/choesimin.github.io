---
layout: note
title: HTML Layout
version: 2023-05-08
---



## Layout : 구성 요소를 배치하기

- layout이란 특정 공간에 여러 구성 요소를 보기 좋게 효과적으로 배치하는 작업을 의미합니다.
- HTML에서는 `div` tag나 HTML5의 layout tag로 layout을 작성합니다.




HTML5에서 제공하는 레이아웃만을 위한 의미(semantic) 요소는 다음과 같습니다.


| Semantic Tag | 설명 |
| - | - |
| header | HTML 문서나 section 부분에 대한 header를 정의합니다. |
| nav | HTML 문서의 탐색 link를 정의합니다. |
| section | HTML 문서의 section 부분을 정의합니다. |
| article | HTML 문서의 독립적인 하나의 글(article) 부분을 정의합니다. |
| aside | HTML 문서의 page 부분 이외의 content를 정의합니다.  |
| footer | HTML 문서나 section 부분에 대한 footer를 정의합니다. |


## Layout 예시

```txt
┌─────────────────────────────┐
│ header                      │
├─────────────────────────────┤
│ nav                         │
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │ main                    │ │
│ │ ┌─────────┐ ┌─────────┐ │ │
│ │ │ article │ │ article │ │ │
│ │ └─────────┘ └─────────┘ │ │
│ └─────────────────────────┘ │
│ ┌───────────────┐ ┌───────┐ │
│ │ section       │ │ aside │ │
│ │ ┌───────────┐ │ │       │ │
│ │ │ article   │ │ │       │ │
│ │ └───────────┘ │ │       │ │
│ │ ┌───────────┐ │ │       │ │
│ │ │ article   │ │ │       │ │
│ │ └───────────┘ │ │       │ │
│ └───────────────┘ └───────┘ │
├─────────────────────────────┤
│ footer                      │
└─────────────────────────────┘
```



















figure
img
figcaption



---

# Reference

- <https://www.w3schools.com/html/html5_semantic_elements.asp>
- <http://www.tcpschool.com/html/html_space_layouts>