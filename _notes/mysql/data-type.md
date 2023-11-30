---
layout: note
title: MySQL Data Type - 자료형
date: 2023-07-27
---




- MySQL은 숫자, 문자, 날짜, 시간, JSON 등에 대한 자료형을 지원합니다.




---




## 숫자

- 정수는 `TINYINT`, `SMALLINT`, `MEDIUMINT`, `INT`, `BIGINT` 등 저장할 값의 최대 최소 범위에 적합한 자료형을 선택할 수 있습니다.
- `DECIMAL`은 실수(소수점이 있는 숫자)에 대해 정확한 수치를 저장하지만, `FLOAT`와 `DOUBLE`은 근사치의 숫자를 저장합니다.
    - 정확한 실수를 저장하려면 `DECIMAL`을 사용해야 합니다.
    - `FLOAT`와 `DOUBLE`은 `DECIMAL`에 비해 덜 정확하지만, 상당히 큰 숫자를 저장할 수 있습니다.


### Bit

| Data Type | Byte | 설명 |
| --- | --- | --- | --- |
| BIT(n) | n/8 | 1Bit에서 64Bit까지 `b'0000'`과 같은 방식으로 표현합니다. `n`을 생략하면 `BIT(1)`로 정의합니다. |


### 정수

| Data Type | Byte | 설명 |
| --- | --- | --- | --- |
| TINYINT | 1 | 매우 작은 범위의 정수이며, -128부터 127까지 지정할 수 있습니다. |
| TINYINT UNSIGNED | 1 | 음수를 제외한 매우 작은 범위의 정수이며, 0부터 255까지 지정할 수 있습니다. |
| SMALLINT | 2 | 작은 범위의 정수이며, -32,768부터 32,767까지 지정할 수 있습니다. |
| SMALLINT UNSIGNED | 2 | 음수를 제외한 작은 범위의 정수이며, 0부터 65,535까지 지정할 수 있습니다. |
| MEDIUMINT | 3 | 중간 범위의 정수이며, -8,388,608부터 8,388,607까지 지정할 수 있습니다. |
| MEDIUMINT UNSIGNED | 3 | 음수를 제외한 중간 범위의 정수이며, 0부터 16,777,215까지 지정할 수 있습니다. |
| INT | 4 | 정수이며, 약 -21억부터 21억까지 지정할 수 있습니다. |
| INT UNSIGNED | 4 | 음수를 제외한 정수이며, 0부터 약 42억까지 지정할 수 있습니다. |
| BIGINT | 8 | 큰 범위의 정수이며, 약 -922경부터 922경까지 지정할 수 있습니다. |
| BIGINT UNSIGNED | 8 | 음수를 제외한 큰 범위의 정수이며, 0부터 약 1844경까지 지정할 수 있습니다. |


### 고정 소수점

- 고정 소수점(fixed-point) 유형은 **정확한** 실수를 표현합니다.

| Data Type | Byte | 설명 |
| --- | --- | --- | --- |
| DECIMAL(n, m) | 5 ~ 17 | 실수 전체의 자릿수(`n`)와 소수점 이하 자릿수(`m`)를 가진 숫자형이며, -10^38+1부터 10^38-1까지 지정할 수 있습니다.<br>e.g., `decimal(5, 2)`는 전체 자릿수는 5자리이고, 그 중 소수점 이하를 2자리로 합니다. |


### 부동 소수점

- 부동 소수점(floating-point) 유형은 **대략적인** 실수를 표현합니다.

| Data Type | Byte | 설명 |
| --- | --- | --- | --- |
| FLOAT | 4 | 소수점 아래 7자리까지 표현합니다.<br>-3.402823466E+38부터 -1.175494351E-38까지, 1.175494351E-38부터 3.402823466E+38까지, 그리고 0을 지정할 수 있습니다. |
| DOUBLE | 8 | 소수점 아래 15자리까지 표현합니다.<br>-1.7976931348623157E+308부터 -2.2250738585072014E-308까지, 2.2250738585072014E-308부터 1.7976931348623157E+308까지, 그리고 0을 지정할 수 있습니다. |




---




## 문자

- 문자 자료형은 일반 문자, Text 형식 문자, 이진 형식 문자, BLOB 형식 문자로 나뉩니다.


### 일반 문자

- `CHAR`은 고정 길이 문자형으로 자릿수가 고정되어 있습니다.
    - 예를 들어, `CHAR(100)`에 'ABC' 3글자만 저장해도 100자리를 모두 확보한 후에 앞의 3자리를 사용하고 나머지 97자리는 낭비합니다.
- `VARCHAR`은 가변 길이 문자형으로 자릿수가 고정되어 있지 않습니다.
- 가변 길이 문자형인 `VARCHAR`를 사용하는게 더 좋아 보이지만, `CHAR`로 설정하는 것이 일반적으로 INSRET/UPDATE 시에 성능이 더 좋습니다.

