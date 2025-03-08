

## Offset과 Consumer Group

- offset은 partition 내 각 message의 고유 식별자입니다.
    - 0부터 시작하여 증가하는 정수값입니다.
    - consumer는 offset을 통해 자신이 읽은 위치를 기록합니다.
- consumer group은 하나의 topic을 공동으로 소비하는 consumer의 집합입니다.
    - 각 consumer group은 독립적으로 message를 소비합니다.
    - 동일한 topic이라도 consumer group마다 별도의 offset을 유지합니다.
- consumer group 내의 consumer들은 partition을 분담하여 처리합니다.
    - 하나의 partition은 동일 group 내 하나의 consumer만 소비할 수 있습니다.
    - partition 수보다 consumer 수가 많으면 일부 consumer는 유휴 상태가 됩니다.
- consumer는 자신이 처리한 message의 offset을 commit하여 진행 상태를 기록합니다.
    - commit된 offset은 `__consumer_offsets` topic에 저장됩니다.
    - consumer 재시작 시 마지막으로 commit한 offset부터 다시 시작합니다.
- offset 관리 방식에 따라 다양한 message 전달 보장 수준을 제공합니다.
    - at most once : message를 읽기 전에 offset을 commit합니다.
    - at least once : message를 처리한 후에 offset을 commit합니다.
    - exactly once : transaction을 사용하여 정확히 한 번 처리를 보장합니다.
