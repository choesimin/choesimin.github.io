---
layout: skill
title: TypeScript Primitive Type - Number (숫자)
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




---




## 특별한 숫자 값 : `NaN`, `Infinity`, `-Infinity`

```typescript
let notANumber: number = NaN;
let positiveInfinity: number = Infinity;
let negativeInfinity: number = -Infinity;
```

- TypeScript의 **`number` type은 몇 가지 특별한 값(`NaN`, `Infinity`, `-Infinity`)을 포함**합니다.
    - 이 값들은 JavaScript에서의 동작을 그대로 따릅니다.

- **0으로 나누는 연산이 `Infinity`를 반환**하고, **`NaN`이 특별한 숫자 값으로 존재하는 것**은 TypeScript의 숫자 type을 다룰 때 이해해야 할 중요한 특징입니다.
    - 이 특성들이 유용하게 사용될 수도 있지만, 예상치 못한 결과를 초래할 수 있으므로 programming할 때 주의해야 합니다.
    - JavaScript와 TypeScript에서 모두 동일한 숫자 처리 방식을 사용하므로, 두 언어 모두 동일하게 적용됩니다.

- 이를 올바르게 처리하기 위해서는 특수 값들이 반환될 가능성이 있는 경우를 항상 염두에 두고, 적절한 검사 routine(`isNaN`, 무한대 검사 등)을 구현하는 것이 좋습니다.


### `Infinity`, `-Infinity` : 0으로 나누는 연산의 결과

- 일반적인 수학에서는 값을 0으로 나눌 수 없지만, programming 언어에서는 이를 어떻게 처리할지에 대한 정의가 필요합니다.
- JavaScript와 TypeScript에서는 0으로 나누는 연산을 수행할 경우, `Infinity` 또는 `-Infinity`를 반환합니다.
    - 'IEEE 754 부동소수점 수 표준'을 따릅니다.

```typescript
let positiveInfinity = 1 / 0;    // Infinity
let negativeInfinity = -1 / 0;    // -Infinity
```

- `Infinity` 또는 `-Infinity`를 사용하는 처리 방식은 runtime error를 방지하고, 연산의 결과를 계속해서 처리할 수 있게 합니다.
- 하지만 오류를 발생시키지 않고 계산을 계속 진행할 수 있게 하기 때문에, programming logic에서는 이런 결과 값이 예상치 못한 오류를 발생시킬 수 있습니다.


### `NaN` : 숫자가 아닌 값

- `NaN`은 'Not-a-Number'의 약자로, 숫자가 아닌 값을 나타내는 특별한 숫자 값입니다.
    - 숫자 연산의 결과가 유효한 숫자가 아닐 때 반환됩니다.

- 0으로 0을 나누거나, 숫자가 아닌 문자열을 숫자로 나누는 등의 연산에서 `NaN`이 반환됩니다.

```typescript
let notANumber1 = 0 / 0;    // NaN
let notANumber2 = "text" / 2;    // NaN
```

- `NaN`을 확인하기 위해서는 `isNaN()` 함수를 사용해야 합니다.
    - `NaN`은 그 자체로 고유하기 때문에, 다른 `NaN` 값과도 동등하지 않습니다.
    - `NaN === NaN`은 `false`를 반환합니다.

```typescript
console.log(NaN === NaN);    // false
console.log(isNaN(result));    // true
```

- `NaN`을 포함하는 모든 수학 연산의 결과는 `NaN`입니다.
    - `NaN`의 반환은 연산 중에 오류가 발생했다는 신호이며, 이후의 계산 결과에 영향을 미칠 수 있습니다.