| Data Type | Byte | 설명 |
| --- | --- | --- |
| CHAR(n) | 1 ~ 255 | 고정 길이 문자형입니다. `n`을 1부터 255까지 지정할 수 있습니다. 크기 지정 없이 `CHAR`만 쓰면 `CHAR(1)`과 동일합니다. |
| VARCHAR(n) | 1 ~ 65535 | 가변 길이 문자형입니다. `n`을 1부터 65535까지 지정할 수 있습니다. |


### TEXT 형식 문자

- 대용량 문자를 저장하기 위한 형식입니다.

| Data Type | Byte | 설명 |
| --- | --- | --- |
| TINYTEXT | 1 ~ 255 | 최대 255B 크기의 TEXT data 값입니다. |
| TEXT | 1 ~ 65535 | 최대 64KB 크기의 TEXT data 값입니다. |
| MEDIUMTEXT | 1 ~ 16777215 | 최대 16MB 크기의 TEXT data 값입니다. |
| LONGTEXT | 1 ~ 4294967295 | 최대 4GB 크기의 TEXT data 값입니다. |


### 이진 형식 문자

| Data Type | Byte | 설명 |
| --- | --- | --- |
| BINARY(n) | 1 ~ 255 | 고정 길이의 이진 data 값입니다. |
| VARBINARY(n) | 1 ~ 255 | 가변 길이의 이진 data 값입니다. |


### BLOB 형식 문자

- BLOB(Binary Large Object) : 대형 이진 객체.
- `BLOB`은 image, sound, video 등의 대용량의 이진 data를 저장할 때 사용합니다.

| Data Type | Byte | 설명 |
| --- | --- | --- |
| TINYBLOB | 1 ~ 255 | 255 크기의 BLOB data 값입니다. |
| BLOB | 1 ~ 65535 | N 크기의 BLOB data 값입니다. |
| MEDIUMBLOB | 1 ~ 16777215 | 최대 16777215B 크기의 BLOB data 값입니다. |
| LONGBLOB | 1 ~ 4294967295 | 최대 4GB 크기의 BLOB data 값입니다. |
| ENUM(values...) | 1 또는 2 | 최대 65535개의 열거형 data 값입니다. |
| SET(values...) | 1, 2, 3, 4, 8 | 최대 64개의 서로 다른 data 값입니다. |




---




## 날짜 & 시간

| Data Type | Byte | 설명 |
| --- | --- | --- |
| DATE | 3 | `1001-01-01`부터 `9999-12-31`까지 지정할 수 있으며, 'YYYY-MM-DD' 형식입니다. |
| DATETIME | 8 | `1001-01-01 00:00:00`부터 `9999-12-31 23:59:59`까지 지정할 수 있으며, 'YYYY-MM-DD HH:MM:SS' 형식입니다. |
| TIMESTAMP | 4 | `1001-01-01 00:00:00`부터 `9999-12-31 23:59:59`까지 지정할 수 있으며, 'YYYY-MM-DD HH:MM:SS' 형식입니다. time_zone system 변수와 관련이 있고 UTC 시간대로 변환하여 저장합니다. |
| TIME | 3 | `-838:59:59.000000`부터 `838:59:59.000000`까지 지정할 수 있으며, 'HH:MM:SS' 형식입니다. |
| YEAR | 1 | `1901`부터 `2155`까지 지정할 수 있으며, 'YYYY' 형식입니다. |




---




## 특수 형식

| Data Type | Byte | 설명 |
| --- | --- | --- |
| GEOMETRY | N/A | 공간 data 형식입니다. 선, 점 및 다각형 같은 공간 data 개체를 저장합니다. |
| JSON | 1 ~ 4294967295 | JSON 문서를 저장하며, 배열도 지원합니다. JSON Object를 parsing(type conversion)해야 하기 때문에, DB에 부하가 있을 수 있습니다. `LONGTEXT`와 크기가 같으며, 대안으로 문자 형식을 사용할 수 있습니다. |

```sql
-- Json Table 생성
CREATE TABLE `testschema`.`jsontable` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NULL,
    `jsoncol` JSON NULL,
    PRIMARY KEY (`id`)
);

-- Json 값 넣기
INSERT INTO `testschema`.`jsontable`(`name`, `jsoncol`) VALUES ("json_string", '{"a": "A", "b":"B"}');

-- 배열 값 넣기
INSERT INTO `testschema`.`jsontable`(`name`, `jsoncol`) VALUES ("json_object with json_array", json_object("a", JSON_ARRAY(1,2,3), "b", "B"));

-- Json 조회하기
select id, name, jsoncol FROM testschema.jsontable;

-- Json 특정 Key 조회하기
select id, name, json_extract(jsoncol, '$.a') FROM testschema.jsontable;
```




---




# Reference

- <https://spiderwebcoding.tistory.com/5>
- <https://inpa.tistory.com/entry/MYSQL-%F0%9F%93%9A-%EC%9E%90%EB%A3%8C%ED%98%95-%ED%83%80%EC%9E%85-%EC%A2%85%EB%A5%98-%EC%A0%95%EB%A6%AC>
