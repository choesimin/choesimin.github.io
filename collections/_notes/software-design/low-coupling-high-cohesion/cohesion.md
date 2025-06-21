---
layout: note
permalink: /344
title: 응집도 - Module 내부의 연관성
description: 응집도는 module 내부 구성 요소 간의 연관 정도를 나타내는 지표이며, 가능한 높은 응집도를 유지하는 것이 좋습니다.
date: 2025-06-21
---


## 응집도 : 소프트웨어 설계의 핵심적인 품질 지표

- 응집도(Cohesion)는 **module 내부 구성 요소 간의 연관 정도**를 나타내는 software 설계의 핵심 품질 지표입니다.
- module이 독립적인 기능을 수행하는지, 하나의 기능을 중심으로 책임이 잘 뭉쳐있는지를 측정하는 개념입니다.
- **정보 은닉 개념의 확장**으로, 하나의 module은 하나의 기능을 수행해야 한다는 원칙을 구체화합니다.


---


## 응집도의 기본 특징

- **유사 기능 영역 구성**을 통해 관련된 기능들을 논리적으로 grouping합니다.
    - 동일한 목적을 가진 요소들을 하나의 module에 배치합니다.
    - 서로 다른 목적을 가진 요소들은 별도의 module로 분리합니다.
- **단일 책임 할당**으로 각 module이 명확한 하나의 역할만 담당하도록 설계합니다.
    - module의 존재 이유가 명확하고 단순해집니다.
    - 변경이 필요한 이유도 하나로 제한됩니다.
- **함수 간 상호 협력**을 통해 module 내부 요소들이 공통 목표를 위해 함께 동작합니다.
    - 각 요소가 전체 기능 완성에 필수적인 역할을 담당합니다.


---


## 응집도의 유형과 품질 순서

- 응집도는 **7가지 유형**으로 분류되며, 품질 순서는 다음과 같습니다.
- **우연적 < 논리적 < 시간적 < 절차적 < 통신적 < 순차적 < 기능적** 순으로 품질이 향상됩니다.
- **높은 응집도를 가질수록 좋은 설계**이며, 기능적 응집도가 가장 이상적인 형태입니다.


### 기능적 응집도 (Functional Cohesion)

- module 내부의 **모든 기능이 단일한 목적을 위해 수행**되는 최고 품질의 응집도입니다.
    - module 내의 모든 요소들이 하나의 기능을 수행하기 위해 구성됩니다.
    - 각 요소는 전체 기능에 필수불가결한 역할을 담당합니다.
- **가장 높은 응집도를 가지며 가장 좋은 형태**로 평가됩니다.

```java
public class TriangleCalculator {
    public double calculateSine(double angle) {
        return Math.sin(angle);
    }
    
    public double calculateCosine(double angle) {
        return Math.cos(angle);
    }
    
    public double calculateTangent(double angle) {
        return Math.tan(angle);
    }
}
```

- 삼각함수 계산이라는 단일 목적을 위해 모든 method가 협력하는 예시입니다.


### 순차적 응집도 (Sequential Cohesion)

- module 내에서 **한 활동의 출력 값이 다른 활동의 입력으로 사용**되는 응집도입니다.
    - data가 순차적으로 처리되며 각 단계의 결과가 다음 단계로 전달됩니다.
    - 처리 순서가 중요하며 pipeline 형태의 구조를 가집니다.

```java
public class FileProcessor {
    public void processFile(String fileName) {
        String content = readFile(fileName);
        String processedContent = transformContent(content);
        writeFile(processedContent, fileName);
    }
    
    private String readFile(String fileName) {
        // file 읽기 logic
        return content;
    }
    
    private String transformContent(String content) {
        // content 변환 logic
        return processedContent;
    }
    
    private void writeFile(String content, String fileName) {
        // file 쓰기 logic
    }
}
```


### 통신적 응집도 (Communicational Cohesion)

- **동일한 입력과 출력을 사용하여 다른 기능을 수행**하는 활동들이 모여 있는 응집도입니다.
    - 모든 요소들이 동일한 입출력 data를 사용하지만 서로 다른 기능을 수행합니다.
    - **순차적 응집도와 달리 처리 순서가 중요하지 않습니다**.

```java
public class CustomerReportGenerator {
    public void generateCustomerReport(Customer customer) {
        printCustomerInfo(customer);
        validateCustomerData(customer);
        updateCustomerStatistics(customer);
    }
    
    private void printCustomerInfo(Customer customer) {
        // 고객 정보 출력
    }
    
    private void validateCustomerData(Customer customer) {
        // 고객 data 검증
    }
    
    private void updateCustomerStatistics(Customer customer) {
        // 고객 통계 정보 update
    }
}
```


### 절차적 응집도 (Procedural Cohesion)

- module이 **다수의 관련 기능을 순차적으로 수행**하지만 **data가 아닌 흐름 제어 요소가 전달**되는 응집도입니다.
    - 여러 기능 요소가 순차적으로 수행되지만 각 단계 간 data 전달은 없습니다.
    - 업무 흐름이나 procedure를 따라 구성됩니다.

