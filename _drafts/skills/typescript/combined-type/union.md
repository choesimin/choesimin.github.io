---
layout: skill
title: TypeScript Combined Type - Union (여러 타입 중 하나 선택하기)
date: 2024-03-02
---




## Union Type - 여러 타입 중 하나 선택하기

TypeScript에서 유니온 타입(Union Type)은 변수나 함수가 받을 수 있는 여러 타입 중 하나를 가질 수 있게 해주는 타입입니다. 유니온 타입은 다양한 타입 중에서 하나의 타입을 선택할 수 있도록 하며, 이는 `|` 연산자를 사용하여 표현됩니다. 유니온 타입은 프로그램이 다양한 타입의 값들을 유연하게 처리할 수 있도록 해줍니다.


유니온 타입을 사용하면, 변수나 함수 매개변수가 여러 다른 타입 중 하나를 가질 수 있습니다. 예를 들어, `string | number` 유니온 타입은 해당 변수나 매개변수가 문자열 또는 숫자일 수 있음을 의미합니다.

```typescript
function logMessage(message: string | number) {
    console.log(message);
}

logMessage("Hello, TypeScript!"); // 문자열을 인자로 전달
logMessage(100); // 숫자를 인자로 전달
```


### 유니온 타입 사용의 이점

1. **유연성** : 유니온 타입을 사용하면 함수나 변수가 여러 타입의 값을 받을 수 있어, 코드의 재사용성과 유연성이 증가합니다.
2. **타입 안정성** : 유니온 타입과 타입 가드를 함께 사용하면, TypeScript 컴파일러가 타입의 안정성을 보장해주므로, 런타임 오류를 줄일 수 있습니다.
3. **간결한 코드** : 여러 타입에 대해 별도의 함수를 오버로딩하지 않고도, 하나의 함수 또는 변수로 여러 타입을 처리할 수 있어 코드가 간결해집니다.

- 유니온 타입은 TypeScript의 강력한 기능 중 하나로, 다양한 타입의 값을 유연하게 처리할 수 있는 방법을 제공합니다. 이를 통해 타입 안정성을 유지하면서도, 다양한 시나리오에 대응하는 효율적이고 간결한 코드를 작성할 수 있습니다.



### 유니온 타입과 타입 가드

유니온 타입을 사용할 때는 종종 타입 가드(Type Guard)를 사용하여 특정 타입의 값에만 접근하거나 해당 타입의 메소드를 호출해야 할 필요가 있습니다. 이는 `typeof` 연산자, `instanceof` 연산자, 사용자 정의 타입 가드를 통해 수행할 수 있습니다.

```typescript
function combine(input1: string | number, input2: string | number) {
    if (typeof input1 === "string" || typeof input2 === "string") {
        return input1.toString() + input2.toString(); // 문자열 결합
    }
    return input1 + input2; // 숫자 합산
}

console.log(combine(1, 5)); // 숫자 합산: 6
console.log(combine("Hello, ", "TypeScript!")); // 문자열 결합: "Hello, TypeScript!"
```


유니온 타입을 다룰 때는 종종 타입 가드를 사용하여 타입을 좁히는 작업이 필요합니다. `typeof`와 `instanceof` 외에도, 사용자 정의 타입 가드를 통해 더 복잡한 로직에서 타입을 안전하게 다룰 수 있습니다.

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

// 사용자 정의 타입 가드를 사용한 타입 좁히기
if (isFish(pet)) {
    pet.swim();
} else {
    pet.fly();
}
```






---




## Union Type의 다양한 사용 방법


### 객체 유니온 타입

유니온 타입은 객체 타입에도 적용될 수 있으며, 이를 통해 함수나 컴포넌트가 다양한 형태의 객체를 처리할 수 있도록 할 수 있습니다.

```typescript
interface Bird {
    type: "bird";
    flyingSpeed: number;
}

