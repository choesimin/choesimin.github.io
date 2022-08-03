# String

- Immutable Class
- '+' 연산이나 concat(), substring(), toLowerCase(), trim() 등의 method를 이용해서 문자열 값에 변화를 줘도 memory 공간 내의 값이 변하는 것이 아니라, 새로운 String class 객체를 만들어서 문자열을 나타냄
    - '기존의 문자열'은 garbage collector에 의해 제거되어야 함 (언제 제거될지는 모름)
- 문자열 연산이 많아지면, 연산을 할 때마다 계속해서 문자열 객체를 만드는 overhead가 발생하므로 성능이 저하됨
    - '+' 연산에 내부적으로 char 배열을 사용함
- '불변'하기 때문에 좋은 점
    - 단순하게 읽어가는 조회 연산에서는 타 class보다 좋은 성능을 보임
    - multi thread 환경에서 동기화를 신결쓸 필요 없음
        - 특별한 안전장치 없이도 안전하게 공유될 수 있음
- 문자열 연산이 적고, 자주 참조(조회)하는 경우에 적합 (또한 multi thread 환경에서 신결 쓸 것이 없음)

## String class의 두가지 생성 방식 : new와 literal

```java
String literalString = "literal";        // 리터럴로 생성하는 방식 
String newString = new String("literal");        // new로 생성하는 방식 

// 위에서 "literal" 이라는 문자열을 String Pool에서 생성했기 때문에 이후에 추가한 str1, str2, str3는 추가적으로 생성하지않고 똑같은 문자열을 가리킴
String str1 = "literal"; 
String str2 = "literal";
String str3 = "literal";
```
- new 방식와 literal 방식 모두 JVM memory 중 heap 영역에 생성됨
- literal로 생성하면 String Pool이라는 공간에 생성되어 같은 문자열은 또 생성되지 않음
    - '+' 연산, concat() method 등을 한다면 새로 객체를 만들어 String Pool에 추가함

## JDK version에 따른 차이

```java
String s = "Here " + "is " + "samples";
```
- JDK 1.4에서는 code와 동일하게 compile됨
- JDK 1.5의 compile
    ```java
    String s = (new StringBuilder ("Here is")).append("samples").toString();
    ```
- String, StringBuffer, StringBuilder 세가지 class 중에서 String class가 가장 memory를 많이 차지하고 응답 시간에 영향을 줌
- JDK 5.0 이상을 사용한다면 compiler에서 자동으로 StringBuilder로 변환해 줌
    - 하지만 반복 loop를 사용해서 문자열을 더할 때에는 객체를 계속 추가해야 한다는 것은 변함 없음
    - 그러므로 String class를 쓰는 대신, thread과 관련이 있으면 StringBuffer를, thread 안전 여부와 상관 없으면 StringBuilder를 사용하는 것을 권장함

# StringBuffer & StringBuilder

- Mutable Class
- '+' 연산 또는 append(), insert(), delete() 등의 method로 문자열 연산을 할 때, class는 처음에 한번만 만들고 (new) memory의 값을 변경시켜서 문자열을 변경함
    - 연산 도중에 쓸데 없는 문자열 data를 만들지 않아서 문자열 연산이 자주 있을 때 사용하면 좋음
- StringBuffer와 StringBuilder class method들은 같음
- 차이점 : 동기화 지원의 유무
    - StringBuffer
        - thread-safe함
            - synchronized keyword를 사용할 수 있어 동기화가 가능함
            - multi thread 환경에서 적합
    - StringBuilder
        - thread-safe하지 않음
            - multi thread 환경에서 적합하지 않음
        - 동기화를 고려하지 않기 때문에 single thread 환경에서 StringBuffer에 비해 연산 처리가 빠름
- StringBuffer : 문자열 연산이 많은 multi thread 환경에서 적합
- StringBuilder : 문자열 연산이 많은 single thread 환경(또는 multi thread여도 궅이 동기화가 필요 없는 경우)에서 적합

---

# Reference

- https://jeong-pro.tistory.com/85
- https://lalwr.blogspot.com/2016/02/string-stringbuffer-stringbuilder.html
