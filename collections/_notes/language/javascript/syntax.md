---
layout: note
permalink: /445
title: JavaScript 문법 총정리
description: JavaScript는 동적 type 언어로, 변수, 함수, 객체, prototype 기반 상속, Promise와 async/await 비동기 처리, Generator 등의 문법 체계를 갖추고 있습니다.
date: 2023-12-12
---


## 자료형

- JavaScript의 자료형은 **원시 type(primitive type)과 참조 type(reference type)**으로 나뉩니다.
    - 원시 type에는 문자형, 숫자형, boolean, `null`, `undefined`, `Symbol`, `BigInt`가 있습니다.
    - 참조 type에는 객체, 배열, 함수 등이 있습니다.


### 문자형

- 문자열은 **작은따옴표, 큰따옴표, backtick(template literal)** 세 가지 방식으로 표현합니다.
    - backtick은 `${}` 안에 변수나 표현식을 삽입할 수 있습니다.

```javascript
const name1 = "Mike";
const name2 = 'Mike';
const name3 = `Mike`;

const message = `My name is ${name1}`;
const calc = `2 + 3 = ${2 + 3}`;
```


### 숫자형

- 숫자형은 **정수와 부동소수점 숫자**를 포함합니다.
    - 0으로 나누면 `Infinity`가 됩니다.
    - 문자열을 숫자로 나누면 `NaN`(Not a Number)이 됩니다.

```javascript
console.log(1 / 0);          // Infinity
console.log("Mike" / 2);     // NaN
```


### null과 undefined

- `null`은 **값이 비어있음을 명시적으로 나타내는 값**입니다.
- `undefined`는 **변수를 선언했지만 값을 할당하지 않은 상태**입니다.

```javascript
let age;
console.log(age);    // undefined

let name = null;
console.log(name);   // null
```


### typeof 연산자

- `typeof` 연산자는 **값의 자료형을 문자열로 반환**합니다.
    - `null`의 `typeof` 결과는 `"object"`이지만, 이는 JavaScript 초기 설계 오류로 인한 것입니다.

```javascript
console.log(typeof 3);           // "number"
console.log(typeof "hello");     // "string"
console.log(typeof true);        // "boolean"
console.log(typeof null);        // "object"
console.log(typeof undefined);   // "undefined"
```


---


## 형변환

- JavaScript는 **자동 형변환(암묵적)과 명시적 형변환**을 지원합니다.
    - 자동 형변환은 예측하기 어려우므로, 의도를 명확히 하려면 명시적 형변환을 사용합니다.


### `String()`

- `String()` 함수는 **값을 문자형으로 변환**합니다.

```javascript
console.log(String(3));          // "3"
console.log(String(true));       // "true"
console.log(String(null));       // "null"
console.log(String(undefined));  // "undefined"
```


### `Number()`

- `Number()` 함수는 **값을 숫자형으로 변환**합니다.
    - 숫자로 변환할 수 없는 문자열은 `NaN`이 됩니다.
    - `null`은 `0`, `undefined`는 `NaN`으로 변환됩니다.

```javascript
console.log(Number("3"));         // 3
console.log(Number(true));        // 1
console.log(Number(false));       // 0
console.log(Number("abcd"));     // NaN
console.log(Number(null));        // 0
console.log(Number(undefined));   // NaN
```


### `Boolean()`

- `Boolean()` 함수는 **값을 boolean형으로 변환**합니다.
    - `0`, `""`, `null`, `undefined`, `NaN`은 `false`로 변환됩니다.
    - 그 외의 값은 모두 `true`로 변환됩니다.
    - 빈 문자열 `""`은 `false`이지만, 공백 문자열 `" "`은 `true`입니다.

```javascript
console.log(Boolean(1));           // true
console.log(Boolean("hello"));    // true
console.log(Boolean(0));           // false
console.log(Boolean(""));         // false
console.log(Boolean(null));        // false
console.log(Boolean('0'));         // true
console.log(Boolean(' '));         // true
```


---


## 연산자

- JavaScript는 **산술, 비교, 논리 등 다양한 연산자**를 제공합니다.


### 산술 연산자

- 산술 연산자는 **숫자 값에 대한 계산을 수행**합니다.

| 연산자 | 의미 |
| --- | --- |
| `+` | 더하기 |
| `-` | 빼기 |
| `*` | 곱하기 |
| `/` | 나누기 |
| `%` | 나머지 |
| `**` | 거듭제곱 |

- 복합 할당 연산자로 연산과 할당을 동시에 수행합니다.

```javascript
let num = 10;
num += 5;    // num = num + 5
num -= 5;    // num = num - 5
num *= 5;    // num = num * 5
num /= 5;    // num = num / 5
num %= 5;    // num = num % 5
```


### 증감 연산자

- `++`와 `--`는 **값을 1 증가시키거나 감소**시킵니다.
    - 전위 연산자(`++a`)는 증가 후 값을 반환합니다.
    - 후위 연산자(`a++`)는 현재 값을 반환한 후 증가합니다.

```javascript
let a = 10;
console.log(a++);    // 10 (반환 후 증가)
console.log(a);      // 11

let b = 10;
console.log(++b);    // 11 (증가 후 반환)
```


### 비교 연산자

- 비교 연산자는 **두 값을 비교하여 boolean을 반환**합니다.
    - `==`(동등 연산자)는 type 변환 후 비교합니다.
    - `===`(일치 연산자)는 type까지 비교합니다.

```javascript
console.log(1 == "1");     // true (type 변환)
console.log(1 === "1");    // false (type 불일치)
console.log(1 != "1");     // false
console.log(1 !== "1");    // true
```


