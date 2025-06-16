---
published: false
---


## Database별 감지 방식

- MySQL은 binlog를 통해 변경사항을 읽어들입니다.
    - `ROW` format의 binary log에서 변경사항을 추출합니다.
    - binary log의 raw data를 Debezium event 형식으로 변환합니다.

- PostgreSQL은 Write-Ahead Log(WAL)를 사용합니다.
    - logical decoding을 통해 WAL의 변경사항을 읽습니다.
    - WAL의 변경사항을 Debezium event 형식으로 변환합니다.

- MongoDB는 oplog를 활용합니다.
    - replica set의 oplog에서 변경사항을 읽습니다.
    - oplog의 operation을 Debezium event 형식으로 변




