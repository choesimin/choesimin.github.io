---
layout: skill
date: 2024-02-27
title: TypeScript Primitive Type - 원시 Type
description: TypeScript의 Primitive Type은 원시적인 값을 나타내는 Type으로, number, string, boolean, undefined, null, symbol, bigint 등이 포함됩니다.
---


## Primitive Type : 원시적인 값을 나타내는 Type

- TypeScript의 원시(primitive) type은 JavaScript의 원시 type을 기반으로 합니다.
- 원시 type은 program의 기본 단위로 사용되며, **직접 변경할 수 없는 불변의 값**입니다.


### `number` Type

```typescript
let integer: number = 6;
let decimal: number = 6.5;
```

- **모든 종류의 숫자**를 나타내는 type으로 **정수와 실수를 포함**합니다.
- TypeScript는 JavaScript와 같이 별도의 정수형 타입을 제공하지 않으며, **모든 숫자는 부동 소수점 값으로 처리**됩니다.


### `string` Type

```typescript
let firstName: string = 'John';
let greeting: string = `Hello, ${firstName}`;
```

- **text data**를 나타내는 type으로, 문자 data를 작은따옴표(`' '`), 큰따옴표(`" "`), 또는 backtick(`` ` ` ``)으로 묶어서 표현합니다.
    - backtick을 사용하면 template literal을 통해 표현식을 문자열 안에 포함시킬 수 있고, 여러 line의 문자열도 한 묶음으로 지원할 수 있습니다.


### `boolean` Type

```typescript
let isDone: boolean = false;
```

- **논리적인 값인 `true`와 `false`**만을 가질 수 있는 type입니다.
- 조건문과 제어 흐름을 결정하는 데 주로 사용됩니다.


### `undefined` Type과 `null` Type

```typescript
let u: undefined = undefined;
let n: null = null;
```

- `undefined`는 **정의되지 않은 값**을, `null`은 **없는 값**을 나타냅니다.

- 기본 설정에서는 `undefined`와 `null`을 **다른 모든 type의 하위 type으로 취급**합니다.
    - 예를 들어, `number`나 `string` type의 변수에 `null`이나 `undefined`를 할당할 수 있습니다.

- 만약 `--strictNullChecks` 옵션을 활성화하면, `null`과 `undefined`는 `any`와 각각의 type들에만 할당할 수 있게 됩니다.


### Symbol Type

```typescript
let sym1 = Symbol("key1");
let sym2 = Symbol("key2");
```

- ES2015(ES6)에서 도입된 Symbol type은 **고유하고 변경 불가능**한 type입니다.


### `bigint` Type

```typescript
let big: bigint = 100n;
```

- `bigint` type은 **큰 정수**를 나타내기 위해 ES2020에서 도입되었습니다.
    - `number` type으로 표현할 수 있는 범위를 넘어서는 큰 정수를 안전하게 처리할 수 있습니다.

- `bigint` literal은 **정수 뒤에 `n`을 붙여 표현**합니다.

- `bigint`와 `number` type 간에는 직접적인 연산이 불가능합니다.
    - `bigint`와 `number`가 내부적으로 다르게 처리되기 때문입니다.
    - 예를 들어, `bigint`와 `number`를 더하려고 하면 compiler는 오류를 발생시킵니다.
