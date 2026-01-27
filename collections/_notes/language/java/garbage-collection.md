---
layout: note
permalink: /433
title: Java Garbage Collection - JVM의 자동 Memory 관리 Mechanism
description: garbage collection은 JVM이 heap 영역에서 사용하지 않는 객체를 자동으로 식별하고 해제하여 memory를 관리하는 mechanism입니다.
date: 2025-06-01
---


## Garbage Collection

- garbage collection(GC)은 **JVM이 heap memory에서 더 이상 참조되지 않는 객체를 자동으로 해제**하는 mechanism입니다.
    - 개발자가 명시적으로 memory를 해제할 필요가 없습니다.
    - memory leak과 dangling pointer 문제를 방지합니다.
    - C/C++과 달리 `free()`나 `delete`를 호출하지 않습니다.

```java
public void createObjects() {
    User user = new User("Kim");  // heap에 객체 생성
    user = null;  // 참조 해제 - GC 대상이 됨

    // 또는 scope를 벗어나면 자동으로 참조 해제
}  // user 변수가 scope를 벗어남 - User 객체는 GC 대상
```


---


## JVM Memory 구조

- JVM memory는 **여러 영역으로 구분**되며, GC는 주로 heap 영역에서 동작합니다.
    - method 영역 : class 정보, static 변수, 상수 pool 저장.
    - heap 영역 : 객체 instance 저장, GC의 주요 대상.
    - stack 영역 : method 호출 시 지역 변수, 매개 변수 저장.
    - PC register : 현재 실행 중인 명령어 주소 저장.
    - native method stack : native method 정보 저장.

```
┌───────────────────────────────────────────────┐
│                  JVM Memory                   │
├───────────────────────────────────────────────┤
│ Method Area   │ Heap          │ Stack         │
│ (class info)  │ (objects)     │ (local vars)  │
│               │ ← GC target → │               │
└───────────────────────────────────────────────┘
```


### Heap 영역의 구조

- heap 영역은 **객체의 생존 기간에 따라 Young Generation과 Old Generation**으로 나뉩니다.
    - 대부분의 객체는 생성 후 짧은 시간 내에 사용되지 않습니다.
    - 이 특성을 **weak generational hypothesis**라고 합니다.

```
┌─────────────────────────────────────────────────────────┐
│                         Heap                            │
├─────────────────────────────────┬───────────────────────┤
│       Young Generation          │     Old Generation    │
├─────────┬─────────┬─────────────┤                       │
│  Eden   │   S0    │     S1      │      (Tenured)        │
│         │ (From)  │    (To)     │                       │
└─────────┴─────────┴─────────────┴───────────────────────┘
```

| 영역 | 설명 |
| --- | --- |
| **Eden** | 새로 생성된 객체가 할당되는 영역 |
| **Survivor** (S0, S1) | Minor GC에서 살아남은 객체가 이동하는 영역 |
| **Old Generation** | 오래 살아남은 객체가 이동하는 영역 |


---


## GC 동작 원리

- GC는 **reachability 분석을 통해 살아있는 객체를 식별**합니다.
    - GC Root에서 시작하여 참조 chain을 따라가며 도달 가능한 객체를 marking합니다.
    - 도달할 수 없는 객체는 garbage로 판단하여 해제합니다.


### GC Root

- GC Root는 **reachability 분석의 시작점**이 되는 객체들입니다.
    - stack 영역의 지역 변수와 매개 변수.
    - method 영역의 static 변수.
    - JNI(Java Native Interface)로 생성된 객체.
    - 활성 thread 객체.

```java
public class GCRootExample {
    private static User staticUser = new User("Static");  // GC Root (static 변수)

    public void method() {
        User localUser = new User("Local");  // GC Root (지역 변수)
        // localUser에서 참조 chain을 따라 도달 가능한 모든 객체는 살아있음
    }
}
```


### Mark and Sweep

- Mark and Sweep은 **가장 기본적인 GC algorithm**입니다.
    - Mark 단계 : GC Root에서 시작하여 도달 가능한 모든 객체를 marking합니다.
    - Sweep 단계 : marking되지 않은 객체의 memory를 해제합니다.
    - Compact 단계 (선택) : memory fragmentation(단편화)을 방지하기 위해 객체를 compaction(재배치)합니다.

