---
layout: skill
permalink: /55
title: JavaScript - Truthy/Falsy
description: JavaScript에는 참과 거짓을 나타내는 Truthy와 Falsy 개념이 있습니다.
date: 2024-02-28
---


## Truthy & Falsy

```javascript
if (!value) {
    // value가 falsy 값인 경우 실행될 code
}
```

- `value`가 falsy 값(`false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`)일 때 조건문 내부의 code가 실행됩니다.
    - 이 code pattern은 JavaScript에서 흔하게 사용되며, code의 가독성과 유지 보수성을 높이는 데 도움이 됩니다.


