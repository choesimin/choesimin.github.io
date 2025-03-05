---
layout: skill
permalink: /180
title: TypeScript Void Type - 함수가 값을 반환하지 않을 때
description: TypeScript의 Void Type은 함수가 명시적으로 값을 반환하지 않을 때 사용하는 type으로, 함수의 목적이 반환 값이 아닌 어떤 동작을 수행하는 것임을 나타냅니다.
date: 2024-03-04
---


## `void` Type : 함수가 명시적으로 값을 반환하지 않을 때

- `void` type은 함수가 명시적으로 값을 반환하지 않을 때 사용하는 type입니다.
    - 함수가 실행된 후에 **어떠한 값도 반환하지 않음을 명시적으로 표시**하는 방법입니다.
    - 이는 함수의 목적이 반환 값이 아닌 어떤 동작을 수행하는 것임을 나타냅니다.

- 함수 type signature의 `void` 반환 type을 보고 함수의 목적을 더 쉽게 이해할 수 있으며, 실수로 반환 값을 기대하는 code를 작성하는 것을 방지할 수 있습니다.
    - `void` type은 **함수의 의도(동작을 수행하되, 호출자에게 값을 반환하지 않을 것임)를 명확히 표현**합니다.


### 기본적인 `void` 사용

- 함수가 값을 반환하지 않고 종료될 때, 반환 type으로 `void`를 지정합니다.
    - 이는 함수가 단순히 작업을 수행하고 명시적인 반환 값 없이 종료됨을 나타냅니다.
- 가장 흔한 `void` 사용 사례입니다.

- 이런 함수는 작업을 실행하긴 하지만, 호출자에게 반환 값을 돌려주지 않습니다.
    - 주로 logging, message 출력, event triggering 등의 부수 효과(side effects)를 위해 수행합니다.

```typescript
function printMessage(message: string): void {
    console.log(message);
}
```

```typescript
function greet(name: string): void {
    console.log(`Hello, ${name}!`);
}
```

```typescript
const logError = (error: Error): void => {
    console.error(error.message);
};
```


### `void` Callback 함수를 매개 변수로 사용하는 경우

- 함수가 callback 함수를 매개 변수로 받을 때, 해당 callback의 반환 type으로 `void`를 사용할 수 있습니다.
- 이는 callback이 어떤 작업을 수행하기는 하지만, 그 결과를 호출자에게 반환하지 않고, 단지 동작을 수행하기만 한다는 것을 명시합니다.

```typescript
function processUserInput(callback: (input: string) => void) {
    const input = "Some input";
    callback(input);
}
```

- 이 함수는 사용자 입력을 처리하고, callback 함수에 그 입력을 전달합니다.
- callback 함수는 입력을 사용해 작업을 수행하지만, 값은 반환하지 않습니다.


### Interface나 Type Alias에서의 `void` 사용

- `void` type은 interface나 type alias 내의 함수 signature에서도 사용될 수 있습니다.

```typescript
interface ILogger {
    log: (message: string) => void;
    error: (error: Error) => void;
}

type Callback = (success: boolean) => void;
```

- `ILogger` interface는 log와 error를 출력하는 두 method를 정의하며, 모두 반환 값 없이 동작합니다.
- `Callback` type은 `boolean` 매개 변수를 받고, 반환 값 없이 동작하는 함수의 type을 나타냅니다.


### Promise와 `void` type

- `Promise<void>`는 비동기 작업이 성공적으로 완료되었지만, 특정 값을 반환하지 않음을 나타낼 때 유용합니다.
    - 예를 들어, database에 data를 저장하는 비동기 함수는 작업이 완료된 후 반환 값 없이 성공적으로 완료되었다는 사실만 알립니다.

```typescript
async function saveToDatabase(data: any): Promise<void> {
    // database에 data를 저장하는 logic
}
```


