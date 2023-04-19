---
layout: note
title: Clean Code - 오류 처리
version: 2023-04-18
---




## 튼튼하고 깨끗한 Code

- code는 읽기 쉬울 뿐만 아니라, 안정성도 높아야 합니다.
    - 가독성과 안정성은 상충하는 목표가 아닙니다.

- 오류와 논리의 독립적인 추론이 가능하게 code를 작성해야 합니다.
    - 따라서 오류 처리를 program 논리와 분리해야 합니다.




---




## Error Code보다 Exception을 사용하기

- 논리와 오류 처리 code가 섞이지 않도록 해야 합니다.
- exception은 오류를 논리 logic와 떨어진 곳에서 처리하기 위해 사용합니다.


### Error Code 사용

- 함수를 호출한 즉시 오류를 확인해야 하기 때문에 호출자 code가 복잡해집니다.

```java
public class DeviceController {

    ...

    public void sendShutDown() {
        DeviceHandle handle = getHandle(DEV1);

        // 디바이스 상태를 점검한다.
        if (handle != DeviceHandle.INVALID) {
            // 레코드 필드에 디바이스 상태를 저장한다.
            retrieveDeviceRecord(handle);

            // 디바이스가 일시정지 상태가 아니라면 종료한다.
            if (record.getStatus() != DEVICE_SUSPENDED) {
                closeDevice(handle);
            } else {
                logger.log("Device suspended. Unable to shut down");
            }
        } else {
            logger.log("Invalid handle");
        }
    }

    ...

}
```


### Exception 사용

- 논리를 처리하는 부분과 오류를 처리하는 부분을 독립적으로 읽고 이해할 수 있습니다.

```java
public class DeviceController {

    ...

    public void sendShutDown() {
        try {
            tryToShutDown();
        }
        catch (DeviceShutDownError e) {
            logger.log(e);
        }
    }

    private void tryToShutDown() {
        DeviceHandle handle = getHandle(DEV1);
        DeviceRecord record = retrieveDeviceRecord(handle);

        pauseDevice(handle);
        clearDeviceWorkQueue(handle);
        closeDevice(handle);
    }

    private DeviceHandle getHandle(DeviceId id) {
        ...
        throw new DeviceShutDownError("Invalid handle for: " + id.toString());
        ...
    }
    
    ...

}
```




---




## Try-Catch-Finally 문부터 작성하기

- 예외가 발생할 code를 짤 때는, `try-catch-finnaly` 문으로 시작하여 범위를 정의합니다.
    - `try` block에서 무슨 일이 생기든, `catch` block은 program 상태를 일관성 있게 유지해야 합니다.
        - transaction과 비슷합니다.

```java
void pay() {
    try {
        approval();
        updateLedgerFinish();
        sendFinishTalk();

    } catch (ApprovalFailException e) {

    } catch (UpdateFailException e) {
        /* 승인난 결제 취소하기 */

    } catch (SendFailException) {
        /* 승인난 결제 취소하기 */
        /* 완료 갱신한 원장 되돌리기 */

    } finally {
        /* 관제 메세지 보내기 */
    }
}

void approavl() throws ApprovalFailException {
    try {
        /* 승인 요청 보내기 */
    } catch (Exception e) {
        throw new ApprovalFailException();
    }
}

void updateLedgerFinish() throws UpdateFailException {
    try {
        /* 원장을 완료 처리하기 */
    } catch (Exception e) {
        throw new UpdateFailException();
    }
}

void sendFinishTalk() throws SendFailException {
    try {
        /* 결제 완료 알림 보내기 */
    } catch (Exception e) {
        throw new SendFailException();
    }
}
```




---




## Unchecked Exception을 사용하기

- checked exception은 개방-폐쇄 원칙(OCP, Open-Closed Principle)을 위반합니다.
    - 모든 함수가 최하위 함수에서 던지는 예외를 알아야 하기 때문에 캡슐화가 깨집니다.
        - method에서 checked exception를 던지고 `catch` block이 상위 단계에 있다면, 그 사이의 모든 method가 해당 exception을 정의해야 합니다.
        - 하위 단계에서 code를 수정하면, 상위 단계 method 선언부를 전부 고쳐야 합니다.
            - module과 관련된 code가 바뀌지 않았더라도, 선언부가 바뀌었으므로 module을 다시 build하고 배포해야 합니다.


### Checked Exception & Unchecked Exception

| Checked Exception | Unchecked Exception |
| - | - |
| 확인된 예외 | 미확인된 예외 |
| compile 단계에서 확인하는 예외입니다. | 실행 단계에서 확인하는 예외입니다. |
| 반드시 예외 처리(`try-catch` or `throw`)를 해줘야 합니다. | 예외 처리를 강제하지 않습니다. |
| FileNotFoundException, ClassNotFoundException, IOException, SQLException, ... | RuntimeException, NullPointerException, IllegalArgumentException, ArrayIndexOutOfBoundsException, ... |




---




## 예외에 의미를 제공하기

- 예외를 던지는 전후 상황이 충분히 설명되어야 합니다.
    - `catch` block에서 오류 정보, 실패한 연산 이름, 실패 유형 등을 log로 기록합니다.
        - 오류 정보는 exception의 message나 code에 넣을 수 있습니다.

