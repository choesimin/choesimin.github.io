---
layout: note
title: Kotlin Coroutine 개념 - 비동기 작업을 처리하는 방법
date: 2024-08-01
published: false
---




## Coroutine - Kotlin의 비동기 작업을 처리하는 대표적인 방식

- Coroutine은 **함수의 실행을 일시 중지하고 나중에 재개**할 수 있는 기능을 제공하여, **비동기 code를 동기 code처럼 쉽게 작성**할 수 있게 합니다.
    - Coroutine은 새로운 개념이 아니며, Go와 같은 일부 다른 programming 언어에서도 인기있는 개념입니다.

- Kotlin은 **언어 차원에서 Coroutine official library를 지원**합니다.
    - Kotlin에서 비동기 code를 작성할 때는 Coroutine을 사용하는 것이 매우 일반적입니다.

- Coroutine은 다양한 작업을 비동기적으로 진행할 때 필요한 요소이지만, thread와는 다른 개념입니다.
    - Coroutine은 thread와 함께 사용됩니다.
    - Coroutine은 code를 실행 중일 때 멈출 수 있고(suspendable), 다시 실행할 수 있는(resume) 제어 능력을 가지고 있지만, thread는 불가능합니다. 
    - Coroutine을 사용하면 작업을 쉽게 전환하며 thread를 옮겨다니며 작업할 수 있게 됩니다.
    - thread보다 효율적이고 처리 속도가 빠릅니다. 
    - non-blocking code를 작성할 때와 blocking code를 작성할 때의 programming model이 거의 변하지 않습니다.

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

- 위 code에서는 main thread를 중단하지 않고 장시간 동안 실행되는 작업을 시작합니다.

- `preparePost`에는 `suspend` keyword를 사용하여 중단 가능한 함수로 선언합니다.
    - `preparePost` 함수는 실행되다가 일시 중단하고, 나중에 다시 실행을 재개할 수 있습니다.

- 함수 signature는 동일하게 유지되며, 일반 동기 함수와 `suspend` keyword가 추가된다는 차이점밖에 없습니다.
    - 비동기 code이지만 동기 code처럼 작성되며, 특별한 문법을 사용하지 않고 작성할 수 있습니다.
    - 함수 내에서는 Coroutine을 시작하는 `launch` 함수만 사용하면 됩니다.

- `suspend` 함수에서는 반복문, 예외 처리 등을 동일하게 사용할 수 있으며, 따라서 새로운 문법을 배울 필요가 없습니다.

- platform 독립적이어서 JVM, JavaScript 또는 다른 platform을 대상으로 할 때도 code가 동일합니다.
    - compiler가 각 platform에 맞게 적응시켜줍니다.

- Kotlin에서 Coroutine은 대부분의 기능이 library에 위임되어 있습니다.
    - 따라서 `suspend` keyword 외에는 언어에 추가된 keyword가 없으며, Kotlin에서는 Coroutine의 기능이 단순히 library 함수일 뿐입니다.
    - C#처럼 `async`와 `await`가 문법의 일부인 언어와는 다릅니다.


---


## 전통적인 비동기 처리 방식들 (Coroutine을 선택해야 할 이유)

- 비동기 programming은 application이 blocking되지 않도록 하는 기술입니다.
- 비동기 programming을 위한 전통적인 접근 방식으로는 thread, callback, Future와 Promise, Rx(ReactiveX) 등이 있습니다.
    - 전통적인 방식들은 각각의 문제점이 있으며, 공통적으로 code 가독성이 좋지 않고 오류 처리가 어렵습니다.

- Coroutine은 함수의 실행을 일시 중지하고 나중에 재개할 수 있는 기능을 제공하고, 비동기 code를 동기 code처럼 쉽게 작성할 수 있게 해줍니다.
    - 기존의 전통적인 비동기 작업 처리 방식의 문제점을 해소시켜줍니다.


### Thread

- thread는 application이 blocking되지 않도록 하는 가장 잘 알려진 방법입니다.

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

- 위 code에서 `preparePost`는 오래 걸리는 process이며 UI를 blocking할 수 있습니다.
    - 이를 별도의 thread에서 실행하면 UI blocking을 피할 수 있습니다.

- 하지만 thread에는 몇가지 고질적인 단점이 있습니다.
    - thread는 비용이 많이 듭니다.
        - context switching(문맥 교환) 비용이 비싸기 때문입니다.
    - thread는 무한하지 않습니다.
        - thread의 갯수는 운영 체제가 제한합니다.
        - serer-side application에서 주요 병목 지점이 될 수 있습니다.
    - thread는 모든 곳에서 항상 사용할 수는 없습니다.
        - 모든 platform이 thread를 지원하지는 않습니다.
            - JavaScript는 thread를 지원하지 않습니다.
    - thread가 많아질수록 program이 어려워집니다.
        - thread를 debugging하는 것과 및 경합 상태(race condition)를 관리하고 회피하는 것은 어려운 일입니다.

- 따라서 대부분의 thread를 사용해야 하는 일반적인 경우에는 Coroutine을 사용하는 것이 더 낫습니다.


### Callback

- callback 함수의 개념은 한 함수를 다른 함수의 인자로 전달하고, 그 process가 완료되면 전달된 함수를 호출하는 것입니다.

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

