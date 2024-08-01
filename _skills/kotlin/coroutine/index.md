---
layout: skill
title: Kotlin Coroutine - 비동기 Programming 구현하기
date: 2024-08-01
---






## Coroutine - Kotlin의 비동기 작업을 처리하는 대표적인 방식

- 코루틴은 **함수의 실행을 일시 중지하고 나중에 재개**할 수 있는 기능을 제공하여, **비동기 코드를 동기 코드처럼 쉽게 작성**할 수 있게 합니다.

- 코루틴은 새로운 개념이 아니며, Go와 같은 일부 다른 프로그래밍 언어에서도 인기가 있습니다.

- 코틀린은 **언어 차원에서 코루틴 library를 지원**합니다.
    - Kotlin의 가장 **주된 비동기 코드 작업 방식**은 코루틴을 사용하는 것입니다.
    - 코루틴의 이점 중 하나는 개발자가 non-blocking 코드를 작성할 때와 blocking 코드를 작성할 때의 programming model이 거의 변하지 않는다는 점입니다.

```kotlin
fun postItem(item: Item) {
    launch {
        val token = preparePost()
        val post = submitPost(token, item)
        processPost(post)
    }
}

suspend fun preparePost(): Token {
    // makes a request and suspends the coroutine
    return suspendCoroutine { /* ... */ }
}
```

- 위 코드에서는 메인 스레드를 중단하지 않고 장시간 실행되는 작업을 시작합니다.

- `preparePost`에는 `suspend` 키워드를 사용하여 중단 가능한 함수로 선언합니다.
    - `preparePost` 함수는 실행되다가 일시 중단하고, 나중에 다시 실행을 재개할 수 있습니다.

- 함수 시그니처는 동일하게 유지되며, `suspend` 키워드가 추가되는 차이밖에 없습니다.
    - 비동기 코드이지만 동기 코드처럼 작성되며, 특별한 문법을 사용할 필요 없이 작성할 수 있습니다.
    - 코루틴을 시작하는 `launch` 함수만 사용하면 됩니다.

- `suspend` 함수에서 반복문, 예외 처리 등을 동일하게 사용할 수 있으며, 새로운 문법을 배울 필요가 없습니다.

- 플랫폼 독립적이어서 JVM, JavaScript 또는 다른 플랫폼을 대상으로 할 때도 코드가 동일합니다.
    - 컴파일러가 각 플랫폼에 맞게 적응시켜줍니다.

- Kotlin에서 코루틴은 대부분의 기능이 라이브러리에 위임되어 있습니다.
    - 따라서 `suspend` 키워드 외에는 언어에 추가된 키워드가 없으며, Kotlin에서는 Coroutine의 기능이 단순히 라이브러리 함수일 뿐입니다.
    - C#처럼 `async`와 `await`가 문법의 일부인 언어와는 다릅니다.




---




## 전통적인 비동기 처리 방식들 (Coroutine을 선택해야 할 이유)

- 비동기 프로그래밍은 애플리케이션이 블로킹되지 않도록 하는 기술입니다.
- 비동기 프로그래밍을 위한 전통적인 접근 방식으로는 쓰레드, 콜백, Future와 Promise, 리액티브 확장 등이 있습니다.
    - 전통적인 방식들은 각각의 문제점이 있으며, 특히 코드 가독성과 에러 처리가 어렵습니다.

- 코루틴은 함수의 실행을 일시 중지하고 나중에 재개할 수 있는 기능을 제공하고, 비동기 코드를 동기 코드처럼 쉽게 작성할 수 있게 해주어, 기존 방식의 문제점을 해소합니다.


### Thread

- 스레드는 애플리케이션이 블로킹되지 않도록 하는 가장 잘 알려진 방법입니다.

```kotlin
fun postItem(item: Item) {
    val token = preparePost()
    val post = submitPost(token, item)
    processPost(post)
}

fun preparePost(): Token {
    // makes a request and consequently blocks the main thread
    return token
}
```

- 위 코드에서 `preparePost`는 오래 걸리는 프로세스이며 UI를 블로킹할 수 있습니다.
    - 이를 별도의 스레드에서 실행하면 UI 블로킹을 피할 수 있습니다.

- 하지만 thread보다 Coroutine을 사용하는 것이 더 나은 이유가 있습니다.
    - 스레드는 비용이 많이 듭니다.
        - context switching(문맥 교환) 비용이 비싸기 때문입니다.
    - 스레드는 무한하지 않습니다.
        - thread의 갯수는 운영 체제가 제한합니다.
        - serer-side application에서 주요 병목 지점이 될 수 있습니다.
    - thread는 모든 곳에서 항상 사용할 수는 없습니다.
        - 모든 플랫폼이 스레드를 지원하지는 않습니다.
            - JavaScript는 thread를 지원하지 않습니다.
    - 스레드가 많아질수록 program이 어려워집니다.
        - thread를 디버깅하는 것과 및 경합 상태(race condition)를 관리하고 회피하는 것은 어려운 일입니다.


### Callback

- callback은 다른 함수의 인자로 

```kotlin
fun postItem(item: Item) {
    preparePostAsync { token ->
        submitPostAsync(token, item) { post ->
            processPost(post)
        }
    }
}

fun preparePostAsync(callback: (Token) -> Unit) {
    // make request and return immediately
    // arrange callback to be invoked later
}
```





---




## Reference

- <https://kotlinlang.org/docs/async-programming.html>
