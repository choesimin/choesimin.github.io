---
layout: skill
title: Markdown - Code Block 작성하기
date: 2023-04-09
---




## Code Block 작성하기

- code block은 2가지 방법으로 작성할 수 있습니다.


### 방법 1. Code Block Code로 감싸기

- backtick 여섯 개(\`\`\` \`\`\`)를 사용합니다.

#### 문법

<pre><code class='language-plaintext'>```
main( ) {
    puts("Hello, world!");
    return 0;
}
```</code></pre>


#### 결과

> ```
> main( ) {
>     puts("Hello, world!");
>     return 0;
> }
> ```


### 방법 2. Code Tag로 감싸기

- `<pre><code> </code></pre>`를 사용합니다.

#### 문법

```txt
<pre>
<code>
main( ) {
    puts("Hello, world!");
    return 0;
}
</code>
</pre>
```

#### 결과

> <pre><code>main( ) {
>     puts("Hello, world!");
>     return 0;
> }</code></pre>




---




## Inline Code 작성하기

- inline code를 작성하기 위해서는 backtick(`` ` ``) 기호를 사용합니다.
    - backtick 기호는 대부분의 keyboard에서 숫자 `1` key 바로 왼쪽에 위치해 있습니다.

- inline code는 문장 내에서 code 조각이나 특정 기술 용어를 강조할 때 유용합니다.


### 문법

- code 조각을 backtick 기호로 감싸서 inline code를 작성합니다.

```markdown
Python에서 화면에 출력하기 위해서는 `print()` 함수를 사용합니다.
```


### 결과

> Python에서 화면에 출력하기 위해서는 `print()` 함수를 사용합니다.
