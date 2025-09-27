---
layout: note
permalink: /378
title: ORM - 객체와 Data를 연결해주는 다리
description: ORM(Object-Relational Mapping)은 객체 지향 programming 언어를 사용해 database의 data를 조작할 수 있도록 해주는 programming 기법입니다.
date: 2025-09-27
---


## ORM (Object-Relational Mapping)

- ORM은 **객체 지향 programming 언어**와 **관계형 database** 사이의 data 변환을 자동화하는 programming 기법입니다.
- 개발자가 SQL을 직접 작성하지 않고도 객체를 통해 database 작업을 수행할 수 있게 해줍니다.
- 현재 대부분의 programming 언어에서 ORM tool이 제공되며, web application 개발의 표준적인 접근 방식이 되었습니다.


---


## ORM 등장 배경

- software 개발에서 **객체 지향 programming**과 **관계형 database** 사이에는 근본적인 **paradigm 불일치**가 존재합니다.
- 전통적인 database 접근 방식은 개발자에게 많은 반복 작업과 복잡성을 요구했습니다.
- ORM은 이러한 문제점들을 해결하기 위해 등장한 기술입니다.


### 객체와 관계형 Database의 Paradigm 불일치

- **상속 관계** : 객체 지향에서는 class 간 상속이 자연스럽지만, 관계형 database에는 상속 개념이 없습니다.
    - 객체의 상속 구조를 table로 표현하려면 복잡한 설계가 필요합니다.
    - 여러 table에 분산된 data를 하나의 객체로 조합하는 작업이 번거롭습니다.

- **연관 관계** : 객체는 참조를 통해 다른 객체와 연결되지만, table은 외래(foreign) key를 사용합니다.
    - 객체의 참조 관계와 table의 join 관계는 표현 방식이 다릅니다.
    - 양방향 연관 관계를 구현할 때 data 일관성 유지가 어렵습니다.

- **data type 차이** : programming 언어의 data type과 database의 data type이 완전히 일치하지 않습니다.
    - 날짜, 시간, 문자열 처리 방식의 차이가 존재합니다.
    - null 처리 방식도 언어마다 다르게 구현됩니다.

- **identity 관리** : 객체는 참조 동일성과 값 동일성을 구분하지만, database는 primary key로만 식별합니다.
    - 같은 data를 가진 여러 객체 instance가 존재할 수 있습니다.
    - database에서 조회한 동일한 record가 다른 객체로 생성될 수 있습니다.


### 전통적인 Database 접근 방식의 문제점

- **반복적인 CRUD code 작성** : 기본적인 생성, 조회, 수정, 삭제 작업을 위해 비슷한 SQL문을 반복해서 작성해야 합니다.
    - table마다 거의 동일한 pattern의 SQL문이 필요합니다.
    - code 중복이 심하고 유지 보수가 어렵습니다.

- **SQL injection 보안 위험** : 동적 SQL 생성 시 보안 취약점이 발생할 수 있습니다.
    - 사용자 입력값을 직접 SQL에 연결하면 악의적인 공격에 노출됩니다.
    - parameter binding을 수동으로 처리해야 하는 번거로움이 있습니다.

- **database 종속성** : 특정 database에 종속적인 SQL을 사용하면 이식성이 떨어집니다.
    - MySQL, PostgreSQL, Oracle 등 database마다 SQL 방언이 다릅니다.
        - SQL 방언(dialect) : 각 database vender가 제공하는 고유한 SQL 문법과 기능 차이.
    - database 변경 시 많은 code 수정이 필요합니다.

- **복잡한 mapping logic** : database 결과를 객체로 변환하는 작업이 복잡하고 오류가 발생하기 쉽습니다.
    - ResultSet에서 data를 추출하여 객체에 설정하는 boilerplate code가 많습니다.
    - type 변환과 null 처리를 수동으로 해야 합니다.


---


## ORM의 동작 원리

- ORM은 **metadata 기반 mapping**을 통해 객체와 table 간의 대응 관계를 정의합니다.
- **자동 SQL 생성** 기능으로 개발자가 직접 SQL을 작성할 필요를 없애줍니다.
- **lazy loading**과 **caching** 같은 성능 최적화 기법을 자동으로 적용합니다.


### Metadata 기반 Mapping

