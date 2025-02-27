---
layout: skill
title: TypeScript Enum Type (관련된 상수들의 집합)
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
| --- | --- | --- |
| 정의 방식 | `enum` Type 사용. 'enum' keyword. | type alias 사용. 'type' keyword. |
| Runtime에 code 추가 | runtime에 추가 code를 생성함(runtime 객체로 존재). runtime code가 있어 bundle 크기가 증가할 수 있음. | runtime에 추가 code를 생성하지 않음. compile time에만 존재하므로 bundle 크기에 영향 없음. |
| Type Checking | 자동 완성 기능 지원. type checking에 용이함. | 각 가능한 값을 수동으로 입력해야 함. 자동 완성 기능 사용 시 덜 편리함. |
| Iterable | 값이기 때문에 순회가 가능함. | type이기 때문에 순회가 불가능함. |
| JavaScript 호환성 | TypeScript code를 JavaScript로 compile할 때 그 구조를 유지함. JavaScript와 TypeScript를 혼합하여 사용하는 project에 적합함. | JavaScript로 compile 시 구조를 유지하지 않음. type 정보만 존재함. |
| 사용을 권장하는 경우 | `enum` 값을 반복하거나, `enum`의 값들을 runtime에 조작해야 하는 경우.<br>특정 범주에 속하는 명확한 option 집합을 표현해야 할 때.<br>TypeScript와 JavaScript 간의 호환성이 중요한 경우. | type이 간단하고, runtime에서의 사용이 필요하지 않을 때(더 가볍고 간결한 code를 유지할 수 있음).<br>최종 bundle 크기를 최소화하고자 할 때(web application의 loading 시간과 성능 최적화에 유리). |


---


## `enum` 사용 방법


### `enum` 항목을 반복하기

- `enum`을 반복하는 것은 JavaScript 객체를 반복하는 방법과 유사합니다.
- `enum`의 key와 값을 순회할 수 있으며, 이를 통해 동적인 `enum` 관련 code를 작성할 수 있습니다.

```typescript
enum Color {
    Red = "RED",
    Green = "GREEN",
    Blue = "BLUE"
}

for (let color in Color) {
    console.log(color);    // 'Red', 'Green', 'Blue'
}
```


### `switch` 문과 함께 사용하기

- `enum`을 `switch` 문과 함께 사용하는 것은 분기 처리를 위한 일반적인 pattern입니다.

- `enum`을 `switch`의 조합은 code의 가독성을 높이고, `enum` 값에 따라 다른 logic을 실행할 수 있게 해주어, 복잡한 조건 logic을 효과적으로 관리할 수 있습니다.
    - `enum`의 각 member를 `case`로 사용하여 `switch` 문 내에서 분기를 처리하는 방식은, 특정 상태나 option에 따라 다른 행동을 취해야 할 때 유용합니다.

- `switch` 문에서 `enum`을 사용했을 때의 여러 가지 장점이 있습니다.
    1. 명확성 : `enum` member를 사용하면, magic number나 문자열 literal 대신 의미 있는 이름을 사용할 수 있어, code의 의도를 명확히 전달할 수 있습니다.
    2. type 안전성 : TypeScript compiler는 `enum`과 `switch` 문을 사용할 때, 모든 `enum` member가 처리되었는지 확인합니다.
        - `case`를 누락한 경우, compiler가 경고할 수 있으므로, error를 미연에 방지할 수 있습니다.
    3. 유지 보수성 : `enum`을 사용하면, 관련 상수 값을 한 곳에서 관리할 수 있어, 나중에 값이 변경되거나 새로운 값이 추가될 때 유지 보수하기가 더 쉽습니다.

- `enum`을 정의하고, 해당 `enum`의 값에 따라 다른 작업을 수행하도록 `switch` 문을 사용하는 예제입니다.

```typescript
enum Color {
    Red,
    Green,
    Blue,
}

function getColorName(color: Color): string {
    switch (color) {
        case Color.Red:
            return 'Red Color Name';
        case Color.Green:
            return 'Green Color Name';
        case Color.Blue:
            return 'Blue Color Name';
        default:
            return 'Unknown Color Name';
    }
}

console.log(getColorName(Color.Red));    // "Red Color Name"
```

#### 완전성 검사 (Exhaustiveness Checking)

- `switch` 문에서 `enum`을 사용할 때는 모든 `enum` member가 처리되었는지 확인하는 것이 좋습니다.
- TypeScript에서는 `never` type을 사용하여, 처리되지 않은 `enum` member가 있을 경우 compile 타임에 error를 발생시키는 완전성 검사를 할 수 있습니다.

```typescript
function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}

function getColorName(color: Color): string {
    switch (color) {
        case Color.Red:
            return 'Red Color Name';
        case Color.Green:
            return 'Green Color Name';
        case Color.Blue:
            return 'Blue Color Name';
        default:
            return assertNever(color);    // 모든 경우를 처리했다면 이 line은 실행되지 않음
    }
}
```

- `assertNever` 함수는 `never` type의 인자를 받으며, 만약 `switch` 문에서 모든 `case`가 처리되지 않아 `default`로 넘어온 경우, 예상치 못한 상태임을 알리는 error를 발생시킵니다.


### `enum` 확장하기

- TypeScript에서 `enum`은 직접적으로 확장할 수 없습니다.
- 즉, 다른 `enum`에서 상속받거나 상속을 주는 것은 불가능합니다.
- 하지만 `enum` 값을 다른 `enum`에 복사하여 확장하는 것은 가능합니다.
- 이는 때때로 `enum`의 값을 다른 `enum`으로 "확장"하는 데 사용될 수 있습니다.

