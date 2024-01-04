---
layout: note
title: MongoDB Document 수정 명령어 (update)
date: 2024-01-04
---




- 검색 조건에 해당하는 document의 내용을 수정합니다.




---




## Update

- `update`는 MongoDB의 기본적인 수정 명령어입니다.

```js
db.collection.update(
    {field: value},    // [필수] 검색 조건
    {$set: {field: value}},    // [필수] 수정 data
    {option: value}    // [선택] option
);
```

- 기본적으로 하나의 document만 수정합니다.
    - multi option을 추가하면 여러 개의 document를 수정할 수 있습니다.

- `$set`을 사용해야 해당 field만 수정됩니다.
    - 만약 `$set`을 사용(`{$set: {field: value}}`)하지 않고 수정할 내용을 바로 입력(`{field: value}`)하면, document의 내용이 입력한 내용으로 통째로 대체됩니다.


| Option | Value | 설명 | 
| --- | --- | --- |
| `upsert` | boolean | 검색된 document가 있으면 update, 없으면 insert합니다. |
| `multi` | boolean | 검색 조건에 해당하는 모든 document를 수정합니다.<br>(`update` 명령어는 기본적으로 하나의 document만 수정합니다.) |

```js
// 'hits'가 110인 document들을 120으로 수정
db.books.update({
    'hits': 110
}, {
    $set: {
    	'hits': 120
    }
});

// 'hits'가 120인 document들을 125로 수정하고, 기존에 없던 'name' field를 'AA' 값으로 추가
db.books.update({
    'hits': 120
}, {
	$set: {
    	hits: 125,
    	name: 'AA'
    }
});

// 'name'이 'F'인 document가 있으면 'hits'를 20으로 수정하고, 없으면 'name'이 'F'이고 'hits'가 20인 document를 추가
db.books.update({
    name: 'F'
}, {
    $set: {
    	name: 'F',
    	hits: 20
    }
}, {
    upsert: true
});

// hits가 30 이하인 모든 document의 'bestseller' field를 'N'으로 수정
db.books.update({
    hits: {$lte: 30}
}, {
    $set:{
        bestseller: 'N'
    }
}, {
    multi: true
});
```


### Field의 배열 값 조작 : `$push`, `$pull`

```js
db.collection.update(
    {field: value},
    {$push: {field: value}}    // 배열 값 추가
);

db.collection.update(
    {field: value},
    {$pull: {field: value}}    // 배열 값 제거
);
```

- field의 data가 배열인 경우, `$set` 대신 `$push`와 `$pull` keyword를 사용하여 배열 data를 조작합니다.
    - `$push`로 배열 data를 추가합니다.
    - `$pull`로 배열 data를 제거합니다.

```js
// 'category' field에 'science'라는 배열 값 추가
db.books.update({
    name: 'F'
}, {
    $push: {
        category: 'science'
    }
});

// 'category' field에서 'science'라는 배열 값 제거
db.books.update({
    name: 'F'
}, {
    $pull: {
    	category: 'science'
    }
});
```




---




## UpdateOne, UpdateMany, ReplaceOne

- `updateOne`, `updateMany`, `replaceOne` 명령어는 `update` 명령어로부터 파생된 명령어입니다.

| 명령어 | 설명 |
| --- | --- |
| `updateOne` |  |
| `updateMany` |  |
| `replaceOne` |  |

```js
```




---









---




## Reference

- <https://inpa.tistory.com/entry/MONGO-📚-몽고디비-쿼리-정리#다큐먼트_명령어>
- <https://www.mongodb.com/docs/manual/reference/method/db.collection.update/>
