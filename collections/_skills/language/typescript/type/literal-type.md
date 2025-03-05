---
layout: skill
permalink: /221
title: TypeScript Literal Type - 특정한 값
description: TypeScript의 Literal Type은 특정 값을 지정할 때 사용하는 type으로, 변수가 정확히 그 값만을 가질 수 있음을 명시적으로 표현할 수 있습니다.
date: 2024-03-02
---


## Literal Type - 특정 값을 지정하기

- TypeScript의 literal type은 **특정 값만을 가질 수 있는 변수**를 선언할 때 사용합니다.
    - 이는 변수가 **정확히 그 값만을 가질 수 있음**을 의미합니다.

- literal type은 문자열, 숫자, boolean 값 등을 정확하게 지정할 수 있습니다.

- literal type을 사용하면 type의 정확성을 높일 수 있어, code의 안정성을 높이고 오류를 줄이는 데 도움이 됩니다.
    - code를 통해 변수나 속성이 가질 수 있는 값의 범위를 명확히 표현할 수 있습니다.
    - 예상치 못한 값의 할당을 compile time에 방지하여, runtime 오류의 가능성을 줄일 수 있습니다.
    - IDE에서 literal type을 사용하면, 가능한 값에 대한 자동 완성 기능을 지원받을 수 있어, 개발 효율성을 높일 수 있습니다.

- literal type은 **보통 union type과 결합하여 literl union type으로 만들어 사용하는 경우가 많습니다.**


### 문자열 Literal Type

- 문자열 literal type을 사용하면 변수가 특정 문자열 값만 가질 수 있습니다.

```typescript
let direction: "up" | "down" | "left" | "right";
direction = "up";
direction = "down";
direction = "forward";    // Error: Type '"forward"' is not assignable to type '"up" | "down" | "left" | "right"'.
```


### 숫자 Literal Type

- 숫자 literal type은 변수가 특정 숫자 값만을 가질 수 있게 합니다.

```typescript
let errorCode: 404 | 403 | 500;
errorCode = 404;
errorCode = 200;    // Error: Type '200' is not assignable to type '404 | 403 | 500'.
```


### Boolean Literal Type

- boolean literal type을 사용하여, 변수가 `true`나 `false` 중 하나의 값만 가질 수 있게 할 수 있습니다.
    - 하지만 `true`나 `false` 중 하나의 값만 가질 수 있다는 점은 기본 boolean type과 동일하기 때문에, boolean literal type은 특정 조건에서만 유용합니다.

```typescript
let isTrue: true;
isTrue = true;
isTrue = false;    // Error: Type 'false' is not assignable to type 'true'.
```


### 객체 literal type

- 객체의 속성에 literal type을 사용할 수도 있습니다.
    - 특정 속성이 정해진 몇 가지 값 중 하나만을 가질 수 있도록 제한할 수 있습니다.

```typescript
type Button = {
    color: "red" | "blue" | "green";
    disabled: boolean;
};

let submitButton: Button = {
    color: "red",
    disabled: false
};

submitButton.color = "yellow";    // Error: Type '"yellow"' is not assignable to type '"red" | "blue" | "green"'.
```


---


## Literal Union Type : Literal Type으로 만든 Union Type

- literal union type은 TypeScript의 강력한 type 정의 방식 중 하나로, **여러 literal type을 union(`|`) 연산자를 사용하여 결합**한 것입니다.
    - literal union type을 사용하면 이러한 literal type들을 하나의 type으로 결합하여, 변수가 **여러 개의 구체적인 값 중 하나를 가질 수 있도록** 할 수 있습니다.

- literal union type을 통해 변수나 속성이 가질 수 있는 값의 범위를 명시적으로 제한할 수 있습니다.
    - 변수가 특정 값들 중 하나만을 가질 수 있도록 제한할 때, 함수가 받을 수 있는 인자의 값을 제한하고자 할 때 literal union type을 사용합니다.
    - 또한 특정 값에 따라 다른 처리를 해야 하는 경우, type guard와 함께 사용하여 code의 안전성을 보장할 수 있습니다.


### Type Alias와 결합하기

- literal union type으로 객체의 속성을 제한합니다.

```typescript
type Status = "open" | "closed" | "pending";
type UserStatus = {
    name: string;
    status: Status;
};

let userStatus: UserStatus = {
    name: "Alice",
    status: "open"
};
```


### 함수의 인자와 결과 값을 제한하기

- union literal type을 사용하여, 함수가 특정한 문자열이나 숫자 값만을 인자로 받도록 제한할 수 있습니다.
    - 이는 API 호출 시 action type을 지정하거나, 설정 option 값을 제한하는 데 유용합니다.

```typescript
function configureSettings(setting: "light" | "dark" | "auto") {
    // 설정 적용 logic
}

configureSettings("light");
configureSettings("dark");
configureSettings("blue");    // Error: Argument of type '"blue"' is not assignable to parameter of type '"light" | "dark" | "auto"'.
```