### 논리 연산자

- 논리 연산자는 **boolean 값을 조합하여 판단**합니다.
    - `||`(OR)는 하나라도 `true`이면 `true`를 반환합니다.
    - `&&`(AND)는 모두 `true`여야 `true`를 반환합니다.
    - `!`(NOT)는 값을 반전시킵니다.
    - 우선순위는 `!` > `&&` > `||` 순입니다.

- 단락 평가(short-circuit evaluation)를 수행합니다.
    - `||`는 첫 번째 `true`를 발견하면 즉시 평가를 멈춥니다.
    - `&&`는 첫 번째 `false`를 발견하면 즉시 평가를 멈춥니다.


---


## 조건문과 반복문

- JavaScript는 **조건에 따른 분기와 반복 실행을 위한 제어문**을 제공합니다.


### if, else

- `if`문은 **조건식이 `true`일 때 해당 block을 실행**합니다.

```javascript
const age = 30;

if (age > 19) {
    console.log('welcome');
} else if (age === 19) {
    console.log('hi 19');
} else {
    console.log('bye');
}
```


### switch

- `switch`문은 **하나의 표현식을 여러 값과 비교하여 분기**합니다.
    - 각 `case`마다 `break`로 탈출하지 않으면 이후의 모든 `case`를 실행합니다.
    - 동일한 동작을 하는 `case`는 묶어서 작성할 수 있습니다.

```javascript
let fruit = prompt('what fruit?');

switch (fruit) {
    case '사과':
        console.log('100원');
        break;
    case '바나나':
        console.log('200원');
        break;
    case '멜론':
    case '수박':
        console.log('500원');
        break;
    default:
        console.log('no fruit');
}
```


### for, while

- `for`문은 **초기식, 조건식, 증감식을 한 줄에 작성**합니다.
- `while`문은 **조건이 `true`인 동안 반복**합니다.
- `do...while`문은 **본문을 먼저 실행한 후 조건을 검사**합니다.

```javascript
for (let i = 0; i < 10; i++) {
    console.log(i);
}

let i = 0;
while (i < 10) {
    console.log(i);
    i++;
}

let j = 0;
do {
    console.log(j);
    j++;
} while (j < 10);
```


### break와 continue

- `break`는 **반복문을 즉시 종료**합니다.
- `continue`는 **현재 반복을 건너뛰고 다음 반복으로 진행**합니다.

```javascript
for (let i = 0; i < 10; i++) {
    if (i % 2) continue;
    console.log(i);    // 0, 2, 4, 6, 8
}
```


---


## 변수

- JavaScript는 **`var`, `let`, `const` 세 가지 keyword로 변수를 선언**합니다.


### var

- `var`는 **함수 scope를 가지는 변수 선언 keyword**입니다.
    - 동일한 이름으로 재선언이 가능합니다.
    - hoisting 시 선언과 초기화가 동시에 이루어져, 선언 전에 접근하면 `undefined`를 반환합니다.

```javascript
console.log(name);    // undefined (error 아님)
var name = 'Mike';

var name = 'Jane';    // 재선언 가능
console.log(name);    // "Jane"
```


### let

- `let`은 **block scope를 가지는 변수 선언 keyword**입니다.
    - 재선언이 불가능하지만 재할당은 가능합니다.
    - hoisting되지만 TDZ(Temporal Dead Zone)에 의해 선언 전 접근 시 `ReferenceError`가 발생합니다.

```javascript
console.log(name);    // ReferenceError
let name = 'Mike';

let name = 'Jane';    // SyntaxError (재선언 불가)
name = 'Jane';        // 재할당 가능
```

- `let`의 생성 과정은 선언 단계, 초기화 단계, 할당 단계로 나뉩니다.
    - hoisting으로 선언 단계가 먼저 이루어지지만, 초기화는 실제 선언문에 도달했을 때 수행됩니다.


### const

- `const`는 **block scope를 가지는 상수 선언 keyword**입니다.
    - 선언과 할당이 동시에 이루어져야 합니다.
    - 재선언과 재할당 모두 불가능합니다.

```javascript
const gender = 'male';
gender = 'female';    // TypeError (재할당 불가)

const age;    // SyntaxError (선언 시 할당 필수)
```


### Block Scope와 함수 Scope

- block scope는 **`{}`(code block) 내에서 선언된 변수가 block 밖에서 접근 불가능**한 것입니다.
    - `let`과 `const`는 block scope를 따릅니다.
    - if문, for문, while문 등 모든 code block에 적용됩니다.

- 함수 scope는 **함수 내에서 선언된 변수만 지역 변수가 되는 것**입니다.
    - `var`는 함수 scope를 따릅니다.
    - if문이나 for문의 block 안에서 `var`로 선언한 변수는 block 밖에서도 접근 가능합니다.

```javascript
const age = 30;
if (age > 19) {
    var txt = '성인';
}
console.log(txt);    // "성인" (var는 if block을 무시)

function add(num1, num2) {
    var result = num1 + num2;
}
add(2, 3);
console.log(result);    // ReferenceError (var도 함수 scope는 벗어나지 못함)
```


---


## 함수

- JavaScript에서 함수는 **선언문, 표현식, 화살표 함수** 세 가지 방식으로 정의합니다.


### 함수 선언문

- 함수 선언문은 **`function` keyword로 함수를 정의**하는 방식입니다.
    - hoisting에 의해 선언 위치보다 위에서도 호출할 수 있습니다.
    - 실행 전 초기화 단계에서 모든 함수 선언문을 찾아 생성해 놓기 때문입니다.

