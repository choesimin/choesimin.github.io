---
layout: skill
title: TypeScript Primitive Type - String
date: 2024-02-28
---




## String(문자) Type

- TypeScript의 `string` type은 **text data를 다루기 위해 사용**됩니다.
    - `string` type은 Unicode 문자의 sequence를 나타내며, 이를 통해 text data를 표현, 저장, 조작할 수 있습니다.

- JavaScript와 마찬가지로, TypeScript에서 문자열은 **큰따옴표(`" "`), 작은따옴표(`' '`), 또는 백틱(`` ` ` ``)으로 묶어 표현**할 수 있습니다.

- TypeScript에서는 **단일 문자(character)와 여러 문자를 포함하는 문자열(string) 사이에 구문적인 차이가 없습니다.**
    - JavaScript와 TypeScript에서 문자와 문자열 사이에는 기술적으로 명확한 구분이 없습니다.
        - 모든 text data가 문자열로 처리되며, 단일 문자도 길이가 1인 문자열로 취급합니다.
    - 다른 programming 언어(C, Java 등)에서는 문자(`char`)와 문자열(`String`)이 별도의 data type으로 구분되기도 합니다.


### 문자열 기본

- 문자열은 문자의 연속으로, JavaScript의 기본적인 문자열 조작 기능과 함께 사용할 수 있습니다.

```typescript
let firstName: string = "John";
let lastName: string = 'Doe';
let greeting: string = `Hello, ${firstName} ${lastName}!`;
console.log(greeting);    // "Hello, John Doe!"
```


### 문자열 Template

- backtick(`` ` ``)을 사용한 문자열 literal에서는, 문자열 내에 변수나 표현식의 값을 직접 삽입할 수 있는 template literal 기능을 사용할 수 있습니다.
- template literal을 통해 문자열을 쉽게 구성하고, code의 가독성을 높일 수 있습니다.

```typescript
let price: number = 19.99;
let message: string = `The price is: $${price}`;
console.log(message); // "The price is: $19.99"
```


### 문자열 Method

- TypeScript에서 문자열은 JavaScript의 `String` 객체와 동일한 method를 사용할 수 있습니다.
- 문자열 method를 사용하여 문자열 검색, 변환, 분할 등 다양한 조작을 수행할 수 있습니다.

```typescript
let myString: string = "Hello, TypeScript!";
console.log(myString.length);    // 17 (길이)
console.log(myString.toUpperCase());    // HELLO, TYPESCRIPT! (대문자 변환)
console.log(myString.substring(7));    // TypeScript! (자르기)
```


### 문자열과 Unicode

- TypeScript의 문자열은 Unicode text를 완벽하게 지원합니다.
- Unicode를 지원하기 때문에 다양한 언어와 특수 문자를 문자열 내에서 자유롭게 사용할 수 있습니다.

```typescript
let greetingInKorean: string = "안녕하세요!";
console.log(greetingInKorean);    // 안녕하세요!

let emojiString: string = "😀 😃 😄 😁";
console.log(emojiString);    // 😀 😃 😄 😁
```



