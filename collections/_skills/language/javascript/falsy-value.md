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


---


## Falsy Value

- falsy 값이란 JavaScript에서 조건문 같은 boolean context에서 `false`로 평가되는 값을 의미합니다.
- falsy 값들은 명시적으로 `false`가 아니더라도, 논리적 연산에서 `false`와 같이 취급됩니다.

| Falsy 값 | 설명 |
| --- | --- |
| `false` | Boolean type의 false 값입니다. |
| `0` | 숫자 0입니다. |
| `-0` | 음의 0입니다. |
| `0n` | BigInt 타입의 0입니다. |
| `""`, `''`, ` `` ` | 빈 문자열입니다. |
| `null` | 값이 없음을 나타내는 객체입니다. |
| `undefined` | 초기화되지 않은 변수의 기본 값입니다. |
| `NaN` | 'Not-a-Number'. 수학적 연산 실패를 나타냅니다. |

- falsy 값들은 조건문에서 `false`로 평가되기 때문에, 예를 들어 `if` 문에서 조건으로 사용될 경우 조건문의 코드 블록이 실행되지 않습니다:

```javascript
if (false) {
    // 이 code는 실행되지 않습니다.
}

if (0) {
    // 이 code는 실행되지 않습니다.
}

if ("") {
    // 이 code는 실행되지 않습니다.
}

// ...
```


## Truthy Value

- falsy 값들 외의 모든 다른 값들은 truthy로 간주됩니다.
    - 예를 들어, 모든 객체, 빈 배열(`[]`), 빈 객체(`{}`), 빈 문자열을 제외한 모든 문자열, `0`, `-0`, `NaN`을 제외한 모든 숫자 등이 truthy 값입니다.

