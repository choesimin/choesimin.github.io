---
layout: skill
title: TypeScript - Optional Parameter (선택적 매개 변수)
date: 2024-03-09
---




## Optional Parameter : 필수가 아닌 매개 변수

- optional parameter(선택적 매개 변수)는 함수에 전달할 수도 있고 **생략할 수도 있는 매개 변수**입니다.
    - 더 유연한 함수 호출(overloading)이 가능하며, 매개 변수가 없는 경우는 함수 내부에서 따로 처리합니다.

- **매개 변수 이름 뒤에 `?` 기호를 추가**하여 optional parameter를 정의합니다.
    - optional parameter로 정의하면 해당 매개 변수를 전달하지 않아도 함수를 호출할 수 있습니다.

```typescript
function functionName(param: type, optionalParam?: type): returnType {
    // 함수 본문
}
```

- optional parameter 뒤에는 필수 매개 변수(일반 매개 변수)가 올 수 없습니다.
    - optional parameter는 **항상 필수 매개 변수 뒤에 위치**해야 합니다.

```typescript
function greet(name: string, age?: number): string {
    if (age === undefined) {
        return `Hello, ${name}!`;
    } else {
        return `Hello, ${name}! You are ${age} years old.`;
    }
}

console.log(greet("Alice"));    // Hello, Alice!
console.log(greet("Bob", 30));    // Hello, Bob! You are 30 years old.
```

- `age` 매개 변수는 선택적이므로, `greet` 함수는 `age` 매개 변수 없이 이름(`name`)만으로 호출할 수 있습니다.
- 함수 내부에서는 `age` 매개 변수가 `undefined`인지 확인하여, 매개 변수가 전달되지 않은 경우에 대해 다르게 처리할 수 있습니다.


### Optioanl Parameter에 값을 넣지 않았을 때 : `undefined`

- optional parameter에는 **기본적으로 `undefined` 값이 할당**됩니다.
    - optional parameter에 값을 할당하지 않고 함수를 호출하면, TypeScript는 해당 매개 변수의 값을 `undefined`로 처리합니다.
        - 그러나 매개 변수에 기본 값(default parameter)을 지정하는 경우엔, 매개 변수를 생략했을 때 `undefined` 대신 기본 값이 사용됩니다.

- optional parameter를 사용할 때는 항상 해당 매개 변수가 `undefined`일 가능성을 염두에 두고, 이에 대한 처리 logic을 구현해야 합니다.
    - optional parameter의 **`undefined` 값에 대한 type guard**는 함수의 안정성을 보장하고, 예상치 못한 오류를 방지하는 데 필수적입니다.

```typescript
function greet(name: string, greeting?: string) {
    if (greeting === undefined) {
        greeting = "Hello";    // 기본 값 설정
    }
    return `${greeting}, ${name}!`;
}

console.log(greet("Alice"));    // Hello, Alice!
console.log(greet("Bob", "Hi"));    // Hi, Bob!
```

- `greet` 함수는 두 번째 매개 변수인 `greeting`을 선택적으로 받습니다.
- `greeting` 매개 변수에 값이 제공되지 않은 경우, 함수 내부에서 이를 `undefined`로 간주하고 기본 값을 `"Hello"`로 설정합니다.
- `undefined`에 대한 typee guard를 통해 optional property를 생략했을 때도 함수가 예상대로 동작하도록 할 수 있습니다.




---




## Default Parameter : 더 안전한 Optional Parameter

- parameter에 기본 값을 설정하면, 함수 호출 시 **매개 변수를 생략했을 때 기본 값이 사용됩니다**.
    - **기본 값을 가진 매개 변수는 자동으로 optional parameter가 되기 때문에, 별도로 `?` 기호를 추가할 필요가 없습니다.**

- 기본 값이 없는 optional parameter와 마찬가지로, 기본 값을 가진 매개 변수는 **함수 매개 변수 목록의 끝에 위치**해야 합니다.

- **매개 변수 뒤에 `=` 연산자와 기본 값으로 지정할 값을 작성**하여 parameter에 기본 값을 설정합니다.

```typescript
function functionName(param: type = defaultValue, ...): returnType {
    // 함수 본문
}
```

```typescript
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

console.log(greet("Alice"));    //  Hello, Alice!
console.log(greet("Bob", "Hi"));    // Hi, Bob!
```

- `greeting` 매개 변수는 선택적으로 처리되며, 기본 값으로 `"Hello"`가 지정됩니다.
- 함수를 호출할 때 `greeting` 매개 변수를 생략하면, 기본 값 `"Hello"`가 사용됩니다.
