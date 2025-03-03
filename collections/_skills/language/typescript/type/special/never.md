---
layout: skill
date: 2024-03-04
title: TypeScript Never Type - 절대 발생할 수 없는 값
description: TypeScript의 Never Type은 함수나 method가 정상적으로 종료되지 않을 때 사용되는 type으로, 어떤 값도 가질 수 없는 절대 발생할 수 없는 값의 type을 의미합니다.
---


## `never` Type

- TypeScript의 `never` type은 함수나 method가 정상적으로 종료되지 않을 때 사용되는 type입니다.
    - **함수가 값을 반환하지 않거나, 항상 예외를 던지거나, 혹은 무한 loop에 빠지는 경우**에 해당합니다.
    - `never` type은 변수에 할당 가능한 어떤 값도 존재하지 않는, **절대 발생할 수 없는 값의 type**을 의미합니다.

- `never` type은 **어떠한 값도 가질 수 없습니다.**
    - 함수가 정상적으로 종료되지 않거나 도달할 수 없는 code 영역을 나타낼 때 사용됩니다.

- `never` type은 **모든 type의 하위 type**입니다.
    - 어떤 type도 `never` type의 하위 type이 될 수 없습니다.
    - 이 특징은 `never` type이 union type에서 자동으로 제거되는 성질을 가지게 합니다.

- `never` type을 **type guard의 종점**으로 사용하면, code의 특정 부분이 절대 실행되지 않음을 type system에 알릴 수 있습니다.
    - 이는 exhaustive check(완전 검사)에 유용하게 사용됩니다.

- `never` type의 사용은 code의 논리적 흐름을 분석하는 데 도움을 주며, type 안전성을 강화하고 compiler 최적화에 도움이 됩니다.
    1. **type 안전성 향상** : `never` type을 사용함으로써, code의 특정 부분이 실행될 수 없음을 명확히 하여 type 안전성을 향상시킬 수 있습니다.
    2. **code의 의도 명확화** : 함수가 예외만을 발생시키거나 무한 loop에 빠지는 등, 특정 동작만을 수행함을 명확히 표현할 수 있습니다.
    3. **compiler 최적화** : `never` type을 통해 compiler는 code의 도달할 수 없는 영역을 더 쉽게 식별하고, 최적화할 수 있습니다.


---


## `never` Type의 주요 사용 사례


### 절대 반환되지 않는 함수

- 함수가 무한 loop에 빠지거나, 항상 예외를 발생시키는 경우 해당 함수의 반환 type으로 `never`를 사용할 수 있습니다.

```typescript
function throwError(errorMsg: string): never {
    throw new Error(errorMsg);
}

function infiniteLoop(): never {
    while (true) {}
}
```


### 완전 검사 (Exhaustive Check)

- `never` type을 사용하여 특정 조건에서 code가 도달할 수 없음을 명시적으로 표현할 수 있습니다.
    - type guard에서 type 좁히기(narrowing)를 적용해, **모든 가능한 case를 처리했는지 확인**합니다.
    - 모든 case를 처리한 후 남는 code 영역에 도달했다면(논리적 오류), `never` type을 통해 오류 상황을 감지할 수 있습니다.

- `switch` 문의 `default` 영역에서 `never` type을 사용하여, 모든 가능한 case를 처리했음을 compiler에게 보장할 수 있습니다.

```typescript
type Shape = Circle | Square;

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength * shape.sideLength;
        default:
            // 여기에 도달했다면, 모든 가능한 case를 처리했음을 의미함
            // 이 경우, shape는 never type이 됨
            const exhaustiveCheck: never = shape;
            return exhaustiveCheck;    // 이 code는 실행되지 않음 (compiler error)
    }
}
```

```typescript
type Action = { type: 'INCREMENT' } | { type: 'DECREMENT' } | { type: 'RESET' };

function performAction(action: Action) {
    switch (action.type) {
        case 'INCREMENT':
            console.log('Incrementing');
            break;
        case 'DECREMENT':
            console.log('Decrementing');
            break;
        case 'RESET':
            console.log('Resetting');
            break;
        default:
            const exhaustiveCheck: never = action;
            break;
    }
}

performAction({ type: 'INCREMENT' });
performAction({ type: 'DECREMENT' });
performAction({ type: 'RESET' });
```

- `default` case에 도달하는 것은 `Action` type에 정의되지 않은 새로운 행동 type이 추가되었고, 해당 case를 처리하지 않았음을 의미합니다.
- `default` case에서 `action` 변수의 type을 `never`로 명시함으로써, 모든 가능한 행동 type을 처리했다는 것을 compile time에 보장합니다.
- 만약 새로운 행동 type이 `Action` union type에 추가되면, `exhaustiveCheck`에 할당하는 과정에서 compile 오류가 발생하여, 개발자가 이를 인지하고 적절한 처리 logic을 추가할 수 있도록 돕습니다.