interface Horse {
    type: "horse";
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.type) {
        case "bird":
            speed = animal.flyingSpeed;
            break;
        case "horse":
            speed = animal.runningSpeed;
            break;
    }
    console.log("Moving at speed:", speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 }); // "Moving at speed: 10"
```


#### 객체 유니온 타입 사용 주의사항

객체를 유니온 타입의 일부로 사용할 때, 유니온 타입에 속한 모든 타입에 공통으로 존재하는 속성에만 접근할 수 있습니다. 공통 속성이 없다면, 타입 가드를 사용하여 각 타입에 맞는 처리를 해야 합니다.

```typescript
interface Bird {
    fly(): void;
    layEggs(): void;
}

interface Fish {
    swim(): void;
    layEggs(): void;
}

type Pet = Fish | Bird;

function getPet(): Pet {
    // ...
}

let pet = getPet();
pet.layEggs(); // 모든 Pet은 layEggs 메서드를 가지고 있음
// pet.swim(); // 오류: 유니온 타입에서는 공통된 속성만 바로 접근할 수 있음
```


### 리터럴 유니온 타입

<!-- 유니온 타입은 리터럴 값들을 조합하여 더 구체적인 타입을 정의하는 데에도 사용될 수 있습니다. 예를 들어, 함수가 받을 수 있는 특정 문자열이나 숫자의 집합을 제한하고 싶을 때 유용합니다.

```typescript
type Direction = "up" | "down" | "left" | "right";

function move(direction: Direction) {
    // 이동 logic
}
```

디스크리미네이티드 유니온(Discriminated Unions)과 `enum`은 TypeScript에서 타입의 안전성과 가독성을 높이기 위해 사용되는 두 가지 다른, 하지만 서로 보완적인 기능입니다. 리터럴 유니온 타입과 `enum`을 비교하여 디스크리미네이티드 유니온의 사용례를 더 깊이 이해해 보겠습니다. -->


리터럴 유니온 타입은 여러 리터럴 타입(주로 문자열 또는 숫자)을 `|` 연산자를 사용해 결합한 것입니다. 이를 통해 변수나 파라미터가 특정 값들 중 하나를 가져야 함을 명시적으로 선언할 수 있습니다.

예시:
```typescript
type Direction = "up" | "down" | "left" | "right";
```
여기서 `Direction` 타입은 `"up"`, `"down"`, `"left"`, `"right"` 중 하나의 값을 가질 수 있습니다. 이는 함수 인자 등에 사용하여, 타입 시스템을 통해 잘못된 값이 할당되는 것을 컴파일 시점에 방지할 수 있습니다.


#### Enum과 Literal Union Type의 비교

`enum`은 관련된 값들을 함께 그룹화하여 새로운 타입을 정의할 수 있는 TypeScript의 기능입니다. `enum`은 실행 시점에 객체로 존재하며, `enum`의 각 멤버에 접근하거나 `enum` 타입을 함수의 인자로 사용할 수 있습니다.

예시:
```typescript
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
```

`enum`을 사용하면 `Direction.Up`과 같이 접근할 수 있으며, 이는 `Direction` 타입의 변수에 할당될 수 있습니다. `enum`은 런타임에 실제 값이 필요한 경우 유용합니다.

간단하고 타입 레벨에서 만 필요한 경우 리터럴 유니온 타입이 적합할 수 있으며, 런타임에서도 접근 가능한 값이 필요하거나, 더 명확한 그룹화가 필요한 경우 `enum`을 사용하는 것이 좋습니다. 디스크리미네이티드 유니온 패턴을 사용할 때, 이 두 방식은 각각의 장점을 가지고 있으며, 상황에 따라 적절히 선택하여 사용할 수 있습니다.

| 특성        | 리터럴 유니온 타입                                       | `enum`                                                      |
|-----------|-----------------------------------------------------|----------------------------------------------------------|
| 정의 방식     | 타입 레벨에서만 존재. 컴파일 후에는 사라짐.                        | 런타임에 객체로 존재. 추가적인 런타임 기능과 정보를 제공.                   |
| 사용성       | 더 간결. 타입스크립트의 타입 시스템 내에서만 사용됨.                      | 런타임에도 접근 가능한 값. 더 구조화된 데이터를 표현할 수 있음.              |
| 타입 안전성    | 컴파일 시점에만 존재하여 런타임 오류 방지를 위한 추가적인 체크 필요 없음.          | 컴파일 시점과 런타임 모두에서 타입 안전성을 제공.                             |
| 확장성       | 수정과 확장 모두 간단함. 이름이 그룹화되지 않음.                           | 추가 멤버를 쉽게 추가할 수 있으나, 수정이 복잡할 수 있음. 이름으로 그룹화됨.            |
| 값의 종류     | 문자열, 숫자 등의 리터럴 타입으로 제한됨.                                 | 문자열, 숫자 값을 자유롭게 할당할 수 있음. 리터럴 타입 뿐만 아니라 계산된 값을 할당할 수도 있음. |
| 코드 자동 완성 | 제한적. 사용 가능한 리터럴 값에 대한 직접적인 자동 완성 지원이 없음.                 | 강력함. `enum` 멤버에 대한 자동 완성 지원으로 개발자 경험 향상.                     |
| 모듈성       | 타입스크립트의 고급 타입 시스템을 사용하여 모듈 간 타입 재사용성 강화.                   | `enum`은 자체적으로 모듈처럼 작동할 수 있어, 여러 곳에서 재사용하기 쉬움.               |
| 표현력       | 특정 값들의 명시적인 집합을 표현하는 데 유리.                                   | 더 복잡한 데이터 구조와 상태를 나타내는 데 유리.                                 |



### 매핑된 타입과 유니온

매핑된 타입(Mapped Types)을 사용하여 유니온 타입을 기반으로 새로운 타입을 동적으로 생성할 수 있습니다. 이 방법은 유니온 타입의 각 멤버를 변환하거나 수정하여 새로운 타입을 생성할 때 유용합니다.

```typescript
type Keys = "firstName" | "lastName";
type PersonRecord = Record<Keys, string>;

