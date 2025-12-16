---
layout: note
permalink: /280
title: Heap Dump - Java Memory 분석의 핵심 도구
description: heap dump는 특정 시점의 JVM heap memory 상태를 snapshot으로 저장한 file이며, memory leak 진단과 성능 최적화에 필수적인 도구입니다.
date: 2025-12-03
---


## heap dump의 개념과 역할

- heap dump는 특정 시점의 JVM heap memory 상태를 완전하게 기록한 binary file입니다.
    - application 실행 중 생성된 모든 객체의 instance, field 값, 참조 관계를 포함합니다.
    - `OutOfMemoryError` 발생 시점이나 성능 이상 시점의 memory 상태를 분석할 수 있습니다.

- heap dump를 통해 runtime에 발생하는 memory 문제를 사후 분석할 수 있습니다.
    - memory leak의 원인이 되는 객체와 그 참조 경로를 추적합니다.
    - 예상치 못하게 큰 memory를 차지하는 객체를 식별합니다.
    - GC(Garbage Collection)가 회수하지 못하는 객체의 원인을 파악합니다.


---


## heap dump가 필요한 상황

- application이 `OutOfMemoryError`를 발생시켜 비정상 종료되는 경우에 필요합니다.
    - error 발생 시점의 heap 상태를 분석하여 어떤 객체가 memory를 고갈시켰는지 확인합니다.
    - `-XX:+HeapDumpOnOutOfMemoryError` JVM option을 설정하면 자동으로 dump file이 생성됩니다.

- memory 사용량이 지속적으로 증가하는 memory leak 징후가 보이는 경우에 필요합니다.
    - 시간에 따라 heap 사용량이 계속 증가하고 GC 후에도 회수되지 않는 pattern을 보입니다.
    - 주기적으로 heap dump를 생성하여 증가하는 객체를 비교 분석합니다.

- application의 memory 사용 pattern을 최적화하려는 경우에 유용합니다.
    - 불필요하게 많은 memory를 사용하는 data structure를 식별합니다.
    - cache나 buffer의 적절한 크기를 결정하기 위해 실제 memory 사용량을 측정합니다.

- production 환경에서 간헐적으로 성능 저하가 발생하는 경우에 활용합니다.
    - 문제 발생 시점의 heap dump를 확보하여 객체 분포와 크기를 분석합니다.
    - 예상과 다르게 동작하는 caching 전략이나 connection pool 상태를 파악합니다.


---


## heap memory의 구조적 이해

- JVM heap memory는 객체의 생명 주기에 따라 Young Generation과 Old Generation으로 구분됩니다.


### Young Generation의 특성

- Young Generation은 새로 생성된 객체가 할당되는 영역입니다.
    - Eden Space와 두 개의 Survivor Space(S0, S1)로 구성됩니다.
    - 대부분의 객체는 생성 후 짧은 시간 내에 unreachable 상태가 되어 Minor GC로 회수됩니다.

- Minor GC는 Young Generation에서 자주 발생하며 빠르게 수행됩니다.
    - Eden에서 살아남은 객체는 Survivor Space로 이동합니다.
    - Survivor Space 간 이동을 반복하며 일정 횟수(age threshold) 이상 생존한 객체는 Old Generation으로 승격됩니다.


### Old Generation의 특성

- Old Generation은 오래 살아남은 객체가 저장되는 영역입니다.
    - Young Generation에서 승격된 장수 객체들이 위치합니다.
    - Major GC(Full GC)가 발생하여 회수되며, Minor GC보다 시간이 오래 걸립니다.

- memory leak은 주로 Old Generation에서 발견됩니다.
    - 의도하지 않은 참조로 인해 객체가 GC되지 못하고 계속 누적됩니다.
    - heap dump 분석 시 Old Generation의 큰 객체들을 우선적으로 확인합니다.


### GC Root와 객체 참조 구조

