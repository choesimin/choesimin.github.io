

---





## Snapshot Mode


### Initial Mode

- Initial mode는 Debezium의 기본 snapshot mode입니다.
    - connector가 처음 실행될 때 한 번만 snapshot을 수행합니다.
    - 이후에는 log를 통해 변경 사항만을 capture합니다.

- Initial mode는 대부분의 상황에서 권장되는 mode입니다.
    - data의 완전한 동기화를 보장합니다.
    - 운영 환경에서 안정적으로 사용할 수 있습니다.


### Initial Only Mode

- Initial only mode는 snapshot만 수행하고 종료하는 mode입니다.
    - 전체 data를 복제한 후 변경 사항은 capture하지 않습니다.
    - 일회성 data 이관 작업에 적합합니다.

- 초기 data 동기화만 필요하고, 이후의 data 변경 사항은 신경 쓰지 않아도 되는 경우 사용합니다.
    - legacy system의 data를 이관하거나, test 환경을 구성할 때 사용합니다.


### Never Mode

- Never mode는 snapshot을 수행하지 않는 mode입니다.
    - log의 변경 사항만을 capture합니다.
    - 초기 data 동기화는 수행하지 않습니다.

- 주로 이미 동기화된 상태에서 재시작할 때 사용합니다.
    - source와 target이 이미 동기화된 상태에서 사용합니다.
    - log position이 정확히 알려진 경우에 사용합니다.

### Schema Only Mode

- Schema only mode는 schema 정보만 capture하는 mode입니다.
    - Table의 구조만 복제합니다.
    - Record는 복제하지 않습니다.

- schema 관리 목적으로 사용됩니다.
    - schema 변경 사항만 tracking이 필요한 경우 사용합니다.
    - schema version 관리에 활용할 수 있습니다.


### When Needed Mode

- When needed mode는 필요한 경우에만 snapshot을 수행하는 mode입니다.
    - log가 유실되거나 손상된 경우 자동으로 snapshot을 수행합니다.
    - system 장애 상황에서 data 복구를 자동화할 수 있습니다.

- 고가용성이 요구되는 환경에서 유용합니다.
    - 자동 복구 기능이 필요한 경우 사용합니다.
    - system의 안정성을 높일 수 있습니다.


### Custom Mode

- Custom mode는 사용자가 직접 snapshot 동작을 정의하는 mode입니다.
    - snapshot handler를 구현하여 동작을 customize할 수 있습니다.
    - 복잡한 business 요구 사항을 반영할 수 있습니다.

- 개발 전문 지식이 필요합니다.
    - Debezium의 내부 동작 방식을 이해해야 합니다.
    - Java code로 handler를 구현해야 합니다.

