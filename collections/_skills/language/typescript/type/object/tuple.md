---
layout: skill
permalink: /65
title: TypeScript Tuple Type - 고정 배열
description: TypeScript의 Tuple Type은 고정된 개수의 요소와 각 요소의 type이 정해진 배열 type으로, 서로 다른 type의 data를 grouping하여 관리할 수 있습니다.
date: 2024-02-29
---


## Tuple Type : 갯수와 Type이 정해진 배열 Type

- TypeScript에서 tuple은 고정된 개수의 요소와 각 요소의 type이 정해진 배열 type입니다.
- tuple을 사용하면 서로 다른 type의 data를 grouping하여 관리할 수 있으며, 각 요소의 정확한 type을 알 수 있어 type 안정성을 보장합니다.
- tuple은 배열과 유사하게 작동하지만, 배열 내의 각 위치에 특정 type을 지정할 수 있다는 점에서 차이가 있습니다.

```typescript
let tuple: [string, number, boolean] = ["", 0, false];
```

- tuple을 정의할 때는 각 요소의 type을 괄호 안에 comma(`,`)로 구분하여 나열합니다.


### 비슷하지만 다른 배열과 Tuple

- 배열(array)과 tuple은 TypeScript에서 data를 순서대로 저장하는 데 사용되는 구조이지만, 각각의 특성과 사용 목적이 다릅니다.
    - 배열은 동일한 type의 data를 다룰 때 사용합니다.
    - tuple은 고정된 수의 서로 다른 type의 data를 다룰 때 사용합니다.

```typescript
/* Array */
let array: number[] = [1, 2, 3, 4, 5];
let genericArray: Array<string> = ["Apple", "Banana", "Cherry"];

/* Tuple */
let tuple1: [string, number] = ["Alice", 30];
let tuple2: [number, string, boolean] = [1, "Steve", true];
```

| 배열 | Tuple |
| 