```typescript
enum FirstEnum {
    A = 1,
    B = 2
}

enum SecondEnum {
    C = 3,
    D = 4,
    // FirstEnum의 값 포함
    A = FirstEnum.A,
    B = FirstEnum.B
}
```


---


## `enum` Type의 고급 기능 활용

- `enum` type에는 추가적인 특성과 고급 사용 방법이 있습니다.


### Reverse Mapping

- reverse mapping 기능은 `enum`의 값으로부터 그에 해당하는 이름을 찾아낼 수 있게 해주는 기능입니다.

- TypeScript `enum` type의 reverse mapping 기능은 숫자 `enum`만을 지원합니다.
    - 문자열 `enum`은 reverse mapping이 지원되지 않습니다.
    - 숫자 `enum`의 경우, 값으로부터 이름을 얻는 것이 가능하지만, 문자열 `enum`에서는 그렇지 않습니다.

```typescript
enum Example {
    A
}

let exampleName = Example[Example.A];    // "A"
let exampleValue = Example["A"];    // 0
```

- reverse mapping 기능은 `enum`의 값과 이름 사이를 쉽게 전환할 수 있게 해주어, debugging과 logging 작업을 용이하게 합니다.


### `const enum`

- `const enum`은 `enum`을 선언할 때 앞에 `const`를 붙여 정의합니다.
- `const enum`은 `enum`의 값이 inline으로 치환되어, 최종 JavaScript 출력에서 `enum` 객체를 제거하여 bundle 크기를 줄일 수 있습니다.
    - 성능 최적화에 유용합니다.

```typescript
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

- compile된 JavaScript에서는 `Directions`에 대한 참조가 해당 값으로 직접 치환됩니다.
- build 과정에서 참조 값만 남기기 때문에 tree-shaking이 된다는 장점이 있습니다.
    - tree-shaking이란 나무를 흔들면 죽은 나뭇잎이 떨어지는 것처럼 사용하지 않는 code를 삭제하는 방식입니다.
- 하지만 `enum`과 다르게 직접적인 값으로 치환되기 때문에, 전체 namespace에 접근하지 못하고 순회할 수도 없다는 단점이 있습니다.


### `enum`의 계산된 Member (Computed Member)

- `enum` 내의 항목(member)는 주로 '상수 member'와 '계산된 member' 두 가지 유형으로 나뉩니다.
    - 상수(constant) member은 compile time에 그 값이 확정되는 `enum` member입니다.
        - 상수 member의 값은 compile time에 결정되므로, compiler가 더 강력한 type check를 수행할 수 있고, 실행 결과를 쉽게 예측할 수 있습니다.
        - `enum` type에서 일반적으로 사용하는 member 유형입니다.

- 계산된(computed) member runtime에 평가되어야 하는 값을 가지는 `enum` member입니다.
    - runtime에 함수 호출 결과나 표현식 평가를 통해 동적으로 값을 할당받을 수 있습니다.
    - 상수 member와 달리 compile time이 아닌 runtime에 값이 결정됩니다.
        - 따라서 계산된 member의 값은 실행 전까지 실제 값을 알 수 없습니다.
    - compile time에 값을 알 수 없기 때문에 compiler의 최적화에 한계가 있습니다.

```typescript
enum RandomValues {
    A = Math.random(),    // runtime에 값 결정
    B = Math.random(),    // runtime에 값 결정
    C = A + B,    // runtime에 A와 B의 결과를 사용하여 계산
}
```

- 계산된 member는 runtime 의존성으로 인해 예측 가능성과 유지 보수성이 감소할 수 있으므로, 사용 시 해당 `enum`의 목적과 program의 전체적인 구조를 고려하여 신중하게 결정해야 합니다.
    - 계산된 member는 program의 다른 부분과의 명확한 계약(contract)을 형성하는 `enum`의 본질과 대비될 수 있습니다.
        - `enum`의 본질에 가까운 것은 compile time에 값이 확정되는 상수 member이기 때문에, `enum` 사용 pattern에서 상수 member를 사용하는 것이 더 일반적입니다.
    - 하지만 계산된 member는 특정 상황에서 필요한 동적 값 할당을 가능하게 하여, 필요 시에 program에 유연성을 제공합니다.


### `enum`과 Bit Flag

- `enum`을 사용하여 'bit flag' 또는 'bit field'를 구현할 수 있습니다.
- bit 연산을 사용하여 여러 `enum` member를 조합하는 방식은, 설정 값이나 권한 관리와 같이 여러 option을 조합해야 하는 경우 유용합니다.

```typescript
enum Permissions {
    Read = 1 << 0,    // 1
    Write = 1 << 1,    // 2
    Execute = 1 << 2,    // 4
}

// 여러 권한 조합
const myPermissions = Permissions.Read | Permissions.Write;

// 특정 권한 검사
const canExecute = (myPermissions & Permissions.Execute) === Permissions.Execute;
console.log(canExecute);    // false
```


### `enum`과 `namespace`의 결합

- `enum`은 `namespace`와 결합하여 사용될 수 있습니다.
- 이를 통해 `enum`에 method를 추가하거나, `enum` 내부에 추가적인 정보를 저장할 수 있습니다.

```typescript
enum Animal {
    Dog = "DOG",
    Cat = "CAT"
}

namespace Animal {
    export function info(animal: Animal) {
        switch (animal) {
            case Animal.Dog:
                return "Dogs are domesticated mammals.";
            case Animal.Cat:
                return "Cats are domesticated mammals.";
        }
    }
}

console.log(Animal.info(Animal.Dog));    // "Dogs are domesticated mammals."
```
