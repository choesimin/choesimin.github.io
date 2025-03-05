---
layout: skill
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


