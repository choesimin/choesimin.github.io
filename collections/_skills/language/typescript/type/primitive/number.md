---
layout: skill
permalink: /74
title: TypeScript Number Type - 숫자
description: TypeScript의 Number Type은 JavaScript의 숫자를 나타내는 Type으로, 정수, 실수, NaN, Infinity, -Infinity 등을 포함합니다.
date: 2024-02-28
---


## Number(숫자) Type

- TypeScript에서 `number` type은 JavaScript의 **숫자**를 나타내는 type입니다.
    - `number` type은 JavaScript의 모든 숫자 값(정수, 실수, `NaN`, `Infinity`, `-Infinity` 등)를 포함합니다.


### 기본 사용법

```typescript
let integer: number = 6;
let float: number = 3.14;
let hex: number = 0xf00d;    // 16진수
let binary: number = 0b1010;    // 2진수
let octal: number = 0o744;    // 8진수
```

- `number` type 변수에는 모든 유형의 숫자를 할당할 수 있습니다.
    - 10진수뿐만 아니라, 16진수, 2진수, 8진수 literal도 지원합니다.
        - JavaScript의 `number` type이 'IEEE 754 표준'을 따르기 때문입니다.


### 숫자 연산

- `number` type 변수들은 수학적 연산(사칙연산)이 가능합니다.

```typescript
let sum: number = integer + float;    // 더하기
let difference: number = integer - float;    // 빼기
let product: number = integer * float;    // 곱하기
let quotient: number = integer / float;    // 나누기
let remainder: number = integer % float;    // 나머지
```


#### Example : 안전한 나누기 연산

- 무한대가 반환되지 않도록 값을 검사합니다.

```typescript
function safeDivide(a: number, b: number): number {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
        // return 0;    // 또는 기본 값 반환
    }
    return a / b;
}
```


