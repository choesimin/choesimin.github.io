---
layout: skill
date: 2024-03-02
title: TypeScript Combined Type - 여러 Type이 조합된 Type
description: TypeScript는 Intersection type과 Union type을 통해 다양한 type들을 조합하여 복잡한 type checking을 가능하게 하는 고급 type 기능을 제공합니다.
---


## Combined Type : 두 개 이상의 Type들이 조합된 Type

- TypeScript는 **다양한 type들을 조합**해 복잡한 type checking을 가능하게 하는 고급 type 기능을 제공합니다.
- 이 중 intersection type과 union type은 type의 조합을 표현하는 데 사용되는 두 가지 주요한 방법입니다.
    - 두 조합된 type은 서로 다른 방식으로 type을 조합합니다.


### Intersection Type

- intersection type은 **여러 type을 결합해 모든 type의 특성을 포함하는 새로운 type을 생성**합니다.
- 이는 `&` 연산자를 사용하여 표현되며, 다양한 interface 또는 type을 하나로 합쳐 새로운 type을 정의할 때 유용합니다.

```typescript
interface Employee {
    employeeId: number;
    age: number;
}

interface Manager {
    stockPlan: boolean;
}

type EmployeeManager = Employee & Manager;

const john: EmployeeManager = {
    employeeId: 123,
    age: 30,
    stockPlan: true,
};
```

- `EmployeeManager` type은 `Employee`와 `Manager` interface의 모든 속성을 결합한 intersection type입니다.
- `john` 객체는 이 intersection type에 따라 `Employee`와 `Manager`의 모든 특성을 갖추어야 합니다.


### Union Type

- union type은 **변수가 여러 type 중 하나를 가질 수 있음**을 나타내며, `|` 연산자를 사용하여 type을 정의합니다.
- 이는 함수가 다양한 type의 인자를 받거나, 다양한 type의 값을 반환할 때 유용하게 사용됩니다.

```typescript
type StringOrNumber = string | number;

function logMessage(message: StringOrNumber) {
    if (typeof message === 'string') {
        console.log('String message:', message);
    } else {
        console.log('Number message:', message);
    }
}

logMessage("Hello, TypeScript!");    // String message: Hello, TypeScript!
logMessage(101);    // Number message: 101
```

- `StringOrNumber` union type은 `string` 또는 `number` type의 값을 가질 수 있습니다.
- `logMessage` 함수는 이 union type을 매개 변수로 받아, type에 따라 다른 작업을 수행합니다.


---


## Intersection Type과 Union Type의 차이점

- intersection type은 복잡한 type을 정확하게 표현할 수 있게 하는 반면, union type은 함수나 변수가 더 다양한 type을 유연하게 처리할 수 있도록 합니다.

| Intersection Type | Union Type |
| --- | --- |
| 서로 다른 type들을 결합하여 모든 type의 특성을 포함하는 새로운 type을 정의함 | 여러 type 중 하나의 type을 가질 수 있는 type을 정의함 |
| **'그리고(And)'의 개념**으로, 여러 type의 특성을 **모두 만족**해야 함 | **'또는(Or)'의 개념**으로, 정의된 type 중 **하나만 만족**하면 됨 |
