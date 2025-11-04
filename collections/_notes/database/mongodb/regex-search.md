---
layout: note
permalink: /256
title: MongoDB Regex Search - 정규 표현식으로 Pattern 검색하기
description: MongoDB는 $regex 연산자를 통해 정규 표현식 기반 pattern 검색을 지원하며, index 활용 여부에 따라 성능이 크게 달라집니다.
date: 2025-11-03
published: false
---


## MongoDB Regex Search

- MongoDB는 정규 표현식(regular expression)을 사용한 pattern matching을 지원합니다.
    - `$regex` 연산자를 사용하여 문자열 pattern을 검색할 수 있습니다.
    - PCRE(Perl Compatible Regular Expression)를 기반으로 합니다.

- 정규 표현식은 유연한 검색이 가능하지만, 성능에 주의해야 합니다.
    - index 활용 여부에 따라 성능이 크게 달라집니다.


### PCRE : Perl Compatible Regular Expression

- PCRE는 Perl programming language의 정규 표현식 문법을 따르는 정규 표현식 표준입니다.
    - Perl은 정규 표현식을 매우 강력하게 지원하는 언어로, 그 문법이 업계 표준이 되었습니다.
    - MongoDB를 포함한 많은 현대적 programming language와 도구들이 PCRE를 채택하고 있습니다.

- PCRE와 기본 정규 표현식은 지원하는 문법과 기능에서 차이가 있습니다.
    - **기본 정규 표현식 (Basic Regular Expression)** : `^`, `$`, `.`, `*` 등 기초적인 문법만 지원합니다.
    - **PCRE (Perl Compatible Regular Expression)** : 더 복잡한 pattern과 고급 기능(lookahead, lookbehind 등)을 지원합니다.

- MongoDB의 개발자들이 PCRE를 선택하는 이유는 호환성과 표준화입니다.
    - 개발자들이 다른 언어에서 사용했던 정규 표현식을 MongoDB에서도 그대로 사용할 수 있습니다.
    - JavaScript, Python, Java 등 대부분의 언어가 PCRE와 호환되는 정규 표현식을 지원하므로, 정규 표현식 pattern을 언어 간에 쉽게 이식할 수 있습니다.


---


## 정규 표현식 사용 방법

- MongoDB에서 정규 표현식은 **`$regex` 연산자** 또는 **단축 문법**을 사용하여 지정할 수 있습니다.


### `$regex` 연산자

- `$regex` 연산자를 명시적으로 사용하여 pattern을 지정합니다.

```js
// 기본 사용법
db.collection.find({
    field: { $regex: "pattern" }
});

// option과 함께 사용
db.collection.find({
    field: { $regex: "pattern", $options: "i" }
});
```

- `$options`로 추가 option을 지정할 수 있습니다.


### 단축 문법

- JavaScript의 정규 표현식 literal 문법을 직접 사용합니다.

```js
// JavaScript 정규 표현식 literal 사용
db.collection.find({
    field: /pattern/
});

// option 포함
db.collection.find({
    field: /pattern/i
});
```

- 더 간결하고 읽기 쉬운 표현이 가능합니다.


---


## 정규 표현식 기본 문법

- MongoDB는 표준 정규 표현식 문법을 지원합니다.


### 기본 Pattern

- 

#### 문자 Matching

- 특정 문자열이 포함된 document를 검색합니다.

```js
// 정확한 문자열 포함
db.users.find({ name: /john/ });
// → "john", "johnny", "John Smith" 모두 찾음

// 대소문자 구분 안 함
db.users.find({ name: /john/i });
// → "John", "JOHN", "johnny" 모두 찾음
```

#### 시작과 끝 (`^`, `$`)

- `^`는 문자열의 시작, `$`는 문자열의 끝을 나타냅니다.

```js
// 시작 (^)
db.products.find({ name: /^Apple/ });
// → "Apple iPhone", "Apple Watch" 찾음
// → "Buy Apple" 찾지 못함

// 끝 ($)
db.products.find({ name: /Pro$/ });
// → "iPhone Pro", "MacBook Pro" 찾음
// → "Pro Max" 찾지 못함

// 정확한 일치
db.products.find({ name: /^iPhone$/ });
// → "iPhone"만 찾음
```

#### Any 문자 (`.`)

- `.`은 newline을 제외한 임의의 한 문자를 나타냅니다.

```js
// . : 임의의 한 문자
db.logs.find({ message: /err.r/ });
// → "error", "err0r", "err r" 찾음
```

#### 반복 (`*`, `+`, `?`)

