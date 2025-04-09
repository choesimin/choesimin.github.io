---
layout: note
permalink: /76
title: TypeScript Union Type - 여러 Type 허용하기
description: TypeScript의 Union Type은 여러 type 중 하나가 될 수 있는 값을 정의할 때 사용하는 고급 type으로, 여러 type을 하나의 type으로 결합하여 다양한 상황에서 유용하게 사용됩니다.
date: 2024-03-02
---


## Union Type - 여러 Type 중 하나 선택하기

- union type은 **서로 다른 여러 type 중 하나가 될 수 있는 값을 정의**할 때 사용하는 고급 type입니다. 
    - `|` 연산자를 사용하여 정의되며, 이는 변수나 매개 변수가 지정된 type 중 하나의 type을 가질 수 있음을 의미합니다.

- union type을 사용하면, 변수나 함수 매개 변수가 여러 다른 type 중 하나를 가질 수 있습니다.
    - 예를 들어, `string | number` union type은 해당 변수나 매개 변수가 문자열 또는 숫자일 수 있음을 의미합니다.

- union type은 program이 **다양한 type의 값들을 유연하게 처리할 수 있게** 하며, 다양한 상황에서 유용하게 사용됩니다.
    - 예를 들어, 함수가 여러 type의 인자를 받아들일 수 있도록 하거나, 함수가 여러 type 중 하나의 type을 반환할 수 있도록 할 때 union type을 사용할 수 있습니다.

- **`|` 연산자**로 여러 type들을 연결하여 union type을 정의합니다.

```typescript
function logMessage(message: string | number) {
    console.log(message);
}

logMessage("Hello, TypeScript!");    // 문자열을 인자로 전달
logMessage(100);    // 숫자를 인자로 전달
```


### Union Type과 Type Guard

- union type을 사용하면 변수가 여러 type 중 하나의 type을 가질 수 있음을 의미합니다.
- 이렇게 여러 type 중 하나를 가질 수 있는 변수에 대해서는, 해당 변수가 실제로 어떤 type을 가지는지를 정확히 알아내고, 그에 맞는 method나 속성에 접근하기 위해 type guard가 필요합니다.
- **union type과 type guard를 함께 사용**하면 다양한 type을 가진 변수들을 더 안전하게 처리할 수 있습니다.

#### Union Type과 `typeof` Type Guard

- `typeof` 연산자는 변수의 type을 검사하는 데 사용됩니다.
- `typeof` type guard는 주로 기본 type(`string`, `number`, `boolean`, `undefined`, `object`, `function`)을 검사하는 데 사용됩니다.

```typescript
function combine(input1: string | number, input2: string | number) {
    if (typeof input1 === "string" || typeof input2 === "string") {
        // input1과 input2는 문자열로 취급됨
        return input1.toString() + input2.toString();    // 문자열 결합
    }
    // input1과 input2는 숫자로 취급됨
    return input1 + input2;    // 숫자 합산
}
```

```typescript
const data = { key: 'value' };

if (typeof data === "object" && data !== null) {
    console.log('data는 객체입니다.');
}
```

```typescript
type Combined = object | function;

function doSomething(value: Combined) {
    if (typeof value === "object" && value !== null) {
        // 객체 관련 처리
    } else if (typeof value === "function") {
        // 함수 관련 처리
    }
}
```

#### Union Type과 `instanceof` Type Guard

- `instanceof` 연산자는 객체의 type을 검사(class의 instance인지 여부를 판단)하는 데 사용됩니다.
- `instanceof` type guard는 union type이 class instance를 포함할 때 사용됩니다.

```typescript
class Bird {
    fly() {
        console.log("bird flies");
    }
}

class Fish {
    swim() {
        console.log("fish swims");
    }
}

function move(pet: Bird | Fish) {
    if (pet instanceof Bird) {
        pet.fly();
    } else {
        pet.swim();
    }
}
```

#### Union Type과 사용자 정의 Type Guard

- 사용자 정의 type guard는 더 복잡한 type 검사 logic을 구현할 때 사용됩니다.
    - 사용자 정의 type guard는 `parameter is Type` 형태의 type 예측을 반환하는 함수입니다.

- 사용자 정의 type guard 함수를 통해 특정 type이 확실한 경우에만 해당 type의 속성이나 method에 접근할 수 있도록 합니다.

