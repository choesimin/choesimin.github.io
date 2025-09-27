---
layout: note
permalink: /380
title: JPA 설정하고 사용하기
description: JPA를 사용하기 위해서는 project 설정, Entity 작성, EntityManager 사용법을 알아야 합니다.
date: 2025-09-28
---


## JPA 설정과 기본 사용법

- JPA 사용을 위해서는 **persistence.xml** 설정과 **EntityManagerFactory** 생성이 필요합니다.
- **annotation 기반 mapping**을 통해 entity와 table의 관계를 정의합니다.
- **EntityManager**를 통해 실제 database 작업을 수행하며, **transaction 관리**가 핵심입니다.


---


## JPA Project 설정

- JPA project를 시작하기 위해서는 **기본 dependency**와 **설정 file**이 필요합니다.
- **database driver**와 **JPA provider** 설정을 통해 실행 환경을 구성합니다.
- **development 환경**과 **production 환경**에 따른 설정 차이를 고려해야 합니다.


### Maven Dependency 설정

- **JPA API dependency** : JPA 표준 API를 사용하기 위한 기본 dependency입니다.
    - `jakarta.persistence:jakarta.persistence-api`를 추가합니다.
    - JPA 3.0부터는 javax.persistence에서 jakarta.persistence로 package가 변경되었습니다.
    - API만 제공하므로 실제 구현체도 함께 추가해야 합니다.

- **JPA 구현체 dependency** : 실제 ORM 기능을 제공하는 구현체를 선택합니다.
    - Hibernate 사용 시, `org.hibernate:hibernate-core`를 추가합니다.
    - EclipseLink 사용 시, `org.eclipse.persistence:eclipselink`를 추가합니다.
    - OpenJPA 사용 시, `org.apache.openjpa:openjpa`를 추가합니다.

- **database driver dependency** : 사용할 database의 JDBC driver를 추가합니다.
    - MySQL이라면, `mysql:mysql-connector-java` 또는 `com.mysql:mysql-connector-j`를 추가합니다.
    - PostgreSQL이라면, `org.postgresql:postgresql`를 추가합니다.
    - H2라면 `com.h2database:h2`를 추가합니다.
        - in-memory DB로, 주로 development/test 용도로 사용됩니다.
    - Oracle이라면, `com.oracle.database.jdbc:ojdbc8`를 추가합니다.

```xml
<dependencies>
    <!-- JPA API -->
    <dependency>
        <groupId>jakarta.persistence</groupId>
        <artifactId>jakarta.persistence-api</artifactId>
        <version>3.1.0</version>
    </dependency>
    
    <!-- Hibernate Implementation -->
    <dependency>
        <groupId>org.hibernate</groupId>
        <artifactId>hibernate-core</artifactId>
        <version>6.2.0.Final</version>
    </dependency>
    
    <!-- Database Driver -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.33</version>
    </dependency>
</dependencies>
```


### Gradle Dependency 설정

- **Gradle 설정** : Maven과 동일한 dependency를 Gradle 문법으로 설정합니다.
    - `implementation`을 사용하여 compile time과 runtime 모두에서 사용 가능하게 설정합니다.
    - test scope의 dependency는 `testImplementation`을 사용합니다.
    - version catalog나 platform을 활용하여 version 관리를 체계화할 수 있습니다.

```gradle
dependencies {
    implementation 'jakarta.persistence:jakarta.persistence-api:3.1.0'
    implementation 'org.hibernate:hibernate-core:6.2.0.Final'
    implementation 'mysql:mysql-connector-java:8.0.33'
    
    testImplementation 'com.h2database:h2:2.1.214'
    testImplementation 'junit:junit:4.13.2'
}
```


---


## Persistence.xml 설정

- **META-INF/persistence.xml** file에서 JPA 설정을 정의합니다.
- **persistence unit** 이름과 **JPA provider**를 지정합니다.
- **database connection** 정보와 **JPA 구현체별 설정**을 포함합니다.


### 기본 Persistence.xml 구조

