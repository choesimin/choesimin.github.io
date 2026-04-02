---
layout: note
permalink: /440
title: Java Stream
description: Java 8에서 도입된 Stream API는 collection과 배열을 lambda 기반의 함수형으로 처리하며, stream 생성 -> intermediate operation(filtering, mapping, sorting) -> terminal operation(collecting, reduction, matching) 순서로 data를 가공합니다.
date: 2026-04-02
---


## Stream

- **Stream**은 Java 8에서 추가된 data 처리 API로, 배열 또는 collection을 lambda를 활용하여 함수형으로 처리합니다.
    - 여러 함수를 조합하여 원하는 결과를 filtering하고 가공된 결과를 얻습니다.
    - 처리 흐름은 **stream 생성 -> intermediate operation -> terminal operation** 순서입니다.

- Stream 등장 이전에는 for 또는 foreach문으로 요소를 하나씩 꺼내서 처리했습니다.
    - logic이 복잡해질수록 code 양이 많아져 여러 logic이 섞였습니다.
    - method를 나눌 경우 loop를 여러 번 돌게 되는 문제가 있었습니다.

- 병렬 처리(multi-threading)가 가능하여 thread를 이용해 많은 요소들을 빠르게 처리합니다.


---


## Stream 생성

- Stream은 배열, collection, file, builder, `generate()`, `iterate()` 등 다양한 source에서 생성합니다.


### 배열 Stream

- `Arrays.stream()` method로 배열에서 stream을 생성합니다.

```java
String[] arr = new String[]{"a", "b", "c"};
Stream<String> stream = Arrays.stream(arr);
Stream<String> streamOfArrayPart = 
Arrays.stream(arr, 1, 3); // 1~2 요소 [b, c]
```


### Collection Stream

- `Collection` interface에 추가된 `default` method `stream()`을 이용합니다.

```java
public interface Collection<E> extends Iterable<E> {
  default Stream<E> stream() {
    return StreamSupport.stream(spliterator(), false);
  } 
  // ...
}
```

```java
List<String> list = Arrays.asList("a", "b", "c");
Stream<String> stream = list.stream();
Stream<String> parallelStream = list.parallelStream();   // 병렬 처리 Stream
```


### Empty Stream

- 요소가 없을 때 `null` 대신 빈 stream을 반환하여 `NullPointerException`을 방지합니다.

```java
public Stream<String> streamOf(List<String> list) {
  return list == null || list.isEmpty() ? Stream.empty() : list.stream();
}
```


### Stream.builder()

- `Builder`를 사용하면 stream에 직접적으로 원하는 값을 넣고, 마지막에 `build()` method로 stream을 return합니다.

```java
Stream<String> builderStream = Stream.<String>builder()
    .add("Eric").add("Elena").add("Java").build();    // [Eric, Elena, Java]
```


### Stream.generate()

- `Supplier<T>`에 해당하는 lambda로 값을 넣습니다.
    - `Supplier<T>`는 인자 없이 return 값만 있는 함수형 interface입니다.
    - 생성되는 stream은 크기가 무한(infinite)하기 때문에 `limit()`으로 최대 크기를 제한해야 합니다.

```java
public static<T> Stream<T> generate(Supplier<T> s) { ... }
```

```java
Stream<String> generatedStream = Stream.generate(() -> "gen").limit(5);    // [gen, gen, gen, gen, gen]
```


### Stream.iterate()

- 초기값과 해당 값을 다루는 lambda를 이용하여 stream에 들어갈 요소를 만듭니다.
    - 요소가 다음 요소의 input으로 들어갑니다.
    - stream size가 무한하기 때문에 `limit()`으로 제한해야 합니다.

```java
Stream<Integer> iteratedStream = Stream.iterate(30, n -> n + 2).limit(5);    // [30, 32, 34, 36, 38]
```


### 기본 Type Stream

- `IntStream`, `LongStream`, `DoubleStream`으로 기본 type을 직접 다룹니다.
    - generic을 사용하지 않기 때문에 불필요한 auto-boxing이 일어나지 않습니다.
    - 필요한 경우 `boxed()` method를 이용하여 boxing합니다.

