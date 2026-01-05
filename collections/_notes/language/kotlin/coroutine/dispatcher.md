---
layout: note
permalink: /114
title: Kotlin Coroutine Dispatcher
description: Dispatcher는 coroutine이 실행될 thread를 결정하며, Dispatchers.Main, IO, Default, Unconfined 네 가지가 기본 제공됩니다.
date: 2025-01-05
---


## Dispatcher

- **Dispatcher**는 coroutine이 어떤 thread 또는 thread pool에서 실행될지 결정합니다.
    - coroutine context의 일부로, coroutine builder에 전달합니다.
    - 작업 특성에 맞는 dispatcher를 선택하여 성능을 최적화합니다.

```kotlin
launch(Dispatchers.IO) {
    // I/O thread pool에서 실행
    val data = fetchFromNetwork()
}

launch(Dispatchers.Default) {
    // CPU 연산용 thread pool에서 실행
    val result = calculatePrimes(1000000)
}
```


### 기본 제공 Dispatcher

- Kotlin coroutine은 네 가지 기본 dispatcher를 제공합니다.

| Dispatcher | 용도 | Thread Pool |
| --- | --- | --- |
| `Dispatchers.Main` | UI 작업 | Main/UI thread (단일) |
| `Dispatchers.IO` | I/O 작업 | 최대 64개 또는 core 수 |
| `Dispatchers.Default` | CPU 집약적 작업 | CPU core 수만큼 |
| `Dispatchers.Unconfined` | 특수 용도 | 호출한 thread |


---


## Dispatchers.Main

- **`Dispatchers.Main`**은 UI thread에서 coroutine을 실행합니다.
    - Android, JavaFX, Swing 등 UI framework에서 사용합니다.
    - UI update는 반드시 main thread에서 수행해야 합니다.

```kotlin
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        lifecycleScope.launch(Dispatchers.Main) {
            val data = withContext(Dispatchers.IO) {
                api.fetchData()
            }
            // Main thread에서 UI update
            textView.text = data.toString()
        }
    }
}
```


### Main.immediate

- **`Dispatchers.Main.immediate`**는 이미 main thread에 있으면 즉시 실행합니다.
    - 일반 `Main`은 항상 dispatch하여 다음 loop에서 실행됩니다.
    - `immediate`는 불필요한 dispatch를 방지합니다.

```kotlin
// 이미 Main thread에 있을 때
launch(Dispatchers.Main) {
    println("1")  // 다음 loop에서 실행
}
println("2")
// 출력 : 2, 1

launch(Dispatchers.Main.immediate) {
    println("1")  // 즉시 실행
}
println("2")
// 출력 : 1, 2
```


---


## Dispatchers.IO

- **`Dispatchers.IO`**는 I/O 작업에 최적화된 thread pool에서 실행합니다.
    - network 요청, file 읽기/쓰기, database 작업에 사용합니다.
    - blocking I/O 작업이 다른 coroutine을 방해하지 않도록 합니다.

```kotlin
suspend fun readFile(path: String): String {
    return withContext(Dispatchers.IO) {
        File(path).readText()
    }
}

suspend fun fetchUsers(): List<User> {
    return withContext(Dispatchers.IO) {
        api.getUsers()  // network 호출
    }
}
```


### IO Dispatcher의 Thread Pool

- 기본적으로 **64개 thread** 또는 **CPU core 수** 중 큰 값을 최대로 사용합니다.
    - blocking 작업이 많아도 thread가 부족하지 않도록 충분히 확보합니다.
    - `kotlinx.coroutines.io.parallelism` system property로 조정 가능합니다.

```kotlin
// thread 수 확인
println(System.getProperty("kotlinx.coroutines.io.parallelism"))

// 실행 thread 확인
launch(Dispatchers.IO) {
    println("Running on: ${Thread.currentThread().name}")
    // 출력 예 : Running on: DefaultDispatcher-worker-1
}
```


### IO와 Default의 Thread 공유

- `Dispatchers.IO`와 `Dispatchers.Default`는 **동일한 thread pool을 공유**합니다.
    - 불필요한 thread 전환을 방지합니다.
    - `withContext(Dispatchers.IO)`에서 `withContext(Dispatchers.Default)`로 전환해도 thread가 바뀌지 않을 수 있습니다.

```kotlin
launch(Dispatchers.Default) {
    println("Default: ${Thread.currentThread().name}")

    withContext(Dispatchers.IO) {
        println("IO: ${Thread.currentThread().name}")
        // 같은 thread일 수 있음
    }
}
```


---


## Dispatchers.Default

