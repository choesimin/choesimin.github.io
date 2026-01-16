---
layout: note
permalink: /436
title: Java Identity와 Equality
description: Java에서 identity는 == 연산자로 같은 객체인지 비교하고, equality는 equals() method로 값이 같은지 비교하며, equals()를 override할 때는 hashCode()도 함께 override해야 합니다.
date: 2025-06-02
---


## Identity와 Equality

- Java에서 객체 비교는 **identity(동일성)**와 **equality(동등성)** 두 가지 개념으로 구분됩니다.
    - identity는 두 reference가 **같은 객체**를 가리키는지 비교합니다.
    - equality는 두 객체의 **값이 같은지** 비교합니다.

- identity가 true이면 equality도 반드시 true이지만, equality가 true라고 해서 identity가 true인 것은 아닙니다.


---


## Identity 비교 : == 연산자

- `==` 연산자는 두 reference가 **같은 memory 주소**를 가리키는지 비교합니다.
    - primitive type에서는 값 자체를 비교합니다.
    - reference type에서는 객체의 memory 주소를 비교합니다.
    - 같은 객체를 참조하면 true, 다른 객체를 참조하면 false를 반환합니다.

```java
Integer a = Integer.valueOf(128);
Integer b = a;

System.out.println(a == b);  // true (같은 객체 참조)
```

```java
Integer a = Integer.valueOf(128);
Integer b = Integer.valueOf(128);

System.out.println(a == b);  // false (다른 객체 참조, cache 범위 밖)
```

- 두 번째 예제에서 a와 b는 값이 같지만 **서로 다른 객체**이므로 `==` 비교 결과는 false입니다.
- 128은 `Integer` cache 범위(-128~127)를 벗어나므로 매번 새 객체가 생성됩니다.


---


## Equality 비교 : equals() Method

- `equals()` method는 두 객체의 **내용이 같은지** 비교합니다.
    - `Object` class에 정의된 기본 구현은 `==` 연산자와 동일하게 동작합니다.
    - 값 비교가 필요한 class에서는 `equals()`를 override해야 합니다.
    - `String`, `Integer` 등 wrapper class는 이미 `equals()`를 override하여 값 비교를 수행합니다.


### Object의 기본 equals() 구현

- `Object` class의 `equals()`는 **reference 비교**를 수행합니다.

```java
public boolean equals(Object obj) {
    return (this == obj);
}
```

- override하지 않으면 `==` 연산자와 동일한 결과를 반환합니다.


### equals() Override

- 값 비교가 필요한 class에서는 `equals()`를 **override**해야 합니다.

```java
public class Product {
    private Long id;
    private String name;
    private Long price;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return Objects.equals(id, product.id) &&
               Objects.equals(name, product.name) &&
               Objects.equals(price, product.price);
    }
}
```

- `equals()` override 시 **일반 규약**을 준수해야 합니다.
    - 반사성 (reflexive) : `x.equals(x)`는 true입니다.
    - 대칭성 (symmetric) : `x.equals(y)`가 true이면 `y.equals(x)`도 true입니다.
    - 추이성 (transitive) : `x.equals(y)`와 `y.equals(z)`가 true이면 `x.equals(z)`도 true입니다.
    - 일관성 (consistent) : 객체가 변경되지 않으면 `equals()` 결과는 항상 동일합니다.
    - null 비교 : `x.equals(null)`은 false입니다.


---


## hashCode() Method

- `equals()`를 override할 때는 **`hashCode()`도 함께 override**해야 합니다.
    - `HashMap`, `HashSet` 등 hash 기반 `Collection`은 `hashCode()`를 사용하여 객체를 저장하고 검색합니다.
    - `equals()`가 true인 두 객체는 반드시 같은 `hashCode()`를 반환해야 합니다.
    - `hashCode()`가 다르면 `equals()` 비교 없이 다른 객체로 판단합니다.


### hashCode() 규약

