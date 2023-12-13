---
layout: note
---

# Unchecked warning

- Generic으로 programming할 때, code의 형 안정성(typesafe) 보장을 위한 경고
    - program 실행 도중에 ClassCaseException이 발생할 가능성을 나타냄
- unchecked warning은 가능하다면 없애야 함
- 종류
    - 무점검 형변환 경고 (unchecked cast warning)
    - 무점검 메서드 호출 경고 (unchecked method invocation warning)
    - 무점검 제네릭 배열 생성 경고 (unchecked generic array creation warning)
    - 무점검 변환 경고 (unchecked conversion warning)
- @SuppressWarnings("unchecked") annotation
    - 형 안정성이 확실하지만 제거할 수 없는 경고 message가 계속 보일 때, 이를 억제하고 싶으면 사용
    - 어떤 크기의 단위에도 적용 가능하지만, 가능한 작은 번위에 적용해야 함
        - 중요한 warning을 놓칠 수 있기 때문
    - 반드시 '왜 형 안전성을 위반하지 않는지' 주석을 통해 정확히 밝혀야 함

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

---

## Reference

- https://itstory.tk/entry/%EC%9D%B4%ED%8E%99%ED%8B%B0%EB%B8%8C-%EC%9E%90%EB%B0%94-%EA%B7%9C%EC%B9%9924-%EB%AC%B4%EC%A0%90%EA%B2%80-%EA%B2%BD%EA%B3%A0unchecked-warning%EB%A5%BC-%EC%A0%9C%EA%B1%B0%ED%95%98%EB%9D%BC