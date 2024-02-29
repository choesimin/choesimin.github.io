---
layout: skill
title: TypeScript Primitive Type - Undefined and Null (정의되지 않았거나 없는 값)
date: 2024-02-28
---




## Undefined Type & Null Type

- `undefined`는 '값이 정의되지 않음'을, `null`은 '값이 없음'을 명시적으로 표현합니다.

| Undefined | Null |
| --- | --- |
| 초기화가 되지 않음 | 초기화가 된 후, 의도적으로 `null` 값을 할당함 |

- 변수에 `null` 또는 `undefined`를 할당할 수 있으며, 이는 해당 변수가 값이 없거나 정의되지 않았음을 의미합니다.

```typescript
let myVar: null = null;
let myUndefinedVar: undefined = undefined;
```

- TypeScript에는 JavaScript에는 없는 `undefined`와 `null` type에 대한 추가적인 기능들이 있으며, 이는 TypeScript가 제공하는 강력한 type system의 일부입니다.
    - e.g., `--strictNullChecks` option을 사용하여 type 안전성을 강화하고, optional chaining과 nullish coalescing를 활용하여 code의 안정성과 가독성을 높일 수 있습니다.




---




## 엄격한(Strict) Null Check : `--strictNullChecks` Compile Option

- TypeScript에서 `--strictNullChecks` option은 type 안전성을 강화하기 위한 중요한 compiler 설정 중 하나입니다.
    - TypeScript project 설정에서 활성화할 수 있습니다.

- `--strictNullChecks` option이 활성화되면, `null`과 `undefined`를 모든 type에서 기본적으로 허용하지 않게 되고, 오직 `any` type과 각각의 type(`null`, `undefined`)에만 할당할 수 있습니다.
    - 변수나 함수의 반환 값 등이 `null` 또는 `undefined`일 수 있다면, 이를 명시적으로 type에 추가해야 합니다.
    - 이런 엄격한 check는 code 내에서 잠재적인 null 참조 오류를 사전에 방지하고, 더 안전하고 예측 가능한 code를 작성할 수 있도록 도와줍니다.

```typescript
let name: string = null;    // 오류: --strictNullChecks가 활성화되어 있을 때, 'null'을 'string'에 할당할 수 없습니다.
```


### `--strictNullChecks` 활성화의 이점

1. Type 안전성 향상 : 변수나 반환 값에 예상치 못한 `null` 또는 `undefined`가 할당되는 것을 방지하여, runtime 오류의 가능성을 줄일 수 있습니다.
2. 명시적 Type 선언 : 개발자는 `null`이나 `undefined`를 처리해야 하는 경우, 이를 명시적으로 type에 포함시켜 code의 의도를 더 명확하게 전달할 수 있습니다.
3. Bug 조기 발견 : compile 시점에 `null` 또는 `undefined`와 관련된 잠재적 오류를 포착하여, runtime에 발생할 수 있는 bug를 사전에 제거할 수 있습니다.


### `--strictNullChecks` 사용 방법

- `--strictNullChecks` option을 활성화하면, 모든 type은 기본적으로 `null`과 `undefined`를 포함하지 않습니다.
- 따라서, 변수가 `null` 또는 `undefined`를 받을 수 있게 하려면, union type을 사용하여 명시적으로 선언해야 합니다.

```typescript
let name: string | null = null;    // 정상 작동
let age: number | undefined;    // 'undefined'를 명시적으로 포함
```


### `--strictNullChecks` 예제

- 함수의 매개 변수나 반환 type도 `--strictNullChecks` option의 영향을 받습니다.
- 함수가 `null`이나 `undefined`를 반환할 수 있다면, 이를 type에 포함시켜야 합니다.

```typescript
function getCustomer(id: number): Customer | null {
    // 고객 정보를 조회하고 결과에 따라 Customer 객체 또는 null 반환
    if (foundCustomer) {
        return foundCustomer;
    } else {
        return null;    // 명시적으로 null 반환을 허용했기 때문에 null 반환 가능
    }
}
```




---




## TypeScript 3.7 이상에서 지원하는 고급 기능 : Optional Chaining, Nullish Coalescing

- TypeScript 3.7에서는 'optional chaining(선택적 chaining)'과 'nullish coalescing(null 병합 연산자)'가 도입되었습니다.
- 이 기능들은 `null`과 `undefined`를 다루는 방식을 개선하여 code의 가독성을 높이고, error를 줄이는 데 기여합니다.


### Optional Chaining (`?.`) : 객체의 속성에 안전하게 접근하기

- optional chaining(`?.`)은 객체의 속성에 접근할 때, 그 객체 또는 속성이 `null` 또는 `undefined`일 경우 오류가 발생하는 것을 방지하는 안전한 방법을 제공합니다.
- 이는 객체의 속성을 참조할 때 중첩된 객체가 있고, 그 중 하나라도 `null` 또는 `undefined`일 가능성이 있을 때 매우 유용합니다.

```typescript
obj?.prop    // 객체의 속성 접근
obj?.[expr]    // 객체의 계산된 속성 접근
arr?.[index]    // 배열 index 접근
func?.(args)    // 함수 호출
```

#### Optional Chaining 예제

- `user.info?.email`은 `user.info`가 `null` 또는 `undefined`이면 평가를 중지하고 `undefined`를 반환합니다.
    - 그렇지 않으면 `email` 속성에 계속 접근합니다.

```typescript
type User = {
    info?: {
        email?: string;
    };
};

const user: User = {};

// optional chaining을 사용하지 않는 경우
const userEmail = user.info ? user.info.email : undefined;

// optional chaining을 사용하는 경우
const userEmailWithOptionalChaining = user.info?.email;
```


### Nullish Coalescing (`??`) : 

- `??` 연산자(nullish coalescing)는 왼쪽 피연산자가 `null` 또는 `undefined`일 경우에만 오른쪽 피연산자의 값을 반환합니다.
    - 이는 논리 OR 연산자(`||`)와 유사하지만, `||` 연산자는 `0`, `NaN`, 빈 문자열(`''`)을 포함한 모든 falsy 값들을 검사한다는 점이 다릅니다.
    - 'falsy 값'은 조건문이나 논리 연산에서 `false`로 평가되는 `false`, `0`, `-0`, `0n`, 빈 문자열(`""`, `''`, ` `` `), `null`, `undefined`, `NaN` 등의 값들을 의미합니다.

- 따라서 `??` 연산자(nullish coalescing)는 `null`이나 `undefined`인 경우만 검사하여 값을 정하고 싶을 때 사용합니다.

```typescript
let result = expr1 ?? expr2;
```

- `expr1`이 `null` 또는 `undefined`가 아니면 `expr1`의 결과가 반환되고, 그렇지 않으면 `expr2`의 결과가 반환됩니다.


#### Nullish Coalescing 예제

- `??` 연산자는 `input` 값이 빈 문자열인 경우에도 `input`의 값을 유지합니다.
    - `input`이 `null`이나 `undefined`가 아니기 때문입니다.
- 그러나 `||` 연산자는 `input`이 falsy한 값(`0`, `NaN`, `''` 등)일 경우, 오른쪽 피연산자(`'default'`)를 반환합니다.

```typescript
const input = '';    // 빈 문자열

// || 연산자를 사용할 경우, 빈 문자열은 falsy한 값으로 간주되어 기본 값("default")이 사용됩니다.
const output = input || 'default';    // 'default' 

// ?? 연산자를 사용할 경우, 오직 null 또는 undefined일 때만 기본 값("default")이 사용됩니다.
const outputWithNullish = input ?? 'default';    // ''
```





