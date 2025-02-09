---
layout: skill
title: TypeScript - Type Casting (Type 변환하기)
date: 2024-02-28
---




## Type Casting : Type 변환하기

- type casting은 **변수의 type을 명시적으로 변환**하는 것입니다.
    - type casting은 type assertion(단언)과 비슷합니다.

- type casting을 사용하여 compiler에게 변수의 type을 알려줄 수 있습니다.
    - TypeScript는 정적 type을 가지고 있어 compile time에 type 검사를 수행하지만, 때로는 **개발자가 특정 변수의 type에 대해 더 잘 알고 있을 때**가 있습니다.

- type casting은 **type의 안전성을 개발자가 관리**할 수 있게 하지만, **남용은 code 안정성을 해칠 수 있으므로 신중하게 사용**해야 합니다.
    - type casting은 compile time에만 영향을 미치며, runtime에는 아무런 영향을 미치지 않습니다.
    - 따라서, 실제 runtime type이 casting한 type과 다를 경우 예상치 못한 오류가 발생할 수 있습니다.
    - type casting을 사용할 때는 주의해야 하며, type guard를 사용하여 runtime에 type을 확인하는 것이 좋습니다.


### Type Casting 방법 1 : `<>` Operator 사용

- `<>` 연산자는 JavaScript의 JSX와 함께 사용할 때 충돌을 일으킬 수 있으므로, JSX를 사용하는 환경에서는 권장되지 않습니다.

```typescript
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```

- `<string>someValue`는 `someValue`를 `string` type으로 casting하고 있음을 나타냅니다.
- `string` type으로 type casting을 했기 때문에, `.length` property에 안전하게 접근할 수 있습니다.


### Type Casting 방법 2 : `as` Keyword 사용

- `as` keyword는 JSX와의 충돌 없이 사용할 수 있으므로, JSX를 사용하는 TypeScript 환경에서는 이 방법이 권장됩니다.

```typescript
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

- `someValue as string`은 `someValue`를 `string` type으로 casting하고 있음을 나타냅니다.




---




## Type Casting 활용 예제 : `HTMLInputElement`

```typescript
const $input = document.querySelector('input["type="text"]');
const val = $input.value;    // TS2339: Property 'value' does not exist on type 'Element'.
```

- `document.querySelector` method는 `Element | null` type의 값을 반환합니다.
- `$input`은 `Element | null` type이며, `$input.value`를 실행하면 compile 오류가 발생합니다.
    - `Element` 또는 `null` type에는 `value`라는 property가 존재하지 않기 때문입니다.
- **`value` property는 `HTMLInputElement` type(`Element` type의 하위 type)에만 존재하므로, type casting이 필요합니다.**

```typescript
// 'as' keyword 사용
const $input = document.querySelector('input["type="text"]') as HTMLInputElement;
const val = $input.value;
```

```typescript
// '<>' 연산자 사용
const $input = <HTMLInputElement>document.querySelector('input["type="text"]');
const val = $input.value;
```




---




## Reference

- <https://poiemaweb.com/typescript-typing>
