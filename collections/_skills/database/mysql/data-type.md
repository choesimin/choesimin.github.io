---
layout: skill
permalink: /9
title: MySQL Data Type - 자료형
description: MySQL은 숫자, 문자, 날짜, 시간, JSON 등에 대한 자료형을 지원합니다.
date: 2023-07-27
---


## 숫자

- 정수는 `TINYINT`, `SMALLINT`, `MEDIUMINT`, `INT`, `BIGINT` 등 저장할 값의 최대 최소 범위에 적합한 자료형을 선택할 수 있습니다.
- `DECIMAL`은 실수(소수점이 있는 숫자)에 대해 정확한 수치를 저장하지만, `FLOAT`와 `DOUBLE`은 근사치의 숫자를 저장합니다.
    - 정확한 실수를 저장하려면 `DECIMAL`을 사용해야 합니다.
    - `FLOAT`와 `DOUBLE`은 `DECIMAL`에 비해 덜 정확하지만, 상당히 큰 숫자를 저장할 수 있습니다.


### Bit

| Data Type | Byte | 설명 |
| 