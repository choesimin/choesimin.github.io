---
layout: skill
title: TypeScript - Optional Property (선택적 속성)
date: 2024-03-07
---




## Optional Property : 필수가 아닌 속성

TypeScript에서 Optional Property는 객체의 특정 속성이 필수가 아님을 나타내는 방법입니다. 즉, 해당 속성을 가진 객체를 생성할 때 해당 속성을 생략할 수 있습니다. Optional Property는 속성 이름 뒤에 물음표(`?`)를 붙여 선언합니다.

TypeScript의 Optional Property는 객체 모델을 더 유연하게 만들어 줍니다. 이를 통해 선택적으로 속성을 포함할 수 있으며, 코드를 작성할 때 해당 속성이 없을 경우를 안전하게 처리할 수 있습니다. Optional Property를 사용함으로써, 타입의 안정성을 유지하면서도 다양한 상황에 대응할 수 있는 코드를 작성할 수 있습니다.

TypeScript의 Optional Property는 코드의 유연성과 안전성을 동시에 높여주는 강력한 기능입니다. 이와 함께 기본값 할당, 유니온 타입, 타입 가드 및 타입 어설션과 같은 기술을 사용함으로써, 선택적 속성의 가능성을 최대한 활용하고 다양한 상황에서의 코드의 안전성을 보장할 수 있습니다. 이러한 기능들을 적절히 활용함으로써, TypeScript를 사용한 애플리케이션 개발의 효율성과 안정성을 크게 향상시킬 수 있습니다.


```typescript
interface User {
  id: number;
  name: string;
  email?: string;
  nickname?: string;
}

// `email`과 `nickname` 없이 `User` 객체 생성 가능
const user1: User = {
  id: 1,
  name: "John Doe"
};

// `email`과 `nickname`을 포함하여 `User` 객체 생성 가능
const user2: User = {
  id: 2,
  name: "Jane Doe",
  email: "jane@example.com",
  nickname: "Jane"
};
```

- `User` 인터페이스의 `email`과 `nickname`은 선택적 속성입니다.



### Optional Property의 기본값 : `undefined`

Optional Property는 정의되지 않았을 때 `undefined` 값을 가집니다. 따라서, Optional Property를 사용할 때는 해당 속성이 `undefined`일 수 있다는 점을 고려하여 코드를 작성해야 합니다.

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

// Optional Property 접근
console.log(user.email); // undefined

// Optional Property가 존재하는지 확인 후 사용
if (user.email) {
  console.log(user.email.toUpperCase()); // 이메일 주소를 대문자로 출력
} else {
  console.log("이메일 주소가 없습니다.");
}
```


#### `undefined`에 대한 Type Guard


타입스크립트에서는 선택적 속성이 `undefined` 또는 실제 타입 중 어느 것인지를 체크하기 위해 타입 가드를 사용할 수 있습니다. 또한, 개발자가 해당 속성의 타입을 확신할 경우 타입 어설션을 사용하여 컴파일러에게 타입 정보를 명시적으로 알릴 수 있습니다.


```typescript
interface User {
  id: number;
  name: string;
  email?: string;
}

function getEmail(user: User): string {
  // 타입 가드를 사용하여 email 속성이 있는지 확인
  if (user.email !== undefined) {
    return user.email;
  } else {
    return "이메일 정보가 없습니다.";
  }
}

const user: User = { id: 1, name: "John Doe" };
console.log(getEmail(user));
```




