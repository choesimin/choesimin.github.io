---
layout: note
permalink: /345
title: 결합도 - Module 간 상호 의존성
description: 결합도는 module 간의 상호 의존성을 나타내는 지표로, 가능한 낮은 결합도를 유지하는 것이 좋습니다.
date: 2025-06-21
---


## 결합도 : 모듈 간 독립성을 결정하는 핵심 지표

- 결합도(Coupling)는 **module 간의 상호 의존성을 나타내는 정도**로, software 구조에서 module 간 관련성을 측정하는 척도입니다.
- module 내부가 아닌 **외부 module과의 연관도**를 평가하여 system의 독립성과 유연성을 판단합니다.
- Java에서 결합도가 높은 class는 다른 class와 연관된 정도가 높아서, **해당 class를 변경하면 연관된 class도 변경해야 하며 재사용이 어려워집니다**.


---


## 결합도의 기본 특징

- **module 연관성 최소화**를 통해 각 module이 독립적으로 동작할 수 있도록 설계합니다.
    - module 간 불필요한 의존 관계를 제거합니다.
    - 각 module이 자체적으로 완결된 기능을 제공하도록 구성합니다.
- **interface 의존성 관리**로 module 간 상호작용을 명확한 경계로 제한합니다.
    - 잘 정의된 interface를 통해서만 module 간 통신이 이루어집니다.
    - 내부 구현 세부 사항은 외부에 노출되지 않습니다.
- **복잡성 감소**를 통해 system의 이해와 관리가 용이해집니다.
    - module 간 관계가 단순하고 명확해집니다.
    - 전체 system의 구조를 파악하기 쉬워집니다.
- **파급 효과 최소화**로 한 module의 변경이 다른 module에 미치는 영향을 제한합니다.
    - 변경 사항의 범위를 예측하고 통제할 수 있습니다.


---


## 결합도의 유형과 품질 순서

- 결합도는 **6가지 유형**으로 분류되며, 품질 순서는 다음과 같습니다.
- **내용 > 공통 > 외부 > 제어 > stamp > 자료** 순으로 결합도가 강해집니다.
- **결합도는 낮을수록 좋으며**, 자료 결합도가 가장 이상적인 형태입니다.


### 자료 결합도 (Data Coupling)

- **module 간 interface로 전달되는 parameter를 통해서만 상호작용**이 일어나는 가장 낮은 결합도입니다.
    - module 간 interface가 단순 자료 요소로만 구성됩니다.
    - 주고받는 data는 **순수한 자료형 요소**로 logic 제어 기능이 없습니다.
- **module을 변경하더라도 다른 module에는 영향을 미치지 않는** 이상적인 결합 상태입니다.
- **가장 낮은 결합도를 가지며 가장 좋은 형태**입니다.

```java
public class Calculator {
    public void performCalculation() {
        int result = makeSquare(5);  // 단순 data 전달
        System.out.println("Result: " + result);
    }
    
    public int makeSquare(int x) {
        return x * x;  // 순수한 자료 처리
    }
}

public class MathUtils {
    public static double calculateCircleArea(double radius) {
        return Math.PI * radius * radius;  // 단순 parameter 사용
    }
    
    public static int findMaximum(int a, int b) {
        return a > b ? a : b;  // 기본 자료형만 사용
    }
}
```


### Stamp 결합도 (Stamp Coupling)

- **module 간 interface로 배열이나 객체, 구조 등이 전달**되는 결합도입니다.
    - 두 module이 동일한 자료 구조를 참조하는 형태입니다.
    - **자료 구조 형태에 변경이 생기면 이를 참조하는 module에 영향**을 끼칩니다.
- Java에서 class의 field가 변경되는 경우, 이를 참조하는 module에게도 변경이 필요할 수 있습니다.