- **`Dispatchers.Default`**는 CPU 집약적 작업에 최적화된 thread pool에서 실행합니다.
    - 복잡한 계산, 정렬, JSON parsing 등에 사용합니다.
    - CPU core 수만큼의 thread를 사용합니다.

```kotlin
suspend fun processImage(image: ByteArray): ByteArray {
    return withContext(Dispatchers.Default) {
        // CPU 집약적 이미지 처리
        applyFilters(image)
    }
}

suspend fun calculatePrimes(limit: Int): List<Int> {
    return withContext(Dispatchers.Default) {
        (2..limit).filter { isPrime(it) }
    }
}
```


### Default Dispatcher의 Thread Pool

- **CPU core 수**만큼의 thread를 사용합니다.
    - 최소 2개의 thread를 보장합니다.
    - CPU bound 작업에 최적화되어 있어 thread 수를 늘려도 성능이 향상되지 않습니다.

```kotlin
// core 수 확인
println(Runtime.getRuntime().availableProcessors())

// Default dispatcher의 parallelism
println(Dispatchers.Default)
// 출력 예 : Dispatchers.Default
```


### limitedParallelism

- **`limitedParallelism`**으로 동시 실행 수를 제한한 dispatcher를 생성합니다.
    - 특정 작업의 동시성을 제한해야 할 때 사용합니다.
    - 원본 dispatcher의 thread pool을 공유합니다.

```kotlin
// 최대 4개의 coroutine만 동시 실행
val limitedDispatcher = Dispatchers.Default.limitedParallelism(4)

repeat(100) {
    launch(limitedDispatcher) {
        // 동시에 최대 4개만 실행
        heavyComputation()
    }
}
```


---


## Dispatchers.Unconfined

- **`Dispatchers.Unconfined`**는 특정 thread에 국한되지 않는 dispatcher입니다.
    - 첫 suspension point까지 호출한 thread에서 실행됩니다.
    - suspension 후에는 재개하는 thread에서 계속 실행됩니다.

```kotlin
launch(Dispatchers.Unconfined) {
    println("Start: ${Thread.currentThread().name}")  // main

    delay(100)

    println("After delay: ${Thread.currentThread().name}")  // kotlinx.coroutines.DefaultExecutor
}
```


### Unconfined 사용 주의 사항

- **일반적인 code에서는 사용을 권장하지 않습니다**.
    - 실행 thread가 예측 불가능합니다.
    - nested coroutine에서 예기치 않은 동작을 유발할 수 있습니다.

- **적합한 사용 사례**는 제한적입니다.
    - test code에서 dispatch overhead를 제거할 때 사용합니다.
    - coroutine이 특정 thread를 점유하면 안 되는 특수한 경우에 사용합니다.

```kotlin
// test에서 사용 예
@Test
fun testUnconfined() = runTest(UnconfinedTestDispatcher()) {
    // dispatch 없이 즉시 실행
    val result = fetchData()
    assertEquals(expected, result)
}
```


---


## withContext

- **`withContext`**는 coroutine의 dispatcher를 일시적으로 전환합니다.
    - block이 완료되면 원래 dispatcher로 돌아옵니다.
    - `suspend` 함수 내에서 dispatcher를 전환하는 표준 방법입니다.

```kotlin
suspend fun fetchAndProcess(): Result {
    // 현재 dispatcher에서 시작

    val data = withContext(Dispatchers.IO) {
        api.fetchData()  // IO dispatcher
    }

    val processed = withContext(Dispatchers.Default) {
        process(data)  // Default dispatcher
    }

    return processed  // 원래 dispatcher
}
```


### withContext vs launch

- `withContext`는 **순차적**으로 실행하고 결과를 반환합니다.
- `launch`는 **병렬**로 실행하고 `Job`을 반환합니다.

```kotlin
// 순차 실행 : 2초 소요
suspend fun sequential() {
    val result1 = withContext(Dispatchers.IO) {
        delay(1000)
        "result1"
    }
    val result2 = withContext(Dispatchers.IO) {
        delay(1000)
        "result2"
    }
}

// 병렬 실행 : 1초 소요
suspend fun parallel() = coroutineScope {
    val deferred1 = async(Dispatchers.IO) { delay(1000); "result1" }
    val deferred2 = async(Dispatchers.IO) { delay(1000); "result2" }
    deferred1.await() to deferred2.await()
}
```


---


## Custom Dispatcher

- 특수한 요구 사항이 있을 때 custom dispatcher를 생성합니다.


### newSingleThreadContext

- **단일 thread**에서 실행되는 dispatcher를 생성합니다.
    - 특정 작업을 순차적으로 실행해야 할 때 사용합니다.
    - 사용 후 `close()`로 resource를 해제해야 합니다.

