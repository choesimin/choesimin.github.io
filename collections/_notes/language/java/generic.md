---
layout: note
permalink: /434
title: Java Generic
description: Java generic은 type을 parameter화하여 compile time에 type 안전성을 보장하고, code 재사용성을 높이며, type erasure를 통해 하위 호환성을 유지합니다.
date: 2025-06-01
---


## Generic

- `Generic`은 **type을 parameter로 사용**하여 class, interface, method를 정의하는 기능입니다.
    - type이 class 내부에서 고정되지 않고, 외부에서 사용 시점에 지정됩니다.
    - compile time에 type을 검사하여 runtime error를 방지합니다.
    - Java 5에서 도입되었으며 Collection Framework의 핵심 기반입니다.

```java
// Generic 없이 - Object로 처리
List list = new ArrayList();
list.add("hello");
String s = (String) list.get(0);  // casting 필요

// Generic 사용 - type 지정
List<String> list = new ArrayList<>();
list.add("hello");
String s = list.get(0);  // casting 불필요
```


---


## Generic 이전의 문제점

- generic 등장 이전에는 **`Object` type과 casting에 의존**하여 여러 문제가 있었습니다.
    - runtime에서야 type 불일치 오류를 발견할 수 있었습니다.
    - 모든 접근에서 명시적 casting이 필요했습니다.


### Type 안전성 부재

- `Object` type으로 저장하면 **어떤 type이든 추가 가능**하여 runtime error가 발생합니다.

```java
List list = new ArrayList();
list.add("hello");
list.add(123);  // 다른 type도 추가 가능

for (Object obj : list) {
    String s = (String) obj;  // ClassCastException 발생
}
```

- compile time에는 오류가 없지만 runtime에 `ClassCastException`이 발생합니다.
- bug 발견 시점이 늦어질수록 수정 비용이 증가합니다.


### 명시적 Casting 필요

- `Object`로 저장된 data를 사용하려면 **매번 casting이 필요**합니다.

```java
List list = new ArrayList();
list.add("hello");

// 매번 casting 필요
String s = (String) list.get(0);
int length = ((String) list.get(0)).length();
```

- code가 장황해지고 가독성이 떨어집니다.
- casting 실수로 인한 runtime error 가능성이 높습니다.


---


## Generic의 장점

- generic은 **type 안전성과 code 재사용성**을 동시에 제공합니다.
    - compile time에 type 검사를 수행합니다.
    - 불필요한 casting을 제거합니다.
    - 동일한 logic을 다양한 type에 적용합니다.


### Compile Time Type 검사

- 잘못된 type 사용을 **compile 단계에서 감지**합니다.

```java
List<String> list = new ArrayList<>();
list.add("hello");
list.add(123);  // compile error : incompatible types
```

- runtime이 아닌 compile time에 오류를 발견하여 bug를 조기에 수정합니다.


### Casting 제거

- type이 지정되어 있으므로 **자동으로 올바른 type을 반환**합니다.

```java
List<String> list = new ArrayList<>();
list.add("hello");

String s = list.get(0);  // casting 불필요
int length = list.get(0).length();  // 바로 method 호출 가능
```


### Code 재사용성

- type만 다르고 logic이 동일한 경우 **하나의 class로 여러 type을 처리**합니다.

```java
public class Box<T> {
    private T item;

    public void set(T item) {
        this.item = item;
    }

    public T get() {
        return item;
    }
}

Box<String> stringBox = new Box<>();
Box<Integer> intBox = new Box<>();
Box<User> userBox = new Box<>();
```

- `String`, `Integer`, `User` 각각에 대해 별도의 `Box` class를 만들 필요가 없습니다.


---


## Type Parameter 명명 규칙

- generic type parameter는 **관례적으로 대문자 한 글자**를 사용합니다.
    - 일반 class나 interface 이름과 구분하기 위함입니다.
    - 정해진 규칙은 아니지만 대부분의 Java code에서 따릅니다.

| parameter | 의미 | 사용 예시 |
| --- | --- | --- |
| `T` | Type | `Box<T>`, `List<T>` |
| `E` | Element | `Collection<E>`, `List<E>` |
| `K` | Key | `Map<K, V>` |
| `V` | Value | `Map<K, V>` |
| `N` | Number | `Calculator<N extends Number>` |
| `R` | Return type | `Function<T, R>` |
| `S`, `U` | 추가 type | 여러 type parameter 필요 시 |


---


## Generic Class와 Interface

- class나 interface 이름 뒤에 **`<T>`를 붙여 generic으로 선언**합니다.
    - type parameter는 해당 class나 interface 범위 내에서만 유효합니다.
    - 여러 type parameter가 필요하면 comma로 구분합니다.


### Generic Class 선언

