---
layout: skill
date: 2024-02-29
title: TypeScript Tuple Type - 고정 배열
description: TypeScript의 Tuple Type은 고정된 개수의 요소와 각 요소의 type이 정해진 배열 type으로, 서로 다른 type의 data를 grouping하여 관리할 수 있습니다.
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
| --- | --- |
| 동일한 type의 요소만 포함할 수 있음. | 각 요소가 서로 다른 type을 가질 수 있음. |
| 길이가 가변적임. 갯수 제한이 없음. | 길이가 고정적임. 정의된 요소의 개수만큼의 data가 저장됨. |
| type이 동일한 많은 양의 data를 처리할 때 사용. | 여러 type의 data를 한 번에 관리할 필요가 있을 때 사용. |
| 동일한 type의 data 집합을 나타내는 데 사용 | 각 요소의 type을 명시적으로 정의하여 data 구조의 의도를 명확하게 전달하기 위해 사용. |


### Tuple 요소에 접근하기

- tuple 내의 각 요소에 접근하는 것은 배열과 유사하게, index를 통해 이루어집니다.
- 다만, tuple에서는 각 요소가 특정 type으로 지정되어 있기 때문에, 해당 index에 접근하면 TypeScript는 자동으로 올바른 type을 추론합니다.

```typescript
let person: [string, number] = ["Alice", 30];

let personName: string = person[0];    // Alice (string type으로 자동 추론됨)
let personAge: number = person[1];    // 30 (number type으로 자동 추론됨)
```

- `person` tuple은 첫 번째 요소로 문자열(`string`)을, 두 번째 요소로 숫자(`number`)를 가집니다.
- 각 요소에 접근할 때 TypeScript는 해당 index의 type을 알고 있으므로, type 안전성이 보장됩니다.


### Tuple 요소 변경하기

- tuple의 값은 각 요소의 index를 통해 직접 접근하여 변경할 수 있습니다.
- 이때, 변경하려는 요소의 type은 tuple에서 정의된 해당 요소의 type과 일치해야만 합니다.
- 또한 tuple은 고정된 길이를 가지므로, 새로운 요소를 추가하여 tuple의 길이를 변경하는 것은 type 정의에 위배됩니다.

```typescript
let person: [string, number] = ["Alice", 30];

person[0] = "Bob";    // 첫 번째 요소(이름) 변경
person[1] = 32;    // 두 번째 요소(나이) 변경

console.log(person);    // ["Bob", 32]
```

- 각 요소를 변경할 때는 tuple에서 해당 위치에 정의된 type에 맞는 값을 할당해야 합니다.
    - 예를 들어, 숫자 type이 요구되는 위치에 문자열을 할당하려고 하면 TypeScript compiler는 type 오류를 발생시킵니다.

#### Tuple의 요소를 변경할 수 없는 경우

- 읽기 전용 tuple은 변경할 수 없습니다.
- `readonly`로 선언된 tuple은 그 요소를 변경할 수 없으며, 시도하면 compile time에 오류가 발생합니다.

```typescript
let readonlyPerson: readonly [string, number] = ["Alice", 30];

readonlyPerson[0] = "Bob";    // Error: Index signature in type 'readonly [string, number]' only permits reading.
```

- `readonly` tuple은 data의 불변성을 유지해야 할 때 유용하며, 이러한 tuple의 요소는 생성 시에만 할당할 수 있고, 이후에는 변경할 수 없습니다.


---


## Tuple 고급 기능


### 선택적 Tuple 요소

- TypeScript 3.0 이상에서는 tuple 내 요소를 선택적(optional)으로 만들 수 있습니다.
- 선택적 요소는 type 뒤에 물음표 기호(`?`)를 붙여 표시하며, 해당 위치에 값이 있거나 없을 수 있음을 의미합니다.

```typescript
let optionalTuple: [string, number, boolean?] = ["Bob", 25];
```

- `optionalTuple`은 세 번째 요소로 `boolean` type을 가질 수도 있고, 아예 없을 수도 있습니다.


### 나머지 요소와 Tuple

- tuple에서 나머지 요소(rest element)를 사용하여, 특정 위치 이후의 모든 요소에 대해 같은 type을 지정할 수 있습니다.

```typescript
let restTuple: [string, ...number[]] = ["hello", 1, 2, 3];
```

- `restTuple`은 첫 번째 요소로 `string`을, 그리고 나머지 요소로 `number` 배열을 가지는 tuple입니다.


### Tuple과 구조 분해 할당

- tuple은 구조 분해 할당(destructuring assignment)과 함께 사용 가능합니다.
    - 구조 분해를 사용하면 tuple의 각 요소를 개별 변수에 쉽게 할당할 수 있습니다.

```typescript
let employee: [number, string, string] = [1, "Steve", "Developer"];

// 구조 분해 할당을 사용하여 tuple 요소를 변수에 할당
let [id, name, position] = employee;
console.log(id);    // 1
console.log(name);    // Steve
console.log(position);    // Developer
```


### Tuple Type에서의 Spread 연산자

- spread 연산자(`...`)는 tuple type에서도 사용할 수 있습니다.
- spread 연산자로 tuple의 요소를 다른 tuple이나 배열에 쉽게 결합할 수 있습니다.

```typescript
let part1: [number, string] = [1, "Steve"];
let part2: [string, number] = ["Developer", 50000];

let employee: [number, string, string, number] = [...part1, ...part2];
```


### 읽기 전용 Tuple

- TypeScript는 읽기 전용 배열(`ReadonlyArray<T>`)과 유사하게, 읽기 전용 tuple(`readonly [T, U, ...]`)을 지원합니다.
- 읽기 전용 tuple을 사용하면 tuple의 요소를 변경할 수 없게 만들 수 있어, 불변성을 보장할 수 있습니다.

```typescript
let readOnlyTuple: readonly [number, string] = [1, "Steve"];
readOnlyTuple[0] = 2;    // 에러: 읽기 전용 속성이므로 '0'에 할당할 수 없습니다.
```


### Label이 있는 Tuple 요소

- TypeScript 4.0부터는 tuple 요소에 label을 지정할 수 있게 되었습니다.
    - label을 지정하여 코드의 가독성을 높이고, tuple의 구조를 더 명확하게 표현할 수 있습니다.

```typescript
let person: [id: number, name: string] = [1, "Steve"];
```