```kotlin
val singleThreadDispatcher = newSingleThreadContext("MySingleThread")

launch(singleThreadDispatcher) {
    println("Running on: ${Thread.currentThread().name}")
    // 출력 : Running on: MySingleThread
}

// 사용 완료 후 해제
singleThreadDispatcher.close()
```


### newFixedThreadPoolContext

- **고정 크기 thread pool**을 가진 dispatcher를 생성합니다.
    - 동시 실행 수를 정확히 제어해야 할 때 사용합니다.
    - 마찬가지로 사용 후 `close()`가 필요합니다.

```kotlin
val fixedPool = newFixedThreadPoolContext(4, "FixedPool")

repeat(10) { i ->
    launch(fixedPool) {
        println("Task $i on ${Thread.currentThread().name}")
    }
}

// 사용 완료 후 해제
fixedPool.close()
```


### ExecutorService를 Dispatcher로 변환

- 기존 `ExecutorService`를 dispatcher로 사용합니다.

```kotlin
val executor = Executors.newFixedThreadPool(4)
val dispatcher = executor.asCoroutineDispatcher()

launch(dispatcher) {
    // executor의 thread에서 실행
}

// 사용 완료 후 해제
dispatcher.close()
executor.shutdown()
```


---


## Dispatcher 선택 Guide

- 작업 특성에 따라 적절한 dispatcher를 선택합니다.

| 작업 유형 | 권장 Dispatcher | 이유 |
| --- | --- | --- |
| UI update | `Main` | UI thread에서만 가능 |
| Network 요청 | `IO` | blocking I/O 작업 |
| File 읽기/쓰기 | `IO` | blocking I/O 작업 |
| Database 작업 | `IO` | blocking I/O 작업 |
| JSON parsing | `Default` | CPU 연산 |
| 이미지 처리 | `Default` | CPU 연산 |
| 정렬/검색 | `Default` | CPU 연산 |
| 암호화 | `Default` | CPU 연산 |


### Main-Safety 보장

- `suspend` 함수는 어떤 dispatcher에서 호출해도 안전하게 동작해야 합니다.
    - 내부에서 적절한 dispatcher로 전환합니다.

```kotlin
// 좋은 예 : main-safe 함수
suspend fun fetchUsers(): List<User> {
    return withContext(Dispatchers.IO) {
        api.getUsers()
    }
}

// 나쁜 예 : 호출자가 dispatcher를 신경 써야 함
suspend fun fetchUsersUnsafe(): List<User> {
    return api.getUsers()  // 어떤 thread에서 실행될지 모름
}
```


---


## 실전 예제

- 실무에서는 I/O와 CPU 작업 조합, 병렬 I/O 실행, 동시 요청 수 제한 등의 pattern을 자주 사용합니다.
    - 각 작업 특성에 맞는 dispatcher를 선택하고 조합하여 효율적인 비동기 처리를 구현합니다.


### 복합 작업 처리

- I/O와 CPU 작업을 조합하는 전형적인 pattern입니다.

```kotlin
suspend fun loadAndProcessImage(url: String): Bitmap {
    // 1. Network에서 image 다운로드 (IO)
    val bytes = withContext(Dispatchers.IO) {
        imageApi.download(url)
    }

    // 2. Image decoding 및 처리 (Default)
    val processed = withContext(Dispatchers.Default) {
        val bitmap = BitmapFactory.decodeByteArray(bytes, 0, bytes.size)
        applyFilters(bitmap)
    }

    return processed
}
```


### 병렬 I/O 작업

- 여러 I/O 작업을 병렬로 실행합니다.

```kotlin
suspend fun fetchAllData(): DashboardData = coroutineScope {
    val users = async(Dispatchers.IO) { userApi.getAll() }
    val orders = async(Dispatchers.IO) { orderApi.getRecent() }
    val stats = async(Dispatchers.IO) { statsApi.getSummary() }

    DashboardData(
        users = users.await(),
        orders = orders.await(),
        stats = stats.await()
    )
}
```


### Rate Limiting

- `limitedParallelism`으로 동시 요청 수를 제한합니다.

```kotlin
class ApiClient {
    // 동시 요청 최대 10개로 제한
    private val rateLimitedDispatcher = Dispatchers.IO.limitedParallelism(10)

    suspend fun fetchData(id: String): Data {
        return withContext(rateLimitedDispatcher) {
            api.fetch(id)
        }
    }
}
```


---


## Reference

- <https://kotlinlang.org/docs/coroutine-context-and-dispatchers.html>
- <https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-dispatchers/>

