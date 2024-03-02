---
layout: skill
title: TypeScript - Type
date: 2024-02-27
---


## Enum


TypeScript에서 Enum(열거형) 타입은 명명된 숫자 상수의 집합을 정의할 때 사용됩니다. Enum을 사용하면 개발자가 좀 더 읽기 쉽고, 관리하기 쉬운 코드를 작성할 수 있으며, 숫자나 문자열 값 집합에 더 의미 있는 이름을 부여할 수 있습니다. TypeScript의 Enum은 JavaScript에는 존재하지 않는, TypeScript가 제공하는 특별한 기능 중 하나입니다.


- Enum의 장점

- **명확성**: 코드에서 매직 넘버(magic numbers) 대신 의미 있는 이름을 사용하여 가독성을 높일 수 있습니다.
- **문서화**: Enum 자체가 값의 범위를 문서화하는 역할을 하며, 코드의 의도를 더 명확하게 전달할 수 있습니다.
- **타입 안전성**: Enum은 특정한 값들만을 가질 수 있게 함으로써, 타입 안전성을 높여줍니다.


- Enum의 사용 시 주의점

- Enum은 런타임에도 존재하는 실제 객체이며, 추가적인 JavaScript 코드를 생성합니다. 이는 프로젝트의 크기나 성능에 영향을 줄 수 있습니다.
- 문자열 Enum은 역매핑(reverse mapping)이 지원되지 않습니다. 숫자 Enum의 경우, 값으로부터 이름을 얻는 것이 가능하지만, 문자열 Enum에서는 그렇지 않습니다.

TypeScript의 Enum은 코드의 의미를 명확하게 하고, 오류를 줄이는 데 도움을 줄 수 있는 강력한 기능입니다. 하지만 사용하기 전에 프로젝트의 요구 사항과 Enum이 생성할 수 있는 추가적인 JavaScript 코드에 대해 고려해야 합니다.



### 숫자 열거형 (Numeric Enum)

TypeScript에서 Enum을 선언하면, 기본적으로 값은 0부터 시작하여 멤버마다 순차적으로 증가합니다. 각 멤버에 특정 값을 할당하지 않으면, 컴파일러가 자동으로 값을 할당합니다.

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

멤버에 특정 숫자 값을 할당할 수도 있으며, 할당된 값부터 순차적으로 증가합니다.

```typescript
enum Direction {
  Up = 1,
  Down, // 2
  Left, // 3
  Right // 4
}
```


### 문자열 열거형 (String Enum)

각 멤버에 문자열 리터럴 값을 할당하여 문자열 Enum을 만들 수 있습니다. 문자열 Enum은 자동 증가를 하지 않으므로, 각 멤버에 값을 명시적으로 할당해야 합니다.

```typescript
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}
```


### `enum`과 literal union type

TypeScript의 `enum`은 매우 유용하지만, 모든 상황에서 최선의 선택은 아닐 수 있습니다. TypeScript 2.4 이상에서는 `string` 리터럴 유니온 타입을 사용하여 유사한 기능을 구현할 수 있으며, 때로는 이 방법이 더 적합할 수 있습니다. `enum`은 런타임에 코드를 추가하므로, 최종 번들 크기에 영향을 줄 수 있습니다. 반면, `string` 리터럴 유니온 타입은 컴파일 타임에만 존재하며 런타임에 추가 코드를 생성하지 않습니다.

```typescript
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
```

이처럼 `enum` 사용에 대한 결정은 프로젝트의 요구 사항, 팀의 코딩 스타일 가이드, 그리고 성능 고려 사항을 바탕으로 신중하게 이루어져야 합니다.





---




## Enum 사용하기




### `enum` 항목을 반복하기

TypeScript의 `enum`을 반복하는 것은 JavaScript 객체를 반복하는 방법과 유사합니다. `enum`의 키와 값을 순회할 수 있으며, 이를 통해 동적인 `enum` 관련 코드를 작성할 수 있습니다.

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



### switch 문에 사용

`enum`을 `switch` 문과 함께 사용하는 것은 TypeScript에서 매우 일반적인 패턴입니다. 이 조합은 코드의 가독성을 높이고, `enum` 값에 따라 다른 로직을 실행할 수 있게 해주어, 복잡한 조건 로직을 효과적으로 관리할 수 있습니다. `enum`의 각 멤버를 `case`로 사용하여 `switch` 문 내에서 분기를 처리하는 방식은, 특정 상태나 옵션에 따라 다른 행동을 취해야 할 때 유용합니다.

