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
- 생성자 함수의 동작 과정
  ```javascript
  function User(name, age) {
    // this = {}    // 2 : 일단 빈 객체를 만들고 this에 할당 (실제로 code에는 없음)

    this.name = name;    // 3 : this에 property 추가
    this.age = age;    // 3 : this에 property 추가

    return this;    // 4 : this 반환
  }

  new user = User('Mike', 30);    // 1 : 생성자 함수 호출
  ```
- 함수 호출 시 new를 안 붙이면?
  - 단지 return값이 없는 함수를 호출만하기 때문에 undefined 반환

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

  Object.keys(user);
    // ["name", "age", "gender"]
  ```
- Object.values() : 값 배열 반환
  ```javascript
  const user = {
    name : 'Mike',
    age : 30,
    gender : 'male',
  }

  Object.values(user);
    // ["Mike", 30, "male"]
  ```
- Object.entries() : key/값 배열 반환
  ```javascript
  const user = {
    name : 'Mike',
    age : 30,
    gender : 'male',
  }

  Object.entries(user);
    // [["name", "Mike"], ["age", 30], ["gender", "male"]]
  ```
- Object.fromEntries() : key/값 배열을 객체로
  ```javascript
  const arr = [
    ["name", "Mike"],
    ["age", 30],
    ["gender", "male"]
  ]

  Object.fromEntries(arr);
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





























# Reference

- https://www.youtube.com/watch?v=KF6t61yuPCY
  - '자바스크립트 기초 강좌 : 100분 완성' - Youtube 코딩앙마
- https://www.youtube.com/watch?v=4_WLS9Lj6n4
