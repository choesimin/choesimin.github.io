---
layout: note
published: false
---

# Streams

- Java 8에서 추가됨
- data의 흐름
- lambda를 활용할 수 있는 기술 중 하나
- 배열 또는 collection instance에 함수 여러 개를 조합해서 원하는 결과를 filtering하고 가공된 결과를 얻을 수 있음
- 배열과 collection instance을 함수형으로 처리할 수 있음
    - lambda를 이용 : code의 양을 줄이고 간결하게 표현
- 등장 이전의 배열, collection 처리 방식
    - for 또는 foreach문을 돌면서 요소 하나씩을 꺼내서 다룸
    - logic이 복잡해질수록 code 양이 많아져 여러 logic이 섞임
        - method를 나눌 경우 loop를 여러 번 돌게 됨
- 병렬 처리(multi-threading)가 가능
    - thread를 이용해 많은 요소들을 빠르게 처리할 수 있음
- 사용법
    - stream -> intermediate operations -> terminal operations
        - 전체 -> Stream 생성 -> mapping 가공 -> filtering1 가공 -> filtering1 가공 -> 결과 만들기 -> 결과물



## 생성하기

- Stream Instance 생성

### 배열 Stream

- Arrays.stream method 사용
```java
String[] arr = new String[]{"a", "b", "c"};
Stream<String> stream = Arrays.stream(arr);
Stream<String> streamOfArrayPart = 
Arrays.stream(arr, 1, 3); // 1~2 요소 [b, c]
```

### Collection Stream

- Collection Interface에 추가된 default method stream()을 이용

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

- 요소가 없을 때 null 대신 사용할 수 있음

```java
public Stream<String> streamOf(List<String> list) {
  return list == null || list.isEmpty() ? Stream.empty() : list.stream();
}
```

### Stream.builder()

- Builder를 사용하면 Stream에 직접적으로 원하는 값을 넣을 수 있음
    - 마지막에 build() method로 Stream을 return

```java
Stream<String> builderStream = Stream.<String>builder()
    .add("Eric").add("Elena").add("Java").build();    // [Eric, Elena, Java]
```

### Stream.generate()

- Supplier<T> 에 해당하는 lambda로 값을 넣을 수 있음
    - Supplier<T> : 인자는 없고 return값만 있는 함수형 interface
        - 람다에서 리턴하는 값이 들어감
    ```java
    public static<T> Stream<T> generate(Supplier<T> s) { ... }
    ```

- 이 때 생성되는 Stream은 크기가 정해져있지 않고 무한(infinite)하기 때문에 특정 size로 최대 크기를 제한해야 함
    ```java
    Stream<String> generatedStream = Stream.generate(() -> "gen").limit(5);    // [el, el, el, el, el]
    ```

### Stream.iterate()

- 초기값과 해당 값을 다루는 lambda를 이용해서 Stream에 들어갈 요소를 만듬
    -  요소가 다음 요소의 input으로 들어감
    - Stream size가 무한하기 때문에 특정 size로 제한해야 함
    ```java
    Stream<Integer> iteratedStream = Stream.iterate(30, n -> n + 2).limit(5);    // [30, 32, 34, 36, 38]
    ```
        - 30이 초기값이고 값이 2씩 증가하는 값들이 들어감

### 기본 Type

- Generic을 사용하면 list나 배열을 이용해서 기본 type(int, long, double) 을 생성할 수 있지만 Generic을 사용하지 않고 직접적으로 해당 type의 stream을 다룰 수도 있음
- range와 rangeClosed 는 범위의 차이
    ```java
    IntStream intStream = IntStream.range(1, 5);    // [1, 2, 3, 4]
    LongStream longStream = LongStream.rangeClosed(1, 5);    // [1, 2, 3, 4, 5]
    ```

- Generic을 사용하지 않기 때문에 불필요한 auto-boxing이 일어나지 않음
    - 필요한 경우 boxed method를 이용해서 boxing할 수 있음
        ```java
        Stream<Integer> boxedIntStream = IntStream.range(1, 5).boxed();
        ```
- Java 8 의 Random class는 난수를 가지고 세 가지 type의 Stream(IntStream, LongStream, DoubleStream)을 만들어낼 수 있음
    - 쉽게 난수 Stream을 생성해서 여러 후속 작업이 가능
    ```java
    DoubleStream doubles = new Random().doubles(3);    // 난수 3개 생성
    ```

### 문자열 String

- String을 이용해서 Stream을 생성
- String의 각 문자(char)를 IntStream 으로 변환한 예제
    ```java
    IntStream charsStream = "Stream".chars();    // [83, 116, 114, 101, 97, 109]
    ```
        - char는 문자이지만 본질적으로는 숫자이기 때문에 가능

- 정규표현식(RegEx)을 이용해서 문자열을 자르고, 각 요소들로 Stream을 만든 예제
    ```java
    Stream<String> stringStream = Pattern.compile(", ").splitAsStream("Eric, Elena, Java");    // [Eric, Elena, Java]
    ```

### File Stream

- 'Java NIO > Files class > lines method'는 해당 file의 각 line을 String type의 Stream으로 만들어줌
    ```java
    Stream<String> lineStream = Files.lines(Paths.get("file.txt"), Charset.forName("UTF-8"));
    ```

### Parallel(병렬) Stream

- parallelStream method를 사용해서 병렬 Stream을 생성할 수 있음
    - thread를 처리하기 위해 내부적으로 Fork/Join framework(Java7 도입) 사용
```java
// 병렬 Stream 생성
Stream<Product> parallelStream = productList.parallelStream();

// 병렬 여부 확인
boolean isParallel = parallelStream.isParallel();
```

- thread를 이용한 병렬 처리 예시
    ```java
    boolean isMany = parallelStream
      .map(product -> product.getAmount() * 10)
      .anyMatch(amount -> amount > 200);
    ```

- 배열을 이용해서 병렬 Stream을 생성하는 경우
    ```java
    Arrays.stream(arr).parallel();
    ```

- Collection과 배열이 아닌 경우 : parallel method 사용
    ```java
    IntStream intStream = IntStream.range(1, 150).parallel();
    boolean isParallel = intStream.isParallel();
    ```

- 다시 sequential mode로 돌리고 싶을 때 : sequential method 사용
    ```java
    IntStream intStream = intStream.sequential();
    boolean isParallel = intStream.isParallel();
    ```

### Stream 연결하기

- 두 개의 Stream을 연결해서 새로운 Stream을 만들어낼 수 있음
```java
Stream<String> stream1 = Stream.of("Java", "Scala", "Groovy");
Stream<String> stream2 = Stream.of("Python", "Go", "Swift");
Stream<String> concat = Stream.concat(stream1, stream2);
// [Java, Scala, Groovy, Python, Go, Swift]
```




## 가공하기 : intermediate operations

- filtering 및 mapping 등 원하는 결과를 만들어가는 중간 작업

### Filtering

### Mapping

### Sorting

### Iterating





## 결과 만들기 : terminal operations

- 최종적으로 결과를 만들어내는 작업

### Calculating

### Reduction

### Collecting

### Matching

### Iterating



---

## Reference

- https://futurecreator.github.io/2018/08/26/java-8-streams/
- https://futurecreator.github.io/2018/08/26/java-8-streams-advanced/

