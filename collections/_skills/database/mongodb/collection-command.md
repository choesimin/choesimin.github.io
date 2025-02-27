---
layout: skill
title: MongoDB Collection 명령어 (조회, 생성, 삭제)
date: 2024-01-02
---


## Collection 조회

- 해당 database의 모든 collection(table)을 조회합니다.

```sql
show collections
```


---


## Collection 생성

```js
db.createCollection(name [, options])
```

- `db`의 `createCollection` method를 사용합니다.

| Parameter | 설명 |
| --- | --- |
| name | collection의 이름을 지정하는 인자. |
| options | collection의 설정을 변경하는 인자. |

- option은 선택적으로 사용합니다.

| Option | Type | 설명 |
| --- | --- | --- |
| capped | Boolean | 고정된 크기(fixed size)를 가진 'capped collection'을 생성합니다.<br>collection의 최대 크기(size)를 초과하는 경우 가장 오래된 data를 덮어씁니다.<br>`true`로 설정하면 활성화합니다. |
| size | number | 해당 collection의 최대 크기를 byte 단위로 설정합니다.<br>`capped` option이 `true`일 경우 필수로 설정 해야 합니다. |
| max | number | 해당 collection에 추가 할 수 있는 최대 document 갯수를 설정합니다. |

```js
db.createCollection("book")

db.createCollection(
    "book",
    {
        capped: true, 
        size: 6142800, 
        max: 10000
    }
)
```


---


## Collection 삭제

```js
db.collection_name.drop()
```

- `db.collection`의 `drop` method를 사용합니다.

- 현재 사용 중인 database 내의 collection을 삭제합니다.
    - 삭제 전에는 필수적으로 `use database` 명령어를 이용하여 현재 database를 설정해야 합니다.

```js
use book
db.book.drop()
```


---


## Reference

- <https://inpa.tistory.com/entry/MONGO-📚-몽고디비-쿼리-정리#컬렉션_명령어>