```java
public class FileAccessManager {
    public void accessFile(String fileName) {
        checkPermission(fileName);
        logAccess(fileName);
        openFile(fileName);
    }
    
    private void checkPermission(String fileName) {
        // 접근 권한 확인
    }
    
    private void logAccess(String fileName) {
        // 접근 기록 남기기
    }
    
    private void openFile(String fileName) {
        // file 열기
    }
}
```


### 시간적 응집도 (Temporal Cohesion)

- **특정 시간에 처리되어야 하는 활동들**을 한 module에서 처리하는 응집도입니다.
    - 각 기능 요소들이 순서에 상관없이 특정 시점에 반드시 수행됩니다.
    - 초기화, 종료, 예외 처리 등에서 주로 나타납니다.

```java
public class SystemInitializer {
    public void initializeSystem() {
        loadConfiguration();
        connectDatabase();
        startLogService();
        initializeCache();
    }
    
    private void loadConfiguration() {
        // 설정 파일 로드
    }
    
    private void connectDatabase() {
        // database 연결
    }
    
    private void startLogService() {
        // log service 시작
    }
    
    private void initializeCache() {
        // cache 초기화
    }
}
```


### 논리적 응집도 (Logical Cohesion)

- **유사한 성격을 갖는 처리 요소들**이 한 module에서 처리되지만 **서로의 관계는 밀접하지 않은** 응집도입니다.
    - 논리적으로 비슷한 기능을 수행하지만 실제 처리 과정은 다릅니다.
    - 주로 parameter에 따라 다른 기능을 수행하는 형태로 나타납니다.

```java
public class MathOperations {
    public double calculate(int operation, double a, double b) {
        switch (operation) {
            case 0:
                return a + b;  // 덧셈
            case 1:
                return a - b;  // 뺄셈
            case 2:
                return a * b;  // 곱셈
            case 3:
                return a / b;  // 나눗셈
            default:
                throw new IllegalArgumentException("Unknown operation");
        }
    }
}
```


### 우연적 응집도 (Coincidental Cohesion)

- **서로 간에 어떠한 의미 있는 연관 관계도 없는 기능 요소**로 구성된 가장 낮은 품질의 응집도입니다.
    - module 내부의 각 구성 요소들이 아무런 관련 없이 구성된 형태입니다.
    - **module 수정이 side effect를 발생시킬 가능성이 매우 높습니다**.
- **가장 좋지 않은 응집도**로 반드시 피해야 하는 설계입니다.

```java
public class MiscellaneousUtilities {
    public void printMessage(String message) {
        System.out.println(message);
    }
    
    public int calculateAge(Date birthDate) {
        // 나이 계산 logic
        return age;
    }
    
    public void sendEmail(String recipient, String subject) {
        // email 전송 logic
    }
    
    public double convertCurrency(double amount, String from, String to) {
        // 환율 변환 logic
        return convertedAmount;
    }
}
```


---


## 응집도를 높이는 설계 원칙

- 응집도를 높이기 위해 다양한 설계 원칙과 pattern을 적용할 수 있습니다.


### 단일 책임 원칙 적용

- **하나의 module은 하나의 변경 사유**만 가져야 합니다.
    - class나 module이 변경되는 이유가 오직 하나여야 합니다.
    - 서로 다른 이유로 변경되는 기능들은 별도 module로 분리합니다.


### 기능 중심 설계

- **비즈니스 기능을 중심**으로 module을 구성합니다.
    - 기술적 계층보다는 업무 도메인을 기준으로 분리합니다.
    - 관련된 data와 behavior를 함께 배치합니다.


### Interface 분리

- **큰 interface를 작은 단위로 분리**하여 각각이 특정 목적만 담당하도록 합니다.
    - client가 사용하지 않는 method에 의존하지 않도록 설계합니다.
    - 응집도가 높은 작은 interface들로 구성합니다.


### 공통 변경 원칙 활용

- **함께 변경되는 class들을 같은 package나 module에 배치**합니다.
    - 동일한 이유로 변경되는 요소들을 grouping합니다.
    - 변경의 파급 효과를 최소화합니다.


---


## 응집도 측정하고 개선하기

- 응집도를 정량적으로 측정하고 개선하기 위한 방법론이 존재합니다.


### 응집도 측정 지표

- **LCOM(Lack of Cohesion of Methods) metric**을 활용하여 class의 응집도를 정량적으로 측정합니다.
    - method 간 공유하는 instance variable의 개수를 기반으로 계산합니다.
    - 값이 낮을수록 높은 응집도를 의미합니다.


### 응집도 개선 전략

- **Extract Class refactoring**을 통해 큰 class를 기능별로 분리합니다.
    - 서로 다른 책임을 가진 기능들을 별도 class로 추출합니다.
    - 각 class가 단일 책임을 갖도록 재구성합니다.
- **Move Method refactoring**으로 method를 적절한 class로 이동시킵니다.
    - method가 사용하는 data가 위치한 class로 method를 이동합니다.
    - data와 behavior의 결합도를 높입니다.