```javascript
sayHello('Mike');    // 선언 전 호출 가능

function sayHello(name) {
    let msg = 'Hello';
    if (name) {
        msg += `, ${name}`;
    }
    console.log(msg);
}
```

- `return`문은 **값을 반환하고 함수 실행을 종료**합니다.
    - `return`문이 없거나 `return`만 단독으로 사용하면 `undefined`를 반환합니다.

```javascript
function add(num1, num2) {
    return num1 + num2;
}

const result = add(2, 3);    // 5
```


### 함수 표현식

- 함수 표현식은 **이름 없는 함수를 변수에 할당**하는 방식입니다.
    - 함수 선언문과 달리 해당 code에 도달해야 함수가 생성됩니다.
    - 선언 이후에만 호출이 가능합니다.

```javascript
const sayHello = function() {
    console.log('Hello');
};

sayHello();
```


### 화살표 함수

- 화살표 함수(arrow function)는 **함수 표현식의 축약 형태**입니다.
    - 본문이 한 줄이고 `return`문만 있으면 중괄호와 `return`을 생략할 수 있습니다.
    - 인수가 하나이면 매개변수의 괄호를 생략할 수 있습니다.
    - 인수가 없으면 괄호를 생략할 수 없습니다.

```javascript
const add = (num1, num2) => num1 + num2;

const sayHello = name => `Hello, ${name}`;

const showError = () => {
    alert('error');
};
```


---


## 객체

- 객체(object)는 **중괄호 안에 key-value 쌍으로 property를 저장**하는 자료형입니다.
    - 점 표기법(`obj.key`)이나 괄호 표기법(`obj['key']`)으로 접근합니다.
    - property의 추가, 수정, 삭제가 자유롭습니다.

```javascript
const superman = {
    name: 'clark',
    age: 33,
};

console.log(superman.name);       // "clark"
console.log(superman['age']);     // 33

superman.gender = 'male';         // 추가
delete superman.gender;           // 삭제

console.log('age' in superman);   // true (존재 여부 확인)
```


### 단축 Property

- 변수명과 property key가 같을 때 **축약하여 작성**할 수 있습니다.

```javascript
const name = 'clark';
const age = 33;

const superman = { name, age, gender: 'male' };
```


### for...in 반복문

- `for...in`은 **객체의 모든 열거 가능한 property를 순회**합니다.

```javascript
for (let key in superman) {
    console.log(key);              // property name
    console.log(superman[key]);    // property value
}
```


### Computed Property

- computed property는 **대괄호 안에 표현식을 넣어 동적으로 key를 생성**합니다.

```javascript
let a = 'age';
const user = {
    name: 'Mike',
    [a]: 30,
};

function makeObj(key, val) {
    return { [key]: val };
}
const obj = makeObj('나이', 33);
```


### Object Method

- `Object`의 정적 method들은 **객체를 복제하거나 property를 조회**합니다.

| method | 반환값 |
| --- | --- |
| `Object.assign(target, ...sources)` | 병합된 객체 |
| `Object.keys(obj)` | key 배열 |
| `Object.values(obj)` | 값 배열 |
| `Object.entries(obj)` | `[key, value]` 배열 |
| `Object.fromEntries(arr)` | 배열에서 변환된 객체 |

```javascript
const user = { name: 'Mike', age: 30 };

const clone = Object.assign({}, user);
console.log(Object.keys(user));      // ["name", "age"]
console.log(Object.values(user));    // ["Mike", 30]
console.log(Object.entries(user));   // [["name", "Mike"], ["age", 30]]
```


### Method와 this

- 객체의 property에 할당된 함수를 **method**라고 합니다.
    - method 내부에서 `this`는 호출한 객체를 가리킵니다.
    - 화살표 함수는 자신만의 `this`를 가지지 않으며, 외부 scope의 `this`를 참조합니다.

```javascript
const boy = {
    name: 'Mike',
    sayHello() {
        console.log(`Hello, I'm ${this.name}`);
    },
};

boy.sayHello();    // "Hello, I'm Mike"

const girl = {
    name: 'Jane',
    sayThis: () => {
        console.log(this);    // 전역 객체 (Window)
    },
};
```


---


## 배열

- 배열(array)은 **순서가 있는 값들의 집합**입니다.
    - 문자, 숫자, 객체, 함수 등 다양한 type의 값을 포함할 수 있습니다.
    - index는 0부터 시작합니다.

```javascript
let days = ['월', '화', '수'];

console.log(days[0]);      // "월"
console.log(days.length);  // 3
```


### 요소 추가와 제거

- 배열의 **앞과 뒤에 요소를 추가하거나 제거**하는 method가 있습니다.

| method | 동작 |
| --- | --- |
| `push(item)` | 배열 끝에 추가 |
| `pop()` | 배열 끝 요소 제거 |
| `unshift(item)` | 배열 앞에 추가 |
| `shift()` | 배열 앞 요소 제거 |


### 배열 반복

- `for...of`는 **배열의 값을 순회**합니다.
    - `for...in`은 객체용이며, 배열에서는 `for...of` 사용이 권장됩니다.

```javascript
let days = ['월', '화', '수'];

for (let day of days) {
    console.log(day);
}
```


### Array Method

- 배열에는 **탐색, 변환, filtering 등 다양한 method**가 있습니다.

#### splice와 slice

- `splice(n, m, ...items)`는 index `n`부터 `m`개를 삭제하고 `items`를 추가합니다.
- `slice(n, m)`는 index `n`부터 `m` 전까지의 요소를 새 배열로 반환합니다.

```javascript
let arr = [1, 2, 3, 4, 5];
arr.splice(1, 2);          // arr = [1, 4, 5]