- GC Root는 garbage collection의 시작점이 되는 참조입니다.
    - active thread의 stack frame, static field, JNI reference 등이 GC Root가 됩니다.
    - GC Root에서 도달 가능한(reachable) 객체는 살아있는 객체로 간주되어 회수되지 않습니다.

- heap dump 분석 시 GC Root로부터의 참조 경로(reference chain)를 추적합니다.
    - memory leak의 원인 객체가 어떤 GC Root에 의해 살아남는지 파악합니다.
    - 불필요한 참조를 제거하여 객체가 GC될 수 있도록 만듭니다.


---


## heap dump 생성 방법

- heap dump는 runtime에 다양한 방법으로 생성할 수 있으며, 각 방법은 상황에 따라 선택합니다.


### `jmap` 명령어를 사용한 생성

- `jmap`은 JDK에 포함된 heap dump 생성 도구입니다.
    - `jmap -dump:live,format=b,file=heap.hprof <pid>` 형식으로 실행합니다.
    - `live` option은 살아있는 객체만 dump하며, Full GC를 먼저 수행합니다.
    - `format=b`는 binary 형식을 의미하며, 대부분의 분석 도구가 지원하는 표준 형식입니다.

- `jmap`은 application이 실행 중일 때 외부에서 dump를 수행합니다.
    - process ID(pid)를 지정하여 특정 JVM의 heap을 dump합니다.
    - `jps` 명령어로 현재 실행 중인 Java process의 pid를 확인할 수 있습니다.

- `jmap` 실행 시 일시적으로 application이 멈추는(pause) 현상이 발생합니다.
    - production 환경에서는 service 영향을 고려하여 신중하게 사용합니다.
    - `live` option을 제외하면 Full GC 없이 빠르게 dump할 수 있지만, file 크기가 커집니다.


### `jcmd` 명령어를 사용한 생성

- `jcmd`는 JDK 7 이후 권장되는 진단 도구입니다.
    - `jcmd <pid> GC.heap_dump heap.hprof` 형식으로 실행합니다.
    - `jmap`보다 안정적이며 더 많은 진단 기능을 제공합니다.

- `jcmd`는 JVM의 diagnostic command를 직접 실행하는 interface입니다.
    - `jcmd <pid> help`로 사용 가능한 모든 command를 확인할 수 있습니다.
    - `GC.heap_dump` 외에도 thread dump, GC 실행 등 다양한 명령을 지원합니다.


### JVM Option을 통한 자동 생성

- `-XX:+HeapDumpOnOutOfMemoryError` option은 OOM 발생 시 자동으로 dump를 생성합니다.
    - application 시작 시 JVM argument로 추가합니다.
    - `-XX:HeapDumpPath=/path/to/dump` option으로 dump file 경로를 지정할 수 있습니다.
    - 지정하지 않으면 현재 작업 directory에 `java_pid<pid>.hprof` 형식으로 생성됩니다.

- production 환경에서는 이 option을 기본으로 설정하는 것이 권장됩니다.
    - 문제 발생 시점의 heap 상태를 자동으로 확보하여 사후 분석이 가능합니다.
    - disk 공간을 충분히 확보하여 dump file 생성 실패를 방지합니다.


### VisualVM을 통한 수동 생성

- VisualVM은 GUI 기반의 JVM monitoring 및 profiling 도구입니다.
    - application에 연결 후 "Heap Dump" button을 클릭하여 즉시 생성합니다.
    - 생성된 dump를 VisualVM 내에서 바로 분석할 수 있습니다.

- 개발 환경에서 빠르게 heap 상태를 확인할 때 유용합니다.
    - GUI를 통해 직관적으로 memory 사용량과 객체 분포를 파악합니다.
    - remote JVM에도 JMX를 통해 연결하여 dump를 생성할 수 있습니다.


### Programmatic 방식의 생성

- Java code 내에서 직접 heap dump를 생성할 수 있습니다.

