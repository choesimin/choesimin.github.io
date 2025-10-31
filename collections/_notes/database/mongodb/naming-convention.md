---
layout: note
permalink: /77
title: MongoDB Naming 관습 (Database, Collection, Field)
description: MongoDB에서 Database, Collection, Field의 이름을 지을 때, 지켜야 하는 naming 규칙이 있습니다.
date: 2024-01-16
---


## Naming Convention

- database, collection, field 이름 모두 공통적으로 모호한 표현을 피하고, 짧으면서도 의미를 파악할 수 있게 정하는 것이 좋습니다.
- 협업하는 동료들과 미리 규칙을 정하여 지키고, 기호에 따른 선택이 가능한 것은 결정하면 통일감 있게 사용합니다.


---


## Database Naming

- camel case 또는 lower case(전부 소문자)로 작성합니다.
    - lower case를 권장하며, lower case를 사용한다면 구분자(`-`, `_`)를 넣는 것이 가독성을 높일 수 있습니다.

- 영문자(a-z)와 숫자(0-9)를 사용합니다.
    - case sensitive하기 때문에 대소문자 구별에 주의해야 합니다.
    - database 이름은 공백일 수 없으며, null 문자열(`null`)이나 공백 문자(` `)를 포함해선 안 됩니다.

- 64 Bytes 미만의 크기로 작성합니다.
- 운영 체제에 따라 사용이 금지되는 특수 문자가 있습니다.

| OS | 사용 금지 특수 문자 |
| --- | --- |
| Linux, Unix | `/` `\` `.` `공백` `"` `$` |
| Windows | `/` `\` `.` `공백` `"` `$` `*` `<` `>` `:` `?` `|` |


---


## Collection Naming

- camel case 또는 lower case(전부 소문자)로 작성합니다.
    - lower case를 권장하며, lower case를 사용한다면 구분자(`-`, `_`)를 넣는 것이 가독성을 높일 수 있습니다.

- 복수형을 권장합니다.
    - 예를 들어, `students`, `employees`.

- `$`, 공백 문자(` `), null 문자열(`null`)를 포함해서는 안 됩니다.
- `System`이라는 접두어는 예약어이기 때문에 사용해서는 안 됩니다.
- 120 Bytes 이하의 크기로 작성합니다.


---


## Field Naming

- camel case, pascal case, lower case를 사용합니다.
    - lower case인 경우, `_`를 구분자로 사용할 수 있습니다.
    - MongoDB는 JavaScript를 사용하므로, camel case 사용을 권장합니다.

- null 문자열(`null`), 공백 문자(` `), 마침표(`.`)을 포함해선 안 됩니다.

- dollar(`$`)로 시작하는 field 이름이나 마침표(`.`)가 포함된 field 이름은 사용하지 않는 것을 권장합니다.
    - 5.0 version 이상의 MongoDB에서는 사용할 수 있는 field 이름이지만, 이전 version의 MongoDB와 통신해야 하는 상황이라면 data 손실(loss)의 가능성이 있습니다.
        - 5.0 driver가 이전 version의 server로 문서를 보낼 경우, 해당 server에서는 문서를 거부하지만 오류 message를 보내지 않습니다.
 

---


## Reference

- <https://typeof-undefined.tistory.com/11>
- <https://www.mongodb.com/docs/manual/reference/limits/#naming-restrictions>

