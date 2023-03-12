---
layout: note
---

# Data Type

---

## 숫자

| Data Type | Byte | 숫자 범위 | 설명 |
| - | - | - | - |
| BIT(N) | N/8 | | 1~64Bit 표현, b'0000'형식으로 표현 |
| TINYINT | 1 | -128 ~ 127 | 정수 |
| SMALLINT | 2 | -32,768 ~ 32,767 | 정수 |
| MEDIUMINT | 3 | -8,388,608 ~ 8,388,607 | 정수 |
| INT & INTEGER | 4 | 약 -21억 ~ +21억 | 정수 |
| BIGINT | 8 | 약 -900경 ~ +900경 | 정수 |
| FLOAT | 4 | -3.40E+38 ~ -1.17E-38 | 소수점 아래 7자리까지 표현 |
| DOUBLE & REAL | 8 | -1.22E-308 ~ 1.79E+308 | 소수점 아래 15자리까지 표현 |
| DECIMAL(m,[d]) & NUMBER(m,[d]) | 5~17 | -10^38+1 ~ 10^38-1 | 전체 자릿수(m)와 소수점 이하 자릿수(d)를 가진 숫자형 (ex. decimal(5,2)는 전체 자릿수는 5자리, 그 중 소수점 이하를 2자리로 함) |

- DECIMAL은 정확한 수치를 저장하지만 FLOAT와 DOUBLE은 근사치의 숫자를 저장함
    - 소수점이 들어간 실수를 저장하려면 DECIMAL을 사용하기
    - FLOAT와 DOUBLE은 상당히 큰 숫자를 저장할 수 있음

---

## 문자

### 일반

| Data Type | Byte | 설명 |
| - | - | - |
| CHAR(n) | 1 ~ 255 | 고정길이 문자형. n을 1부터 255까지 지정할 수 있음. 그냥 CHAR만 쓰면 CHAR(1)과 동일함 |
| VARCHAR(n) | 1 ~ 65535 | 가변길이 문자형. n을 사용하면 1부터 65535까지 지정함 |
| BINARY(n) | 1 ~ 255 | 고정길이의 이진 data 값 |
| VARBINARY(n) | 1 ~ 255 | 가변길이의 이진 data 값 |

- CHAR
    - 고정길이 문자형으로 자릿수가 고정되어 있음
    - 예를 들어, CHAR(100)에 'ABC' 3글자만 저장해도 100자리를 모두 확보한 후에 앞에 3자리 사용하고 97자리는 낭비함
    - 때문에 가변길이 문자형인 VARCHAR를 사용하는게 좋아보이지만 되도록 CHAR로 설정하는 것이 INSRET/UPDATE 시 일반적으로 성능이 더 좋음

### TEXT 형식 : 대용량 글자를 저장하기 위한 형식

| Data Type | Byte | 설명 |
| - | - | - |
| TINYTEXT | 1 ~ 255 | 255 크기의 TEXT data 값 |
| TEXT | 1 ~ 65535 | N 크기의 TEXT data 값 |
| MEDIUMTEXT | 1 ~ 16777215 | 16777215 크기의 TEXT data 값 |
| LONGTEXT | 1 ~ 4294967295 | 최대 4GB 크기의 TEXT data 값 |

### BLOB 형식 : 사진 file, 동영상 file 등의 대용량의 이진 data를 저장하는데 사용

| Data Type | Byte | 설명 |
| - | - | - |
| TINYBLOB | 1 ~ 255 | 255 크기의 BLOB data 값 |
| BLOB | 1 ~ 65535 | N 크기의 BLOB data 값 |
| MEDIUMBLOB | 1 ~ 16777215 | 16777215 크기의 BLOB data 값 |
| LONGBLOB | 1 ~ 4294967295 | 최대 4GB 크기의 BLOB data 값 |
| ENUM(values...) | 1 또는 2 | 최대 65535개의 열거형 data 값 |
| SET(values...) | 1, 2, 3, 4, 8 | 최대 64개의 서로 다른 data 값 |

---

## 날짜 & 시간

| Data Type | Byte | 설명 |
| - | - | - |
| DATE | 3 | 1001-01-01 ~ 9999-12-31 까지 저장되며 날짜 형식만 사용 ('YYYY-MM-DD') |
| TIME | 3 | -838:59:59.000000 ~ 838:59:59.000000 까지 저장됨 ('HH:MM:SS') |
| DATETIME | 8 | 1001-01-01 00:00:00 ~ 9999-12-31 23:59:59 까지 저장됨 ('YYYY-MM-DD HH:MM:SS') |
| TIMESTAMP | 4 | 1001-01-01 00:00:00 ~ 9999-12-31 23:59:59 까지 저장됨 ('YYYY-MM-DD HH:MM:SS'). time_zone system 변수와 관련이 있고 UTC 시간대 변환하여 저장함 |
| YEAR | 1 | 1901 ~ 2155까지 저장됨 ('YYYY') |

---

# Reference

- https://spiderwebcoding.tistory.com/5
