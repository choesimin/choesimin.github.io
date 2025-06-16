---
layout: note
title: Java에서 자원을 효율적으로 관리하기 - AutoCloseable, Try-With-Resources
date: 2025-01-17
published: false
---



## Java Resource 관리 방법 - AutoCloseable, try-with-resources

Java의 `AutoCloseable` 인터페이스와 try-with-resources 구문은 Java 7에서 도입된 중요한 기능으로, 리소스 관리를 단순화하고 리소스 누수를 방지하는 데 중점을 둡니다. 이 기능은 특히 파일, 데이터베이스 연결, 네트워크 소켓 등과 같은 시스템 리소스의 사용을 관리하는 데 유용합니다.

### AutoCloseable 인터페이스

`AutoCloseable`은 Java에서 제공하는 인터페이스로, 단순히 하나의 메서드인 `close()`를 정의합니다. `AutoCloseable`을 구현하는 클래스는 이 메서드를 사용하여 리소스를 명시적으로 해제하거나 정리(clean)하는 작업을 수행해야 합니다.

```java
public interface AutoCloseable {
    void close() throws Exception;
}
```

- **목적**: 리소스를 사용한 뒤 명시적으로 해제하여 리소스 누수를 방지합니다.
- **호환성**: 모든 리소스가 `AutoCloseable`을 구현함으로써 try-with-resources 구문과 연동될 수 있습니다.

### try-with-resources 구문

try-with-resources 구문은 리소스가 사용되는 블록을 정의하고, 블록이 종료될 때 자동으로 리소스를 해제하도록 설계된 구문입니다. 이 구문은 `AutoCloseable`을 구현하는 모든 객체와 함께 사용할 수 있습니다.

#### 기본 구조:

```java
try (ResourceType resource = new ResourceType()) {
    // 리소스를 사용하는 코드를 작성
} catch (ExceptionType e) {
    // 예외 처리를 위한 코드
}
```

#### 작동 방식:
- **자동 리소스 해제**: 트라이 블록이 완료되면, `close()` 메서드가 자동으로 호출되어 리소스가 해제됩니다. 이는 예외가 발생하더라도 보장됩니다.
- **다중 리소스 관리**: 여러 리소스를 세미콜론(;)으로 구분하여 try-with-resources 구문에서 관리할 수 있습니다.
  
```java
try (
    ResourceType1 resource1 = new ResourceType1();
    ResourceType2 resource2 = new ResourceType2()
) {
    // resource1과 resource2를 사용하는 코드
}
```

#### 장점:
1. **코드 간결성**: 리소스를 별도로 닫는 코드를 작성할 필요가 없어 코드가 간결해집니다.
2. **안정성**: 리소스 누수를 효과적으로 방지할 수 있습니다. 특히 예외가 발생해도 `close()` 메서드가 호출되도록 보장됩니다.
3. **예외 처리 간편화**: 여러 리소스가 있을 때, 각각의 리소스에 대해 명시적으로 `close()`를 호출하며 try-catch 블록을 추가하는 복잡성을 줄입니다.

### 예제:

파일 리소스 사용 예:

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class TryWithResourcesExample {
    public static void main(String[] args) {
        try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
            String line;
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

위 예에서 `BufferedReader`는 `AutoCloseable`을 구현하므로, try-with-resources 구문 안에서 안전하게 사용되어 리소스가 자동으로 해제됩니다.

### 결론

Java의 `AutoCloseable`과 try-with-resources는 리소스를 다루는 코드를 크게 단순화하고, 리소스 누수와 관련된 버그를 방지하는 데 매우 효과적입니다. 이러한 기능을 잘 활용함으로써 개발자는 복잡한 리소스 관리 코드를 줄이고, 코드의 안전성과 유지보수성을 높일 수 있습니다.









