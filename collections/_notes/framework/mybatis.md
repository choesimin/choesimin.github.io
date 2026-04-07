---
layout: note
permalink: /422
title: MyBatis - SQL을 직접 제어하는 Java Persistence Framework
description: MyBatis는 SQL을 XML이나 annotation으로 분리하여 관리하는 persistence framework로, JDBC의 반복 code를 제거하고 SQL과 Java 객체 간의 mapping을 자동화합니다.
date: 2026-04-07
---


## MyBatis

- MyBatis는 SQL mapper framework로, **SQL을 Java code에서 분리하여 XML이나 annotation으로 관리**합니다.
    - JDBC의 `Connection`, `PreparedStatement`, `ResultSet` 등의 반복적인 boilerplate code를 제거합니다.
    - SQL 실행 결과를 Java 객체로 자동 mapping합니다.

- JPA와 달리 **SQL을 직접 작성**하므로, 복잡한 query나 기존 DB schema에 맞춘 개발에 적합합니다.
    - JPA는 객체 중심으로 query를 자동 생성하지만, MyBatis는 개발자가 SQL을 완전히 제어합니다.
    - 기존 legacy system의 복잡한 query를 그대로 활용해야 할 때 유리합니다.


---


## 핵심 구성 요소

- MyBatis는 `SqlSessionFactory`, `SqlSession`, Mapper interface로 구성됩니다.


### SqlSessionFactory

- MyBatis 설정을 읽어 `SqlSession`을 생성하는 factory 객체입니다.
    - application 당 하나만 생성하여 재사용합니다.
    - Spring Boot에서는 `mybatis-spring-boot-starter`가 자동으로 구성합니다.

```yaml
mybatis:
  mapper-locations: classpath:mapper/*.xml
  type-aliases-package: com.example.domain
  configuration:
    map-underscore-to-camel-case: true
```


### SqlSession

- SQL 실행과 transaction 관리를 담당하는 핵심 객체입니다.
    - `selectOne`, `selectList`, `insert`, `update`, `delete` 등의 method로 SQL을 실행합니다.
    - Spring 환경에서는 직접 사용하지 않고, Mapper interface를 통해 간접적으로 사용합니다.


### Mapper Interface

- SQL과 Java method를 연결하는 interface입니다.
    - XML file이나 annotation에 작성된 SQL이 method와 자동으로 mapping됩니다.
    - 구현 class를 작성할 필요 없이, MyBatis가 runtime에 proxy를 생성합니다.

```java
@Mapper
public interface UserMapper {

    User findById(Long id);

    List<User> findAll();

    void insert(User user);

    void update(User user);

    void delete(Long id);
}
```

```xml
<mapper namespace="com.example.mapper.UserMapper">

    <select id="findById" resultType="User">
        SELECT user_id, user_name, email
        FROM users
        WHERE user_id = #{id}
    </select>

    <select id="findAll" resultType="User">
        SELECT user_id, user_name, email
        FROM users
    </select>

    <insert id="insert" parameterType="User">
        INSERT INTO users (user_name, email)
        VALUES (#{userName}, #{email})
    </insert>

</mapper>
```


---


## Parameter Binding : `#{}` vs `${}`

- MyBatis는 SQL에 parameter를 binding하는 두 가지 방법을 제공하며, **보안과 성능 면에서 `#{}`를 사용하는 것이 원칙**입니다.


### `#{}` (PreparedStatement)

- `PreparedStatement`의 `?` placeholder로 치환되며, 값이 안전하게 binding됩니다.
    - 들어오는 data를 문자열로 인식하여 자동으로 따옴표(`'`)가 붙습니다.
    - SQL Injection 공격을 방지합니다.
    - `PreparedStatement`가 미리 compile되어 있으므로 `${}`보다 성능이 좋습니다.

```sql
SELECT count(*) FROM users
WHERE user_id = #{id} AND user_pw = #{pw}
```

- 위 SQL은 JDBC에서 아래와 같이 실행됩니다.

```sql
SELECT count(*) FROM users
WHERE user_id = ? AND user_pw = ?
```


### `${}` (Statement)

- 값이 SQL 문자열에 **그대로 치환**됩니다.
    - 따옴표가 자동으로 붙지 않으므로, column type이 `VARCHAR`여도 숫자가 그대로 들어갑니다.
    - SQL Injection에 취약하므로 사용자 입력값에는 절대 사용하지 않습니다.

```sql
SELECT count(*) FROM users
WHERE user_id = "${id}" AND user_pw = "${pw}"
```

- table명, column명, `ORDER BY` 절처럼 `PreparedStatement`의 `?`로 대체할 수 없는 부분에만 사용합니다.

```sql
SELECT * FROM ${tableName}
ORDER BY ${columnName} ${sortDirection}
```