```typescript
// Fish와 Bird interface 정의
interface Fish {
    swim: () => void;
}
interface Bird {
    fly: () => void;
}

function isFish(pet: Fish | Bird): pet is Fish {
    // Fish type의 객체인지 여부를 판단하는 logic
    return (pet as Fish).swim !== undefined;
}

const pet: Fish | Bird = /* Fish 또는 Bird type의 객체 */;

// 사용자 정의 type guard를 사용하여 type을 좁힘
if (isFish(pet)) {
    pet.swim();    // pet이 Fish로 취급됨
} else {
    pet.fly();    // pet이 Bird로 취급됨
}
```


---


## 다양한 조합의 Union Type

- union type 자체는 특정 "종류"가 있는 것이 아니라, 필요에 따라 어떤 type들을 조합해 사용할 수 있는지에 대한 개념입니다.
    - 즉, union type의 "종류"는 개발자가 정의하는 type들의 조합에 의해 결정됩니다.
- union type을 사용하면 다양한 type의 조합을 생성할 수 있습니다.


### 기본 Type 조합

- 기본적인 type(`string`, `number`, `boolean` 등)을 조합하여 사용할 수 있습니다.

```typescript
let value: string | number;
value = "Hello";
value = 42;    // 유효
```


### Literal Type 조합

- literal type(특정 문자열, 숫자 등의 literal)을 union으로 조합하여, 제한된 값을 갖는 type을 정의할 수 있습니다.

```typescript
type Status = "success" | "failure" | "pending";
```

- literal type을 조합한 union type을 'literal union type'이라고 부릅니다.

#### Literal Union Type

- literal union type은 여러 literal type(주로 문자열 또는 숫자)을 `|` 연산자를 사용해 결합한 것입니다.
- 이를 통해 변수나 parameter가 특정 값들 중 하나를 가져야 함을 명시적으로 선언할 수 있습니다.
    - 예를 들어, 함수가 받을 수 있는 특정 문자열이나 숫자의 집합을 제한하고 싶을 때 유용합니다.

```typescript
type Direction = "up" | "down" | "left" | "right";

function move(direction: Direction) {
    // ...
}

move("up");
move("forward");    // Error: Argument of type '"forward"' is not assignable to parameter of type 'Direction'.
```

- `Direction` type은 `"up"`, `"down"`, `"left"`, `"right"` 중 하나의 값을 가질 수 있습니다.
    - 함수 인자 등에 사용하여, type system을 통해 잘못된 값이 할당되는 것을 compile 시점에 방지할 수 있습니다.


### 객체 Type 조합

- union type은 객체 type에도 적용될 수 있으며, 이를 통해 함수나 component가 다양한 형태의 객체를 처리할 수 있도록 할 수 있습니다.

```typescript
interface Bird {
  fly(): void;
}

interface Fish {
  swim(): void;
}

let pet: Bird | Fish;
```

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

moveAnimal({ type: "bird", flyingSpeed: 10 });    // "Moving at speed: 10"
```

#### 객체 Type 조합 주의사항

- 객체를 union type을 통해서 사용할 때, union type에 속한 모든 type에 공통으로 존재하는 속성에만 접근할 수 있습니다.
- 만약 공통 속성이 없다면, type guard를 사용하여 각 type에 맞는 처리를 해야 합니다.

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
pet.layEggs();    // OK: 모든 Pet은 layEggs method를 가지고 있음
pet.swim();    // Error: union type에서는 공통된 속성만 바로 접근할 수 있음
```


### 배열과 Tuple의 조합

- 배열(array)이나 tuple type을 union으로 조합할 수 있습니다.

```typescript
let arr: number[] | string[];
arr = [1, 2, 3];
arr = ["one", "two", "three"];
```


### 함수 Type 조합

- 함수 signature(함수의 매개 변수와 반환 type을 정의한 것)를 union으로 조합할 수 있습니다.

```typescript
let myFunction: ((a: number) => number) | ((b: string) => string);
```


### 고급 Type 조합

- generic type, 조건부(conditional) type 등과 같은 고급(advanced) type과 함께 union type을 사용할 수 있습니다.

```typescript
type Container<T> = T | T[];
```


---


## Union Type 활용하기


### Mapped Type에서의 Union Type

- mapped type을 사용하여 union type을 기반으로 새로운 type을 동적으로 생성할 수 있습니다.
- 이 방법은 union type의 각 member를 변환하거나 수정하여 새로운 type을 생성할 때 유용합니다.

```typescript
type Keys = "firstName" | "lastName";
type PersonRecord = Record<Keys, string>;
// PersonRecord type은 { firstName: string, lastName: string } type과 동일함
```