```java
import com.sun.management.HotSpotDiagnosticMXBean;
import java.lang.management.ManagementFactory;

public class HeapDumper {
    public static void dumpHeap(String filePath, boolean live) {
        try {
            HotSpotDiagnosticMXBean bean = ManagementFactory.getPlatformMXBean(
                HotSpotDiagnosticMXBean.class
            );
            bean.dumpHeap(filePath, live);
        } catch (Exception e) {
            throw new RuntimeException("heap dump 생성 실패", e);
        }
    }
}
```

- application 내부에서 특정 조건 발생 시 자동으로 dump를 생성하는 용도로 활용합니다.
    - memory 사용률이 임계값을 넘으면 dump를 생성하는 monitoring logic을 구현합니다.
    - `HotSpotDiagnosticMXBean`은 `com.sun.management` package에 있어 JDK에 종속적입니다.


---


## heap dump 분석 도구

- heap dump file은 binary 형식이므로 전용 분석 도구가 필요하며, 각 도구는 고유한 강점을 가집니다.


### Eclipse Memory Analyzer (MAT)

- Eclipse MAT는 가장 강력하고 널리 사용되는 heap dump 분석 도구입니다.
    - 수 GB 크기의 대용량 heap dump도 효율적으로 분석합니다.
    - Leak Suspects Report를 자동으로 생성하여 memory leak 후보를 제시합니다.

- MAT는 다양한 분석 기능을 제공합니다.
    - Histogram : 객체 type별 instance 개수와 총 memory 사용량을 보여줍니다.
    - Dominator Tree : 객체가 지배하는(dominate) memory 크기를 계층적으로 표시합니다.
    - Path to GC Roots : 특정 객체가 GC되지 않는 이유를 참조 경로로 추적합니다.
    - OQL(Object Query Language) : SQL과 유사한 문법으로 heap 내 객체를 query합니다.

- Dominator Tree는 memory 소유 관계를 이해하는 핵심 기능입니다.
    - 특정 객체(dominator)가 제거되면 함께 회수될 객체들(dominated set)의 총 크기를 보여줍니다.
    - Retained Heap은 dominator가 점유하는 실질적인 memory 크기를 의미합니다.
    - Shallow Heap은 객체 자체의 크기이며, Retained Heap은 참조하는 모든 객체를 포함한 크기입니다.


### VisualVM

- VisualVM은 JDK에 포함되어 있어 별도 설치 없이 사용 가능합니다.
    - 직관적인 GUI로 heap dump의 전체 구조를 빠르게 파악합니다.
    - OQL Console을 제공하여 복잡한 query를 실행할 수 있습니다.

- VisualVM은 실시간 monitoring과 사후 분석을 모두 지원합니다.
    - 실행 중인 application의 heap 사용량을 실시간으로 관찰합니다.
    - 저장된 heap dump file을 열어 offline 분석을 수행합니다.

- VisualVM의 분석 기능은 MAT보다 단순하지만 사용이 쉽습니다.
    - Classes view에서 class별 instance 수와 크기를 확인합니다.
    - Instances view에서 특정 class의 모든 instance를 나열하고 field 값을 검사합니다.


### IntelliJ IDEA Profiler

- IntelliJ IDEA Ultimate Edition은 내장 profiler를 통해 heap dump를 분석합니다.
    - IDE 내에서 code와 heap dump를 함께 보며 분석할 수 있습니다.
    - 특정 객체를 클릭하면 해당 class의 source code로 바로 이동합니다.

- IntelliJ profiler는 개발 workflow에 자연스럽게 통합됩니다.
    - debugging 중 발견한 memory 문제를 즉시 heap dump로 확인합니다.
    - flame graph를 통해 memory allocation pattern을 시각적으로 파악합니다.


### jhat (Java Heap Analysis Tool)

- `jhat`은 JDK에 포함된 간단한 heap dump 분석 도구입니다.
    - `jhat heap.hprof` 명령으로 실행하면 HTTP server가 시작됩니다.
    - web browser에서 `http://localhost:7000`에 접속하여 heap을 분석합니다.

