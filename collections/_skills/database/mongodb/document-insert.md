---
layout: skill
permalink: /170
title: MongoDB Document 생성 (insert)
description: MongoDB의 document를 생성할 때는 insert method를 사용합니다.
date: 2024-01-03
---


## MongoDB Document 생성하기

- 단건 또는 다건의 document를 collection에 삽입합니다.

```js
db.collection.insert({/*document*/});
db.collection.insert([{/*document*/}, {/*document*/}, {/*document*/}, {/*document*/}, {/*document*/}]);
db.collection.insertOne({/*document*/});
db.collection.insertMany([{/*document*/}, {/*document*/}, {/*document*/}, {/*document*/}, {/*document*/}]);
```

| 명령어 | 설명 |
| --- | --- |
| [`insert`](https://www.mongodb.com/docs/manual/reference/method/db.collection.insert/) | **단일 또는 다수의 document를 입력할 때 사용**합니다.<br>만일 collection이 존재하지 않는다면, 자동으로 collection을 생성하고 document를 insert합니다. |
| [`insertOne`](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertOne/) | **단일 document를 입력할 때 사용**합니다. |
| [`insertMany`](https://www.mongodb.com/docs/manual/reference/method/db.collection.insertMany/) | **다수의 document를 입력할 때 사용**합니다. |

```js
db.book.insert({"name":"abc"});

db.book.insert([ 
    {"name": "abc"}, 
    {"name": "def"} 
]);    // 여러 개를 넣을 때는 배열로 묶습니다.

db.book.insert({
    "name": "A", 
    "hits": 100, 
    "author": [
        {"name": "park"},
        {"name": "lee"}
    ]
});

db.book.insert({
    "name": "B", 
    "hits": 50, 
    "author": [
        {"name": "kim"}
    ]
});

db.book.insert({
    "name": "C", 
    "hits": 30, 
    "author": [
        {"name": "kim"},
        {"name": "choi"}
    ]
});
```


---


## Reference

- <https://inpa.tistory.com/entry/MONGO-📚-몽고디비-쿼리-정리#다큐먼트_명령어>
