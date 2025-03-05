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
| 