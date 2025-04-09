---
layout: note
permalink: /16
title: MongoDB Document 수정 (update)
description: MongoDB의 document는 다양한 방법으로 수정할 수 있습니다.
date: 2024-01-05
---


## MongoDB Document 수정하기

- 검색 조건에 해당하는 document의 내용을 수정합니다.


---


## [update](https://www.mongodb.com/docs/manual/reference/method/db.collection.update/)

- `update`는 MongoDB의 기본적인 수정 method입니다.

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
| `multi` | boolean | 검색 조건에 해당하는 모든 document를 수정합니다.<br>(`update` method는 기본적으로 하나의 document만 수정합니다.) |

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
    $set: {
        bestseller: 'N'
    }
}, {
    multi: true
});
```


---


## [updateOne](https://www.mongodb.com/docs/manual/reference/method/db.collection.updateOne/), [updateMany](https://www.mongodb.com/docs/manual/reference/method/db.collection.updateMany/), [replaceOne](https://www.mongodb.com/docs/manual/reference/method/db.collection.replaceOne/)

- `updateOne`, `updateMany`, `replaceOne` method는 `update` method에서 파생된 method입니다.
    - 따라서 사용법도 `update` method와 같습니다.

| Method | 설명 |
| --- | --- |
| `updateOne` | 검색된 document 중 첫 번째만 수정합니다.<br>`update` method에 `{multi: false}` option을 설정한 것과 같습니다. |
| `updateMany` | 검색되는 모든 document를 수정합니다.<br>`update` method에 `{multi: true}` option을 설정한 것과 같습니다. |
| `replaceOne` | document를 통째로 다른 것으로 대체합니다.<br>`update` method에 `$set`을 쓰지 않았을 때와 같습니다. |


---


## [findAndModify](https://www.mongodb.com/docs/manual/reference/method/db.collection.findAndModify/)

- `findAndModify` method는 단일 document를 수정하고 반환합니다.
    - `update` method와 달리 여러 행 수정 option이 존재하지 않습니다.

- `findAndModify` method로 수정(update), 수정 또는 생성(upsert), 삭제(remove) 모두 수행할 수 있습니다.
    - option을 설정하여 선택하여 사용할 수 있습니다.

- `update` method는 처리 결과를 반환하지만, `findAndModify` method는 수정 이전 또는 이후의 document를 결과로 반환합니다.
    - 수정 후 기본적으로 반환되는 document는 수정 이전의 document이며, 새로 수정한 document를 반환받기 위해선 `new` option을 `true`로 설정해야 합니다.

- `findAndModify` method는 `query`로 검색하여 `sort`로 정렬한 뒤 첫 번째 document만 수정하는 작업이 가능합니다.
    - `update` method는 검색된 document가 여러 개일 때, 어떤 document를 변경될지 알 수 없습니다.

```js
db.collection.findAndModify({
    query: {field: value},
    sort: {field: 1},
    update: {$set: {field: value}},
    new: true
});
```

```js
// 'name'이 'Demon'인 document 중 'att'가 가장 작은 document의 내용을 수정하고, 수정 이후의 document를 반환
db.monsters.findAndModify({ 
    query: {name: 'Demon'}, 
    sort: {att: 1},
    update: {$set: {att: 150}}, 
    new: true 
});
```

---


## [findOneAndUpdate](https://www.mongodb.com/docs/manual/reference/method/db.collection.findOneAndUpdate/), [findOneAndReplace](https://www.mongodb.com/docs/manual/reference/method/db.collection.findOneAndReplace/)

- `findOneAndUpdate` method와 `findOneAndReplace` method는 `findAndModify`의 기능(update, upsert, remove)을 분리하여 하나의 역할만 하는 method입니다.

- `findAndModify` method처럼 수정 이전 또는 이후의 document를 반환합니다.
    - `findAndModify` method에서 사용하던 `new` option이 아니라, `returnNewDocument` option을 사용합니다.

```js
db.monsters.findOneAndUpdate(
    {name: 'Demon'}, 
    {$set: {att: 150}}, 
    {returnNewDocument: true}
);
```


---


## Reference

- <https://inpa.tistory.com/entry/MONGO-📚-몽고디비-쿼리-정리#다큐먼트_명령어>
