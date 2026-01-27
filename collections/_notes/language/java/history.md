---
layout: note
permalink: /435
title: Java History - 1996년부터 현재까지 Java의 발전 과정
description: Java는 1996년 처음 출시된 이후 6개월 주기 release와 2년 주기 LTS 전략으로 lambda, virtual thread 등 현대적 기능을 꾸준히 추가하며 발전하고 있습니다.
date: 2026-01-27
---


## Java 개요

- Java는 **1995년 Sun Microsystems에서 발표한 객체 지향 programming 언어**입니다.
    - James Gosling이 주도하여 개발했습니다.
    - "Write Once, Run Anywhere"(WORA) 철학으로 platform 독립성을 목표로 합니다.
    - JVM(Java Virtual Machine) 위에서 실행되어 OS에 관계없이 동작합니다.

- Java는 **꾸준한 발전을 거듭하며 여전히 널리 사용**됩니다.
    - 2024년 기준 가장 많이 사용되는 programming 언어 중 하나입니다.
    - enterprise application, Android application, big data 처리 등 다양한 분야에서 활용됩니다.
    - 방대한 ecosystem과 community가 형성되어 있습니다.


---


## Version 정책의 변화

- Java의 **release 정책은 시대에 따라 변화**해왔습니다.
    - 초기에는 2~5년 간격으로 major version을 출시했습니다.
    - 2017년 Java 9부터 6개월 주기 release 정책을 도입했습니다.
    - 2021년 Java 17부터 2년 주기 LTS 정책을 시행합니다.


### 6개월 Release 주기

- Java 10부터 **6개월마다 새로운 version을 출시**합니다.
    - 매년 3월과 9월에 정기적으로 release됩니다.
    - 짧은 주기로 새로운 기능을 빠르게 제공합니다.
    - non-LTS version은 다음 version 출시까지 6개월간 지원됩니다.


### LTS (Long Term Support)

- LTS version은 **장기간 보안 update와 기술 지원을 제공**합니다.
    - 현재 LTS version : 8, 11, 17, 21, 25
    - Java 17부터 2년 주기로 LTS를 지정합니다 (이전에는 3년).
    - enterprise 환경에서는 LTS version 사용을 권장합니다.

| Version | Release | LTS 여부 | Premier 지원 종료 |
| --- | --- | --- | --- |
| Java 8 | 2014년 3월 | LTS | 2030년 12월 |
| Java 11 | 2018년 9월 | LTS | 2027년 10월 |
| Java 17 | 2021년 9월 | LTS | 2029년 10월 |
| Java 21 | 2023년 9월 | LTS | 2031년 9월 |
| Java 25 | 2025년 9월 | LTS | 2033년 9월 |


---


## 초기 Java (1.0 ~ 1.4)

- 초기 Java는 **언어의 기반을 다지는 시기**였습니다.
    - 기본적인 객체 지향 기능과 library를 확립했습니다.
    - applet을 통한 web browser 내 실행이 주요 용도였습니다.


### JDK 1.0 (1996년)

- Java의 **최초 정식 release**입니다.
    - AWT(Abstract Window Toolkit)를 통한 GUI 개발을 지원합니다.
    - applet을 통해 web browser에서 Java program을 실행합니다.
    - 1.0.2 version부터 널리 사용되기 시작했습니다.


### JDK 1.1 (1997년)

- **inner class와 JDBC가 추가**되었습니다.
    - inner class로 class 내부에 class를 정의할 수 있습니다.
    - JDBC(Java Database Connectivity)로 database 연결을 표준화했습니다.
    - JavaBeans component model을 도입했습니다.
    - reflection API를 추가했습니다.


### JDK 1.2 (1998년)

- **Java 2 Platform으로 재명명**되었습니다.
    - SE(Standard Edition), EE(Enterprise Edition), ME(Micro Edition)로 구분합니다.
    - Swing GUI toolkit을 추가했습니다.
    - Collections Framework를 도입했습니다.
    - JIT(Just-In-Time) compiler를 포함했습니다.


