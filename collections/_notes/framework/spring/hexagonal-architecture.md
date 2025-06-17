---
published: false
---



- <https://medium.com/mo-zza/spring-boot-기반-헥사고날-아키텍처-hexagonal-architecture-with-spring-boot-4daf81752756>
- <https://github.com/mo-zza/hexagonal-architecture-example>
- <https://github.com/thombergs/buckpal>










## Spring Framework에서 Hexagonal Architecture 구현

- Spring Framework에서 Hexagonal Architecture를 구현할 때는, **dependency injection과 annotation을 활용**하여 **port and adapter pattern을 구현**합니다.
- package 구조와 Spring의 component scan 기능을 통해 각 계층 간의 의존성을 관리합니다.
- interface와 구현체를 분리하여 의존성 역전 원칙을 실현합니다.


---


## Package 구조

- Spring project에서 Hexagonal Architecture를 구현할 때의 권장 package 구조입니다.
- 각 계층별로 명확하게 분리하여 의존성 방향을 제어합니다.

```
src/main/java/com/example/account
├── adapter
│   ├── in
│   │   └── web
│   │       ├── AccountController.java
│   │       └── dto
│   │           ├── SendMoneyRequest.java
│   │           └── SendMoneyResponse.java
│   └── out
│       └── persistence
│           ├── AccountPersistenceAdapter.java
│           ├── AccountRepository.java
│           └── entity
│               └── AccountEntity.java
├── application
│   ├── service
│   │   └── SendMoneyService.java
│   └── port
│       ├── in
│       │   └── SendMoneyUseCase.java
│       └── out
│           ├── LoadAccountPort.java
│           └── UpdateAccountStatePort.java
└── domain
    ├── Account.java
    └── Money.java
```


---


## Domain Layer 구현

- domain layer는 순수한 business logic만을 포함하며 외부 의존성을 갖지 않습니다.
- Spring annotation을 사용하지 않고 POJO로 구현합니다.


### Domain Entity

```java
// Account.java
public class Account {
    private final Long id;
    private final Money balance;
    
    public Account(Long id, Money balance) {
        this.id = id;
        this.balance = balance;
    }
    
    public Money withdraw(Money amount) {
        if (balance.isLessThan(amount)) {
            throw new IllegalStateException("잔액이 부족합니다.");
        }
        return new Money(balance.getAmount().subtract(amount.getAmount()));
    }
    
    public Money deposit(Money amount) {
        return new Money(balance.getAmount().add(amount.getAmount()));
    }
    
    // getters
    public Long getId() { return id; }
    public Money getBalance() { return balance; }
}
```


### Value Object

```java
// Money.java
public class Money {
    private final BigDecimal amount;
    
    public Money(BigDecimal amount) {
        this.amount = amount;
    }
    
    public boolean isLessThan(Money other) {
        return amount.compareTo(other.amount) < 0;
    }
    
    public BigDecimal getAmount() {
        return amount;
    }
}
```


---


## Application Layer 구현

- application layer는 business workflow를 조정하고 domain model을 호출합니다.
- Spring의 `@Service` annotation을 사용하여 component로 등록합니다.


### Input Port Interface

```java
// SendMoneyUseCase.java
public interface SendMoneyUseCase {
    void sendMoney(SendMoneyCommand command);
}
```


### Command Object

```java
// SendMoneyCommand.java
public class SendMoneyCommand {
    private final Long sourceAccountId;
    private final Long targetAccountId;
    private final Money money;
    
    public SendMoneyCommand(Long sourceAccountId, Long targetAccountId, Money money) {
        this.sourceAccountId = sourceAccountId;
        this.targetAccountId = targetAccountId;
        this.money = money;
    }
    
    // getters
    public Long getSourceAccountId() { return sourceAccountId; }
    public Long getTargetAccountId() { return targetAccountId; }
    public Money getMoney() { return money; }
}
```


### Output Port Interface

```java
// LoadAccountPort.java
public interface LoadAccountPort {
    Account loadAccount(Long accountId);
}

// UpdateAccountStatePort.java
public interface UpdateAccountStatePort {
    void updateAccount(Account account);
}
```


### Application Service

```java
// SendMoneyService.java
@Service
@Transactional
public class SendMoneyService implements SendMoneyUseCase {
    
    private final LoadAccountPort loadAccountPort;
    private final UpdateAccountStatePort updateAccountStatePort;
    
    public SendMoneyService(LoadAccountPort loadAccountPort, 
                           UpdateAccountStatePort updateAccountStatePort) {
        this.loadAccountPort = loadAccountPort;
        this.updateAccountStatePort = updateAccountStatePort;
    }
    
    @Override
    public void sendMoney(SendMoneyCommand command) {
        Account sourceAccount = loadAccountPort.loadAccount(command.getSourceAccountId());
        Account targetAccount = loadAccountPort.loadAccount(command.getTargetAccountId());
        
        Money withdrawnMoney = sourceAccount.withdraw(command.getMoney());
        Money depositedMoney = targetAccount.deposit(command.getMoney());
        
        updateAccountStatePort.updateAccount(
            new Account(sourceAccount.getId(), withdrawnMoney)
        );
        updateAccountStatePort.updateAccount(
            new Account(targetAccount.getId(), depositedMoney)
        );
    }
}
```