- class 선언 시 **type parameter를 지정**합니다.

```java
public class Pair<K, V> {
    private K key;
    private V value;

    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public K getKey() {
        return key;
    }

    public V getValue() {
        return value;
    }
}

// 사용
Pair<String, Integer> pair = new Pair<>("age", 25);
String key = pair.getKey();      // "age"
Integer value = pair.getValue();  // 25
```


### Generic Interface 선언

- interface도 **동일한 방식으로 generic 선언**이 가능합니다.

```java
public interface Repository<T, ID> {
    T findById(ID id);
    void save(T entity);
    void delete(T entity);
}

public class UserRepository implements Repository<User, Long> {
    @Override
    public User findById(Long id) {
        // 구현
    }

    @Override
    public void save(User entity) {
        // 구현
    }

    @Override
    public void delete(User entity) {
        // 구현
    }
}
```

- 구현 class에서 구체적인 type을 지정합니다.


---


## Generic Method

- method 단위로 **독립적인 type parameter를 선언**합니다.
    - return type 앞에 `<T>`를 작성합니다.
    - class의 type parameter와 별개로 동작합니다.

```java
public class Utility {
    // Generic method 선언
    public <T> T getFirst(List<T> list) {
        if (list.isEmpty()) {
            return null;
        }
        return list.get(0);
    }
}

// 사용
Utility util = new Utility();
List<String> names = List.of("Kim", "Lee", "Park");
String first = util.getFirst(names);  // "Kim"
```


### Static Method에서의 Generic

- static method는 **instance 생성 전에 호출 가능**하므로 class의 type parameter를 사용할 수 없습니다.
    - class level의 `<T>`는 instance가 생성될 때 결정됩니다.
    - static method는 instance 없이 호출되므로 자체 type parameter가 필요합니다.

```java
public class Box<T> {
    private T item;

    // compile error : static context에서 class의 T 사용 불가
    public static T createDefault() {
        return null;
    }

    // 올바른 방법 : method 자체의 type parameter 선언
    public static <E> Box<E> empty() {
        return new Box<>();
    }
}

Box<String> emptyBox = Box.empty();
```


### Multiple Type Parameter

- method에서 **여러 type parameter를 사용**할 수 있습니다.

```java
public <K, V> Map<K, V> createMap(K key, V value) {
    Map<K, V> map = new HashMap<>();
    map.put(key, value);
    return map;
}

Map<String, Integer> map = createMap("count", 100);
```


---


## Bounded Type Parameter

- type parameter에 **상한 제약을 설정**하여 특정 type과 그 하위 type만 허용합니다.
    - `extends` keyword를 사용합니다.
    - class와 interface 모두 `extends`로 지정합니다.


### 단일 Bound

- 특정 class의 **하위 type으로 제한**합니다.

```java
public class Calculator<T extends Number> {
    private T number;

    public Calculator(T number) {
        this.number = number;
    }

    public double square() {
        // Number의 method 사용 가능
        return number.doubleValue() * number.doubleValue();
    }
}

Calculator<Integer> intCalc = new Calculator<>(5);
Calculator<Double> doubleCalc = new Calculator<>(3.14);
Calculator<String> stringCalc = new Calculator<>("hello");  // compile error
```

- `Number`의 하위 type인 `Integer`, `Double`, `Long` 등만 허용됩니다.
- bound로 지정한 type의 method를 사용할 수 있습니다.


### Multiple Bounds

- 여러 type을 **동시에 만족하도록 제약**합니다.
    - class는 하나만, interface는 여러 개 지정 가능합니다.
    - class가 있으면 반드시 첫 번째에 작성합니다.

```java
public class DataProcessor<T extends Number & Comparable<T>> {
    public T max(T a, T b) {
        // Comparable의 compareTo 사용 가능
        return a.compareTo(b) > 0 ? a : b;
    }
}

DataProcessor<Integer> processor = new DataProcessor<>();
Integer max = processor.max(10, 20);  // 20
```

- `T`는 `Number`를 상속하고 `Comparable<T>`를 구현하는 type이어야 합니다.


---


## Wildcard

- `?`는 **알 수 없는 type**을 나타내는 wildcard입니다.
    - type parameter와 달리 type을 지정하지 않고 유연성을 제공합니다.
    - generic method의 parameter나 field 선언에 주로 사용합니다.


### Unbounded Wildcard

- `<?>`는 **모든 type을 허용**합니다.
    - 내부적으로 `Object`로 처리됩니다.
    - type에 의존하지 않는 범용 처리에 적합합니다.

```java
public void printList(List<?> list) {
    for (Object item : list) {
        System.out.println(item);
    }
}

printList(List.of("a", "b", "c"));
printList(List.of(1, 2, 3));
printList(List.of(new User("Kim")));
```