### JDK 1.3 (2000년)

- **HotSpot JVM이 기본으로 포함**되었습니다.
    - 성능이 크게 향상되었습니다.
    - JNDI(Java Naming and Directory Interface)를 추가했습니다.
    - RMI가 CORBA와 호환되도록 개선했습니다.


### JDK 1.4 (2002년)

- **정규 표현식(regex)과 NIO가 추가**되었습니다.
    - `java.util.regex` package로 정규 표현식을 지원합니다.
    - NIO(New I/O)로 non-blocking I/O를 지원합니다.
    - assert keyword를 도입했습니다.
    - logging API를 추가했습니다.


---


## 혁신기 Java (5 ~ 8)

- Java 5와 8은 **언어의 paradigm을 바꾼 혁신적인 version**입니다.
    - Java 5에서 generic, annotation 등 핵심 기능이 추가되었습니다.
    - Java 8에서 함수형 programming 지원이 시작되었습니다.


### Java 5 (2004년)

- version 명명 규칙이 **1.5에서 5로 변경**되었습니다.
    - 내부적으로는 1.5로 표기되지만, 공식 명칭은 Java 5입니다.

| 기능 | 설명 |
| --- | --- |
| Generic | type 안전성을 compile time에 검증 |
| Annotation | metadata를 선언적으로 정의 |
| Enum | type-safe한 열거형 상수 |
| Auto-boxing | primitive와 wrapper type 간 자동 변환 |
| Enhanced for loop | collection 순회를 간결하게 표현 |
| Varargs | 가변 인자 method 지원 |
| Concurrent API | multi-thread programming 표준화 |


### Java 6 (2006년)

- Java 5의 **안정화에 초점**을 맞춘 version입니다.
    - JVM 성능을 최적화했습니다.
    - scripting API를 추가하여 JavaScript 등을 JVM에서 실행합니다.
    - compiler API로 runtime에 Java code를 compile합니다.
    - JDBC 4.0으로 database 연결을 개선했습니다.


### Java 7 (2011년)

- 5년 만에 출시된 version으로 **개발 편의성을 개선**했습니다.

| 기능 | 설명 |
| --- | --- |
| Diamond 연산자 | generic 선언 시 type 추론 (`new ArrayList<>()`) |
| try-with-resources | resource 자동 해제 |
| Multi-catch | 하나의 catch 절에서 여러 exception 처리 |
| Switch with String | switch 문에서 문자열 사용 가능 |
| NIO.2 | file system API 개선, `Path` class 추가 |
| Fork/Join Framework | 병렬 처리 framework |


### Java 8 (2014년) - LTS

- **함수형 programming을 도입한 가장 중요한 version**입니다.
    - Java 역사상 가장 큰 언어적 변화로 평가됩니다.
    - 현재까지도 많은 project에서 사용됩니다.

| 기능 | 설명 |
| --- | --- |
| Lambda 표현식 | 익명 함수를 간결하게 표현 |
| Stream API | collection data를 함수형으로 처리 |
| Optional | null 처리를 안전하게 수행 |
| Method reference | method를 parameter로 전달 (`Class::method`) |
| Date/Time API | `java.time` package로 날짜/시간 처리 개선 |
| Default method | interface에 구현된 method 정의 가능 |
| Functional interface | lambda를 위한 단일 abstract method interface |


---


## 현대화 Java (9 ~ 17)

- Java 9부터 **module system 도입과 빠른 release 주기**로 현대화가 진행되었습니다.
    - preview 기능으로 새로운 기능을 미리 체험할 수 있습니다.
    - 언어 문법이 점진적으로 간결해졌습니다.


### Java 9 (2017년)

- **module system과 6개월 release 주기를 도입**했습니다.