- 기본 사용법

`enum`을 정의하고, 해당 `enum`의 값에 따라 다른 작업을 수행하도록 `switch` 문을 사용하는 예제입니다.

```typescript
enum Color {
  Red,
  Green,
  Blue,
}

function getColorName(color: Color): string {
  switch (color) {
    case Color.Red:
      return 'Red';
    case Color.Green:
      return 'Green';
    case Color.Blue:
      return 'Blue';
    default:
      return 'Unknown';
  }
}

console.log(getColorName(Color.Red));    // "Red"
```

- `switch` 문에서 `enum` 사용 시의 장점

1. **명확성**: `enum` 멤버를 사용하면, 매직 넘버나 문자열 리터럴 대신 의미 있는 이름을 사용할 수 있어, 코드의 의도를 명확히 전달할 수 있습니다.
2. **타입 안전성**: TypeScript 컴파일러는 `enum`과 `switch` 문을 사용할 때, 모든 `enum` 멤버가 처리되었는지 확인합니다. `case`를 누락한 경우, 컴파일러가 경고할 수 있으므로, 에러를 미연에 방지할 수 있습니다.
3. **유지 보수성**: `enum`을 사용하면, 관련 상수 값을 한 곳에서 관리할 수 있어, 나중에 값이 변경되거나 새로운 값이 추가될 때 유지 보수하기가 더 쉽습니다.

- 주의사항

- **Exhaustiveness checking(완전성 검사)**: `switch` 문에서 `enum`을 사용할 때는 모든 `enum` 멤버가 처리되었는지 확인하는 것이 좋습니다. TypeScript에서는 `never` 타입을 사용하여, 처리되지 않은 `enum` 멤버가 있을 경우 컴파일 타임에 에러를 발생시키는 완전성 검사를 할 수 있습니다.

```typescript
function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}

function getColorName(color: Color): string {
  switch (color) {
    case Color.Red:
      return 'Red';
    case Color.Green:
      return 'Green';
    case Color.Blue:
      return 'Blue';
    default:
      return assertNever(color);    // 모든 경우를 처리했다면 이 줄은 실행되지 않음
  }
}
```

`assertNever` 함수는 `never` 타입의 인자를 받으며, 만약 `switch` 문에서 모든 `case`가 처리되지 않아 `default`로 넘어온 경우, 프로그램이 예상치 못한 상태임을 알리는 에러를 발생시킵니다. 이런 방식으로, `enum`과 `switch` 문을 사용할 때 코드의 완전성을 보장할 수 있습니다.






### `enum`과 `union type`의 조합

`enum`의 멤버를 `union type`으로 사용하여, 특정 함수가 받을 수 있는 인자의 범위를 `enum` 멤버로 제한할 수 있습니다. 이는 코드의 안전성을 높이는 데 도움이 됩니다.

```typescript
enum Color {
  Red,
  Green,
  Blue
}

function paintWall(color: Color) {
  // ...
}

paintWall(Color.Red);    // 올바른 사용
// paintWall("Red");    // 오류: 'Red'는 'Color' 타입에 할당할 수 없음
```








### `enum` 확장

TypeScript에서 `enum`은 직접적으로 확장할 수 없습니다. 즉, 다른 `enum`에서 상속받거나 상속을 주는 것은 불가능합니다. 하지만 `enum` 값을 다른 `enum`에 복사하여 확장하는 것은 가능합니다. 이는 때때로 `enum`의 값을 다른 `enum`으로 "확장"하는 데 사용될 수 있습니다.

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




## Enum의 고급 기능 활용


TypeScript의 `enum`에 대해 더 자세히 설명하자면, `enum`은 코드의 가독성을 높이고 오류 가능성을 줄이는 데 유용한 도구입니다. 그러나 기본적인 사용법, 장점, 주의점 외에도 몇 가지 추가적인 특성과 고급 사용 방법이 있습니다.









### 계산된 멤버와 상수 멤버

`enum`의 멤버는 상수(constant) 또는 계산된(computed) 값일 수 있습니다. 상수 멤버는 컴파일 시점에 값을 알 수 있으며, 계산된 멤버는 실행 시점에 평가됩니다.