### Upper Bounded Wildcard

- `<? extends T>`는 **T와 T의 하위 type만 허용**합니다.
    - data를 읽을 때 유용합니다.
    - 상한이 지정되어 해당 type의 method를 사용할 수 있습니다.

```java
public double sumOfList(List<? extends Number> list) {
    double sum = 0.0;
    for (Number n : list) {
        sum += n.doubleValue();
    }
    return sum;
}

List<Integer> integers = List.of(1, 2, 3);
List<Double> doubles = List.of(1.1, 2.2, 3.3);

sumOfList(integers);  // 6.0
sumOfList(doubles);   // 6.6
```


### Lower Bounded Wildcard

- `<? super T>`는 **T와 T의 상위 type만 허용**합니다.
    - data를 쓸 때 유용합니다.
    - T type의 instance를 안전하게 추가할 수 있습니다.

```java
public void addNumbers(List<? super Integer> list) {
    list.add(1);
    list.add(2);
    list.add(3);
}

List<Integer> intList = new ArrayList<>();
List<Number> numList = new ArrayList<>();
List<Object> objList = new ArrayList<>();

addNumbers(intList);  // 가능
addNumbers(numList);  // 가능
addNumbers(objList);  // 가능
```


---


## PECS 원칙

- `PECS`는 **Producer Extends, Consumer Super**의 약자입니다.
    - Effective Java에서 제시한 wildcard 사용 guideline입니다.
    - data를 읽기만 하면 `extends`, 쓰기만 하면 `super`를 사용합니다.


### PECS 원칙의 존재 이유

- PECS 원칙의 근본적인 존재 이유는 **compiler가 정확한 type을 알 수 없을 때 어떤 연산이 안전한가**에 있습니다.
    - `extends` : 상한(upper bound)만 알고 하한을 모름 → 읽기만 안전.
    - `super` : 하한(lower bound)만 알고 상한을 모름 → 쓰기만 안전.

| Wildcard | 아는 것 | 모르는 것 | 안전한 연산 |
| --- | --- | --- | --- |
| `? extends T` | 상한 (`T`) | 하한 | 읽기 (`T`로 받음) |
| `? super T` | 하한 (`T`) | 상한 | 쓰기 (`T`를 넣음) |


### Producer Extends

- collection에서 **data를 꺼내(produce) 사용**할 때는 `extends`를 사용합니다.

```java
List<? extends Number> list = ???;  // List<Integer>? List<Double>? List<Number>?
```

- **읽기가 안전한 이유** : `Integer`든 `Double`이든 모두 `Number`의 하위 type이므로, 무엇이 나오든 `Number`로 받으면 안전합니다.
- **쓰기가 불가능한 이유** : 실제 type이 `List<Double>`인데 `Integer`를 넣으면 type 안전성이 깨집니다. compiler는 정확한 type을 모르므로 모든 쓰기를 차단합니다.

```java
public void processItems(List<? extends Number> producer) {
    for (Number n : producer) {
        System.out.println(n.doubleValue());  // 읽기 가능
    }
    // producer.add(1);  // compile error : 쓰기 불가
}
```


### Consumer Super

- collection에 **data를 넣어(consume) 저장**할 때는 `super`를 사용합니다.

```java
List<? super Integer> list = ???;  // List<Integer>? List<Number>? List<Object>?
```

- **쓰기가 안전한 이유** : `Integer`는 `Integer`, `Number`, `Object` 모두의 하위 type이므로, 실제 list가 무엇이든 `Integer`를 넣으면 항상 안전합니다.
- **읽기가 제한되는 이유** : 실제 type이 `List<Object>`라면 `String`이 들어있을 수도 있습니다. compiler는 정확한 type을 모르므로 `Object`로만 받을 수 있습니다.

```java
public void fillItems(List<? super Integer> consumer) {
    consumer.add(1);   // 쓰기 가능
    consumer.add(2);
    // Integer n = consumer.get(0);  // compile error : 읽기 시 type 불명확
}
```


### PECS 적용 예시

- `Collections.copy()` method는 **PECS 원칙을 따르는 대표적인 예시**입니다.

```java
public static <T> void copy(List<? super T> dest, List<? extends T> src) {
    for (int i = 0; i < src.size(); i++) {
        dest.set(i, src.get(i));
    }
}

List<Number> numbers = new ArrayList<>(List.of(0, 0, 0));
List<Integer> integers = List.of(1, 2, 3);

Collections.copy(numbers, integers);
// numbers : [1, 2, 3]
```

- `src`는 data를 꺼내므로 `extends` (Producer)
- `dest`는 data를 받으므로 `super` (Consumer)


---


## Type Erasure