```
Mark phase :
┌──────┐    ┌──────┐    ┌──────┐
│ Root │───▶│  A   │───▶│  B   │  ← marked
└──────┘    └──────┘    └──────┘

            ┌──────┐    ┌──────┐
            │  C   │    │  D   │  ← unmarked (garbage)
            └──────┘    └──────┘

Sweep phase :
┌──────┐    ┌──────┐    ┌──────┐
│ Root │───▶│  A   │───▶│  B   │  ← retained
└──────┘    └──────┘    └──────┘

            ┌──────┐    ┌──────┐
            │ FREE │    │ FREE │  ← freed
            └──────┘    └──────┘
```


---


## Minor GC와 Major GC

- GC는 **발생 영역에 따라 Minor GC와 Major GC**로 구분됩니다.
    - Minor GC : Young Generation에서 발생하며 빠르게 완료됩니다.
    - Major GC (Full GC) : Old Generation을 포함하여 전체 heap을 대상으로 합니다.


### Minor GC

- Minor GC는 **Young Generation이 가득 찼을 때 발생**합니다.
    - Eden 영역의 살아남은 객체를 Survivor 영역으로 이동합니다.
    - Survivor 영역 간에 객체가 이동하며 age가 증가합니다.
    - 특정 age에 도달한 객체는 Old Generation으로 promotion됩니다.

```
1. Object created -> allocated in Eden
   ┌─────────────────┬──────┬──────┐
   │ Eden (objects)  │  S0  │  S1  │
   └─────────────────┴──────┴──────┘

2. Eden full -> Minor GC triggered
   - surviving objects move to S0, age = 1
   ┌─────────────────┬──────┬──────┐
   │ Eden (cleared)  │  S0  │  S1  │
   │                 │(age1)│      │
   └─────────────────┴──────┴──────┘

3. Eden full again -> Minor GC triggered
   - surviving objects from Eden + S0 move to S1, age++
   ┌─────────────────┬──────┬──────┐
   │ Eden (cleared)  │  S0  │  S1  │
   │                 │(empty)│(age2)│
   └─────────────────┴──────┴──────┘
```


### Major GC

- Major GC는 **Old Generation이 가득 찼을 때 발생**합니다.
    - Young Generation보다 크기가 커서 시간이 오래 걸립니다.
    - application thread가 일시 정지되는 **Stop-The-World** 현상이 발생합니다.
    - Full GC라고도 부르며, 전체 heap을 대상으로 수행될 수 있습니다.


### Stop-The-World

- Stop-The-World(STW)는 **GC 수행 중 application thread가 멈추는 현상**입니다.
    - GC thread 외의 모든 thread가 작업을 중단합니다.
    - 객체 참조 관계가 변경되는 것을 방지하기 위함입니다.
    - STW 시간을 최소화하는 것이 GC tuning의 핵심 목표입니다.


---


## GC Algorithm 종류

- JVM은 **다양한 GC algorithm**을 제공합니다.
    - application 특성에 따라 적합한 GC를 선택합니다.
    - Java version에 따라 기본 GC가 다릅니다.


### Serial GC

- Serial GC는 **단일 thread로 GC를 수행**하는 가장 단순한 algorithm입니다.
    - `-XX:+UseSerialGC` option으로 활성화합니다.
    - STW 시간이 길어 production 환경에서는 권장되지 않습니다.
    - memory와 CPU core가 적은 환경에서 사용합니다.

```
Application  ████████░░░░░░░░████████████
GC Thread              ████
                       ↑
                   STW period
```


### Parallel GC

- Parallel GC는 **여러 thread로 GC를 수행**하여 처리량을 높입니다.
    - `-XX:+UseParallelGC` option으로 활성화합니다.
    - Java 8의 기본 GC입니다.
    - throughput을 중시하는 batch 작업에 적합합니다.

```
Application  ████████░░░░░░░░████████████
GC Thread 1            ██
GC Thread 2            ██
GC Thread 3            ██
GC Thread 4            ██
                       ↑
              parallel processing reduces STW
```


### CMS (Concurrent Mark Sweep)

- CMS는 **application thread와 GC thread가 동시에 실행**되어 STW 시간을 최소화합니다.
    - `-XX:+UseConcMarkSweepGC` option으로 활성화합니다.
    - Java 9에서 deprecated, Java 14에서 제거되었습니다.
    - memory 단편화 문제가 있습니다.