계산된 멤버(computed members)는 TypeScript의 `enum`에서 독특한 기능을 제공합니다. 이들은 `enum` 선언 내에서 런타임에 계산되어야 하는 값을 가지는 멤버입니다. 즉, 계산된 멤버의 값은 컴파일 시점이 아니라 실행 시점에 결정됩니다. 이를 통해 `enum`에 더 동적인 값을 포함시킬 수 있으며, 실행 시점에만 알 수 있는 값을 `enum` 멤버로 설정할 수 있습니다.

#### 계산된 멤버의 특징

- **동적 값 할당**: 계산된 멤버는 함수 호출의 결과나 런타임에 평가되는 어떤 표현식도 값으로 할당받을 수 있습니다. 이는 컴파일 시점에 값이 정해지지 않고, 프로그램 실행 중에 그 값이 결정됨을 의미합니다.
- **런타임 의존성**: 계산된 멤버의 값은 런타임에 평가되기 때문에, 해당 `enum`을 사용하는 코드가 실행되기 전까지는 해당 멤버의 실제 값을 알 수 없습니다.
- **컴파일러 최적화 한계**: 컴파일러는 계산된 멤버의 값에 대해 알 수 없기 때문에, 이를 최적화하는 데 있어 한계가 있습니다.


계산된 멤버를 사용하는 기본적인 예제를 살펴보겠습니다.

```typescript
enum RandomValues {
  A = Math.random(),
  B = Math.random(),
  C = A + B, // 실행 시점에 A와 B의 결과를 사용한 계산
}
```

이 예제에서 `A`와 `B`는 실행 시점에 `Math.random()`의 결과로 초기화되므로, 각각 다른 랜덤 값을 가집니다. `C`는 `A`와 `B`의 합을 값으로 가지며, 이 역시 실행 시점에 결정됩니다.

- 계산된 멤버를 포함하는 `enum`에서, 계산된 멤버 다음에 오는 멤버들에는 명시적인 값이 할당되어야 합니다. 그렇지 않으면, TypeScript 컴파일러가 이들의 값을 자동으로 할당할 수 없습니다.
- 계산된 멤버의 값은 프로그램의 다른 부분에서 예측하기 어렵거나, 사이드 이펙트(side effects)를 발생시킬 수 있는 코드에 의존할 수 있습니다. 이는 코드의 가독성과 유지보수성에 영향을 줄 수 있으므로, 계산된 멤버의 사용은 신중하게 고려되어야 합니다.

계산된 멤버는 `enum`에 유연성을 추가해주는 강력한 기능입니다. 그러나 이 기능은 프로그램의 다른 부분과의 명확한 계약(contract)을 형성하는 `enum`의 본질과 어느 정도 대비될 수 있습니다. 따라서 계산된 멤버의 사용은 해당 `enum`의 목적과 프로그램의 전체적인 구조를 고려하여 결정되어야 합니다.




네, 그렇습니다. TypeScript에서 `enum`을 사용할 때 일반적으로 상수 멤버(Constant Members)를 사용하는 것이 더 흔합니다. 상수 멤버의 주요 장점은 컴파일 시점에 값이 결정되기 때문에, 코드가 더 예측 가능하고, 안정적이며, 타입 안전성을 보장받을 수 있다는 점입니다.

### 상수 멤버의 장점:

1. **예측 가능성**: 상수 멤버의 값은 컴파일 시점에 결정되므로, 코드의 실행 결과를 더 쉽게 예측할 수 있습니다.
2. **타입 안전성**: TypeScript 컴파일러는 `enum`의 상수 멤버를 사용하여 더 강력한 타입 체크를 수행할 수 있습니다. 이는 잠재적인 오류를 미리 잡아내고, 코드의 안정성을 향상시킵니다.
3. **디버깅 용이성**: 상수 값은 디버깅 시에도 그 값이 명확하기 때문에, 문제의 원인을 찾기 쉽습니다.
4. **코드 최적화**: 컴파일러는 상수 멤버를 최적화하는 데 더 유리하며, 결과적으로 더 효율적인 JavaScript 코드를 생성할 수 있습니다.

### 사용 사례:

대부분의 경우, `enum`은 설정값, 상태값, 옵션 등의 정적인 데이터 집합을 표현하는 데 사용됩니다. 예를 들어, 애플리케이션 내에서 사용자의 역할을 정의할 때 상수 멤버를 사용하는 `enum`을 정의할 수 있습니다.

