---
layout: skill
title: TypeScript Conditional Type - 미리 정의된 조건부 타입
date: 2024-03-03
---




## 미리 정의된 조건부 타입 (Predefined conditional types)



TypeScript는 개발자의 편의를 위해 여러 "미리 정의된 조건부 타입(Predefined Conditional Types)"을 제공합니다. 이들은 자주 사용되는 타입 변환과 타입 조작을 쉽게 수행할 수 있도록 돕는 유틸리티 타입들입니다. 이 타입들은 타입스크립트의 표준 라이브러리에 포함되어 있으며, 복잡한 타입 작업을 보다 쉽게 처리할 수 있도록 설계되었습니다.





유틸리티 타입(Utility Types)과 미리 정의된 조건부 타입(Predefined Conditional Types)은 관련이 있지만, 정확히 같은 것은 아닙니다. 유틸리티 타입은 TypeScript에서 제공하는 일련의 제네릭 타입 헬퍼(helper)로, 개발자가 일반적인 타입 변환을 쉽게 수행할 수 있도록 설계되었습니다. 이 유틸리티 타입들 중 일부는 조건부 타입을 사용하여 구현됩니다.

### 유틸리티 타입(Utility Types)

유틸리티 타입은 TypeScript 코드 내에서 자주 발생하는 타입 조작을 간소화하기 위해 미리 정의된 타입 헬퍼의 집합입니다. 예를 들어 `Partial<T>`, `Readonly<T>`, `Record<K, T>`, `Pick<T, K>`, `Exclude<T, U>`, `Extract<T, U>`, `NonNullable<T>`, `ReturnType<T>` 등이 있습니다. 이들은 타입을 변환하고 조작하는데 사용됩니다.

### 미리 정의된 조건부 타입

미리 정의된 조건부 타입은 유틸리티 타입 내에서 사용되는 조건부 타입의 일부 예시입니다. 조건부 타입(`T extends U ? X : Y`)은 주어진 타입이 다른 타입에 할당 가능한지를 기반으로 조건적인 타입 변환을 수행합니다. 조건부 타입은 유틸리티 타입을 정의하는 데 사용될 수 있으며, 이를 통해 보다 복잡한 타입 로직을 구현할 수 있습니다.

### 관계

- **유틸리티 타입은** 타입스크립트에서 제공하는 타입 변환을 위한 빌트인(built-in) 헬퍼의 집합입니다. 이들 중 많은 것이 조건부 타입을 사용하여 구현됩니다.
- **조건부 타입은** 유틸리티 타입을 포함하여 다양한 타입스크립트 타입에서 사용될 수 있는, 보다 근본적인 언어 기능입니다.

즉, 유틸리티 타입은 개발자에게 제공되는 고급 타입 조작 도구의 집합이며, 이 도구들 중 일부는 내부적으로 조건부 타입을 사용하여 구현됩니다. 따라서 미리 정의된 조건부 타입은 유틸리티 타입의 구현에 사용될 수 있는 하나의 방법론이라고 볼 수 있습니다.









### `Partial<T>`

모든 프로퍼티를 선택적으로 만들어 주는 유틸리티 타입입니다. 이를 통해 주어진 타입의 모든 프로퍼티를 포함하는 새로운 타입을 생성할 수 있으며, 각 프로퍼티는 선택적입니다.

```typescript
interface Todo {
  title: string;
  description: string;
}

type PartialTodo = Partial<Todo>;
// 결과: { title?: string; description?: string; }
```

### `Required<T>`

`Partial<T>`의 반대로, 모든 프로퍼티를 필수로 만들어 주는 유틸리티 타입입니다.

```typescript
interface Todo {
  title?: string;
  description?: string;
}

type RequiredTodo = Required<Todo>;
// 결과: { title: string; description: string; }
```

### `Readonly<T>`

주어진 타입의 모든 프로퍼티를 읽기 전용으로 만들어 주는 유틸리티 타입입니다. 이를 통해 생성된 타입의 인스턴스는 생성 후 수정할 수 없습니다.

```typescript
interface Todo {
  title: string;
}

type ReadonlyTodo = Readonly<Todo>;
// 결과: { readonly title: string; }
```

### `Record<K, T>`

주어진 키(`K`) 타입과 값(`T`) 타입으로 객체 타입을 생성하는 유틸리티 타입입니다. 이는 맵 타입을 모델링할 때 유용합니다.

```typescript
type PageInfo = {
  title: string;
};

type Page = "home" | "about" | "contact";

const x: Record<Page, PageInfo> = {
  home: { title: "Home" },
  about: { title: "About" },
  contact: { title: "Contact" },
};
```

### `Pick<T, K>`

타입 `T`에서 프로퍼티 `K`만을 선택하여 새로운 타입을 생성하는 유틸리티 타입입니다.

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;
// 결과: { title: string; completed: boolean; }
```

### `Exclude<T, U>`

타입 `T`에서 `U`에 할당 가능한 모든 속성을 제거하여 새로운 타입을 생성하는 유틸리티 타입입니다.

```typescript
type T0 = Exclude<"a" | "b" | "c", "a">;
// 결과: "b" | "c"
```

### `Extract<T, U>`

타입 `T`에서 `U`에 할당 가능한 모든 속성만을 추출하여 새로운 타입을 생성하는 유틸리티 타입입니다.

```typescript
type T0 = Extract<"a" | "b" | "c", "a" | "f">;
// 결과: "a"
```

### `NonNullable<T>`

타입 `T`에서 `null`과 `undefined`를 제외한 버전을 생성하는 유틸리티 타입입니다.

```typescript
type T0 = NonNullable<string | number | undefined>;
// 결과: string | number
```

이러한 미리 정의된 조건부 타입들은 타입스크립트에서 타입 안전성을 높이고

, 타입 관련 코드를 간결하게 작성하는 데 큰 도움을 줍니다.