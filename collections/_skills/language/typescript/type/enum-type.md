---
layout: skill
permalink: /36
title: TypeScript Enum Type - 관련된 상수들의 집합
description: TypeScript의 Enum Type은 관련된 상수들의 집합을 정의할 때 사용되며, 숫자 열거형과 문자열 열거형 두 가지 유형이 있습니다.
date: 2024-03-03
---


## `enum` (Enumeration) Type : 열거형 Type

- TypeScript에서 `enum` type은 **명명된 숫자 상수의 집합**을 정의할 때 사용됩니다.
    - TypeScript의 `enum`은 JavaScript에는 존재하지 않는, TypeScript가 제공하는 특별한 기능 중 하나입니다.

- `enum`을 사용하면 **숫자나 문자열 값 집합에 더 의미 있는 이름을 부여**할 수 있습니다.
    - code에서 magic number 대신 의미 있는 명확한 이름을 사용하여 가독성을 높일 수 있습니다.
        - 'magic number'는 code 내에서 명확한 설명 없이 직접 사용된 hardcoding된 숫자 값으로, code의 가독성과 유지 보수성을 저하시킬 수 있습니다.
    - `enum` 자체가 값의 범위를 문서화하는 역할을 하며, code의 의도를 더 명확하게 전달할 수 있습니다.
    - `enum`은 특정한 값들만을 가질 수 있게 함으로써, type 안전성을 높여줍니다.

- `enum`은 runtime에도 존재하는 실제 객체이며, 추가적인 JavaScript code를 생성합니다.
    - 이는 project의 크기나 성능에 악영향을 줄 수 있지만, 미미합니다.


### 숫자 열거형 (Numeric Enumeration)

- `enum`을 선언하면, **기본적으로 값은 0부터 시작하여 member마다 순차적으로 증가**합니다.
- 각 member에 특정 값을 할당하지 않으면, compiler가 자동으로 값을 할당합니다.

```typescript
enum Direction {
    Up,
    Down,
    Left,
    Right
}

console.log(Direction.Up);    // 0
console.log(Direction.Down);    // 1
```

- member에 **특정 숫자 값을 할당할 수도 있으며, 할당된 값부터 순차적으로 증가**합니다.

```typescript
enum Direction {
    Up = 1,
    Down,    // 2
    Left,    // 3
    Right    // 4
}
```


### 문자열 열거형 (String Enumeration)

- 각 member에 문자열 **string literal 값을 할당**하여 문자열 `enum`을 만들 수 있습니다.
- 문자열 `enum`은 값이 자동으로 증가하지 않으므로, **각 member에 값을 명시적으로 할당**해야 합니다.

```typescript
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT"
}
```


### `enum`과 비슷한 Literal Union Type

- `enum` type은 유용한 기능을 제공하지만, 모든 상황에서 최선의 선택은 아닐 수 있습니다.
- 특히, TypeScript 2.4 version 이상에서는 literal union type을 사용하여 `enum`과 유사한 기능을 구현할 수 있으며, 이 방법이 더 적합할 수 있습니다.

```typescript
/* literal union type의 사용 예시 */
type TextAlignment = "left" | "right" | "center";
type HttpStatusCode = 200 | 404 | 500;
type Toggle = true | false;    // 기본 boolean type을 사용하는 것과 동일함
```

| 특성 | `enum` Type | Literal Union Type |
| 