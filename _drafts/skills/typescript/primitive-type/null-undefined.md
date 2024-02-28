---
layout: skill
title: TypeScript Null/Undefined Type
date: 2024-02-28
---



### TypeScript의 Null과 Undefined 타입

TypeScript에서 `null`과 `undefined`는 각각 자신만의 타입을 가지고 있습니다. JavaScript에서 `null`은 "값이 없음"을 명시적으로 표현하는 반면, `undefined`는 "값이 정의되지 않음"을 나타냅니다. TypeScript는 이러한 구분을 유지하면서, 두 타입을 더욱 엄격하게 다룰 수 있는 기능을 제공합니다.

### Null과 Undefined의 사용

변수에 `null` 또는 `undefined`를 할당할 수 있으며, 이는 해당 변수가 값이 없거나 정의되지 않았음을 의미합니다.

```typescript
let myVar: null = null;
let myUndefinedVar: undefined = undefined;
```

### Strict Null Checks

TypeScript의 `--strictNullChecks` 옵션은 `null`과 `undefined`를 다룰 때 타입 안전성을 강화합니다. 이 옵션이 활성화되어 있으면, `null`과 `undefined`는 오직 `any`와 각각의 타입에만 할당할 수 있습니다. 이는 실수로 `null` 또는 `undefined` 값을 할당하여 발생할 수 있는 오류를 방지하는 데 도움이 됩니다.

```typescript
let name: string = null; // 오류: --strictNullChecks가 활성화되어 있을 때, 'null'을 'string'에 할당할 수 없습니다.
```

### Optional Chaining과 Nullish Coalescing

TypeScript 3.7에서는 선택적 체이닝(Optional Chaining)과 널 병합 연산자(Nullish Coalescing)가 도입되었습니다. 이 기능들은 `null`과 `undefined`를 더욱 효율적으로 다룰 수 있게 해줍니다.

#### Optional Chaining

객체의 속성에 접근할 때, 해당 객체 또는 속성이 `null` 또는 `undefined`일 가능성이 있을 경우, 선택적 체이닝을 사용하여 오류를 방지할 수 있습니다.

```typescript
type User = {
    info?: {
        email?: string;
    };
};

const user: User = {};

// 선택적 체이닝을 사용하지 않을 경우
const userEmail = user.info ? user.info.email : undefined;

// 선택적 체이닝을 사용하는 경우
const userEmailWithOptionalChaining = user.info?.email;
```

#### Nullish Coalescing

`null`이나 `undefined`일 경우에 기본값을 제공하고 싶을 때, 널 병합 연산자(`??`)를 사용할 수 있습니다. 이는 `||` 연산자와 유사하지만, `0`이나 `''`(빈 문자열)과 같이 falsy한 값을 유지하면서 `null` 또는 `undefined`만을 체크합니다.

```typescript
const input = ''; // 빈 문자열

// || 연산자를 사용할 경우, 빈 문자열은 falsy한 값으로 간주되어 기본값("default")이 사용됩니다.
const output = input || 'default';

// ?? 연산자를 사용할 경우, 오직 null 또는 undefined일 때만 기본값("default")이 사용됩니다.
const outputWithNullish = input ?? 'default';
```

### 결론

`null`과 `undefined`는 TypeScript에서 중요한 역할을 합니다. `--strictNullChecks` 옵션을 사용하여 타입 안전성을 강화하고, 선택적 체이닝과 널 병합 연산자를 활용하여 코드의 안정성과 가독성을 높일 수 있습니다. 이러한 기능들은 TypeScript가 제공하는 강력한 타입 시스템의 일부로, 개발자가 더욱 안전하고 명확한 코드를 작성할 수 있게 돕습니다.



