# Mutable & Immutable

## Mutable Class

- 변경이 가능
- instance가 일단 생성된 후에 값의 내용이 변할 수 있는 class
  - 주소는 못 바꿈
- ex) String을 제외한 참조 type 변수, Setter method가 있는 객체

## Immutable Class

- 변경이 불가능
- class의 instance가 일단 생성된 후에는 instance의 내용이 절대 변하지 않는 특성을 가지는 class
  - '='으로 다시 할당받기 전에는 바뀌지 않음
- ex) 기본 type(String, Boolean, Integer, Float, Long), String 등
  - String은 immutable하기 때문에 새로 수정할 때마다, 기존 memory를 버리고 새로운 memory에 값을 넣어서 연결함
- immutable class는 heap 영역에서 변경이 불가능한 것이지 재할당을 못하는 게 아님
  ```java
  String a = "aa";
  a = "bb";    // 가능
  ```
  - a가 처음에 참조하고 있는 "aa" 값이 "bb"로 변경되는 것이 아니라, 아예 "bb"라는 새로운 객체를 만들고 그 객체를 a가 참조하게 하는 것
  - "aa" 값을 지니고 있는 객체는 그 누구도 참조하고 있지 않는 객체가 되고, GC의 대상의 됨
- immutable class를 만드는 방법
  - 객체를 변경하는 method를 제공하지 않기
  - 재정의할 수 있는 method를 제공하지 않기
    - ex) Setter method
  - 모든 field를 final로 만들기
  - 모든 field를 private으로 만들기
  - 가변 객체를 참조하는 field는 배타적으로 접근하기
  ```java
  public class ImmutableString {
    private final String name;

    ImmutableString(String name) {
      this.name = name;
    }

    @Override
    public String toString() {
      return this.name;
    }
  }
  ```
- 장점
  - 생성자, 접근 method에 대한 방어 복사가 필요 없음
  - thread-safe : multi thread 환경에서 동기화 처리없이 객체를 공유할 수 있음
  - 불변이기 때문에 객체가 안전함
- 단점
  - 객체가 가지는 값마다 새로운 객체가 필요함
    - 새로운 객체를 계속 생성해야하기 때문에 memory 누수, 성능 저하의 위험이 있음

## String : 대표적인 Immutable Class

```java
String a = "Star";    // a의 memory 주소: 1000, 값: "Star"
a = a.concat("Craft");    // a의 memory 주소: 2000, 값: "StarCraft"
    // 값을 변화시키는 것이 아니라, String 내부적으로 아예 기존의 Star를 참조하는 객체는 그대로 두고, 새롭게 StarCraft String 객체를 만든 것임
System.out.println(a);    // "StarCraft"
```
```java
public String concat(String str) {
  int otherLen = str.length();
  if (otherLen == 0) {
    return this;    // 변화시킬 것이 없는 경우에 해당됨 (불변의 규칙을 지킴)
  }
  int len = value.length;
  char buf[] = Arrays.copyOf(value, len + otherLen);
  str.getChars(buf, len);
  return new String(buf, true);    // new String : 아예 새롭게 객체를 만들어 return
}
```

## StringBuilder : Mutable Class

```java
public class MutableStringBuilder {
  private final StringBuilder name;

  MutableStringBuilder(StringBuilder name) {
    this.name = name;
  }

  @Override
  public String toString() {
    return this.name.toString();
  }
}
```
```java
StringBuilder name = new StringBuilder("Amazing");
MutableStringBuilder MutableString = new MutableStringBuilder(name);
name.append("Day");
System.out.println(mutableString);    // AmazingDay
```
```java
public AbstractStringBuilder append(String str) {
  if (str == null) {
    return appendNull();
  }
  int len = str.length();
  ensureCapacityInternal(count + len);
  str.getChars(0, len, value, count);
  count += len;
  return this;    // String은 new하여 return했지만, StringBuilder는 자신을 그대로 return함
}
```
- String과 StringBuilder의 성능적인 차이에 대한 issue
  - Java JDK 1.5 version 이전에는 String과 같은 immutable한 type에 많은 연산을 하는 등 잘못된 사용으로 인한 성능 issue가 많았음
  - Java JDK 1.5 version부터 compile 단계에서 String 객체를 선언했어도, String Builder로 치환시켜 compile하도록 변경됨 == 성능적인 차이가 거의 없음
    - 하지만 String class와 객체 생성하는 부분은 동일하므로 StringBuffer, StringBuilder 사용이 필요함

---

# Reference

- https://limkydev.tistory.com/68