- `jhat`은 GUI 도구를 사용할 수 없는 server 환경에서 유용합니다.
    - web 기반 interface로 어디서나 접근 가능합니다.
    - OQL query를 지원하여 복잡한 조건의 객체를 검색합니다.

- `jhat`은 JDK 9부터 deprecated되었고 이후 제거되었습니다.
    - 최신 환경에서는 MAT나 VisualVM 사용이 권장됩니다.


---


## Heap Dump 분석의 핵심 항목

- heap dump 분석은 객체의 크기, 개수, 참조 관계를 체계적으로 조사하는 과정입니다.


### Memory Leak 탐지

- memory leak은 더 이상 사용되지 않는 객체가 GC되지 못하고 heap에 누적되는 현상입니다.
    - 의도하지 않은 강한 참조(strong reference)가 객체를 계속 살려둡니다.
    - collection에 추가만 하고 제거하지 않는 경우, listener 등록 후 해제하지 않는 경우가 대표적입니다.

- Leak Suspects Report는 memory leak 가능성이 높은 객체를 자동으로 찾아줍니다.
    - MAT가 heap을 분석하여 비정상적으로 큰 Retained Heap을 가진 객체를 report합니다.
    - 각 suspect에 대해 GC Root까지의 참조 경로를 시각적으로 표시합니다.

- 시간 간격을 두고 생성한 여러 heap dump를 비교하면 leak을 명확히 식별합니다.
    - 첫 번째 dump와 두 번째 dump에서 instance 수가 계속 증가하는 class를 찾습니다.
    - MAT의 Compare 기능으로 두 dump 간 차이를 분석합니다.


### 큰 객체 식별

- Histogram view는 class별로 객체의 개수와 총 memory 사용량을 정렬하여 보여줍니다.
    - Shallow Heap 기준으로 정렬하여 가장 많은 memory를 직접 차지하는 class를 확인합니다.
    - 예상보다 많은 instance가 생성된 class를 발견합니다.

- Dominator Tree는 실질적으로 memory를 점유하는 객체를 파악합니다.
    - Retained Heap이 큰 객체는 자신과 함께 많은 객체들을 살려두고 있습니다.
    - cache, buffer, collection 등이 지나치게 큰 경우를 식별합니다.

- `char[]`, `byte[]`, `Object[]` 같은 배열 객체의 크기를 확인합니다.
    - String은 내부적으로 `char[]`를 참조하므로, 큰 String이 많으면 `char[]` 사용량이 높습니다.
    - 불필요하게 큰 buffer나 중복된 String을 찾아 최적화합니다.


### GC Root 추적

- Path to GC Roots 기능은 객체가 왜 GC되지 않는지 보여줍니다.
    - 특정 객체를 선택하고 "Path to GC Roots"를 실행하면 참조 chain이 표시됩니다.
    - 여러 참조 경로가 있을 수 있으며, 가장 짧은 경로를 먼저 확인합니다.

- GC Root의 종류에 따라 해결 방법이 달라집니다.
    - Thread stack에서 참조되면 해당 thread가 종료되거나 local variable이 scope를 벗어나야 회수됩니다.
    - Static field에서 참조되면 class가 unload되기 전까지 계속 살아남습니다.
    - JNI reference에서 참조되면 native code에서 명시적으로 해제해야 합니다.

- exclude option을 사용하여 약한 참조(weak reference) 경로를 제외합니다.
    - "exclude weak references" option을 켜면 실질적으로 객체를 살리는 강한 참조만 표시됩니다.
    - weak reference, soft reference, phantom reference는 GC 대상이 될 수 있으므로 제외합니다.


### 중복 객체 분석

- 동일한 내용을 가진 String이나 객체가 여러 개 생성되면 memory가 낭비됩니다.
    - MAT의 "Find Strings" 기능으로 중복된 String을 검색합니다.
    - 동일한 값의 String이 수백 개 존재하면 String interning이나 caching을 고려합니다.

