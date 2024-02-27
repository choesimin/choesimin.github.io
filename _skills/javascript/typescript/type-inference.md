---
layout: skill
title: TypeScript - Type 추론
date: 2024-02-27
---




## Type Inference

- 만약 **type 선언을 생략하면, 값이 할당되는 과정에서 동적으로 type이 결정**되며, 이를 **type 추론(type inference)**이라 합니다.

```typescript
let foo = 123;    // foo는 number type
foo = 'hi';    // error: Type '"hi"' is not assignable to type 'number'.
```

- 변수 foo에 type을 선언하지 않았으나, type 추론에 의해 변수의 type이 결정됩니다.
- 동적 type 언어는 type 추론에 의해 변수의 type이 결정된 후에도 같은 변수에 여러 type의 값을 교차하여 할당할 수 있습니다.
- 하지만 정적 type 언어는 type이 결정된 후에는 type을 변경할 수 없습니다.
- TypeScript는 정적 type 언어이므로, type 추론으로 type이 결정된 이후에 다른 type의 값을 할당하면 오류가 발생합니다.


## Type 추론이 불가능한 경우 : `any`

- type 선언을 생략하고 값도 할당하지 않아서 type을 추론할 수 없으면, 자동으로 `any` type이 됩니다.

```typescript
let foo;    // let foo: any

foo = 'Hello';
console.log(typeof foo);    // string

foo = true;
console.log(typeof foo);    // boolean
```

- `any` type의 변수는 JavaScript의 `var` keyword로 선언된 변수처럼, 어떤 type의 값도 재할당이 가능합니다.
- 그러나 `any` type은 TypeScript를 사용하는 장점을 없애기 때문에, 사용하지 않는 편이 좋습니다.




---




## Reference

- <https://poiemaweb.com/typescript-typing>
