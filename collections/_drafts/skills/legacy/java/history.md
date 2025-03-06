---
layout: skill
---

# 1장 Java의 발전 과정

## Java 연대표

- 90년대 당시, 산업 현장에서 business 언어로는 COBOL을 사용했음
- 그 땐, C++과 Java가 신기술이었음
- 그러나 지금, 더 새로운 것들을 원하는 개발자들이 IT 산업의 주류를 이루면서, Java는 낡은 언어, 더는 발전이 없는 언어라는 인식이 생김
    - "Java는 죽었다"는 소리가 나오는 이유
- "Write Once, Run Anywhere"

|Version|Year|Desc|
|-|-|-|
|JDK 1.0|1996|Java의 공식 version. 두 번째 patch인 1.0.2부터 널리 사용됨|
|JDK 1.1|1997|compiler의 개선, AWT, Inner Class, Java Bean, JDBC 기능|
|JDK 1.2|1998|version 정책 변경, Java 2 SE(Standard Edition) 용어 사용|
|JDK 1.3|2000|Java Hotspot 포함, JNDI, debugging tool 등 기능 추가|
|JDK 1.4|2002|JCP 주도로 발표. 정규식 등 기능 포함|
|JDK 5|2004|version 체계 변경, Generic, Auth boxing 등 대대적인 기능 추가|
|JDK 6|2006|J2SE 대신 JSE로 용어 변경. JDK 5 안정확 기능 보강 version|
|JDK 7|2011|언어적/기능적 변경 크지 않음. JVM 기반 script 언어 지원|
|JDK 8|2014|언어적 변경. lambda 표현식, 함수형 Interface, Stream 추가|
|JDK 9|2017|licence 체계, 발표 주기 변경. module화, JShell 추가|
|JDK 10|2018|JDK 9 안정화 version. local variable 추론 기능, Garbage Collector 개선|
|JDK 11|2018|발표 주기 변경 후 최조의 LTS version. client 기능 강화|
|JDK 12|2019|언어적/기능적 변경 크지 않음. switch 문장 개선을 위한 초안 발표|
|JDK 13|2019|multi line 문자열을 위한 text block 초안 밢표|
|JDK 14|2020|LTS version이 아니지만 변화 많음 (switch/instanceof 개선, Records 초안 발표)|

- 연대표 3가지 특징
    1. 1995년    beta version이 나온 이후로 현재까지 Java는 꾸준히 새로운 version을 발표하고 있음
    2. 추가되는 기능이나 변경되는 내용을 보면 Java라는 언어적인 한계를 넘어서 변화하는 환경에 적응하고자 노력하고 있음
        - ex) Java8의 functional programming
    3. 초창기엔 거의 1년 단위로 upgrade되던 Java가 2000년대 후반 다소 주춤함 (version 6 ~ version 7)
        - 이 시기에 IT 업계에서는 "Java가 정체되었다", "Java는 죽었다" 등의 말들이 나옴

## Java는 죽었나?

- "Java는 죽지 않았다"
1. 여전히 세계에서 가장 많은 개발자가 사용하고 있는 언어
2. 여전히 발전하고 있음
    - 매번 신규 version이 나올 때마다 새로운 paradigm을 흡수하려고 노력해 옴
    - 특히, Java 5, 8 에서 혁신적인 변화가 있었음
3. 그동안 생산된 많은 code와 library가 있음
    - Java 언어에 기반한 많은 library, framework, code들이 무료로 유통되고 있으며 지속적으로 version upgrade가 되고 있음
4. 개발 환경이 탄탄함
    - IntelliJ, Eclipse 등

## Java version 정책의 변화

- 전통적으로 software의 version upgrade는 2~3년 정도의 긴 기간 동안 혁신적인 개념과 가능을 추가하고 안정화를 거친 후 발표하는 것이 일반적이었음
- 그러나 최근에는 짧은 주기로 계속해서 upgrade를 제공해서 software의 기능을 빠르게 보강하는 방식이 추세임
    - ex) Windows 10, Ubuntu