- 중복 제거를 통해 memory 사용량을 크게 줄일 수 있습니다.
    - Java의 `String.intern()` method는 String pool에서 동일한 String을 재사용합니다.
    - immutable 객체는 factory pattern으로 instance를 공유하여 중복을 방지합니다.


### Collection 내용 검사

- collection(`List`, `Map`, `Set`)의 크기와 내용을 확인합니다.
    - MAT에서 collection instance를 선택하고 "List objects" → "with incoming references"를 실행합니다.
    - collection이 예상보다 많은 element를 포함하는지 확인합니다.

- HashMap의 경우 bucket 분포와 collision 발생 여부를 분석합니다.
    - `hashCode()` 구현이 잘못되어 대부분의 element가 같은 bucket에 몰리면 성능이 저하됩니다.
    - MAT의 OQL로 HashMap의 내부 구조를 query하여 bucket 분포를 확인합니다.


---


## 실전 Memory Leak 사례

- 실제 application에서는 자주 발생하는 memory leak pattern들이 있습니다.


### Listener 미해제로 인한 Leak

- event listener나 callback을 등록 후 해제하지 않으면 객체가 계속 참조됩니다.

```java
public class EventManager {
    private List<EventListener> listeners = new ArrayList<>();

    public void addListener(EventListener listener) {
        listeners.add(listener);
    }

    // 문제 : removeListener가 없어서 listener가 누적됨
}
```

- listener를 등록한 객체가 더 이상 사용되지 않아도 EventManager가 참조를 유지합니다.
    - heap dump에서 EventManager의 listeners collection이 계속 커지는 것을 확인합니다.
    - listener를 등록한 component의 lifecycle 종료 시 `removeListener`를 호출하도록 수정합니다.

- unregister 또는 weak reference를 사용하여 명시적으로 해제합니다.

```java
public void removeListener(EventListener listener) {
    listeners.remove(listener);
}

// 또는 WeakReference를 사용하여 자동 회수 허용
private List<WeakReference<EventListener>> listeners = new ArrayList<>();
```


### Static Collection의 무한 증가

- static field로 선언된 collection에 객체를 계속 추가하면 leak이 발생합니다.

```java
public class UserCache {
    private static Map<String, User> cache = new HashMap<>();

    public static void addUser(User user) {
        cache.put(user.getId(), user);
        // 문제 : 제거 logic이 없어 cache가 무한정 커짐
    }
}
```

- static field는 application이 종료될 때까지 살아있으므로 주의가 필요합니다.
    - heap dump에서 static HashMap의 크기가 수십만 건 이상인 경우를 확인합니다.
    - cache eviction policy를 구현하거나 LRU cache 같은 제한된 크기의 cache를 사용합니다.

- size 제한이나 TTL 기반 eviction을 통해 크기를 제어합니다.

```java
import com.google.common.cache.CacheBuilder;

private static LoadingCache<String, User> cache = CacheBuilder.newBuilder()
    .maximumSize(1000)
    .expireAfterWrite(10, TimeUnit.MINUTES)
    .build(new CacheLoader<String, User>() {
        public User load(String key) {
            return loadUserFromDatabase(key);
        }
    });
```


### ThreadLocal 미정리로 인한 Leak

- ThreadLocal 변수를 사용 후 제거하지 않으면 thread pool 환경에서 leak이 발생합니다.

```java
public class RequestContext {
    private static ThreadLocal<User> currentUser = new ThreadLocal<>();

    public static void setUser(User user) {
        currentUser.set(user);
        // 문제 : thread가 재사용될 때 이전 User 객체가 남아있음
    }
}
```

- thread pool의 thread는 재사용되므로 ThreadLocal 값이 계속 누적됩니다.
    - heap dump에서 Thread 객체의 `threadLocals` field에 많은 entry가 쌓인 것을 확인합니다.
    - 각 entry가 큰 객체를 참조하면 심각한 memory 낭비가 발생합니다.

