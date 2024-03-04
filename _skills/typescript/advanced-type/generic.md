---
layout: skill
title: TypeScript Advanced Type - Generic Type (Type을 Parameter처럼 사용하기)
date: 2024-03-04
---




## Generic Type : Type을 Parameter처럼 사용하기

- generic type은 type을 parameter처럼 사용하여, 다양한 type에 대해 작동할 수 있는 함수, class, interface 등을 생성할 수 있게 해주는 기능입니다.
    - generic을 사용함으로써 type 안전성을 유지하면서, code를 재사용 가능하고 유연하게 만들 수 있스빈다.

- generic을 사용하면, 하나의 함수나 class가 여러 type에 대해 작동할 수 있게 됩니다.
    - code를 작성할 때 구체적인 type을 명시하는 대신, type 변수(T)를 사용하여 함수나 class를 정의합니다.
    - type 변수는 함수나 class가 호출되거나 instance를 생성할 때 구체적인 type으로 대체됩니다.


### 함수의 Generic

```typescript
function identity<T>(arg: T): T {
    return arg;
}

let output1 = identity<string>("myString");    // output1의 type은 'string'
let output2 = identity<number>(100);    // output2의 type은 'number'
```

- `identity` 함수는 어떤 type의 인자도 받을 수 있고, 받은 인자와 동일한 type으로 값을 반환합니다.
    - `T`는 type 변수로, 함수가 호출될 때 결정됩니다.

- `identity` 함수 호출 시, `<string>`, `<number>`와 같이 type 인자를 제공하여 `T`의 구체적인 type을 지정합니다.
    - 이를 통해 compiler는 반환 값의 type을 정확히 알 수 있습니다.


### Interface의 Generic

- generic은 interface에도 사용될 수 있으며, 이를 통해 다양한 type을 가질 수 있는 객체를 정의할 수 있습니다.

```typescript
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

- `GenericIdentityFn` interface는 generic을 사용하여 정의되었습니다.
- `myIdentity` 함수는 이 interface의 구현체로, `number` type의 인자를 받고 `number` type을 반환하는 함수로 지정됩니다.



### Class의 Generic

- generic은 class 정의에도 사용될 수 있으며, 이를 통해 다양한 type을 가질 수 있는 class instance를 생성할 수 있습니다.

```typescript
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

- `GenericNumber` class는 type `T`에 대해 generic입니다.
- `myGenericNumber` instance는 `number` type을 사용하여 생성되며, 이로 인해 해당 instance의 `zeroValue` property와 `add` method는 모두 `number` type을 사용하게 됩니다.




---




## Generic Constraint : 제약 조건 (`extends`)

- generic type을 사용할 때, 특정 property나 method에 접근하고 싶을 수 있습니다.
- 이럴 때 generic type에 제약 조건(constraint)을 사용하여, 특정 type이 가져야 할 구조를 명시할 수 있습니다.
- generic type에 제약 조건을 추가하면, generic type이 특정 속성이나 method를 가지고 있음을 강제할 수 있습니다.

- 제약 조건을 통해, 함수나 class 내부에서 generic type에 대해 보다 안전하게 연산을 수행할 수 있습니다.
    - e.g., generic type이 특정 interface를 구현하도록 강제할 수 있습니다.

```typescript
<T extends Type>
```

- 제약 조건은 `extends` keyword를 사용하여 정의합니다.

```typescript
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);    // `.length` property를 안전하게 사용할 수 있음
    return arg;
}
```


### Intersection Type으로 제약 조건 추가하기

- intersection type(`&`)과 함께 generic을 사용하여, 여러 type의 특성을 모두 가진 새로운 type을 생성할 수 있습니다.
- 이 방식은 generic type이 여러 interface를 구현하거나, 여러 type의 특성을 조합해야 할 때 유용합니다.

```typescript
interface Identifiable {
    id: number;
}

interface Nameable {
    name: string;
}

function createItem<T extends Identifiable & Nameable>(item: T): T {
    console.log(`Item ${item.name} has ID: ${item.id}`);
    return item;
}
```




---




## Generic Default Type Parameter : 기본 값

