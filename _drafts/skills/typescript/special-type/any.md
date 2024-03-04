---
layout: skill
title: TypeScript Special Type - Any ()
date: 2024-02-27
---




## 특수 Type : 독특한 역할을 수행하는 Type

- TypeScript의 특수 타입은 타입 시스템에서 독특한 역할을 수행하는 타입들을 말합니다.
    - 특수 type은 타입 시스템에서 각각의 고유하고 특별한 역할을 맡고 있으며, 코드의 의도를 명확하게 표현하고, 타입 안전성을 향상시키는 데 도움이 됩니다.

- 특수 타입에는 `any`, `void`, `unknown`, `never` type이 있습니다.


### `any` 타입

- `any` 타입은 TypeScript의 타입 체크를 회피할 수 있는 탈출구를 제공합니다.
- 어떤 타입의 값이든 할당할 수 있으며, 컴파일러는 `any` 타입에 대한 타입 체크를 수행하지 않습니다.

```typescript
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false;    // okay, definitely a boolean
```

- `any` 타입을 사용하면 타입 안전성이 저하될 수 있으므로, 가능한 한 사용을 피하는 것이 좋습니다.


### `void` 타입

- `void` 타입은 함수가 값을 반환하지 않을 때 사용됩니다.
- 주로 함수의 반환 타입으로 사용되며, `undefined` 또는 `null`만 할당할 수 있습니다.
    - 타입스크립트 설정에 따라 다를 수 있습니다.

```typescript
function warnUser(): void {
    console.log("This is my warning message");
}
```

- `warnUser` 함수는 아무것도 반환하지 않으므로, 반환 타입으로 `void`를 사용합니다.


### `unknown` 타입

- `unknown` 타입은 `any` 타입의 타입 안전한 대안입니다.
- 어떤 타입의 값이든 할당할 수 있지만, 해당 값에 대해 연산을 수행하기 전에 타입을 좁혀야(타입을 확인하거나 단언해야) 합니다.

```typescript
let notSure: unknown = 4;
notSure = "maybe a string instead";

if (typeof notSure === "string") {
    console.log(notSure.toUpperCase());    // OK
}
```

- `unknown` 타입에 대해서는 타입 가드를 사용하여 안전하게 접근합니다.


### `never` 타입

- `never` 타입은 절대 발생할 수 없는 타입을 나타냅니다.
- 주로 도달할 수 없는 코드 영역을 나타내거나, 항상 예외를 발생시키는 함수의 반환 타입으로 사용됩니다.

```typescript
function error(message: string): never {
    throw new Error(message);
}

function fail() {
    return error("Something failed");
}
```

- `error` 함수는 반환되지 않으므로 `never` 타입을 반환 타입으로 사용합니다.
