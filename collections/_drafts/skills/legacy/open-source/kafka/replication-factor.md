

## Replication Factor

- replication factor는 각 partition을 몇 개의 broker에 복제할지 결정하는 설정입니다.
- replication factor가 N이면, 각 partition은 N개의 broker에 복제됩니다.
    - 하나의 broker가 leader 역할을 하고, 나머지는 follower 역할을 합니다.
    - leader는 읽기와 쓰기 요청을 처리하고, follower는 leader의 data를 복제합니다.
- replication은 fault tolerance와 high availability를 제공합니다.
    - leader broker가 실패하면 follower 중 하나가 새로운 leader로 선출됩니다.
    - 이 과정을 leader election이라고 합니다.
- in-sync replicas(ISR)는 leader와 동기화된 상태를 유지하는 replica 집합입니다.
    - leader는 ISR에 속한 모든 follower가 message를 복제한 후에만 commit 완료로 간주합니다.
    - ISR에 속하지 않는 follower는 장애 복구 시 leader가 될 수 없습니다.
- min.insync.replicas 설정은 write 요청이 성공으로 간주되기 위해 필요한 최소 ISR 수를 지정합니다.
    - 이 값이 2이고 replication factor가 3인 경우, 적어도 2개의 replica(leader 포함)가 message를 저장해야 write가 성공합니다.
- replication factor는 topic 생성 시 설정하며, 나중에 변경할 수도 있습니다.
- replication factor를 높이면 안정성이 증가하지만, 그만큼 더 많은 storage와 network 대역폭을 사용합니다.
- 일반적으로 production 환경에서는 replication factor를 3으로 설정하는 것이 권장됩니다.