### G1GC (Garbage First)

- G1GC는 **heap을 region 단위로 나누어 관리**하는 algorithm입니다.
    - `-XX:+UseG1GC` option으로 활성화합니다.
    - Java 9 이후 기본 GC입니다.
    - 예측 가능한 STW 시간을 목표로 합니다.
    - garbage가 많은 region을 우선적으로 수집합니다.

```
┌────┬────┬────┬────┬────┬────┬────┬────┐
│ E  │ E  │ S  │    │ O  │ O  │ O  │ H  │
├────┼────┼────┼────┼────┼────┼────┼────┤
│ O  │    │ E  │ O  │    │ E  │ O  │ O  │
├────┼────┼────┼────┼────┼────┼────┼────┤
│    │ O  │ O  │ S  │ E  │    │ O  │    │
└────┴────┴────┴────┴────┴────┴────┴────┘

E : Eden, S : Survivor, O : Old, H : Humongous
- region size : 1MB ~ 32MB
- large objects allocated in Humongous region
```


### ZGC

- ZGC는 **대용량 heap에서도 STW 시간을 10ms 이하로 유지**하는 algorithm입니다.
    - `-XX:+UseZGC` option으로 활성화합니다.
    - Java 15에서 production ready가 되었습니다.
    - terabyte 단위의 heap도 처리 가능합니다.
    - colored pointer와 load barrier 기술을 사용합니다.

| GC | STW 시간 | 적합한 환경 |
| --- | --- | --- |
| **Serial GC** | 길음 | 소규모 application, 단일 CPU |
| **Parallel GC** | 중간 | batch 처리, throughput 중시 |
| **G1GC** | 짧음 | 범용, 대부분의 application |
| **ZGC** | 매우 짧음 (10ms 이하) | 대용량 heap, 저지연 필수 |


---


## GC Tuning

- GC tuning은 **application 특성에 맞게 GC 동작을 최적화**하는 작업입니다.
    - STW 시간을 줄여 응답 시간을 개선합니다.
    - throughput을 높여 처리량을 증가시킵니다.
    - memory 사용량을 최적화합니다.


### 주요 Tuning Option

- GC 동작을 제어하는 **JVM option**들입니다.

| Option | 설명 |
| --- | --- |
| `-Xms` | 초기 heap 크기 |
| `-Xmx` | 최대 heap 크기 |
| `-Xmn` | Young Generation 크기 |
| `-XX:MaxGCPauseMillis` | 목표 GC pause 시간 (G1GC) |
| `-XX:GCTimeRatio` | GC 시간 비율 |
| `-XX:SurvivorRatio` | Eden과 Survivor 비율 |

```bash
# 예시 : G1GC, 최대 heap 4GB, 목표 pause 시간 200ms
java -XX:+UseG1GC -Xmx4g -XX:MaxGCPauseMillis=200 -jar app.jar
```


### GC Log 분석

- GC log를 통해 **GC 동작을 monitoring**합니다.
    - `-Xlog:gc*` option으로 GC log를 활성화합니다.
    - GC 발생 빈도, pause 시간, heap 사용량을 확인합니다.

```bash
# GC log 활성화 (Java 9 이상)
java -Xlog:gc*:file=gc.log:time -jar app.jar

# GC log 예시
[2024-01-15T10:30:45.123+0900] GC(42) Pause Young (Normal)
    (G1 Evacuation Pause) 1024M->512M(2048M) 15.234ms
```


### Tuning 시 고려 사항

- GC tuning 전에 **application 특성을 파악**해야 합니다.
    - 응답 시간이 중요한가, 처리량이 중요한가.
    - 예상되는 heap 사용량과 객체 생존 pattern.
    - hardware resource.
        - CPU core 수, memory 크기 등.

- 과도한 tuning은 오히려 성능을 저하시킬 수 있습니다.
    - 기본 설정으로 시작하여 점진적으로 조정합니다.
    - 변경 전후의 성능을 측정하여 비교합니다.


---


## Reference

- <https://docs.oracle.com/javase/8/docs/technotes/guides/vm/gctuning/>
- <https://www.oracle.com/technetwork/tutorials/tutorials-1876574.html>
- <https://docs.oracle.com/en/java/javase/17/gctuning/introduction-garbage-collection-tuning.html>

