---
layout: skill
title: TypeScript Combined Type
date: 2024-02-29
---




## Combined Type : 두 개 이상의 Type들이 조합된 Type

- TypeScript는 다양한 타입들을 조합해 복잡한 타입 체킹을 가능하게 하는 고급 type 기능을 제공합니다.
- 이 중 인터섹션(intersection) 타입과 유니온(union) 타입은 타입의 조합을 표현하는 데 사용되는 두 가지 주요한 방법입니다.
    - 두 조합된 타입은 서로 다른 방식으로 타입을 조합합니다.


### Intersection Type

- 인터섹션 타입은 여러 타입을 결합해 모든 타입의 특성을 포함하는 새로운 타입을 생성합니다.
- 이는 `&` 연산자를 사용하여 표현되며, 다양한 인터페이스 또는 타입을 하나로 합쳐 새로운 타입을 정의할 때 유용합니다.

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

- `EmployeeManager` 타입은 `Employee`와 `Manager` 인터페이스의 모든 속성을 결합한 인터섹션 타입입니다.
- `john` 객체는 이 인터섹션 타입에 따라 `Employee`와 `Manager`의 모든 특성을 갖추어야 합니다.


### Union Type

- 유니온 타입은 변수가 여러 타입 중 하나를 가질 수 있음을 나타내며, `|` 연산자를 사용하여 타입을 정의합니다.
- 이는 함수가 다양한 타입의 인자를 받거나, 다양한 타입의 값을 반환할 때 유용하게 사용됩니다.

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

- `StringOrNumber` 유니온 타입은 `string` 또는 `number` 타입의 값을 가질 수 있습니다.
- `logMessage` 함수는 이 유니온 타입을 매개 변수로 받아, 타입에 따라 다른 작업을 수행합니다.




---




## Intersection Type과 Union Type의 차이점

- **인터섹션 타입**: 서로 다른 타입들을 결합하여 모든 타입의 특성을 포함하는 새로운 타입을 정의합니다.
    - '그리고(And)'의 개념으로, 여러 타입의 특성을 모두 만족해야 합니다.

- **유니온 타입**: 여러 타입 중 하나의 타입을 가질 수 있는 타입을 정의합니다.
    - '또는(Or)'의 개념으로, 정의된 타입 중 하나만 만족하면 됩니다.

인터섹션 타입은 복잡한 타입을 정확하게 표현할 수 있게 해주는 반면, 유니온 타입은 함수나 변수가 더 다양한 타입을 유연하게 처리할 수 있도록 해줍니다.
각각의 타입 조합 방법은 특정 상황에서 타입의 안정성을 보장하고, 개발자의 의도를 명확히 전달하는 데 도움을 줍니다.
따라서, 개발 과정에서 요구되는 타입의 특성에 따라 적절한 타입 조합 방법을 선택하는 것이 중요합니다.