// PersonRecord 타입은 { firstName: string, lastName: string } 타입과 동일함
```


### 오류 처리에서의 유니온 타입

함수가 여러 타입의 에러를 반환할 수 있을 때, 유니온 타입은 각기 다른 에러 타입들을 하나의 타입으로 표현하는 데 사용될 수 있습니다. 이를 통해 에러 처리 로직을 보다 명확하게 구성할 수 있습니다.

```typescript
type NetworkError = { type: "network"; status: number; message: string };
type TimeoutError = { type: "timeout"; timeout: number; message: string };

// 네트워크 요청을 시뮬레이션하는 함수
function fetchWithTimeout(url: string): NetworkError | TimeoutError {
    // 예제를 단순화하기 위해, 무작위로 에러 타입을 선택
    if (Math.random() > 0.5) {
        // 네트워크 에러를 시뮬레이션
        return {
            type: "network",
            status: 404,
            message: "Not Found"
        };
    } else {
        // 타임아웃 에러를 시뮬레이션
        return {
            type: "timeout",
            timeout: 5000,
            message: "Request timed out"
        };
    }
}

// fetchWithTimeout 함수 사용
const result = fetchWithTimeout("https://example.com");

// 에러 타입에 따라 다른 처리를 수행
if (result.type === "network") {
    console.log(`네트워크 에러: 상태 코드 ${result.status}, 메시지: ${result.message}`);
} else {
    console.log(`타임아웃 에러: 타임아웃 ${result.timeout}ms, 메시지: ${result.message}`);
}
```




### 함수 오버로딩에서의 유니온 타입

함수 오버로딩은 함수가 다양한 타입의 인자를 받아, 각 타입에 따라 다른 동작을 할 수 있도록 하는 TypeScript의 기능입니다. 유니온 타입은 함수 오버로딩을 구현할 때, 인자나 반환 타입의 다양성을 제공하는 데 유용합니다.

```typescript
function padLeft(value: string, padding: string | number): string {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    return padding + value;
}
```


### 조건부 타입에서의 유니온 타입

조건부 타입(Conditional Types)은 입력된 타입에 따라 다른 타입을 반환할 수 있도록 하는 고급 타입스크립트 기능입니다. 유니온 타입과 결합하면, 더 동적이고 유연한 타입 변환을 정의할 수 있습니다.

```typescript
type Wrapped<T> = T extends infer U[] ? U : T;
type Unwrapped = Wrapped<string[] | number>; // string | number
```


### React 컴포넌트와 Props에서의 유니온 타입

React에서 유니온 타입은 다양한 종류의 props를 받을 수 있는 컴포넌트를 정의할 때 유용합니다. 이를 통해 단일 컴포넌트가 다양한 형태의 데이터를 처리할 수 있도록 할 수 있습니다.

```typescript
interface ImageProps {
    type: "image";
    src: string;
    alt: string;
}

