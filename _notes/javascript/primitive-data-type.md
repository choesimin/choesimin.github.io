---
layout: note
title: JavaScript 원시 자료형
date: 2023-12-19
---




- JavaScript에서 원시 값(primitive, 또는 원시 자료형)이란 **객체가 아니면서 method 또는 속성도 가지지 않는 data**입니다.
    - 보통 원시 자료형은 언어 구현체의 가장 저수준 단계에서 표현됩니다.

- 모든 원시 값은 **불변**하여 변형할 수 없으며, 언어에서는 원시 값을 변경하는 기능을 제공하지 않습니다.
    - 원시 값을 할당한 변수의 값이 변하는 것과 혼동해서는 안 됩니다.
    - 변수에는 새로운 값을 다시 할당할 수 있지만, 이미 생성한 원시 값 자체는 변형할 수 없습니다.
        - 객체, 배열, 함수는 원시 값에 속하지 않기 때문에 변형할 수 있습니다.

- 원시 값에는 7가지의 종류가 있습니다.
    1. `string`
    2. `number`
    3. `bigint`
    4. `boolean`
    5. `undefined`
    6. `symbol`
    7. `null`




---




## 문자형


```javascript
const name = "Mike";
const age = 30;

const name1 = "Mike";
const name2 = 'Mike';
const name3 = `Mike`;

const message1 = `My name is ${name}`;
const message2 = `I am ${30 + 1} years old`;

console.log(message1);    // "My name is Mike"
console.log(message2);    // "I am 31 years old"
```



## 숫자형

```javascript
const x = 1 / 0;
console.log(x);    // Infinity

const name = "Mike";
const y = name / 2;
console.log(y);    // NaN (Not a Number)
```



## null & undefined

```javascript
let age;    // or 'let age = null'
console.log(age);
```



## typeof 연산자

```javascript
cont name = "Mike";

console.log(typeof 3);    // "number"
console.log(typeof name);    // "string"
console.log(typeof true);    // "boolean"
console.log(typeof "xxx");    // "string"
console.log(typeof null);    // "object" 엄밀히 따지면 null은 object형이 아님
console.log(typeof undefined);    // "undefined"
```




---




## Reference

- <https://developer.mozilla.org/ko/docs/Glossary/Primitive>
- <https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures>