| 기능 | 설명 |
| --- | --- |
| Module system | `module-info.java`로 의존성 명시 |
| JShell | REPL 환경으로 code 즉시 실행 |
| Private interface method | interface 내에서 private method 사용 |
| Reactive Streams | Flow API로 reactive programming 지원 |
| Process API | OS process 정보 조회 및 관리 |
| Collection factory method | `List.of()`, `Set.of()`, `Map.of()` |


### Java 10 (2018년 3월)

- **local 변수 type 추론을 도입**했습니다.
    - `var` keyword로 변수 선언 시 type을 생략합니다.
    - compile time에 type이 결정되므로 type-safe합니다.

```java
var list = new ArrayList<String>();  // ArrayList<String>으로 추론
var stream = list.stream();          // Stream<String>으로 추론
```


### Java 11 (2018년 9월) - LTS

- 6개월 주기 release 후 **첫 번째 LTS version**입니다.

| 기능 | 설명 |
| --- | --- |
| HTTP Client | `java.net.http` package로 HTTP/2 지원 |
| String method 추가 | `isBlank()`, `lines()`, `strip()`, `repeat()` |
| Local-variable in Lambda | lambda parameter에 `var` 사용 가능 |
| Single-file execution | `java` 명령으로 `.java` file 직접 실행 |

- applet, JavaFX, CORBA module이 제거되었습니다.


### Java 12 ~ 13 (2019년)

- **switch 표현식과 text block의 preview**가 시작되었습니다.
    - switch 문에서 화살표 문법(`->`)을 사용합니다.
    - `yield` keyword로 값을 반환합니다.
    - text block(`"""`)으로 여러 줄 문자열을 작성합니다.


### Java 14 (2020년)

- **records와 pattern matching의 preview**가 도입되었습니다.
    - `record` keyword로 immutable data class를 간결하게 정의합니다.
    - `instanceof` 연산자에서 type casting을 자동화합니다.
    - `NullPointerException` message가 상세해졌습니다.


### Java 15 (2020년)

- **text block이 정식 기능**이 되었습니다.
    - `"""` 구분자로 여러 줄 문자열을 작성합니다.
    - JSON, SQL, HTML 등을 가독성 좋게 표현합니다.
    - sealed class가 preview로 추가되었습니다.

```java
String json = """
    {
        "name": "Java",
        "version": 15
    }
    """;
```


### Java 16 (2021년 3월)

- **records와 pattern matching for instanceof가 정식 기능**이 되었습니다.

```java
// Record : immutable data class
record Point(int x, int y) {}

// Pattern matching for instanceof
if (obj instanceof String s) {
    System.out.println(s.length());  // casting 불필요
}
```


### Java 17 (2021년 9월) - LTS

- **sealed class가 정식 기능**이 되었습니다.
    - 상속 가능한 class를 명시적으로 제한합니다.
    - pattern matching for switch가 preview로 추가되었습니다.

```java
public sealed class Shape permits Circle, Rectangle, Triangle {}

final class Circle extends Shape {}
final class Rectangle extends Shape {}
final class Triangle extends Shape {}
```


---


## 최신 Java (18 ~ 25)

- Java 21과 25는 **현대적인 동시성 model과 성능 최적화**를 제공합니다.
    - virtual thread로 경량 동시성을 지원합니다.
    - Project Loom, Amber, Panama, Leyden의 결과물이 반영되었습니다.


### Java 18 (2022년 3월)

- **UTF-8이 기본 charset**이 되었습니다.
    - 모든 platform에서 일관된 문자 encoding을 보장합니다.
    - 간단한 HTTP server를 내장하여 개발/test에 활용합니다.


### Java 19 ~ 20 (2022년 9월 ~ 2023년 3월)

- **virtual thread와 structured concurrency의 preview**가 진행되었습니다.
    - record pattern과 pattern matching for switch를 개선했습니다.
    - Foreign Function & Memory API를 계속 발전시켰습니다.