```typescript
function getResponseStatus(status: "success" | "error"): 200 | 404 {
    if (status === "success") {
        return 200;
    } else {
        return 404;
    }
}
```


### 객체 속성의 값을 제한하기

- 객체의 속성 값으로 특정 literal 값만을 허용하도록 할 때, union literal type을 사용합니다.
    - 이는 객체가 특정 상태 중 하나만 가지도록 제한하는 데 활용될 수 있습니다.

```typescript
type User = {
    name: string;
    role: "admin" | "user" | "guest";
};

const newUser: User = {
    name: "Jane Doe",
    role: "admin",
};

const invalidUser: User = {
    name: "John Doe",
    role: "superuser",    // Error: Type '"superuser"' is not assignable to type '"admin" | "user" | "guest"'.
};
```


### Type Guard와 결합하기

- literal union type을 사용한 type guard를 통해, code block 내에서 변수의 type을 좁히는 것(type narrowing)이 가능해집니다.
    - 이는 함수 내에서 다양한 조건 처리를 할 때 TypeScript가 type을 정확하게 인식하도록 돕습니다.

```typescript
type Action = { type: "LOGIN" } | { type: "LOGOUT" } | { type: "REFRESH"; timeout: number };

function handleAction(action: Action) {
    if (action.type === "REFRESH") {
        // 'action'이 { type: "REFRESH"; timeout: number } type으로 추론됨
        console.log(`Refreshing with timeout: ${action.timeout}`);
    } else {
        // 'action'이 { type: "LOGIN" } | { type: "LOGOUT" } type으로 추론됨
        console.log(`Action type: ${action.type}`);
    }
}
```

```typescript
type Action = { type: "INCREMENT" } | { type: "DECREMENT"; amount: number };

function performAction(action: Action) {
    if (action.type === "INCREMENT") {
        // 'action'이 { type: "INCREMENT" } type으로 추론됨
    } else {
        // 'action'이 { type: "DECREMENT"; amount: number } type으로 추론됨
    }
}
```


---


## Generic Literal Union Type : 더 유연하게 값을 제한하기

- literal type과 generic을 결합하면 함수나 class가 처리할 수 있는 값의 범위를 좁히면서도 code의 재사용성을 높일 수 있습니다.

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

const obj = { a: 1, b: 2, c: 3 };
const a = getProperty(obj, "a");
const d = getProperty(obj, "d");    // Error: Argument of type '"d"' is not assignable to parameter of type '"a" | "b" | "c"'.
```


### Generic 예시 : 상태 관리

- 상태 관리 함수를 구현할 때, literal type과 generic을 함께 사용하여 특정 상태 값들만을 처리하도록 제한할 수 있습니다.
    - 이는 상태 관리 logic에서 오류를 방지하는 데 도움이 됩니다.

```typescript
type State = {
    status: "loading" | "success" | "error";
};

function updateState<T extends State, K extends keyof State>(state: T, key: K, value: T[K]) {
    state[key] = value;
}

const myState: State = { status: "loading" };

updateState(myState, "status", "success");
updateState(myState, "status", "failed");    // Error: Argument of type '"failed"' is not assignable to parameter of type '"loading" | "success" | "error"'.
```


### Generic 예시 : 설정 객체 Update

- 설정 객체를 update하는 함수에서, 특정 field에 할당될 수 있는 값의 종류를 제한하고자 할 때 literal type과 generic을 사용할 수 있습니다.

```typescript
type Config = {
    theme: "light" | "dark";
    layout: "grid" | "list";
};

function setConfigOption<T extends Config, K extends keyof Config>(config: T, option: K, value: T[K]) {
    config[option] = value;
}

const myConfig: Config = { theme: "light", layout: "grid" };

setConfigOption(myConfig, "theme", "dark");
setConfigOption(myConfig, "theme", "blue");    // Error: Argument of type '"blue"' is not assignable to parameter of type '"light" | "dark"'.
```


### Generic 예시 : Event Handler

- event 유형과 해당 event에 대한 handler 함수를 mapping할 때, literal type과 generic을 사용하여 event 유형을 제한할 수 있습니다.
    - 이를 통해 특정 event 유형에 대해서만 handler 함수를 등록할 수 있게 합니다.

```typescript
type EventHandlers = {
    onClick: () => void;
    onMouseEnter: () => void;
};

function addEventHandler<T extends keyof EventHandlers>(eventType: T, handler: EventHandlers[T]) {
    // event handler 등록 logic
}

addEventHandler("onClick", () => console.log("Clicked"));
addEventHandler("onScroll", () => console.log("Scrolled"));    // Error: Argument of type '"onScroll"' is not assignable to parameter of type 'keyof EventHandlers'.
```