```typescript
enum UserRole {
  Admin,
  Editor,
  Subscriber
}
```

이러한 상황에서 각 멤버의 값은 실행 전에 이미 결정되어 있으며, 코드 내에서 이러한 값에 의존하여 조건 분기 등의 로직을 처리합니다.

### 계산된 멤버 대비:

계산된 멤버(Computed Members)는 특정 상황에서 유용할 수 있으나, 그 값이 실행 시점에 결정되므로 상수 멤버만큼 예측 가능하거나 안정적이지 않을 수 있습니다. 따라서 계산된 멤버는 필요한 특정 상황에서 신중하게 사용되어야 합니다.

### 결론:

`enum`에서 상수 멤버를 사용하는 것은 일반적인 패턴입니다. 이는 코드의 예측 가능성, 안정성, 그리고 타입 안전성을 향상시키는 데 중요한 역할을 합니다. 계산된 멤버도 그 자체로 유용할 수 있지만, 상수 멤버가 제공하는 안정성과 예측 가능성을 고려할 때, 대부분의 `enum` 사용 사례에서 상수 멤버가 선호됩니다.







### `enum`과 비트 플래그

비트 연산을 사용하여 여러 `enum` 멤버를 조합하는 방식은, 특히 설정 값이나 권한 관리와 같이 여러 옵션을 조합해야 하는 경우 유용할 수 있습니다. TypeScript에서 `enum`을 사용하여 비트 플래그(bit flags) 또는 비트 필드(bit fields)를 구현할 수 있습니다.

```typescript
enum Permissions {
  Read = 1 << 0, // 1
  Write = 1 << 1, // 2
  Execute = 1 << 2, // 4
}

// 여러 권한 조합
const myPermissions = Permissions.Read | Permissions.Write;

// 특정 권한 검사
const canExecute = (myPermissions & Permissions.Execute) === Permissions.Execute;
console.log(canExecute);    // false
```










### `const enum`

`const enum`은 `enum`을 선언할 때 앞에 `const`를 붙여 정의합니다. 이는 `enum`의 값이 인라인으로 치환되어, 최종 JavaScript 출력에서 `enum` 객체를 제거하여 번들 크기를 줄일 수 있습니다. 이는 성능 최적화에 유용할 수 있습니다.

```typescript
const enum Directions {
  Up,
  Down,
  Left,
  Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

컴파일된 JavaScript에서는 `Directions` `enum`에 대한 참조가 해당 값으로 직접 치환됩니다.













### Ambient `enum`

Ambient `enum`은 이미 존재하는 JavaScript 코드의 `enum`을 TypeScript에서 선언할 때 사용합니다. 이는 선언 병합(declaration merging)을 통해, TypeScript 타입 시스템 내에서 JavaScript `enum`의 타입을 선언하는 방법입니다.

```typescript
declare enum Seasons {
  Spring,
  Summer,
  Autumn,
  Winter
}
```

이러한 고급 특성들은 `enum`을 TypeScript에서 더 유연하게 사용할 수 있게 해주며, 다양한 시나리오에서 타입의 안전성과 코드의 가독성을 높이는 데 기여합니다. 그러나 사용하기 전에 프로젝트의 요구 사항과 `enum`이 생성할 수 있는 추가적인 JavaScript 코드에 대한 영향을 고려하는 것이 중요합니다.









### Enum에서의 역매핑(Reverse Mapping)

TypeScript의 숫자 `enum`은 역매핑 기능을 지원합니다. 이는 `enum`의 값으로부터 그에 해당하는 이름을 찾아낼 수 있게 해주는 기능입니다. 문자열 `enum`은 이 기능을 지원하지 않습니다.

```typescript
enum Example {
  A
}

let exampleName = Example[Example.A];    // "A"
let exampleValue = Example["A"];    // 0
```

이 기능은 `enum`의 값과 이름 사이를 쉽게 전환할 수 있게 해주어, 디버깅과 로깅 작업을 용이하게 합니다.











### `enum`과 `namespace`의 결합

`enum`은 `namespace`와 결합하여 사용될 수 있습니다. 이를 통해 `enum`에 메서드를 추가하거나, `enum` 내부에 추가적인 정보를 저장할 수 있습니다.

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

