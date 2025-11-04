---
layout: note
permalink: /392
title: MongoDB Text Index - 전문 검색을 위한 색인
description: Text Index는 자연어 검색을 지원하여 문서 내의 단어와 구문을 효율적으로 찾을 수 있게 합니다.
date: 2025-10-31
---


## Text Index : 자연어 검색을 위한 특수 색인

- **text index**는 문자열 field에서 전문 검색(full-text search)을 수행하기 위한 특수한 index입니다.
    - 자연어 처리 기능을 제공하여 단어, 구문, 문장을 효율적으로 검색할 수 있습니다.

- text index는 단순 문자열 일치 검색과 달리 형태소 분석과 언어별 최적화를 지원합니다.
    - 검색어를 tokenizing하고 stemming을 적용하여 더 정확한 검색 결과를 제공합니다.

- MongoDB는 collection당 최대 하나의 text index만 허용합니다.
    - 단, 여러 field를 포함하는 복합 text index는 생성할 수 있습니다.


---


## Text Index의 필요성

- text index는 stemming(어간 추출), stop words 제거, 언어별 tokenizing 등의 자연어 처리(NLP)를 통해 일반 index로는 구현할 수 없는 의미 기반의 검색을 가능하게 합니다.
    - 사용자가 입력한 검색어의 변형을 자동으로 인식하고, 관련성 점수(relevance score)를 계산하여 정렬할 수 있습니다.


### 일반 Index의 한계

- 일반 index는 정확한 문자열 일치나 정규 표현식 검색만 지원합니다.
    - 단어의 일부분이나 변형된 형태를 찾기 어렵습니다.

```js
// 일반 index를 사용한 검색 (비효율적)
db.articles.find({ content: /database/i });

// "databases", "Database" 등의 변형은 별도로 검색해야 함
db.articles.find({ content: /databases/i });
```

- 정규 표현식 검색은 index를 효율적으로 활용하지 못하고 성능이 매우 느립니다.


### 자연어 처리

- text index는 언어별 특성을 고려한 검색을 지원합니다.
    - stemming : "running", "runs", "ran"을 모두 "run"으로 인식합니다.
    - stop words 제거 : "the", "a", "an" 같은 불용어를 자동으로 제거합니다.

```js
// text index 생성
db.articles.createIndex({ content: "text" });

// "database"로 검색하면 "databases", "Database"도 모두 찾음
db.articles.find({ $text: { $search: "database" } });
```


### 점수 기반 정렬

- text index는 검색 결과의 관련성을 점수로 계산합니다.
    - 검색어가 여러 번 나타나거나 제목에 있는 문서가 더 높은 점수를 받습니다.

```js
// 관련성 점수 기준으로 정렬
db.articles.find(
    { $text: { $search: "mongodb index" } },
    { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } });
```


---


## Text Index 생성

- text index는 `"text"` keyword를 사용하여 생성합니다.


### 단일 Field Text Index

```js
// content field에 text index 생성
db.articles.createIndex({ content: "text" });
```

- 가장 기본적인 형태로, 하나의 text field에만 index를 생성합니다.


### 복합 Field Text Index

```js
// title과 content field에 text index 생성
db.articles.createIndex({
    title: "text",
    content: "text"
});

// 검색 시 두 field 모두에서 검색
db.articles.find({ $text: { $search: "mongodb" } });
```

- 여러 field를 하나의 text index에 포함할 수 있습니다.
    - 검색 시 모든 field에서 동시에 검색이 수행됩니다.


### 가중치(Weight) 설정

```js
// title은 content보다 10배 중요
db.articles.createIndex(
    {
        title: "text",
        content: "text"
    },
    {
        weights: {
            title: 10,
            content: 1
        }
    }
);
```

- 가중치를 설정하여 특정 field의 검색 점수를 높일 수 있습니다.
    - title에서 발견된 단어가 content에서 발견된 단어보다 10배 높은 점수를 받습니다.

- 기본 가중치는 `1`입니다.


### 전체 Document Text Index

```js
// 모든 문자열 field에 text index 생성
db.articles.createIndex({ "$**": "text" });
```