- **annotation 방식** : code 내에서 직접 mapping 정보를 정의하는 방법입니다.
    - class와 field에 annotation을 추가하여 table과 column 정보를 지정합니다.
    - code와 mapping 정보가 함께 위치하여 가독성이 좋습니다.

- **설정 file 방식** : 별도의 XML이나 YAML file에서 mapping 정보를 관리하는 방법입니다.
    - code와 mapping 정보를 분리하여 관리할 수 있습니다.
    - 복잡한 mapping 규칙을 상세하게 정의할 수 있습니다.

- **convention over configuration** : 명명 규칙을 통해 자동으로 mapping을 유추하는 방법입니다.
    - class 이름과 table 이름, field 이름과 column 이름을 자동으로 연결합니다.
    - 별도 설정 없이도 기본적인 mapping이 가능합니다.


### 자동 SQL 생성

- **기본 CRUD 연산** : 객체의 생성, 조회, 수정, 삭제를 위한 SQL을 자동으로 생성합니다.
    - INSERT, SELECT, UPDATE, DELETE 문을 개발자가 작성할 필요가 없습니다.
    - parameter binding과 type 변환도 자동으로 처리됩니다.

- **복잡한 query 지원** : 객체 간 연관 관계를 고려한 JOIN query를 자동으로 생성합니다.
    - 연관된 객체를 함께 조회하는 fetch join을 자동으로 구성합니다.
    - 조건에 따른 동적 query 생성도 지원합니다.

- **database 방언 추상화** : 각 database의 고유한 SQL 문법을 추상화하여 처리합니다.
    - 동일한 객체 조작 code로 다양한 database에서 작동합니다.
    - pagination, limit 절 등의 database별 차이점을 자동으로 처리합니다.


### 성능 최적화 기법

- **lazy loading** : 필요한 시점에 data를 loading하여 초기 성능을 향상시킵니다.
    - 연관된 객체는 실제 접근할 때까지 database에서 조회하지 않습니다.
    - memory 사용량을 줄이고 불필요한 database 접근을 방지합니다.

- **caching** : 자주 사용되는 data를 memory에 저장하여 database 접근을 줄입니다.
    - 1차 cache를 통해 같은 transaction 내에서 동일한 entity를 재사용합니다.
    - 2차 cache를 통해 여러 transaction 간에 data를 공유합니다.

- **batch 처리** : 여러 database 연산을 묶어서 처리하여 network overhead를 줄입니다.
    - 여러 INSERT나 UPDATE를 한 번에 실행합니다.
    - database round trip 횟수를 최소화합니다.


---


## ORM의 장점

- ORM을 사용하면 **개발 생산성**이 크게 향상되고, **code 품질**과 **유지 보수성**이 개선됩니다.
- **보안**과 **이식성** 측면에서도 상당한 이점을 제공합니다.
- **성능 최적화** 기능을 통해 효율적인 database 접근이 가능합니다.


### 개발 생산성 향상

- **boilerplate code 감소** : 반복적인 SQL 작성과 결과 mapping code가 대폭 줄어듭니다.
    - 기본적인 CRUD 작업을 위한 code를 거의 작성하지 않아도 됩니다.
    - business logic에 더 집중할 수 있는 시간이 확보됩니다.

- **객체 지향적 접근** : database 작업을 객체 조작처럼 자연스럽게 수행할 수 있습니다.
    - SQL 문법을 모르는 개발자도 쉽게 database 작업을 할 수 있습니다.
    - domain model과 database schema 간의 gap이 줄어듭니다.

- **자동 code 생성** : 많은 ORM tool에서 기본적인 CRUD 기능을 자동으로 생성해줍니다.
    - repository pattern이나 DAO pattern을 자동으로 구현합니다.
    - 표준적인 database 접근 interface를 일관되게 제공합니다.


### Code 품질 및 유지 보수성 개선

- **type 안전성** : compile time에 type 오류를 검출할 수 있습니다.
    - 잘못된 field 접근이나 type 불일치를 미리 발견합니다.
    - IDE의 자동 완성과 refactoring 기능을 활용할 수 있습니다.

- **code 재사용성** : 공통적인 database 접근 pattern을 재사용할 수 있습니다.
    - 비슷한 entity에 대해 동일한 접근 방식을 적용합니다.
    - 상속(inheritance)과 합성(composition)을 활용한 code 구조화가 가능합니다.