| 구분 | `#{}` | `${}` |
| --- | --- | --- |
| 내부 방식 | `PreparedStatement` (`?` binding) | `Statement` (문자열 치환) |
| 따옴표 | 자동 추가 | 추가되지 않음 |
| SQL Injection | 안전 | 취약 |
| 성능 | compile 재사용으로 빠름 | 매번 compile |
| 용도 | 값 binding (기본) | table명, column명, ORDER BY |


---


## Dynamic SQL

- MyBatis는 XML tag를 사용하여 **조건에 따라 SQL을 동적으로 생성**합니다.
    - 복잡한 검색 조건이나 선택적 update를 깔끔하게 처리합니다.


### `<if>`

- 조건이 참일 때만 해당 SQL 조각을 포함합니다.

```xml
<select id="findUsers" resultType="User">
    SELECT * FROM users
    WHERE 1=1
    <if test="name != null and name != ''">
        AND user_name = #{name}
    </if>
    <if test="email != null">
        AND email = #{email}
    </if>
</select>
```


### `<choose>`, `<when>`, `<otherwise>`

- Java의 `switch`문과 동일한 역할을 합니다.
    - 여러 조건 중 하나만 적용됩니다.

```xml
<select id="findUsers" resultType="User">
    SELECT * FROM users
    WHERE 1=1
    <choose>
        <when test="searchType == 'name'">
            AND user_name LIKE CONCAT('%', #{keyword}, '%')
        </when>
        <when test="searchType == 'email'">
            AND email = #{keyword}
        </when>
        <otherwise>
            AND status = 'ACTIVE'
        </otherwise>
    </choose>
</select>
```


### `<where>`

- 내부 조건이 하나라도 있으면 `WHERE` 절을 자동으로 추가하고, 불필요한 `AND`나 `OR`를 제거합니다.
    - `WHERE 1=1` 같은 workaround가 필요 없습니다.

```xml
<select id="findUsers" resultType="User">
    SELECT * FROM users
    <where>
        <if test="name != null">
            AND user_name = #{name}
        </if>
        <if test="email != null">
            AND email = #{email}
        </if>
    </where>
</select>
```


### `<set>`

- `UPDATE` 문에서 `<where>`와 유사한 역할을 합니다.
    - 마지막 쉼표(`,`)를 자동으로 제거합니다.

```xml
<update id="update" parameterType="User">
    UPDATE users
    <set>
        <if test="userName != null">user_name = #{userName},</if>
        <if test="email != null">email = #{email},</if>
    </set>
    WHERE user_id = #{userId}
</update>
```


### `<foreach>`

- collection을 순회하며 SQL을 반복 생성합니다.
    - `IN` 절이나 batch insert에 주로 사용됩니다.

```xml
<select id="findByIds" resultType="User">
    SELECT * FROM users
    WHERE user_id IN
    <foreach collection="ids" item="id" open="(" separator="," close=")">
        #{id}
    </foreach>
</select>
```

```xml
<insert id="insertBatch" parameterType="list">
    INSERT INTO users (user_name, email)
    VALUES
    <foreach collection="list" item="user" separator=",">
        (#{user.userName}, #{user.email})
    </foreach>
</insert>
```


---


## ResultMap

- SQL 결과를 Java 객체에 mapping하는 규칙을 정의합니다.
    - column명과 field명이 다르거나, 연관 관계가 있는 객체를 mapping할 때 사용합니다.
    - `map-underscore-to-camel-case` 설정으로 단순 naming 차이는 자동 변환되지만, 복잡한 구조에는 `ResultMap`이 필요합니다.

```xml
<resultMap id="userResultMap" type="User">
    <id property="userId" column="user_id"/>
    <result property="userName" column="user_name"/>
    <result property="email" column="email"/>
</resultMap>

<select id="findById" resultMap="userResultMap">
    SELECT user_id, user_name, email
    FROM users
    WHERE user_id = #{id}
</select>
```


### 연관 관계 Mapping

- `<association>`은 1:1 관계, `<collection>`은 1:N 관계를 mapping합니다.

```xml
<resultMap id="userWithOrdersMap" type="User">
    <id property="userId" column="user_id"/>
    <result property="userName" column="user_name"/>
    <association property="department" javaType="Department">
        <id property="deptId" column="dept_id"/>
        <result property="deptName" column="dept_name"/>
    </association>
    <collection property="orders" ofType="Order">
        <id property="orderId" column="order_id"/>
        <result property="amount" column="amount"/>
    </collection>
</resultMap>
```


---


## TypeAlias

- Java class의 fully qualified name 대신 짧은 별칭을 사용합니다.
    - `resultType`이나 `parameterType`에 매번 긴 package 경로를 작성하지 않아도 됩니다.

```yaml
mybatis:
  type-aliases-package: com.example.domain
```

- 위 설정으로 `com.example.domain.User`를 `User`로 축약하여 사용합니다.

| 설정 전 | 설정 후 |
| --- | --- |
| `resultType="com.example.domain.User"` | `resultType="User"` |


---


## Reference

- <https://mybatis.org/mybatis-3/>
- <https://mybatis.org/spring-boot-starter/mybatis-spring-boot-autoconfigure/>

