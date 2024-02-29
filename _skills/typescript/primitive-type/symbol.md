---
layout: skill
title: TypeScript Primitive Type - Symbol (고유 값)
date: 2024-02-28
---





## Symbol Type

- JavaScript의 Symbol은 ES6(ES2015)에서 도입된, 변경 불가능한 primitive data type입니다.

- 각 Symbol 값은 고유하며, 주로 객체 속성의 key로 사용됩니다.
    - Symbol을 사용하는 주된 목적은 이름 충돌의 위험 없이 객체에 유일한 속성들을 추가하는 것입니다.

- Symbol을 사용하면 객체에 Metaprogramming 기능을 추가하여, JavaScript engine이 객체를 어떻게 처리해야 할지에 대한 사용자 정의 동작을 구현할 수 있습니다.

- TypeScript에서 Symbol의 type은 `symbol`로 표현합니다.
    - Symbol의 동작 방식, 사용 방법은 정적 typing을 제외하고 JavaScript와 모두 동일합니다.




---




## 일반 Symbol : `Symbol()`

- `Symbol()` 함수를 호출하여 Symbol을 생성할 수 있으며, 선택적으로 문자열을 description 인자로 전달할 수 있습니다.

```typescript
let symbol1: symbol = Symbol();
let symbol2: symbol = Symbol('description');
```

- 각 Symbol은 고유합니다.
- 동일한 description을 가진 두 Symbol을 생성해도, 두 Symbol은 서로 다릅니다.

```typescript
let symbol1 = Symbol('description');
let symbol2 = Symbol('description');
console.log(symbol1 === symbol2);    // false
```


### 객체 속성 Key로 Symbol 사용하기

- Symbol을 객체의 속성 key(object property key)로 사용할 때, 'computed property names 문법'을 사용하여 객체 literal 내에서 Symbol을 속성 key로 사용할 수 있습니다.

```typescript
let mySymbol: symbol = Symbol('mySymbol');
let obj: { [key: symbol]: string } = {
    [mySymbol]: 'value'
};

console.log(obj[mySymbol]);    // value
```

- Symbol을 객체의 속성 key로 사용하면, 해당 속성은 열거할 수 없으며, 기본적으로는 JSON 문자열로 변환될 때 포함되지 않습니다.
    - Symbol로 선언되 속성은 `for...in` loop나 `Object.keys()` method로는 찾을 수 없습니다.
    - 이러한 특성 때문에 Symbol을 사용하면, 객체 내부의 '숨겨진(private)' 속성을 만들 수 있습니다.


#### Example : Symbol을 사용한 숨겨진 속성(Private Property) 추가

- Symbol을 사용하여 객체에 숨겨진 속성을 추가하고, 숨겨진 속성이 일반적인 방법으로 열거되지 않는 것을 확인하는 code입니다.
- `Object.getOwnPropertySymbols()` method를 사용하여, 객체에 추가된 숨겨진 Symbol 속성 key를 조회할 수 있습니다.

```typescript
/* Symbol을 생성합니다. */
let hiddenSymbol: symbol = Symbol('hiddenProperty');
let anotherSymbol: symbol = Symbol('anotherProperty');

/* Symbol을 속성 key로 사용하여 객체를 생성합니다. */
let myObject: { [key: symbol]: any } = {
  [hiddenSymbol]: 'This is a hidden message',
  [anotherSymbol]: 'This is another hidden message',
  visibleProperty: 'This is a visible message'
};

/* Symbol로 선언된 속성에 접근합니다. */
console.log(myObject[hiddenSymbol]);    // This is a hidden message
console.log(myObject[anotherSymbol]);    // This is another hidden message

/* 객체의 모든 속성을 열거합니다(for...in loop). */
for (let property in myObject) {
  console.log(`${property}: ${myObject[property]}`);
}
// 출력: visibleProperty: This is a visible message
// Note: Symbol로 선언된 속성은 출력되지 않습니다.

/* Object.keys()를 사용하여 속성 key를 얻습니다. */
console.log(Object.keys(myObject));
// 출력: ["visibleProperty"]
// Note: Symbol로 선언된 속성 key는 포함되지 않습니다.

/* Object.getOwnPropertySymbols()를 사용하여 Symbol 속성 key를 얻습니다. */
console.log(Object.getOwnPropertySymbols(myObject));
// 출력: [Symbol(hiddenProperty), Symbol(anotherProperty)]
// Note: Symbol 속성 key만 포함됩니다.

/* JSON.stringify()를 사용하여 객체를 문자열로 변환합니다. */
console.log(JSON.stringify(myObject));
// 출력: {"visibleProperty":"This is a visible message"}
// Note: Symbol로 선언된 속성은 포함되지 않습니다.
```




