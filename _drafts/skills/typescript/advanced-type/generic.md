---
layout: skill
title: TypeScript Advanced Type - Generic Type ()
date: 2024-02-27
---




## Generic Type

Generic Type은 TypeScript에서 타입을 파라미터처럼 사용하여 다양한 타입에 대해 작동할 수 있는 함수, 클래스, 인터페이스 등을 생성할 수 있게 해주는 강력한 기능입니다. 제네릭을 사용함으로써 코드의 재사용성을 높이고, 타입 체크 시 더 높은 유연성과 타입 안전성을 제공합니다.


제네릭을 사용하면, 하나의 함수나 클래스가 여러 타입에 대해 작동할 수 있게 됩니다. 이는 코드를 작성할 때 구체적인 타입을 명시하는 대신, 타입 변수(T)를 사용하여 함수나 클래스를 정의함으로써 달성됩니다. 이 타입 변수는 함수나 클래스가 호출되거나 인스턴스를 생성할 때 구체적인 타입으로 대체됩니다.


### 제네릭 함수

```typescript
function identity<T>(arg: T): T {
    return arg;
}
```

`identity` 함수는 어떤 타입의 인자도 받을 수 있고, 받은 인자와 동일한 타입으로 값을 반환합니다. 여기서 `T`는 타입 변수로, 함수가 호출될 때 결정됩니다.

```typescript
let output1 = identity<string>("myString");  // output1의 타입은 'string'
let output2 = identity<number>(100);         // output2의 타입은 'number'
```

함수 호출 시, `<string>`, `<number>`와 같이 타입 인자를 제공하여 `T`의 구체적인 타입을 지정합니다. 이를 통해 컴파일러는 반환값의 타입을 정확히 알 수 있습니다.


### 제네릭 인터페이스

제네릭은 인터페이스에도 사용될 수 있으며, 이를 통해 다양한 타입을 가질 수 있는 객체를 정의할 수 있습니다.

```typescript
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```
여기서 `GenericIdentityFn` 인터페이스는 제네릭을 사용하여 정의되었습니다. `myIdentity` 함수는 이 인터페이스의 구현체로, `number` 타입의 인자를 받고 `number` 타입을 반환하는 함수로 지정됩니다.


### 제네릭 클래스

제네릭은 클래스 정의에도 사용될 수 있으며, 이를 통해 다양한 타입을 가질 수 있는 클래스 인스턴스를 생성할 수 있습니다.

```typescript
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

`GenericNumber` 클래스는 타입 `T`에 대해 제네릭입니다. `myGenericNumber` 인스턴스는 `number` 타입을 사용하여 생성되며, 이로 인해 해당 인스턴스의 `zeroValue` 프로퍼티와 `add` 메소드는 모두 `number` 타입을 사용하게 됩니다.




---




## Generic Type Constraint(제약 조건)

제네릭 타입을 사용할 때, 특정 프로퍼티나 메소드에 접근하고 싶을 수 있습니다. 이럴 때 제네릭 타입에 제약 조건을 사용하여, 특정 타입이 가져야 할 구조를 명시할 수 있습니다.
제네릭 타입에 제약 조건을 추가하면, 제네릭 타입이 특정 속성이나 메소드를 가지고 있음을 강제할 수 있습니다. 이를 통해, 함수나 클래스 내부에서 제네릭 타입에 대해 보다 안전하게 연산을 수행할 수 있습니다. 예를 들어, `extends` 키워드를 사용하여 제네릭 타입이 특정 인터페이스를 구현하도록 강제할 수 있습니다.

```typescript
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);    // 이제 `.length` 프로퍼티를 안전하게 사용할 수 있습니다.
    return arg;
}
```


### Intersection Type으로 제약 조건 추가하기

intersection type(`&`)과 함께 제네릭을 사용하여, 여러 타입의 특성을 모두 가진 새로운 타입을 생성할 수 있습니다. 이 방식은 제네릭 타입이 여러 인터페이스를 구현하거나, 여러 타입의 특성을 조합해야 할 때 유용합니다.

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




## Generic Type 기본 값

제네릭 타입 기본값은 TypeScript에서 제네릭을 사용할 때 제공되지 않은 타입 인자에 대해 기본 타입을 설정할 수 있게 해주는 기능입니다. 이를 통해 개발자는 제네릭 함수나 클래스를 더 유연하게 사용할 수 있으며, 타입 인자를 생략했을 때의 동작을 명시적으로 정의할 수 있습니다.
TypeScript의 타입 추론 기능은 제네릭 타입 기본값과 함께 작동하여, 코드를 더욱 간결하고 유연하게 만듭니다. 타입 인자를 명시적으로 제공하지 않아도, TypeScript 컴파일러는 제공된 값의 타입을 기반으로 적절한 타입을 추론하거나, 기본값을 사용하여 타입을 결정합니다.

- 기본값을 사용하는 이유
    1. **명시성**: 타입 인자가 생략됐을 때 사용될 타입을 명시적으로 지정함으로써, 코드의 가독성과 이해도를 높일 수 있습니다.
    2. **유연성**: 함수나 클래스를 호출할 때마다 다른 타입을 지정할 수 있는 옵션을 제공하면서도, 특정 상황에서는 기본 타입을 자동으로 사용하게 함으로써 코드의 유연성을 향상시킵니다.
    3. **타입 안전성**: 기본값을 통해 안전하게 타입을 지정함으로써, 잘못된 타입 사용으로 인한 오류를 줄일 수 있습니다.


- 제네릭 타입 기본값은 `T = DefaultType` 형식을 사용하여 정의됩니다. 여기서 `T`는 제네릭 타입 매개변수이며, `DefaultType`은 해당 매개변수가 생략됐을 때 사용될 기본 타입입니다.

```typescript
function createContainer<T = string>(value: T): {value: T} {
    return {value};
}

