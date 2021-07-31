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

# Reference

- https://www.youtube.com/watch?v=KF6t61yuPCY
  - '자바스크립트 기초 강좌 : 100분 완성' - Youtube 코딩앙마
- https://www.youtube.com/watch?v=4_WLS9Lj6n4
  - '자바스크립트 중급 강좌 : 140분 완성' - Youtube 코딩앙마
