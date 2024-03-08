---
layout: skill
title: TypeScript - Optional Property (선택적 속성)
date: 2024-03-08
---




## Optional Property : 필수가 아닌 속성

- TypeScript에서 optional property는 **객체의 특정 속성이 필수가 아님**을 나타내는 방법입니다.
    - 선택적 속성을 가진 객체를 생성할 때, 해당 속성을 생략할 수 있습니다.

- optional property를 사용함으로써, type의 안정성을 유지하면서도 다양한 상황에 대응할 수 있는 유연한 code를 작성할 수 있습니다.

- optional property는 속성 이름 뒤에 **물음표(`?`)를 붙여 선언**합니다.

```typescript
interface User {
    id: number;
    name: string;
    email?: string;
    nickname?: string;
}

// email과 nickname 없이 User 객체 생성 가능
const user1: User = {
    id: 1,
    name: "John Doe"
};

// email과 nickname을 포함하여 User 객체 생성 가능
const user2: User = {
    id: 2,
    name: "Jane Doe",
    email: "jane@example.com",
    nickname: "Jane"
};
```

- `User` interface의 `email`과 `nickname`은 선택적 속성입니다.


### Optional Property의 기본값 : `undefined`

- optional property는 **정의되지 않았을 때 `undefined` 값**을 가집니다.
- 따라서, optional property를 사용할 때는 해당 속성이 `undefined`일 수 있다는 점을 고려하여 code를 작성해야 합니다.
    - `undefined` 값에 대한 **type guard**가 필요합니다.

```typescript
interface User {
    id: number;
    name: string;
    email?: string;
}

const user: User = {
    id: 1,
    name: "John Doe"
};

// optional property 접근
console.log(user.email);    // undefined

// Optional Property가 존재하는지 확인 후 사용 (type guard)
if (user.email) {
    console.log(user.email.toUpperCase());
} else {
    console.log("email 주소가 없습니다.");
}
```