- 사용 후 명시적으로 `remove()`를 호출하여 정리합니다.

```java
try {
    currentUser.set(user);
    processRequest();
} finally {
    currentUser.remove();  // 반드시 정리
}
```


### InputStream이나 Connection 미해제

- resource를 사용 후 close하지 않으면 관련 객체가 memory에 남습니다.

```java
public String readFile(String path) throws IOException {
    FileInputStream fis = new FileInputStream(path);
    // 문제 : exception 발생 시 stream이 닫히지 않음
    return new String(fis.readAllBytes());
}
```

- heap dump에서 FileInputStream, SocketInputStream 등의 instance가 비정상적으로 많으면 leak을 의심합니다.
    - 각 stream은 native resource(file descriptor, socket)와 연결되어 있습니다.
    - stream을 닫지 않으면 Java 객체와 native resource가 모두 누수됩니다.

- try-with-resources를 사용하여 자동으로 close되도록 수정합니다.

```java
public String readFile(String path) throws IOException {
    try (FileInputStream fis = new FileInputStream(path)) {
        return new String(fis.readAllBytes());
    }  // 자동으로 close() 호출
}
```


### 큰 Collection을 참조하는 Inner Class

- inner class는 외부 class의 instance를 암묵적으로 참조합니다.

```java
public class DataProcessor {
    private List<String> largeDataSet = new ArrayList<>();  // 수백만 건

    public Runnable createTask() {
        return new Runnable() {  // anonymous inner class
            public void run() {
                System.out.println("Task running");
                // 문제 : largeDataSet을 사용하지 않지만 외부 instance 전체를 참조
            }
        };
    }
}
```

- heap dump에서 Runnable instance가 거대한 DataProcessor를 참조하는 것을 발견합니다.
    - inner class는 `this$0` field를 통해 외부 class를 참조합니다.
    - 필요하지 않은 large object까지 memory에 유지됩니다.

- static nested class를 사용하거나 필요한 data만 전달하여 참조를 최소화합니다.

```java
public Runnable createTask() {
    return new Runnable() {  // static하지 않지만 외부 참조 없음
        public void run() {
            System.out.println("Task running");
        }
    };
}

// 또는 명시적으로 필요한 값만 전달
public Runnable createTask(String message) {
    return () -> System.out.println(message);
}
```


---


## Heap Dump 분석 시 주의 사항

- heap dump file은 매우 크므로 disk 공간과 분석 시간을 고려해야 합니다.
    - 수 GB heap을 가진 application은 dump file도 수 GB가 됩니다.
    - MAT 실행 시 heap dump 크기의 1.5배 이상의 memory가 필요합니다.

- production 환경에서 heap dump 생성 시 service에 영향을 줄 수 있습니다.
    - dump 생성 중 application이 일시 정지(STW, Stop-The-World)됩니다.
    - 수십 GB heap의 경우 수 분간 멈출 수 있으므로 traffic이 적은 시간대에 수행합니다.

- heap dump에는 민감한 정보가 포함될 수 있습니다.
    - password, token, 개인 정보 등이 String이나 객체 field에 저장되어 있습니다.
    - dump file을 외부로 전송하거나 공유할 때 보안에 주의합니다.

- 여러 시점의 heap dump를 비교하면 memory leak을 더 명확히 파악할 수 있습니다.
    - 단일 snapshot으로는 정상인지 비정상인지 판단하기 어려운 경우가 많습니다.
    - 시간 간격을 두고 3~4개의 dump를 생성하여 추세를 분석합니다.


---


## Reference

- <https://help.eclipse.org/latest/index.jsp?topic=%2Forg.eclipse.mat.ui.help%2Ftasks%2Fanalyzingjavacollection.html>
- <https://docs.oracle.com/javase/8/docs/technotes/guides/troubleshoot/memleaks002.html>
- <https://www.baeldung.com/java-heap-dump-capture>