- wildcard `$**`를 사용하면 모든 문자열 field가 자동으로 text index에 포함됩니다.
    - 동적 schema에서 유용하지만, 저장 공간을 많이 사용합니다.


---


## Text Index Option

- text index 생성 시 다양한 option을 지정할 수 있습니다.


### 언어 설정

```js
// 한국어 text index 생성
db.articles.createIndex(
    { content: "text" },
    { default_language: "korean" }
);

// 영어 text index 생성
db.articles.createIndex(
    { content: "text" },
    { default_language: "english" }
);
```

- MongoDB는 다양한 언어를 지원합니다.
    - 언어에 따라 stemming 규칙과 stop words가 다르게 적용됩니다.

- 지원되는 언어 : `danish`, `dutch`, `english`, `finnish`, `french`, `german`, `hungarian`, `italian`, `norwegian`, `portuguese`, `romanian`, `russian`, `spanish`, `swedish`, `turkish`, `arabic`, `persian`.


### Document별 언어 지정

```js
// document마다 언어를 다르게 설정
db.articles.createIndex(
    { content: "text" },
    { language_override: "lang" }
);

// document 삽입 시 언어 지정
db.articles.insertOne({
    title: "MongoDB Guide",
    content: "This is a guide about MongoDB",
    lang: "english"
});

db.articles.insertOne({
    title: "MongoDB 가이드",
    content: "MongoDB에 대한 안내서입니다",
    lang: "korean"
});
```

- `language_override` option으로 document별로 다른 언어를 지정할 수 있습니다.
    - 기본값은 `language` field입니다.


### Index 이름 지정

```js
// text index에 사용자 정의 이름 지정
db.articles.createIndex(
    { title: "text", content: "text" },
    { name: "article_text_index" }
);
```

- text index는 자동 생성된 이름이 매우 길어질 수 있습니다.
    - 명시적으로 이름을 지정하면 관리가 편리합니다.


---


## Text Search 수행

- text index를 사용한 검색은 `$text` 연산자를 사용합니다.


### 기본 Text Search

```js
// "mongodb" 단어를 포함하는 document 검색
db.articles.find({ $text: { $search: "mongodb" } });

// 여러 단어 검색 (OR 조건)
db.articles.find({ $text: { $search: "mongodb index" } });
```

- 기본적으로 여러 단어는 OR 조건으로 검색됩니다.
    - "mongodb" 또는 "index"를 포함하는 document를 모두 반환합니다.


### 구문 검색 (Phrase Search)

```js
// 정확한 구문 검색
db.articles.find({ $text: { $search: "\"mongodb index\"" } });
```

- 큰따옴표로 감싸면 정확한 구문을 검색합니다.
    - "mongodb index"가 연속으로 나타나는 document만 반환합니다.


### 제외 검색 (Negation)

```js
// "mongodb"는 포함하되 "sql"은 제외
db.articles.find({ $text: { $search: "mongodb -sql" } });
```

- `-` 기호를 사용하여 특정 단어를 제외할 수 있습니다.


### 점수 기반 정렬

```js
// text score를 함께 조회
db.articles.find(
    { $text: { $search: "mongodb database" } },
    { score: { $meta: "textScore" } }
);

// score 기준으로 내림차순 정렬
db.articles.find(
    { $text: { $search: "mongodb database" } },
    { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } });
```

- `$meta: "textScore"`로 각 document의 검색 관련성 점수를 조회할 수 있습니다.
    - 점수가 높을수록 검색어와 더 관련이 있습니다.


### 대소문자 구분

```js
// 기본적으로 대소문자 구분 안 함
db.articles.find({ $text: { $search: "MongoDB" } });

// "mongodb", "MongoDB", "MONGODB" 모두 검색됨
```

- text search는 기본적으로 대소문자를 구분하지 않습니다.


### 언어 지정 검색

```js
// 검색 시 언어 지정
db.articles.find({
    $text: {
        $search: "running",
        $language: "english"
    }
});
```

- index 생성 시 지정한 언어와 다른 언어로 검색할 수 있습니다.


---


## Text Index 성능 최적화