let arr2 = [1, 2, 3, 4, 5];
arr2.splice(1, 3, 100, 200);    // arr2 = [1, 100, 200, 5]

let arr3 = [1, 2, 3, 4, 5];
console.log(arr3.slice(1, 4));   // [2, 3, 4]
```

#### forEach, map, filter

- `forEach(fn)`는 배열의 각 요소에 대해 함수를 실행합니다.
- `map(fn)`은 각 요소를 변환하여 새 배열을 반환합니다.
- `filter(fn)`는 조건을 만족하는 요소만 모아 새 배열을 반환합니다.

```javascript
let arr = [1, 2, 3, 4, 5];

arr.forEach((item, index) => {
    console.log(`${index}: ${item}`);
});

const doubled = arr.map(item => item * 2);       // [2, 4, 6, 8, 10]
const evens = arr.filter(item => item % 2 === 0); // [2, 4]
```

#### find, findIndex, includes

- `find(fn)`는 조건을 만족하는 **첫 번째 요소**를 반환합니다.
- `findIndex(fn)`는 조건을 만족하는 **첫 번째 index**를 반환합니다.
- `includes(item)`는 배열에 **해당 값이 존재하는지** 확인합니다.

```javascript
let users = [
    { name: 'Mike', age: 30 },
    { name: 'Tom', age: 10 },
];

const result = users.find(user => user.age < 19);
console.log(result);    // {name: "Tom", age: 10}

console.log([1, 2, 3].includes(2));    // true
```

#### reduce

- `reduce(fn, initialValue)`는 배열을 **하나의 값으로 누적 계산**합니다.
    - 첫 번째 인수로 `(누적값, 현재값) => 계산값` 형태의 함수를 받습니다.
    - 두 번째 인수는 초기값입니다.

```javascript
let arr = [1, 2, 3, 4, 5];

const sum = arr.reduce((prev, cur) => prev + cur, 0);
console.log(sum);    // 15

let users = [
    { name: "Mike", age: 30 },
    { name: "Tom", age: 10 },
    { name: "Jane", age: 27 },
];

const totalAge = users.reduce((prev, cur) => prev + cur.age, 0);
console.log(totalAge);    // 67
```

#### sort, reverse, concat

- `sort(fn)`는 배열을 정렬합니다.
    - 비교 함수 없이 사용하면 문자열 기준으로 정렬됩니다.
    - 숫자 정렬은 비교 함수를 전달해야 합니다.
- `reverse()`는 배열을 역순으로 재정렬합니다.
- `concat(arr2)`는 배열을 합쳐서 새 배열을 반환합니다.

```javascript
let arr = [27, 8, 5, 13];
arr.sort((a, b) => a - b);
console.log(arr);    // [5, 8, 13, 27]
```

#### join과 split

- `arr.join(separator)`은 배열을 문자열로 합칩니다.
- `str.split(separator)`은 문자열을 나눠서 배열로 만듭니다.

```javascript
let arr = ["안녕", "나는", "철수야"];
console.log(arr.join(" "));    // "안녕 나는 철수야"

let str = "Mike,Jane,Tom";
console.log(str.split(","));   // ["Mike", "Jane", "Tom"]
```

#### Array.isArray

- `Array.isArray()`는 **값이 배열인지 확인**합니다.
    - `typeof`는 배열과 객체를 구분하지 못하므로, 배열 판별에는 `Array.isArray()`를 사용합니다.

```javascript
console.log(typeof []);              // "object"
console.log(Array.isArray([]));      // true
console.log(Array.isArray({}));      // false
```


---


## 구조 분해 할당

- 구조 분해 할당(destructuring assignment)은 **배열이나 객체의 값을 변수에 분해하여 할당**하는 문법입니다.


### 배열 구조 분해

- 배열의 요소를 **순서대로 변수에 할당**합니다.
    - 기본값을 설정할 수 있습니다.
    - 쉼표로 특정 요소를 건너뛸 수 있습니다.
    - 두 변수의 값을 swap할 때도 유용합니다.

```javascript
let [x, y] = [1, 2];
console.log(x);    // 1

let [a = 3, b = 4, c = 5] = [1, 2];
console.log(c);    // 5 (기본값)

let [user1, , user2] = ['Mike', 'Tom', 'Jane'];
console.log(user2);    // "Jane" (Tom 건너뜀)

let [p, q] = [1, 2];
[p, q] = [q, p];    // swap
```


### 객체 구조 분해

- 객체의 property를 **key 이름에 대응하는 변수에 할당**합니다.
    - 새로운 변수명으로 할당하거나 기본값을 설정할 수 있습니다.

```javascript
let user = { name: 'Mike', age: 30 };
let { name, age } = user;

console.log(name);    // "Mike"
console.log(age);     // 30

let { name: userName, age: userAge } = user;
console.log(userName);    // "Mike"

let { name: n, age: a, gender = 'male' } = user;
console.log(gender);    // "male" (기본값)
```


---


## 나머지 매개변수와 전개 구문

- JavaScript는 **가변 인수를 처리하는 rest parameters와 값을 펼치는 spread syntax**를 제공합니다.


### 나머지 매개변수

- 나머지 매개변수(rest parameters)는 **함수의 인수를 배열로 모아주는 문법**입니다.
    - `...` 연산자를 매개변수 앞에 붙여 사용합니다.
    - 항상 매개변수 목록의 마지막에 위치해야 합니다.

```javascript
function add(...numbers) {
    return numbers.reduce((prev, cur) => prev + cur, 0);
}