---


## Input Adapter 구현

- input adapter는 외부 요청을 받아 application layer로 전달합니다.
- Spring MVC의 `@RestController`를 사용하여 HTTP 요청을 처리합니다.


### Web Controller

```java
// AccountController.java
@RestController
@RequestMapping("/api/accounts")
public class AccountController {
    
    private final SendMoneyUseCase sendMoneyUseCase;
    
    public AccountController(SendMoneyUseCase sendMoneyUseCase) {
        this.sendMoneyUseCase = sendMoneyUseCase;
    }
    
    @PostMapping("/{accountId}/send-money")
    public ResponseEntity<SendMoneyResponse> sendMoney(
            @PathVariable Long accountId,
            @RequestBody SendMoneyRequest request) {
        
        SendMoneyCommand command = new SendMoneyCommand(
            accountId,
            request.getTargetAccountId(),
            new Money(request.getAmount())
        );
        
        sendMoneyUseCase.sendMoney(command);
        
        return ResponseEntity.ok(new SendMoneyResponse("송금이 완료되었습니다."));
    }
}
```


### DTO Classe

```java
// SendMoneyRequest.java
public class SendMoneyRequest {
    private Long targetAccountId;
    private BigDecimal amount;
    
    // constructors, getters, setters
    public SendMoneyRequest() {}
    
    public Long getTargetAccountId() { return targetAccountId; }
    public void setTargetAccountId(Long targetAccountId) { this.targetAccountId = targetAccountId; }
    
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
}

// SendMoneyResponse.java
public class SendMoneyResponse {
    private final String message;
    
    public SendMoneyResponse(String message) {
        this.message = message;
    }
    
    public String getMessage() { return message; }
}
```


---


## Output Adapter 구현

- output adapter는 application layer의 요청을 외부 system으로 전달합니다.
- Spring Data JPA와 `@Repository` annotation을 사용하여 database와 연동합니다.


### JPA Entity

```java
// AccountEntity.java
@Entity
@Table(name = "accounts")
public class AccountEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "balance")
    private BigDecimal balance;
    
    protected AccountEntity() {} // JPA용 기본 생성자
    
    public AccountEntity(Long id, BigDecimal balance) {
        this.id = id;
        this.balance = balance;
    }
    
    public Account toDomain() {
        return new Account(this.id, new Money(this.balance));
    }
    
    public static AccountEntity fromDomain(Account account) {
        return new AccountEntity(account.getId(), account.getBalance().getAmount());
    }
    
    // getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public BigDecimal getBalance() { return balance; }
    public void setBalance(BigDecimal balance) { this.balance = balance; }
}
```


### JPA Repository

```java
// AccountRepository.java
@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, Long> {
    Optional<AccountEntity> findById(Long id);
}
```


### Persistence Adapter

```java
// AccountPersistenceAdapter.java
@Component
public class AccountPersistenceAdapter implements LoadAccountPort, UpdateAccountStatePort {
    
    private final AccountRepository accountRepository;
    
    public AccountPersistenceAdapter(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }
    
    @Override
    public Account loadAccount(Long accountId) {
        AccountEntity entity = accountRepository.findById(accountId)
            .orElseThrow(() -> new IllegalArgumentException("계정을 찾을 수 없습니다: " + accountId));
        return entity.toDomain();
    }
    
    @Override
    public void updateAccount(Account account) {
        AccountEntity entity = AccountEntity.fromDomain(account);
        accountRepository.save(entity);
    }
}
```


---


## Configuration 설정

- Spring Boot의 자동 설정과 component scan을 활용하여 의존성을 주입합니다.
- 필요에 따라 추가적인 configuration을 작성할 수 있습니다.


### Application Configuration

```java
// Application.java
@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.account.adapter.out.persistence")
@EntityScan(basePackages = "com.example.account.adapter.out.persistence.entity")
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```


### Database Configuration

```yaml
# application.yml
spring:
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
    username: sa
    password: 
  
  jpa:
    hibernate:
      ddl-auto: create-drop
    show-sql: true
    properties:
      hibernate:
        format_sql: true
```


---


## Test 구현

- Hexagonal Architecture의 장점인 test 용이성을 활용하여 각 계층별로 독립적인 test를 작성합니다.
- port interface를 mocking하여 단위 test를 수행합니다.