- generic type 기본 값(generic default type parameter)은 TypeScript에서 generic을 사용할 때 제공되지 않은 type 인자에 대해, 기본 type을 설정할 수 있게 해주는 기능입니다.
    - generic type 기본 값을 통해 개발자는 generic 함수나 class를 더 유연하게 사용할 수 있으며, type 인자를 생략했을 때의 동작을 명시적으로 정의할 수 있습니다.

- generic type 기본 값을 사용하면 TypeScript의 type 추론(type inference) 기능이 동작하합니다.
    - type 인자를 명시적으로 제공하지 않아도, TypeScript compiler는 제공된 값의 type을 기반으로 적절한 type을 추론하거나, 기본 값을 사용하여 type을 결정합니다.

- generic type 기본 값은 code를 더욱 간결하고 유연하게 만듭니다.
    - type 인자가 생략됐을 때 사용될 type을 명시적으로 지정함으로써, code의 가독성과 이해도를 높일 수 있습니다.
    - 함수나 class를 호출할 때마다 다른 type을 지정할 수 있는 option을 제공하면서도, 특정 상황에서는 기본 type을 자동으로 사용하게 함으로써 code의 유연성을 향상시킵니다.
    - 기본 값을 통해 안전하게 type을 지정함으로써, 잘못된 type 사용으로 인한 오류를 줄일 수 있습니다.

- generic type 기본 값은 `T = DefaultType` 형식을 사용하여 정의됩니다.
    - `T`는 generic type 매개 변수이며, `DefaultType`은 해당 매개 변수가 생략됐을 때 사용될 기본 type입니다.

```typescript
function createContainer<T = string>(value: T): {value: T} {
    return {value};
}

let container = createContainer('Hello');
```

- `createContainer` 함수는 generic type 매개 변수 `T`에 대한 기본 값으로 `string`을 사용합니다.
- 이는 함수를 호출할 때 type 인자를 명시하지 않아도, 자동으로 `T`가 `string`으로 설정됨을 의미합니다.
- 따라서, `container` 변수는 `{value: string}` type의 객체를 가지게 됩니다.


### 기본 값이 있는 Generic 함수

- 배열을 받아 그 배열의 첫 번째 요소를 반환하는, generic type 기본 값을 사용한 함수입니다.
- type 인자가 제공되지 않은 경우, 기본적으로 `number[]` type의 배열을 처리하도록 합니다.

```typescript
function getFirstElement<T = number>(arr: T[]): T | undefined {
    return arr[0];
}

const firstNumber = getFirstElement([10, 20, 30]);    // type 인자를 생략 (기본 값 number 사용)
const firstString = getFirstElement<string>(['apple', 'banana', 'cherry']);    // type 인자로 string 명시

console.log(firstNumber);    // 출력: 10
console.log(firstString);    // 출력: apple
```

- `getFirstElement` 함수는 generic type `T`에 대한 기본 값으로 `number`를 가집니다.
- 따라서 type 인자를 생략하고 숫자 배열을 인자로 전달하면, 함수는 숫자를 반환합니다.
- 반면, type 인자로 `string`을 명시하면, 문자열 배열을 처리합니다.


### 기본 값이 있는 Generic class

- generic type 기본 값을 사용하는, data wrapper class입니다.
    - data wrapper class는 data를 저장하고, 저장된 data를 반환하는 기능을 가집니다.

- type 인자가 제공되지 않은 경우, 기본적으로 `string` type을 다룹니다.

```typescript
class DataWrapper<T = string> {
    private data: T;

    constructor(data: T) {
        this.data = data;
    }

    getData(): T {
        return this.data;
    }
}

const stringWrapper = new DataWrapper('Hello, World!');    // type 인자를 생략 (기본 값 string 사용)
const numberWrapper = new DataWrapper<number>(12345);    // type 인자로 number 명시

console.log(stringWrapper.getData());    // 출력: Hello, World!
console.log(numberWrapper.getData());    // 출력: 12345
```

- `DataWrapper` class는 generic type `T`에 대한 기본 값으로 `string`을 가집니다.
- 생성자를 통해 data를 instance에 저장하고, `getData` method를 사용하여 저장된 data를 반환합니다.
- type 인자를 생략하면 문자열을 다루는 것으로 간주되며, 명시적으로 다른 type을 지정하면 해당 type의 data를 다룹니다.