- **persistence unit 정의** : application에서 사용할 persistence unit을 정의합니다.
    - persistence unit은 하나의 database 연결과 entity 집합을 나타냅니다.
    - 여러 persistence unit을 정의하여 multiple database를 사용할 수 있습니다.
    - unit 이름은 EntityManagerFactory 생성 시 사용됩니다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<persistence xmlns="https://jakarta.ee/xml/ns/persistence"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="https://jakarta.ee/xml/ns/persistence
             https://jakarta.ee/xml/ns/persistence/persistence_3_0.xsd"
             version="3.0">
    
    <persistence-unit name="myPersistenceUnit" transaction-type="RESOURCE_LOCAL">
        <provider>org.hibernate.jpa.HibernatePersistenceProvider</provider>
        
        <properties>
            <!-- Database Connection Properties -->
            <property name="jakarta.persistence.jdbc.driver" 
                      value="com.mysql.cj.jdbc.Driver"/>
            <property name="jakarta.persistence.jdbc.url" 
                      value="jdbc:mysql://localhost:3306/mydb"/>
            <property name="jakarta.persistence.jdbc.user" 
                      value="username"/>
            <property name="jakarta.persistence.jdbc.password" 
                      value="password"/>
            
            <!-- Hibernate Properties -->
            <property name="hibernate.dialect" 
                      value="org.hibernate.dialect.MySQL8Dialect"/>
            <property name="hibernate.hbm2ddl.auto" 
                      value="update"/>
            <property name="hibernate.show_sql" 
                      value="true"/>
            <property name="hibernate.format_sql" 
                      value="true"/>
        </properties>
    </persistence-unit>
</persistence>
```


### Transaction Type 설정

- **RESOURCE_LOCAL** : application이 직접 transaction을 관리하는 방식입니다.
    - standalone application이나 Spring framework에서 주로 사용합니다.
    - EntityTransaction을 통해 programmatic transaction 관리가 가능합니다.
    - connection pool과 transaction manager를 직접 설정해야 합니다.

- **JTA** : container가 transaction을 관리하는 방식입니다.
    - Java EE application server에서 사용하는 방식입니다.
    - distributed transaction과 two-phase commit을 지원합니다.
    - container가 제공하는 transaction manager를 사용합니다.

```xml
<!-- RESOURCE_LOCAL 설정 -->
<persistence-unit name="localUnit" transaction-type="RESOURCE_LOCAL">
    <!-- Database connection properties 필요 -->
</persistence-unit>

<!-- JTA 설정 -->
<persistence-unit name="jtaUnit" transaction-type="JTA">
    <jta-data-source>java:jboss/datasources/MyDS</jta-data-source>
    <!-- Database connection properties 불필요 -->
</persistence-unit>
```


### Entity Class 등록

- **자동 scanning** : classpath에서 `@Entity` annotation이 있는 class를 자동으로 찾습니다.
    - `<exclude-unlisted-classes>false</exclude-unlisted-classes>` 설정으로 활성화합니다.
    - package scanning을 통해 entity class들을 자동으로 등록합니다.
    - 대부분의 경우 이 방식을 사용하는 것이 편리합니다.

- **명시적 등록** : entity class를 `<class>` tag에 직접 명시합니다.
    - 특정 entity만 선택적으로 등록하고 싶을 때 사용합니다.
    - 여러 module로 구성된 project에서 유용할 수 있습니다.
    - class loading 성능을 최적화할 수 있습니다.

```xml
<persistence-unit name="myUnit">
    <!-- 명시적 등록 -->
    <class>com.example.entity.User</class>
    <class>com.example.entity.Order</class>
    
    <!-- 자동 scanning 비활성화 -->
    <exclude-unlisted-classes>true</exclude-unlisted-classes>
</persistence-unit>
```


### Database별 설정 예제

- 각 database에 맞는 JDBC driver, URL, dialect 설정 방법이 다릅니다.

#### MySQL 설정

```xml
<property name="jakarta.persistence.jdbc.driver" 
          value="com.mysql.cj.jdbc.Driver"/>
<property name="jakarta.persistence.jdbc.url" 
          value="jdbc:mysql://localhost:3306/mydb?serverTimezone=UTC"/>
<property name="hibernate.dialect" 
          value="org.hibernate.dialect.MySQL8Dialect"/>
```

- MySQL database 연결을 위한 설정입니다.
    - MySQL 8.0부터는 `cj.jdbc.Driver`를 사용해야 합니다.
    - timezone 설정이 필요한 경우 URL에 `serverTimezone=UTC` parameter를 추가합니다.
    - character encoding 설정을 위해 `useUnicode=true&characterEncoding=UTF-8`을 추가할 수 있습니다.

#### PostgreSQL 설정

```xml
<property name="jakarta.persistence.jdbc.driver" 
          value="org.postgresql.Driver"/>
<property name="jakarta.persistence.jdbc.url" 
          value="jdbc:postgresql://localhost:5432/mydb"/>