```java
public class Person {
    private String name;
    private String email;
    private int age;
    
    public Person(String name, String email, int age) {
        this.name = name;
        this.email = email;
        this.age = age;
    }
    
    // getter methods
    public String getName() { return name; }
    public String getEmail() { return email; }
    public int getAge() { return age; }
}

public class EmailService {
    public void sendWelcomeEmail(Person person) {
        // Person 객체 전체를 받아서 필요한 정보만 사용
        String message = "Welcome " + person.getName() + "!";
        sendEmail(person.getEmail(), message);
    }
    
    private void sendEmail(String email, String message) {
        // email 발송 logic
        System.out.println("Sending to " + email + ": " + message);
    }
}

public class PersonProcessor {
    public void processPersonData() {
        Person person = new Person("최시민", "abc@abc.com", 30);
        
        EmailService emailService = new EmailService();
        emailService.sendWelcomeEmail(person);  // 구조체 전달
        
        AgeValidator validator = new AgeValidator();
        validator.validateAge(person);  // 동일한 구조체 재사용
    }
}
```


### 제어 결합도 (Control Coupling)

- **다른 module의 내부 논리 조직을 제어하기 위한 목적으로 제어 신호를 이용**하여 통신하는 결합도입니다.
    - parameter로 전달되는 값에 따라 module 내부 logic의 처리가 달라지는 flag 값 등으로 결합됩니다.
    - **하위 module에서 상위 module로 제어 신호가 이동하여 권리 전도 현상**이 발생할 수 있습니다.

```java
public class ChargeCalculator {
    public void calculateAndPrintCharge(boolean isMember, boolean isPremium) {
        printCharge(isMember, isPremium);  // 제어 flag 전달
    }
    
    public void printCharge(boolean isMember, boolean isPremium) {
        if (isMember && isPremium) {
            printPremiumMemberCharge();
        } else if (isMember) {
            printMemberCharge();
        } else {
            printNormalCharge();
        }
    }
    
    private void printPremiumMemberCharge() {
        System.out.println("Premium Member Charge: $50");
    }
    
    private void printMemberCharge() {
        System.out.println("Member Charge: $80");
    }
    
    private void printNormalCharge() {
        System.out.println("Normal Charge: $100");
    }
}

public class ReportGenerator {
    public void generateReport(String reportType, boolean includeDetails) {
        switch (reportType) {  // 제어 parameter에 따른 분기
            case "SALES":
                generateSalesReport(includeDetails);
                break;
            case "INVENTORY":
                generateInventoryReport(includeDetails);
                break;
            case "FINANCIAL":
                generateFinancialReport(includeDetails);
                break;
        }
    }
    
    private void generateSalesReport(boolean includeDetails) {
        // 판매 보고서 생성 logic
    }
    
    private void generateInventoryReport(boolean includeDetails) {
        // 재고 보고서 생성 logic
    }
    
    private void generateFinancialReport(boolean includeDetails) {
        // 재무 보고서 생성 logic
    }
}
```


### 외부 결합도 (External Coupling)

- **module이 외부에 있는 다른 module의 data를 참조**하는 경우의 결합도입니다.
    - 어떤 module에서 반환한 값을 다른 module에서 참조하는 경우입니다.
    - **외부 변수로 선언된 data를 참조**하거나 **외부 통신 protocol을 공유**할 때 발생합니다.
- 공통 결합과 다른 점은 **참조하는 data가 외부에 위치**한다는 점입니다.