console.log(add(1, 2, 3));              // 6
console.log(add(1, 2, 3, 4, 5));        // 15

function User(name, age, ...skills) {
    this.name = name;
    this.age = age;
    this.skills = skills;
}

const user = new User('Mike', 30, 'HTML', 'CSS');
console.log(user.skills);    // ["HTML", "CSS"]
```


### 전개 구문

- 전개 구문(spread syntax)은 **배열이나 객체를 펼쳐서 개별 요소로 분리**하는 문법입니다.
    - 배열 합치기, 객체 합치기, 복제에 활용합니다.

```javascript
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let merged = [...arr1, ...arr2];    // [1, 2, 3, 4, 5, 6]

let user = { name: 'Mike' };
let mike = { ...user, age: 30 };   // {name: "Mike", age: 30}

let clone = [...arr1];              // 배열 복제
let userClone = { ...user };       // 객체 복제
```


---


## Number와 Math

- JavaScript는 **숫자 변환과 수학 연산을 위한 다양한 내장 기능**을 제공합니다.


### 진법 변환

- `toString(radix)`는 숫자를 지정한 진법의 문자열로 변환합니다.

```javascript
let num = 255;
console.log(num.toString(2));     // "11111111" (2진수)
console.log(num.toString(16));    // "ff" (16진수)
```


### Math 객체

- `Math` 객체는 **수학 관련 상수와 method**를 제공합니다.

| method | 동작 |
| --- | --- |
| `Math.ceil(n)` | 올림 |
| `Math.floor(n)` | 내림 |
| `Math.round(n)` | 반올림 |
| `Math.random()` | 0~1 사이 난수 |
| `Math.max(...n)` | 최댓값 |
| `Math.min(...n)` | 최솟값 |
| `Math.abs(n)` | 절대값 |
| `Math.pow(n, m)` | `n`의 `m`제곱 |
| `Math.sqrt(n)` | 제곱근 |

```javascript
console.log(Math.ceil(5.1));     // 6
console.log(Math.floor(5.7));    // 5
console.log(Math.round(5.5));    // 6

let rate = 30.1234;
console.log(rate.toFixed(2));    // "30.12" (문자열 반환)
console.log(Number(rate.toFixed(2)));    // 30.12

console.log(Math.floor(Math.random() * 100) + 1);    // 1~100 사이 난수
```


### parseInt와 parseFloat

- `parseInt()`는 문자열에서 **정수 부분만 추출**합니다.
- `parseFloat()`는 문자열에서 **부동소수점 숫자를 추출**합니다.

```javascript
console.log(parseInt('10px'));        // 10
console.log(parseInt('f3', 16));     // 243 (16진수 -> 10진수)
console.log(parseFloat('18.5%'));    // 18.5
console.log(Number('10px'));         // NaN (Number는 변환 불가)
```


### isNaN

- `isNaN()`은 **값이 `NaN`인지 판별**하는 유일한 방법입니다.
    - `NaN`은 자기 자신과도 동등하지 않으므로 `===`로 비교할 수 없습니다.

```javascript
console.log(NaN === NaN);     // false
console.log(isNaN(NaN));      // true
console.log(isNaN(3));         // false
```


---


## String Method

- 문자열은 **불변(immutable)** 하며, method 호출 시 새 문자열을 반환합니다.

| method | 동작 |
| --- | --- |
| `str.indexOf(text)` | 문자열 위치 반환 (없으면 `-1`) |
| `str.includes(text)` | 포함 여부 boolean 반환 |
| `str.slice(n, m)` | `n`부터 `m` 전까지 추출 |
| `str.substring(n, m)` | `n`과 `m` 사이 추출 (음수 불가) |
| `str.substr(n, m)` | `n`부터 `m`개 추출 |
| `str.toUpperCase()` | 대문자 변환 |
| `str.toLowerCase()` | 소문자 변환 |
| `str.trim()` | 앞뒤 공백 제거 |
| `str.repeat(n)` | `n`번 반복 |

```javascript
let desc = "Hi guys. Nice to meet you.";

console.log(desc.indexOf('to'));       // 14
console.log(desc.includes('Hi'));      // true
console.log(desc.slice(0, 8));         // "Hi guys."
console.log(desc.toUpperCase());       // "HI GUYS. NICE TO MEET YOU."
```

- 문자열 비교는 **ASCII code 기준**으로 이루어집니다.

```javascript
console.log("a".codePointAt(0));          // 97
console.log(String.fromCodePoint(97));    // "a"
```


---


## Symbol

- `Symbol`은 **유일한 식별자를 만들기 위한 원시 type**입니다.
    - `new`를 붙이지 않고 `Symbol()`로 생성합니다.
    - 동일한 설명(description)을 전달해도 각 `Symbol`은 고유합니다.

```javascript
const id1 = Symbol('id');
const id2 = Symbol('id');

console.log(id1 === id2);       // false
console.log(id1.description);   // "id"
```


### Property Key로서의 Symbol

- `Symbol`을 property key로 사용하면 **`Object.keys()`, `for...in` 등에서 노출되지 않습니다**.
    - 원본 객체를 건드리지 않고 속성을 추가할 때 유용합니다.

```javascript
const id = Symbol('id');
const user = {
    name: 'Mike',
    age: 30,
    [id]: 'myid',
};

