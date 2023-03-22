---
layout: note
---




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>




# [Blog](https://siminee.github.io)
## Posting
## Archive




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>




# Requirements

<br/>

## Home
### [Tree](https://siminee.github.io)

<br/>

## Contents
### Markdown
### [Mermaid](https://siminee.github.io/notes/language/markdown/mermaid.html)

<br/>

## Free & Stable Hosting




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>




# [Github Pages](https://pages.github.com)




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>




# [Jekyll](https://jekyllrb.com)




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>




# [Jekyll Theme](http://jekyllthemes.org)

<br/>

## Markdown O

<br/>

## Title Format X

### _posts

```
yyyy-mm-dd-title-here.md
```

<br/>

## Tree X

<br/>

## Mermaid X




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>




# [Jekyll Custom](https://jekyllrb-ko.github.io/docs/structure/)

<br/>

## _config.yml > notes collection 추가

<br/>

## _notes Folder 추가

### Title Format

```
title-here.md
```

<br/>

## _layout > note.html 추가
## _layout > home.html 수정




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>




# Tree

## [Composite Pattern](https://siminee.github.io/notes/design/design-pattern/composit-pattern.html)

### Component

```json
{
    "name": "",
    "children": [],
    "url": ""
}
```

### Category

```json
{
    "name": "Category",
    "children": [
        {
            // Category or Leaf
        },
        {
            // Category or Leaf
        }
    ]
}
```

### Leaf

```json
{
    "name": "Content Title",
    "url": "Content URL"
}
```




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>




# Contents

## _notes에서 contents 가져오기
## 깊이를 가진 Node로 변환하기
## Node들을 Grouping 하기




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>




# Mermaid

<br/>

## _layout > note.html

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
### Tree

<br/>

## Contents
### Markdown
### Mermaid

<br/>

## Free & Stable Hosting




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>




# Q & A




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>




# Personal Branding

## 개발자에게 필요한가




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>