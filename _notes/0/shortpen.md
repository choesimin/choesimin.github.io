---
layout: note
---

<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>

# [Blog](https://siminee.github.io)




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>

# Essential Requirements

## [Home > Tree](https://siminee.github.io)

## [Content > Markdown](https://siminee.github.io/notes/language/markdown/index.html)

## [Content > Mermaid](https://siminee.github.io/notes/language/markdown/mermaid.html)

## Free & Stable Hosting




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>

# [Github Pages](https://pages.github.com)




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>

# [Jekyll](https://jekyllrb.com)




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>

# [Jekyll Theme](http://jekyllthemes.org)

## Title Format
- _posts
    ```
    yyyy-mm-dd-title-here.md
    ```

<br/>

## Yes : Markdown

## No : Tree + Mermaid




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>

# Jekyll Custom

## Title Format
```
_notes
    title-here.md
```

## Home > Tree

## Content > Mermaid




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
    "url": "Content Url"
}
```




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>

# Mermaid

```html
<script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
    mermaid.initialize({ startOnLoad: false, theme: 'dark' });
    await mermaid.run({ querySelector: '.language-mermaid' });
</script>
```




<br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>