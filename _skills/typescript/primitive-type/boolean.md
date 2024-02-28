---
layout: skill
title: TypeScript Boolean Type
date: 2024-02-28
---




## Boolean Type : True/False

- `boolean` type은 참(`true`) 또는 거짓(`false`)의 논리적 값으로 표현됩니다.
- TypeScript의 `boolean` type은 JavaScript의 `boolean` type과 동일하게 작동합니다.

- `boolean` type을 효과적으로 사용하면 program의 logic을 명확하게 표현하고 제어할 수 있습니다.
    - 조건문, 제어 흐름, 논리 연산 등 program의 흐름을 결정하는 데 주로 사용됩니다.

```typescript
let isCompleted: boolean = false;
let isVisible: boolean = true;
```


### 조건문에서의 Boolean 사용

- `boolean` type은 조건문에서 특히 유용합니다.
- program의 흐름을 제어하는 데 사용되는 조건문에서는 `boolean` type의 표현식이나 변수가 자주 사용됩니다.

```typescript
if (isCompleted) {
    console.log("Task is completed.");
} else {
    console.log("Task is not completed.");
}
```


### 논리 연산자와 함께 사용

- `boolean` type은 논리 연산자(`&&`, `||`, `!`)와 함께 사용될 때 더욱 강력해집니다.
- 이를 통해 복잡한 조건을 표현하고 program의 흐름을 더 세밀하게 제어할 수 있습니다.

```typescript
let isReady: boolean = true;
let isAllowed: boolean = false;

if (isReady && isAllowed) {
    console.log("You can proceed.");
} else {
    console.log("You cannot proceed.");
}

if (!isAllowed) {
    console.log("Access is denied.");
}
```




---




## Boolean을 사용한 복잡한 예제 : 사용자 검증

```typescript
interface User {
    age: number;
    hasPermission: boolean;
    isAccountActive: boolean;
}

function canUserPerformAction(user: User, actionRequiredAge: number, needsPermission: boolean): boolean {
    // 계정 활성 상태 확인
    if (!user.isAccountActive) {
        console.log("User's account is not active.");
        return false;
    }

    // 필요한 나이보다 사용자의 나이가 적은지 확인
    if (user.age < actionRequiredAge) {
        console.log(`User needs to be at least ${actionRequiredAge} years old.`);
        return false;
    }

    // 특정 작업을 수행하기 위해 특별한 권한이 필요한지 확인
    if (needsPermission && !user.hasPermission) {
        console.log("User does not have the required permission.");
        return false;
    }

    // 모든 조건을 통과했다면, 사용자는 작업을 수행할 수 있음
    return true;
}

const user: User = {
    age: 20,
    hasPermission: false,
    isAccountActive: true
};

const actionRequiredAge = 18;
const needsPermission = true;

// 사용자가 특정 작업을 수행할 수 있는지 여부를 결정함
const canPerform = canUserPerformAction(user, actionRequiredAge, needsPermission);

console.log(`Can user perform action? ${canPerform}`);
```
