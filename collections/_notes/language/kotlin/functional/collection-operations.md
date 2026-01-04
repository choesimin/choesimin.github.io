---
layout: note
permalink: /399
title: Kotlin Collection 연산
description: Kotlin collection은 map, filter, reduce 등 풍부한 함수형 연산을 제공하여 data 변환과 처리를 선언적으로 표현합니다.
date: 2025-01-04
---


## Collection 연산

- Kotlin collection은 **함수형 연산을 통해 data를 선언적으로 처리**합니다.
    - 반복문 대신 고차 함수로 의도를 명확히 표현합니다.
    - method chaining으로 복잡한 data 변환을 간결하게 작성합니다.
    - 대부분의 연산은 새로운 collection을 반환하고 원본을 변경하지 않습니다.

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)

// 명령형 : 어떻게 처리할지 기술
val result1 = mutableListOf<Int>()
for (n in numbers) {
    if (n % 2 == 0) {
        result1.add(n * 2)
    }
}

// 함수형 : 무엇을 원하는지 선언
val result2 = numbers.filter { it % 2 == 0 }.map { it * 2 }
// [4, 8]
```


### 연산 분류

| 분류 | 연산 | 설명 |
| --- | --- | --- |
| 변환 | map, flatMap, flatten | element 변환 |
| Filter | filter, take, drop, distinct | 조건에 맞는 element 선택 |
| 집계 | reduce, fold, sum, count | 단일 값으로 축약 |
| 검사 | any, all, none | 조건 만족 여부 확인 |
| 정렬 | sorted, sortedBy | 순서 정렬 |
| Group | groupBy, partition, chunked | element grouping |
| 찾기 | find, first, last | 특정 element 검색 |
| 결합 | zip, associate | 여러 collection 결합 |


---


## 변환 연산

- 변환 연산은 **각 element를 다른 값으로 변환하여 새로운 collection을 생성**합니다.


### map

- **각 element에 변환 함수를 적용**하여 새로운 collection을 생성합니다.

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)

val doubled = numbers.map { it * 2 }
// [2, 4, 6, 8, 10]

val strings = numbers.map { "Number: $it" }
// ["Number: 1", "Number: 2", ...]
```


### mapIndexed

- **index와 element를 함께 사용**하여 변환합니다.

```kotlin
val letters = listOf("a", "b", "c")

val indexed = letters.mapIndexed { index, value -> "$index: $value" }
// ["0: a", "1: b", "2: c"]
```


### mapNotNull

- **변환 결과가 null이 아닌 것만 포함**합니다.

```kotlin
val strings = listOf("1", "two", "3", "four")

val numbers = strings.mapNotNull { it.toIntOrNull() }
// [1, 3]
```


### flatMap

- **각 element를 collection으로 변환한 후 평탄화**합니다.
    - map + flatten을 한 번에 수행합니다.

```kotlin
val sentences = listOf("Hello World", "Kotlin Programming")

val words = sentences.flatMap { it.split(" ") }
// ["Hello", "World", "Kotlin", "Programming"]

// 중첩 구조 처리
data class Department(val employees: List<String>)

val departments = listOf(
    Department(listOf("Kim", "Lee")),
    Department(listOf("Park", "Choi"))
)

val allEmployees = departments.flatMap { it.employees }
// ["Kim", "Lee", "Park", "Choi"]
```


### flatten

- **중첩된 collection을 단일 collection으로 평탄화**합니다.

```kotlin
val nested = listOf(
    listOf(1, 2),
    listOf(3, 4),
    listOf(5)
)

val flat = nested.flatten()
// [1, 2, 3, 4, 5]
```


---


## Filter 연산

- filter 연산은 **조건에 맞는 element만 선택하여 새로운 collection을 생성**합니다.


### filter

- **조건을 만족하는 element만 포함**합니다.

```kotlin
val numbers = listOf(1, 2, 3, 4, 5, 6)

val evens = numbers.filter { it % 2 == 0 }
// [2, 4, 6]

val greaterThan3 = numbers.filter { it > 3 }
// [4, 5, 6]
```


