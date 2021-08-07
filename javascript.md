# 자료형

### 문자형

```javascript
const name = "Mike";
const age = 30;

const name1 = "Mike"
const name2 = 'Mike'
const name3 = `Mike`

const message1 = `My name is ${name}`;
const message2 = `I am ${30+1} years old`;

console.log(message1);    // "My name is Mike"
console.log(message2);    // "I am 31 years old"
```

### 숫자형

```javascript
const x = 1/0;
console.log(x);    // Infinity

const name = "Mike";
const y = name/2;
console.log(y);    // NaN (Not a Number)
```

### null & undifined

```javascript
let age;    // or 'let age = null'
console.log(age);
```

### typeof 연산자

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

# alert, prompt, confirm

### alert

```javascript
alert("hello");
```

### prompt

```javascript
const name = prompt("Input your name");
// 'cancel'을 누르면 null
console.log(`Welcome, ${name}!`);

const age = prompt("Input your age", "26");
// 입력란에 26이 미리 들어가 있음
console.log(age);
```

### confirm

```javascript
const isAdult = confirm("Are you adult?");

console.log(isAdult);    // true or false
```

---

# 형변환

```javascript
const mathScore = prompt("Math Score");    // "90" 문자형으로 받음
const engScore = prompt("Eng Score");    // "80" 문자형으로 받음
const result = (mathScore + engScore) / 2;    // 9080 / 2 : 자동 형변환 -> 명시적 형변환 필요

console.log(result);    // 4540
```
- String() : 문자형으로 변환
  ```javascript
  console.log(String(3), String(true), String(false), String(null), String(undifined));     // "3", "true", "false", "null", "undifined"
  ```
- Number() : 숫자형으로 변환
  ```javascript
  console.log(Number("3"), Number(true), Number(false));;     // 3, 1, 0
  console.log(Number("abcd"));    // NaN
  console.log(Number(null));    // 0
  console.log(Number(undefined));    // NaN
  ```
- Boolean : boolean형으로 변환
  ```javascript
  console.log(Boolean(1), Boolean(123), Boolean("javascript"));    // true true true
  console.log(Boolean(0), Boolean(""), Boolean(null), Boolean(undefined), Boolean(NaN));    // false false false false false
  console.log(Boolean(0), Boolean('0'));    // false true
  console.log(Boolean(''), Boolean(' '));    // false true
  ```

---

# 기본 연산자

- + : 더하기
- - : 빼기
- * : 곱하기
- / : 나누기
- % : 나머지
- ** : 거듭제곱
  ```javascript
  const num = 2 ** 3;
  console.log(num);    // 8
  ```
- 우선순위
  - (*, /)  >  (+, -)

### 연산자 줄여쓰기

```javascript
let num = 10;
num += 5;    // num = num + 5;
num -= 5;    // num = num - 5;
num *= 5;    // num = num * 5;
num /= 5;    // num = num / 5;
num %= 5;    // num = num % 5;
```

---

# 증가 연산자, 감소 연산자

```javascript
let a = 10;
let a_result = a++;
console.log(a_result);    // 10

let b = 10;
let b_result = ++b;
console.log(b_result);    // 11

let c = 10;
let c_result = c--;
console.log(c_result);    // 10

let d = 10;
let d_result = --d;
console.log(d_result);    // 9
```

---

# 비교 연산자

- <, >, <=, >=, ==, !=
  - =을 하나 쓰는 것은 할당 연산자이므로 == 사용
- 반환값은 항상 Boolean
  ```javascript
  console.log(10 > 5);    // true
  console.log(10 == 5);    // false
  console.log(10 != 5);    // true
  ```
- 동등 연산자
  ```javascript
  const a = 1;
  const b = "1";
  console.log(a == b);    // true
  console.log(a === b);    // false (일치 연산자는 type까지 비교)
  ```

---

# 조건문 : if, else

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

---

# 논리 연산자

- || : OR
  ```javascript
  const name = "Mike";
  const age = 30;

  if (name === 'Tom' || age > 19) {
    console.log('pass'):
  }

  // 결과는 pass 출력
  ```
  - 여러개 중 하나라도 true면 true 반환
    - == 모든 값이 false일 때만 false 반환
  - 첫번째 true를 발견하는 즉시 평가를 멈춤
- && : AND
  ```javascript
  const name = "Mike";
  const age = 30;

  if (name === 'Tom' && age > 19) {
    console.log('pass'):
  } else {
    console.log('fail'):
  }

  // 결과는 fail 출력
  ```
  - 모든 값이 true면 true 반환
    - == 하나라도 false면 false를 반환
  - 첫번째 false를 발견하는 즉시 평가를 멈춤
- ! : NOT
  ```javascript
  const age = prompt('How old are you?');
  const isAdult = age > 19;

  if (!isAdult) {
    console.log('fail'):
  } else {
    console.log('pass'):
  }
  ```
  - true면 false
  - false면 true
- 성능 최적화를 위해서 적절한 조합이 필요
  - ex) 운전면허가 있고 시력이 좋은 여군을 찾는 program
    - 운전면허가 있고 : 전체 군인의 80%
    - 시력이 좋은 : 전체 군인의 60%
    - 여군 : 전체 군인의 7%
  - 결과 : 여군인데 시력이 좋고 운전면허가 있는 사람
- 우선순위
  - NOT > AND > OR
  - 남자이고, 이름이 Mike이거나 성인이면 통과
    ```javascript
    const gender = 'M';
    const name = 'Jane';
    const isAdult = true;

    if (gender === 'M' && (name === 'Mike' || isAdult)) {
      console.log('pass');
    } else {
      console.log('fail');
    }
    ```

---

# 반복문

### for

```javascript
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

### while

```javascript
let i = 0;

while (i < 10) {
  console.log(i);
  i++;
}
```

### do.. while

- while : 조건을 검사하고 실행
- do while : 일단 실행하고 조건 검사

```javascript
let i = 0;

do {
  console.log(i);
  i++;
} while (i < 10)
```

### break, continue

- break : 멈추고 빠져나옴
  ```javascript
  while (true) {
    let answer = confirm('continue?');
    if (!answer) {
      break;
    }
  }
  ```
- continue : 멈추고 다음 반복으로 진행 (빠져나오지 않음)
  ```javascript
  for (let i = 0; i < 10; i++) {
    if (i % 2) {
      continue;
    }
    console.log(i);
  }
  ```

---

# switch

- 각 case마다 brreak로 탈출하지 않으면 이후의 모든 case를 실행함
```javascript
switch (평가) {
  case A :
    // A일 때 code
  case B :
    // B일 때 code
  ...
}

