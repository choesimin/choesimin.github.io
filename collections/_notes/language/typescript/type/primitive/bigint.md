---
layout: note
permalink: /227
title: TypeScript BigInt Type - 매우 큰 정수
description: TypeScript의 BigInt type은 매우 큰 정수를 나타내기 위한 원시 type으로, 매우 큰 숫자를 다루거나 정밀한 숫자 계산이 필요한 경우에 유용하게 사용됩니다.
date: 2024-02-28
---


## BigInt Type : 매우 큰 정수

- `bigint`는 JavaScript와 TypeScript에서 **매우 큰 정수**를 나타내기 위한 원시(primitive) type입니다.
    - ES2020에서 JavaScript에 도입되었으며, TypeScript에서도 사용할 수 있습니다.

- `bigint`는 매우 큰 숫자를 사용하거나 정밀한 숫자 계산이 필요한 경우에 유용하게 사용될 수 있습니다.
    - 예를 들어, 큰 숫자를 암호화(cryptography), 고정밀 시간 측정기(high precision timer), 고유 식별자 생성(unique id generation) 생성, 금융 service 등.

- `bigint` 값을 생성하기 위해서는 숫자 literal 끝에 `n`을 붙이거나, `BigInt()` 함수를 호출합니다.

```typescript
// literal을 통한 bigint 생성
let bigIntegerLiteral: bigint = 1234567890123456789012345678901234567890n;

// 함수를 통한 bigint 생성
let bigIntegerFunction: bigint = BigInt("1234567890123456789012345678901234567890");
```


### JSON 직렬화 불가능

- `bigint` type은 JSON 표준에서 기본적으로 지원되지 않습니다.
- `bigint` 값을 JSON으로 직렬화(serialization)하려면 주의가 필요하며, 일반적으로는 값을 문자열로 변환하여 처리합니다.
    - `JSON.stringify()` 함수가 `bigint` 값을 직접 처리할 수 없기 때문입니다.

```typescript
let bigInt: bigint = 1234567890123456789012345678901234567890n;
const serializedBigInt = JSON.stringify(bigInt.toString());    // 문자열로 변환하여 JSON 직렬화
console.log(serializedBigInt);    // "1234567890123456789012345678901234567890"
```


### BigInt Type과 Number Type

- `bigint`와 `number`는 모두 TypeScript에서 수치 data를 다룰 때 선택할 수 있는 type입니다.

1. `bigint` type은 `number` type보다 다를 수 있는 숫자의 범위가 크고, 정밀한 계산이 가능합니다.
    - `number` type은 IEEE 754 표준에 따른 64 Bit 부동 소수점 숫자를 나타내며, 큰 정수값을 정확히 표현하는 데 한계가 있습니다.
    - `bigint` type은 이론상으로 제한 없이 큰 정수를 표현할 수 있어, `number` type의 한계를 넘어서는 큰 정수 연산에 적합합니다.

2. `bigint`와 `number` type 간에는 자동 변환이 이루어지지 않으며, 따라서 두 type 간의 직접적인 산술 연산 역시 불가능합니다.
    - 예를 들어, `bigint` type의 값과 `number` type의 값을 더하려고 하면, TypeScript는 type 오류를 발생시킵니다.
    - 이러한 제약은 `bigint`와 `number`가 내부적으로 다르게 처리되기 때문이며, 명시적인 type 변환(type casting)을 통해 해결할 수 있지만, type의 안전성을 해칠 수 있으므로 권장되지 않습니다.
        - 가능한 한 같은 type 간의 연산을 유지하는 것이 좋습니다.

```typescript
let bigInt1: bigint = 100n;
let bigInt2: bigint = 200n;
let sumOfBigInts: bigint = bigInt1 + bigInt2;    // 300n

let normalNumber: number = 15;
let sumOfBigIntAndNumber = bigInt1 + normalNumber;    // Error : 'bigint'와 'number'를 더할 수 없음
```


---


## BigInt의 사용 예제 : Unique ID 생성

```typescript
function generateUniqueId(): bigint {
    let timestamp: bigint = BigInt(new Date().getTime());
    let random: bigint = BigInt(Math.floor(Math.random() * 10000));
    return timestamp * 10000n + random;
}

console.log(generateUniqueId());
```