- **test 용이성** : mock 객체를 활용한 unit test가 쉬워집니다.
    - database에 의존하지 않는 독립적인 test 작성이 가능합니다.
    - test data 준비와 정리 작업이 간소화됩니다.


### 보안 강화

- **SQL injection 방지** : parameter binding을 자동으로 처리하여 보안 취약점을 원천 차단합니다.
    - 사용자 입력값이 SQL 문법으로 해석되는 것을 방지합니다.
    - prepared statement를 일관되게 사용합니다.

- **access 권한 관리** : 객체 level에서 접근 권한을 제어할 수 있습니다.
    - field level security를 통해 민감한 정보를 보호합니다.
    - role 기반 접근 제어를 쉽게 구현할 수 있습니다.


### Database 이식성

- **vendor 독립성** : 특정 database에 종속되지 않는 code 작성이 가능합니다.
    - MySQL에서 PostgreSQL로 변경하더라도 application code는 거의 수정하지 않아도 됩니다.
    - database별 SQL 방언 차이를 ORM이 자동으로 처리합니다.

- **schema 변경 대응** : database schema 변경 시 mapping 정보만 수정하면 됩니다.
    - table이나 column 이름 변경에 대한 영향도를 최소화합니다.
    - migration tool과 연동하여 schema 변경을 체계적으로 관리할 수 있습니다.


---


## ORM의 단점

- ORM 사용 시 **성능 overhead**와 **학습 비용** 문제가 발생할 수 있습니다.
- **복잡한 query**나 **세밀한 제어**가 필요한 경우 한계가 있습니다.
- ORM의 **추상화로 인한 문제점**들도 고려해야 합니다.


### 성능 Overhead

- **자동 생성되는 SQL의 비효율성** : ORM이 생성하는 SQL이 항상 최적화되지는 않습니다.
    - 불필요한 column을 조회하거나 비효율적인 JOIN을 생성할 수 있습니다.
    - 개발자가 의도하지 않은 추가적인 query가 실행될 수 있습니다.

- **N+1 query 문제** : 연관된 entity를 조회할 때 예상보다 많은 query가 실행됩니다.
    - 하나의 query로 조회한 결과에 대해 각각 추가 query가 발생합니다.
    - lazy loading 설정 시 특히 주의해야 할 문제입니다.

- **memory 사용량 증가** : 객체 mapping과 caching으로 인해 memory 사용량이 늘어납니다.
    - entity 객체와 metadata 정보가 추가적인 memory를 차지합니다.
    - 대량의 data 처리 시 memory 부족 현상이 발생할 수 있습니다.


### 학습 비용과 복잡성

- **ORM tool 학습 필요** : 각 ORM tool의 고유한 기능과 설정 방법을 익혀야 합니다.
    - annotation, 설정 file, query 언어 등 다양한 개념을 이해해야 합니다.
    - debugging과 troubleshooting에 필요한 전문 지식이 요구됩니다.

- **magic 동작의 이해 어려움** : ORM이 내부적으로 수행하는 작업을 이해하기 어렵습니다.
    - 언제, 어떤 SQL이 실행되는지 예측하기 어려울 수 있습니다.
    - 예상치 못한 동작으로 인한 bug가 발생할 수 있습니다.

- **설정과 tuning의 복잡성** : 성능 최적화를 위해서는 많은 설정과 tuning이 필요합니다.
    - cache 전략, lazy loading 설정, batch size 조정 등 고려할 요소가 많습니다.
    - 잘못된 설정으로 인해 오히려 성능이 저하될 수 있습니다.


### 제한적인 Query 지원

- **복잡한 query 한계** : 매우 복잡한 business logic이 포함된 query는 ORM으로 표현하기 어렵습니다.
    - 통계나 집계 함수가 많이 사용되는 report 성격의 query는 native SQL이 더 적합합니다.
    - database 고유의 고급 기능을 활용하기 어려울 수 있습니다.

- **성능이 중요한 query** : 대용량 data 처리나 실시간 응답이 필요한 경우 ORM보다 native SQL이 유리합니다.
    - 정확한 execution plan 제어가 어려울 수 있습니다.
    - database의 특화된 최적화 기법을 적용하기 어렵습니다.


### 추상화로 인한 문제점