- Java의 version 정책 변화
    1. 6개월에 한 번씩 신규 version 발표
        - 잦은 update는 legacy 환경 호환에 안 좋을 수 있다는 우려가 있었음
        - 그러나 예전 3~5년에 걸쳐 나올 때처럼 dynamic한 변화는 없을 것이라고 함
            - 또한 지금까지 그래왔듯 이전 version에 대한 호환을 갖추어 출시
    2. version에 대한 명명 규칙 변경안 제시
        - Ubuntu처럼 년도를 따라가는 version 명명 규칙을 고려한 적이 있었음
        - 그러나 현재 방식(숫자 늘려가기)를 고수하기로 함
    3. 장기 지원 version 구분
        - LTS : Long Term Support

## Java version별 새로운 기능

### Java 5

- 명명 규첵을 1.x에서 x 형태로 변경 (1.5 -> 5)
    - JDK나 JVM을 download 받으면 1.5 형태의 directory가 생성되긴 함
    - 공식적인 version은 5임

|||
|-|-|
|Generic|신규 기능. Generic을 이용해서 compile 검증 기능을 사용할 수 있게 되었고, code에 대한 data를 명확하게 해서 가독성을 높일 수 있게 됨|
|for loop 개선|이전까지는 loop를 실행하기 위해 index 변수를 생성해서 값을 늘리며 순회하거나 Iterator interface를 사용했지만, for each 구문을 사용하면 그런 번거로움 없이 for loop 구현 가능. for each를 사용하기 위해선 data type이 명확해야함(Generic이나 type이 명확한 배열을 이용해야 함|
|Concurrent API|병렬 programmint, multi thread programming을 위해서 Java thread 구조에 대한 지식을 기반으로 저수준 programming을 해야했었음. Java 5부터 Cuncurrent API를 이용하여 쉽게 병렬 programming을 구현할 수 있고, thread의 lifecycle을 관리할 수 있음|
|Annotation|간단한 선언만으로 method나 변수의 행동을 정의할 수 있음. Spring Frameworke에서 많이 사용함|
|Enum|추가된 열거형(Enum) 기능을 통해 Data 구조를 좀 더 손쉽게 정의하고 사용할 수 있음|
|vararg|method의 입력 parameter를 유연하게 가져갈 수 있도록 기능 추가(data type만 선언하면 복수의 parameter를 전달살 수 있음). 이전에는 원하는 parameter 개수만큼 method에 모두 기술해야 했음|
|Autu boxing/unboxing|Java는 객체 지향 언어이므로 모든 data를 객체화하지만, 예외적으로 기본형인 int, long, float, double 등을 제공. 기본형 type을 Collection에서 활용하거나 Generic으로 선헌해서 사용하려면 Wrapper class(Integer, Double)을 별도로 선언해서 만들어야 했음. Java 5부터 이를 자동으로 해줌(단, 성능상 비용이 들어가는 작업임)|

### Java 6

- Java 5의 안정화 version
    - 새로운 기능을 없고 주로 Garbage Collection, 동기화, JVM의 성능 향상에 중점을 둠
    - 변화가 미미함

|||
|-|-|
|G1 Garbage Collection|VM(Virtual Machine) 성능에 가장 크게 영향을 주는 것 중 하나가 GC임. G1 GC는 version 6의 중간 version에 추가된 기능으로 Full GC 발생을 최소화하기 위한 변경 사항. Java 7부터 기본 GC로 사용함|
|Desktop API|Java를 이용해서 UI를 개발할 때 OS의 기본 설정값을 기반으로 application을 실행하고, 출력 등을 편리하게 개발할 수 있도록 함|
|Java compiler API|Java code에서 직접 Java compiler를 호출할 수 있는 API를 제공함. Java application에서 Java source code를 compile하고 실행할 수 있게 함|

### Java 7

- Java 6이후 5년 만에 발표됨
    - 그런 것치고는 새로운 기능이 많지는 않았음

|||
|-|-|
|File NIO 2.0|file 처리를 위한 새로운 기능. 기능이 풍부하고 처리 속도가 개선됨. 기존에 사용하던 java.io.File class는 다양한 OS에서 file을 처리할 때 예상하기 못한 error가 발생하거나 기능이 부족했었음. java.io.File class와 개념이 완전히 달라서 새로 공부해야함|
|Fork/Join Framework|Concurrent API(Java 5에 처음 추가된 병렬 programming API)에 Fork/Join 기능이 추가됨. 기존에 multi thread를 생성하는 것에 더해서 lifecycle을 관리하고 monitoring할 수 있음|
|diamond 연산자|Generic의 선언 방법 개선. 변수 선언 시 Generic type을 이미 선언하였다면 객체 생성 시에는 Generic type을 다시 기입할 필요 없이 diamond 연산자만 기술하면 됨|
|try-with-resource|Java로 개발한 application에서 자원을 사용한 이후 종료시키지 않아 memory 누수가 발생하는 일이 많음. 이 작업은 단순하고 반복적으로 이루어지지만 세심하게 작업하지 않으면 치명적인 오류가 생길 수 있음. Java 7에서는 자원의 종료를 언어 차원에서 보장하고 있으며, 이 기능을 이용할 경우, 안정적으로 자원을 관리할 수 있고, source code 작성량을 줄일 수 있음|
|예외 처리|하나의 catch 절에 여러 개의 Exception을 처리할 수 있도록 개선 (원래는 예외 처리를 위해 try catch 문장을 작성할 때 경우에 따라서 많은 catch 문장을 작성해야 했고, 이 때문에 catch 절 안에 처리하는 logic이 같더라도 반복적으로 작업해야 했음)|

### Java 8

- Java 8에서 새로 제안한 기술들은 변화 수준이 파격적임

|||
|-|-|
|Lambda 표현식|Java 언어 역사상 가장 큰 변화. 별도의 익명 class를 만들어서 선언한던 방식을 lambda를 통해 대폭 간소화할 수 있으며, 함수형 programming, String API, Collection framework의 개선 등에 영향을 줌. 영향이 큰 만큼 개발잗르의 저항이 가장 심한 신기술이기도 함|
|함수형 interface|lambda와 더불어 Java 8의 큰 변화 중 하나임. 함수형 interface는 lambda 표션힉을 사용할 때 만들어야 하는 하나의 method를 가진 interface 생성을 줄여줌. lambda 표현식을 위한 interface 사용 시 표준 guide 및 의사 소통 용어로도 사용함|
|Method 참조|기존에는 값과 객체 참조만을 method의 인수로 전달할 수 있었지만 Java 8부터는 특정 method를 method의 인수로 전달할 수 있게 됨. 궁극적으로 복잡한 lambda 표현식을 method 참조로 간략학 만들 수 있고 재사용성을 높일 수 있으며 lambda에 익숙하지 않은 개발자도 source code를 쉽게 해석할 수 있음|
|Stream API|lambda 표현식, 함수형 interface, method 참조를 이용한 최종 산출물 (3가지 기술이 Stream API를 위해 만들어진 것이라는 말이 있을 정도). 기존 Collection framework를 이용할 때보다 간결하게 code를 작성할 수 잇으며, 병렬 처리, Stream pipeline 등ㅇ을 통해 하나의 문장으로 다양한 data 처리 기능을 구현할 수 있음|
|날짜와 시간 API|기존 Data와 Calendar class의 기능 부족과 비표준적인 명명 규칙, 일관되지 못한 속성값 등의 문제를 해결하기 위해 새로 추가됨. 명명 규칙을 새로 정의하고 각 class 간의 역할을 분명히 분배하여 개발자들의 혼란을 최소화하고 multi thread 환경에서의 안정성을 보장함|
|Interface 개선|Java 8 이전의 interface에는 구현 내용이 없는 pulbic method 명세서만 작성 가능하고 interface를 구현한 class에서 상세 내용을 정의해야 했음 (Collection framework와 같이 interface를 기반으로 동작하는 framework는 기능 추가나 개선을 어렵게 하는 대표적인 요인). Java 8에서는 default keyword를 이용해서 interface에 method를 추가하고 직접 내용을 정의할 수 있어서 interface의 method 추가로 인한 문제점을 해소할 수 있음|
|Optional|null 값을 확인하고 관리할 수 있는 새로운 기능을 제공|
|CompletableFuture 기능|Java 8에서 multi thread programming 시에 중요시 되는 기능. 기존 Future interface에서 제공하는 기능을 개선한 것|

### Java 9

- Java 8이 소개된 이후 약 3년 만에 발표된 version
- Java 개발자들과 community에서 요구한 기능들이 많이 채용됨
- Java 9에서 추가된 개념이나 기능들은 Java 8에서 새롭게 제시하고 있는 함수형 programming과 lambda, Stream에 기반한 것들이 많기 때문에 Java 8을 이해하지 못하면 Java 9의 신규 기능이나 개선된 기능을 이해하기 어려움

|||
|-|-|
|Java module화|Java module화(or Java Moudle System)는 실행, compile, build 시점에 결합할 수 있도록 JDK를 module로 분할할 수 있게 해주는 기능. module화를 통해 Java SE 뿐만 아니라 Java EE 기반으로 대규모 software를 개발할 때 더욱 용이하게 library를 관리할 수 있음|
|REPL 기능인 JShell|Java 진영의 오랜 숙원 project 중 하나. REPL인 JShell을 이용하면 별도의 compile이나 class의 선언 없이도 code를 작성하고 test할 수 있음. 간단한 code 검증이나 교육 등에 유용하게 사용할 수 있음|
|통합 JVM logging|통합된 JVM의 logging 기능 제공. Java를 실행할 때 -Xlog parameter option을 적용하면 통합 JVM logging 기능이 동작하며 ERROR, WARNING, INFO, DEBUG와 ERROR level에 따라 log를 STDOUT, STDERR 그리고 file에 남길 수 있음|
|HTML5 Java DOC|Java 8까지는 javadoc 명령어를 이용해서 API 문서를 생성하면 HTML 4.0 기반으로 file이 생성되었으나, Java 9부터는 javadoc 명령어에 -html5 parameter option을 적용하면 HTML 5로 결과물이 생성됨. HTML 5로 출력된 Java DOC의 가장 큰 차별점은 별도의 server 도움없이 검색 기능을 사용할 수 있다는 점|
|try-with-resource 구문 개선|Java 7에서는 관리하고자 하는 자원 객체를 반드시 try 구문에서 선언해야 했는데, Java 9에서는 try 구문 외부에서도 선언이 가능해짐|
|interface Method 형식 추가|Java 8에서 interface에 default method와 static method를 정의하는 기능을 제공하였으며, Java 9에서는 private method도 interface 내에 추가할 수 있게 되었음. private method를 사용할 수 있게 되면서 interface 내에서 중복되는 code를 효율적으로 사용할 수 있게 됨|
|Diamond 연산자 개선|익명 class에서 diamond 연산자를 사용할 수 있게 됨 (java 7에 추가된 diamond 연산자는 익명 class에 사용할 수 없었음)|
|Process API|process 정보에 접근할 수 있는 새로운 API. 모든 process, 현재 process, 자식 process, 종료 process 등의 정보를 조회하고 관리할 수 있는 기능을 제공함|
|CompletableFuture 기능 개선|기존에는 code를 실행하는 데에 초점을 맞췄다면 Java 9에서는 timeout 기능과 지연 기능이 추가됨|
|반응형(Reactive) Stream API|반응형 programming을 위한 Flow 기능이 추가됨. 이 기능은 발행자(Publisher)와 구독자(Subscriber)를 지정하고 상호 연계할 수 있는 framework를 제공함|

### Java 10

- 빠른 upgrade 정책(6개월에 한 번)에 따라 발표된 첫 번째 Java version

|||
|-|-|
|Local 변수 형식 추론|local 변수 선언을 할 때 특정한 data type을 지정하지 않아도 됨. JavaScript와 마찬가지로 var keyword를 이용해서 변수 선언을 하고 뒤에 할당한 data의 값에 따라 Java compiler가 형식을 추론해서 적용함. 단, var를 히용할 경우 반드시 해당 문장에서 객체 생성까지 해야 함 (var myList = new ArrayList<String>();)|
|G1 GC 개선|G1 GC의 성능 향상|

### Java 11

- Java 11은 장기 지원 version(Long Term Support, LTS)으로, 발표 후 지속적인 upgrade와 patch 작업, 기술 지원을 제공함 (유료)
- 지원 측면에서 안정성을 도모하고 시대의 흐름에 맞게 중요한 기능들을 포함함
- 제거된 기능
    - 기존 JDK에 오랜 기간 포함되어 있던 CORBA, Java EE, JavaFX module
    - Java 초창기 version부터 계속 지원해 온 Applet과 Java web start 기능

|||
|-|-|
|HTTP Client|Java 9에 incubating 형태로 넣었던 HTTP client API를 정식으로 포함함. 이 API는 기존에 제공되는 URLConnection 기반의 HTTP 개발보다 개선된 기능과 명명 규칙을 제공함. HTTP 2.0을 지원하며 web socket 기능이 포함되어 있음|
|Collection 객체를 배열로 변경하는 기능|Collection interface에 toArray method가 추가됨. 이 method를 통해서 Collection 배열로 변환하면 별도의 반복문을 작성하지 않고 method 호출만으로 처리할 수 있음|
|var keyword 지원 확대|Java 10에서 var keyword로 변수를 선언하면 type 추론으로 객체를 생성할 수 있는 기능이 추가되었는데, Java 11에서는 lambda 표현식에서도 var를 사용하서 변수를 선언할 수 있게 함 (기존에 (String x) -> System.out.println(x)로 하던 것을 (var x) -> System.out.println(x)처럼 사용할 수 있음)|
|String class 기능 추가|문자열을 표현하는 String class에 편리하게 사용할 수 있는 method를 추가함. blank를 판단하는 isBlank, 여러 줄로 되어 있는 문자열을 Stream API 객체로 생성할 수 있는 lines, 공백을 지우기 위한 strip, stripLeading, stripTRailing 등을 추가함|

### Java 12

|||
|-|-|
|Switch 문장 개선 (초안1)|조건 문장(case)에 pattern 형태로 정의할 수 있는 문법이 추가되었고, 기존과 다르게 break 문을 사용하지 않아도 자동 종료됨. 조건 문장을 lambda 표현식 형태로 작성 가능함. break keyword에는 문장을 종료하는 것 외에 특정한 문자열을 return하는 기능을 추가함. 그동안 선택 사항이었던 default 문장이 새로운 switch 문장에서는 반드시 추가해야 하는 필수 사항이 되었고, 생략할 경우 compile error 발생함|
|File 비교|file NIO의 Files에 두 개의 file 일치 여부를 확인하는 method가 추가됨|

### Java 13

|||
|-|-|
|Switch 문장 개선 (초안2)|Java 12에 소개된 새로운 switch 문장에 기능을 추가함. break 대신 yield keyword를 사용하도록 변경하고 하나의 조건(case)에 여러 개의 문장을 작성할 수 있게 됨|
|Text Block (초안)|여러 줄에 걸쳐서 문자열을 작성하기 위해서는 StringBuilder를 이용하거나 + 기호로 문자열을 연결하는 작업을 해야 하지만, text block을 이용하면 편리하게 coding 가능함 (ex. SQL 문장, JSON ...). 원하는 block을 """으로 감싸면 문자열 사이에 carriage return 값이 있다라도 하나의 문장으로 작성할 수 있음. 이것을 처리하기 위해 String class도 변경됨|

### Java 14

|||
|-|-|
|Switch 문장 개선 (정식)|Java 12와 13에 걸쳐 초한 형태로 새롭게 소개된 switch 문장의 개선된 내용이 Java 14에서 정식으로 추가됨. 정식 version으로 추가되었다는 것을 제외하면 Java 13의 기능과 차이 없음|
|instanceof 개선 (초안)|객체의 유형을 확인하기 위한 instanceof 문법에 pattern으로 판단할 수 있는 기능이 추가됨|
|record keyword 추가 (초안)|data를 저장하고 표현하기 위해 getter와 setter method를 생성하고 equals와 hashCode 등의 method를 구현했지만, record keyword를 이용해서 data를 저장하면 compiler가 자동으로 해당 기능들을 추가해 줌. VO(Value Object)와 같은 data 정의 목적의 class 선언이 쉽고 빨라짐|

---

## Reference

- Practical 모던 자바 - 장윤기
    - 1장 자바의 발전 과정