- `*`, `+`, `?`는 앞 문자의 반복 횟수를 지정합니다.

```js
// * : 0회 이상
db.products.find({ sku: /ABC*/ });
// → "AB", "ABC", "ABCC" 찾음

// + : 1회 이상
db.products.find({ sku: /ABC+/ });
// → "ABC", "ABCC" 찾음
// → "AB" 찾지 못함

// ? : 0회 또는 1회
db.products.find({ color: /colou?r/ });
// → "color", "colour" 모두 찾음
```


### 문자 집합

- 

#### 대괄호 (`[]`)

- `[]`는 지정된 문자 중 하나를 matching합니다.

```js
// 지정된 문자 중 하나
db.products.find({ code: /[ABC]/ });
// → "A", "B", "C" 중 하나가 포함된 것

// 범위
db.products.find({ code: /[A-Z][0-9]/ });
// → "A1", "B5", "Z9" 등

// 제외 (^)
db.products.find({ code: /[^0-9]/ });
// → 숫자가 아닌 문자가 포함된 것
```


### Group과 선택

- 

#### Group (`()`)

- `()`는 여러 문자를 하나의 단위로 grouping합니다.

```js
// grouping
db.products.find({ name: /(iPhone|iPad) Pro/ });
// → "iPhone Pro", "iPad Pro" 찾음
```

#### OR 선택 (`|`)

- `|`는 여러 pattern 중 하나를 선택합니다.

```js
db.users.find({ email: /@(gmail|naver|kakao)\.com$/ });
// → "user@gmail.com", "user@naver.com" 찾음
```


### 특수 문자 Escape (`\`)

- 특수 문자 자체를 검색하려면 `\`로 escape 처리해야 합니다.

```js
// . 자체를 찾으려면 \. 사용
db.domains.find({ url: /example\.com/ });
// → "example.com" 찾음
// → "exampleXcom" 찾지 못함

// $ 자체를 찾으려면 \$ 사용
db.prices.find({ display: /\$[0-9]+/ });
// → "$100", "$50" 찾음
```


---


## Index 활용

- 정규 표현식에서 index 활용 여부는 성능에 결정적인 영향을 미칩니다.


### Index를 사용하는 경우

#### Prefix 검색 (^ 사용)

- `^`로 시작하는 pattern은 B-tree index를 활용하여 빠르게 검색합니다.

```js
// index 생성
db.products.createIndex({ name: 1 });

// index 사용됨 ✓
db.products.find({ name: /^Apple/ });
```

- index의 정렬된 순서를 이용하여 효율적으로 검색합니다.

#### 대소문자 구분하는 Prefix 검색

- 대소문자를 구분하지 않는 경우 index 활용이 제한됩니다.

```js
// index 완전 활용 (빠름)
db.products.find({ name: /^Apple/ });

// index 부분 활용 (상대적으로 느림)
db.products.find({ name: /^Apple/i });
```

- `i` option을 사용하면 index를 부분적으로만 활용합니다.


### Index를 사용하지 못하는 경우

#### 중간 문자열 검색

- `^`가 없는 pattern은 index를 사용할 수 없습니다.

```js
// collection scan 발생 ✗
db.products.find({ name: /iPhone/ });
db.products.find({ name: /.*Apple/ });
```

- 전체 collection을 순회해야 하므로 성능이 저하됩니다.

#### 끝 문자열 검색

- `$`만으로는 index를 사용할 수 없습니다.

```js
// collection scan 발생 ✗
db.products.find({ name: /Pro$/ });
```

#### 복잡한 Pattern

- 복잡한 pattern은 대부분 index를 활용하지 못합니다.

```js
// collection scan 발생 ✗
db.products.find({ name: /^(Apple|Samsung).*Pro/ });
```


### Index 사용 확인

- `explain()`으로 query가 index를 사용하는지 확인할 수 있습니다.

```js
// explain으로 확인
db.products.find({ name: /^Apple/ }).explain("executionStats");

// IXSCAN : index 사용
// COLLSCAN : collection scan
```


---


## 정규 표현식 Option

- `$options`로 정규 표현식의 동작을 제어할 수 있습니다.


### 주요 Option

#### i : 대소문자 구분 안 함

- 대소문자를 구분하지 않고 검색합니다.

```js
db.users.find({
    name: { $regex: "john", $options: "i" }
});
// → "John", "JOHN", "johnny" 모두 찾음

