---
layout: skill
title: TypeScript - Type Casting
date: 2024-02-27
---




## Type Casting : 기존의 Type을 다른 Type으로 바꾸기

- 기존의 type에서 다른 type으로 변경하려면, `as` keyword를 사용하거나 `<>` 연산자를 사용하여 type casting합니다.

```typescript
const $input = document.querySelector('input["type="text"]');    // => $input: Element | null
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
- <https://inpa.tistory.com/entry/TS-📘-타입스크립트-타입-선언-종류-💯-총정리>
