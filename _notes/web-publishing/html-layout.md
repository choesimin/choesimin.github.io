---
layout: note
title: HTML Layout - 구조 설계
version: 2023-05-11
---



## Layout : 구성 요소를 배치하기

- layout이란 특정 공간에 여러 구성 요소를 보기 좋게 효과적으로 배치하는 작업을 의미합니다.
- HTML의 layout 작업에는 semantic element 또는 non-semantic element를 사용할 수 있습니다.




---




## Layout을 위한 요소 : Sementic & Non-Sementic

| Semantic Element | Non-Semantic Element |
| - | - |
| `form`, `table`, `img` 등과 같이 그 내용을 분명히 정의해 줍니다. | `div`, `span` 등과 같이 그 내용에 대해 아무것도 알려주지 않는 요소입니다. |


### Semantic Elements for Layout

| 요소 | 설명 |
| - | - |
| header | web page에 대한 대표적인 설명글 또는 머릿말 등을 나타낼 때 사용합니다. 검색 engine의 검색에 참고가 되는 중요한 자료로써 사용되기도 합니다.  |
| nav | navigation menu를 만들 때 사용합니다. page 상단에 위치하는 경우가 대부분이므로, header 안에 포홤되는 경우가 많습니다. |
| main | 해당 문서의 주요한 내용을 담을 때 사용합니다. main 요소의 내용은 web 문서를 통틀어 고유합니다. main 요소는 문서 영역을 구분하는 용도로 사용하지 않기 때문에, layout 요소(header, nav, section, article, aside, footer)의 자식 요소로 들어가서는 안 됩니다. |
| section | 주제별로 grouping하여 구역을 나누는 데에 사용합니다. 해당 group의 주제를 나타내기 위해 일반적으로 제목 요소를 포함합니다. |
| article | 독자적으로 완성된 내용을 담을 때 사용합니다. 구역을 나눈다는 점이 section 요소와 비슷하지만, section 요소의 내용과 달리 article 요소에 담긴 내용은 그 자체로 재사용할 수 있습니다. |
| aside | 문서의 주요 내용과 간접적으로만 연관된 부분을 content로부터 분리시킬 수 있는 영역입니다. |
| footer | 바닥글을 표시할 때 사용합니다. 회사의 정책, 주소, 전화번호, 저작권 표시, 고객센터 정보, site map 등이 위치합니다. |


### Non-Semantic Elements for Layout

| div | 의미가 없는 요소이기 때문에 식별자(id, class, name 등)를 지정하여 사용합니다. |




---




## Layout Exsample

```txt
┌──────────────────────────────────────┐
│                header                │
├──────────────────────────────────────┤
│                 nav                  │
├──────────────────────────────────────┤
│  ┌────────────────────────────────┐  │
│  │              main              │  │
│  │  ┌───────────┐  ┌───────────┐  │  │
│  │  │  article  │  │  article  │  │  │
│  │  └───────────┘  └───────────┘  │  │
│  └────────────────────────────────┘  │
│  ┌───────────────────┐  ┌─────────┐  │
│  │      section      │  │  aside  │  │
│  │  ┌─────────────┐  │  │         │  │
│  │  │   article   │  │  │         │  │
│  │  └─────────────┘  │  │         │  │
│  │  ┌─────────────┐  │  │         │  │
│  │  │   article   │  │  │         │  │
│  │  └─────────────┘  │  │         │  │
│  └───────────────────┘  └─────────┘  │
├──────────────────────────────────────┤
│                footer                │
└──────────────────────────────────────┘
```




---




# Reference

- <http://www.tcpschool.com/html/html_space_layouts>