let container = createContainer('Hello');
```

위 예제에서 `createContainer` 함수는 제네릭 타입 매개변수 `T`에 대한 기본값으로 `string`을 사용합니다. 이는 함수를 호출할 때 타입 인자를 명시하지 않아도, 자동으로 `T`가 `string`으로 설정됨을 의미합니다. 따라서, `container` 변수는 `{value: string}` 타입의 객체를 가지게 됩니다.


### 기본 값이 있는 제네릭 함수

제네릭 타입 기본값을 사용하는 함수 예제로, 배열을 받아 그 배열의 첫 번째 요소를 반환하는 간단한 함수를 살펴보겠습니다. 타입 인자가 제공되지 않은 경우, 기본적으로 `number[]` 타입의 배열을 처리하도록 합니다.

```typescript
function getFirstElement<T = number>(arr: T[]): T | undefined {
    return arr[0];
}

const firstNumber = getFirstElement([10, 20, 30]); // 타입 인자를 생략. 기본값 number 사용
const firstString = getFirstElement<string>(['apple', 'banana', 'cherry']); // 타입 인자로 string 명시

console.log(firstNumber); // 출력: 10
console.log(firstString); // 출력: apple
```

이 예제에서 `getFirstElement` 함수는 제네릭 타입 `T`에 대한 기본값으로 `number`를 가집니다. 따라서 타입 인자를 생략하고 숫자 배열을 인자로 전달하면, 함수는 숫자를 반환합니다. 반면, 타입 인자로 `string`을 명시하면, 문자열 배열을 처리합니다.


### 기본 값이 있는 제네릭 클래스

제네릭 타입 기본값을 사용하는 클래스 예제로, 간단한 데이터 래퍼(wrapper) 클래스를 살펴보겠습니다. 이 클래스는 데이터를 저장하고, 저장된 데이터를 반환하는 기능을 가집니다. 타입 인자가 제공되지 않은 경우, 기본적으로 `string` 타입을 다루도록 합니다.

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

const stringWrapper = new DataWrapper('Hello, World!'); // 타입 인자를 생략. 기본값 string 사용
const numberWrapper = new DataWrapper<number>(12345); // 타입 인자로 number 명시

console.log(stringWrapper.getData()); // 출력: Hello, World!
console.log(numberWrapper.getData()); // 출력: 12345
```

이 예제에서 `DataWrapper` 클래스는 제네릭 타입 `T`에 대한 기본값으로 `string`을 가집니다. 생성자를 통해 데이터를 인스턴스에 저장하고, `getData` 메소드를 사용하여 저장된 데이터를 반환합니다. 타입 인자를 생략하면 문자열을 다루는 것으로 간주되며, 명시적으로 다른 타입을 지정하면 해당 타입의 데이터를 다룹니다.
