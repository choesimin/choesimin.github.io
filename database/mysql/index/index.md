# Index

- index는 table의 동작 속도(조회)를 높여주는 자료구조
    - data의 위치를 빠르게 찾아주는 역할
    - 책 뒷편의 '색인'과 동일한 역할
        - '홍길동'이라는 단어를 찾고싶으면 색인 page에서 '홍'으로 시작하거나 'ㅎ'으로 시작하는 색인을 찾아보면 빠르게 찾을 수 있음

- index는 MYI(MySQL Index) file에 저장되며, index가 설정되지 않았다면 Table Full Scan이 일어나 성능이 저하되거나 치명적인 장애가 발생함
- 조회 속도는 빨라지지만 UPDATE, INSERT, DELETE의 속도는 저하됨 (table의 index 색인 정보를 갱신하는 추가적인 비용이 소요됨)
    - 효율적인 index 설계로 단점을 보완해야 함

- index는 하나 혹은 여러 개의 column에 대해 설정할 수 있음
    - 단일 여러 개 또는 여러 column을 묶어 복합 index 설정
    - WHERE절을 사용하지 않고 index가 걸린 column을 조회하는 것은 성능에 아무런 영향이 없음




# ORDER BY와 GROUP BY에 대한 index

- INDEX는 ORDER BY와 GROUP BY에도 영향을 끼치는데 다음과 같은 경우에는 INDEX를 타지 않음
    - ORDER BY indexcolumn1, column2 : 복수의 key에 대해서 ORDER BY를 사용한 경우
    - WHERE column1='값' ORDER BY index column : 연속하지 않은 column에 대해 ORDER BY를 실행한 경우
    - ORDER BY indexcolumn1 DESC, indexcolumn2 ASC : DESC와 ASC를 혼합해서 사용한 경우
    - GROUP BY column1 ORDER BY column2 : GROUP BY와 ORDER BY의 column이 다른 경우
    - ORDER BY ABS(column) : ORDER BY 절에 다른 표현을 사용한 경우
 

- 다중 column index
다중 column index는 두개 이상의 필드를 조합해서 생성한 INDEX이다. 1번째 조건과 이를 만족하는 2번째 조건을 함께 INDEX해서 사용한다. (MySQL은 INDEX에 최대 15개 column으로 구성 가능)

다중 column index는 단일 column index 보다 더 비효율적으로 INDEX/UPDATE/DELETE를 수행하기 때문에 신중해야한다.

때문에 가급적 UPDATE가 안되는 값을 선정해야한다.

 

단일index와 다중 column index의 차이점
Table1(단일 index)

CREATE TABLE table1(
    uid INT(11) NOT NULL auto_increment,
    id VARCHAR(20) NOT NULL,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(100) NOT NULL,
    PRIMARY KEY('uid'),
    key idx_name(name),
    key idx_address(address)
)

Table2(다중 column index)

CREATE TABLE table2(
    uid INT(11) NOT NULL auto_increment,
    id VARCHAR(20) NOT NULL,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(100) NOT NULL,
    PRIMARY KEY('uid'),
    key idx_name(name, address)    
)



QUREY문

SELECT * FROM table1 WHERE name='홍길동' AND address='경기도';
table1의 경우에 각각 column(name),(address)에 INDEX가 걸려있기 때문에 MySQL은 namecolumn과 addresscolumn을 보고 둘 중에 어떤 column의 수가 더 빠르게 검색되는지 판단 후 빠른쪽을 먼저 검색하고 그 다음 다른 column을 검색하게 된다.

table2의 경우 바로 원하는 값을 찾는데 그 이유는 INDEX를 저장할 때 name과 address를 같이 저장하기 때문이다. 즉, name과 address의 값을 같이 색인하고 검색에서도 '홍길동경기도'로 검색을 시도하게 된다. 이렇게 사용할 경우 table1보다 table2의 경우가 더 빠른 검색을 할 수 있다.

그렇지만 다중 column index를 아래와 같이 사용하면 INDEX를 타지 않는다.

SELECT * FROM table2 WHERE address='경기도';
이 경우에는 다중 column index로 설정되어 있던 name이 함께 검색이 되지 않으므로 INDEX의 효과를 볼 수가 없다.

하지만 조건값을 name='홍길동'으로 준다면 B*Tree 자료구조 탐색으로 인해 namecolumn은 index가 적용된다. 예를들어 key idx_name(name, address, age) 일때 WHERE name = ? AND address = ? 는 index가 적용되지만 WHERE name = ? AND age = ? 에서 age column은 index 적용이 되지 않는다.

다중 column index를 사용할 때는 INDEX로 설정해준 제일 왼쪽column이 WHERE절에 사용되어야 한다.

 
★설계방법
무조건 많이 설정하지 않는다. (한 table당 3~5개가 적당 목적에 따라 상이)
조회시 자주 사용하는 column
고유한 값 위주로 설계
카디널리티가 높을 수록 좋다 (= 한 column이 갖고 있는 중복의 정도가 낮을 수록 좋다.)
INDEX 키의 크기는 되도록 작게 설계
PK, JOIN의 연결고리가 되는 column
단일 index 여러 개 보다 다중 column INDEX 생성 고려
UPDATE가 빈번하지 않은 column
JOIN시 자주 사용하는 column
INDEX를 생성할 때 가장 효율적인 자료형은 정수형 자료(가변적 data는 비효율적)
 

index 문법
index 생성

-- 단일 index
CREATE INDEX index이름 ON table이름(필드이름1)

-- 다중 column index
CREATE INDEX index이름 ON table이름(필드이름1, 필드이름2, ...)
 

index 조회

SHOW INDEX FROM table이름
 

UNUQUE index 생성(중복 값을 허용하지 않는 index)

-- 단일 index
CREATE UNIQUE INDEX index 이름 ON table이름(필드이름1)
-- 다중 column index
CREATE UNIQUE INDEX index 이름 ON table이름(필드이름1, 필드이름2, ...)
 

index 정렬(index 생성 시점에 필드의 정렬방식 설정)

CREATE INDEX index이름 ON table이름 (필드이름 DESC)
CREATE INDEX index이름 ON table이름 (필드이름 ASC)
 

index 삭제

ALTER TABLE table이름 DROP INDEX index이름;
 

index 추가

ALTER TABLE table이름 ADD (UNIQUE)INDEX index이름(column명1, column명2...);














---

# Reference

- https://spiderwebcoding.tistory.com/6
    - index
- https://zorba91.tistory.com/292
    - index
- https://zorba91.tistory.com/293
    - B+tree & B-tree