### filterNot

- **조건을 만족하지 않는 element만 포함**합니다.

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)

val notEven = numbers.filterNot { it % 2 == 0 }
// [1, 3, 5]
```


### filterNotNull

- **null이 아닌 element만 포함**합니다.

```kotlin
val nullable = listOf(1, null, 2, null, 3)

val nonNull = nullable.filterNotNull()
// [1, 2, 3]
```


### take와 drop

- **take** : 처음 n개의 element를 가져옵니다.
- **drop** : 처음 n개의 element를 제외합니다.

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)

numbers.take(3)      // [1, 2, 3]
numbers.takeLast(2)  // [4, 5]
numbers.drop(2)      // [3, 4, 5]
numbers.dropLast(2)  // [1, 2, 3]
```


### takeWhile과 dropWhile

- **조건을 만족하는 동안** 가져오거나 제외합니다.

```kotlin
val numbers = listOf(1, 2, 3, 4, 1, 2)

numbers.takeWhile { it < 4 }   // [1, 2, 3]
numbers.dropWhile { it < 3 }   // [3, 4, 1, 2]
```


### distinct

- **중복을 제거**합니다.

```kotlin
val numbers = listOf(1, 2, 2, 3, 3, 3)

numbers.distinct()   // [1, 2, 3]

// 특정 property 기준 중복 제거
data class Person(val name: String, val age: Int)

val people = listOf(
    Person("Kim", 25),
    Person("Lee", 30),
    Person("Kim", 28)
)

people.distinctBy { it.name }
// [Person(Kim, 25), Person(Lee, 30)]
```


---


## 집계 연산

- 집계 연산은 **collection의 모든 element를 처리하여 단일 값을 생성**합니다.


### reduce

- **element들을 누적하여 하나의 값으로 축약**합니다.
    - 첫 번째 element가 초기값이 됩니다.
    - 빈 collection에서 호출하면 exception이 발생합니다.

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)

val sum = numbers.reduce { acc, n -> acc + n }
// 15

val product = numbers.reduce { acc, n -> acc * n }
// 120

// 동작 과정 : reduce { acc, n -> acc + n }
// acc=1, n=2 -> 3
// acc=3, n=3 -> 6
// acc=6, n=4 -> 10
// acc=10, n=5 -> 15
```


### fold

- **초기값을 지정하여 element들을 누적**합니다.
    - reduce와 달리 초기값을 명시합니다.
    - 빈 collection에서도 초기값을 반환합니다.

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)

val sum = numbers.fold(0) { acc, n -> acc + n }
// 15

val sum10 = numbers.fold(10) { acc, n -> acc + n }
// 25

// 결과 type이 element type과 다를 수 있음
val concat = numbers.fold("") { acc, n -> acc + n.toString() }
// "12345"
```


### 편의 집계 함수

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)

numbers.sum()        // 15
numbers.average()    // 3.0
numbers.count()      // 5
numbers.max()        // 5
numbers.min()        // 1

// 조건부 count
numbers.count { it % 2 == 0 }   // 2

// property 기준 합계
data class Product(val name: String, val price: Int)

val products = listOf(
    Product("A", 1000),
    Product("B", 2000),
    Product("C", 1500)
)

products.sumOf { it.price }   // 4500
products.maxOf { it.price }   // 2000
products.minOf { it.price }   // 1000
```


### runningReduce와 runningFold

- **중간 누적 결과를 모두 반환**합니다.

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)

numbers.runningReduce { acc, n -> acc + n }
// [1, 3, 6, 10, 15]

numbers.runningFold(0) { acc, n -> acc + n }
// [0, 1, 3, 6, 10, 15]
```


---


## 검사 연산

- 검사 연산은 **collection의 element가 조건을 만족하는지 확인**합니다.


### any

- **하나라도 조건을 만족하면 true**를 반환합니다.

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)

