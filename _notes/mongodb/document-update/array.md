---
layout: note
title: MongoDB Document의 배열 조작
date: 9999-01-01
---




<h1>작성 중</h1>





## 배열 값 추가/삭제 : `$push`, `$pull`

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



## Reference

- <https://www.zerocho.com/category/MongoDB/post/57a46d287c4a5115004e97eb>
- <https://inpa.tistory.com/entry/MONGO-📚-배열-수정-연산자>
