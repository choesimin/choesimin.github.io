---
layout: note
permalink: /228
title: Java - 실패하면 재시도하는 2가지 방법
description: Java에서 실패했을 때 재시도하는 방법으로 반복문과 재귀 함수를 사용하는 2가지 방법이 있습니다.
date: 2023-07-20
---


## Re-Try-Catch : 재시도 논리

- 개발하다보면 실패했을 때 다시 시도하는 논리를 구현해야 할 때가 있습니다.
- 재시도 논리는 여러 가지 방법으로 구현할 수 있습니다.

| 구현 방법 | 설명 |
| --- | --- |
| 반복문 사용하기 | 성공한 경우에 `while`이나 `for` block을 빠져나가도록 합니다. |
| 재귀 함수 사용하기 | 실패한 경우 자기 자신을 호출합니다. |


---


## 1. 반복문을 사용하여 재시도 논리 구현하기

- 일반적으로 반복문을 사용하는 것이 재귀 함수를 사용하는 것보다 더 직관적입니다.
- 모든 과정이 성공한 후에 `break;` 또는 `return;`으로 반복문을 빠져나옵니다.
- 과정 도중에 오류가 발생하면 `catch` block으로 넘어가 오류를 처리하고 시도합니다.
    - `catch` block에는 탈출을 위한 code가 없기 때문에, 반복문의 처음으로 돌아가 다시 과정을 시작합니다.


### while문 사용

```java
int tryCount = 0;
int limitCount = 3;

while (tryCount < limitCount) {
    tryCount = tryCount + 1;
    try {
        doSomething();
        break;
    } catch (SomeException e) {
        handleException(e);
    }
}
```


### for문 사용

```java
int limitCount = 3;

for (int tryCount = 0; tryCount < limitCount; tryCount++) {
    try {
        doSomething();
        break;
    } catch (SomeException e) {
        handleException(e);
    }
}
```


---


## 2. 재귀 함수를 사용하여 재시도 논리 구현하기

- 재귀 함수는 보통 사용하지 않는 편이 좋지만, 특정 상황에서는 유용하게 활용할 수 있습니다.
    - 재귀 함수는 일반적으로 반복문에 비해 memory를 더 많이 사용합니다.
    - 재귀 함수를 사용하여 가독성이나 생산성이 크게 좋아진다면 사용을 고려해 볼 수 있습니다.

```java
/* 선언부 */
void trySomething(int tryCount, int limitCount) {
    tryCount = tryCount + 1;
    try {
        doSomething();
    } catch (SomeException e) {
        handleException();

        if (tryCount < limitCount) trySomething(tryCount, limitCount);
        else break;
    }
}

/* 호출부 */
trySomething(0, 3);
```


---


## Reference

- <https://stackoverflow.com/questions/13239972/how-do-you-implement-a-re-try-catch>