<property name="hibernate.dialect" 
          value="org.hibernate.dialect.PostgreSQLDialect"/>
```

- PostgreSQL database 연결을 위한 설정입니다.
    - PostgreSQL은 schema 개념이 있으므로 필요시 `currentSchema` parameter를 설정합니다.
    - SSL 연결이 필요한 경우 `ssl=true` parameter를 추가합니다.

#### H2 설정

```xml
<property name="jakarta.persistence.jdbc.driver" 
          value="org.h2.Driver"/>
<property name="jakarta.persistence.jdbc.url" 
          value="jdbc:h2:mem:testdb"/>
<property name="hibernate.dialect" 
          value="org.hibernate.dialect.H2Dialect"/>
```

- 개발이나 test 환경에서 사용하는 in-memory database 설정입니다.
    - file 기반 database를 사용하려면 `jdbc:h2:~/test` 형태의 URL을 사용합니다.
    - in-memory database는 application 재시작 시 data가 초기화됩니다.


---


## Entity Class 작성

- **@Entity annotation**을 사용하여 JPA가 관리할 class임을 선언합니다.
- **primary key 설정**과 **field mapping**을 annotation으로 정의합니다.
- **연관 관계 mapping**을 통해 entity 간의 관계를 표현합니다.


### 기본 Entity 구조

- **필수 요소** : entity class가 갖춰야 할 기본 요소들입니다.
    - `@Entity` annotation으로 JPA managed class임을 선언합니다.
    - `@Id` annotation으로 primary key field를 지정합니다.
    - public 또는 protected 기본 생성자가 필요합니다.
    - final class, method, field는 JPA에서 사용할 수 없습니다.

```java
@Entity
@Table(name = "users")
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "username", nullable = false, unique = true)
    private String username;
    
    @Column(name = "email", nullable = false)
    private String email;
    
    @Column(name = "created_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;
    
    // 기본 생성자 (필수)
    protected User() {}
    
    // 생성자
    public User(String username, String email) {
        this.username = username;
        this.email = email;
        this.createdAt = new Date();
    }
    
    // getter, setter methods
    // ...
}
```


### Primary Key 설정

- **단일 primary key** : 하나의 field를 primary key로 사용하는 가장 일반적인 방식입니다.
    - `@Id` annotation으로 primary key field를 지정합니다.
    - `@GeneratedValue`로 key 생성 전략을 설정할 수 있습니다.
    - AUTO, IDENTITY, SEQUENCE, TABLE 등의 전략을 선택할 수 있습니다.

```java
// IDENTITY 전략 (MySQL AUTO_INCREMENT)
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

// SEQUENCE 전략 (PostgreSQL, Oracle)
@Id
@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
@SequenceGenerator(name = "user_seq", sequenceName = "user_sequence")
private Long id;

// TABLE 전략 (모든 database 지원)
@Id
@GeneratedValue(strategy = GenerationType.TABLE, generator = "user_gen")
@TableGenerator(name = "user_gen", table = "id_generator", 
                pkColumnName = "gen_name", valueColumnName = "gen_val")
private Long id;
```

- **composite primary key** : 여러 field를 조합하여 primary key를 구성하는 방식입니다.
    - `@EmbeddedId`나 `@IdClass`를 사용하여 구현할 수 있습니다.
    - composite key class는 Serializable을 구현해야 합니다.
    - `equals()`와 `hashCode()` method를 반드시 구현해야 합니다.

```java
// @EmbeddedId 방식
@Embeddable
public class OrderItemId implements Serializable {
    private Long orderId;
    private Long productId;
    
    // 기본 생성자, equals, hashCode 필수
}

@Entity
public class OrderItem {
    @EmbeddedId
    private OrderItemId id;
    
    private Integer quantity;
    private BigDecimal price;
}

// @IdClass 방식
@Entity
@IdClass(OrderItemId.class)
public class OrderItem {
    @Id
    private Long orderId;
    
    @Id
    private Long productId;
    
    private Integer quantity;
    private BigDecimal price;
}
```


### Column Mapping

- **기본 mapping** : field name과 column name이 일치하는 경우 `@Column` annotation을 생략할 수 있습니다.
    - JPA provider가 naming strategy에 따라 자동으로 mapping합니다.
    - camelCase field name은 보통 snake_case column name으로 변환됩니다.
    - 명시적인 mapping이 필요한 경우에만 `@Column`을 사용합니다.

```java
// 자동 mapping (firstName -> first_name)
private String firstName;

// 명시적 mapping
@Column(name = "last_name", nullable = false, length = 50)
private String lastName;