### Java 21 (2023년 9월) - LTS

- **virtual thread가 정식 기능**이 되어 동시성 programming이 혁신되었습니다.

| 기능 | 설명 |
| --- | --- |
| Virtual Thread | 경량 thread로 높은 동시성 처리 |
| Record Patterns | record를 pattern matching으로 분해 |
| Pattern Matching for switch | switch 문에서 type pattern 사용 |
| Sequenced Collections | 순서가 있는 collection interface 추가 |
| String Templates | 문자열 template (preview) |

```java
// Virtual Thread : 수백만 개 생성 가능
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    executor.submit(() -> processRequest());
}

// Pattern Matching for switch
String result = switch (obj) {
    case Integer i -> "Integer: " + i;
    case String s -> "String: " + s;
    case null -> "null";
    default -> "Unknown";
};
```


### Java 22 (2024년 3월)

- **Foreign Function & Memory API가 정식 기능**이 되었습니다.
    - JNI를 대체하여 native code와 상호 운용합니다.
    - Unnamed Variables and Patterns가 정식 기능이 되었습니다.
    - Stream Gatherers가 preview로 추가되었습니다.


### Java 23 (2024년 9월)

- **Primitive Types in Patterns가 preview**로 추가되었습니다.
    - pattern matching에서 primitive type을 사용합니다.
    - String Templates가 설계 문제로 제거되었습니다.
    - markdown 주석 지원이 추가되었습니다.


### Java 24 (2025년 3월)

- **Class-File API와 Stream Gatherers가 정식 기능**이 되었습니다.

| 기능 | 설명 |
| --- | --- |
| Class-File API | class file parsing, 생성, 변환 표준화 |
| Stream Gatherers | custom 중간 연산 정의 |
| AOT Class Loading | Project Leyden의 첫 번째 기능 |
| ML-KEM / ML-DSA | 양자 computer 내성 암호화 algorithm |
| Virtual Thread 개선 | synchronized block에서 pinning 문제 해결 |


### Java 25 (2025년 9월) - LTS

- **가장 최신 LTS version**으로 여러 preview 기능이 정식화되었습니다.

| 기능 | 설명 |
| --- | --- |
| Flexible Constructor Bodies | super() 이전에 statement 실행 가능 |
| Scoped Values | thread-local의 대안으로 불변 값 전달 |
| Compact Object Headers | object header 크기 축소로 memory 10~20% 절감 |
| Compact Source Files | 초보자를 위한 간소화된 main method |
| AOT Method Profiling | Project Leyden의 추가 최적화 |


---


## Java Version 선택 Guideline

- project 상황에 따라 **적절한 Java version을 선택**해야 합니다.


### 신규 Project

- **최신 LTS version(Java 21 또는 25) 사용을 권장**합니다.
    - 최신 기능과 성능 최적화를 활용합니다.
    - 장기간 보안 update를 받을 수 있습니다.
    - virtual thread 등 현대적인 동시성 model을 사용합니다.


### 기존 Project 유지 보수

- **현재 사용 중인 LTS version을 유지**하거나 다음 LTS로 upgrade합니다.
    - Java 8에서 11로, 11에서 17로의 migration을 계획합니다.
    - 호환성 문제를 충분히 test한 후 upgrade합니다.
    - deprecated API 사용 여부를 확인합니다.


### Enterprise 환경

- **검증된 LTS version 사용을 권장**합니다.
    - Java 17은 안정성이 충분히 검증되었습니다.
    - Java 21은 virtual thread로 성능을 개선합니다.
    - 상용 지원이 필요하면 Oracle, Azul 등의 vendor를 고려합니다.


---


## Reference

- <https://www.oracle.com/java/technologies/java-se-support-roadmap.html>
- <https://openjdk.org/projects/jdk/>
- <https://www.marcobehler.com/guides/a-guide-to-java-versions-and-features>
- <https://javaalmanac.io/jdk/>