numbers.any { it > 3 }      // true
numbers.any { it > 10 }     // false
numbers.any()               // true (비어있지 않음)
```


### all

- **모든 element가 조건을 만족하면 true**를 반환합니다.

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)

numbers.all { it > 0 }    // true
numbers.all { it > 3 }    // false
```


### none

- **모든 element가 조건을 만족하지 않으면 true**를 반환합니다.

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)

numbers.none { it > 10 }   // true
numbers.none { it > 3 }    // false
numbers.none()             // false (비어있지 않음)
```


### contains와 in

- **특정 element가 포함되어 있는지 확인**합니다.

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)

numbers.contains(3)   // true
3 in numbers          // true
10 in numbers         // false
```


---


## 정렬 연산

- 정렬 연산은 **element를 특정 순서로 정렬한 새로운 collection을 생성**합니다.


### sorted

- **자연 순서로 정렬**합니다.

```kotlin
val numbers = listOf(3, 1, 4, 1, 5, 9)

numbers.sorted()           // [1, 1, 3, 4, 5, 9]
numbers.sortedDescending() // [9, 5, 4, 3, 1, 1]
```


### sortedBy

- **특정 property나 변환 결과를 기준으로 정렬**합니다.

```kotlin
data class Person(val name: String, val age: Int)

val people = listOf(
    Person("Kim", 30),
    Person("Lee", 25),
    Person("Park", 28)
)

people.sortedBy { it.age }
// [Person(Lee, 25), Person(Park, 28), Person(Kim, 30)]

people.sortedByDescending { it.age }
// [Person(Kim, 30), Person(Park, 28), Person(Lee, 25)]
```


### sortedWith

- **Comparator를 사용하여 정렬**합니다.
    - 여러 기준으로 정렬할 때 유용합니다.

```kotlin
data class Person(val name: String, val age: Int)

val people = listOf(
    Person("Kim", 30),
    Person("Lee", 25),
    Person("Park", 25)
)

// 나이로 정렬, 같으면 이름으로 정렬
people.sortedWith(compareBy({ it.age }, { it.name }))
// [Person(Lee, 25), Person(Park, 25), Person(Kim, 30)]

// 나이 내림차순, 같으면 이름 오름차순
people.sortedWith(compareByDescending<Person> { it.age }.thenBy { it.name })
// [Person(Kim, 30), Person(Lee, 25), Person(Park, 25)]
```


### reversed와 shuffled

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)

numbers.reversed()   // [5, 4, 3, 2, 1]
numbers.shuffled()   // 무작위 순서
```


---


## Group 연산

- group 연산은 **element를 특정 기준으로 grouping**합니다.


### groupBy

- **key 기준으로 element를 grouping**하여 Map을 생성합니다.

```kotlin
val words = listOf("apple", "banana", "cherry", "apricot", "blueberry")

val byFirstLetter = words.groupBy { it.first() }
// {a=[apple, apricot], b=[banana, blueberry], c=[cherry]}

// value 변환과 함께 grouping
val byFirstLetterUppercase = words.groupBy(
    keySelector = { it.first() },
    valueTransform = { it.uppercase() }
)
// {a=[APPLE, APRICOT], b=[BANANA, BLUEBERRY], c=[CHERRY]}
```


### groupingBy와 eachCount

- **group별 개수를 효율적으로 계산**합니다.

```kotlin
val words = listOf("apple", "banana", "apple", "cherry", "banana", "apple")

val counts = words.groupingBy { it }.eachCount()
// {apple=3, banana=2, cherry=1}
```


### partition

- **조건에 따라 두 group으로 분리**합니다.
    - 조건을 만족하는 group과 만족하지 않는 group의 Pair를 반환합니다.

```kotlin
val numbers = listOf(1, 2, 3, 4, 5, 6)

val (evens, odds) = numbers.partition { it % 2 == 0 }
// evens = [2, 4, 6]
// odds = [1, 3, 5]
```


### chunked

- **지정한 크기로 collection을 분할**합니다.

```kotlin
val numbers = listOf(1, 2, 3, 4, 5, 6, 7)