- **database 지식 부족** : ORM에만 의존하면 database와 SQL에 대한 이해가 부족해질 수 있습니다.
    - 성능 문제 발생 시 원인 분석과 해결이 어려워집니다.
    - database의 장점을 충분히 활용하지 못할 수 있습니다.

- **vendor lock-in** : 특정 ORM tool에 종속되어 다른 tool로 migration이 어려울 수 있습니다.
    - ORM별 고유 기능을 사용하면 이식성이 떨어집니다.
    - tool 변경 시 상당한 code 수정이 필요할 수 있습니다.


---


## 언어별 주요 ORM 생태계

- 각 programming 언어마다 고유한 ORM 생태계가 형성되어 있습니다.
- 언어의 특성과 철학을 반영한 다양한 ORM tool들이 개발되었습니다.
- 대부분의 modern web framework에서는 ORM이 표준적인 database 접근 방법으로 채택되었습니다.


### Java 생태계

- **Hibernate** : 가장 널리 사용되는 Java ORM이며, JPA(Java Persistence API) 표준의 대표적인 구현체입니다.
    - 강력한 caching 기능과 다양한 mapping 전략을 제공합니다.
    - Spring framework와의 뛰어난 통합성을 보여줍니다.

- **EclipseLink** : Eclipse 재단에서 개발한 JPA 구현체로, Oracle에서 공식 지원합니다.
    - 복잡한 object-relational mapping을 지원합니다.
    - NoSQL database와의 통합 기능도 제공합니다.

- **MyBatis** : SQL mapper framework로, ORM과는 다른 접근 방식을 취합니다.
    - 개발자가 직접 SQL을 작성하되, 결과 mapping을 자동화합니다.
    - 복잡한 query나 stored procedure 사용 시 유리합니다.


### .NET 생태계

- **Entity Framework** : Microsoft에서 개발한 .NET용 ORM으로, .NET 생태계의 표준입니다.
    - Code First, Database First, Model First 등 다양한 개발 접근 방식을 지원합니다.
    - LINQ를 활용한 강력한 type-safe query 기능을 제공합니다.

- **Dapper** : lightweight micro-ORM으로, 성능에 중점을 둔 tool입니다.
    - 빠른 속도와 낮은 memory 사용량이 특징입니다.
    - SQL을 직접 작성하되 객체 mapping만 자동화합니다.


### Python 생태계

- **SQLAlchemy** : Python의 대표적인 ORM으로, 매우 유연하고 강력한 기능을 제공합니다.
    - Core와 ORM 두 가지 level의 API를 제공합니다.
    - 복잡한 database schema와 고급 query를 지원합니다.

- **Django ORM** : Django web framework에 내장된 ORM입니다.
    - 간단하고 직관적인 API로 빠른 개발이 가능합니다.
    - Django의 철학인 "convention over configuration"을 잘 반영합니다.

- **Peewee** : 가벼운 Python ORM으로, 작은 project에 적합합니다.
    - 간결한 API와 낮은 학습 비용이 장점입니다.
    - SQLite, MySQL, PostgreSQL을 지원합니다.


### JavaScript/Node.js 생태계

- **Sequelize** : Node.js에서 가장 인기 있는 ORM 중 하나입니다.
    - Promise 기반의 비동기 API를 제공합니다.
    - migration과 validation 기능이 내장되어 있습니다.

- **TypeORM** : TypeScript와 완벽하게 통합된 ORM입니다.
    - decorator 기반의 entity 정의 방식을 사용합니다.
    - Active Record와 Data Mapper pattern을 모두 지원합니다.

- **Prisma** : type-safe database client를 자동 생성하는 next-generation ORM입니다.
    - schema 파일에서 TypeScript type을 자동 생성합니다.
    - 뛰어난 developer experience와 성능을 제공합니다.


### Ruby 생태계

- **Active Record** : Ruby on Rails framework의 핵심 component입니다.
    - "convention over configuration" 철학을 바탕으로 한 간결한 API를 제공합니다.
    - Rails의 다른 component들과 긴밀하게 통합되어 있습니다.

- **Sequel** : Ruby의 강력한 database toolkit입니다.
    - 다양한 database를 지원하며 고급 query 기능을 제공합니다.
    - thread-safe하고 성능이 우수합니다.


