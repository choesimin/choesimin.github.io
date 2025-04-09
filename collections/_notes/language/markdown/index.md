---
layout: note
permalink: /40
title: Markdown - 경량 Markup Language
description: Markdown은 web contents를 작성하기 위한 경량 Markup 언어이며, 정해진 문법을 사용하여 다양한 형태의 문서를 작성할 수 있습니다.
date: 2023-04-09
---


## Markdown : Text 기반 Markup 언어

- Markdown은 web contents를 작성하기 위한 경량 Markup 언어입니다.
    - 쉽게 쓰고 읽을 수 있으며, HTML로 변환이 가능합니다.
    - 특수 기호와 문자를 이용한 간단한 구조의 문법을 사용합니다.

- John Gruber와 Aaron Swartz에 의해 2004년에 만들어졌으며, 읽기 쉽고 쓰기 쉬운 평문으로 구성되어 있어 사용자가 직관적으로 문서를 작성할 수 있도록 돕습니다.

- Markdown의 주된 목적은 web에서의 사용을 염두에 두고 최대한 읽기 쉽게 평문을 작성하는 것입니다.
    - HTML로 쉽게 변환될 수 있어 website contents로 손쉽게 사용될 수 있습니다.


### Markdown의 특징

- **간결함** : Markdown은 tag와 닫는 tag로 복잡하게 구성된 HTML보다 훨씬 간결하고, 읽고 쓰기 쉽습니다.
- **범용성** : Markdown으로 작성된 문서는 다양한 platform과 편집기에서 사용할 수 있으며, HTML로의 변환이 용이합니다.
- **가독성** : Markdown은 평문 형태로 작성되므로, Markup이 없는 상태에서도 내용을 쉽게 이해할 수 있습니다.


### Markdown의 활용

- Markdown은 기술 문서 작성, blog posting, README file 작성 등, 다양한 분야에서 널리 사용됩니다.
- GitHub, Bitbucket과 같은 개발자 도구에서도 Markdown을 지원하여, software project의 문서화에도 활용됩니다.
- 또한, 많은 현대적인 blog platform과 contents 관리 시스템(CMS)에서도 Markdown을 지원하여, contents 제작자가 보다 쉽게 글을 작성하고 관리할 수 있게 돕습니다.


---


## Markdown 문법

- Markdown의 다양한 문법을 활용하여 다양한 형태의 문서를 작성할 수 있습니다.


### 제목 (Header)

- 제목은 `#` 기호를 사용하여 표현합니다.
    - `#`의 개수에 따라 제목의 크기가 달라집니다.
    - 1단계부터 6단계까지 지원합니다.

```markdown
# 제목 1
## 제목 2
### 제목 3
#### 제목 4
##### 제목 5
###### 제목 6
```


### 강조 (Emphasis)

- **Bold체**는 text를 `**`로 감싸거나 `__`로 감싸서 표현합니다.
- *Italic체*는 text를 `*`로 감싸거나 `_`로 감싸서 표현합니다.
- ~~취소선~~은 text를 `~~`로 감싸서 표현합니다.

```markdown
**Bold체** 또는 __Bold체__
*Italic체* 또는 _Italic체_
~~취소선~~
```


### 목록 (List)

- 순서가 있는 목록과 순서가 없는 목록을 표현할 수 있습니다.

#### 순서가 있는 목록 (Ordered List)

1. 첫 번째 항목입니다.
2. 두 번째 항목입니다.
3. 세 번째 항목입니다.

```markdown
1. 첫 번째 항목입니다.
2. 두 번째 항목입니다.
3. 세 번째 항목입니다.
```

#### 순서가 없는 목록 (Unordered List)

- 항목 1입니다.
- 항목 2입니다.
    - 중첩된 항목 2-1입니다.
    - 중첩된 항목 2-2입니다.
- 항목 3입니다.

```markdown
- 항목 1입니다.
- 항목 2입니다.
    - 중첩된 항목 2-1입니다.
    - 중첩된 항목 2-2입니다.
- 항목 3입니다.
```


### 연결 주소 (Link)

- 일반 link는 `[Link Text](URL)`로 표현합니다.
- URL 직접 표시는 `<URL>`로 표현합니다.

```markdown
[Google](https://www.google.com)
<https://www.google.com>
```


### 사진 (Image)

- image는 `![Alternative Text](Image URL)`로 표현합니다.
    - Alternative Text는 image가 load되지 않았을 때 대체할 text입니다.

- link가 있는 image는 `[![Alternative Text](Image URL)](Link URL)`로 표현합니다.

```markdown
![Markdown Logo](https://markdown-here.com/img/icon256.png)
[![Markdown Logo](https://markdown-here.com/img/icon256.png)](https://markdown-here.com)
```


