---
layout: note
permalink: /443
title: Java Unchecked Warning
description: unchecked warning은 generic으로 programming할 때 형 안전성(typesafe)을 보장하기 위한 compile 경고로, runtime에 ClassCastException 발생 가능성을 나타내며, 형 안전성이 확실한 경우에만 @SuppressWarnings("unchecked")로 억제합니다.
date: 2026-04-02
---


## Unchecked Warning

- **unchecked warning**은 generic으로 programming할 때 code의 형 안전성(typesafe)을 보장하기 위한 compile 경고입니다.
    - program 실행 도중에 `ClassCastException`이 발생할 가능성을 나타냅니다.
    - unchecked warning은 가능하다면 없애야 합니다.


### Unchecked Warning의 종류

- compiler가 발생시키는 unchecked warning은 네 가지 유형이 있습니다.

| 유형 | 설명 |
| --- | --- |
| **unchecked cast warning** | 무점검 형변환 경고 |
| **unchecked method invocation warning** | 무점검 method 호출 경고 |
| **unchecked generic array creation warning** | 무점검 generic 배열 생성 경고 |
| **unchecked conversion warning** | 무점검 변환 경고 |


---


## @SuppressWarnings("unchecked")

- `@SuppressWarnings("unchecked")`는 **형 안전성이 확실하지만 제거할 수 없는 경고**를 억제하는 annotation입니다.
    - 어떤 크기의 단위에도 적용 가능하지만, **가능한 작은 범위에 적용**해야 합니다.
    - 넓은 범위에 적용하면 중요한 warning을 놓칠 수 있기 때문입니다.
    - 반드시 **왜 형 안전성을 위반하지 않는지** 주석을 통해 정확히 밝혀야 합니다.

```java
public <T> T[] toArray(T[] a) { 
    if (a.length < size) { 
        // 아래의 형변환은 배열의 자료형이 인자로 전달된 자료형인 T[]와 같으므로 정확함
        @SuppressWarnings("unchecked") T[] result = (T[]) Arrays.copyOf(elements, size, a.getClass()); 
        return result;
    }

    System.arraycopy(elements, 0, a, 0, size);

    if (a.length > size) {
        a[size] = null;
    }

    return a;
}
```

- `@SuppressWarnings`를 method 전체가 아닌 **변수 선언 단위에 적용**하여 경고 억제 범위를 최소화한 예시입니다.


---


## Reference

- <https://itstory.tk/entry/%EC%9D%B4%ED%8E%99%ED%8B%B0%EB%B8%8C-%EC%9E%90%EB%B0%94-%EA%B7%9C%EC%B9%9924-%EB%AC%B4%EC%A0%90%EA%B2%80-%EA%B2%BD%EA%B3%A0unchecked-warning%EB%A5%BC-%EC%A0%9C%EA%B1%B0%ED%95%98%EB%9D%BC>