numbers.chunked(3)
// [[1, 2, 3], [4, 5, 6], [7]]

// 변환과 함께 분할
numbers.chunked(3) { it.sum() }
// [6, 15, 7]
```


### windowed

- **sliding window 방식으로 collection을 분할**합니다.

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)

numbers.windowed(3)
// [[1, 2, 3], [2, 3, 4], [3, 4, 5]]

numbers.windowed(3, step = 2)
// [[1, 2, 3], [3, 4, 5]]

// 이동 평균 계산
numbers.windowed(3) { it.average() }
// [2.0, 3.0, 4.0]
```


---


## 찾기 연산

- 찾기 연산은 **조건에 맞는 특정 element를 검색**합니다.


### find와 findLast

- **조건을 만족하는 첫 번째/마지막 element를 반환**합니다.
    - 없으면 null을 반환합니다.

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)

numbers.find { it > 3 }       // 4
numbers.findLast { it > 3 }   // 5
numbers.find { it > 10 }      // null
```


### first와 last

- **첫 번째/마지막 element를 반환**합니다.
    - 조건을 지정할 수 있습니다.
    - 조건을 만족하는 element가 없으면 exception이 발생합니다.

```kotlin
val numbers = listOf(1, 2, 3, 4, 5)

numbers.first()              // 1
numbers.last()               // 5
numbers.first { it > 3 }     // 4
numbers.last { it < 3 }      // 2

// 안전한 버전 : 없으면 null
numbers.firstOrNull { it > 10 }   // null
numbers.lastOrNull { it > 10 }    // null
```


### indexOf와 lastIndexOf

- **element의 index를 반환**합니다.
    - 없으면 -1을 반환합니다.

```kotlin
val numbers = listOf(1, 2, 3, 2, 1)

numbers.indexOf(2)       // 1
numbers.lastIndexOf(2)   // 3
numbers.indexOf(10)      // -1

// 조건으로 검색
numbers.indexOfFirst { it > 2 }   // 2
numbers.indexOfLast { it > 2 }    // 2
```


### single

- **유일한 element를 반환**합니다.
    - element가 없거나 여러 개면 exception이 발생합니다.

```kotlin
val single = listOf(42)
single.single()   // 42

val multiple = listOf(1, 2, 3)
// multiple.single()   // exception

// 조건 지정
val numbers = listOf(1, 2, 3, 4, 5)
numbers.single { it == 3 }        // 3
numbers.singleOrNull { it > 10 }  // null
```


---


## 결합 연산

- 결합 연산은 **여러 collection을 결합하거나 변환**합니다.


### zip

- **두 collection의 element를 쌍으로 결합**합니다.
    - 길이가 다르면 짧은 쪽에 맞춥니다.

```kotlin
val names = listOf("Kim", "Lee", "Park")
val ages = listOf(25, 30, 28)

val pairs = names.zip(ages)
// [(Kim, 25), (Lee, 30), (Park, 28)]

// 변환과 함께 결합
val people = names.zip(ages) { name, age -> "$name($age)" }
// ["Kim(25)", "Lee(30)", "Park(28)"]
```


### unzip

- **Pair의 collection을 두 collection으로 분리**합니다.

```kotlin
val pairs = listOf("Kim" to 25, "Lee" to 30, "Park" to 28)

val (names, ages) = pairs.unzip()
// names = [Kim, Lee, Park]
// ages = [25, 30, 28]
```


### associate

- **collection을 Map으로 변환**합니다.

```kotlin
data class Person(val name: String, val age: Int)

val people = listOf(
    Person("Kim", 25),
    Person("Lee", 30)
)

// key-value Pair로 변환
val nameToAge = people.associate { it.name to it.age }
// {Kim=25, Lee=30}

// key만 지정
val byName = people.associateBy { it.name }
// {Kim=Person(Kim, 25), Lee=Person(Lee, 30)}