- text index는 저장 공간과 memory 사용량이 크고, write 성능에 영향을 주기 때문에 신중한 설계가 필요합니다.
    - 검색 pattern을 분석하여 반드시 필요한 field만 indexing해야 합니다.
    - index 크기를 정기적으로 monitoring하고, 필요시 재구성해야 합니다.


### Covered Query 불가

- text index는 covered query를 지원하지 않습니다.
    - 항상 document를 읽어야 합니다.

```js
// text index로는 covered query가 불가능
db.articles.find(
    { $text: { $search: "mongodb" } },
    { _id: 0, title: 1 }
);
// 여전히 document를 읽어야 함
```


### Compound Index 사용

```js
// text index와 일반 field를 결합한 compound index
db.articles.createIndex({
    category: 1,
    title: "text",
    content: "text"
});

// category 조건과 text 검색을 함께 사용
db.articles.find({
    category: "database",
    $text: { $search: "mongodb" }
});
```

- text index 앞에 일반 field를 배치할 수 있습니다.
    - 특정 category나 날짜 범위 내에서 text 검색을 수행할 때 유용합니다.

- text index는 compound index에서 하나만 존재해야 합니다.


### Index 크기 관리

```js
// text index 통계 확인
db.articles.stats();

// collStats에서 indexSizes 확인
db.articles.stats().indexSizes;
```

- text index는 일반 index보다 훨씬 큰 저장 공간을 차지합니다.
    - 각 단어마다 별도의 index entry가 생성되기 때문입니다.
    - 긴 text field를 indexing하면 index 크기가 원본 data의 몇 배까지 커질 수 있습니다.

- text index는 memory 사용량도 매우 높습니다.
    - index가 크면 working set이 memory에 올라가지 않아 성능이 저하됩니다.

- write 성능에도 큰 영향을 줍니다.
    - document를 삽입하거나 수정할 때마다 모든 단어를 tokenizing하고 index를 update해야 합니다.
    - 긴 문서나 여러 field를 indexing하면 write 속도가 크게 느려집니다.

- 정기적으로 크기를 확인하고 필요시 재구성합니다.
    - 실제 검색 pattern을 분석하여 꼭 필요한 field만 text index에 포함합니다.


### Case Sensitive 검색 회피

- text index는 대소문자를 구분하지 않으므로 별도 작업이 필요 없습니다.
    - 대소문자 구분 검색이 필요하다면 정규 표현식을 사용해야 합니다.


---


## Text Index 활용 사례

- text index는 사용자가 자유로운 형태의 text로 검색하는 모든 상황에서 활용됩니다.
    - 검색어의 변형을 자동으로 처리하고, 관련성 점수(relevance score)로 정렬하여 검색 경험을 개선합니다.


### Blog 및 News 검색

```js
// blog article 검색
db.posts.createIndex({
    title: "text",
    content: "text",
    tags: "text"
}, {
    weights: {
        title: 10,
        tags: 5,
        content: 1
    }
});

// 사용자 검색 query
db.posts.find({
    $text: { $search: "mongodb performance tuning" }
}).sort({
    score: { $meta: "textScore" }
}).limit(10);
```

- 제목이 가장 중요하고, tag가 다음, 본문이 가장 낮은 가중치를 받습니다.


### 상품 검색

```js
// e-commerce 상품 검색
db.products.createIndex({
    category: 1,
    name: "text",
    description: "text",
    brand: "text"
});

// 특정 category 내에서 검색
db.products.find({
    category: "electronics",
    $text: { $search: "laptop gaming" }
}).sort({
    score: { $meta: "textScore" }
});
```

- category로 먼저 filtering한 후 text 검색을 수행하여 성능을 향상시킵니다.


### FAQ 및 Help Center

```js
// 도움말 문서 검색
db.faqs.createIndex({
    question: "text",
    answer: "text"
}, {
    weights: {
        question: 3,
        answer: 1
    }
});

// 사용자 질문 검색
db.faqs.find({
    $text: { $search: "how to reset password" }
}).sort({
    score: { $meta: "textScore" }
}).limit(5);
```

- 질문 field에 더 높은 가중치를 부여하여 정확도를 높입니다.


### 이력서 및 인재 검색