// 단축 문법
db.users.find({ name: /john/i });
```

#### m : 여러 줄 모드

- `^`와 `$`가 전체 문자열이 아닌 각 줄의 시작과 끝에 matching됩니다.

```js
// ^ 와 $가 각 줄의 시작/끝에 matching
db.documents.find({
    content: { $regex: "^Chapter", $options: "m" }
});
// → 각 줄에서 "Chapter"로 시작하는 것을 찾음
```

#### s : Dot all 모드

- `.`이 newline을 포함한 모든 문자에 matching됩니다.

```js
// . 이 newline도 포함
db.documents.find({
    content: { $regex: "start.*end", $options: "s" }
});
// → "start"와 "end" 사이에 newline이 있어도 찾음
```

#### x : Extended 모드

- pattern 내의 공백과 주석을 무시하여 가독성을 향상시킵니다.

```js
// 공백과 주석 무시 (가독성 향상)
db.users.find({
    phone: {
        $regex: "\\d{3} - \\d{4} - \\d{4}",
        $options: "x"
    }
});
```

#### Option 조합

- 여러 option을 문자열로 조합하여 사용할 수 있습니다.

```js
// 여러 option을 함께 사용
db.documents.find({
    content: { $regex: "pattern", $options: "im" }
});

// 단축 문법
db.documents.find({ content: /pattern/im });
```


---


## 성능 최적화

- 정규 표현식 검색의 성능을 최적화하는 방법입니다.


### Prefix Pattern 사용

- 가능하면 `^`를 사용하여 prefix 검색으로 만듭니다.

```js
// 좋음 ✓
db.products.find({ name: /^Apple/ });

// 나쁨 ✗
db.products.find({ name: /Apple/ });
```


### 추가 조건과 결합

- regex와 함께 index를 사용하는 다른 조건을 추가합니다.

```js
// 좋음 ✓
db.products.find({
    category: "electronics",  // index 사용
    name: /iPhone/            // regex
});

// index가 있는 field로 먼저 filtering
db.products.createIndex({ category: 1 });
```

- 먼저 index로 범위를 좁힌 후 regex를 적용하면 성능이 향상됩니다.


### 구체적인 Pattern 사용

- 가능한 한 구체적인 pattern을 사용하여 불필요한 검색을 줄입니다.

```js
// 좋음 ✓
db.users.find({ email: /@gmail\.com$/ });

// 나쁨 ✗
db.users.find({ email: /.*gmail.*/ });
```

- 불필요한 `.*`는 성능을 저하시킵니다.


### Text Index 고려

- regex로 중간 문자열을 자주 검색한다면 text index가 더 효율적입니다.

```js
// 중간 문자열 검색이 자주 필요하면 text index 사용
db.products.createIndex({ name: "text" });

db.products.find({ $text: { $search: "iPhone" } });
```


### Limit 사용

- 필요한 개수만큼만 조회하여 불필요한 작업을 줄입니다.

```js
// 결과 개수 제한
db.products.find({ name: /iPhone/ }).limit(10);
```


---


## 실전 예시

- 실무에서 자주 사용되는 정규 표현식 pattern입니다.


### Email 검증

- email 형식을 검증하거나 특정 domain을 찾습니다.

```js
// 기본 email pattern
db.users.find({
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
});

// 특정 domain만
db.users.find({
    email: /@(gmail|naver|daum)\.com$/i
});
```


### 전화번호 검색

- 특정 형식의 전화번호를 검색합니다.

```js
// hyphen 있는 형식
db.contacts.find({
    phone: /^010-\d{4}-\d{4}$/
});

// hyphen 없는 형식도 허용
db.contacts.find({
    phone: /^010-?\d{4}-?\d{4}$/
});
```


### URL Pattern

- URL 형식을 검증하거나 특정 domain을 찾습니다.

```js
// http 또는 https로 시작
db.links.find({
    url: /^https?:\/\//
});

// 특정 domain
db.links.find({
    url: /^https?:\/\/(www\.)?example\.com/
});
```


### SKU나 Code 검색

- 특정 형식의 SKU나 상품 code를 검색합니다.

```js
// 특정 prefix로 시작하는 code
db.products.find({
    sku: /^ELEC-[0-9]{4}$/
});
// → "ELEC-1234", "ELEC-5678"

// 범위 검색
db.products.find({
    sku: /^ELEC-[1-3][0-9]{3}$/
});
// → "ELEC-1000" ~ "ELEC-3999"
```


### File 확장자

- 특정 확장자를 가진 file을 검색합니다.

```js
// 이미지 file만
db.files.find({
    filename: /\.(jpg|jpeg|png|gif)$/i
});