### 오류 처리에서의 Union Type

- 함수가 여러 type의 error를 반환할 수 있을 때, union type은 각기 다른 error type들을 하나의 type으로 표현하는 데 사용될 수 있습니다.
- 이를 통해 오류 처리 logic을 보다 명확하게 구성할 수 있습니다.

```typescript
type NetworkError = { type: "network"; status: number; message: string };
type TimeoutError = { type: "timeout"; timeout: number; message: string };

// network 요청을 simulation하는 함수
function fetchWithTimeout(url: string): NetworkError | TimeoutError {
    // 예제를 단순화하기 위해, 무작위로 error type을 선택
    if (Math.random() > 0.5) {
        // network error simulation
        return {
            type: "network",
            status: 404,
            message: "Not Found"
        };
    } else {
        // timeout error simulation
        return {
            type: "timeout",
            timeout: 5000,
            message: "Request timed out"
        };
    }
}

// fetchWithTimeout 함수 사용
const result = fetchWithTimeout("https://example.com");

// error type에 따라 다른 처리를 수행
if (result.type === "network") {
    console.log(`Network Error: status code ${result.status}, Message: ${result.message}`);
} else {
    console.log(`TimeOut Error: timeout ${result.timeout}ms, Message: ${result.message}`);
}
```


### 함수 Overloading에서의 Union Type

- 함수 overloading은 함수가 다양한 type의 인자를 받아, 각 type에 따라 다른 동작을 할 수 있도록 하는 기능입니다.
- union type은 함수 overloading을 구현할 때, 인자나 반환 type의 다양성을 제공하는 데 유용합니다.

```typescript
function padLeft(value: string, padding: string | number): string {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    return padding + value;
}
```


### 조건부 Type에서의 Union Type

- 조건부 type(conditional type)은 입력된 type에 따라 다른 type을 반환할 수 있도록 하는 TypeScript 고급 기능입니다.
- union type과 결합하면, 더 동적이고 유연한 type 변환을 정의할 수 있습니다.

```typescript
type Wrapped<T> = T extends infer U[] ? U : T;
type Unwrapped = Wrapped<string[] | number>;    // string | number
```


### React Component와 Props에서의 union type

- React에서 union type은 다양한 종류의 props를 받을 수 있는 component를 정의할 때 유용합니다.
- 이를 통해 단일 component가 다양한 형태의 data를 처리할 수 있도록 할 수 있습니다.

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


---


## Discriminated Union Pattern

- discriminated union(또는 tagged union) pattern은 TypeScript에서 union type을 사용하여 type 안전성을 높이는 design pattern입니다.
    - discriminated union pattern을 사용하면 compile 시점에 각 type을 정확히 구분할 수 있어, type 관련 오류를 방지할 수 있습니다.
    - discriminator(type 구분 값)를 통해 각 type의 목적과 사용 방법이 명확해져, code 가독성이 좋아집니다.
    - 다양한 type을 안전하게 처리하면서도, 각 type에 대한 구체적인 구현을 유연하게 관리할 수 있습니다.

- 이 pattern은 union type 내의 각 type이 공통된 property(discriminator)를 가지고 있으며, 이 discriminator를 사용하여 compile time에 type을 구분할 수 있게 합니다.
    - 서로 다른 여러 type을 하나의 union type으로 결합할 때, 각 type을 구분할 수 있는 공통 속성(discriminator)을 포함시킵니다.
    - 'discriminator'는 각각의 type을 명확하게 식별할 수 있게 하는 literal type의 property이며, 'tag'라고도 불립니다.


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

- discriminated union pattern을 적용하기 위해 3가지 단계가 필요합니다.

1. discriminator(tag) 정의 : union에 속한 각 type을 구별할 수 있는 literal type의 고유한 속성(discriminator)을 정의합니다.
    - `Circle`과 `Square` 두 type은 `kind`라는 discriminator를 포함하고 있으며, 각각 `"circle"`과 `"square"`라는 고유한 값을 가집니다.

2. union type 정의 : discriminator를 포함한 type들을 union으로 결합합니다.
    - `Circle`과 `Square` 두 type을 결합하여 `Shape` union type을 정의합니다.

3. type guard를 이용한 type 구분 : 함수 내에서 type의 discriminator를 검사하여, 각 type에 맞는 적절한 처리를 수행합니다.
    - `getArea` 함수는 `Shape` type의 객체를 인자로 받고, 인자의 `kind` 속성을 검사하여 적절한 type의 면적 계산식을 적용합니다.