- Java generic은 **compile 후 type 정보가 제거**됩니다.
    - 하위 호환성을 위해 채택된 방식입니다.
    - compile time에만 type 검사가 수행됩니다.
    - runtime에는 generic type 정보가 존재하지 않습니다.


### Erasure 과정

- compiler는 **generic type을 bound나 `Object`로 대체**합니다.

```java
// compile 전
public class Box<T> {
    private T item;
    public void set(T item) { this.item = item; }
    public T get() { return item; }
}

// compile 후 (type erasure 적용)
public class Box {
    private Object item;
    public void set(Object item) { this.item = item; }
    public Object get() { return item; }
}
```

- bounded type은 해당 bound type으로 대체됩니다.

```java
// compile 전
public class Calculator<T extends Number> {
    private T number;
}

// compile 후
public class Calculator {
    private Number number;
}
```


### Bridge Method

- type erasure로 인해 **다형성 유지를 위한 bridge method가 생성**됩니다.

```java
public class IntegerBox extends Box<Integer> {
    @Override
    public void set(Integer item) {
        super.set(item);
    }
}

// compiler가 생성하는 bridge method
public class IntegerBox extends Box {
    // 사용자 정의 method
    public void set(Integer item) {
        super.set(item);
    }

    // bridge method (compiler 생성)
    public void set(Object item) {
        set((Integer) item);
    }
}
```

- 상위 class의 `set(Object)`와 하위 class의 `set(Integer)`를 연결합니다.


---


## Generic의 제한 사항

- generic은 type erasure로 인해 **runtime에 type 정보가 없어서** 여러 제약이 존재합니다.
    - primitive type 사용 불가.
    - static context에서 type parameter 사용 불가.
    - runtime type 검사 불가.


### Primitive Type 불가

- generic은 **reference type만 지원**합니다.

```java
List<int> list = new ArrayList<>();      // compile error
List<Integer> list = new ArrayList<>();  // Wrapper class 사용
```

- `int`, `double`, `char` 등의 primitive type 대신 wrapper class를 사용합니다.
- Java 5의 auto-boxing/unboxing으로 편의성을 보완합니다.


### instanceof 불가

- runtime에 **type 정보가 없어 instanceof 검사가 불가**합니다.

```java
public <T> void check(List<T> list) {
    if (list instanceof List<String>) {  // compile error
        // ...
    }

    if (list instanceof List<?>) {  // 가능 (unbounded wildcard)
        // ...
    }
}
```


### Generic Array 생성 불가

- generic type의 **배열을 직접 생성할 수 없습니다.**

```java
public <T> void createArray() {
    T[] array = new T[10];  // compile error
}

// 우회 방법
@SuppressWarnings("unchecked")
public <T> T[] createArray(Class<T> clazz, int size) {
    return (T[]) Array.newInstance(clazz, size);
}
```


### Type Parameter Instance 생성 불가

- type parameter로 **직접 instance를 생성할 수 없습니다.**

```java
public <T> T create() {
    return new T();  // compile error
}

// 우회 방법 : Supplier 사용
public <T> T create(Supplier<T> supplier) {
    return supplier.get();
}

String s = create(String::new);
```


### Static Context 제한

- **static field나 method에서 class의 type parameter를 사용할 수 없습니다.**

```java
public class Box<T> {
    private static T item;  // compile error

    public static T getItem() {  // compile error
        return item;
    }

    // 별도의 type parameter 선언 필요
    public static <E> E create(E item) {  // 가능
        return item;
    }
}
```

- static member는 class level에서 공유되어 type parameter가 결정되기 전에 접근 가능하기 때문입니다.


---


## Wildcard와 Type Parameter 비교

- wildcard(`?`)와 type parameter(`T`)는 **사용 목적이 다릅니다.**
    - `T`는 type을 정의하고 재사용할 때 사용합니다.
    - `?`는 type에 유연성을 부여할 때 사용합니다.

| 특성 | Type Parameter (`T`) | Wildcard (`?`) |
| --- | --- | --- |
| **용도** | type 정의 및 재사용 | 유연한 type 허용 |
| **참조 가능** | method 내에서 `T`로 참조 가능 | 직접 참조 불가 |
| **관계 설정** | 여러 parameter 간 관계 설정 가능 | 관계 설정 불가 |
| **Return type** | `T`를 return type으로 사용 가능 | return type으로 사용 불가 |

```java
// Type Parameter : T를 return type과 parameter 모두에서 사용
public <T> T getFirst(List<T> list) {
    return list.get(0);
}

// Wildcard : type 유연성만 필요한 경우
public void printAll(List<?> list) {
    for (Object item : list) {
        System.out.println(item);
    }
}
```


---


## Reference

- <https://docs.oracle.com/javase/tutorial/java/generics/index.html>
- <https://docs.oracle.com/javase/tutorial/java/generics/erasure.html>