console.log(Object.keys(user));    // ["name", "age"]
console.log(user[id]);             // "myid"
```


### Symbol.for

- `Symbol.for(key)`는 **전역 Symbol registry에서 Symbol을 생성하거나 가져옵니다**.
    - 같은 key로 호출하면 동일한 `Symbol`을 반환합니다.

```javascript
const id1 = Symbol.for('id');
const id2 = Symbol.for('id');

console.log(id1 === id2);           // true
console.log(Symbol.keyFor(id1));    // "id"
```


### 숨겨진 Symbol Key 조회

- `Object.getOwnPropertySymbols()`와 `Reflect.ownKeys()`로 **숨겨진 Symbol key를 조회**할 수 있습니다.

```javascript
console.log(Object.getOwnPropertySymbols(user));    // [Symbol(id)]
console.log(Reflect.ownKeys(user));                  // ["name", "age", Symbol(id)]
```


---


## this와 함수 호출

- JavaScript에서 `this`는 **함수의 호출 방식에 따라 동적으로 결정**됩니다.
    - `call`, `apply`, `bind`를 사용하면 `this`를 명시적으로 지정할 수 있습니다.


### call

- `call(thisArg, ...args)`은 **`this`를 지정하여 함수를 호출**합니다.
    - 첫 번째 인수가 `this`로 사용될 객체이고, 나머지 인수가 함수의 매개변수입니다.

```javascript
const mike = { name: "Mike" };

function update(birthYear, occupation) {
    this.birthYear = birthYear;
    this.occupation = occupation;
}

update.call(mike, 1999, "singer");
console.log(mike);    // {name: "Mike", birthYear: 1999, occupation: "singer"}
```


### apply

- `apply(thisArg, [args])`는 **`call`과 동일하지만 매개변수를 배열로 전달**합니다.

```javascript
update.apply(mike, [1999, "singer"]);

const nums = [3, 10, 1, 6, 4];
console.log(Math.max.apply(null, nums));    // 10
console.log(Math.min.call(null, ...nums));  // 1
```


### bind

- `bind(thisArg)`는 **`this`가 영구히 고정된 새 함수를 반환**합니다.

```javascript
const mike = { name: "Mike" };

function update(birthYear, occupation) {
    this.birthYear = birthYear;
    this.occupation = occupation;
}

const updateMike = update.bind(mike);
updateMike(1980, "police");
console.log(mike);    // {name: "Mike", birthYear: 1980, occupation: "police"}
```


---


## 생성자 함수

- 생성자 함수는 **`new` 연산자와 함께 호출하여 객체를 생성하는 함수**입니다.
    - 함수 이름의 첫 글자를 대문자로 작성하는 것이 관례입니다.
    - `new` 없이 호출하면 일반 함수처럼 동작하여 `undefined`를 반환합니다.

```javascript
function User(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = function() {
        console.log(this.name);
    };
}

let user1 = new User('Mike', 30);
user1.sayName();    // "Mike"
```


### 생성자 함수의 동작 과정

- `new`로 호출하면 **빈 객체 생성, property 할당, 반환**의 3단계로 동작합니다.

```javascript
function User(name, age) {
    // this = {};              // 1. 빈 객체 생성 후 this에 할당 (암묵적)
    this.name = name;          // 2. this에 property 추가
    this.age = age;
    // return this;            // 3. this 반환 (암묵적)
}
```


---


## 상속과 Prototype

- JavaScript는 **prototype 기반 상속**을 사용합니다.
    - 객체에서 property를 찾을 때, 해당 객체에 없으면 `__proto__`(prototype)에서 찾습니다.
    - 이를 **prototype chain**이라고 합니다.

```javascript
const car = {
    wheels: 4,
    drive() {
        console.log("drive..");
    },
};

const bmw = { color: "red", navigation: 1 };
bmw.__proto__ = car;

console.log(bmw.wheels);    // 4 (prototype에서 조회)
console.log(bmw.color);     // "red" (자체 property)
```


### Prototype Chain

- prototype chain은 **여러 단계로 이어질 수 있습니다**.
    - property를 찾을 때까지 prototype을 계속 올라가며 탐색합니다.

```javascript
const x5 = { color: "white", name: "x5" };
x5.__proto__ = bmw;

console.log(x5.navigation);    // 1 (bmw에서 조회)
console.log(x5.wheels);        // 4 (car에서 조회)
```


### 생성자 함수의 Prototype

- 생성자 함수의 `prototype` property를 통해 **생성되는 모든 객체에 공유 property를 설정**합니다.

```javascript
const Bmw = function(color) {
    this.color = color;
};

Bmw.prototype.wheels = 4;
Bmw.prototype.drive = function() {
    console.log("drive..");
};

const x5 = new Bmw("red");
console.log(x5.wheels);              // 4
console.log(x5 instanceof Bmw);      // true
console.log(x5.constructor === Bmw); // true
```

- `for...in`은 prototype의 property까지 순회하지만, `Object.keys()`는 자체 property만 반환합니다.
    - `hasOwnProperty()`로 자체 property 여부를 확인할 수 있습니다.


---


## Class

- class는 **ES6에서 추가된 객체 생성 문법**입니다.
    - 생성자 함수와 기능은 유사하지만, `new` 없이 호출하면 error가 발생합니다.
    - class의 method는 `for...in`에서 제외됩니다.

```javascript
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    showName() {
        console.log(this.name);
    }
}

const mike = new User("Mike", 30);
mike.showName();    // "Mike"
```


### 상속

- `extends` keyword로 **부모 class를 상속**합니다.

```javascript
class Car {
    constructor(color) {
        this.color = color;
        this.wheels = 4;
    }
    drive() {
        console.log("drive..");
    }
    stop() {
        console.log("stop!");
    }
}

