---
layout: note
title: MongoDB Document 삭제 (remove)
date: 2024-01-03
---




## [remove](https://www.mongodb.com/docs/manual/reference/method/db.collection.remove/)

```js
db.collection.remove();    // 전체 삭제
db.collection.remove({field: value});   // 검색된 document를 모두 삭제
```

- `remove` method는 단건 삭제를 지원하지 않습니다.
    - 따라서, `remove` method를 사용할 때는 `ObjectId`를 이용해 삭제할 document를 검색하는 방식을 권장합니다.

```js
db.books.remove();    // 'books'의 모든 document 삭제

db.books.remove({'_id': '5b7cc7dba45a71790ed8331'});    // ObjectId는 유일하므로 하나의 document만 안전하게 삭제 가능
db.books.remove({"name":"def"});    // 'name'이 'def'인 모든 document 삭제
```




---




## [deleteOne](https://www.mongodb.com/docs/manual/reference/method/db.collection.deleteOne/), [deleteMany](https://www.mongodb.com/docs/manual/reference/method/db.collection.deleteMany/)

- `deleteOne`와 `deleteMany` method는 `remove` method의 기능을 세분화한 것입니다.

- 단건 삭제 시에는 `remove` method보다 `deleteOne` method의 사용을 권장합니다.
    - `remove` method는 unique하지 않은 값으로 document를 검색하면, 검색된 모든 document가 삭제됩니다.
    - `deleteOne` method는 첫 번째 document만 삭제하므로, `remove` method보다 더 안전합니다.

| Method | 설명 |
| --- | --- |
| `deleteOne` | 검색된 document 중 첫 번째 document만 삭제합니다. |
| `deleteMany` | 검색된 document를 모두 삭제합니다. |

```js
db.monsters.deleteOne({name: 'Zerp'});
```





---




## Reference

- <https://inpa.tistory.com/entry/MONGO-📚-몽고디비-쿼리-정리#다큐먼트_명령어>