```java
IntStream intStream = IntStream.range(1, 5);    // [1, 2, 3, 4]
LongStream longStream = LongStream.rangeClosed(1, 5);    // [1, 2, 3, 4, 5]
```

```java
Stream<Integer> boxedIntStream = IntStream.range(1, 5).boxed();
```

- Java 8의 `Random` class는 난수를 가지고 `IntStream`, `LongStream`, `DoubleStream`을 만들어냅니다.

```java
DoubleStream doubles = new Random().doubles(3);    // 난수 3개 생성
```


### 문자열 Stream

- `String`을 이용하여 stream을 생성합니다.
    - 각 문자(`char`)를 `IntStream`으로 변환 가능합니다. `char`는 본질적으로 숫자이기 때문입니다.

```java
IntStream charsStream = "Stream".chars();    // [83, 116, 114, 101, 97, 109]
```

- 정규표현식(RegEx)을 이용하여 문자열을 분리하고, 각 요소로 stream을 만듭니다.

```java
Stream<String> stringStream = Pattern.compile(", ").splitAsStream("Eric, Elena, Java");    // [Eric, Elena, Java]
```


### File Stream

- `Files.lines()` method는 file의 각 line을 `String` type의 stream으로 만듭니다.

```java
Stream<String> lineStream = Files.lines(Paths.get("file.txt"), Charset.forName("UTF-8"));
```


### Parallel Stream

- `parallelStream()` method를 사용하여 병렬 stream을 생성합니다.
    - 내부적으로 Fork/Join framework(Java 7 도입)를 사용하여 thread를 처리합니다.

```java
// 병렬 Stream 생성
Stream<Product> parallelStream = productList.parallelStream();

// 병렬 여부 확인
boolean isParallel = parallelStream.isParallel();
```

- 배열이나 일반 stream에서도 `parallel()` method로 병렬 stream을 생성합니다.
    - 다시 sequential mode로 돌리고 싶으면 `sequential()` method를 사용합니다.

```java
// 배열에서 병렬 Stream
Arrays.stream(arr).parallel();

// IntStream에서 병렬 Stream
IntStream intStream = IntStream.range(1, 150).parallel();

// 다시 sequential mode로 전환
IntStream sequentialStream = intStream.sequential();
```


### Stream 연결하기

- `Stream.concat()`으로 두 개의 stream을 연결하여 새로운 stream을 만듭니다.

```java
Stream<String> stream1 = Stream.of("Java", "Scala", "Groovy");
Stream<String> stream2 = Stream.of("Python", "Go", "Swift");
Stream<String> concat = Stream.concat(stream1, stream2);
// [Java, Scala, Groovy, Python, Go, Swift]
```


---


## Intermediate Operation (가공)

- intermediate operation은 stream을 **filtering, mapping, sorting 등으로 가공**하여 새로운 stream을 반환합니다.
    - 여러 개를 연결(chaining)하여 사용합니다.
    - 최종 연산(terminal operation)이 호출되기 전까지 실행되지 않는 lazy evaluation 방식입니다.


### Filtering

- `filter()`는 조건에 맞는 요소만 남기고 나머지를 제거합니다.

```java
List<String> names = List.of("Eric", "Elena", "Java");

Stream<String> filtered = names.stream()
    .filter(name -> name.contains("a"));    // [Elena, Java]
```


### Mapping

- `map()`은 각 요소를 **다른 값으로 변환**합니다.
    - `flatMap()`은 중첩된 구조를 flat하게 펼칩니다.

```java
List<String> names = List.of("Eric", "Elena", "Java");

// 대문자로 변환
Stream<String> upperNames = names.stream()
    .map(String::toUpperCase);    // [ERIC, ELENA, JAVA]
```

```java
// flatMap : 중첩 List를 flat하게 펼침
List<List<String>> nested = List.of(
    List.of("a", "b"),
    List.of("c", "d")
);

List<String> flat = nested.stream()
    .flatMap(Collection::stream)
    .collect(Collectors.toList());    // [a, b, c, d]
```


### Sorting