class Bmw extends Car {
    park() {
        console.log("park");
    }
}

const z4 = new Bmw("blue");
z4.drive();    // "drive.."
z4.park();     // "park"
```


### Method Overriding

- 자식 class에서 **부모와 동일한 이름의 method를 재정의**할 수 있습니다.
    - 자식 class의 `constructor`에서는 반드시 `super()`를 호출해야 합니다.
    - `super.method()`로 부모의 method를 호출할 수 있습니다.

```javascript
class Bmw extends Car {
    constructor(color) {
        super(color);
        this.navigation = 1;
    }
    stop() {
        super.stop();
        console.log("off");
    }
}

const z4 = new Bmw("blue");
z4.stop();
// "stop!"
// "off"
```


---


## Closure

- closure는 **함수와 그 함수가 선언된 lexical environment의 조합**입니다.
    - 함수가 생성될 때의 외부 변수를 기억하고, 생성 이후에도 계속 접근할 수 있습니다.
    - 외부 함수의 실행이 끝나도 내부 함수가 외부 함수의 변수에 접근 가능합니다.

```javascript
function makeCounter() {
    let num = 0;
    return function() {
        return num++;
    };
}

let counter = makeCounter();
console.log(counter());    // 0
console.log(counter());    // 1
console.log(counter());    // 2
```


### Lexical Environment

- JavaScript는 **함수가 호출될 때마다 새로운 lexical environment를 생성**합니다.
    - 내부 lexical environment는 외부 lexical environment에 대한 참조를 가집니다.
    - 변수를 찾을 때 내부에서 시작하여 외부로 범위를 넓혀가며 탐색합니다.

```javascript
function makeAdder(x) {
    return function(y) {
        return x + y;
    };
}

const add3 = makeAdder(3);
console.log(add3(2));    // 5
```

- `add3`은 `makeAdder(3)`이 반환한 내부 함수입니다.
    - 내부 함수는 자체 lexical environment에서 `y`를 찾고, 외부 lexical environment에서 `x`를 찾습니다.
    - `makeAdder`의 실행이 끝났지만 `x = 3`에 계속 접근할 수 있습니다.


---


## setTimeout과 setInterval

- JavaScript는 **일정 시간 후 실행하거나 반복 실행하는 scheduling 함수**를 제공합니다.


### setTimeout

- `setTimeout(fn, delay, ...args)`은 **일정 시간이 지난 후 함수를 실행**합니다.
    - `clearTimeout(id)`로 예정된 실행을 취소할 수 있습니다.

```javascript
setTimeout(function() {
    console.log('3초 후 실행');
}, 3000);

function showName(name) {
    console.log(name);
}
const tid = setTimeout(showName, 3000, 'Mike');
clearTimeout(tid);    // 실행 취소
```


### setInterval

- `setInterval(fn, delay, ...args)`은 **일정 시간 간격으로 함수를 반복 실행**합니다.
    - `clearInterval(id)`로 반복을 중단할 수 있습니다.

```javascript
let num = 0;

function showTime() {
    console.log(`접속한지 ${num++}초`);
    if (num > 5) {
        clearInterval(tid);
    }
}

const tid = setInterval(showTime, 1000);
```

- `delay`를 `0`으로 설정해도 즉시 실행되지 않습니다.
    - 현재 실행 중인 script가 종료된 이후에 실행됩니다.
    - browser는 최소 4ms의 대기 시간을 가집니다.


---


## Promise

- `Promise`는 **비동기 작업의 완료 또는 실패를 나타내는 객체**입니다.
    - `resolve` : 작업 성공 시 호출하는 callback.
    - `reject` : 작업 실패 시 호출하는 callback.
    - 생성 시 `state`는 `pending`, `result`는 `undefined`입니다.

```javascript
const pr = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok');
    }, 3000);
});
```

| 상태 | state | result |
| --- | --- | --- |
| 대기 | `pending` | `undefined` |
| 이행 | `fulfilled` | `resolve`로 전달된 값 |
| 거부 | `rejected` | `reject`로 전달된 error |


### then, catch, finally

- `then()`은 **이행 시 실행할 callback을 등록**합니다.
- `catch()`는 **거부 시 실행할 callback을 등록**합니다.
- `finally()`는 **이행이든 거부든 항상 실행**됩니다.

```javascript
pr.then(result => {
    console.log(result + ' 가지러 가자');
}).catch(error => {
    console.log('다시 주문해주세요');
}).finally(() => {
    console.log('--- 주문 끝 ---');
});
```


### Promise Chaining

- `then()`이 `Promise`를 반환하면 **chain 형태로 순차 실행**할 수 있습니다.
    - callback hell을 해결하는 방법입니다.

```javascript
const f1 = () => new Promise(res => setTimeout(() => res("1번 완료"), 1000));
const f2 = (msg) => {
    console.log(msg);
    return new Promise(res => setTimeout(() => res("2번 완료"), 3000));
};
const f3 = (msg) => {
    console.log(msg);
    return new Promise(res => setTimeout(() => res("3번 완료"), 2000));
};

f1()
    .then(res => f2(res))
    .then(res => f3(res))
    .then(res => console.log(res))
    .catch(console.log)
    .finally(() => console.log("끝"));
