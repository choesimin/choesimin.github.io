---
layout: skill
date: 2024-01-24
title: CSS Scroll Snap - 화면 단위로 Scroll하기
description: CSS의 scroll-snap-align 속성을 사용하여 scroll할 때 화면을 요소의 시작 부분에 맞추어 깔끔하게 scroll할 수 있습니다.
---


## Scroll할 때 자동 Snap하여 화면을 Page 시작점에 맞추기

- scroll할 때 section 단위로 화면을 깔끔하게 scroll하고 싶다면, CSS의 `scroll-snap-align` 속성을 사용합니다.

- `scroll-snap-align` 속성을 사용하면, scroll할 때 화면이 요소의 상단/중단/하단으로 자동으로 맞춰지도록 설정할 수 있습니다.
    - `scroll-snap-align` 속성에서의 'snap'은 '붙음'을 의미합니다.

- `scroll-snap-align` 속성은 자식 요소가 scroll container 내에서 어떻게 정렬될지를 결정합니다.
    - `start`, `end`, `center`의 값 중 하나를 사용할 수 있으며, 이 중 `start` 값은 요소의 시작 부분이 scroll container의 시작 부분과 정렬되도록 합니다.
    
- 각 section에 `scroll-snap-align` 속성을 사용하기 전에, 부모 요소에 `scroll-snap-type` 속성을 설정해야 합니다.
    - `scroll-snap-type` 속성은 scroll snap의 축과 강제 여부를 정의합니다.
        - 예를 들어, `scroll-snap-type: y mandatory;`는 수직 scroll에 smap을 강제로 적용하겠다는 의미입니다. 


---


## 사용 예시

```html
<!DOCTYPE html>
<html>

<head>
    <style>
        * {
            padding: 0;
            margin: 0;
        }

        main {
            scroll-snap-type: y mandatory;
            overflow-y: scroll;
            height: 100vh;
        }

        section {
            width: 100%;
            height: 100vh;
            scroll-snap-align: start;
        }
    </style>
</head>

<body>
    <main>
        <section style="background-color:black;"></section>
        <section style="background-color:white;"></section>
        <section style="background-color:black;"></section>
        <section style="background-color:white;"></section>
        <section style="background-color:black;"></section>
    </main>
</body>

</html>
```