- `sorted()`는 요소를 정렬합니다.
    - 인자 없이 호출하면 natural order로 정렬하고, `Comparator`를 전달하면 custom 정렬이 가능합니다.

```java
List<String> names = List.of("Eric", "Elena", "Java");

// 기본 정렬 (사전순)
Stream<String> sorted = names.stream().sorted();    // [Elena, Eric, Java]

// 역순 정렬
Stream<String> reverseSorted = names.stream()
    .sorted(Comparator.reverseOrder());    // [Java, Eric, Elena]
```


### Iterating

- `peek()`는 각 요소를 **소비하지 않고 중간에 확인**하는 데 사용합니다.
    - 주로 debugging 용도로 사용합니다.

```java
List<String> names = List.of("Eric", "Elena", "Java");

names.stream()
    .peek(System.out::println)    // 각 요소 출력 (debugging)
    .map(String::toUpperCase)
    .collect(Collectors.toList());
```


---


## Terminal Operation (결과 만들기)

- terminal operation은 stream의 **최종 결과를 만들어내는 연산**입니다.
    - terminal operation이 호출되면 stream이 소비되어 재사용이 불가능합니다.


### Calculating

- 기본 type stream(`IntStream`, `LongStream`, `DoubleStream`)에서 **통계 연산**을 수행합니다.

```java
IntStream intStream = IntStream.of(1, 2, 3, 4, 5);

long count = intStream.count();      // 5
int sum = IntStream.of(1, 2, 3, 4, 5).sum();        // 15
OptionalInt min = IntStream.of(1, 2, 3, 4, 5).min();   // 1
OptionalInt max = IntStream.of(1, 2, 3, 4, 5).max();   // 5
OptionalDouble avg = IntStream.of(1, 2, 3, 4, 5).average();  // 3.0
```


### Reduction

- `reduce()`는 stream의 모든 요소를 **하나의 결과로 합산**합니다.
    - 초기값(identity)과 누적 함수(accumulator)를 인자로 받습니다.

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5);

// 초기값 0에서 시작하여 모든 요소를 합산
int sum = numbers.stream()
    .reduce(0, Integer::sum);    // 15

// 초기값 없이 사용 (결과가 Optional)
Optional<Integer> sumOpt = numbers.stream()
    .reduce(Integer::sum);    // Optional[15]
```


### Collecting

- `collect()`는 stream의 요소를 **Collection이나 다른 형태로 변환**합니다.
    - `Collectors` utility class가 다양한 collector를 제공합니다.

```java
List<String> names = List.of("Eric", "Elena", "Java");

// List로 수집
List<String> list = names.stream()
    .collect(Collectors.toList());

// Set으로 수집
Set<String> set = names.stream()
    .collect(Collectors.toSet());

// 문자열 결합
String joined = names.stream()
    .collect(Collectors.joining(", "));    // "Eric, Elena, Java"

// Grouping
Map<Integer, List<String>> grouped = names.stream()
    .collect(Collectors.groupingBy(String::length));
// {4=[Eric, Java], 5=[Elena]}
```


### Matching

- `anyMatch()`, `allMatch()`, `noneMatch()`는 조건에 대한 **boolean 결과를 반환**합니다.

```java
List<String> names = List.of("Eric", "Elena", "Java");

boolean anyMatch = names.stream()
    .anyMatch(name -> name.contains("a"));    // true (하나라도 만족)

boolean allMatch = names.stream()
    .allMatch(name -> name.length() > 3);     // true (모두 만족)

boolean noneMatch = names.stream()
    .noneMatch(name -> name.startsWith("Z")); // true (아무것도 만족하지 않음)
```


### Iterating

- `forEach()`는 stream의 각 요소에 대해 **지정된 동작을 수행**합니다.
    - return 값이 없는 terminal operation입니다.

```java
List<String> names = List.of("Eric", "Elena", "Java");

names.stream()
    .forEach(System.out::println);
// Eric
// Elena
// Java
```


---


## Reference

- <https://futurecreator.github.io/2018/08/26/java-8-streams/>
- <https://futurecreator.github.io/2018/08/26/java-8-streams-advanced/>