---




## 전역 Symbol : `Symbol.for()`와 `Symbol.keyFor()`

- `Symbol.for()`와 `Symbol.keyFor()`는 전역 Symbol Registry(Global Symbol registry)를 사용하여 Symbol을 생성하고 조회하는 기능을 제공합니다.
    - `Symbol`을 통한 Metaprogramming 기능 중에서도, 특히 전역적인 context에서 Symbol을 공유하고 재사용할 필요가 있을 때 유용하게 사용됩니다.

- 전역 Symbol Registry는 전역적으로 공유되어야 하는 고유한 식별자를 생성하고자 할 때 사용합니다.
    - e.g., 여러 module이나 package에서 동일한 식별자를 참조해야 하는 경우, `Symbol.for()`를 사용하여 동일한 Symbol을 안전하게 공유할 수 있습니다.
    - 이는 이름 충돌 없이 module 간의 상호 작용을 구현하는 데 도움이 됩니다.
    - application 전반에서 Symbol 값의 일관성을 유지할 수 있으며, debugging이나 code의 이해를 돕는 데에도 유용하게 사용될 수 있습니다.


### `Symbol.for()` : 전역 Symbol 생성 및 사용

- `Symbol.for()` method는 Symbol의 고유성이 유지되면서도, 명시적으로 이름을 지정하여 전역적으로 공유할 수 있는 방법을 제공합니다.
    - 전역 Symbol Registry를 사용하여 Symbol을 생성하고 검색하는 mechanism을 제공합니다.
    - application의 어느 부분에서든지 동일한 문자열 인자로 `Symbol.for()`를 호출하면, 항상 동일한 Symbol instance를 반환합니다.

```typescript
let globalSymbol1: symbol = Symbol.for('globalSymbol');
let globalSymbol2: symbol = Symbol.for('globalSymbol');

console.log(globalSymbol1 === globalSymbol2);    // true
```

- `globalSymbol1`과 `globalSymbol2`는 동일한 Symbol을 참조합니다.
    - 두 변수가 'globalSymbol'이라는 동일한 key로 `Symbol.for()`를 호출했기 때문입니다.


### `Symbol.keyFor()` : 전역 Symbol의 Key 확인

- `Symbol.keyFor()` method는 주어진 Symbol이 전역 Symbol Registry에 등록되어 있다면, 해당 Symbol의 key를 문자열로 반환합니다.
    - `Symbol.for()`를 사용하여 생성한 Symbol에만 적용될 수 있으며, 직접 `Symbol()` 생성자로 생성한 Symbol에는 적용되지 않습니다.

```typescript
let globalSymbol: symbol = Symbol.for('globalSymbol');
let symbolKey: string | undefined = Symbol.keyFor(globalSymbol);

console.log(symbolKey);    // 'globalSymbol'
```

- `globalSymbol` Symbol이 'globalSymbol'이라는 key로 전역 Symbol Registry에 등록되어 있기 때문에 `symbolKey`는 'globalSymbol'이라는 문자열을 반환합니다.




---




## Well-Known Symbol : 사전 정의된 Symbol

- Well-Known Symbol은 ECMAScript 사양에 미리 정의되어 있는 '잘 알려진(well-known)' Symbol을 의미합니다.

- Well-Known Symbol은 객체의 표준 동작(내부적인 언어 동작)을 변경(사용자 정의)할 수 있게 하여, Metaprogramming을 가능하게 합니다.
    - e.g., `Symbol.iterator`는 객체가 반복자 protocol을 구현하는 방법을 정의하는 데 사용됩니다.

- 다양한 Well-Known Symbol들이 있으며, 필요에 따라서 선택하여 사용합니다.

| Well-Known Symbol | 설명 |
| --- | --- |
| `Symbol.iterator` | 객체가 'iterable'이 되게 하여 `for...of` loop와 같은 구문에서 사용될 수 있도록 합니다.<br>`Symbol.iterator`는 객체에 method를 정의하며, 이 method는 반복자(iterator)를 반환해야 합니다.<br>이 반복자는 `next` method를 가지고 있으며, `next`는 반복될 각 값에 대한 `{value, done}` 객체를 반환해야 합니다. |
| `Symbol.asyncIterator` | 비동기 반복자를 정의하는 데 사용됩니다.<br>이를 통해 객체는 `for await...of` loop에 의해 비동기적으로 반복될 수 있습니다. |
| `Symbol.toStringTag` | 객체의 기본 `toString()` method 호출 결과에 사용되는 문자열을 정의합니다.<br>e.g., `Object.prototype.toString.call(new Array())`을 호출하면 `"[object Array]"`가 반환되는데, 이는 `Array` 객체의 `Symbol.toStringTag` 속성이 `"Array"`로 설정되어 있기 때문입니다. |
| `Symbol.species` | 생성자 함수에 의해 생성된 객체의 유형을 지정합니다.<br>이 Symbol을 사용하여 내장 객체의 subclass에서 `map`, `filter` 같은 method를 호출할 때 반환되는 instance의 유형을 customizing할 수 있습니다. |
| `Symbol.hasInstance` | `instanceof` 연산자를 사용할 때 객체의 instance 여부를 결정하는 method를 정의합니다. |