- 예외에 의미를 주면 오류가 발생한 원인과 위치를 찾기 쉬워집니다.
    - stacktrace만으로 원인을 찾을 수도 있지만, 보기 힘들고, 찾는 데에 오래 걸립니다.




---




## 호출자를 고려해 예외 class를 정의하기

- exception class를 만들 때, 호출자가 어떤 방식으로 예외를 잡을지 고려해야 합니다.
    - 한 예외는 잡아내고 다른 예외는 무시해도 괜찮은 경우라면, 예외 class를 여러 개 사용할 수도 있습니다.

- 발생할 수 있는 예외 case를 묶으면, 예외 유형에 대한 관리가 쉬워집니다.
    - 예외를 묶을 때는 wrapper class를 활용합니다.

- 외부 library를 사용할 때, 외부 class를 wrapper class로 감싸서 사용하는 것이 좋습니다.
    - 외부 library와 program 사이의 의존성이 낮아집니다.

    | Good | Bad |
    | - | - |
    | 외부 library를 사용하는 class를 wrapper class로 한 번 감싼 뒤 이 class에 대한 예외를 처리하기 | 외부 library가 던질 모든 예외를 catch로 구분하여 예외를 처리하기 |



### Example : ACMEPort class(외부 API class)를 사용하는 상황

- Good Code
    ```java
    // ACME class를 LocalPort class로 wrapping해 new ACMEPort().open() method에서 던질 수 있는 exception들을 간략화함
    LocalPort port = new LocalPort(12);
    try {
        port.open();
    } catch (PortDeviceFailure e) {
        reportError(e);
        logger.log(e.getMessage(), e);
    } finally {
        ...
    }

    public class LocalPort {
        private ACMEPort innerPort;
        public LocalPort(int portNumber) {
        innerPort = new ACMEPort(portNumber);
        }
        
        public void open() {
        try {
            innerPort.open();
        } catch (DeviceResponseException e) {
            throw new PortDeviceFailure(e);
        } catch (ATM1212UnlockedException e) {
            throw new PortDeviceFailure(e);
        } catch (GMXError e) {
            throw new PortDeviceFailure(e);
        }
        }
        ...
    }
    ```

- Bad Code
    ```java
    // catch 문의 내용이 거의 같음
    ACMEPort port = new ACMEPort(12);
    try {
        port.open();
    } catch (DeviceResponseException e) {
        reportPortError(e);
        logger.log("Device response exception", e);
    } catch (ATM1212UnlockedException e) {
        reportPortError(e);
        logger.log("Unlock exception", e);
    } catch (GMXError e) {
        reportPortError(e);
        logger.log("Device response exception");
    } finally {
        ...
    }
    ```





---





## Null을 반환/전달하지 않기

- null을 반환하면, 호출자에게 null check에 대한 문제를 떠넘기는 것입니다.
    - 호출자는 null check logic을 작성해야만 합니다. 많아져야 함
- null 확인 누락의 문제가 많이 발생한다면, 먼저 null 확인이 너무 많지는 않은지 봐야 합니다.



### Null이면 안 되는 경우

- 오류 상황이므로, 예외 처리합니다.
    - java에서는 `NullPointerException`을 잡아서 던지거나 처리합니다.


### Null이 의미를 가지고 쓰이는 경우

- 정상적인 인수로 null을 기대하는 API라면, null의 반환/전달을 필요에 의해 사용할 수도 있습니다.
    - 반환하는 쪽과 호출하는 쪽 모두 사전에 null의 사용을 약속하고, 지속적으로 관리해야 합니다.


#### 특수 사례 객체(special case object)를 반환하기

- list로 넘길 수 있는 경우라면, null이 아닌 empty list를 반환합니다.
    ```java
    Collections.emptyList();    // []
    ```

    - Good Code
        ```java
        // Good
        List<Employee> employees = getEmployees();
        for(Employee e : employees) {
            totalPay += e.getPay();
        }
        
        public List<Employee> getEmployees() {
            if( .. there are no employees .. ) {
                return Collections.emptyList();
            }
        }
        ```

    - Bad Code
        ```java
        // Bad
        List<Employee> employees = getEmployees();
        if (employees != null) {
            for(Employee e : employees) {
                totalPay += e.getPay();
            }
        }
        ```

- Java8 이상을 사용한다면, `Optional` 객체를 사용합니다.

    | Null 처리를 위한 Optional의 함수 | 설명 |
    | - | - |
    | `orElse()` | 저장된 값이 존재하면 그 값을 반환하고, 값이 존재하지 않으면 인수로 전달된 값을 반환합니다. |
    | `orElseGet()` | 저장된 값이 존재하면 그 값을 반환하고, 값이 존재하지 않으면 인수로 전달된 Lambda 표현식의 결괏값을 반환합니다. |
    | `orElseThrow()` | 저장된 값이 존재하면 그 값을 반환하고, 값이 존재하지 않으면 인수로 전달된 예외를 발생시킵니다. |

    - Good Code
        ```java
        Optional<String> opt = Optional.ofNullable("Optional 객체");
        if (opt.isPresent()) {
            System.out.println(opt.get());
        }
        ```

    - Bad Code
        ```java
        String s = "String 객체";
        if (s != null) {
            System.out.println(s);
        }
        ```




---




# Reference

- Robert C. Martin, 『Clean Code』
