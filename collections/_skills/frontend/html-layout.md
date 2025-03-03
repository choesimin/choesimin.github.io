---
layout: skill
date: 2023-05-11
title: HTML Layout - 화면 구조 설계하기
description: HTML layout은 구성 요소를 배치하는 작업을 의미합니다.
---


## Layout : 구성 요소를 배치하기

- layout이란 특정 공간에 여러 구성 요소를 보기 좋게 효과적으로 배치하는 작업을 의미합니다.
- HTML의 layout 작업에는 semantic element 또는 non-semantic element를 사용할 수 있습니다.


---


## Layout을 위한 Element : Sementic & Non-Sementic

| Semantic Element | Non-Semantic Element |
| --- | --- |
| `<form>`, `<table>`, `<img>` 등과 같이 그 내용을 분명히 정의해 줍니다. | `<div>`, `<span>` 등과 같이 그 내용에 대해 아무것도 알려주지 않는 요소입니다. |


### Layout을 위한 Semantic Element

#### Header Element

```html
<header></header>
```

- Web page에 대한 대표적인 설명글 또는 머릿말 등을 나타낼 때 사용합니다.
- 검색 engine의 검색에 참고가 되는 중요한 자료로써 사용되기도 합니다.

#### Navigation Element

```html
<nav></nav>
```

- navigation menu를 만들 때 사용합니다.
- page 상단에 위치하는 경우가 대부분이므로, `<header>` 요소 안에 포홤되는 경우가 많습니다.

#### Main Element

```html
<main></main>
```

- 해당 문서의 주요한 내용을 담을 때 사용합니다.
- `<main>` 요소의 내용은 Web 문서를 통틀어 고유합니다.
- layout 요소(`<header>`, `<nav>`, `<section>`, `<article>`, `<aside>`, `<footer>`)의 자식 요소로 들어가서는 안 됩니다.
    - `<main>` 요소는 문서 영역을 구분하는 용도로 사용하지 않기 때문입니다.

#### Section Element

```html
<section></section>
```

- 주제별로 grouping하여 구역을 나누는 데에 사용합니다.
- 해당 group의 주제를 나타내기 위해 일반적으로 제목 요소(예를 들어, `<h1>`, `<h2>`)를 포함합니다.

#### Article Element

```html
<article></article>
```

- 독자적으로 완성된 내용을 담을 때 사용합니다.
- 구역을 나눈다는 점이 `<section>` 요소와 비슷합니다.
- `<article>` 요소에 담긴 내용은 `<section>` 요소의 내용과 달리 그 자체로 재사용할 수 있습니다.

#### Aside Element

```html
<aside></aside>
```

- 문서의 주요 내용과 간접적으로만 연관된 부분을 주요 내용으로부터 분리시킬 수 있는 영역입니다.

#### Footer Element

```html
<footer></footer>
```

- 바닥글을 표시할 때 사용합니다.
- 회사의 정책, 주소, 전화번호, 저작권 표시, 고객센터 정보, site map 등이 위치합니다.


### Layout을 위한 Non-Semantic Element

#### Division Element

```html
<div></div>
```

- 의미가 없는 요소이기 때문에 식별자(`id`, `class`, `name`)를 지정하여 사용합니다.


---


## Layout Example

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
