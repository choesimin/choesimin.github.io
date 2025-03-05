---
layout: skill
permalink: /66
title: Debezium Event - DB 통합 CUD Event
description: Debezium은 Database의 변경 사항을 통합하여 event로 전달합니다.
date: 2025-01-31
---


## Database 종류와 상관없이 통일된 Debezium Event

- Debezium event는 envelope pattern을 기반으로 구성됩니다.
    - envelope는 변경 사항의 전체 context를 포함하는 container입니다.
    - event의 모든 정보는 JSON 형식으로 직렬화됩니다.

- 하나의 event는 5개의 핵심 field로 구성됩니다.
    - **op** : 변경 작업의 유형을 나타냅니다.
        - `c` : create 작업.
        - `u` : update 작업.
        - `d` : delete 작업.
        - `r` : read 작업.
    - **before** : 변경 전 record의 상태입니다.
    - **after** : 변경 후 record의 상태입니다.
    - **source** : event의 출처와 metadata 정보입니다.
    - **ts_ms** : event가 생성된 timestamp입니다.

- Debezium은 database에 따라 다른 방식으로 변경 사항을 감지하지만, **최종적으로 동일한 event 형식으로 변환**합니다.
    - `op`, `before`, `after` field의 구조는 동일하고, `source` field만 database별 특성을 반영합니다.


### Event 구조 통일의 장점

- application은 database 종류와 관계없이 동일한 event 구조를 처리할 수 있습니다.
    - event 처리 logic을 database별로 다르게 구현할 필요가 없습니다.
    - 여러 database의 변경사항을 일관된 방식으로 처리할 수 있습니다.

- 새로운 database를 추가하더라도 기존 event 처리 logic을 재사용할 수 있습니다.
    - database 종류가 달라도 동일한 consumer logic을 사용할 수 있습니다.
    - system 확장성이 향상됩니다.


### Event의 `before`와 `after`

- event의 `before`와 `after`는 database의 변경 사항을 명확하게 구분하기 위한 기본 구조입니다.
    - 각 field는 변경 시점을 기준으로 data의 상태를 저장합니다.
    - 이 구조를 통해 data의 변화를 직관적으로 파악할 수 있습니다.

- data를 `before`와 `after`로 분리하면, database의 모든 변경 유형을 일관된 구조로 표현할 수 있습니다.
    - `CREATE`, `UPDATE`, `DELETE` 작업을 동일한 구조로 처리할 수 있습니다.
    - 각 변경 유형에 따라 field의 값만 달라지므로, 처리 logic을 단순화할 수 있습니다.

- 변경된 내용만 추출할 필요 없이 두 시점의 전체 data를 보존할 수 있습니다.
    - 변경 사항을 계산하는 추가 작업이 필요하지 않습니다.
    - 변경된 field를 찾기 위해 추가 query를 실행할 필요가 없습니다.

