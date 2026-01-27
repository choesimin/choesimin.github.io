---
layout: note
permalink: /437
title: Java Reflection - Runtime에 Class 정보를 동적으로 조작하는 기법
description: reflection은 runtime에 class, method, field 정보를 동적으로 조회하고 조작하는 Java API로, Spring과 Hibernate 같은 framework의 핵심 기술입니다.
date: 2025-06-01
---


## Reflection

- reflection은 **runtime에 class의 구조를 분석하고 동적으로 객체를 조작**하는 기법입니다.
    - compile time이 아닌 runtime에 class 정보를 얻습니다.
    - class 이름만으로 객체를 생성하고 method를 호출합니다.
    - private member에도 접근이 가능합니다.

```java
// 일반적인 객체 생성
User user = new User("Kim");

// reflection을 사용한 객체 생성
Class<?> clazz = Class.forName("com.example.User");
Constructor<?> constructor = clazz.getConstructor(String.class);
Object user = constructor.newInstance("Kim");
```


---


## Class 객체 얻기

- reflection의 시작은 **`Class` 객체를 얻는 것**입니다.
    - `Class` 객체는 해당 class의 metadata를 담고 있습니다.
    - class 이름, method, field, annotation 등의 정보를 제공합니다.


### Class 객체를 얻는 방법

- `Class` 객체를 얻는 **세 가지 방법**이 있습니다.

```java
// 1. Class.forName() - 문자열로 class 이름 지정
Class<?> clazz1 = Class.forName("java.lang.String");

// 2. .class literal - compile time에 class를 알고 있을 때
Class<String> clazz2 = String.class;

// 3. getClass() - instance에서 얻기
String str = "hello";
Class<?> clazz3 = str.getClass();
```

| 방법 | 사용 시점 | 특징 |
| --- | --- | --- |
| `Class.forName()` | runtime에 class 이름이 결정될 때 | `ClassNotFoundException` 발생 가능 |
| `.class` | compile time에 class를 알 때 | type-safe |
| `getClass()` | instance가 있을 때 | 실제 runtime type 반환 |


### Class 정보 조회

- `Class` 객체에서 **다양한 metadata를 조회**합니다.

```java
Class<?> clazz = User.class;

// 기본 정보
String name = clazz.getName();           // "com.example.User"
String simpleName = clazz.getSimpleName(); // "User"
Package pkg = clazz.getPackage();        // com.example

// 상속(inheritance) 정보
Class<?> superclass = clazz.getSuperclass();
Class<?>[] interfaces = clazz.getInterfaces();

// 제어자 정보
int modifiers = clazz.getModifiers();
boolean isPublic = Modifier.isPublic(modifiers);
boolean isAbstract = Modifier.isAbstract(modifiers);
```


---


## Constructor 접근

- reflection으로 **constructor를 조회하고 객체를 생성**합니다.
    - `getConstructors()`는 public constructor만 반환합니다.
    - `getDeclaredConstructors()`는 모든 constructor를 반환합니다.

```java
public class User {
    private String name;
    private int age;

    public User() {}
    public User(String name) { this.name = name; }
    private User(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

```java
Class<?> clazz = User.class;

// public constructor 조회
Constructor<?>[] publicConstructors = clazz.getConstructors();

// 모든 constructor 조회 (private 포함)
Constructor<?>[] allConstructors = clazz.getDeclaredConstructors();

// 특정 parameter type의 constructor 조회
Constructor<?> constructor = clazz.getConstructor(String.class);

// 객체 생성
Object user = constructor.newInstance("Kim");
```


### Private Constructor 접근

- private constructor에 접근하려면 **`setAccessible(true)`를 호출**합니다.

```java
Constructor<?> privateConstructor = clazz.getDeclaredConstructor(String.class, int.class);
privateConstructor.setAccessible(true);  // private 접근 허용
Object user = privateConstructor.newInstance("Kim", 25);
```


---


## Field 접근

- reflection으로 **field를 조회하고 값을 읽거나 수정**합니다.
    - `getFields()`는 상속받은 public field를 포함합니다.
    - `getDeclaredFields()`는 해당 class에 선언된 모든 field를 반환합니다.

```java
public class User {
    public String id;
    private String name;
    private int age;
}
```

```java
Class<?> clazz = User.class;
Object user = clazz.getConstructor().newInstance();

// 모든 field 조회
Field[] fields = clazz.getDeclaredFields();

// 특정 field 조회
Field nameField = clazz.getDeclaredField("name");

// private field 접근 허용
nameField.setAccessible(true);

// 값 설정
nameField.set(user, "Kim");

// 값 조회
String name = (String) nameField.get(user);  // "Kim"
```


### Field 정보 조회

- field의 **type, 제어자, annotation 정보를 조회**합니다.

```java
Field field = clazz.getDeclaredField("name");

// field 정보
String fieldName = field.getName();        // "name"
Class<?> fieldType = field.getType();      // String.class
int modifiers = field.getModifiers();

// 제어자 확인
boolean isPrivate = Modifier.isPrivate(modifiers);
boolean isFinal = Modifier.isFinal(modifiers);
boolean isStatic = Modifier.isStatic(modifiers);

