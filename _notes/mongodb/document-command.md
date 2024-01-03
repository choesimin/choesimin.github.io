---
layout: note
title: MongoDB - Document 명령어 (CRUD)
date: 2024-01-04
---



## Data Create (Insert)

- 단건 또는 다건의 document를 collection에 삽입합니다.

```js
db.collection.insert({});
db.collection.insert([{}, {}]);
db.collection.insertOne({});
db.collection.insertMany([{}, {}]);
```

| 명령어 | 설명 |
| --- | --- |
| `insert` | **단일 또는 다수의 document를 입력할 때 사용**합니다.<br>만일 collection이 존재하지 않는다면, 자동으로 collection을 생성하고 document를 insert합니다. |
| `insertOne` | **단일 document를 입력할 때 사용**합니다. |
| `insertMany` | **다수의 document를 입력할 때 사용**합니다. |

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




## Data Read (find)

- document 목록 또는 단건을 조회합니다.

```js
db.collection.find();
db.collection.findOne();
```

| 명령어 | 설명 |
| --- | --- |
| `find` | document 목록을 조회합니다. |
| `findOne` | document 단건을 조회합니다.<br>`find` method로 찾은 것 중에 첫번째 것을 선택(`find()[0]`)한 것과 같습니다. |


### Search

- 특정 조건으로 검색한 결과를 조회할 수 있습니다.
    - SQL의 `WHERE`과 같습니다.

- 조회 method(`find`, `findOne`)의 **첫번째 인자**에 검색 조건을 명시합니다.
    - 검색 조건으로 검색어, 논리 연산자, 졍규 표현식, JavaScript 표현식(expression) 등을 사용할 수 있습니다.

#### Search : 검색어

```js
{field: value}    // field == value
```

```js
// name == 'A'
db.books.find({'name': 'A'});

// (name == 'Slime') and (hp == 25)
db.monsters.find({ 
    name: 'Slime',
    hp: 25
});
```

#### Search : 논리 연산자

```js
{field: {$gt: value}}    // field > value
{field: {$lt: value}}    // field < value
{field: {$gte: value}}    // field >= value
{field: {$lte: value}}    // field <= value

{field: {$eq: value}}    // field == value
{field: {$ne: value}}    // field != value

{field: {$in: [value1, value2, value3]}    // field == (value1 or value2 or value3)
{field: {$nin: [value1, value2, value3]}    // field != (value1 and value2 and value3)

// 조건1 or 조건2
{$or: [{조건1}, {조건2}]}

// (조건1 or 조건2) and (조건3 or 조건4)
{$and: [
    {$or: [{조건1}, {조건2}]},
    {$or: [{조건3}, {조건4}]}
]}

// 조건1, 조건2 모두 만족하지 않는 document
{$nor: [{조건1}, {조건2}]}

// 조건이 아닌 값 ('$nor'의 단일 version)
{$not: {조건}}
```

```js
// (name == 'Slime') or (hp == 50)
db.monsters.find({ 
    $or: [ 
        {name: 'Slime'},
        {hp: 50}
    ] 
});

// hits >= 50
db.book.find({
    'hits': {$gte: 50}
})

// 40 < hits < 70
db.book.find({
    'hits': {$gt: 40, $lt: 70}
});

// name == ('A' or 'B')
db.book.find({
    'name': {
        $in: ['A', 'B']
    }
})

// (name == 'A') or (hits == 50)
db.book.find({
    $or: [
        {'name': 'A'},
        {'hits': 50}
    ]
});

// (hits < 50) and (name == 'B')
db.book.find({
    $and: [
        {'hits': {$lte: 50}}, 
        {'name': 'B'}
    ] 
});
```

#### Search : 정규 표현식

- `$regex`와 `$options`를 이용하여 정규 표현식으로 검색할 수 있습니다.

```js
// name에서 a 또는 b를 정규 표현식으로 검색 ('i' option으로 대소문자 무시)
db.book.find({'name': /a|b/i});
db.book.find({'name': {$regex: /a|b/, $options: 'i'}});
```

#### Search : JavaScript 표현식

- `$where`을 이용하여 JavaScript 표현식을 사용할 수 있습니다.
- 조건에 `this`를 함께 작성해야 합니다.

```js
db.book.find({$where: "this.name == 'A'"})

// $where을 사용하여 조건을 더 간단하게 표현할 수 있습니다.
db.book.find({$or: [{name: 'A'}, {hits: {$lte: 50}}]});    // 정규 표현식
db.book.find({$where: "this.name == 'A' || this.hits <= 50"});    // JavaScript 표현식
```


### Projection

- projection은 query를 실행할 때 **특정 field를 선택하거나 제외하기 위해 사용하는 기능**입니다.
    - document에서 필요한 data만 추출할 수 있으며, 불필요한 data는 제외됩니다.
        - e.g, 회원의 개인 정보 같은 민감한 data를 다룰 때 유용합니다.
    - projection으로 query의 효율성을 높이고, network를 통해 전송되는 data 양을 줄일 수 있습니다.
        - e.g., 게시글 목록에서 내용까지 모두 불러오면 용량이 매우 크지만, 제목만 불러오면 data를 아낄 수 있습니다.
    - projection을 사용함으로써 더 빠르고 효율적인 query를 실행할 수 있으며, application의 성능을 개선할 수 있습니다.

- 조회 method(`find`, `findOne`)의 **두번째 인자**에 조회할 field를 명시합니다.
    - `0`이나 `false`를 지정하면 제외하고, `1`이나 `true`를 지정하면 포함합니다.

- **projection을 지정하지 않으면**, 기본적으로 모든 field가 결과에 포함됩니다.
- **특정 field에 `1` 또는 `true`를 설정**하면, 해당 field만 결과에 포함되고, 다른 field는 제외됩니다.
    - 그러나 `_id` field는 기본적으로 포함되기 때문에, `_id` field를 제외하려면 명시적으로 `0` 또는 `false`를 설정해야 합니다.
- **특정 field에 `0` 또는 `false`를 설정**하면, 해당 field가 결과에서 제외되고, 다른 field는 기본적으로 포함됩니다.

```js
db.collection.find({}, {field: 0, field: 1});
db.collection.find({}, {field: false, field: true});
```

```js
db.books.find({}, {'_id': 0, 'name': 1, 'hits': 1});
db.books.find({}, {'_id': false, 'name': true, 'hits': true});

// author field data(배열)에서 1개만 가져옵니다. (전체 조회 갯수에는 영향이 없습니다.)
db.books.find({$and: [{'name': 'A'}]}, {'author': {$slice: 1}});
```


### 정렬 (sort)

- `1`은 오름차순, `-1`은 내림차순을 의미합니다.

```js
// field 기준 정렬
db.collection.find().sort({field: value});    // value : 1 또는 -1
```

```js
// hits를 오름차순으로 정렬해서 조회
db.book.find().sort({"hits": 1});
```


### Formatting (pretty)

- `pretty` method를 사용하여 조회 결과를 formatting하여 볼 수 있습니다.
- 명령어의 마지막에 붙여 사용합니다.

```js
db.collection.find().pretty();
db.collection.find().sort().pretty();
db.collection.findOne().pretty();
```




---




## Reference

- <https://inpa.tistory.com/entry/MONGO-📚-몽고디비-쿼리-정리#다큐먼트_명령어>