### Code

- code 성격의 text나 block은 backtick(``` ` ``)으로 감싸서 표현합니다.

#### Inline Code

- inline code는 text를 backtick(`` ` ``)으로 감싸서 표현합니다.

```markdown
`inline code`
```

#### Code Block

- code block은 backtick 3개(`` ``` ``)로 감싸서 표현합니다.
- 언어 지정을 통해 syntax highlighting이 가능합니다.

````markdown
```python
def hello_world():
    print("Hello, World!")
```
````


### 표 (Table)

- 표는 `|`와 `-`를 사용하여 표현합니다.
    - `-`는 header와 body를 구분하는 역할을 합니다.

- `:`를 사용하여 text 정렬을 지정할 수 있으며, header와 body 모두 적용됩니다.
    - `:`의 위치에 따라 왼쪽 정렬, 가운데 정렬, 오른쪽 정렬이 가능합니다.
    - 왼쪽 정렬 : `| --- |`, `| :--- |`.
    - 가운데 정렬 : `| :---: |`.
    - 오른쪽 정렬 : `| ---: |`.

- cell 내의 문자에 강조 효과(두껍게, 취소선, 기울임 등)를 추가할 수도 있습니다.

- 표 내부에서는 줄 바꿈을 지원하기 않기 때문에, `<br>` tag를 사용해야 합니다.

```markdown
| 항목 | 설명 | 가격 |
| --- | --- | ---: |
| 항목 1 | 설명 1 | 1,000원 |
| 항목 2 | 설명 2 | 2,000원 |
| **항목 3** | *설명 3* | ~~3,000원~~ |
```

| 항목 | 설명 | 가격 |
| --- | --- | ---: |
| 항목 1 | 설명 1 | 1,000원 |
| 항목 2 | 설명 2 | 2,000원 |
| **항목 3** | *설명 3* | ~~3,000원~~ |


### 인용문 (Blockquote)

- 인용문은 `>`를 사용하여 표현합니다.
- `>`의 개수에 따라 중첩된 인용문을 만들 수 있습니다.
- 인용문 내에서는 Markdown의 요소를 그대로 사용할 수 있습니다.

```markdown
> 인용문입니다.
>
>> 중첩된 인용문입니다.
>
> ## 인용문 내의 제목
>
> 인용문 내의___(공백 3개)
> 줄바꿈
>
> - 인용문 내의 목록 1
> - 인용문 내의 목록 2
> - 인용문 내의 목록 3
>     - 인용문 내의 목록 3-1
>     - 인용문 내의 목록 3-2
>
> ---
> (인용문 내의 수평선)
>
> `인용문 내의 inline code`
>
> ```js
> console.log('인용문 내의 code block');
> ```
```

> 인용문입니다.
>
>> 중첩된 인용문입니다.
>
> ## 인용문 내의 제목
>
> 인용문 내의___(공백 3개)
> 줄바꿈
>
> - 인용문 내의 목록 1
> - 인용문 내의 목록 2
> - 인용문 내의 목록 3
>     - 인용문 내의 목록 3-1
>     - 인용문 내의 목록 3-2
>
> ---
> (인용문 내의 수평선)
>
> `인용문 내의 inline code`
>
> ```js
> console.log('인용문 내의 code block');
> ```


### 수평선 (Horizontal Rule)

- 수평선은 `-`, `*`, `_`를 3개 이상 나열하여 표현합니다.
    - 또는 `<hr>` tag를 사용할 수 있습니다.

```markdown
---
***
___
```


### Check Box (Task List)

- check box는 `- [ ]`와 `- [x]`를 사용하여 표현합니다.

```markdown
- [x] 완료된 항목
- [ ] 미완료된 항목
```

- [x] 완료된 항목
- [ ] 미완료된 항목


### 줄 바꾸기 (Line Break)

- Markdown에서의 줄바꿈에는 특별한 문법을 사용해야 합니다.

#### 3칸 이상 띄어쓰기

```markdown
줄을___
바꿉니다.
```

#### `br` Tag 사용하기

```markdown
줄을<br>
바꿉니다.
```


### 각주 (Footnote)

- 각주는 `[^1]`, `[^2]` 형태로 참조하고, 문서 하단에 `[^1]: 각주 내용`과 같이 내용을 정의합니다.

```markdown
각주가 있는 문장[^1]과 또 다른 각주[^2]가 있습니다.

[^1]: 첫 번째 각주 내용입니다.
[^2]: 두 번째 각주 내용입니다.
```

각주가 있는 문장[^1]과 또 다른 각주[^2]가 있습니다.

[^1]: 첫 번째 각주 내용입니다.
[^2]: 두 번째 각주 내용입니다.
