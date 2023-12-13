---
layout: note
---

# Throwable

- '모든 오류의 조상인 Error class'와 '모든 예외의 조상인 Exception class'의 부모 class
- Throwable class를 직접 예외 처리에 사용하는 경우는 거의 없음
    - Throwable class를 상속받은 자식 class들을 예외 처리에서 사용함
- Throwable type과 이 class를 상속받은 subtype만이 JVM이나 throw keyword에 의해 throw될 수 있음
- 모든 예외 class들이 가지고 있는 공통된 method를 정의함

---

## Error

- runtime에서 실행 시 발생되며 전부 예측 불가능한 Unchecked Error에 속함
- Exception과 다르게 error가 발생할 경우 code를 고치지 않고서는 해결이 불가능
- application의 문제가 아니라 그 application이 동작하는 가상머신에 문제가 생겼을 때 발생하는 예외
    - ex) application을 구동시키기에 memory가 부족한 경우 : OutOfMemoryError
        - 개발자가 할 수 있는 것이 없음
        - 따라서 예외 처리를 하지 말고 그냥 error로 인해서 application이 중단되도록 내버려두기
        - 대신 자신의 application이 memory를 과도하게 사용하고 있다면 logic을 변경하거나 JVM에서 사용하는 memory의 제한을 변경하는 등의 대응 필요

---

# Exception

- program이 handling할 수 있는 경우
    - error와 달리 처리가 가능함

||Checked Exception|Unchecked Exception|
|-|-|-|
|처리 여부|반드시 처리해야 함|명시적인 처리를 강제하지 않음|
|확인 시점|compile time (실행 이전에 예측 가능)|runtime (예측 불가 : 실행해야 알 수 있음)|
|발생 시 transaction 처리|roll-back하지 않음|roll-back함|
|대표 예외|Exception의 하위 class 중 RuntimeException을 제외한 모든 예외|RuntimeException 하위 예외|

## Exception Handling

### 예외 복구

- 예외 상황을 파악하고 문제를 해결해서 정상 상태로 돌려놓는 방법
    - 예외를 잡아서 일정 시간, 조건만큼 대기하고 다시 재시도를 반복
    - 최대 재시도 횟수를 넘기게 되는 경우 예외를 발생
```java
final int MAX_RETRY = 100;
public Object someMethod() {
    int maxRetry = MAX_RETRY;
    while(maxRetry > 0) {
        try {
            ...
        } catch(SomeException e) {
            // log 출력, 정해진 시간만큼 대기
        } finally {
            // resource 반납 및 정리 작업
        }
    }
    // 최대 재시도 횟수를 넘기면 직접 예외 발생시킴
    throw new RetryFailedException();
}
```

### 예외 처리 회피

- 예외 처리를 직접 담당하지 않고 호출한 쪽으로 던져 회피하는 방법
    - 그래도 예외 처리의 필요성이 있다면 어느 정도는 처리하고 던지는 것이 좋음
    - 긴밀하게 역할을 분담하고 있는 관계가 아니라면 예외를 그냥 던지는 것은 무책임함
```java
// example 1
public void add() throws SQLException {
    // ...생략
}

// example 2 
public void add() throws SQLException {
    try {
        // ... 생략
    } catch(SQLException e) {
        // 로그를 출력하고 다시 날리기
        throw e;
    }
}
```

### 예외 전환

- 예외 회피와 비슷하게 method 밖으로 예외를 던지지만, 그냥 던지지 않고 적절한 예외로 전환해서 넘기는 방법
    - 조금 더 명확한 의미로 전달되기 위해 적합한 의미를 가진 예외로 변경
    - 예외 처리를 단순하게 만들기 위해 포장(wrap) 할 수도 있음
```java
// 조금 더 명확한 예외로 던짐
public void add(User user) throws DuplicateUserIdException, SQLException {
    try {
        // ...생략
    } catch(SQLException e) {
        if(e.getErrorCode() == MysqlErrorNumbers.ER_DUP_ENTRY) {
            throw DuplicateUserIdException();
        }
        else throw e;
    }
}

// 예외를 단순하게 포장
public void someMethod() {
    try {
        // ...생략
    }
    catch(NamingException ne) {
        throw new EJBException(ne);
        }
    catch(SQLException se) {
        throw new EJBException(se);
        }
    catch(RemoteException re) {
        throw new EJBException(re);
        }
}
```

---

# Java Exceptions Hierarchy

- Throwable
    - Error
        - AssertionError
        - LinkageError
            - BootstrapMethodError
            - ClassCircularityError
            - ClassFormatError
                - UnsupportedClassVersionError
            - ExceptionInInitializerError
            - IncompatibleClassChangeError
                - AbstractMethodError
                - IllegalAccessError
                - InstantiationError
                - NoSuchFieldError
                - NoSuchMethodError
            - NoClassDefFoundError
            - UnsatisfiedLinkError
            - VerifyError
        - ThreadDeath
        - VirtualMachineError
            - InternalError
            - OutOfMemoryError
            - StackOverflowError
            - UnknownError
    - Exception
        - CloneNotSupportedException
        - InterruptedException
        - IOException
            - FileNotFoundException
            - SocketException
                - ConnectException
            - UnknownHostException
        - ReflectiveOperationException
            - ClassNotFoundException
            - IllegalAccessException
            - InstantiationException
            - InvocationTargetException
            - NoSuchFieldException
            - NoSuchMethodException
        - RuntimeException
            - ArithmeticException
            - ArrayStoreException
            - ClassCastException
            - ConcurrentModificationException
            - EnumConstantNotPresentException
            - IllegalArgumentException
                - IllegalThreadStateException
                - NumberFormatException
            - IllegalMonitorStateException
            - IllegalStateException
            - IndexOutOfBoundsException
                - ArrayIndexOutOfBoundsException
                - StringIndexOutOfBoundsException
            - NegativeArraySizeException
            - NullPointerException
            - SecurityException
            - TypeNotPresentException
            - UnsupportedOperationException

---

## Reference

- https://airbrake.io/blog/java-exception-handling/the-java-exception-class-hierarchy
    - Java Exceptions Hierarchy
- https://codedragon.tistory.com/4447
    - throwable
- https://madplay.github.io/post/java-checked-unchecked-exceptions
    - exception
- https://bigstupid.tistory.com/77
    - exception
- https://www.nextree.co.kr/p3239/
    - exception