if (평가 == A) {
  // A일 때 code
} else if {
  // B일 때 code
} ...
```
- 사고 싶은 과일을 물어보고 가격 알려주는 program
  - 사과 100원, 바나나 200원, 키위 300원, 멜론 500원, 수박 500원 
  ```javascript
  let fruit = prompt('what fruit do you want?')

  switch (fruit) {
    case '사과' :
      console.log('100원');
      break;
    case '바나나' :
      console.log('200원');
      break;
    case '키위' :
      console.log('300원');
      break;
    case '멜론' :
    case '수박' :
      console.log('500원');
      break;
    default :
      console.log('no fruit');
  ```

---

# 함수 (함수 선언문)

- 한 번에 한 작업에 집중
- 읽기 쉽고 어떤 동작인지 알 수 있게 naming
  - showError  // error를 보여줌
  - getName  // 이름을 얻어옴
  - createUserData  // user data 생성
  - checkLogin  // login 여부 체크

### 함수의 기본적인 구조 & 보기좋게 만들기

```javascript
function sayHello(name) {
  let msg = 'Hello';
  if (name) {
    msg += ', ' + 'name';
    // msg += `, ${name}`;
  }

  console.log(msg);
}

sayHello();    // Hello : name의 값이 undefined이므로 조건문의 code는 실행되지 않음
sayHello('Mike');    // Hello, Mike
```
```javascript
function sayHello(name) {
  let new_name = name || 'friend';
  let msg = `Hello, ${new_name}`;

  console.log(msg);
}

sayHello();    // Hello, friend
sayHello('Mike');    // Hello, Mike

// name의 값이 undefined일 때 false가 되고, OR는 마지막 true를 반환하기 때문에 이름이 나올 수 있음
```
```javascript
function sayHello(name = 'friend') {    // default값 주기
  let msg = `Hello, ${name}`;

  console.log(msg);
}

sayHello();    // Hello, friend
sayHello('Mike');    // Hello, Mike
```

### return으로 값 반환

```javascript
function add(num1, num2) {
  return num1 + num2;
}

const result_add = add(2, 3);
console.log(result_add);    // 5


function showError() {
  alert('error');
}

const result_error = showError();
console.log(result_error);    // undefined


function returnNothing() {
  return;
  alert('이 code는 절대 실행되지 않음');
}

const result_nothing = returnNothing();
console.log(result_nothing);    // undefined
```

---

# 함수 표현식, 화살표 함수(arrow functino)

### 함수 선언문 vs 함수 표현식

- 함수 선언문
  ```javascript
  function sayHello() {
    console.log('Hello');
  }
  ```
  - 어디서든 호출 가능
    - javascript는 interpreter 언어라서 한 줄씩 차례대로 읽지만, hoisting 해놓기 때문에 가능
      - 실행 전 초기화 단계에서, code의 모든 함수 선언문을 찾아서 생성해 놓음
      - 그래서 함수 선언 위치보다 위에서 호출할 수 있음
      - code 위치가 실제로 올라가는 것은 아님
- 함수 표현식
  ```javascript
  let sayHello = functino() {
    console.log('Hello');
  }
  ```
  - 이름이 없는 함수를 만들고, 변수를 선언해서 함수를 할당
  - 함수 선언문과 실행 방식, 동작 방식 모두 동일
  - javascript가 한 줄씩 읽으면서 실행하고 해당 code에 도달해야 비로소 함수 생성됨 : 함수 선언문의 차이점
    - 따라서, 선언 이후에만 호출 가능

### 화살표 함수 (arrow function)

```javascript
let add1 = (num1, num2) => {
  return num1 + num2;
}

// code 본문이 한 줄이고 return문이 있기 때문에, return 생략 가능
let add2 = (num1, num2) => (
  num1 + num2;
)

// return문이 한 줄이라면, 괄호 생략 가능
let add3 = (num1, num2) => num1 + num2;

// return문이 있다해도, return 전에 여러 줄의 code가 있을 경우, 일반 괄호를 사용할 수 없음
let add4 = (num1, num2) {
  const result = num1 + num2;
  return result;
}

// 인수가 하나라면, 매개변수의 괄호 생략 가능
let sayHello = name => `Hello, ${name}`;

// 인수가 없는 함수라면, 괄호 생략 불가능
let showError = () => {
  alert('error');
}
```

---

# Object (객체)

```javascript
// 선언
const superman = {
  name: 'clark',
  age: 33,
}

// 접근
console.log(superman.name);    // "clark"
console.log(superman['age']);    // 33

// 추가
superman.gender = 'male';
superman['hair_color'] = 'black';

// 삭제
delete superman.hair_color;

// property 존재 여부 확인
console.log(superman.birth_day);    // undefined
console.log('birth_day' in superman);    // false
console.log('age' in superman);    // true

// for ... in 반복문
for (let key in superman) {
  console.log(key);
  console.log(superman[key]);
}
```
- 단축 property
  ```javascript
  const name = 'clark';
  const age = 33;

  const superman = {
    name,    // name: name
    age,    // age: age
    geneder: 'male',
  }
  ```
- ex) 이름과 나이를 받아서 객체를 반환하는 함수
  ```javascript
  function makeObject(name, age) {
    return {
      name : name,    // 축약형으로 name이라고 써도 됨
      age : age,    // 축약형으로 age로 써도 됨
      hubby : "football"
    };
  }

  const Mike = makeObject("Mike", 30);
  console.log(Mike);    // Object형 반환
  ```
- ex) 객체 내의 값을 검사하는 함수
  ```javascript
  function isAdult(user) {
    if (!('age' in user) || user.age < 20) {
      return false;
    }
    return true;
  }

  const Mike = {
    name : "Mike",
    age : 30
  };

  const Jain = {
    name: "Jain"
  };

  console.log(isAdult(Mike));
  console.log(isAdult(Jane));
  ```

---

# Object - method, this

### method : 객체 property로 할당된 함수

```javascript
const superman = {
  name : 'clark',
  age : 33,
  fly : function () {
    console.log('super fly!');
  },
  eat() {
    console.log('super eat!');
  },    // method 단축 구문
  introduce: function () {
    console.log(`Hello, I'm ${this.name}`);
  }
}

superman.fly();    // "super fly!"
superman.eat();    // "super eat!"
```

### this

- 객체 자기 자신을 가리킴
```javascript
let boy = {
  name : 'Mike',
  sayHello : function () {
    console.log(`Hello, I'm ${this.name});
  },
}

let girl = {
  name : 'Jane',
  sayHello : function () {
    console.log(`Hello, I'm ${this.name});
  },
}

boy.sayHello();    // "Hello, I'm Mike"
girl.sayHello();    // "Hello, I'm Jane"
```
- 화살표 함수는 일반 함수와는 달리 자신만의 this를 가지지 않음
  - 화살표 함수 내부에서 this를 사용하면, 그 this는 외부에서 값을 가져 옴
  ```javascript
  let boy = {
    name : 'Mike',
    sayThis : () => {
      console.log(this);
    },
  }

  boy.sayThis();    // this는 boy를 가리키지 않고 전역 객체(Window)를 가리키게 됨
  ```

---

# Array (배열)

- 순서가 있는 list 
  ```javascript
  let students = ['철수', '영희', ... '영수'];

  console.log(students[0]);    // 철수
  console.log(students[1]);    // 영희
  console.log(students[29]);    // 영수

  student[0] = '민정';
  console.log(students[0]);    // 민정
  ```
- 배열은 문자 뿐만 아니라, 숫자, 객체, 함수 등도 포함할 수 있음
  ```javascript
  let arr = [
    '민수',
    3,
    false,
    {
      name : 'Mike',
      age : 30,
    },
    function () {
      console.log('TEST');
    }
  ];
  ```
- length : 배열의 길이
  ```javascript
  students.length    // 30
  ```
- push() : 배열 끝에 추가
  ```javascript
  let days = ['월', '화', '수'];

  days.push('목');
  console.log(days);    // ['월', '화', '수', '목']
  ```
- pop() : 배열 끝 요소 제거
  ```javascript
  let days = ['월', '화', '수'];

  days.pop();
  console.log(days);    // ['월', '화']
  ```
- shift, unshift : 배열 앞에 제거/추가
  ```javascript
  let days = ['월', '화', '수'];

  days.unshift('일');
  console.log(days);    // ['일', '월', '화', '수']

  days.shift();
  console.log(days);    // ['월', '화', '수']

  days.unshift('금', '토', '일');
  console.log(days);    // ['금', '토', '일', '월', '화', '수']
  ```
- 반복문 : for
  ```javascript
  let days = ['월', '화', '수'];

  for (let index = 0; index < days.length; index++) {
    console.log(days[index]);
  }
  ```
- 반복문 : for ... of
  - index를 못 얻는다는 단점 
  - for ... in 과 헷갈려서는 안됨
    - for ... in은 배열에서의 사용이 권장되지 않음
  ```javascript
  let days = ['월', '화', '수'];

  for (let day of days) {
    console.log(day);
  }
  ```

---

# 변수

### var

- 한 번 선언된 변수를 다시 선언할 수 있음
  ```javascript
  var name = 'Mike';
  console.log(name);    // "Mike"

  var name = 'Jane';
  console.log(name);    // "Jane"
  ```
- 선언하기 전에 사용할 수 있음 : error를 일으키지 않음
  ```javascript
  console.log(name);    // undefined
  
  var name = 'Mike';
  ```
  - 이렇게 동작함 (Hoisting)
    ```javascript
    var name;

    console.log(name);    // undefined
    
    name = 'Mike';    // 선언은 hoisting되지만, 할당은 hoistring되지 않음
    ```
- var의 생성 과정
  0. 선언 및 초기화 단계
  1. 할당 단계
  - 선언과 초기화가 동시에 되기 때문에 할당 전에 호출하면 error을 낳지 않고 undefined를 출력
- 함수 scope (function-scoped)

### let

- 한 번 선언된 변수를 다시 선언할 수 없음
  ```javascript
  let name = 'Mike';
  console.log(name);    // "Mike"

  let name = 'Mike';    // error
  console.log(name);
  ```
- 선언하기 전에 사용할 수 없음
  ```javascript
  console.log(name);    // ReferenceError
  
  let name = 'Mike';
  ```
  - let과 const도 hoisting 됨 : hoisting이 되지 않는다고 착각하면 안됨
    - 그러나 var처럼 동작하지 않고 error를 발생시키는 것은 TDZ; Temporal Dead Zone 때문
      - TDZ에 있는 변수들은 사용할 수 없으며, let과 const는 TDZ의 영향을 받음
      - 할당받지 않은 변수는 사용할 수 없음 -> code를 예측 가능하게 하고 잠재적인 bug를 줄일 수 있음
- hoisting
  - scope 내부 어디에서든 변수 선언은 최상위에서 선언된 것처럼 행동한다는 뜻
  - hoisting은 scope 단위로 일어남
  ```javascript
  let age = 30;

  function showAge() {
    console.log(age);

    let age = 20;    // error
  }
  ```
    - 여기서 scope는 showAge() 내부
    - let으로 선언한 두번째 age 변수가 hoisting을 일으킴
    - 만약 hoisting이 되지 않았다면 함수 바깥에 선언한 age = 30이 정상으로 찍혀야 함
- let의 생성 과정
  1. 선언 단계
  2. 초기화 단계
  3. 할당 단계
  - hoisting되면서 선언 단계가 이루어지지만, 초기화 단계는 실제 code에 도달했을 때이기 때문에 ReferenceErorr가 발생
- block scope (bock-scoped)

### const

- 한 번 선언된 변수를 다시 선언할 수 없음
- const의 생성 과정
  1. 선언 + 초기화 + 할당
  - 선언과 할당이 동시에 되어야 함
    - let과 var는 값을 바꿀 수 있기 때문에 선언만 해두고 나중에 할당하는 것이 허용됨
  ```javascript
  let name;
  name = 'Mike'

  var age;
  age = 30;

  const gender;    // Uncaught SyntaxError: Missing initializer in const declaration
  gender = 'male';
  ```
- block scope (block-scoped)

### Block Scope vs 함수 Scope

- block scope
  - 모든 code block에서 선언된 변수는 code block 내에서만 유효하며 외부에서는 접근할 수 없다는 의미
    - 즉, code block 내부에서 선언한 변수는 지역변수
  - code block : 함수, if문, for문, while문, try-catch문 등
  ```javascript
  functon add() {
    // Block-level Scope
  }

  if () {
    // Block-level Scope
  }

  for (let i = 0; i < 10; i++) {
    // Block-level Scope
  }
  ```

- 함수 scope
  - 함수 내에서 선언된 변수만 그 지역변수가 되는 것
  ```javascript
  const age = 30;

  if(age > 19) {
    var txt = '성인';
  }

  console.log(txt);    // "성인"
  ```
    - if문 안에서 var로 선언한 변수는 if문 밖에서도 사용이 가능함
      - let과 const는 이렇게 사용할 수 없음 (중괄호 내부에서만 사용 가능)
  ```javascript
  function add(num1, num2) {
    var result = num1 + num2;
  }

  add(2, 3);

  console.log(result);    // error
  ```
    - var도 이렇게 함수 내에서 선언되면 함수 밖에서 사용할 수 없음
      - 유일하게 벗어날 수 없는 scope가 함수

---

# 생성자 함수

```javascript
function User(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = functino () {
    console.log(this.name);
  }
}

let user1 = new User('Mike', 30);
let user2 = new User('Jane', 22);
let user3 = new User('Tom', 17);
let user5 = new User('Han', 40);

user5.sayName();    // "Han"
```
- 첫 글자를 대문자로 해서 함수로 만들어줌
- new 연산자를 사용해서 함수를 호출
- 붕어빵틀, 와플팬
  - 필요한 재료를 넣어주고 찍어내는 것 : 이름, 나이
  - 와플, 붕어빵 : 객체
- 보통 객체 literal로 객체를 만들지만, 비슷한 객체를 만들어야 할 때 생성자 함수를 사용
  ```javascript
  // 객체 literal
  let user = {
    name : 'Mike',
    age : 30,
  }
  ```
- 함수 호출 시 new를 안 붙이면?
  - 단지 return값이 없는 함수를 호출만하기 때문에 undefined 반환

### 생성자 함수의 동작 과정

```javascript
function User(name, age) {
  // this = {}    // 2 : 일단 빈 객체를 만들고 this에 할당 (실제로 code에는 없음)

  this.name = name;    // 3 : this에 property 추가
  this.age = age;    // 3 : this에 property 추가

  return this;    // 4 : this 반환
}

new user = User('Mike', 30);    // 1 : 생성자 함수 호출
```

---

# Object methods / Computed property

### Conputed property

```javascript
let a = 'age';

const user = {
  name : 'Mike',
  [a] : 30,    // computed property : 변수 a에 할당된 값이 들어감
}
```
```javascript
const user = {
  [1 + 4] : 5,
  ["안녕" + "하세요"] : "Hello",
}
```
```javascript
functino makeObj(key, val) {
  return {
    [key] : val
  }
}

const obj = makeObj('나이', 33);    // 어떤 것이 key가 될 지 모르는 객체를 만들 때 유용함
```

### Object methods

- Object.assign() : 객체 복제
  ```javascript
  const user = {
    name : 'Mike',
    age : 30,
  }

  const clone_user_1 = user;    // 복제가 된 것이 아님 (참조값만 복사)
    // user 변수에는 객체 자체가 들어가있는 것이 아님
    // user 변수엔 객체가 저장되어 있는 memory 주소(참조값)가 저장되어 있음
    // 이렇게 되면 clone_user_1의 값을 바꿨을 때, user의 이름도 같이 바뀜

  const clone_user_2 = Object.assign({}, user);    // 동일하게 복제
    // 첫번째 인자의 빈 객체는 초기값
    // 두번째 매개변수로 들어온 객체가 초기값에 병합됨
    // user가 병합되므로 복제됨
    // clone_user_2의 이름을 바꿔도 user의 이름은 변함 없음 (같은 객첵 아니기 때문)
  
  const clone_user_3 = Object.assign({gender : 'male'}, user);    // user에 gender 추가하여 복제
    // 성별값만 있는 객체가 user를 병합
    // 총 3개의 property를 가진 객체를 만듬

  const clone_user_4 = Object.assign({name : 'Tom'}, user);    // user의 name을 Tom으로 덮어써서 복제
  ```
  ```javascript
  const user = {
    name : 'Mike',
  }

  const info1 = {
    age : 30,
  }

  const info2 = {
    gender : 'male',
  }

  Object.assign(user, info1, info2);    // 여러 개도 병합 가능
  ```
- Object.keys() : key 배열 반환
  ```javascript
  const user = {
    name : 'Mike',
    age : 30,
    gender : 'male',
  }

  console.log(Object.keys(user));
    // ["name", "age", "gender"]
  ```
- Object.values() : 값 배열 반환
  ```javascript
  const user = {
    name : 'Mike',
    age : 30,
    gender : 'male',
  }

  console.log(Object.values(user));
    // ["Mike", 30, "male"]
  ```
- Object.entries() : key/값 배열 반환
  ```javascript
  const user = {
    name : 'Mike',
    age : 30,
    gender : 'male',
  }

  console.log(Object.entries(user));
    // [["name", "Mike"], ["age", 30], ["gender", "male"]]
  ```
- Object.fromEntries() : key/값 배열을 객체로
  ```javascript
  const arr = [
    ["name", "Mike"],
    ["age", 30],
    ["gender", "male"]
  ]

  console.log(Object.fromEntries(arr));
    // {name : 'Mike', age : 30, gender : 'male'}
  ```

---

# Symbol : 유일한 식별자

```javascript
const a = Symbol();    // new를 붙이지 않음
const b = Symbol();

console.log(a);    // Symbol()
console.log(b);    // Symbol()

console.log(a === b);    // false
console.log(a == b);    // false
```
- 유일성 보장
  ```javascript
  const id1 = Symbol('id');    // 설명을 붙여주면 debugging할 때 편함
  const id2 = Symbol('id');

  console.log(id1);    // Symbol(id)
  console.log(id2);    // Symbol(id)

  console.log(id1 === id2);    // false
  console.log(id1 == id2);    // false
  ```
- 이름 알아내기
  ```javascript
  const id = Symbol('id 입니다');
  console.log(id.description);    // "id 입니다"
  ```

### property key : Symbol형 vs 문자형

- property key : Symbol형
  ```javascript
  const id = Symbol('id');

  const user = {
    name : 'Mike',
    age : 30,
    [id] : 'myid'
  }

  console.log(user);    // {name : "Mike", age : 30, Symbol(id) : "myid"}
  console.log(user[id]);    // "myid"

  console.log(Object.keys(user));    // ["name", "age"]
  console.log(Object.values(user));    // "Mike", 30]
  console.log(Object.entries(user));    // [Array(2), Array(2)]
  for (let a in user) {...}    // 마찬가지로 건너뜀
  ```
  - 꽁꽁 숨겨져 있기 때문에 특정 위치의 원본 data를 건드리지 않고 속성을 추가할 수 있음
    ```javascript
    const user = {
      name : 'Mike',
      age : 30,
    }

    const id = Symbol('id');    // good
    user[id] = 'myid';    // good

    user.name = 'myname';    // bad
    user.a_key_no_one_used = 'hahaha';    // bad
    ```
    - 원본 data가 Object.keys나 for ... in으로 순회하면서 어디선가 data를  사용할 수도 있음
      - 이 때, 객체에 property를 추가하거나 변경하면 문제가 생길 수 있음
      - 내가 추가한 property가 어디서 어떻게 튀어나올지 예측할 수 없음
- property key : 문자형
  - 객체 property의 key는 기본적으로는 문자형으로 다루게 됨
  ```javascript
  const obj = {
    1 : '1입니다',
    false : '거짓',
  }

  console.log(Object.keys(obj));    // ["1", "false"]

  console.log(obj['1']);    // "1입니다"
  console.log(obj['false']);    // "거짓"
  ```

### Symbol.for() : 전역 Symbol

- 하나의 Symbol만 보장받을 수 있음
- 없으면 만들고, 있으면 가져오기 때문
- Symbol 함수는 매번 다른 Symbol값을 생성하지만,
  - Symbol.for method는 하나를 생성한 뒤 key를 통해 같은 Symbol을 공유
```javascript
const id1 = Symbol.for('id');
const id2 = Symbol.for('id');

console.log(id1 === id2);    // true
console.log(Symbol.keyFor(id1));    // "id"
```

### 숨겨진 Symbol key 보는 법

```javascript
const id = Symbol('id');

const user = {
  name : 'Mike',
  age : 30,
  [id] : 'myid',
}

console.log(Object.getOwnPropertySymbols(user));    // [Symbol(id)]
console.log(Reflect.ownKeys(user));    // ["name", "age", Symbol(id)]
```
- 대부분의 library나 내장 함수들은 Object.getOwnPropertySymbols나 Reflect.ownKeys 같은 method들을 사용하지 않음
  - 따라서 걱정하지 말고 유일한 property를 생성하고 싶을 때, Symbol을 사용하면 됨

### Symbol Example

```javascript
// 다른 개발자가 만들어 놓은 객체
const user = {
  name : 'Mike',
  age : 30,
};


// 내 작업
// user.showName = function () {};    // 다른 개발자의 작업물에 영향을 주어 예측할 수 없는 문제 발생 가능
const showName = Symbol("show name");
user[showName] = function () {
  console.log(this.name);
}

user[showName]();


// 사용자가 접속하면 보는 message
for (let key in user) {
  console.log(`His ${key} is ${user[key]}`);
}
```
- 만약 함수를 Symbol로 추가하지 않았다면, 아래 for문에서 key, value를 출력할 때 function까지 출력되었을 것

---

# Number, Math

- toString() : 10진수 -> 2진수/16진수
  ```javascript
  let num = 10;

  console.log(num.toString());    // "10"
  console.log(num.toString(2));    // "1010" : 2진수로 변환
  console.log(num.toString(16));    // "ff" : 16진수로 변환
  ```
- Math.PI; : 3.141592653589793...
- Math.ceil() : 올림
  ```javascript
  let num1 = 5.1;
  let num2 = 5.7;

  console.log(Math.ceil(num1));    // 6
  console.log(Math.ceil(num2));    // 6
  ```
- Math.floor() : 내림
  ```javascript
  let num1 = 5.1;
  let num2 = 5.7;

  console.log(Math.floor(num1));    // 5
  console.log(Math.floor(num2));    // 5
  ```
- Math.round() : 반올림
  ```javascript
  let num1 = 5.1;
  let num2 = 5.7;

  console.log(Math.round(num1));    // 5
  console.log(Math.round(num2));    // 6
  ```
- 소숫점 자릿수
  ```javascript
  let user_rate = 30.1234;
  // 요구사항 : 소수점 둘째 자리까지 표현 (셋째 자리에서 반올림)

  console.log(Math.round(user_rate * 100) / 100);    // 30.12

  console.log(user_rate.toFixed(2));    // "30.12"
  console.log(Number(user_rate.toFixed(2));    // 30.12
    // toFixed는 문자를 반환하므로 Number()를 이용하여 숫자로 바꿔줌
  console.log(Number(user_rate.toFixed(0));    // 30
  console.log(Number(user_rate.toFixed(6));    // 30.123400
  ```
- isNaN()
  ```javascript
  let x = Number('x');
  
  console.log(x == NaN);    // false
  console.log(x === NaN);    // false
  console.log(NaN == NaN);    // false

  console.log(isNaN(x));    // true
  console.log(isNaN(3));    // false
  ```
- parseint()
  ```javascript
  let margin = '10px';

  console.log(parseInt(margin));    // 10
  console.log(Number(margin));    // NaN


  let red_color = 'f3';

  console.log(parseInt(red_color));    // NaN : parseInt()는 숫자로 시작하지 않으면 NaN을 반환
  console.log(parseInt(red_color, 16));    // 243 : 16진수를 10진수로 변환하여 반환
  console.log(parseInt('11', 2);    // 3 : 2진수를 10진수로 변환하여 반환
  ```
- parseFloat()
  ```javascript
  let padding = '18.5%';

  console.log(parseInt(padding));    // 18
  console.log(parseFloat(padding));    // 18.5
  ```
- Math.random() : 0~1의 ramdom한 수
  ```javascript
  // 1 ~ 100 사이 임의의 숫자를 뽑고 싶다면?
  console.log(Math.floor(Math.random() * 100) + 1);    // 1 ~ 100 사이의 ramdom 숫자
  ```
- Math.max() & Math.min() : 최댓값 & 최솟값
  - MAXimum, MINimum
  ```javascript
  console.log(Math.max(1, 4, -1, 5, 10, 9, 5.54));    // 10
  console.log(Math.min(1, 4, -1, 5, 10, 9, 5.54));    // -1
  ```
- Math.abs() : 절대값
  - ABSolute
  ```javascript
  console.log(Math.abs(-1));    // 1
  ```
- Math.pow(n, m) : 제곱
  - POWer
  ```javascript
  console.log(Math.pow(2, 10));    // 1024
  ```
- Math.sqrt() : 제곱근
  - SQuare RooT
  ```javascript
  console.log(Math.sqrt(16));    // 4
  ```

---

# String Methods (문자열 methods)

- ' " `
  ```javascript
  let html = '<div class="box_title">제목 영역</div>';

  let desc = "It's 3 o'clock";

  let name = 'Mike';
  let result = `My name is ${name}`;
  let add = `2 + 3 = ${2+3}`
  ```
  ```javascript
  let desc1 = '오늘은 맑고 화창한\n날씨가 계속 되겠습니다.';

  let desc2 = `오늘은 맑고 화창한
  날씨가 계속 되겠습니다.`;    // desc1과 같은 결과

  let desc3 = '오늘은 맑고 화창한
  날씨가 계속 되겠습니다.';    // error
  ```
- length : 문자열 길이
  ```javascript
  let desc = '안녕하세요.';

  console.log(desc.length);    // 6
  console.log(desc[2]);    // "하" : 특정 위치에 접근

  desc[4] = '용';
  console.log(desc);    // "안녕하세요." : 변화 없음
  ```
- toUpperCase() / toLowerCase()
  ```javascript
  let desc = "Hi guys. Nice to meet you.";

  console.log(desc.toUpperCase());    // "HI GUYS. NICE TO MEET YOU."
  console.log(desc.toLowerCase());    // "hi guys. nice to meet you."
  ```
- str.indexOf(text) : 문자열을 인수로 받아 몇번째에 위치하는지 알려줌
  ```javascript
  let desc = "Hi guys. Nice to meet you.";
  
  desc.indexOf('to');    // 14
  desc.indexOf('man');    // -1

  if (desc.indexOf('Hi') > -1) {
    console.log('Hi가 포함된 문장입니다.');
  }    // desc.indexOf('Hi)는 0(false)이므로 -1보다 큰지 비교
  ```
  ```javascript
  // 금칙어 : 콜라

  function hasCola(str) {
    if (str.indexOf('콜라') > -1) {
    // if (str.includes('콜라')) {    // 이것도 가능
      console.log('금칙어가 있습니다');
    } else {
      console.log('통과');
    }
  }

  hasCola('와 사이다가 짱이야!');    // 통과
  hasCola('무슨 소리, 콜라가 최고');    // 금칙어가 있습니다
  hasCola('콜라');    // 금칙어가 있습니다
  ```
- str.slice(n, m) : n부터 m까지의 문자열 반환
  - n
    - 시작점
  - m
    - 없으면 문자열 끝까지
    - 양수면 그 숫자까지 (포함하지 않음)
    - 음수면 끝에서부터 셈
  ```javascript
  let desc = "abcdefg";

  console.log(desc.slice(2));    // "cdefg"
  console.log(desc.slice(0, 5));    // "abcde"
  console.log(desc.slice(2, -2));    // "cde"
  ```
  ```javascript
  let list = [
    "01. 들어가며",
    "02. JS의 역사",
    "03. 자료형",
    "04. 함수",
    "05. 배열"
  ]

  let new_list = [];

  for (let i = 9; i < list.length; i++) {
    new_list.push(list[i].slice(4));
  }

  console.log(new_list);    // ["들어가며", "JS의 역사", "자료형", "함수", "배열"]
  ```
- str.substring(n, m) : n과 m 사이 문자열 반환
  - slice와 유사하지만, n과 m을 바꿔도 동작함
  - 음수 허용 x : 0으로 인식
  ```javascript
  let desc = "abcdefg";

  console.log(desc.substring(2, 5));    // "cde"
  console.log(desc.substring(5, 2));    // "cde"
  ```
- str.substr(n, m) : n부터 시작하여 m개를 가져옴
  - n부터 시작
  - m개를 가져옴
  ```javascript
  let desc = "abcdefg";

  console.log(desc.substr(2, 4));    // "cdef"
  console.log(desc.substr(-4, 2));    // "de"
  ```
- str.trem() : 앞 뒤 공백 제거
  ```javascript
  let desc = " coding        ";

  console.log(desc.trim());    // "coding"
  ```
- str.repeat(n) : n번 반복
  ```javascript
  let hello = "hello!";
  console.log(hello.repeat(3));    // "hello!hello!hello!"
  ```
- 문자열 비교
  - ASCII CODE대로 비교됨
  ```javascript
  console.log(1 < 3);    // true
  console.log("a" < "c");    // true

  console.log("a".codePointAt(0));    // 96
  console.log(String.fromCodePoint(97));    // "a"
  ```

---

# Array methods (배열 method)

- arr.splice(n, m) : 특정 요소 지움
  - n : 시작
  - m : 개수
  ```javascript
  let arr = [1, 2, 3, 4, 5];
  arr.splice(1, 2);

  console.log(arr);    // [1, 4, 5]
  ```
- arr.splice(n, m, x) : 특정 요소 지우고 추가
  ```javascript
  let arr = [1, 2, 3, 4, 5];
  arr.splice(1, 3, 100, 200);

  console.log(arr);    // [1, 100, 200, 5]
  ```
  ```javascript
  let arr = ["나는", "철수", "입니다"];
  arr.splice(1, 0, "대한민국", "소방관"];

  console.log(arr);    // ["나는", "대한민국", "소방관", "철수", "입니다"]
  ```
- arr.splice() : 삭제된 요소 반환
  ```javascript
  let arr = [1, 2, 3, 4, 5];
  let result = arr.splice(1, 2);

  console.log(arr);    // [1, 4, 5]
  console.log(result);    // [2, 3]
  ```
- arr.slice(n, m) : n부터 m까지 반환
  ```javascript
  let arr = [1, 2, 3, 4, 5];
  console.log(arr.slice(1, 4));    // [2, 3, 4]

  let arr_clone = arr.slice();
  console.log(arr_clone)    // [1, 2, 3, 4, 5]
  ```
- arr.concat(arr2, arr3, ...) : 합쳐서 새 배열 반환
  ```javascript
  let arr = [1, 2];

  console.log(arr.concat([3, 4]));    // [1, 2, 3, 4]
  console.log(arr.concat([3, 4], [5, 6]));    // [1, 2, 3, 4, 5, 6]
  console.log(arr.concat([3, 4], 5, 6));    // [1, 2, 3, 4, 5, 6]
  ```
- arr.forEach(fn) : 배열 반복
  ```javascript
  let users = ['Mike', 'Tom', 'Jane`'];

  users.forEach((item, index, arr) => {
    // ...
  });
  ```
  ```javascript
  let arr = ['Mike', 'Tom', 'Jane'];

  arr.forEach((name, index) => {
    console.log(`${index + 1}. ${name}`);
  });
  ```
- arr.indexOf / arr.lastIndexOc
  - 인수가 두 개인 경우, 두번째 인수는 시작 위치를 의미함
  ```javascript
  let arr = [1, 2, 3, 4, 5, 1, 2, 3];

  console.log(arr.indexOx(3));    // 2
  console.log(arr.indexOx(3, 3));    // 7

  console.log(arr.lastIndexOf(3);    // 7
  ```
- arr.includes() : 포함하는지 확인
  ```javascript
  let arr = [1, 2, 3];

  console.log(arr.includes(2));    // true
  console.log(arr.includes(8));    // false
  ```
- arr.find(fn)
  - 첫번째 true 값만 반환하고 끝
  - 만약 없으면 undefined를 반환
  ```javascript
  let arr = [1, 2, 3, 4, 5];
  
  const result = arr.find((item) => {
    return item % 2 === 0;
  });
  
  console.log(result);    // 2
  ```
  ```javascript
  let user_list = [
    { name: 'Mike', age: 30 },
    { name: 'Jane', age: 27 },
    { name: 'Tom', age: 10 },
  ];

  const result = user_list.find((user) => {
    if (user.age < 19) {
      return true;
    }
    return false;
  });

  console.log(result);    // {name: "Tom", age: 10}
  ```
- arr.findIndex(fn)
  - 해당 index를 반환
  - 없으면 -1 반환
  ```javascript
  let user_list = [
    { name: 'Mike', age: 30 },
    { name: 'Jane', age: 27 },
    { name: 'Tom', age: 10 },
  ];

  const result = user_list.findIndex((user) => {
    if (user.age < 19) {
      return true;
    }
    return false;
  });

  console.log(result);    // 2
  ```
- arr.filter(fn) : 만족하는 모든 요소를 배열로 반환
  ```javascript
  let arr = [1, 2, 3, 4, 5];
  
  const result = arr.filter((item) => {
    return item % 2 === 0;
  });
  
  console.log(result);    // [2, 4, 6]
  ```
- arr.reverse() : 역순으로 재정렬
  ```javascript
  let arr = [1, 2, 3, 4, 5];

  console.log(arr.reverse());    // [5, 4, 3, 2, 1]:
  ```
- arr.map(fn) : 함수를 받아 특정 기능을 실행하고 새로운 배열을 반환
  ```javascript
  let user_list = [
    { name: 'Mike', age: 30 },
    { name: 'Jane', age: 27 },
    { name: 'Tom', age: 10 },
  ];

  let new_user_list = user_list.map((user, index) => {
    return Object.assign({}, user, {
      id: index + 1,
      is_adult: user.age > 19,
    });
  });

  console.log(new_user_list);    // user_list에 id, is_adult property가 추가되어 객체 list가 반환됨
  ```
- arr.join() : 배열 문자열로 합치기
  ```javascript
  let arr = ["안녕", "나는", "철수야"];

  let result = arr.join();
  let result_space = arr.join("  ");

  console.log(result);    // 안녕,나는,철수야 : 인자에 아무것도 없으면 쉼표(,)로 구분됨
  console.log(result_space);    // 안녕  나는  철수야
  ```
- arr.split() : 문자열을 나눠서 배열로 만들어줌
  ```javascript
  const users = "Mike,Jane,Tom,Tony";

  const result = users.split(",");
  
  console.log(result);    // ["Mike", "Jane", "Tom", "Tony"]
  ```
  ```javascript
  let str = 'Hello, My name is Mike.';

  const result = str.split("");
  
  console.log(result);    // ["H", "e", "l", "l", "o", ",", " ", "M", "y", " ", "N", "a", "m", "e", " ", "i", "s", " ", "M", "i", "k", "e", "."]
  ```
- Array.isArray() : 배열인지 확인
  - typeof는 배열을 객체라고 알려줌
    - 배열은 객체이기 때문
  ```javascript
  let user = {
    name: "Mike",
    age: 30,
  };

  let user_list = ["Mike", "Tom", "Jane"];

  console.log(typeof user);    // object
  console.log(typeof user_list);    // object

  console.log(Array.isArray(user);    // false
  console.log(Array.isArray(user_list);    // true
  ```
- arr.sort() : 배열 재정렬
  - 배열 자체가 변경되니 주의
  ```javascript
  let arr = [1, 5, 4, 2, 3];

  arr.sort();
  
  console.log(arr);    // [1, 2, 3, 4, 5]
  ```
  ```javascript
  let arr = ["a", "c", "d", "e", "b"];

  arr.sort();
  
  console.log(arr);    // ["a", "b", "c", "d", "e"]
  ```
  ```javascript
  let arr = [27, 8, 5, 13];

  arr.sort();
  
  console.log(arr);    // [13, 27, 5, 8] : 문자열로 인식했기 때문에 1, 2가 앞에 있는 숫자가 먼저 정렬됨
  ```
  ```javascript
  let arr = [27, 8, 5, 13];

  arr.sort((a, b) => {
    return a - b;
  });
  
  console.log(arr);    // [5, 8, 13, 27]
  ```
    - Lodash를 사용하면 _.sortBy(arr)로 위의 기능을 사용할 수 있음
      - https://lodash.com/
- arr.reduce(fn, n)
  - 첫번째 인수로 함수를 받음
    - (누적 계산값, 현재값) => { return 계산값 };
  - 두번째 인수는 초기값 (optional)
  ```javascript
  let arr = [1, 2, 3, 4, 5];

  let result = 0;
  arr.forEach(num => {
    result += num;
  });

  console.log(result);    // 15
  ```
  ```javascript
  let arr = [1, 2, 3, 4, 5];

  const result = arr.reduce((prev, cur) => {
    return prev + cur;
  }, 0);

  const result_init_100 = arr.reduce((prev, cur) => {
    return prev + cur;
  }, 100);

  console.log(result);    // 15
  console.log(result_init_100);    // 115
  ```
  ```javascript
  // 성인인 사람 이름 구하기

  let user_list = [
    { name: "Mike", age: 30 },
    { name: "Tom", age: 10 },
    { name: "Jane", age: 27 },
    { name: "Sue", age: 26 },
    { name: "Herry", age: 3 },
    { name: "Steve", age: 60 },
  ];

  let result = user_list.reduce((prev, cur) => {
    if (cur.age > 19) {
      prev.push(cur.name);
    }
    return prev;
  }, {});

  console.log(result);    // ["Mike", "Jane", "Sue", "Steve"]
  ```
  ```javascript
  // 나이의 합 구하기

  let user_list = [
    { name: "Mike", age: 30 },
    { name: "Tom", age: 10 },
    { name: "Jane", age: 27 },
    { name: "Sue", age: 26 },
    { name: "Herry", age: 3 },
    { name: "Steve", age: 60 },
  ];

  let result = user_list.reduce((prev, cur) => {
    return prev += cur.age;
  }, 0);

  console.log(result);    // 156
  ```
  ```javascript
  // 이름이 3자인 사람

  let user_list = [
    { name: "Mike", age: 30 },
    { name: "Tom", age: 10 },
    { name: "Jane", age: 27 },
    { name: "Sue", age: 26 },
    { name: "Herry", age: 3 },
    { name: "Steve", age: 60 },
  ];

  let result = user_list.reduce((prev, cur) => {
    if (cur.name.length === 3) {
      prev.push(cur.name);
    }
    return prev;
  }, []);

  console.log(result);    // ["Tom", "Sue"]
  ```
- arr.reduceRight()
  - arr.reduce()와 기능이 같으나 맨 오른쪽부터 시작하여 누적

---

# 구조 분해 할당 (destructuring assignment)

- 배열이나 객체의 속성을 분해해서 그 값을 변수에 담을 수 있게 하는 표현식

### 배열 구조 분해

```javascript
let [x, y] = [1, 2];

console.log(x);    // 1
console.log(y);    // 2
```
```javascript
let users = ['Mike', 'Tom', 'Jane'];

let [user1, user2, user3] = users;
  // let user1 = users[0];
  // let user2 = users[1];
  // let user3 = users[2];

console.log(user1);    // "Mike"
console.log(user2);    // "Tom"
console.log(user3);    // "Jane"
```
```javascript
let str = "Mike-Tom-Jane";

let [user1, user2, user3] = str.split('-');

console.log(user1);    // "Mike"
console.log(user2);    // "Tom"
console.log(user3);    // "Jane"
```
- 기본값
  ```javascript
  //let [a, b, c] = [1, 2];    // c는 undefined가 됨

  let [a=3, b=4, c=5] = [1, 2];    // 기본값을 설정해두면
  
  console.log(a);    // 1
  console.log(b);    // 2
  console.log(c);    // 5
  ```
- 일부 반환값 무시
  ```javascript
  let [user1, , user2] = ['Mike', 'Tom', 'Jane', 'Tony'];

  console.log(user1);    // 'Mike'
  console.log(user2);    // 'Jane'
  ```
- 바꿔치기
  ```javascript
  let a = 1;
  let b = 2;

  let c = a;
  a = b;
  b = c;
  ```
  ```javascript
  let a = 1;
  let b = 2;

  [a, b] = [b, a];
  ```

### 객체 구조 분해

```javascript
let user = {name: 'Mike', age: 30};

let {name, age} = user;    // 'let {age, name} = user;'도 동일하게 동작함
  // let name = user.name;
  // let age = user.age;

console.log(name);    // "Mike"
console.log(age);    // 30
```
- 새로운 변수 이름으로 할당
  ```javascript
  let user = {name: 'Mike', age: 30};

  let {name: userName, age: userAge} = user;

  console.log(userName);    // "Mike"
  console.log(userAge);    // 30
  ```
- 기본값
  ```javascript
  let user = {name: 'Mike', age: 30};

  // let {name, age, gender} = user;    // user에 gender값이 없어 undefined가 들어감
  let {name, age, gender = 'male'} = user;

  console.log(gender);    // 'male'
  ```
  ```javascript
  let user = {
    name: 'Mike',
    age: 30,
    gender: 'female'
  };

  let {name, age, gender = 'male'} = user;

  console.log(gender);    // 'female'
  ```

---

# 나머지 매개변수(rest parameters), 전개 구문(spread syntax)

### 나머지 매개변수 (rest parameters)

```javascript
// javascript에서 함수에 넘겨주는 인수의 갯수는 제한이 없음
// 인수의 갯수를 정해놓고 함수를 만들어도 실제 호출할 때 정확히 그 갯수를 맞출 필요는 없음

function showName(name) {
  console.log(name);
}

shoeName('Mike');    // "Mike"
showName('Mike', 'Tom');    // ?

showName();    // undefined : error가 아님
```
```javascript
functino showName(...names) {
  console.log(names);
}

showName();    // [] : undefined가 아니라 빈 배열
showName('Mike');    // ['Mike']
showName('Mike', 'Tom');    // ['Mike', 'Tom']
```
```javascript
functionn add(...numbers) { 
  let result = 0;
  numbers.forEach(num => (result += num));    // 배열의 method 사용 가능
  console.log(result);
}

add(1, 2, 3);    // 6
add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);    // 55
```
```javascript
functionn add(...numbers) { 
  let result = numbers.reduce((prev, cur) => prev + cur);
  console.log(result);
}

add(1, 2, 3);    // 6
add(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);    // 55
```
```javascript
function User(name, age, ...skills) {    // 나머지 매개변수는 항상 마지막에 위치해야함
  this.name = name;
  this.age = age;
  this.skills = skills;
}

const user1 = new User('Mike', 30, 'HTML', 'CSS');
const user2 = new User('Tom', 20, 'JavaScript', 'React');
const user3 = new User('Jane', 10, 'English);

console.log(user1);
  // {name: "Mike", age: 30, skills: ["HTML", "CSS"]}
console.log(user2);
  // {name: "Tom", age: 20, skills: ["JavaScript", "React"]}
console.log(user3);
  // {name: "Jane", age: 10, skills: ["English"]}
```
- arguments를 대신 사용할 수 있음 : 옛날 방법
  - 함수로 넘어온 모든 인수에 접근
  - 함수 내에서 이용 가능한 지역변수
  - length / index
  - Array 형태의 객체
  - 배열의 내장 method 없음 (forEach, map)
  ```javascript
  function showName(name) {
    console.log(arguments.length);
    console.log(arguments[0]);
    console.log(arguments[1]);
  }

  showName('Mike', 'Tom');
    // 2
    // 'Mike'
    // 'Tom'
  ```

### 전개 구문(Spread syntax)

- 배열
  ```javascript
  // arr.push(), arr.splice(), arr.concat() 대신 사용 가능

  let arr1 = [1, 2, 3];
  let arr2 = [4, 5, 6];

  let result1 = [...arr1, ...arr2];
  let result2 = [0, ...arr1, ...arr2, 7, 8, 9];

  console.log(result1);    // [1, 2, 3, 4, 5, 6]
  console.log(result2);    // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  ```
  ```javascript
  // arr1을 [4, 5, 6, 1, 2, 3]으로

  let arr1 = [1, 2, 3];
  let arr2 = [4, 5, 6];

  // arr2.reverse().forEach((num) => {    // arr2를 역순 정렬하고 넣어야 원하는 순서대로 들어감
  //   arr1.unshift(num);
  // });

  arr1 = [...arr2, ...arr1];    // 편하게 구현 가능

  console.log(arr1);    // [4, 5, 6, 1, 2, 3]
  ```
- 겍체
  ```javascript
  let user = {name: 'Mike'}
  let mike = {...user, age: 30}

  coinsole.log(mike);    // {name: "Mike", age: 30}
  ```
  ```javascript
  let user = { name: "Mike" };
  let info = { age: 30 };
  let fe = ["JavaScript", "React"];
  let lang = ["Korean", "English"];

  // user = Object.assign({}, user, info, {
  //   skills: []
  // });

  // fe.forEach((item) => {
  //  user.skills.push(item);
  // };
  // lang.forEach((item) => {
  //   user.skills.push(item);
  // };

  user = {
    ...user,
    ...info,
    skills: [...fe, ...lang]
  };    // 훨씬 간단해짐

  console.log(user);
    // {name: "Mike", age: 30, skills: ["JavaScript", "React", "Korean", "English"]}
  ```
- 복제
  ```javascript
  let arr1 = [1, 2, 3];
  let arr2 = [...arr1];    // [1, 2, 3]

  let user1 = {name: 'Mike', age: 30}
  let user2 = {...user}

  user2.name = 'Tom';

  console.log(user1.name);    // "Mike"
  console.log(user2.name);    // "Tom"
  ```

---

# Closure

- 함수와 lexical 환경의 조합
- 함수가 생성될 당시으 외부 변수를 기억
- 생성 이후에도 계속 접근 가능
  - 외부 함수의 실행이 끝나서 외부 함수가 소멸된 이후에도 내부 함수가 외부 함수의 변수에 접근할 수 있음
```javascript
function makeCounter() {
  let num = 0;

  return function () {
    return num++;
  }
}

let counter = makeCounter();

console.log(counter());    // 0
console.log(counter());    // 1
console.log(counter());    // 2
```
  - makeCounter가 return하는 함수(num++)는 숫자를 반환함
    - num++함수는 숫자를 반환하는데, 이는 외부 함수의 변수임
  - 실행하면 초기값 0, 한번 더하면 1, 계속해서 2, 3이 나옴
  - 내부 함수에서 외부 함수의 변수(num)에 접근하고 있음
    - 생성된 이후에 계속 기억하고 있음
  - 결과로 나오는 숫자들을 수정할 수 없음
    - 오로지 counter를 증가시키고 반환받음 -> 은닉화 성공
    - 갑자기 99를 반환하거나 100을 증가시키는 것이 불가능함

### Lexical 환경 (어휘적 환경)

- javascript는 어휘적 환경(lexical environment)을 가짐
```javascript
// A

let one;
one = 1;

funcrtion addone(num) {
  console.log(one + num);
}

addone(5);
```
  1. A
    - hoisting : code가 실행되면 script 내에서 선언한 변수들이 lexical 환경에 올라가게됨
      - let으로 선언된 변수도 hoisting됨 : lexical 환경으로 올라가지만 초기화가 안되었을 뿐
        - 그래서 사용은 못 함
      - 함수 선언문은 변수와 달리 바로 초기화 됨 : A 위치에서도 사용이 가능함
        - 단, 변수에 할당하는 함수 표현식은 안됨
  1. 'let one;'
    - 아직 할당은 안 되어있기 때문에 초기값으로 undefined가 들어감 
      - 사용을 해도 error는 발생하지 않음 (값이 undefined일 뿐)
  2. 'one = 1;'
    - one에 숫자 1이 할당됨
  3. 'function ~'
    - 함수 선언은 초기에 이미 완료된 상태라 그냥 넘어감
  4. 'addOne(5);'
    - 함수 실행 : 이 순간 새로운 lexical 환경이 만들어짐
      - 함수가 넘겨받은 매개변수와 지역변수들이 저장됨
        - num: 5
      - 함수가 호출되는 동안 함수에서 만들어진 내부 lexical 환경과 외부에서 받은 전역 lexical 환경을 가짐
        - 내부 lexical 환경은 외부 lexical 환경에 대한 참조를 가짐
          - 지금 상황에서는 addOne 함수의 외부 lexical 환경이 전역 lexical 환경임
      - code에서 변수를 찾을 때, 내부에서 찾고, 없으면 외부에서 찾고, 또 없으면 전역 lexical 환경까지 범위를 넓혀서 찾음
        1. 이 code에선 one과 num을 일단 내부 lexical 환경에서 찾음
        2. num은 찾았지만 one이 없으므로 외부로 넓혀서 있는지 찾게 됨
        3. 찾은 값들을 더하기
```javascript
function makeAdder(x) {
  return function (y) {
    return x + y;;;
  }
}

const add3 = makeAdder(3);

console.log(add3(2));
```
  1. 최소 실행 시, makeAdder 함수와 add3 변수는 '젼역 lexical 환경'에 들어감
    - 전역 lexical 환경
      - makeAdder : function
      - add3 : 초기화 안된 상태, 사용할 수 없음
  2. 'const add3 = makeAdder(3);'이 실행될 때, makeAdder 함수가 실행되면서 'makeAdder lexical 환경'이 생성됨
    - 넘겨받은 매개변수와 지역변수 들이 저장됨
      - 전달받은 x의 값이 들어감
    - makeAdder lexical 환경
      - x : 3
  3. 함수가 실행되어 add3은 초기화되고, '전역 lexical 환경'으로 들어감
    - 전역 lexical 환경
      - makeAddr : function
      - add3 : function
  4. 마지막 줄 실행
    - add3을 실행하면 makeAdder가 실행되는데 이때 또 '익명함수 lexical 환경'이 만들어짐 
    - 익명함수 lexical 환경
      - y : 2
    - makeAdder 실행
      - x + y
        - x와 y를 찾아야 함
          - y는 있음
          - x가 없으니 참조하는 '외부 lexical 환경'으로 가서 찾음
  - makeAdder의 반환값이 되는 익명함수는 자신이 y를 가지고 있고 상위 함수인 makeAdder의 매개변수 x에 접근할 수 있음
    - add3 함수가 생성된 이후에도 변함없이 상위 함수를 호출할 때 사용했던 인수에 접근 가능 -> 이것을 Clouser라고 함

---

# setTimeout / setInterval

### setTimeout

- 일정 시간이 지난 후 함수를 실행
- 첫번째 매개변수 : 일정 시간이 지난 후 실행하는 함수
- 두번째 매개변수 : 시간
- 세번째 매개변수 : 필요한 인수
```javascript
// 3초 후에 log를 찍어줌

// function fn() {
//   console.log(3);
// }

// setTimeout(fn, 3000);

setTimeout(function () {
  console.log(3);
}, 3000);
```
```javascript
function showName(name) {
  console.log(name);
}

setTimeout(showName, 3000, 'Mike');    // 'Mike'는 showName 함수의 인자로 들어감
```
- clearTimeout() : 예정된 작업을 없앰
  - setTimeout은 time id를 반환
    - 이를 이용하여 scheduling을 취소할 수 있음
  ```javascript
  const tid = function showName(name) {
    console.log(name);
  }

  setTimeout(showName, 3000, 'Mike');

  clearTimeout(t_id);    // 3초가 지나기 전에 이 code가 실행되기 때문에 아무 일도 일어나지 않음
  ```

### setInterval

- 일정 시간 간격으로 함수를 반복
- setTimeout과 사용법이 동일
```javascript
function showName(name) {
  console.log(name);
}

const t_id = setInterval(showName, 3000, 'Mike');

// clearInterval(t_id);    // 중단
```
- 주의사항 : delay = 0?
  ```javascript
  setTimeout(functino () {
    console.log(2);
  }, 0);

  console.log(1);

  // 1
  // 2
  ```
    - delay time을 0으로 줘도 interval이 바로 실행되지는 않음 : 1 찍히고 2 찍힘
      - 현재 실행 중인 script가 종료된 이후 scheduling 함수를 실행하기 때문
      - 또한 browser는 기본적으로 4ms 정도의 대기 시간이 있음
        - delay time을 0이라고 적어도 4ms 또는 그 이상이 걸릴 수 있음
- example
  ```javascript
  // user가 접속하면, 접속한지 얼마나 되었는지 보여줌
  // 5초 동안 실행하다 중단

  let num = 0;

  function showTime() {
    console.log(`안녕하세요. 접속하신지 ${num++}초가 지났습니다.`);
    if (num > 5) {
      clearInterval(t_id);
    }
  }

  const t_id = setInterval(showTime, 1000);
  ```

---

# call, apply, bind

- 함수 호출 방식과 관계없이 this를 지정할 수 있음

### call

- 모든 함수에서 사용할 수 있으며, this를 특정값으로 지정할 수 있음
- 첫번째 매개변수 : this로 사용될 값
- 두번째 매개변수 ~ : 함수에서 사용할 매개변수를 차례대로 지정
```javascript
const mike = {
  name: "Mike",
};

const tom = {
  name: "Tom",
};

function showThisName() {
  console.log(this.name);
}

showThisName();    // "" : window.name이 나오기 때문
showThisName.call(mike);    // Mike
showThisName.call(tom);    // Tom

function update(birthYear, occupation) {
  this.birthYear = birthYear;
  this.occupation = occupation;
}

update.call(mike, 1999, "singer");
console.log(mike);    // {name: "Mike", birthYear: 1999, occupation: "singer"}

update.call(tom, 1999, "teacher");
console.log(tom);    // {name: "Tom", birthYear: 2002, occupation: "teacher"}
```

### apply

- 함수 매개변수를 처리하는 방법을 제외하면 call과 완전히 같음
- call은 일반적인 함수와 마찬가지로 매개변수를 직접 받지만, apply는 매개변수를 배열로 받음
```javascript
const mike = {
  name: "Mike",
};

const tom = {
  name: "Tom",
};

function showThisName() {
  console.log(this.name);
}

showThisName();    // "" : window.name이 나오기 때문
showThisName.call(mike);    // Mike
showThisName.call(tom);    // Tom

function update(birthYear, occupation) {
  this.birthYear = birthYear;
  this.occupation = occupation;
}

update.apply(mike, [1999, "singer"]);
console.log(mike);    // {name: "Mike", birthYear: 1999, occupation: "singer"}

update.apply(tom, [1999, "teacher"]);
console.log(tom);    // {name: "Tom", birthYear: 2002, occupation: "teacher"}
```
- 배열을 함수의 매개변수로 사용할 때 유용함
  ```javascript
  const nums = [3, 10, 1, 6, 4];

  const min_num = Math.min(...nums);
  const max_num = Math.max(...nums);

  console.log(max_num);    // 1
  console.log(nim_num);    // 10
  ```
  ```javascript
  const nums = [3, 10, 1, 6, 4];

  const min_num = Matn.min.apply(null, nums);    // Math를 this로 가져올 필요가 없으므로 null(아무거나)로 줌
    // = Math.min.apply(null, [3, 10, 1, 6, 4]);
  const max_num = Matn.max.apply(null, nums);
    // = Math.max.apply(null, [3, 10, 1, 6, 4]);

  // const min_num = Matn.min.call(null, ...nums);    // call일 때는 ...nums 필요
    // = Math.min.call(null, 3, 10, 1, 6, 4);
  // const max_num = Matn.max.call(null, ...nums);
    // = Math.max.call(null, 3, 10, 1, 6, 4);

  console.log(max_num);    // 1
  console.log(nim_num);    // 10
  ```
### bind

- 함수의 this값을 영구히 바꿀 수 있음
```javascript
const mike = {
  name: "Mike",
};

function update(birthYear, occupation) {
  this.birthYear = birthYear;
  this.occupation = occupation;
}

const update_mike = update.bind(mike);

update_mike(1980, "police");
console.log(mike);    // {name: "Mike", birthYear: 1980, occupation: "police"}
```
```javascript
const user = {
  name: "Mike",
  showName: function () {
    console.log(`hello, ${this.name}`);
  },
};

user.showName();    // "hello, Mike"

let fn = user.showName;

fn();    // "hello, " : fn에 할당할 때, this를 잃어버린 것
  // 점(.) 앞에 있는게 this인데, 호출할 때 fn()만 호출하니까 this가 없는 것

fn.call(user);    // "Hello, Mike"
fn.apply(user);    // "Hello, Mike"

fn.bound_fn = fn.find(user);
bound_fn();    // "Hello, Mike"
```

---

# 상속, prototype

































# Reference

- https://www.youtube.com/watch?v=KF6t61yuPCY
  - '자바스크립트 기초 강좌 : 100분 완성' - Youtube 코딩앙마
- https://www.youtube.com/watch?v=4_WLS9Lj6n4
  - '자바스크립트 중급 강좌 : 140분 완성' - Youtube 코딩앙마
