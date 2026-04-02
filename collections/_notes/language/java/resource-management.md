---
layout: note
permalink: /438
title: Java Resource 관리 - AutoCloseable과 Try-With-Resources
description: Java 7에서 도입된 AutoCloseable interface와 try-with-resources 구문은 file, database 연결, network socket 등의 resource를 block 종료 시 자동으로 해제하여 resource 누수를 방지하고 code를 간결하게 만듭니다.
date: 2026-04-02
---


## AutoCloseable Interface

- `AutoCloseable`은 Java에서 resource 해제를 위한 `close()` method 하나를 정의하는 interface입니다.
    - `AutoCloseable`을 구현한 class는 try-with-resources 구문과 연동됩니다.
    - file, database 연결, network socket 등 system resource를 사용하는 class가 구현합니다.

```java
public interface AutoCloseable {
    void close() throws Exception;
}
```

- `close()` method에서 resource를 명시적으로 해제하거나 정리(clean)하는 작업을 수행합니다.
    - 구현 class는 이 method를 override하여 resource별 정리 logic을 작성합니다.


---


## Try-With-Resources 구문

- try-with-resources는 `AutoCloseable`을 구현한 resource를 **block 종료 시 자동으로 해제**하는 구문입니다.
    - Java 7에서 도입되었습니다.
    - 예외가 발생하더라도 `close()`가 반드시 호출됩니다.
    - `finally` block에서 수동으로 `close()`를 호출하는 것보다 안전하고 간결합니다.


### 기본 구조

- try 괄호 안에 resource를 선언하면, block 종료 시 자동으로 `close()`가 호출됩니다.

```java
try (ResourceType resource = new ResourceType()) {
    // resource를 사용하는 code
} catch (ExceptionType e) {
    // 예외 처리
}
```


### 다중 Resource 관리

- 여러 resource를 semicolon(`;`)으로 구분하여 하나의 try-with-resources 구문에서 관리합니다.
    - resource는 **선언의 역순**으로 닫힙니다.

```java
try (
    ResourceType1 resource1 = new ResourceType1();
    ResourceType2 resource2 = new ResourceType2()
) {
    // resource1과 resource2를 사용하는 code
}
```


### 장점

- try-with-resources는 기존 try-finally 방식 대비 code 간결성, 예외 안전성, 다중 resource 처리에서 개선되었습니다.

| 특성 | try-finally | try-with-resources |
| --- | --- | --- |
| **code 간결성** | `close()` 호출 code를 직접 작성 | 자동으로 `close()` 호출 |
| **예외 안전성** | `finally`에서 예외 발생 시 원본 예외 유실 | 원본 예외 보존, `close()` 예외는 suppressed |
| **다중 resource** | 중첩 try-finally 필요 | semicolon 구분으로 간결 처리 |


---


## 사용 예시

- `BufferedReader`는 `AutoCloseable`을 구현하므로, try-with-resources 구문 안에서 사용하면 block 종료 시 자동으로 닫힙니다.

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


---


## Custom AutoCloseable 구현

- `AutoCloseable`을 직접 구현하여 **custom resource class를 try-with-resources와 함께 사용**합니다.

```java
public class DatabaseConnection implements AutoCloseable {
    private Connection connection;

    public DatabaseConnection(String url) throws SQLException {
        this.connection = DriverManager.getConnection(url);
    }

    public ResultSet executeQuery(String sql) throws SQLException {
        return connection.createStatement().executeQuery(sql);
    }

    @Override
    public void close() throws SQLException {
        if (connection != null && !connection.isClosed()) {
            connection.close();
        }
    }
}

// 사용
try (DatabaseConnection db = new DatabaseConnection("jdbc:mysql://localhost/test")) {
    ResultSet rs = db.executeQuery("SELECT * FROM users");
    // 결과 처리
} catch (SQLException e) {
    e.printStackTrace();
}
// block 종료 시 connection 자동 해제
```


---


## Suppressed Exception

- try-with-resources에서 **try block과 `close()` 모두에서 예외가 발생**하면, try block의 예외가 기본 예외가 되고 `close()`의 예외는 suppressed exception으로 추가됩니다.

```java
try (MyResource resource = new MyResource()) {
    throw new RuntimeException("try block 예외");
    // close()에서도 예외 발생 시, suppressed exception으로 기록
} catch (Exception e) {
    System.out.println(e.getMessage()); // "try block 예외"
    
    Throwable[] suppressed = e.getSuppressed();
    for (Throwable t : suppressed) {
        System.out.println("Suppressed : " + t.getMessage());
    }
}
```

- 기존 try-finally 방식에서는 `finally`의 예외가 원본 예외를 덮어써서 debugging이 어려웠지만, try-with-resources는 원본 예외를 보존합니다.


---


## Reference

- <https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html>
- <https://docs.oracle.com/javase/8/docs/api/java/lang/AutoCloseable.html>