- `hashCode()`는 **일관성 있는 정수값**을 반환해야 합니다.
    - 객체가 변경되지 않으면 `hashCode()` 결과는 항상 동일해야 합니다.
    - `equals()`가 true인 두 객체는 같은 `hashCode()`를 가져야 합니다.
    - `equals()`가 false인 두 객체는 다른 `hashCode()`를 가질 필요는 없지만, 다르면 hash table 성능이 향상됩니다.


### hashCode()를 Override하지 않으면

- `HashSet`에 동등한 객체를 추가해도 **중복 제거가 되지 않습니다.**

```java
Product product1 = new Product(1L, "iPhone", 99L);
Product product2 = new Product(1L, "iPhone", 99L);

Set<Product> products = new HashSet<>();
products.add(product1);
products.add(product2);

System.out.println(products.size());  // 2 (기대값 : 1)
```

- `hashCode()`가 다르면 `HashSet`은 두 객체를 **다른 bucket에 저장**합니다.


### hashCode() Override

- `equals()`에서 사용한 field를 기반으로 `hashCode()`를 구현합니다.

```java
@Override
public int hashCode() {
    return Objects.hash(id, name, price);
}
```

- `Objects.hash()`는 여러 field를 조합하여 hash값을 생성합니다.


---


## String과 Integer의 특수한 동작

- `String`과 `Integer`는 **caching mechanism**으로 인해 `==` 비교 시 예상과 다른 결과가 나올 수 있습니다.


### String Pool

- `String` literal은 **String Pool**에 저장되어 재사용됩니다.

```java
String str1 = "hello";
String str2 = "hello";
String str3 = new String("hello");

System.out.println(str1 == str2);  // true (같은 Pool 객체)
System.out.println(str1 == str3);  // false (다른 객체)
```

- literal로 생성한 `String`은 Pool에서 동일한 객체를 참조합니다.
- `new String()`으로 생성하면 Pool과 별개의 새 객체가 생성됩니다.


### Integer Cache

- `Integer`는 **-128에서 127 범위의 값을 caching**합니다.

```java
Integer a = 127;
Integer b = 127;
System.out.println(a == b);  // true (cached)

Integer c = 128;
Integer d = 128;
System.out.println(c == d);  // false (not cached)
```

- autoboxing으로 생성된 `Integer`는 cache 범위 내에서 동일한 객체를 반환합니다.
- cache 범위를 벗어나면 새로운 객체가 생성되어 `==` 비교가 false가 됩니다.

```java
private static class IntegerCache {
    static final int low = -128;
    static final int high = 127;  // 설정으로 변경 가능
}
```


---


## 권장 Pattern

- 객체 비교 시 **적절한 방법**을 선택해야 합니다.

- **값 비교는 `equals()` 사용** : 객체의 내용을 비교할 때는 `==` 대신 `equals()`를 사용합니다.
    - `String` 비교는 항상 `equals()`를 사용합니다.
    - wrapper class 비교도 `equals()`를 사용합니다.

```java
String str1 = "hello";
String str2 = new String("hello");

if (str1.equals(str2)) {  // 올바른 비교
    System.out.println("같은 값");
}
```

- **`equals()`와 `hashCode()` 함께 Override** : 값 비교가 필요한 class에서는 두 method를 함께 override합니다.
    - IDE나 Lombok의 자동 생성 기능을 활용합니다.
    - `Objects.equals()`와 `Objects.hash()`를 사용하면 null-safe하게 구현됩니다.

- **`==` 사용이 적합한 경우** : enum 비교나 singleton 객체 비교에서는 `==`를 사용합니다.
    - enum은 instance가 하나이므로 `==` 비교가 안전합니다.
    - null check에서는 `==`를 사용합니다.

```java
if (status == Status.ACTIVE) {  // enum 비교
    // ...
}

if (obj == null) {  // null check
    // ...
}
```


---


## Reference

- <https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Object.html#equals(java.lang.Object)>
- <https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Object.html#hashCode()>