// unique constraint
@Column(unique = true)
private String email;

// default value (database level)
@Column(columnDefinition = "varchar(255) default 'ACTIVE'")
private String status;
```

- **특수 type mapping** : 날짜, 시간, enum 등 특수한 type의 mapping입니다.
    - `@Temporal`을 사용하여 날짜/시간 type의 정확한 mapping을 지정합니다.
    - `@Enumerated`로 enum type의 저장 방식을 결정합니다.
    - `@Lob`를 사용하여 large object를 mapping할 수 있습니다.

```java
// 날짜/시간 mapping
@Temporal(TemporalType.DATE)
private Date birthDate;

@Temporal(TemporalType.TIMESTAMP)
private Date createdAt;

// Java 8 time API (JPA 2.2+)
private LocalDate birthDate;
private LocalDateTime createdAt;

// Enum mapping
@Enumerated(EnumType.STRING)  // 권장: enum name 저장
private UserStatus status;

@Enumerated(EnumType.ORDINAL)  // 주의: enum 순서 변경 시 문제 발생
private UserType type;

// Large Object mapping
@Lob
private String description;  // CLOB

@Lob
private byte[] profileImage;  // BLOB
```

- **transient field** : database에 저장하지 않을 field를 지정합니다.
    - `@Transient` annotation을 사용하거나 static, final field로 선언합니다.
    - 계산된 값이나 temporary data를 저장할 때 사용합니다.
    - getter method에만 `@Transient`를 적용하여 derived property를 만들 수도 있습니다.

```java
@Transient
private String temporaryData;

// 계산된 property
@Transient
public String getFullName() {
    return firstName + " " + lastName;
}

// static field는 자동으로 transient
private static final String CONSTANT_VALUE = "CONSTANT";
```


### 연관 관계 Mapping

- **@OneToOne 관계** : 일대일 관계를 나타내는 mapping입니다.
    - 주로 primary key를 공유하거나 unique foreign key를 사용합니다.
    - `@JoinColumn`으로 foreign key column을 명시적으로 지정할 수 있습니다.
    - bidirectional 관계에서는 `mappedBy` 속성으로 관계의 주인을 결정합니다.

```java
// 단방향 OneToOne
@Entity
public class User {
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_id")
    private UserProfile profile;
}

// 양방향 OneToOne
@Entity
public class UserProfile {
    @Id
    private Long id;
    