### 기타 언어들

- **Go** : GORM이 가장 인기 있는 ORM이며, 간결한 API와 높은 성능을 제공합니다.
- **PHP** : Laravel의 Eloquent ORM과 Doctrine ORM이 널리 사용됩니다.
- **C++** : ODB와 같은 ORM이 있지만, 상대적으로 사용 빈도가 낮습니다.
- **Rust** : Diesel이 대표적인 ORM이며, compile-time safety에 중점을 둡니다.


---


## ORM 사용 고려 사항

- ORM 도입 전에 **project 특성**과 **team 역량**을 신중히 평가해야 합니다.
- **적절한 사용 scenario**를 파악하고, **성능 최적화** 방안을 미리 계획해야 합니다.
- ORM의 한계를 인식하고 **대안 기술**과의 조합 사용도 고려해야 합니다.


### Project 특성에 따른 선택

- **CRUD 중심의 application** : ORM이 가장 효과적인 영역입니다.
    - 기본적인 business logic 처리와 data 관리가 주요 기능인 경우 적합합니다.
    - web application, CMS, ERP system 등에서 높은 생산성을 제공합니다.

- **복잡한 분석과 reporting** : native SQL이나 SQL mapper가 더 적합할 수 있습니다.
    - 복잡한 집계 함수나 window function이 필요한 경우 ORM으로는 한계가 있습니다.
    - 대용량 data processing이나 batch job에서는 성능상 불리할 수 있습니다.

- **실시간 고성능 처리** : ORM의 overhead가 부담스러울 수 있습니다.
    - millisecond 단위의 응답 시간이 중요한 system에서는 신중히 검토해야 합니다.
    - memory 사용량과 garbage collection에 민감한 application에서는 주의가 필요합니다.


### Team 역량 고려

- **database 전문성** : team의 SQL과 database 지식 수준을 고려해야 합니다.
    - database 전문가가 있다면 native SQL과 ORM을 적절히 혼용할 수 있습니다.
    - database 경험이 부족한 team이라면 ORM의 도입 효과가 클 수 있습니다.

- **개발 일정과 학습 비용** : ORM 학습에 필요한 시간과 project 일정의 균형을 맞춰야 합니다.
    - 단기 project에서는 team이 익숙한 기술을 사용하는 것이 유리합니다.
    - 장기 project라면 ORM 학습 비용을 감안하더라도 도입할 가치가 있습니다.


### 성능 최적화 전략

- **lazy loading 전략** : 연관 entity의 loading 시점을 적절히 제어해야 합니다.
    - 필요한 data만 loading하되, N+1 query 문제를 방지해야 합니다.
    - fetch join이나 batch loading을 활용한 최적화가 필요합니다.

- **caching 활용** : 1차 cache와 2차 cache를 적절히 활용해야 합니다.
    - 자주 조회되는 data에 대해서는 cache를 적극 활용합니다.
    - cache invalidation 전략도 함께 수립해야 합니다.

- **batch 처리** : 대량 data 처리 시에는 batch 기능을 활용해야 합니다.
    - bulk insert, update, delete 기능을 사용하여 성능을 개선합니다.
    - transaction 단위를 적절히 조절하여 lock 시간을 최소화합니다.


### 대안 기술과의 조합

- **SQL mapper와의 병행** : 복잡한 query는 MyBatis나 jOOQ 같은 SQL mapper를 활용합니다.
    - ORM으로 기본 CRUD를 처리하고, 복잡한 조회는 SQL mapper를 사용합니다.
    - 각 도구의 장점을 살려 hybrid 접근 방식을 취할 수 있습니다.

- **native query 활용** : ORM 내에서도 필요시 native SQL을 직접 사용할 수 있습니다.
    - 성능이 중요한 query나 database 특화 기능 사용 시 활용합니다.
    - stored procedure 호출이나 complex query 실행에 유용합니다.

- **NoSQL과의 조합** : 관계형 database의 한계를 NoSQL로 보완할 수 있습니다.
    - CQRS pattern을 활용하여 읽기와 쓰기를 분리할 수 있습니다.
    - 대용량 data나 비정형 data는 NoSQL에 저장하고 ORM으로 관리할 수 있습니다.


---


## Reference

- <https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping>
- <https://martinfowler.com/bliki/OrmHate.html>