- 수신자가 필요한 정보만 선택하여 사용할 수 있습니다.
    - 변경 전 data가 필요한 경우 `before` field를 사용합니다.
    - 변경 후 data가 필요한 경우 `after` field를 사용합니다.
    - 변경 여부를 확인할 때는 두 field를 비교합니다.`

#### `before`와 `after`의 활용 예시 : 회원 정보 수정에 따른 처리

- 회원 정보 수정 시, update event가 발생합니다.
    - `before` : 변경 전 회원 정보.
    - `after` : 변경 후 회원 정보.

```json
{
    "before": {
        "id": 100,
        "name": "Kim",
        "email": "kim@mail.com",
        "point": 1000
    },
    "after": {
        "id": 100,
        "name": "Kim",
        "email": "new.kim@mail.com",
        "point": 1200
    }
}
```

- **활용 1** : 변경된 Email 주소로 알림 발송.
    - `before`의 `email`로는 이전 주소가 유효하지 않다는 알림을 발송합니다.
    - `after`의 `email`로는 새로운 주소 등록 완료 알림을 발송합니다.

- **활용 2** : Point 증가분에 대한 처리.
    - `before`의 `point`와 `after`의 `point`를 비교하여 증가분을 계산합니다.
    - `point` 증가분에 대한 축하 알림을 발송합니다.

- **활용 3** : 회원 정보 변경 이력 생성.
    - `before`와 `after`를 비교하여 변경된 field만 history에 기록합니다.
    - `email`만 변경되고 `name`은 변경되지 않았다는 것을 쉽게 파악할 수 있습니다.


---


## Create Update Delete Event

- Debezium event는 CUD(Create Update Delete) 작업에 대한 정보를 포함합니다.
    - **Create** : 새로운 record를 추가하는 작업입니다.
    - **Update** : 기존 record를 수정하는 작업입니다.
    - **Delete** : 기존 record를 삭제하는 작업입니다.


### Create Event 구조

- create event는 `op` field가 `c`로 설정되고, `before` field가 `null`인 경우입니다.

```json
{
    "op": "c",
    "before": null,
    "after": {
        "id": 1001,
        "name": "John Doe",
        "email": "john@example.com",
        "created_at": "2025-01-31T10:00:00Z"
    },
    "source": {
        "version": "2.1.0.Final",
        "connector": "mysql",
        "name": "mysql-server-1",
        "ts_ms": 1706688000000,
        "snapshot": false,
        "db": "users",
        "sequence": null,
        "table": "user_info"
    },
    "ts_ms": 1706688000100
}
```


### Update Event 구조

- update event는 `op` field가 `u`로 설정되고, `before`와 `after` field가 모두 존재하는 경우입니다.

```json
{
    "op": "u",
    "before": {
        "id": 1001,
        "name": "John Doe",
        "email": "john@example.com",
        "created_at": "2025-01-31T10:00:00Z"
    },
    "after": {
        "id": 1001,
        "name": "John Smith",
        "email": "john.smith@example.com",
        "created_at": "2025-01-31T10:00:00Z"
    },
    "source": {
        "version": "2.1.0.Final",
        "connector": "mysql",
        "name": "mysql-server-1",
        "ts_ms": 1706688300000,
        "snapshot": false,
        "db": "users",
        "sequence": null,
        "table": "user_info"
    },
    "ts_ms": 1706688300100
}
```


### Delete Event 구조

- delete event는 `op` field가 `d`로 설정되고, `after` field가 `null`인 경우입니다.

```json
{
    "op": "d",
    "before": {
        "id": 1001,
        "name": "John Smith",
        "email": "john.smith@example.com",
        "created_at": "2025-01-31T10:00:00Z"
    },
    "after": null,
    "source": {
        "version": "2.1.0.Final",
        "connector": "mysql",
        "name": "mysql-server-1",
        "ts_ms": 1706688600000,
        "snapshot": false,
        "db": "users",
        "sequence": null,
        "table": "user_info"
    },
    "ts_ms": 1706688600100
}
```


---


## Source Metadata 상세 정보

- source field는 event의 출처와 관련된 상세 정보를 포함합니다.

```json
{
    "source": {
        "version": "2.1.0.Final",
        "connector": "mysql",
        "name": "mysql-server-1",
        "ts_ms": 1706688000000,
        "snapshot": false,
        "db": "inventory",
        "sequence": "00003.123",
        "table": "customers",
        "server_id": 1234,
        "gtid": "b9b4cd21-9ab0-11ee-9014-0242ac140002:123",
        "file": "mysql-bin.000003",
        "pos": 1234,
        "row": 0,
        "thread": 123,
        "query": null
    }
}
```
- **version** : Debezium connector의 version입니다.
- **connector** : 사용 중인 connector의 type입니다.
- **name** : connector의 logical name입니다.
- **ts_ms** : database의 변경 사항이 발생한 timestamp입니다.
- **snapshot** : snapshot을 통한 event 여부를 나타냅니다.
- **db** : database의 name입니다.
- **sequence** : transaction 내의 순서를 나타냅니다.
- **table** : 변경이 발생한 table의 name입니다.


### Schema Change Event

- table의 schema가 변경되면 별도의 schema change event가 발생합니다.

```json
{
    "op": "c",
    "before": null,
    "after": {
        "schema": {
            "type": "ALTER",
            "table": "user_info",
            "changes": [
                {
                    "type": "ADD",
                    "field": "phone",
                    "properties": {
                        "type": "VARCHAR",
                        "length": 20,
                        "nullable": true
                    }
                }
            ]
        }
    },
    "source": {
        "version": "2.1.0.Final",
        "connector": "mysql",
        "name": "mysql-server-1",
        "ts_ms": 1706688900000,
        "snapshot": false,
        "db": "users",
        "sequence": null,
        "table": "user_info"
    },
    "ts_ms": 1706688900100
}
```
