---
layout: skill
title: TypeScript Optional Property - 선택적 속성
date: 2024-03-07
---




## Optional Property : 선택적인 속성

TypeScript에서 Optional Property는 객체의 특정 속성이 필수가 아님을 나타내는 방법입니다. 즉, 해당 속성을 가진 객체를 생성할 때 해당 속성을 생략할 수 있습니다. Optional Property는 속성 이름 뒤에 물음표(`?`)를 붙여 선언합니다.


## Optional Property의 사용

Optional Property는 다양한 상황에서 유용하게 사용됩니다. 예를 들어, 사용자의 정보를 나타내는 객체에서 일부 정보가 선택적일 경우, Optional Property를 사용하여 이를 표현할 수 있습니다.

### 예제: 사용자 정보 정의하기

다음은 `User` 인터페이스를 정의하는 예제입니다. 여기서 `email`과 `nickname`은 선택적 속성입니다.

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

위 예제에서 볼 수 있듯, Optional Property를 사용하면 객체를 생성할 때 해당 속성을 포함시키거나 생략할 수 있어, 코드의 유연성을 높일 수 있습니다.

## Optional Property와 `undefined`

Optional Property는 정의되지 않았을 때 `undefined` 값을 가집니다. 따라서, Optional Property를 사용할 때는 해당 속성이 `undefined`일 수 있다는 점을 고려하여 코드를 작성해야 합니다.

### 예제: Optional Property 접근하기

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

## 정리

TypeScript의 Optional Property는 객체 모델을 더 유연하게 만들어 줍니다. 이를 통해 선택적으로 속성을 포함할 수 있으며, 코드를 작성할 때 해당 속성이 없을 경우를 안전하게 처리할 수 있습니다. Optional Property를 사용함으로써, 타입의 안정성을 유지하면서도 다양한 상황에 대응할 수 있는 코드를 작성할 수 있습니다.

















TypeScript에서 Optional Property를 사용하는 것 외에도, 이와 관련하여 몇 가지 중요한 개념과 기술이 더 있습니다. 이들은 선택적 속성을 효과적으로 사용하고, 관련된 다른 기능들과 함께 코드의 안정성과 유연성을 높이는 데 도움을 줍니다.

## 기본값 할당

선택적 속성이 `undefined`일 경우에 기본값을 할당하는 방법은 코드의 안정성을 높이는 데 유용합니다. 이는 함수의 매개변수 또는 객체 구조 분해 할당에서 주로 사용됩니다.

### 예제: 기본값 할당하기

```typescript
function greet(name: string, greeting?: string): string {
  // greeting이 주어지지 않았을 경우 기본값으로 "Hello"를 사용
  const greetingMessage = greeting || "Hello";
  return `${greetingMessage}, ${name}!`;
}

console.log(greet("Alice")); // "Hello, Alice!"
console.log(greet("Bob", "Hi")); // "Hi, Bob!"
```

## 유니온 타입과 결합

Optional Property는 `undefined` 타입과 유니온 타입을 형성하여, 변수가 특정 타입 또는 `undefined`일 수 있음을 명시적으로 표현할 수 있습니다.

### 예제: 유니온 타입 사용하기

```typescript
interface Book {
  title: string;
  author?: string | null;
}

const book: Book = {
  title: "TypeScript Guide"
};

// author 속성이 string 타입이거나 null 또는 undefined일 수 있음
if (book.author !== undefined && book.author !== null) {
  console.log(book.author.toUpperCase());
} else {
  console.log("저자 정보가 없습니다.");
}
```

## 타입 가드와 타입 어설션

타입스크립트에서는 선택적 속성이 `undefined` 또는 실제 타입 중 어느 것인지를 체크하기 위해 타입 가드를 사용할 수 있습니다. 또한, 개발자가 해당 속성의 타입을 확신할 경우 타입 어설션을 사용하여 컴파일러에게 타입 정보를 명시적으로 알릴 수 있습니다.

### 예제: 타입 가드 사용하기

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

## 정리

TypeScript의 Optional Property는 코드의 유연성과 안전성을 동시에 높여주는 강력한 기능입니다. 이와 함께 기본값 할당, 유니온 타입, 타입 가드 및 타입 어설션과 같은 기술을 사용함으로써, 선택적 속성의 가능성을 최대한 활용하고 다양한 상황에서의 코드의 안전성을 보장할 수 있습니다. 이러한 기능들을 적절히 활용함으로써, TypeScript를 사용한 애플리케이션 개발의 효율성과 안정성을 크게 향상시킬 수 있습니다.















TypeScript에서 Optional Property를 더 깊게 이해하고 활용하기 위해 몇 가지 추가적인 주제와 팁을 고려할 수 있습니다. 이들은 고급 사용 사례, 최적의 타입 설계 방법, 그리고 코드 유지 관리를 위한 전략을 포함합니다.

## 고급 타입 조작과 선택적 속성

TypeScript의 고급 타입 기능을 사용하여 선택적 속성을 다루는 방법을 보다 세밀하게 조절할 수 있습니다.

### 조건부 타입을 사용한 선택적 속성 처리

조건부 타입(Conditional Types)을 사용하여, 특정 조건에 따라 타입의 속성을 선택적으로 만들 수 있습니다. 이는 제네릭 타입과 함께 사용될 때 특히 강력합니다.

### `Partial<T>` 유틸리티 타입

`Partial<T>` 유틸리티 타입을 사용하면, 주어진 타입 `T`의 모든 속성을 선택적으로 만들 수 있습니다. 이는 객체의 일부 속성만을 업데이트하는 함수를 작성할 때 유용합니다.

```typescript
function updateProfile(user: User, fieldsToUpdate: Partial<User>): User {
  return { ...user, ...fieldsToUpdate };
}

interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = { id: 1, name: "Jane Doe", email: "jane@example.com" };

const updatedUser = updateProfile(user, { email: "newemail@example.com" });
```

## 매핑된 타입(Mapped Types)을 통한 선택적 속성 생성

매핑된 타입을 사용하면 기존의 타입을 기반으로 새로운 타입을 생성할 수 있습니다. 이를 통해 선택적 속성, 읽기 전용 속성 등을 유연하게 조작할 수 있습니다.

```typescript
type Optional<T> = {
  [P in keyof T]?: T[P];
};

// User 타입의 모든 속성을 선택적으로 만드는 새로운 타입
type PartialUser = Optional<User>;
```

## 타입 가드와 선택적 속성

선택적 속성이 있는 객체를 다룰 때, 타입 가드를 사용하여 런타임에 속성의 존재 여부를 안전하게 확인할 수 있습니다. 이는 선택적 속성이 `undefined`일 수 있음을 고려하여 타입 안전성을 보장하는 방법입니다.

## 선택적 체이닝과 널 병합 연산자

옵셔널 체이닝(`?.`)과 널 병합 연산자(`??`)를 사용하여 선택적 속성에 접근하고 기본값을 제공하는 방법은 코드를 더욱 간결하고 안전하게 만듭니다.

```typescript
const email = user.email?.toLowerCase() ?? "default@example.com";
```

## 정리

TypeScript의 선택적 속성은 타입 안정성과 코드 유연성을 동시에 제공하는 강력한 기능입니다. 고급 타입 조작, 유틸리티 타입, 매핑된 타입, 타입 가드 등을 활용하면, 선택적 속성을 더 효과적으로 관리하고, 복잡한 애플리케이션의 요구 사항을 충족시키는 타입을 설계할 수 있습니다. 이러한 기술과 전략을 통해 TypeScript의 선택적 속성을 최대한 활용해 보세요.