### Domain Test

```java
// AccountTest.java
class AccountTest {
    
    @Test
    void 정상적인_출금() {
        // given
        Account account = new Account(1L, new Money(new BigDecimal("1000")));
        Money withdrawAmount = new Money(new BigDecimal("500"));
        
        // when
        Money result = account.withdraw(withdrawAmount);
        
        // then
        assertThat(result.getAmount()).isEqualTo(new BigDecimal("500"));
    }
    
    @Test
    void 잔액_부족시_예외_발생() {
        // given
        Account account = new Account(1L, new Money(new BigDecimal("100")));
        Money withdrawAmount = new Money(new BigDecimal("500"));
        
        // when & then
        assertThatThrownBy(() -> account.withdraw(withdrawAmount))
            .isInstanceOf(IllegalStateException.class)
            .hasMessage("잔액이 부족합니다.");
    }
}
```


### Application Service Test

```java
// SendMoneyServiceTest.java
@ExtendWith(MockitoExtension.class)
class SendMoneyServiceTest {
    
    @Mock
    private LoadAccountPort loadAccountPort;
    
    @Mock
    private UpdateAccountStatePort updateAccountStatePort;
    
    @InjectMocks
    private SendMoneyService sendMoneyService;
    
    @Test
    void 송금_성공() {
        // given
        Account sourceAccount = new Account(1L, new Money(new BigDecimal("1000")));
        Account targetAccount = new Account(2L, new Money(new BigDecimal("500")));
        
        when(loadAccountPort.loadAccount(1L)).thenReturn(sourceAccount);
        when(loadAccountPort.loadAccount(2L)).thenReturn(targetAccount);
        
        SendMoneyCommand command = new SendMoneyCommand(1L, 2L, new Money(new BigDecimal("300")));
        
        // when
        sendMoneyService.sendMoney(command);
        
        // then
        verify(updateAccountStatePort, times(2)).updateAccount(any(Account.class));
    }
}
```


### Integration Test

```java
// AccountControllerIntegrationTest.java
@SpringBootTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
class AccountControllerIntegrationTest {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Autowired
    private AccountRepository accountRepository;
    
    @Test
    void 송금_API_통합_테스트() {
        // given
        AccountEntity sourceEntity = new AccountEntity(null, new BigDecimal("1000"));
        AccountEntity targetEntity = new AccountEntity(null, new BigDecimal("500"));
        
        AccountEntity savedSource = accountRepository.save(sourceEntity);
        AccountEntity savedTarget = accountRepository.save(targetEntity);
        
        SendMoneyRequest request = new SendMoneyRequest();
        request.setTargetAccountId(savedTarget.getId());
        request.setAmount(new BigDecimal("300"));
        
        // when
        ResponseEntity<SendMoneyResponse> response = restTemplate.postForEntity(
            "/api/accounts/" + savedSource.getId() + "/send-money",
            request,
            SendMoneyResponse.class
        );
        
        // then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody().getMessage()).isEqualTo("송금이 완료되었습니다.");
    }
}
```


---


## 의존성 관리 전략

- Spring Framework에서 Hexagonal Architecture의 의존성 방향을 올바르게 유지하는 방법입니다.
- compile time dependency와 runtime dependency를 구분하여 관리합니다.


### Maven 의존성 설정

```xml
<!-- pom.xml -->
<dependencies>
    <!-- Spring Boot Starter -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- Spring Data JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <!-- Database -->
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>
    
    <!-- Test -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```


### Dependency Injection 규칙

- **Constructor injection**을 사용하여 의존성을 주입합니다.
- interface에 의존하고 구현체는 Spring container가 관리하도록 합니다.
- `@Component`, `@Service`, `@Repository` annotation을 적절히 사용합니다.


### Package 의존성 제어

- domain package는 다른 package에 의존하지 않습니다.
- application package는 domain package에만 의존합니다.
- adapter package는 application과 domain package에 의존할 수 있습니다.
- ArchUnit 등의 tool을 사용하여 package 의존성 규칙을 test할 수 있습니다.

```java
// ArchitectureTest.java
@AnalyzeClasses(packages = "com.example.account")
class ArchitectureTest {
    
    @ArchTest
    static final ArchRule domain_should_not_depend_on_other_packages =
        noClasses()
            .that().resideInAPackage("..domain..")
            .should().dependOnClassesThat()
            .resideInAnyPackage("..adapter..", "..application..");
    
    @ArchTest
    static final ArchRule application_should_not_depend_on_adapters =
        noClasses()
            .that().resideInAPackage("..application..")
            .should().dependOnClassesThat()
            .resideInAPackage("..adapter..");
}
```


---


## Reference

- <https://github.com/wikibook/clean-architecture>
- <https://spring.io/guides/gs/spring-boot/>
- <https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-dependencies>





