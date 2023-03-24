---
layout: note
---




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>




# [Blog](https://siminee.github.io)




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>




# Requirements

<br/>

>## Home
### [Tree Menu](https://siminee.github.io)

<br/>

>## Contents
### Markdown Format
### [Mermaid UML](https://siminee.github.io/notes/language/markdown/mermaid.html)

<br/>

>## Free & Stable Hosting




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>




# [Github Pages](https://pages.github.com)




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>




# [Jekyll](https://jekyllrb.com)




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>




# [Jekyll Theme](http://jekyllthemes.org)

<br/>

>## Markdown Format : O

<br/>

>## Title Format : X

>>### [YEAR-MONTH-DAY-title.md](https://jekyllrb-ko.github.io/docs/structure/)

<br/>

>## Tree Menu : X

<br/>

>## Mermaid UML : X




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>




# Jekyll Custom Theme

>## [docs](https://jekyllrb-ko.github.io/docs/structure/)

<br/>

>## [_config.yml > notes collection 추가](https://github.com/siminee/siminee.github.io/blob/master/_config.yml)

>## _notes folder 추가

>>### title.md

>## _layout > note.html 추가

>## _layout > home.html 수정

<br/>

>## [최종](https://github.com/siminee/siminee.github.io)




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>




# [Home > Tree Menu](https://github.com/siminee/siminee.github.io/blob/master/_layouts/home.html)

>## [Composite Pattern](https://siminee.github.io/notes/design/design-pattern/composit-pattern.html)

### Component

```json
{
    "name": "",
    "children": [],
    "url": ""
}
```

### Composite : Menu

```json
{
    "name": "Menu Name",
    "children": [
        {
            // Menu or Content
        },
        {
            // Menu or Content
        }
    ]
}
```

### Leaf : Content

```json
{
    "name": "Content Name",
    "url": "Content URL"
}
```

<br/>

>## [1. _notes에서 Contents 가져오기](https://siminee.github.io/notes/shortpen/pages.html)
>## [2. 깊이를 가진 Node로 변환하기](https://siminee.github.io/notes/shortpen/nodes.html)
>## [3. Node들을 Grouping 하기](https://siminee.github.io/notes/shortpen/group.html)
>## [4. Rendering](https://github.com/siminee/siminee.github.io/blob/master/_layouts/home.html)




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>




# Mermaid UML

<br/>

## [_layout > note.html](https://github.com/siminee/siminee.github.io/blob/master/_layouts/note.html)

```html
<script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
    mermaid.initialize({ startOnLoad: false, theme: 'dark' });
    await mermaid.run({ querySelector: '.language-mermaid' });
</script>
```




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>




# Result

<br/>

## Home
### Tree Menu

<br/>

## Contents
### Markdown Format
### Mermaid UML

<br/>

## Free & Stable Hosting




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>




# Q & A




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>




# Blog = Web Log

>## 기록, 어디까지?
>## 우리들의 Logging Style




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>