```java
// 외부 API나 외부 system과의 결합
public class DatabaseConfig {
    public static final String DB_URL = "jdbc:mysql://localhost:3306/mydb";
    public static final String DB_USER = "user";
    public static final String DB_PASSWORD = "password";
}

public class UserService {
    private DatabaseConnection connection;
    
    public UserService() {
        // 외부 설정에 의존
        this.connection = new DatabaseConnection(
            DatabaseConfig.DB_URL,
            DatabaseConfig.DB_USER,
            DatabaseConfig.DB_PASSWORD
        );
    }
    
    public User findUser(int userId) {
        // 외부 database protocol에 의존
        return connection.executeQuery("SELECT * FROM users WHERE id = " + userId);
    }
}

public class EmailNotificationService {
    // 외부 email service에 의존
    private ExternalEmailAPI emailAPI = new ExternalEmailAPI();
    
    public void sendNotification(String recipient, String message) {
        // 외부 API의 interface에 결합
        emailAPI.sendEmail(recipient, "Notification", message);
    }
}

public class ConfigurationManager {
    // 외부 설정 file에 의존
    public String getProperty(String key) {
        return System.getProperty(key);  // JVM system property에 결합
    }
    
    public String getEnvironmentVariable(String name) {
        return System.getenv(name);  // 환경 변수에 결합
    }
}
```


### 공통 결합도 (Common Coupling)

- **parameter가 아닌 module 밖에 선언된 전역 변수를 참조하고 갱신**하는 식으로 상호작용하는 결합도입니다.
    - 여러 module이 하나의 공통 data 영역을 사용하는 경우입니다.
    - **공통 data 영역의 내용을 변경하면 이를 참조하는 모든 module에 영향**을 줍니다.

```java
public class GlobalState {
    // 전역 변수들 - 여러 class에서 공유
    public static int userCount = 0;
    public static String currentUser = "";
    public static boolean isSystemReady = false;
    public static List<String> errorMessages = new ArrayList<>();
}

public class UserManager {
    public void addUser(String username) {
        // 전역 변수 직접 수정
        GlobalState.userCount++;
        GlobalState.currentUser = username;
        
        if (!GlobalState.isSystemReady) {
            GlobalState.errorMessages.add("System not ready for user: " + username);
        }
    }
    
    public void removeUser() {
        // 전역 변수 직접 수정
        GlobalState.userCount--;
        GlobalState.currentUser = "";
    }
}

public class SystemMonitor {
    public void checkSystemStatus() {
        // 전역 변수 직접 참조
        System.out.println("Current users: " + GlobalState.userCount);
        System.out.println("Current user: " + GlobalState.currentUser);
        
        if (!GlobalState.errorMessages.isEmpty()) {
            System.out.println("Errors: " + GlobalState.errorMessages);
            GlobalState.errorMessages.clear();  // 전역 상태 수정
        }
    }
}

public class LoginService {
    public boolean authenticateUser(String username, String password) {
        // 인증 logic
        boolean isValid = validateCredentials(username, password);
        
        if (isValid) {
            // 전역 변수 직접 수정
            GlobalState.currentUser = username;
            GlobalState.isSystemReady = true;
        }
        
        return isValid;
    }
    
    private boolean validateCredentials(String username, String password) {
        // 자격 증명 검증 logic
        return true;  // 예시용 간단 구현
    }
}
```


### 내용 결합도 (Content Coupling)

- **다른 module 내부에 있는 변수나 기능을 다른 module에서 직접 사용**하는 가장 높은 결합도입니다.
    - 다른 module의 local data에 접근하거나 **사용하고자 하는 module의 내용(code)을 알고 있어야** 합니다.
    - **module에 변경이 발생하면 이를 참조하는 module의 변경이 반드시 필요**하게 됩니다.
- **가장 높은 결합도를 가지며 가장 좋지 않은 결합 형태**로 반드시 피해야 합니다.

