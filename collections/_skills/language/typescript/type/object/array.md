---
layout: skill
permalink: /39
title: TypeScript Array Type - 배열
description: TypeScript의 배열 Type은 Type이 같은 값들의 집합을 나타내며, 배열 내의 모든 요소가 동일한 type을 갖도록 하는 type checking 기능을 제공합니다.
date: 2024-02-29
---


## 배열 Type : Type이 같은 값들의 집합

- TypeScript의 배열 type은 강력한 type checking 기능을 제공하여, **배열 내의 모든 요소가 동일한 type**을 갖도록 합니다.

- 배열 type의 정의는 `type[]`과 `Array<type>` 두 가지 방식 중 상황에 맞는 방식을 선택하여 사용할 수 있습니다.


### `type[]`을 사용한 배열 type 정의

- 가장 간단하고 일반적인 방법으로, 배열이 담을 요소의 type 뒤에 대괄호(`[]`)를 붙여 배열 type을 정의합니다.

```typescript
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob", "Charlie"];
```

- `numbers` 배열은 `number` type의 요소만을 포함할 수 있으며, `names` 배열은 `string` type의 요소만을 포함할 수 있습니다.


### `Array<type>`을 사용한 배열 type 정의

- generic 배열 type `Array<type>`을 사용하여 배열 type을 정의할 수도 있습니다.
- generic 방식은 특히 type이 복잡하거나 다중 type을 다룰 때 유용할 수 있습니다.

```typescript
let scores: Array<number> = [85, 92, 88, 76];
let fruits: Array<string> = ["Apple", "Orange", "Banana"];
```