```js
// 인재 database 검색
db.resumes.createIndex({
    skills: "text",
    experience: "text",
    education: "text"
}, {
    weights: {
        skills: 5,
        experience: 3,
        education: 1
    }
});

// 기술 stack 기반 검색
db.resumes.find({
    $text: { $search: "mongodb nodejs react" }
}).sort({
    score: { $meta: "textScore" }
});
```


### Log 검색

```js
// application log 검색
db.logs.createIndex({
    message: "text",
    stackTrace: "text"
});

// error log 검색
db.logs.find({
    level: "error",
    $text: { $search: "connection timeout" }
}).sort({ timestamp: -1 });
```


---


## Text Index 제약 사항

- text index는 설계 단계에서 고려해야 할 여러 제약 사항이 있습니다.
    - collection당 하나의 text index만 생성 가능하고, 일부 query 연산자와 함께 사용할 수 없으므로 미리 검토해야 합니다.


### Collection당 하나의 Text Index

- 각 collection은 최대 하나의 text index만 가질 수 있습니다.

```js
// 불가능 : 두 개의 text index
db.articles.createIndex({ title: "text" });
db.articles.createIndex({ content: "text" }); // ERROR
```

- 여러 field를 포함하려면 복합 text index를 생성해야 합니다.


### Hint 사용 제한

```js
// text index는 자동으로 선택됨
db.articles.find({ $text: { $search: "mongodb" } });

// hint를 사용하여 다른 index 지정 가능
db.articles.find({ $text: { $search: "mongodb" } }).hint("other_index");
```

- `$text` query는 기본적으로 text index를 사용합니다.
    - 명시적으로 `hint()`를 사용하면 다른 index를 선택할 수 있습니다.


### $or 연산자와 함께 사용 불가

```js
// 불가능 : $text와 $or를 함께 사용
db.articles.find({
    $or: [
        { $text: { $search: "mongodb" } },
        { author: "John" }
    ]
}); // ERROR
```

- `$text` 연산자는 `$or`와 함께 사용할 수 없습니다.


### Collation 지원 제한

- text index는 collation을 지원하지 않습니다.
    - 언어별 정렬 규칙은 `default_language` option으로 제어됩니다.


### Sort와 함께 사용 시 주의

```js
// text score 외의 field로 정렬하면 성능 저하
db.articles.find({
    $text: { $search: "mongodb" }
}).sort({ createdAt: -1 });
```

- text search 결과를 text score가 아닌 다른 field로 정렬하면 성능이 저하될 수 있습니다.
    - 가능하면 text score로 정렬하거나, compound index를 활용합니다.


---


## Text Index vs 일반 검색 방법

- text index와 다른 검색 방법을 비교합니다.


### 정규 표현식 검색

```js
// 정규 표현식 (느림)
db.articles.find({ content: /mongodb/i });

// text index (빠름)
db.articles.find({ $text: { $search: "mongodb" } });
```

- 정규 표현식은 index를 효율적으로 사용하지 못합니다.
    - 특히 pattern이 `^`로 시작하지 않으면 collection scan이 발생합니다.

- text index는 전문 검색에 최적화되어 훨씬 빠른 성능을 제공합니다.


### $in 연산자

```js
// $in 연산자 (정확한 일치만 가능)
db.articles.find({ tags: { $in: ["mongodb", "database"] } });

// text index (유사 단어도 검색)
db.articles.find({ $text: { $search: "mongodb database" } });
```

- `$in` 연산자는 정확한 값만 검색합니다.
- text index는 stemming과 유사 단어 검색을 지원합니다.


### Atlas Search

- MongoDB Atlas는 더 강력한 전문 검색 기능인 **Atlas Search**를 제공합니다.
    - Apache Lucene 기반으로 더 정교한 검색과 faceting, autocomplete를 지원합니다.

- on-premise MongoDB에서는 text index가 기본 전문 검색 방법입니다.


---


## Reference

- <https://www.mongodb.com/docs/manual/core/index-text/>
- <https://www.mongodb.com/docs/manual/reference/operator/query/text/>
- <https://www.mongodb.com/docs/manual/tutorial/text-search-in-aggregation/>

