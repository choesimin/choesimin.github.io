---
layout: skill
title: TypeScript Special Type - Never ()
date: 2024-02-27
---


## `never` Type


TypeScript의 `never` 타입은 그 자체로 매우 흥미로운 특성을 가지고 있습니다. `never` 타입은 함수가 값을 반환하지 않거나, 항상 예외를 발생시키는 경우, 또는 절대로 발생하지 않는 값의 타입으로 사용됩니다. 즉, `never` 타입은 변수에 할당될 수 있는 어떤 값도 존재하지 않음을 나타냅니다. 이는 코드의 논리적 흐름을 분석하는 데 도움을 주며, 타입 안전성을 향상시키는 데 유용하게 사용됩니다.


### `never` 타입의 이점

- **타입 안전성 향상**: `never` 타입을 사용함으로써, 코드의 특정 부분이 실행될 수 없음을 명확히 하여 타입 안전성을 향상시킬 수 있습니다.
- **코드의 의도 명확화**: 함수가 예외만을 발생시키거나 무한 루프에 빠지는 등, 특정 동작만을 수행함을 명확히 표현할 수 있습니다.
- **컴파일러 최적화**: `never` 타입을 통해 컴파일러는 코드의 도달할 수 없는 영역을 더 쉽게 식별하고, 최적화할 수 있습니다.



---





## `never` 타입의 주요 사용 사례

### 1. 절대 반환되지 않는 함수

함수가 무한 루프에 빠지거나, 항상 예외를 발생시키는 경우 해당 함수의 반환 타입으로 `never`를 사용할 수 있습니다.

```typescript
function throwError(errorMsg: string): never {
  throw new Error(errorMsg);
}

function infiniteLoop(): never {
  while (true) {}
}
```

### 2. 고갈된 유니온 타입

유니온 타입을 사용하는 경우, 모든 가능한 경우를 처리한 후에 남는 타입이 없을 때 `never` 타입이 유용하게 사용됩니다. 이는 주로 타입 가드나 패턴 매칭과 함께 사용됩니다.

```typescript
type Shape = Circle | Square;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      // 여기에 도달했다면, 모든 가능한 케이스를 처리했음을 의미합니다.
      // 이 경우, `shape`는 `never` 타입이 됩니다.
      const exhaustiveCheck: never = shape;
      return exhaustiveCheck;
  }
}
```

### 3. 타입 좁히기

`never` 타입을 사용하여 특정 조건에서 코드가 도달할 수 없음을 명시적으로 표현할 수 있습니다. 이는 컴파일러에게 불필요한 조건 분기가 없음을 알려주며, 타입 안전성을 강화하는 데 도움이 됩니다.


###타입 가드와 `never`


타입 가드를 사용할 때 `never` 타입은 exhaustive checks(완전 검사)에 유용하게 사용됩니다. 이는 특히 유니온 타입을 처리할 때 모든 가능한 케이스를 다루었는지 컴파일러가 확인할 수 있게 해주어, 누락된 케이스가 있을 때 컴파일 타임에 오류를 발생시킵니다.

```typescript
type Foo = "a" | "b" | "c";

function controlFlowAnalysisWithNever(foo: Foo) {
  switch (foo) {
    case "a":
    case "b":
      break;
    case "c":
      break;
    default:
      // `foo`는 "a", "b", "c" 중 하나이므로, 여기에 도달할 수 없습니다.
      // 따라서 `foo`의 타입은 `never`입니다.
      const exhaustiveCheck: never = foo;
      break;
  }
}
```
