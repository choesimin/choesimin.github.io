---
layout: skill
title: TypeScript Object Type - Array (배열)
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


---


## 다양한 형태의 배열


### 다차원 배열

- 다차원 배열은 배열의 배열을 의미합니다.

```typescript
let matrix: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
```


### 읽기 전용 배열

- 읽기 전용 배열은 배열이 생성된 후에 수정할 수 없습니다.
- `readonly` keyword를 사용하여 읽기 전용 배열을 정의할 수 있습니다.

```typescript
let readonlyNumbers: readonly number[] = [1, 2, 3];
readonlyNumbers.push(4);    // Compile Error: readonly 배열에는 push 메서드를 사용할 수 없습니다.
```


### 객체 배열

- 배열 내의 객체에 대한 type도 정의할 수 있습니다.
- 이는 복잡한 data 구조를 안전하게 다루는 데 유용합니다.

```typescript
interface User {
    id: number;
    name: string;
}

let users: User[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];
```


### Union Type을 사용한 배열

- 배열이 여러 type의 요소를 포함할 수 있도록 union type을 사용하여 배열 type을 정의할 수도 있습니다.

```typescript
let mixed: (number | string)[] = [1, "two", 3, "four"];
```


---


## 배열 활용하기

- TypeScript과 배열의 특성을 활용한 기능들을 사용하여, 더 편리하게 개발할 수 있습니다.


### 일관된 Type의 요소

- 배열 type을 활용하면 compiler가 배열의 요소에 대한 type을 check하여, type이 일치하지 않는 요소가 배열에 추가되는 것을 방지할 수 있습니다.

```typescript
let numbers: number[] = [1, 2, 3];
numbers.push(4);
// numbers.push("five");    // Compile Error: 'string' type은 'number' type 배열에 할당할 수 없습니다.
```


### 배열 Method와 Type 추론

- TypeScript는 표준 배열 method를 사용할 때도 'type 추론'을 제공합니다.
    - type 추론(type inference)은 TypeScript가 code에서 변수나 함수의 type을 자동으로 결정하는 과정입니다.

- 예를 들어, `map`, `filter`, `reduce` 같은 method에 대한 callback 함수의 매개 변수 type도 자동으로 추론됩니다.

```typescript
let numbers: number[] = [1, 2, 3, 4, 5];
let doubled = numbers.map((number) => number * 2);
// doubled는 number[] type으로 추론됩니다.
```


### 배열과 비구조화 할당

- 배열의 비구조화 할당에 대한 type 정의 방법은 code를 더욱 간결하고 읽기 쉽게 만들어 줍니다.

```typescript
let [first, second]: [number, number] = [1, 2];
```