    @OneToOne(mappedBy = "profile")
    private User user;
}
```

- **@OneToMany 관계** : 일대다 관계를 나타내는 mapping입니다.
    - 기본적으로 lazy loading으로 설정되어 있습니다.
    - `mappedBy` 속성으로 연관 관계의 주인을 지정합니다.
    - cascade 설정을 통해 연관 entity의 lifecycle을 관리할 수 있습니다.

```java
@Entity
public class Order {
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, 
               orphanRemoval = true, fetch = FetchType.LAZY)
    private List<OrderItem> orderItems = new ArrayList<>();
    
    // convenience method
    public void addOrderItem(OrderItem item) {
        orderItems.add(item);
        item.setOrder(this);
    }
    
    public void removeOrderItem(OrderItem item) {
        orderItems.remove(item);
        item.setOrder(null);
    }
}
```

- **@ManyToOne 관계** : 다대일 관계를 나타내는 mapping입니다.
    - 기본적으로 eager loading으로 설정되어 있습니다.
    - foreign key를 가지는 쪽이 관계의 주인이 됩니다.
    - `@JoinColumn`으로 foreign key column을 명시할 수 있습니다.

```java
@Entity
public class OrderItem {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;
}
```

- **@ManyToMany 관계** : 다대다 관계를 나타내는 mapping입니다.
    - join table을 통해 관계를 표현합니다.
    - `@JoinTable`로 join table의 구조를 정의할 수 있습니다.
    - 양방향 관계에서는 한쪽을 관계의 주인으로 지정해야 합니다.

```java
@Entity
public class Student {
    @ManyToMany
    @JoinTable(
        name = "student_course",
        joinColumns = @JoinColumn(name = "student_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private Set<Course> courses = new HashSet<>();
}

@Entity
public class Course {
    @ManyToMany(mappedBy = "courses")
    private Set<Student> students = new HashSet<>();
}
```


---


## EntityManager 사용법

- **EntityManagerFactory 생성**을 통해 EntityManager instance를 관리합니다.
- **기본 CRUD 연산**을 EntityManager의 method로 수행합니다.
- **transaction 관리**는 data 일관성을 위해 필수적입니다.


### EntityManagerFactory와 EntityManager 생성

- **EntityManagerFactory 생성** : persistence unit 설정을 바탕으로 factory를 생성합니다.
    - `Persistence.createEntityManagerFactory()` method를 사용합니다.
    - application 전체에서 하나의 factory instance를 공유하는 것이 일반적입니다.
    - factory는 thread-safe하며, resource 집약적이므로 singleton pattern으로 관리합니다.

```java
public class JPAUtil {
    private static final EntityManagerFactory emf;
    
    static {
        try {
            emf = Persistence.createEntityManagerFactory("myPersistenceUnit");
        } catch (Throwable ex) {
            throw new ExceptionInInitializerError(ex);
        }
    }
    
    public static EntityManagerFactory getEntityManagerFactory() {
        return emf;
    }
    
    public static EntityManager getEntityManager() {
        return emf.createEntityManager();
    }
    
    public static void close() {
        if (emf != null) {
            emf.close();
        }
    }
}
```

- **EntityManager 생성과 생명 주기** : factory에서 EntityManager instance를 생성합니다.
    - EntityManager는 thread-safe하지 않으므로 thread별로 별도 instance를 사용해야 합니다.
    - 사용 후에는 반드시 `close()`를 호출하여 resource를 해제해야 합니다.
    - try-with-resources 구문을 사용하여 안전한 resource 관리를 할 수 있습니다.

```java
// 기본 사용 방식
EntityManager em = JPAUtil.getEntityManager();
try {
    // database 작업 수행
} finally {
    em.close();
}

// try-with-resources 사용 (EntityManager가 AutoCloseable 구현)
try (EntityManager em = JPAUtil.getEntityManager()) {
    // database 작업 수행
}
```


### 기본 CRUD 연산

- **Create (저장)** : 새로운 entity를 database에 저장합니다.
    - `persist()` method를 사용하여 transient entity를 persistent 상태로 만듭니다.
    - primary key generation 전략에 따라 즉시 또는 transaction commit 시 INSERT가 실행됩니다.
    - cascade 설정이 있다면 연관 entity도 함께 저장됩니다.

```java
try (EntityManager em = JPAUtil.getEntityManager()) {
    EntityTransaction tx = em.getTransaction();
    tx.begin();
    
    try {
        User user = new User("john_doe", "john@example.com");
        em.persist(user);  // Persistent 상태로 전환
        
        tx.commit();  // 실제 INSERT SQL 실행
    } catch (Exception e) {
        tx.rollback();
        throw e;
    }
}
```

- **Read (조회)** : primary key나 query를 통해 entity를 조회합니다.
    - `find()` method로 primary key를 사용한 단일 entity 조회가 가능합니다.
    - `createQuery()` method로 JPQL을 사용한 복잡한 조회가 가능합니다.
    - lazy loading 설정에 따라 연관 entity의 loading 시점이 결정됩니다.

```java
try (EntityManager em = JPAUtil.getEntityManager()) {
    // Primary key로 조회
    User user = em.find(User.class, 1L);
    if (user != null) {
        System.out.println(user.getUsername());
    }
    
    // JPQL로 조회
    List<User> users = em.createQuery(
        "SELECT u FROM User u WHERE u.email LIKE :domain", User.class)
        .setParameter("domain", "%@example.com")
        .getResultList();
    
    // 단일 결과 조회
    User singleUser = em.createQuery(
        "SELECT u FROM User u WHERE u.username = :username", User.class)
        .setParameter("username", "john_doe")
        .getSingleResult();
}
```

- **Update (수정)** : persistent entity의 변경 사항을 database에 반영합니다.
    - dirty checking에 의해 자동으로 UPDATE SQL이 생성됩니다.
    - 명시적인 update method 호출이 필요하지 않습니다.
    - detached entity는 `merge()` method를 통해 다시 persistent 상태로 만든 후 수정해야 합니다.

```java
try (EntityManager em = JPAUtil.getEntityManager()) {
    EntityTransaction tx = em.getTransaction();
    tx.begin();
    
    try {
        User user = em.find(User.class, 1L);
        user.setEmail("newemail@example.com");  // dirty checking으로 자동 UPDATE
        
        tx.commit();  // UPDATE SQL 실행
    } catch (Exception e) {
        tx.rollback();
        throw e;
    }
}
```

- **Delete (삭제)** : entity를 database에서 제거합니다.
    - `remove()` method를 사용하여 persistent entity를 removed 상태로 만듭니다.
    - cascade 설정에 따라 연관 entity도 함께 삭제될 수 있습니다.
    - foreign key 제약 조건을 고려하여 삭제 순서를 결정해야 합니다.

```java
try (EntityManager em = JPAUtil.getEntityManager()) {
    EntityTransaction tx = em.getTransaction();
    tx.begin();
    
    try {
        User user = em.find(User.class, 1L);
        if (user != null) {
            em.remove(user);  // Removed 상태로 전환
        }
        
        tx.commit();  // DELETE SQL 실행
    } catch (Exception e) {
        tx.rollback();
        throw e;
    }
}
```


### Transaction 관리

- **RESOURCE_LOCAL transaction** : application이 직접 관리하는 transaction입니다.
    - EntityTransaction을 통해 programmatic하게 transaction을 제어합니다.
    - `begin()`, `commit()`, `rollback()` method를 명시적으로 호출해야 합니다.
    - exception 발생 시 반드시 rollback을 수행해야 data 일관성을 보장할 수 있습니다.

```java
EntityManager em = JPAUtil.getEntityManager();
EntityTransaction tx = em.getTransaction();

try {
    tx.begin();
    
    // business logic
    User user = new User("alice", "alice@example.com");
    em.persist(user);
    
    // 다른 작업들도 같은 transaction 내에서 수행
    Order order = new Order(user);
    em.persist(order);
    
    tx.commit();
} catch (Exception e) {
    if (tx.isActive()) {
        tx.rollback();
    }
    throw e;
} finally {
    em.close();
}
```

- **transaction template pattern** : 반복적인 transaction 코드를 줄이기 위한 pattern입니다.
    - functional interface를 활용하여 깔끔한 transaction 관리가 가능합니다.
    - exception handling과 resource 관리를 template에서 담당합니다.
    - Spring의 TransactionTemplate과 유사한 개념입니다.

```java
public class TransactionTemplate {
    
    public static <T> T execute(Function<EntityManager, T> operation) {
        EntityManager em = JPAUtil.getEntityManager();
        EntityTransaction tx = em.getTransaction();
        
        try {
            tx.begin();
            T result = operation.apply(em);
            tx.commit();
            return result;
        } catch (Exception e) {
            if (tx.isActive()) {
                tx.rollback();
            }
            throw new RuntimeException(e);
        } finally {
            em.close();
        }
    }
    
    public static void execute(Consumer<EntityManager> operation) {
        execute(em -> {
            operation.accept(em);
            return null;
        });
    }
}

// 사용 예제
TransactionTemplate.execute(em -> {
    User user = new User("bob", "bob@example.com");
    em.persist(user);
});

User foundUser = TransactionTemplate.execute(em -> 
    em.find(User.class, 1L)
);
```


### JPQL Query 실행

- **기본 JPQL query** : entity 기반의 객체 지향 query language입니다.
    - table이 아닌 entity와 property를 대상으로 query를 작성합니다.
    - SQL과 유사한 문법을 가지지만 database vendor에 독립적입니다.
    - parameter binding을 통해 SQL injection을 방지할 수 있습니다.

```java
try (EntityManager em = JPAUtil.getEntityManager()) {
    // 기본 SELECT query
    List<User> users = em.createQuery(
        "SELECT u FROM User u WHERE u.createdAt > :date", User.class)
        .setParameter("date", lastWeek)
        .getResultList();
    
    // JOIN query
    List<User> activeUsers = em.createQuery(
        "SELECT DISTINCT u FROM User u " +
        "JOIN u.orders o " +
        "WHERE o.status = :status", User.class)
        .setParameter("status", OrderStatus.ACTIVE)
        .getResultList();
    
    // Aggregate function
    Long userCount = em.createQuery(
        "SELECT COUNT(u) FROM User u WHERE u.email LIKE :domain", Long.class)
        .setParameter("domain", "%@company.com")
        .getSingleResult();
}
```

- **named query** : 미리 정의된 query를 재사용하는 방식입니다.
    - entity class에 `@NamedQuery` annotation으로 query를 정의합니다.
    - compile time에 query syntax 검증이 가능합니다.
    - 자주 사용되는 query를 중앙에서 관리할 수 있습니다.

```java
@Entity
@NamedQueries({
    @NamedQuery(
        name = "User.findByEmail",
        query = "SELECT u FROM User u WHERE u.email = :email"
    ),
    @NamedQuery(
        name = "User.findActiveUsers",
        query = "SELECT u FROM User u WHERE u.status = 'ACTIVE' ORDER BY u.createdAt DESC"
    )
})
public class User {
    // entity fields...
}

// named query 사용
User user = em.createNamedQuery("User.findByEmail", User.class)
    .setParameter("email", "john@example.com")
    .getSingleResult();

List<User> activeUsers = em.createNamedQuery("User.findActiveUsers", User.class)
    .getResultList();
```

- **native query** : database 고유의 SQL을 직접 사용하는 방식입니다.
    - JPQL로 표현하기 어려운 복잡한 query에 사용합니다.
    - database specific한 function이나 feature를 활용할 수 있습니다.
    - portability가 떨어지므로 필요한 경우에만 사용해야 합니다.

```java
// Native SQL query
List<User> users = em.createNativeQuery(
    "SELECT * FROM users WHERE created_at > DATE_SUB(NOW(), INTERVAL 7 DAY)", 
    User.class)
    .getResultList();

// Scalar 결과 조회
List<Object[]> results = em.createNativeQuery(
    "SELECT u.username, COUNT(o.id) as order_count " +
    "FROM users u LEFT JOIN orders o ON u.id = o.user_id " +
    "GROUP BY u.id, u.username")
    .getResultList();

for (Object[] row : results) {
    String username = (String) row[0];
    BigInteger orderCount = (BigInteger) row[1];
    System.out.println(username + ": " + orderCount + " orders");
}
```


---


## DAO Pattern 구현

- **Data Access Object pattern**을 통해 database 접근 logic을 분리합니다.
- **generic DAO**를 구현하여 공통적인 CRUD 기능을 재사용합니다.
- **custom query method**를 추가하여 business requirement에 맞는 data access를 제공합니다.


### Generic DAO 구현

- **추상 DAO class** : 모든 entity에 공통적으로 적용되는 CRUD 기능을 제공합니다.
    - Generic type을 사용하여 type safety를 보장합니다.
    - 기본적인 CRUD 연산을 template method로 구현합니다.
    - 하위 class에서 entity specific logic을 추가할 수 있습니다.

```java
public abstract class GenericDAO<T, ID> {
    
    protected final Class<T> entityClass;
    
    @SuppressWarnings("unchecked")
    protected GenericDAO() {
        this.entityClass = (Class<T>) ((ParameterizedType) getClass()
            .getGenericSuperclass()).getActualTypeArguments()[0];
    }
    
    protected EntityManager getEntityManager() {
        return JPAUtil.getEntityManager();
    }
    
    public void save(T entity) {
        TransactionTemplate.execute(em -> em.persist(entity));
    }
    
    public T findById(ID id) {
        try (EntityManager em = getEntityManager()) {
            return em.find(entityClass, id);
        }
    }
    
    public List<T> findAll() {
        try (EntityManager em = getEntityManager()) {
            return em.createQuery("SELECT e FROM " + entityClass.getSimpleName() + " e", entityClass)
                    .getResultList();
        }
    }
    
    public T update(T entity) {
        return TransactionTemplate.execute(em -> em.merge(entity));
    }
    
    public void delete(T entity) {
        TransactionTemplate.execute(em -> {
            T managedEntity = em.merge(entity);
            em.remove(managedEntity);
        });
    }
    
    public void deleteById(ID id) {
        TransactionTemplate.execute(em -> {
            T entity = em.find(entityClass, id);
            if (entity != null) {
                em.remove(entity);
            }
        });
    }
    
    public long count() {
        try (EntityManager em = getEntityManager()) {
            return em.createQuery("SELECT COUNT(e) FROM " + entityClass.getSimpleName() + " e", Long.class)
                    .getSingleResult();
        }
    }
}
```


### Entity별 DAO 구현

- **UserDAO 구현** : User entity에 특화된 data access 기능을 제공합니다.
    - generic DAO를 상속받아 기본 CRUD 기능을 활용합니다.
    - business requirement에 맞는 custom query method를 추가합니다.
    - 복잡한 조회 조건이나 집계 query를 encapsulation합니다.

```java
public class UserDAO extends GenericDAO<User, Long> {
    
    public Optional<User> findByUsername(String username) {
        try (EntityManager em = getEntityManager()) {
            List<User> users = em.createQuery(
                "SELECT u FROM User u WHERE u.username = :username", User.class)
                .setParameter("username", username)
                .getResultList();
            
            return users.isEmpty() ? Optional.empty() : Optional.of(users.get(0));
        }
    }
    
    public Optional<User> findByEmail(String email) {
        try (EntityManager em = getEntityManager()) {
            try {
                User user = em.createNamedQuery("User.findByEmail", User.class)
                    .setParameter("email", email)
                    .getSingleResult();
                return Optional.of(user);
            } catch (NoResultException e) {
                return Optional.empty();
            }
        }
    }
    
    public List<User> findUsersByDateRange(Date startDate, Date endDate) {
        try (EntityManager em = getEntityManager()) {
            return em.createQuery(
                "SELECT u FROM User u WHERE u.createdAt BETWEEN :start AND :end " +
                "ORDER BY u.createdAt DESC", User.class)
                .setParameter("start", startDate)
                .setParameter("end", endDate)
                .getResultList();
        }
    }
    
    public List<User> findUsersWithOrders() {
        try (EntityManager em = getEntityManager()) {
            return em.createQuery(
                "SELECT DISTINCT u FROM User u " +
                "JOIN FETCH u.orders o " +
                "ORDER BY u.username", User.class)
                .getResultList();
        }
    }
    
    public long countActiveUsers() {
        try (EntityManager em = getEntityManager()) {
            return em.createQuery(
                "SELECT COUNT(u) FROM User u WHERE u.status = :status", Long.class)
                .setParameter("status", UserStatus.ACTIVE)
                .getSingleResult();
        }
    }
    
    public List<User> findUsersPaginated(int page, int size) {
        try (EntityManager em = getEntityManager()) {
            return em.createQuery("SELECT u FROM User u ORDER BY u.id", User.class)
                .setFirstResult(page * size)
                .setMaxResults(size)
                .getResultList();
        }
    }
}
```


### Service Layer 구현

- **business logic separation** : DAO와 별도로 business logic을 처리하는 service layer를 구현합니다.
    - DAO는 순수한 data access만 담당하고, service는 business rule을 처리합니다.
    - transaction 경계를 service layer에서 관리하는 것이 일반적입니다.
    - 여러 DAO를 조합하여 복잡한 business operation을 구현할 수 있습니다.

```java
public class UserService {
    
    private final UserDAO userDAO;
    private final OrderDAO orderDAO;
    
    public UserService() {
        this.userDAO = new UserDAO();
        this.orderDAO = new OrderDAO();
    }
    
    public User registerUser(String username, String email) {
        // Business validation
        if (userDAO.findByUsername(username).isPresent()) {
            throw new IllegalArgumentException("Username already exists: " + username);
        }
        
        if (userDAO.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email already exists: " + email);
        }
        
        // Create and save user
        User user = new User(username, email);
        userDAO.save(user);
        
        return user;
    }
    
    public User updateUserEmail(Long userId, String newEmail) {
        return TransactionTemplate.execute(em -> {
            User user = userDAO.findById(userId);
            if (user == null) {
                throw new EntityNotFoundException("User not found: " + userId);
            }
            
            // Business validation
            Optional<User> existingUser = userDAO.findByEmail(newEmail);
            if (existingUser.isPresent() && !existingUser.get().getId().equals(userId)) {
                throw new IllegalArgumentException("Email already in use: " + newEmail);
            }
            
            user.setEmail(newEmail);
            return userDAO.update(user);
        });
    }
    
    public void deleteUserWithOrders(Long userId) {
        TransactionTemplate.execute(em -> {
            User user = userDAO.findById(userId);
            if (user == null) {
                throw new EntityNotFoundException("User not found: " + userId);
            }
            
            // Business logic: delete all orders first
            List<Order> userOrders = orderDAO.findByUserId(userId);
            for (Order order : userOrders) {
                orderDAO.delete(order);
            }
            
            // Then delete user
            userDAO.delete(user);
        });
    }
    
    public UserStatistics getUserStatistics(Long userId) {
        User user = userDAO.findById(userId);
        if (user == null) {
            throw new EntityNotFoundException("User not found: " + userId);
        }
        
        long orderCount = orderDAO.countByUserId(userId);
        BigDecimal totalAmount = orderDAO.getTotalAmountByUserId(userId);
        
        return new UserStatistics(user, orderCount, totalAmount);
    }
}
```


---


## Reference

- <https://docs.oracle.com/javaee/7/tutorial/persistence-basicexamples.htm>
- <https://docs.oracle.com/javaee/7/tutorial/persistence-entitymanager.htm>
- <https://hibernate.org/orm/documentation/6.0/quickstart/html_single/>
- <https://www.baeldung.com/jpa-entitymanager>

