---
layout: note
title: Clean Code - 오류 처리
version: 2023-04-18
---




## 오류 처리

- 튼튼하고 깨끗한 code
    - 깨끗한 code는 읽기도 좋아야 하지만 안정성도 높아야 함
        - 두 가지 목표는 상충하는 목표가 아님
    - 오류 처리를 program 논리와 분리해 독자적인 사안으로 고려할 수 있어야 독립적인 추론이 가능해짐 -> 유지보수성의 향상

- 오류 code보다 예외를 사용하기
    - 논리와 오류 처리 code가 섞이지 않도록 해야 함
    - 오류 code 사용
        - 함수를 호출한 즉시 오류를 확인해야 하기 때문에 호출자 code가 복잡해짐

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

    - 예외 사용
        - 논리를 처리하는 부분과 오류를 처리하는 부분을 분리하기가 쉽기 때문에 독립적으로 읽고 이해할 수 있음
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

- Try-Catch-Finally 문부터 작성하기
    - 예외가 발생할 code를 짤 때는, try-catch-finnaly 문으로 시작하여 범위를 정의하기
    - try block은 transaction과 비슷함
    - try block에서 무슨 일이 생기든 catch block은 program 상태를 일관성 있게 유지해야 함
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

- 미확인(unchecked) 예외를 사용하기
    - Checked Exception
        - compile 단계에서 확인
        - 반드시 예외 처리(try-catch or throw)를 해줘야 함
        - ex) FileNotFoundException, ClassNotFoundException, IOException, SQLException
    - Unchecked Exception
        - 실행 단계에서 확인
        - RuntimeException의 하위 class : 실행 중에(runtime) 발생할 수 있는 예외
        - 예외 처리를 강제하지 않음
        - ex) NullPointerException, IllegalArgumentException, ArrayIndexOutOfBoundsException, {Custom}Exception
    - 확인된(checked) 예외는 OCP(Open Closed Principle)를 위반함
        - method에서 확인된 예외를 던졌는데, catch block이 상위 단계에 있다면, 그 사이의 method 모두가 해당 예외를 정의해야 함
        - 하위 단계에서 code를 변경하면, 상위 단계 method 선언부를 전부 고쳐야 함 (연쇄적인 수정)
        - module과 관련된 code가 바뀌지 않았더라도, 선언부가 바뀌었으므로 module을 다시 build하고 배포해야 함
    - 오류를 원거리에서 처리하기 위해 예외를 사용하는데, 모든 함수가 최하위 함수에서 던지는 예외를 알아야 하는 것은 의도에 맞지 않음 (캡슐화가 깨짐)

- 예외에 의미를 제공하기
    - 예외를 던지는 전후 상황이 충분히 설명되어야 함
        - catch block에서 오류 정보, 실패한 연산 이름, 실패 유형 등을 log로 기록하기
    - 오류가 발생한 원인과 위치를 찾기 쉬워짐
        - 오류 발생에 의한 호출 stack만으로 원인을 찾기는 어려움
    - ex) 이상한 인자를 받는 예외 logic에 IllegalArgumentException를 발생시킨다면, 어디서 발생했는지 stacktrace를 봐야만 알 수 있음
        - 이 상황에서 오류 message(exception.message)에 오류 정보, 실패 유형 등을 넣으면 원인을 찾기 쉬움

- 호출자를 고려해 예외 class를 정의하기
    - 감싸기(wrapper) class를 활용하여, 발생할 수 있는 예외 case를 묶으면, 예외 유형에 대한 관리가 쉬워짐
        - "어떤 방식으로 예외를 잡을지"가 exception class를 만드는 데에 가장 중요한 관심사이기 때문
        - ex) '외부 library가 던질 모든 예외를 catch로 구분하여 예외를 처리하기' < '외부 library를 사용하는 class를 wrapper class로 한 번 감싼 뒤 이 class에 대한 예외를 처리하기'
    - 외부 API를 사용할 때는 감싸기 기법이 최선
        - 외부 library와 program 사이에서 의존성이 크게 줄어듬
    - 예외 class가 하나만 있어도 충분한 code가 흔하지만, 한 예외는 잡아내고 다른 예외는 무시해도 괜찮은 경우라면 여러 예외 class를 사용하기
    - Example : ACMEPort class(외부 API class)를 사용하는 상황
        ```java
        // Bad
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


        // Good
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

- null을 반환/전달하지 않기
    - null을 반환하면, 호출자에게 문제를 떠넘기는 것이고, 따라서 null check logic도 많아져야 함
    - null 확인 누락의 문제를 논하기 전에 null 확인이 너무 많지는 않은지 봐야 함
    - method에서 null을 반환하는 경우
        - 예외를 던지기
            - 감싸기 method를 구현하여 이용하기
                - ex) NullPointerException을 잡아서 던지기
        - 특수 사례 객체(special case object)를 반환하기
            - list로 넘길 수 있는 경우라면, null이 아닌 빈 list를 반환하기 : Collections.emptyList();
                ```java
                // Bad
                List<Employee> employees = getEmployees();
                if (employees != null) {
                    for(Employee e : employees) {
                        totalPay += e.getPay();
                    }
                }

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

            - (Java8 이상의 경우) Optional 객체를 통해 구현하기

                ```java
                // Bad
                String s = "String 객체";
                if (s != null) {
                    System.out.println(s);
                }

                // Good
                Optional<String> opt = Optional.ofNullable("Optional 객체");
                if (opt.isPresent()) {
                    System.out.println(opt.get());
                }
                ```

                - null 처리를 위한 Optional의 method
                    - orElse() : 저장된 값이 존재하면 그 값을 반환하고, 값이 존재하지 않으면 인수로 전달된 값을 반환함
                    - orElseGet() : 저장된 값이 존재하면 그 값을 반환하고, 값이 존재하지 않으면 인수로 전달된 Lambda 표현식의 결괏값을 반환함
                    - orElseThrow() : 저장된 값이 존재하면 그 값을 반환하고, 값이 존재하지 않으면 인수로 전달된 예외를 발생시킴

    - 정상적인(null이 의미가 있는) 인수로 null을 기대하는 API라면 null의 반환/전달을 필요에 의해 사용할 수도 있음




---




# Reference

- Robert C. Martin, 『Clean Code』
