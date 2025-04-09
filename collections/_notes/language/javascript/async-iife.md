---
layout: note
permalink: /69
title: JavaScript - await 바로 사용하기
description: JavaScript에서 async 함수 선언 없이 await를 바로 사용할 수 있습니다.
date: 2024-01-11
---


## JavaScript : `async` 함수 선언 없이 `await` 바로 사용하기

- `await` keyword는 `async` 함수 안에서만 사용할 수 있기 때문에, 함수 없이 즉시 실행해도 되는 경우에도 `async` 함수를 만들어서 호출해야 합니다.

- **`async` 함수 선언 없이 `await`를 사용하는 방법**으로 '즉시 실행 함수'가 있습니다.
    - **즉시 실행 함수**(Immediately Invoked Function Expression, IIFE)는 함수를 정의하는 동시에 실행하는 방식입니다.

- 함수 선언과 호출 과정을 생략할 수 있기 때문에, 비동기 작업이 필요한 간단한 node program을 만들 때 유용합니다.

```js
(async function() {
    await someAsyncFunction();
})();
```

```js
(async () => {
    await someAsyncFunction();
})();
```


---


## Reference

- <https://ko.javascript.info/intro>
- <https://developer.mozilla.org/ko/docs/Learn/JavaScript/First_steps/What_is_JavaScript>
