---
layout: skill
permalink: /60
title: TypeScript Type Guard - Type 좁히기
description: TypeScript의 Type Guard는 변수의 type을 좁히기 위해 사용하는 기능으로, type assertion과 비슷하게 사용할 수 있습니다.
date: 2024-02-28
---


## Type Guard : Type 좁히기

- type guard는 특정 scope 내에서 **변수의 type을 보다 구체적으로 좁히기(narrowing) 위해 사용**하는 표현식입니다.

- type guard를 사용하면 **특정 조건에서 변수가 특정 type임을 보장**할 수 있으며, 이를 통해 type 안정성을 높이고 runtime error를 줄일 수 있습니다.
    - 하지만 남용하면 코드의 복잡성이 증가할 수 있기 때문에, 필요한 경우에만 적절히 사용하는 것이 좋습니다.

- **`typeof`, `instanceof`, `in` keyword를 사용한 type guard**는 JavaScript에서 지원하는 기본적인 type과 class에 대해 사용될 수 있으며, 더 복잡한 type이나 interface에 대해서는 **사용자 정의 type guard**를 사용해야 합니다.


---


## `typeof` Keyword Type Guard

- `typeof` type guard는 기본적인 JavaScript type 검사(`string`, `number`, `boolean`, `symbol`, `undefined`, `object`, `function`)에 사용됩니다.
- 변수가 특정 기본 type일 때만 특정 logic을 실행하도록 할 수 있습니다.

```typescript
if (variable typeof type) {
    // 'variable'은 'type' type으로 간주됨
}
```


### `typeof` Keyword Type Guard 예제

```typescript
function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}

console.log(padLeft("Hello, world", 4));    // "    Hello, world"
console.log(padLeft("Hello, world", ">>> "));    // ">>> Hello, world"
```

```typescript
function getNumber(value: string | number): void {
    if (typeof value === "string") {
        console.log(value.length); 
    } else {
        console.log(value); 
    }
}
```


---


## `instanceof` Keyword Type Guard

- `instanceof` type guard는 class의 instance 여부를 검사할 때 사용됩니다.
- 변수가 특정 class의 instance인 경우에만 code block을 실행할 수 있습니다.

```typescript
if (instance instanceof Class) {
    // 'instance'는 'Class' type으로 간주됨
}
```

### `instanceof` Keyword Type Guard의 예제

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

function move(pet: Bird | Fish): void {
    if (pet instanceof Bird) {
        pet.fly();
    }
    if (pet instanceof Fish) {
        pet.swim();
    }
}

const myBird = new Bird();
const myFish = new Fish();

move(myBird);    // bird flies
move(myFish);    // fish swims
```

```typescript
class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Animal {
    type: string;
    constructor(type: string) {
        this.type = type;
    }
}

function printDetails(obj: Person | Animal): void {
    if (obj instanceof Person) {
        console.log(obj.name);    // obj는 Person으로 추론됨
    } else {
        console.log(obj.type);    // obj는 Animal로 추론됨
    }
}
```


---


## `in` Keyword Type Guard

- `in` type guard는 객체가 특정 속성(property)을 가지고 있는지 여부를 검사할 때 사용됩니다.
- 특정 property가 객체 내에 존재하는 경우에만 code를 실행합니다.

```typescript
if ("property" in object) {
    // 'object'는 이 block 내에서 'property'를 가진 type으로 간주됨
}
```


### `in` Keyword Type Guard 예제

```typescript
interface Bird {
    fly(): void;
    layEggs(): void;
}

interface Fish {
    swim(): void;
    layEggs(): void;
}

function move(pet: Fish | Bird) {
    if ("swim" in pet) {
        pet.swim();
    } else {
        pet.fly();
    }
}

let pet: Fish = {swim() {}, layEggs() {}};
move(pet);    // 'pet.swim()'이 호출됨
```

```typescript
interface Book {
    id: number;
    rank: number;
}

interface OnlineLecture {
    id: string;
    url: string;
}

function learnCourse(material: Book | OnlineLecture) : number | string {
    if (rank in material) {
        return material.rank;    // material는 Book 추론됨
    } else {
        return material.url;    // obj는 OnlineLecture로 추론됨
    }
    
    if (id in material) {
    	console.log(material.id);
    }
}
```


---


## 사용자 정의 Type Guard

- 사용자 정의 type guard(user-defined type guard)는 개발자가 특정 조건을 직접 정의하여 변수의 type을 좁힐 수 있는 기능입니다.
    - `parameter is Type` 형태의 type 예측을 반환하는 함수로 구현합니다.

- type을 추론하는 함수(`isType`)가 참(`true`)을 반환할 때, 변수(`variable`)가 특정 type(`Type`)임을 compiler에게 알려주는 방식으로 작동합니다.
    - 함수가 `true`를 반환하면 `variable`이 `Type`이라고 type system(compiler)이 인식합니다.
    - `variable is Type`이 type을 추론(predicate)하는 부분입니다.

```typescript
function isType(variable: any): variable is Type {
    const result: boolean = true || false;
    return result;
}
```


### 사용자 정의 Type Guard 예제

```typescript
interface Bird {
    fly(): void;
}

interface Fish {
    swim(): void;
}

// 사용자 정의 type guard
function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}

// 사용 예시
function move(pet: Fish | Bird) {
    if (isFish(pet)) {
        pet.swim();
    } else {
        pet.fly();
    }
}
```

```typescript
interface Car {
    brand: string;
    speed: number;
}

function isCar(vehicle: any): vehicle is Car {
    return "brand" in vehicle && "speed" in vehicle;
}

function displayVehicleInfo(vehicle: Car | { type: string }): void {
    if (isCar(vehicle)) {
        console.log(vehicle.brand, vehicle.speed);    // 'vehicle'은 'Car'로 추론됨
    } else {
        console.log(vehicle.type);    // 'vehicle'은 '{ type: string }'으로 추론됨
    }
}
```


---


## Reference

- <https://velog.io/@boyeon_jeong/%ED%83%80%EC%9E%85-%EA%B0%80%EB%93%9C>