// 문서 file만
db.files.find({
    filename: /\.(pdf|doc|docx|xls|xlsx)$/i
});
```


### IP 주소

- IP 주소 형식을 검증하거나 특정 subnet을 찾습니다.

```js
// 간단한 IP pattern
db.logs.find({
    ip: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/
});

// 특정 subnet
db.logs.find({
    ip: /^192\.168\./
});
```


### 날짜 형식

- 문자열로 저장된 날짜를 pattern으로 검색합니다.

```js
// YYYY-MM-DD 형식
db.events.find({
    date: /^\d{4}-\d{2}-\d{2}$/
});

// 2024년 데이터
db.events.find({
    date: /^2024-/
});
```


---


## 주의 사항

- 정규 표현식 사용 시, 성능과 정확성에 주의해야 합니다.


### 성능 문제

- 정규 표현식은 매우 느릴 수 있습니다.
    - 특히 `^`가 없는 pattern은 collection scan을 유발합니다.
    - 대용량 collection에서는 심각한 성능 저하가 발생합니다.

- 가능하면 다른 방법을 먼저 고려합니다.
    - 정확한 값 검색 : `$eq`.
    - 여러 값 중 하나 : `$in`.
    - 범위 검색 : `$gte`, `$lte`.
    - 전문 검색 : text index.


### Escape 처리

- 사용자 입력을 regex로 사용할 때는 특수 문자를 escape 처리해야 합니다.

```js
// 사용자 입력을 regex로 사용할 때는 escape 필요
const userInput = "example.com"; // . 는 특수 문자

// 잘못된 방법 ✗
db.domains.find({ url: new RegExp(userInput) });
// → "exampleXcom"도 찾아짐

// 올바른 방법 ✓
const escaped = userInput.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
db.domains.find({ url: new RegExp(escaped) });
```

- 사용자 입력을 그대로 사용하면 의도하지 않은 결과가 나올 수 있습니다.


### Null과 존재하지 않는 Field

- regex는 field가 null이거나 존재하지 않는 document를 제외합니다.

```js
// null이나 field가 없는 경우 주의
db.products.find({ description: /keyword/ });
// → description이 null이거나 없는 document는 제외됨

// null도 포함하려면
db.products.find({
    $or: [
        { description: /keyword/ },
        { description: null }
    ]
});
```


### Collection당 하나의 Regex만 사용하기

- 가능하면 한 query에 regex를 하나만 사용하여 성능 저하를 방지합니다.

```js
// 여러 field에 regex 사용 시 성능 저하
db.products.find({
    name: /Apple/,
    description: /iPhone/  // 두 번째 regex
});
```


### Case-Insensitive Index

- 대소문자 구분 없는 검색을 자주 한다면 case-insensitive index를 고려합니다.

```js
// collation을 사용한 case-insensitive index
db.products.createIndex(
    { name: 1 },
    { collation: { locale: "en", strength: 2 } }
);

// query 시에도 동일한 collation 사용
db.products.find({ name: "apple" })
    .collation({ locale: "en", strength: 2 });
```


---


## Regex vs 다른 검색 방법

- 정규 표현식 대신 다른 검색 방법이 더 효율적일 수 있습니다.


### 정확한 값 검색

- 정확한 값을 검색할 때는 regex 대신 직접 비교를 사용합니다.

```js
// 정규 표현식 (느림) ✗
db.products.find({ category: /^electronics$/ });

// 정확한 matching (빠름) ✓
db.products.find({ category: "electronics" });
```


### 여러 값 중 하나

- 여러 값 중 하나를 찾을 때는 regex 대신 `$in` 연산자를 사용합니다.

```js
// 정규 표현식 (느림) ✗
db.products.find({ category: /^(electronics|computers|phones)$/ });

// $in 연산자 (빠름) ✓
db.products.find({
    category: { $in: ["electronics", "computers", "phones"] }
});
```


### 전문 검색

- 중간 문자열을 자주 검색할 때는 regex 대신 text index를 사용합니다.

```js
// 정규 표현식 (느림) ✗
db.articles.find({ content: /mongodb/ });

// text index (빠름) ✓
db.articles.find({ $text: { $search: "mongodb" } });
```


### Prefix 검색

- prefix를 검색할 때는 regex를 사용하는 것이 적합하며, 이 경우 index를 활용할 수 있습니다.

```js
// 정규 표현식 (index 활용) ✓
db.products.find({ name: /^Apple/ });

// startsWith는 MongoDB에 없지만, 정규 표현식이 적합
```


---


## Reference

- <https://www.mongodb.com/docs/manual/reference/operator/query/regex/>
- <https://www.mongodb.com/docs/manual/reference/operator/query/regex/#index-use>
- <https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html>