### `Symbol.iterator`

- 어떤 객체가 `Symbol.iterator`를 property key로 사용한 method를 가지고 있으면, JavaScript engine은 이 객체가 iteration protocol을 따르는 것으로 간주하고 iterator로 동작하도록 합니다.

- `Symbol.iterator`를 property key로 사용하여 method를 구현하고 있는 여러 Built-in 객체(Built-in iterable)가 있습니다.
    - Built-in iterable은 iteration protocol을 준수하여 iterator를 반환하며, iterator를 반환한다는 뜻은 `for...of` loop로 요소를 순회할 수 있다는 것을 의미합니다.



| Object | Built-in Itertable |
| --- | --- |
| Array | `Array.prototype[Symbol.iterator]` |
| String | `String.prototype[Symbol.iterator]` |
| Map | `Map.prototype[Symbol.iterator]` |
| Set | `Set.prototype[Symbol.iterator]` |
| DOM data structures | `NodeList.prototype[Symbol.iterator] HTMLCollection.prototype[Symbol.iterator]` |
| arguments | `arguments[Symbol.iterator]` |
        
```js
// Symbol.iterator를 property key로 사용한 method를 구현해야 합니다.
// 배열에는 Array.prototype[Symbol.iterator] method가 구현되어 있습니다.
const iterable = ['a', 'b', 'c'];

// iterator : iterable의 Symbol.iterator를 property key로 사용한 method는 iterator를 반환합니다.
const iterator = iterable[Symbol.iterator]();

// iterator는 순회 가능한 자료 구조인 iterable의 요소를 탐색하기 위한 pointer로써,
// value, done property를 갖는 객체를 반환하는 next() 함수를 method로 갖는 객체입니다.
// iterator의 next() method를 통해 iterable 객체를 순회할 수 있습니다.
console.log(iterator.next());    // { value: 'a', done: false }
console.log(iterator.next());    // { value: 'b', done: false }
console.log(iterator.next());    // { value: 'c', done: false }
console.log(iterator.next());    // { value: undefined, done: true }
```


#### `Symbol.iterator` 예제

- `Symbol.iterator`를 사용하여 반복될 객체의 내부 동작을 사용자가 제어할 수 있으며, 다양한 유형의 data에 대해 반복 logic을 쉽게 구현할 수 있습니다.

```typescript
let iterableObj: {
    [Symbol.iterator]: () => {
        next: () => { value: string, done: boolean }
    }
} = {
    [Symbol.iterator]() {
        let step = 0;
        return {
            next() {
                step++;
                if (step === 1) return { value: 'Hello', done: false };
                else if (step === 2) return { value: 'World', done: false };
                return { value: '', done: true };
            }
        };
    }
};

for (let value of iterableObj) {
    console.log(value);    // 'Hello' 다음 'World' 출력
}
```

- `iterableObj` 객체는 `Symbol.iterator`를 사용하여 반복 가능한(iterable) protocol을 구현합니다.

- `iterableObj[Symbol.iterator]` method는 호출될 때마다 새로운 반복자(iterator) 객체를 반환합니다.
    - iterator 객체는 `next` method를 포함하고 있으며, `next`는 반복될 각 단계에서 `{value, done}` 객체를 반환합니다.
        - `value`는 현재 단계의 값이며, `done`은 반복이 끝났는지의 여부를 나타냅니다.

- 이 구조를 통해 `for...of` loop는 `iterableObj`를 반복할 때마다 `iterableObj`의 `Symbol.iterator` method로부터 반환된 반복자의 `next` method를 호출합니다.
- `next` method는 처음에는 "Hello"를, 두 번째에는 "World"를 반환하고, 그 다음에는 `done`을 `true`로 설정하여 반복이 종료되었음을 나타냅니다.




---




## Reference

- <https://inpa.tistory.com/entry/JS-%F0%9F%93%9A-%EC%9E%90%EB%A3%8C%ED%98%95-Symbol-%F0%9F%9A%A9-%EC%A0%95%EB%A6%AC>