interface TextProps {
    type: "text";
    text: string;
}

type Props = ImageProps | TextProps;

function Content(props: Props) {
    if (props.type === "image") {
        return <img src={props.src} alt={props.alt} />;
    } else {
        return <p>{props.text}</p>;
    }
}
```

이러한 사례들은 유니온 타입이 얼마나 유연하게 사용될 수 있는지 보여줍니다. 복잡한 타입 로직을 처리하거나, 다양한 데이터 구조를 안전하게 다루며, 코드의 가독성과 유지보수성을 향상시킬 수 있습니다.





---





## Discriminated Union Pattern

디스크리미네이티드 유니온(Discriminated Union) 패턴, 또는 태그된 유니온(Tagged Union) 패턴은 TypeScript에서 복잡한 타입 시스템을 보다 안전하고 관리하기 쉽게 다루기 위해 사용되는 고급 타입 패턴입니다. 이 패턴은 서로 다른 여러 타입을 하나의 유니온 타입으로 결합할 때, 각 타입을 구분할 수 있는 공통 속성(디스크리미네이터 또는 태그)을 포함시키는 방식입니다. 이 디스크리미네이터는 리터럴 타입을 사용하여 각각의 타입을 명확하게 식별할 수 있게 해줍니다.

### 디스크리미네이티드 유니온 패턴의 구성 요소

1. **디스크리미네이터(태그)**: 유니온에 속한 각 타입을 구별할 수 있는 고유한 속성입니다. 보통 문자열 리터럴 타입을 사용합니다.
2. **타입 가드**: 타입스크립트에게 특정 블록의 코드에서 변수가 어떤 타입인지 알려주는 조건문입니다. 이를 통해 해당 타입의 프로퍼티나 메서드에 안전하게 접근할 수 있습니다.
3. **유니온 타입**: 여러 타입을 하나로 결합한 타입으로, 결합된 각 타입은 디스크리미네이터를 포함합니다.

### 예제

```typescript
interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
    }
}
```

위 예제에서 `Shape` 타입은 `Circle`과 `Square` 두 타입의 유니온입니다. 각 타입은 `kind`라는 디스크리미네이터를 포함하고 있으며, 이는 각각 `"circle"`과 `"square"`라는 고유한 값을 가집니다. `getArea` 함수는 `Shape` 타입의 객체를 인자로 받고, 인자의 `kind` 속성을 검사하여 적절한 타입의 면적 계산식을 적용합니다. 이처럼 디스크리미네이터를 사용하면 컴파일 시 타입 안전성을 보장하면서도, 런타임에도 효율적으로 타입을 구분할 수 있습니다.

### 장점

- **타입 안전성**: 디스크리미네이티드 유니온 패턴을 사용하면 컴파일 시점에 각 타입을 정확히 구분할 수 있어, 타입 관련 오류를 방지할 수 있습니다.
- **코드 가독성 향상**: 디스크리미네이터를 통해 각 타입의 목적과 사용 방법이 명확해집니다.
- **유연성**: 다양한 타입을 안전하게 처리하면서도, 각 타입에 대한 구체적인 구현을 유연하게 관리할 수 있습니다.

디스크리미네이티드 유니온 패턴은 타입스크립트의 강력한 타입 시스템을 활용하여, 복잡한 데이터 구조와 알고리즘을

 보다 안전하고 효율적으로 다룰 수 있게 해줍니다.











































































### Discriminated Union : Type Guard 적용을 위한 Union Pattern


디스크리미네이티드 유니온(Discriminated Unions), 또는 태그된 유니온(Tagged Unions)은 TypeScript에서 유니온 타입을 사용하여 타입 안전성을 높이는 디자인 패턴입니다. 이 패턴은 유니온 타입 내의 각 타입이 공통된 프로퍼티(보통 '태그'라고 불리는 리터럴 타입의 프로퍼티)를 가지고 있으며, 이 태그를 사용하여 컴파일 타임에 타입을 구분할 수 있게 합니다.

- 사용 방법

디스크리미네이티드 유니온을 사용하기 위해서는 몇 가지 단계를 따라야 합니다:

1. **공통 태그 프로퍼티 정의**: 유니온을 구성하는 각 타입에 공통된 프로퍼티(태그)를 추가합니다. 이 태그는 리터럴 타입으로, 각 타입을 유일하게 식별할 수 있어야 합니다.

2. **유니온 타입 정의**: 태그를 포함한 타입들을 유니온으로 결합합니다.

3. **타입 가드를 이용한 타입 구분**: 함수 내에서 타입의 태그를 검사하여, 각 타입에 맞는 적절한 처리를 수행합니다.

- 예시 설명

위에서 제시된 코드는 `Circle`과 `Square` 두 타입을 정의하고 있으며, 각각 `kind`라는 공통 태그 프로퍼티를 가지고 있습니다. 이 태그는 각 타입을 식별하는 데 사용됩니다.

- `Circle` 타입은 `kind` 프로퍼티가 `"circle"`이고, 반지름을 나타내는 `radius` 프로퍼티를 가집니다.
- `Square` 타입은 `kind` 프로퍼티가 `"square"`이고, 한 변의 길이를 나타내는 `sideLength` 프로퍼티를 가집니다.

`Shape` 유니온 타입은 `Circle` 또는 `Square` 타입이 될 수 있습니다. `getArea` 함수는 `Shape` 유니온 타입의 인스턴스를 받아, `kind` 프로퍼티의 값에 따라 적절한 면적 계산 방법을 적용합니다. 이는 `switch` 문을 사용하여 `kind` 태그의 값에 따라 분기 처리하는 고전적인 디스크리미네이티드 유니온의 사용 예입니다.

```typescript
function getArea(shape: Shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2; // 원의 면적 계산
        case "square":
            return shape.sideLength ** 2; // 정사각형의 면적 계산
    }
}
```

이 패턴의 장점은 타입스크립트 컴파일러가 `switch` 문 내에서 `kind` 프로퍼티의 값을 검사할 때 각 케이스에 해당하는 타입으로 `shape` 변수의 타입을 자동으로 좁혀준다는 것입니다. 이로 인해 각 분기에서 `shape` 변수를 해당 타입으로 안전하게 사용할 수 있으며, 타입 관련 오류를 컴파일 시점에 미리 잡아낼 수 있습니다.

디스크리미네이티드 유니온은 복잡한 조건 로직에서 안전하고 명확한 타입 처리를 가능하


디스크리미네드 유니온, 또는 태그된 유니온은 유니온 타입의 각 멤버가 공통된 리터럴 타입 프로퍼티를 가지고 있어, 이를 기반으로 타입 가드를 쉽게 적용할 수 있게 하는 패턴입니다. 이 패턴은 유니온 타입의 멤버를 구분하기 위해 사용됩니다.

```typescript
interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.sideLength ** 2;
    }
}
```



