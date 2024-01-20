---
layout: note
title: Java - String, StringBuffer, StringBuilder
date: 2023-07-17
---




- Java의 String, StringBuffer, StringBuilder class는 모두 문자열을 나타내는 자료형입니다.

| String | StringBuffer | StringBuilder |
| --- | --- | --- |
| **Immutable** Class | **Mutable** Class | **Mutable** Class |
| **조회 연산**에 강합니다. | **문자열 연산**에 강합니다. | **문자열 연산**에 강합니다. |
| **Thread Safe**합니다. | **Thread Safe**합니다. | **Non Thread Safe**합니다. |
| **문자열 연산이 적고 조회 연산이 많은 환경**에 적합합니다. | **문자열 연산이 많은 multi thread 환경**에서 적합합니다. | **문자열 연산이 많은 single thread 환경**에서 적합합니다. 또는 **동기화가 필요하지 않은 multi thread 환경**에서 적합니다. |




---




## StringBuffer & StringBuilder : Mutable Class

- StringBuffer와 StringBuilder는 mutable class입니다.
    - mutable(변하는) class는 instance를 생성한 후에도 instance의 내용을 수정할 수 있습니다.

- StringBuffer와 StringBuilder의 class method들은 같습니다.

- `+` 연산 또는 `append()`, `insert()`, `delete()` 등의 method로 문자열 연산을 할 때, class는 처음에 한 번만 만들고(`new`), memory의 값을 변경시켜서 문자열을 수정합니다.
    - 연산 도중에 사용하지 않을 문자열 data를 만들지 않아서 문자열 연산이 자주 있을 때 사용하면 좋습니다.


### StringBuffer와 StringBuilder의 차이점 : 동기화 지원의 유무

- StringBuffer는 thread-safe합니다.
    - `synchronized` keyword를 사용할 수 있어 동기화가 가능합니다.
    - multi thread 환경에서 적합합니다.

- StringBuilder는 thread-safe하지 않습니다.
    - multi thread 환경에서 적합하지 않습니다.
    - 동기화를 고려하지 않기 때문에 single thread 환경에서 StringBuffer에 비해 연산 처리가 빠릅니다.




---




## String : Immutable(불변하는) Class

- String은 immutable class입니다.
    - immutable class는 instance를 생성한 후에는 instance의 내용을 수정할 수 없습니다.

- 조회 연산에서 다른 문자열 class보다 성능이 좋습니다.

- `+` 연산, `concat()`, `substring()`, `toLowerCase()`, `trim()` 등의 method로 문자열 연산을 할 때, 새로운 class 객체를 만들어서 문자열을 나타냅니다.
    - memory 공간 내의 값이 변하지 않습니다.
    - 연산을 할 때마다 계속해서 새로운 문자열 객체를 만드므로 문자열 연산이 많아지면 성능이 저하됩니다.
        - 기존의 문자열은 Garbage Collector에 의해 제거되어야만 하며, 언제 제거될지는 알 수 없습니다.

- multi thread 환경에서 동기화를 신경 쓸 필요가 없습니다.
    - 문자열이 수정될 때 항상 새로운 객체를 생성하므로, 값을 안전하게 공유할 수 있습니다.

- 문자열 연산이 적고, 자주 참조(조회)하는 경우에 적합합니다.


### JDK Version에 따른 String 문자열 연산 속도 차이

- String, StringBuffer, StringBuilder 세 가지 class 중에서 String class가 가장 memory를 많이 차지합니다.
    - 따라서 String class의 응답 시간이 가장 깁니다.

- JDK 1.5 이상을 사용한다면 String으로 문자열 연산을 할 때 compiler에서 자동으로 StringBuilder로 변환해 줍니다.

#### JDK 1.4 이하에서의 Compile 방식

```java
String s = "Here " + "is " + "samples";
```

#### JDK 1.5 이상에서의 Compile 방식

- 자동으로 StringBuilder로 변환합니다.

```java
// String s = "Here " + "is " + "samples";
String s = (new StringBuilder("Here is")).append("samples").toString();
```




---




## Reference

- <https://jeong-pro.tistory.com/85>
- <https://lalwr.blogspot.com/2016/02/string-stringbuffer-stringbuilder.html>