- callback 함수를 사용하는 것은 thread를 사용하는 것보다 더 나은 방법처럼 보이지만, 여러 가지 문제가 있습니다.
    - **callback 지옥(callback hell)** : callback으로 사용되는 함수는 가끔 자체 callback이 필요하게 되는데, 이는 일련의 중첩된 callback으로 이어져 이해하기 어려운 code를 만들게 됩니다.
        - 이 pattern은 기울어진 christmas tree(중괄호가 나무의 가지를 나타냄)라고도 불립니다.
    - **복잡한 오류 처리** : 중첩 model은 오류 처리 및 전파를 더 복잡하게 만듭니다.

- callback은 JavaScript와 같은 event loop architecture에서 매우 흔하지만, 그마저도 Promise나 Rx와 같은 다른 방식을 사용하는 쪽으로 옮겨가고 있습니다.


### Future, Promise

- Future 또는 Promise는 호출을 할 때, 어떤 시점에 Promise라는 객체를 반환할 것을 약속받는다는 것입니다.

```kotlin
fun postItem(item: Item) {
    preparePostAsync()
        .thenCompose { token ->
            submitPostAsync(token, item)
        }
        .thenAccept { post ->
            processPost(post)
        }
}

fun preparePostAsync(): Promise<Token> {
    // makes request and returns a promise that is completed later
    return promise
}
```

- 이 접근 방식을 적용하기 위해서는 programming 방식에 변화가 있어야 합니다.
	- **다른 Programming Model** : callback과 유사하게 상향식 명령형 접근 방식에서 연결된 호출(chaining)이 있는 구성적인 programming model을 새로 익혀야 합니다.
        - loop, 예외 처리 등과 같은 전통적인 program 구조는 이 model에서는 더 이상 유효하지 않습니다.
	- **다른 API** : `thenCompose`나 `thenAccept`와 같은 완전히 새로운 API를 배워야 하며, 이는 platform에 따라 달라집니다.
	- **특정 반환 Type** : 반환 type은 실제로 필요한 data에서 벗어나 대신 Promise라는 새로운 type을 반환하며, 이를 사용하기 위해서는 내부를 조사해야 합니다.
	- **오류 처리가 복잡함** : 오류의 전파와 chaining이 항상 직관적이지는 않습니다.


### Rx (ReactiveX)

- Rx(ReactiveX)은 Erik Meijer에 의해 C#에 도입되었습니다.
- 처음에는 .NET platform에서 사용되었지만, Netflix가 이를 Java로 이식(porting)하여 RxJava라고 명명하면서 주류 채택에 이르렀습니다.
    - 그 이후로 JavaScript(RxJS)를 포함한 다양한 platform에 여러 porting이 제공되었습니다.

- Rx의 아이디어는 관찰 가능한 stream(observable streams)으로 이동하는 것으로, data를 stream(무한한 양의 data)으로 생각하고 이러한 stream을 관찰할 수 있다는 것입니다.
    - 실질적으로 Rx는 data 작업을 가능하게 하는 일련의 확장된 기능이 있는 observer pattern일 뿐입니다.

```kotlin
import io.reactivex.rxjava3.core.Single
import io.reactivex.rxjava3.schedulers.Schedulers

fun postItem(item: Item) {
    preparePostAsync()
        .flatMap { token ->
            submitPostAsync(token, item)
        }
        .subscribe(
            { post -> processPost(post) },
            { error -> println("Error : ${error.message}") }
        )
}

fun preparePostAsync(): Single<Token> {
    return Single.fromCallable {
        // makes a request and returns a Single that will be completed later
        token
    }.subscribeOn(Schedulers.io())
}
```

- 접근 방식에서 Future와 상당히 유사하지만, Future는 개별 요소를 반환하는 반면에, Rx는 stream을 반환합니다.
    - Rx는 Future 방식보다 오류 처리를 하기가 더 좋습니다.

- Rx 역시 programming model에 대한 새로운 사고 방식을 도입하며, 이는 "모든 것은 stream이고, 관찰 가능하다"라는 말로 표현할 수 있습니다.
    - Rx도 문제에 접근하는 방법에 있어서 동기 code 작성 시에 익숙한 방식과 다른 방식(새로운 programming model)을 사용해야 한다는 것을 의미합니다.

- Future와는 달리 Rx는 많은 platform에 porting되어 있기 때문에 C#, Java, JavaScript 또는 Rx가 제공되는 다른 언어를 사용할 때 일관된 API 경험을 제공할 수 있다는 장점이 있습니다.

- 복잡한 event stream을 처리해야 하는 경우에는 Rx가 더 적합하고, 순차적이고 간단한 비동기 작업을 효율적으로 관리해야 하는 경우에는 Coroutine이 더 적합합니다.
    - Rx는 복잡한 data stream과 event 기반 비동기 작업에 적합하며, 연산자를 사용한 data 변환과 결합 기능이 강력합니다.
    - 반면에 Coroutine은 간단한 비동기 작업을 동기 code처럼 작성할 수 있게 해주며, 순차적인 비동기 작업과 성능 최적화에 유리합니다.
    - 따라서 Rx와 Coroutine은 상황에 맞추어 선택해 사용하면 됩니다.


---


## Reference

- <https://kotlinlang.org/docs/async-programming.html>
