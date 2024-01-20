---
layout: skill
---

# JVM

- Java Virtual Machine
    - virtual machine : program을 실행하기 위해 물리적 machine과 유사한 machine을 software로 구현한 것
- Java application을 Class Loader를 통해 읽어들여 Java API와 함께 실행하는 것을 맡음
- Java와 OS 사이의 중개자
    - 어떠한 운영체제에서도 동일한 형태로 실행시킬 수 있음
- memory 관리
- Garbage collection 수행
- Stack 기반의 Virtual Machine
    - ARM architecture같은 hardware는 register 기반으로 동작하는 데에 비해 JVM은 Stack 기반으로 동작함

---

# JVM 구성

## Garbage Collector

- Runtime Data Area 중 Heap 영역에 더 이상 사용하지 않고 자리만 차지하고 있는 객체들을 제거하는 역할
- 자동으로 실행되기 때문에 언제 정확시 실행되는지 알기 어려움
- 사용자가 임의로 GC를 발생시키는 것은 좋은 발상이 아니기 때문에 JVM에 맡기는 것이 좋음
- GC가 수행되는 동안 GC를 실행하는 thread 외 모든 thread가 일시정지 됨

## Class Loader

- JVM의 Runtime Data Area에 compile된 byte code들을 적재하는 역할
- class(.class file)를 load하고 link하는 작업을 통해 배치하는 작업을 수행하는 module
- jar file 내 저장된 class들을 JVM에 탑재하고 사용하지 않는 class들은 memory에서 삭제 (compiler 역할)
- Java는 동적 code이기 때문에, 'class를 처음으로 참조할 때', 해당 class를 load하고 link함
    - 동적 code : compile time이 아니라 run time에 참조함

## Execution Engine

- class를 실행시키는 역할
- class loader가 JVM 내의 runtime data 영역에 byte code를 배치하면 execution engine(실행 엔진)이 이를 실행시킴
    - byte code : 기계가 바로 수행할 수 있는 언어가 아닌 비교적 인간이 보기 편한 형태로 기술된 언어
- byte code를 JVM 내부에서 기계가 실행할 수 있는 형태로 변경
    - 이 때 interpreter, JIT의 두 가지 방식을 사용

### Interpreter

- Java byte code를 명령어 단위로 읽어서 실행함
- 한 줄 씩 수행하기 때문에 느림

### JIT : Just - In - Time

- interpreter 방식의 단점을 보완하기 위해 도입된 JIT compiler
- interpreter 방식으로 실행하다가 적절한 시점에 byte code 전체를 compile하여 native code로 변경하고, 이후에는 interpreting하지 않고 native code를 직접 실행하는 방식
- native code는 cache에 보관하기 때문에 한 번 compile된 code는 빠르게 수행함
- JIT가 compile하는 과정은 byte code를 interpreting하는 것보다 훨씬 오래 걸리므로, 한 번만 실행되는 code라면 compile하지 않고 interpreting하는 것이 유리함
- JIT compiler를 사용하는 JVM들은 내부적으로 해당 method가 얼마나 자주 수행되는지 확인하고, 일정 정도를 넘을 때에만 compile을 수행함

## Runtime Data Area

- JVM memory 영역으로 OS로부터 별도로 memory 공간을 할당받고 Java application을 실행할 때 사용됨
- Method Area, Heap Area, Stack Area, PC register, Native Method Stack 5가지로 구분됨

### Method Area (Static Area)

- Java application이 실행되고 한번 load된 후에 memory에 항상 상주하는 영역
    - 각 class에서 필요한 package class, runtime 상수 pool, interface, field data(상수, static 변수, final 변수, class member 변수), method(생성자 포함) 정보를 load
    - 모든 thread가 공유 가능
- ex) Math.abs(-10) 같이 Math class의 method를 초기화 없이 바로 사용할 수 있음

### Heap Area

- method 안에서 사용되는 객체들을 위한 영역
    - new를 통해 생성된 객체, 배열, immutal 객체 등의 값이 저장됨
- Heap Area에서 생성된 객체들은 Stack Area의 변수나 다른 객체의 field에서 참조 가능
    - 때문에 해당 객체를 참조하지 않으면 더는 쓸모가 없어 Garbage Collector에 의해 객체가 Heap 영역에서 제거됨
- Heap Area는 효율적인 GC를 위해서 Eden, Survivor1, Survivor2, Old, Permanent(생성된 객체들의 주소값이 저장되는 영역)으로 나누어짐

### Stack Area

- thread마다 하나씩 존재하며 쓰레드가 시작될 때 할당됨
- 내부에는 method에서 직접 사용할 지역변수, paramter, return 값, 참조변수일 경우 주소값 들이 저장됨
- 만약 program에서 method가 호출되면 method와 method 정보는 차곡차곡 Stack에 쌓이면서(PUSH) 내부 과정을 실행함
- method 호출이 종료되면 해당 method는 Stack Area에서 제거(POP)됨

### PC Register

- thread가 생성될 때마다 만들어지는 영역
- 현재 thread가 실행되는 부분의 주소와 해당 명령을 저장
- 다수의 thread들이 명령의 흐름을 잃지 않고 함수가 순차적으로 실행될 수 있게 함

### Native Method Stack

- Java 외의 다른 언어로 작성된 native code를 수행하기 위한 memory 영역
    - JNI를 통홰 호출되는 C/C++ 등의 code를 수행하기 위한 stack
- Java 이외의 다른 언어에서 제공되는 method의 정보가 저장됨
- application에서 native method를 호출하게 되면 native method stack에 새로운 stack frame을 생성하여 push
    - 이는 JNI(Java Native Interface)를 이용하여 JVM 내부에 영향을 주지 않기 위함

---

# Java program 실행 과정

1. program이 실행되면 JVM은 OS로부터 이 program이 필요로 하는 memory를 할당받음
    - JVM은 이 memory를 용도에 따라 여러 영역으로 나누어 관리함
2. Java compiler(javac)가 Java sourcecode(.java)를 읽어들여 Java byte code(.class)로 변환
3. Class Loader를 통해 class file들을 JVM으로 loading
4. loading된 class file들을 Execution engine을 통해 해석
5. 해석한 byte code는 Runtime Data Areas에 배치되어 실질적으로 수행됨

---

## Reference

- https://asfirstalways.tistory.com/158
    - JVM
- https://honbabzone.com/java/java-jvm/
    - JVM
- https://medium.com/@lazysoul/jvm-%EC%9D%B4%EB%9E%80-c142b01571f2
    - JVM
- https://mangkyu.tistory.com/118
    - Garbage Collector