```


### Promise.all과 Promise.race

- `Promise.all(promises)`은 **모든 Promise가 이행되면 결과 배열을 반환**합니다.
    - 하나라도 거부되면 즉시 거부됩니다.
- `Promise.race(promises)`는 **가장 먼저 완료된 Promise의 결과만 반환**합니다.

```javascript
Promise.all([f1(), f2(), f3()])
    .then(res => console.log(res));
// ["1번 완료", "2번 완료", "3번 완료"] (약 3초 소요)

Promise.race([f1(), f2(), f3()])
    .then(res => console.log(res));
// "1번 완료" (약 1초 소요)
```


---


## async와 await

- `async`/`await`은 **Promise 기반 비동기 code를 동기적으로 읽히게 작성**하는 문법입니다.


### async

- `async` keyword를 함수 앞에 붙이면 **항상 Promise를 반환**합니다.
    - 반환값이 Promise가 아니면 자동으로 `Promise.resolve()`로 감싸집니다.

```javascript
async function getName() {
    return "Mike";
}

getName().then(name => {
    console.log(name);    // "Mike"
});
```


### await

- `await`은 **`async` 함수 내부에서 Promise의 이행을 기다립니다**.
    - Promise가 이행되면 결과값을 반환합니다.
    - error 처리는 `try/catch`문을 사용합니다.

```javascript
function getName(name) {
    return new Promise(resolve => {
        setTimeout(() => resolve(name), 1000);
    });
}

async function showName() {
    const result = await getName("Mike");
    console.log(result);
}

showName();    // (1초 후) "Mike"
```

```javascript
async function order() {
    try {
        const result1 = await f1();
        const result2 = await f2(result1);
        const result3 = await f3(result2);
        console.log(result3);
    } catch (e) {
        console.log(e);
    }
}
```

- `Promise.all`과 함께 사용하면 **여러 비동기 작업을 병렬로 실행**할 수 있습니다.

```javascript
async function order() {
    const result = await Promise.all([f1(), f2(), f3()]);
    console.log(result);    // ["1번 완료", "2번 완료", "3번 완료"]
}
```


---


## Generator

- generator 함수는 **실행을 중간에 멈췄다가 재개할 수 있는 특수한 함수**입니다.
    - `function*` keyword로 선언합니다.
    - 내부에서 `yield` keyword로 값을 반환하고 실행을 일시 정지합니다.
    - 호출하면 Generator 객체를 반환합니다.


### next

- `next()`는 **다음 `yield`까지 실행하고 `{value, done}` 객체를 반환**합니다.
    - `value`는 `yield` 뒤의 값, `done`은 함수 종료 여부입니다.
    - `next()`에 인수를 전달하면 이전 `yield`의 반환값으로 사용됩니다.

```javascript
function* fn() {
    yield 1;
    yield 2;
    yield 3;
    return "finish";
}

const gen = fn();
console.log(gen.next());    // {value: 1, done: false}
console.log(gen.next());    // {value: 2, done: false}
console.log(gen.next());    // {value: 3, done: false}
console.log(gen.next());    // {value: "finish", done: true}
console.log(gen.next());    // {value: undefined, done: true}
```

```javascript
function* fn() {
    const num1 = yield "첫번째 숫자를 입력해주세요";
    console.log(num1);

    const num2 = yield "두번째 숫자를 입력해주세요";
    console.log(num2);

    return num1 + num2;
}

const gen = fn();
console.log(gen.next());       // {value: "첫번째 숫자를 입력해주세요", done: false}
console.log(gen.next(2));      // 2, {value: "두번째 숫자를 입력해주세요", done: false}
console.log(gen.next(4));      // 4, {value: 6, done: true}
```


### return과 throw

- `return(value)`는 **Generator를 즉시 종료하고 `{value, done: true}`를 반환**합니다.
- `throw(error)`는 **Generator 내부에 error를 전달하고 종료**합니다.

```javascript
const gen = fn();
console.log(gen.next());           // {value: 1, done: false}
console.log(gen.return('END'));    // {value: "END", done: true}
console.log(gen.next());           // {value: undefined, done: true}
```


### Iterable

- generator 객체는 **iterable protocol을 구현**합니다.
    - `Symbol.iterator` method가 자기 자신을 반환합니다.
    - `for...of`로 순회할 수 있습니다.

```javascript
function* fn() {
    yield 4;
    yield 5;
    yield 6;
}

const gen = fn();
for (let num of gen) {
    console.log(num);    // 4, 5, 6
}
```

- 배열과 문자열도 iterable합니다.
    - `Symbol.iterator` method를 가지고 있으며, `for...of`로 순회할 수 있습니다.


### 지연 평가

- generator는 **필요한 값만 그때그때 생성**합니다.
    - 모든 값을 미리 계산해두지 않으므로 memory를 절약합니다.
    - `while(true)` 같은 무한 loop도 안전하게 사용할 수 있습니다.

```javascript
function* fn() {
    let index = 0;
    while (true) {
        yield index++;
    }
}

const gen = fn();
console.log(gen.next());    // {value: 0, done: false}
console.log(gen.next());    // {value: 1, done: false}
console.log(gen.next());    // {value: 2, done: false}
```


### yield*

- `yield*`는 **다른 iterable 객체에 위임**합니다.

```javascript
function* gen1() {
    yield "W";
    yield "o";
    yield "r";
    yield "l";
    yield "d";
}

function* gen2() {
    yield "Hello,";
    yield* gen1();
    yield "!";
}

console.log(...gen2());    // "Hello, W o r l d !"
```


---


## Reference

- <https://www.youtube.com/watch?v=KF6t61yuPCY>
- <https://www.youtube.com/watch?v=4_WLS9Lj6n4>