// value만 지정
val names = people.associateWith { it.age }
// {Person(Kim, 25)=25, Person(Lee, 30)=30}
```


### plus와 minus

- **element를 추가하거나 제거한 새 collection을 생성**합니다.

```kotlin
val numbers = listOf(1, 2, 3)

val added = numbers + 4           // [1, 2, 3, 4]
val addedList = numbers + listOf(4, 5)   // [1, 2, 3, 4, 5]

val removed = numbers - 2         // [1, 3]
val removedList = numbers - listOf(1, 2) // [3]
```


---


## 연산 Chaining

- 여러 연산을 연결하여 복잡한 data 처리를 간결하게 표현합니다.
    - 각 연산은 새로운 collection을 반환하므로 method chaining이 가능합니다.


### 실전 예제

```kotlin
data class Order(
    val id: String,
    val customer: String,
    val items: List<OrderItem>,
    val status: String
)

data class OrderItem(val product: String, val price: Int, val quantity: Int)

val orders = listOf(
    Order("1", "Kim", listOf(
        OrderItem("Apple", 1000, 2),
        OrderItem("Banana", 500, 3)
    ), "COMPLETED"),
    Order("2", "Lee", listOf(
        OrderItem("Cherry", 2000, 1)
    ), "PENDING"),
    Order("3", "Kim", listOf(
        OrderItem("Apple", 1000, 5)
    ), "COMPLETED")
)

// 완료된 주문의 고객별 총 매출
val salesByCustomer = orders
    .filter { it.status == "COMPLETED" }
    .groupBy { it.customer }
    .mapValues { (_, customerOrders) ->
        customerOrders.flatMap { it.items }
            .sumOf { it.price * it.quantity }
    }
// {Kim=8500}

// 가장 많이 팔린 상품 top 3
val topProducts = orders
    .flatMap { it.items }
    .groupBy { it.product }
    .mapValues { (_, items) -> items.sumOf { it.quantity } }
    .entries
    .sortedByDescending { it.value }
    .take(3)
    .map { it.key }
// [Apple, Banana, Cherry]
```


### 가독성 유지

- **과도한 chaining은 중간 변수로 분리**하여 가독성을 유지합니다.

```kotlin
// 과도한 chaining : 이해하기 어려움
val result = data
    .filter { it.isActive }
    .map { it.items }
    .flatten()
    .filter { it.price > 0 }
    .groupBy { it.category }
    .mapValues { it.value.sumOf { item -> item.price } }
    .filter { it.value > 1000 }

// 중간 변수로 의도 명확화
val activeItems = data
    .filter { it.isActive }
    .flatMap { it.items }
    .filter { it.price > 0 }

val expensiveCategories = activeItems
    .groupBy { it.category }
    .mapValues { (_, items) -> items.sumOf { it.price } }
    .filter { it.value > 1000 }
```


---


## Sequence와의 비교

- 대량의 data나 긴 연산 chain에서는 **Sequence가 더 효율적**입니다.
    - Collection은 각 연산마다 중간 collection을 생성합니다.
    - Sequence는 최종 연산 시점에 lazy하게 처리합니다.

| 특성 | Collection | Sequence |
| --- | --- | --- |
| 평가 시점 | 즉시 (eager) | 지연 (lazy) |
| 중간 결과 | 매 단계 생성 | 생성하지 않음 |
| 처리 순서 | 연산별 전체 처리 | element별 전체 연산 |
| 적합한 상황 | 작은 data, 짧은 chain | 대량 data, 긴 chain |

```kotlin
val numbers = (1..1_000_000).toList()

// Collection : 중간 list 2개 생성
val result1 = numbers
    .map { it * 2 }
    .filter { it > 100 }
    .take(10)

// Sequence : 중간 결과 없이 처리
val result2 = numbers.asSequence()
    .map { it * 2 }
    .filter { it > 100 }
    .take(10)
    .toList()
```


---


## Reference

- <https://kotlinlang.org/docs/collection-operations.html>
- <https://kotlinlang.org/docs/collection-filtering.html>
- <https://kotlinlang.org/docs/collection-aggregate.html>