// annotation 조회
Annotation[] annotations = field.getAnnotations();
```


---


## Method 호출

- reflection으로 **method를 조회하고 동적으로 호출**합니다.
    - `getMethods()`는 상속받은 public method를 포함합니다.
    - `getDeclaredMethods()`는 해당 class에 선언된 모든 method를 반환합니다.

```java
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    private int multiply(int a, int b) {
        return a * b;
    }
}
```

```java
Class<?> clazz = Calculator.class;
Object calculator = clazz.getConstructor().newInstance();

// method 조회
Method addMethod = clazz.getMethod("add", int.class, int.class);

// method 호출
Object result = addMethod.invoke(calculator, 5, 3);  // 8

// private method 호출
Method multiplyMethod = clazz.getDeclaredMethod("multiply", int.class, int.class);
multiplyMethod.setAccessible(true);
Object result2 = multiplyMethod.invoke(calculator, 5, 3);  // 15
```


### Method 정보 조회

- method의 **parameter type, return type, exception 정보를 조회**합니다.

```java
Method method = clazz.getMethod("add", int.class, int.class);

// method 정보
String methodName = method.getName();              // "add"
Class<?> returnType = method.getReturnType();      // int.class
Class<?>[] paramTypes = method.getParameterTypes(); // [int.class, int.class]
Class<?>[] exceptions = method.getExceptionTypes();

// parameter 이름 조회 (compile 시 -parameters option 필요)
Parameter[] params = method.getParameters();
for (Parameter param : params) {
    System.out.println(param.getName() + " : " + param.getType());
}
```


---


## Annotation 처리

- reflection으로 **runtime에 annotation 정보를 조회**합니다.
    - `@Retention(RetentionPolicy.RUNTIME)` annotation만 조회 가능합니다.

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface Column {
    String name() default "";
    boolean nullable() default true;
}

public class User {
    @Column(name = "user_name", nullable = false)
    private String name;
}
```

```java
Class<?> clazz = User.class;
Field field = clazz.getDeclaredField("name");

// annotation 존재 여부 확인
boolean hasAnnotation = field.isAnnotationPresent(Column.class);

// annotation 조회
Column column = field.getAnnotation(Column.class);
String columnName = column.name();        // "user_name"
boolean nullable = column.nullable();     // false
```


---


## Reflection 활용 사례

- reflection은 **framework와 library에서 핵심적으로 사용**됩니다.
    - 개발자가 작성한 class를 framework가 동적으로 처리합니다.
    - annotation 기반 설정을 runtime에 해석합니다.


### Spring Framework

- Spring은 **bean 생성과 의존성 주입(dependency injection)에 reflection을 사용**합니다.

```java
@Component
public class UserService {
    @Autowired
    private UserRepository userRepository;
}
```

- Spring container가 `@Component` annotation을 scan합니다.
- reflection으로 `UserService` 객체를 생성합니다.
- `@Autowired` field를 찾아 의존성을 주입합니다.


### JPA/Hibernate

- JPA는 **entity mapping에 reflection을 사용**합니다.

```java
@Entity
@Table(name = "users")
public class User {
    @Id
    private Long id;

    @Column(name = "user_name")
    private String name;
}
```

- `@Entity`, `@Column` annotation을 읽어 table과 mapping합니다.
- query 결과를 entity 객체로 변환할 때 reflection으로 field에 값을 설정합니다.


### Jackson (JSON 처리)

- Jackson은 **JSON serialization/deserialization에 reflection을 사용**합니다.

```java
public class User {
    private String name;
    private int age;
    // getter, setter
}

ObjectMapper mapper = new ObjectMapper();

// Object -> JSON (reflection으로 getter 호출)
String json = mapper.writeValueAsString(user);

// JSON -> Object (reflection으로 setter 호출 또는 field 직접 설정)
User user = mapper.readValue(json, User.class);
```


---


## 주의 사항과 단점

- reflection은 **강력하지만 신중하게 사용**해야 합니다.
    - 일반적인 방법으로 해결 가능하다면 reflection을 피합니다.


### 성능 저하

- reflection은 **JVM 최적화를 방해**합니다.
    - 동적 type 해석으로 인한 overhead가 발생합니다.
    - 일반 method 호출보다 수십 배 느릴 수 있습니다.
    - 성능에 민감한 code에서는 사용을 피합니다.

```java
// 일반 호출 - JVM이 최적화 가능
user.getName();

// reflection 호출 - 최적화 불가
Method method = User.class.getMethod("getName");
method.invoke(user);
```


### 캡슐화(Encapsulation) 파괴

- `setAccessible(true)`는 **접근 제어자를 무력화**합니다.
    - private member에 대한 보호가 무효화됩니다.
    - class 내부 구현에 의존하게 되어 유지 보수가 어려워집니다.
    - platform upgrade 시 동작이 변경될 수 있습니다.


### Compile Time 검증 불가

- reflection은 **runtime에 오류가 발생**합니다.
    - method 이름 오타를 compile time에 잡을 수 없습니다.
    - refactoring 시 문제가 발생할 수 있습니다.

```java
// compile error 없음, runtime에 NoSuchMethodException 발생
Method method = clazz.getMethod("getNaem");  // 오타
```


### 보안 제한

- Security Manager 환경에서 **reflection 사용이 제한**될 수 있습니다.
    - `setAccessible()`이 `SecurityException`을 발생시킬 수 있습니다.
    - Java 9 이후 module system에서 추가 제한이 있습니다.


---


## Reference

- <https://docs.oracle.com/javase/tutorial/reflect/>
- <https://docs.oracle.com/javase/8/docs/api/java/lang/reflect/package-summary.html>

