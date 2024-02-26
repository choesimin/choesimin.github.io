---
layout: post
title: TypeScript - Type Alias
date: 2024-02-26
---




- TypeScript에서 Type Alias는 기존에 존재하는 하나 이상의 type에 새로운 이름을 부여하는 기능입니다.
    - 복잡한 type 구조를 간결하게 표현하고, code의 가독성을 높일 수 있습니다.
- Type Alias는 `type` keyword를 사용하여 정의합니다.




## Type Alias의 주요 사용 사례

1. **기본 타입에 별칭 부여하기**: 간단한 예로, 문자열이나 숫자 같은 기본 타입에 더 구체적인 이름을 부여할 수 있습니다.

   ```typescript
   type UserID = number;
   type UserName = string;
   ```

2. **유니온 타입**: 두 개 이상의 타입을 하나로 결합한 타입을 정의할 때 사용합니다. 유니온 타입을 통해 변수가 여러 타입 중 하나를 가질 수 있음을 명시할 수 있습니다.

   ```typescript
   type StringOrNumber = string | number;
   ```

3. **튜플 타입**: 고정된 길이의 배열 타입을 정의할 때 사용하며, 각 요소의 타입을 정확히 지정할 수 있습니다.

   ```typescript
   type Point = [number, number];
   ```

4. **객체 타입**: 객체의 구조를 정의할 때 사용합니다. Interface와 유사하지만, Type Alias를 사용하면 객체 타입뿐만 아니라 다른 타입들과의 조합도 가능합니다.

   ```typescript
   type User = {
     id: UserID;
     name: UserName;
     age: number;
   };
   ```

5. **인터섹션 타입**: 두 개 이상의 타입을 모두 만족하는 새로운 타입을 생성할 때 사용합니다. 이를 통해 여러 타입의 특성을 합칠 수 있습니다.

   ```typescript
   type Circle = {
     radius: number;
   };
   
   type Colorful = {
     color: string;
   };
   
   type ColorfulCircle = Circle & Colorful;
   ```



- type alias는 원시값, union type, tuple 등도 type으로 지정할 수 있다.

```typescript
// 문자열 literal로 type 지정
type Str = 'Lee';

// union type으로 type 지정
type Union = string | null;

// 문자열 union type으로 type 지정
type Name = 'Lee' | 'Kim';

// 숫자 literal union type으로 type 지정
type Num = 1 | 2 | 3 | 4 | 5;

// 객체 literal union type으로 type 지정
type Obj = {a: 1} | {b: 2};

// 함수 union type으로 type 지정
type Func = (() => string) | (() => void);

// interface union type으로 type 지정
type Shape = Square | Rectangle | Circle;

// tuple로 type 지정
type Tuple = [string, boolean];
const t: Tuple = ['', ''];    // Error
```



## Type Alias의 특징

- **재사용성**: Type Alias를 통해 정의한 타입은 프로젝트 전반에 걸쳐 재사용할 수 있어, 타입 관리를 용이하게 합니다.
- **가독성 향상**: 복잡한 타입을 간결하고 의미 있는 이름으로 정의할 수 있어, 코드의 가독성이 향상됩니다.
- **확장성 제한**: Type Alias는 확장이 불가능하며, 상속이나 인터페이스처럼 기존 타입을 확장하여 새로운 타입을 만들 수는 없습니다. 대신, 인터섹션 타입을 사용하여 타입을 결합할 수는 있습니다.

Type Alias는 TypeScript의 강력한 타입 시스템을 활용하여, 개발자가 보다 명확하고 유지보수하기 쉬운 코드를 작성할 수 있도록 돕습니다.




---



## 비슷하지만 다른 Type Alias와 Interface

- type alias와 interface는 keyword를 제외하면 사용법이 동일합니다.

```typescript
interface Person {
    name: string,
    age?: number
}

type Person = {
    name: string,
    age?: number
}
```

```typescript
// 빈 객체를 'Person' type으로 지정
const person = {} as Person;
person.name = 'Lee';
person.age = 20;
person.address = 'Seoul';    // Error
```



- type alias는 새로운 type을 정의합니다.
- type으로 사용할 수 있다는 점에서 type alias는 interface와 비슷합니다.
- interface는 extends 또는 implements될 수 있지만 type alias는 extends 또는 implements될 수 없다.
    - 즉, 상속을 통해 확장이 필요하다면 type alias보다는 interface가 유리하다.
    - 하지만 interface로 표현할 수 없거나 union 또는 tuple을 사용해야한다면 type alias를 사용한는 편이 유리하다.


---




## Reference

- <https://poiemaweb.com/typescript-alias>