```java
public class DatabaseManager {
    private String connectionString = "localhost:3306";
    private boolean isConnected = false;
    
    private void establishConnection() {
        // 내부 연결 logic
        this.isConnected = true;
        System.out.println("Connected to: " + connectionString);
    }
    
    public void executeQuery(String query) {
        if (!isConnected) {
            establishConnection();
        }
        System.out.println("Executing: " + query);
    }
}

public class ReportService {
    private DatabaseManager dbManager;
    
    public ReportService(DatabaseManager dbManager) {
        this.dbManager = dbManager;
    }
    
    public void generateReport() {
        try {
            // DatabaseManager의 private field에 직접 접근 (리플렉션 사용)
            Field connectionField = DatabaseManager.class.getDeclaredField("connectionString");
            connectionField.setAccessible(true);
            String connection = (String) connectionField.get(dbManager);
            
            // DatabaseManager의 private method에 직접 접근
            Method establishMethod = DatabaseManager.class.getDeclaredMethod("establishConnection");
            establishMethod.setAccessible(true);
            establishMethod.invoke(dbManager);
            
            System.out.println("Report generated using connection: " + connection);
            
        } catch (Exception e) {
            System.err.println("Error accessing DatabaseManager internals: " + e.getMessage());
        }
    }
}

// 상속을 통한 내용 결합도 예시
public class ExtendedDatabaseManager extends DatabaseManager {
    public void forceConnection() {
        // 부모 class의 private member에 직접 접근하려 시도
        // 이는 내용 결합도를 만드는 anti-pattern
        super.executeQuery("SELECT 1");  // 우회적 접근
    }
}
```


---


## 결합도를 낮추는 설계 원칙

- 결합도를 낮추기 위해 다양한 설계 원칙과 pattern을 적용할 수 있습니다.


### Dependency Injection Pattern 활용

- **의존성을 외부에서 주입**받아 module 간 직접적인 의존 관계를 제거합니다.
    - interface를 통해 추상화된 의존성을 주입받습니다.
    - 구체적인 구현체가 아닌 추상화에 의존하도록 설계합니다.

```java
public interface EmailService {
    void sendEmail(String recipient, String subject, String body);
}

public class GmailService implements EmailService {
    public void sendEmail(String recipient, String subject, String body) {
        // Gmail API를 사용한 구현
    }
}

public class NotificationManager {
    private final EmailService emailService;
    
    // 의존성 주입을 통한 낮은 결합도
    public NotificationManager(EmailService emailService) {
        this.emailService = emailService;
    }
    
    public void sendWelcomeNotification(String userEmail) {
        emailService.sendEmail(userEmail, "Welcome!", "Welcome to our service!");
    }
}
```


### Interface 기반 설계

- **추상화된 interface를 통해 module 간 통신**하여 구현 세부 사항에 대한 의존성을 제거합니다.
    - 구현체 변경 시에도 interface를 사용하는 client code는 수정되지 않습니다.


### Event-Driven Architecture

- **event를 통한 비동기 통신**으로 module 간 직접적인 호출 관계를 제거합니다.
    - publisher와 subscriber 간의 느슨한 결합을 구현합니다.
    - message queue나 event bus를 활용합니다.


### Factory Pattern 적용

- **객체 생성 책임을 별도 module로 분리**하여 client code가 구체적인 class에 의존하지 않도록 합니다.
    - 객체 생성 logic의 변경이 client code에 영향을 주지 않습니다.


---


## 결합도 측정하고 개선하기

- 결합도를 정량적으로 측정하고 개선하기 위한 방법론이 존재합니다.


### 결합도 측정 지표

- **Afferent Coupling(Ca)**과 **Efferent Coupling(Ce)** metric을 활용하여 정량적으로 측정합니다.
    - Ca는 해당 package에 의존하는 외부 package의 수를 나타냅니다.
    - Ce는 해당 package가 의존하는 외부 package의 수를 나타냅니다.
- **Instability Metric(`I = Ce / (Ca + Ce)`)**으로 package의 안정성을 평가합니다.


### 결합도 개선 전략

- **Extract Interface refactoring**을 통해 구체적인 class 대신 interface에 의존하도록 변경합니다.
- **Move Method refactoring**으로 잘못 배치된 method를 적절한 class로 이동시킵니다.
- **Replace Inheritance with Delegation**을 통해 강한 결합을 약한 결합으로 변경합니다.
- **Introduce Parameter Object**로 여러 parameter를 하나의 객체로 묶어 interface를 단순화합니다.
