---
layout: note
title: JavaScript 자료형
date: 2023-12-19
---




- JavaScript는 **동적 type이 있는 동적 언어**입니다.
    - JavaScript의 변수는 어떤 특정 type과 연결되지 않으며, 모든 type의 값으로 할당/재할당할 수 있습니다.



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

- <https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures>
