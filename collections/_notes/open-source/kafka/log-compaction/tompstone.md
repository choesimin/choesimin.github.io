---
layout: note
permalink: /
title: 
description: 
date: 2024-12-31
published: false
---


## Kafka Tombstone의 개념과 삭제 메커니즘

- Kafka tombstone은 **특정 key를 논리적으로 삭제**하기 위한 특별한 메시지로, `value=null`로 설정된 구조를 가집니다.
- 분산 저장 환경에서 **완전한 데이터 삭제**를 표현하는 표준 메커니즘으로, log compaction과 결합하여 동작합니다.
- 단순한 null 값이 아니라 **"이 key는 더 이상 존재하지 않는다"**는 명시적인 삭제 신호를 나타냅니다.


---


## Tombstone의 정의와 역할

- Tombstone은 Kafka에서 **key의 완전한 제거**를 표현하기 위해 설계된 특별한 메시지 형태입니다.
- 일반 메시지와 동일한 구조를 가지지만, **value 필드가 null로 설정**되어 삭제 의미를 전달합니다.
- Log compaction 환경에서 **삭제된 key가 재생성되지 않음**을 보장하는 핵심 역할을 수행합니다.


### Tombstone이란 무엇인가

- **Tombstone의 어원** : "묘비석"이라는 뜻으로, **죽음을 표시하는 표식**에서 유래된 computer science 용어입니다.
    - Database나 분산 시스템에서 **삭제된 항목을 표시**하는 marker로 널리 사용됩니다.
    - Kafka에서는 **key의 논리적 죽음**을 알리는 특별한 메시지를 의미합니다.

- **메시지로서의 tombstone** : 일반적인 데이터 메시지가 아니라 **메타 정보를 전달하는 control message**입니다.
    - Data plane이 아닌 **control plane에서 동작**하는 특성을 가집니다.
    - Consumer에게 "이 key에 대한 처리를 중단하라"는 **명령을 전달**합니다.

- **표준화된 삭제 방법** : Kafka ecosystem에서 **삭제를 표현하는 표준 방법**으로 정의되어 있습니다.
    - 다양한 client library와 tool들이 **동일한 방식으로 삭제를 인식**할 수 있습니다.
    - Protocol level에서 정의된 **공식적인 삭제 메커니즘**입니다.


### 일반 메시지와 Tombstone의 구조적 차이점

- **Key 필드** : 일반 메시지와 동일하게 **삭제 대상 key**를 포함합니다.
    - Key는 반드시 존재해야 하며, null이어서는 안 됩니다.
    - Key의 serialization 방식도 **기존 메시지와 일치**해야 합니다.

- **Value 필드** : 반드시 `null`로 설정되어야 하는 **핵심 구분 요소**입니다.
    - 빈 문자열("")이나 빈 객체({})는 tombstone이 아닙니다.
    - Programming language별 null 표현(Java의 null, Python의 None 등)을 사용합니다.

- **Headers와 Metadata** : 일반 메시지와 동일하게 **추가 정보를 포함**할 수 있습니다.
    - Timestamp, partition, offset 등 **메시지 메타데이터는 동일**하게 처리됩니다.
    - Custom header를 통해 **삭제 관련 정보**를 전달할 수도 있습니다.

- **크기와 성능** : value가 없으므로 **매우 작은 크기**를 가집니다.
    - Network overhead가 **최소화**됩니다.
    - Storage 공간도 **거의 사용하지 않습니다**.


### Log Compaction에서 Tombstone의 특별한 의미

- **특별한 처리 대상** : log compaction 과정에서 tombstone은 **일반 메시지와 다르게 처리**됩니다.
    - 단순히 최신 메시지를 보존하는 것이 아니라 **삭제 명령으로 해석**됩니다.
    - 해당 key의 **모든 이전 메시지를 제거 대상으로 마킹**합니다.

- **Compaction engine의 인식** : `value=null`을 확인하여 **자동으로 특별 처리**를 수행합니다.
    - Manual configuration 없이도 **built-in 메커니즘**으로 동작합니다.
    - Consumer의 별도 처리 없이도 **storage level에서 삭제**가 진행됩니다.

- **영구적 삭제의 시작점** : tombstone은 **완전한 key 제거 과정의 시작**을 의미합니다.
    - 일시적인 상태가 아니라 **최종 목표로의 진행**을 나타냅니다.
    - Time-based retention과 달리 **business logic 기반의 삭제**를 구현합니다.


---


## Tombstone의 삭제 처리 원리

- Tombstone이 삭제를 처리하는 방식은 **논리적 삭제에서 물리적 삭제로 진행되는 단계적 과정**입니다.
- 분산 환경에서 **일관된 삭제 상태**를 유지하면서도 **완전한 제거**를 달성하는 정교한 메커니즘을 제공합니다.
- Key-value 저장소의 **근본적인 삭제 문제**를 해결하는 표준적 접근 방법입니다.


### 논리적 삭제 vs 물리적 삭제의 개념

- **논리적 삭제** : 데이터는 물리적으로 존재하지만 **"삭제됨" 상태로 표시**하는 방법입니다.
    - Database의 soft delete처럼 **deleted flag를 설정**하는 방식과 유사합니다.
    - 데이터 복구가 가능하고, **삭제 이력을 추적**할 수 있습니다.
    - 하지만 **storage 공간은 계속 사용**하며, 쿼리 성능에 영향을 줄 수 있습니다.

- **물리적 삭제** : 데이터를 **실제로 storage에서 제거**하는 방법입니다.
    - Hard delete로도 불리며, **완전한 공간 회수**가 가능합니다.
    - 삭제된 데이터는 **복구가 불가능**하며, 삭제 이력도 남지 않습니다.
    - **Storage 효율성**과 **performance 최적화**에 유리합니다.

- **Tombstone의 접근** : **논리적 삭제를 거쳐 물리적 삭제로 진행**하는 하이브리드 방식입니다.
    - 초기에는 tombstone message로 **논리적 삭제 상태**를 표시합니다.
    - 일정 시간 후 tombstone까지 제거하여 **완전한 물리적 삭제**를 달성합니다.
    - **안전성과 효율성**을 모두 확보하는 절충안을 제공합니다.


### Tombstone이 삭제를 표현하는 방식

- **명시적 삭제 신호** : `value=null`이라는 **명확하고 단순한 규칙**으로 삭제를 표현합니다.
    - 복잡한 삭제 flag나 **별도의 metadata 없이도 즉시 인식** 가능합니다.
    - 모든 programming language에서 **null 개념을 지원**하므로 구현이 간단합니다.

- **Key 기반 삭제** : 특정 key에 대한 **선택적 삭제**를 구현합니다.
    - 전체 topic이나 partition 삭제가 아닌 **개별 key 수준의 정밀한 제어**가 가능합니다.
    - 같은 key를 가진 **모든 이전 버전**을 대상으로 삭제가 적용됩니다.

- **시간 순서 보장** : tombstone도 **일반 메시지와 동일한 순서 보장**을 받습니다.
    - 같은 partition 내에서 **발생 순서대로 처리**됩니다.
    - 삭제 이후의 동일 key 메시지는 **새로운 생성으로 해석**됩니다.

- **분산 시스템 호환성** : 모든 replica와 consumer에게 **동일한 삭제 정보**를 전달합니다.
    - Network partition이나 **일시적 장애 상황**에서도 삭제 정보가 보존됩니다.
    - Consumer group 간에도 **일관된 삭제 상태**를 유지합니다.


### Key-Value 저장소에서의 삭제 문제와 Tombstone 해결책

- **근본적인 삭제 문제** : 분산 key-value 저장소에서 **완전한 삭제는 복잡한 문제**입니다.
    - 단순히 데이터를 제거하면 **새로운 consumer가 해당 key의 존재 여부를 알 수 없습니다**.
    - Log compaction 후에는 **삭제된 key와 처음부터 없었던 key를 구분할 수 없습니다**.

- **전통적 해결 방법의 한계** :
    - **Complete log retention** : 모든 메시지를 보존하면 삭제 정보는 유지되지만 **storage 비용이 무한정 증가**합니다.
    - **Time-based deletion** : 시간 기반 삭제는 **business logic과 무관하게 동작**하여 필요한 데이터까지 삭제할 수 있습니다.
    - **Separate deletion log** : 별도의 삭제 로그를 유지하면 **시스템 복잡성이 크게 증가**합니다.

- **Tombstone의 해결책** :
    - **표준화된 삭제 표현** : `value=null`이라는 **간단하고 명확한 규칙**으로 모든 삭제를 표현합니다.
    - **자동 정리 메커니즘** : log compaction과 결합하여 **별도 관리 없이 자동으로 처리**됩니다.
    - **점진적 삭제** : 즉시 물리적 삭제가 아닌 **단계적 접근**으로 안전성을 보장합니다.
    - **최소 overhead** : 추가적인 storage나 **복잡한 관리 구조 없이 동작**합니다.


---


## Tombstone의 생명 주기와 처리 과정

- Tombstone은 **생성부터 완전 소멸까지 명확한 단계**를 거치며 처리됩니다.
- 각 단계는 **서로 다른 목적과 의미**를 가지며, 전체적으로 **안전하고 완전한 삭제**를 보장합니다.
- 이 과정을 이해하면 **왜 tombstone이 일정 시간 유지되는지**와 **언제 완전히 사라지는지**를 파악할 수 있습니다.


### Tombstone 생성부터 완전 삭제까지의 단계

- **1단계 : Tombstone 생성** : producer가 명시적으로 `ProducerRecord(key, null)`을 전송합니다.
    - 이 시점에서 tombstone은 **일반 메시지와 동일한 방식으로 topic에 저장**됩니다.
    - 모든 consumer는 **tombstone을 일반 메시지처럼 수신**하여 삭제 처리를 수행할 수 있습니다.
    - 아직 이전 메시지들은 **물리적으로 존재**하는 상태입니다.

- **2단계 : 논리적 삭제 상태** : tombstone이 topic에 존재하여 **해당 key가 삭제되었음을 표시**합니다.
    - 새로운 consumer들은 tombstone을 통해 **즉시 삭제 상태를 인지**할 수 있습니다.
    - 기존 consumer들도 tombstone을 받아 **local state에서 해당 key를 제거**합니다.
    - 이 단계에서는 **tombstone과 이전 메시지들이 공존**합니다.

- **3단계 : 첫 번째 Log Compaction** : compaction 과정에서 tombstone을 제외한 **해당 key의 모든 이전 메시지가 삭제**됩니다.
    - Tombstone만 남아있어 **"이 key는 존재하지 않는다"**는 정보만 보존됩니다.
    - 새로운 consumer가 전체 topic을 읽어도 **tombstone만 확인**하게 됩니다.
    - Storage 공간은 **대폭 절약**되지만 삭제 정보는 여전히 유지됩니다.

- **4단계 : Delete Retention 기간** : `delete.retention.ms` 설정에 따라 tombstone이 **일정 시간 유지**됩니다.
    - 모든 consumer가 tombstone을 **충분히 처리할 시간**을 제공합니다.
    - 새로 추가되는 consumer나 **장애 복구 후 재시작되는 consumer**도 삭제 정보를 인지할 수 있습니다.
    - 이 기간 동안 **동일 key로 새로운 메시지가 오면** 삭제 상태가 해제됩니다.

- **5단계 : 완전한 물리적 삭제** : retention 기간 만료 후 tombstone까지 **완전히 제거**됩니다.
    - 해당 key에 대한 **어떤 기록도 topic에 남지 않습니다**.
    - 새로운 consumer는 **해당 key가 존재했었는지조차 알 수 없습니다**.
    - **완전한 공간 회수**와 함께 진정한 의미의 삭제가 완료됩니다.


### Log Compaction 과정에서 Tombstone 처리 순서

- **Compaction 대상 식별** : log compaction engine이 **closed segment들을 스캔**하면서 tombstone을 발견합니다.
    - Active segment는 **compaction 대상에서 제외**되므로 최신 tombstone은 보호됩니다.
    - 여러 segment에 걸쳐 **같은 key의 메시지들과 tombstone**을 함께 분석합니다.

- **Key별 메시지 그룹핑** : 동일 key를 가진 **모든 메시지들을 시간 순서로 정렬**합니다.
    - 일반 메시지들 → tombstone 순서로 **timeline을 구성**합니다.
    - Tombstone 이후에 **동일 key의 메시지가 있는 경우** 해당 메시지들은 보존 대상이 됩니다.

- **삭제 대상 결정** : tombstone보다 **낮은 offset을 가진 모든 메시지**를 삭제 대상으로 마킹합니다.
    - Tombstone 자체는 **현재 compaction에서는 보존**됩니다.
    - 삭제 대상 메시지들은 **새로운 segment에 포함되지 않습니다**.

- **새로운 Segment 생성** : tombstone만 포함된 **압축된 segment를 생성**합니다.
    - 전체 data 크기는 **대폭 감소**하지만 삭제 정보는 유지됩니다.
    - Consumer 관점에서는 **동일한 정보**를 얻을 수 있습니다.

    - 교체 과정에서 **consumer의 일관된 읽기**가 보장됩니다.
    - 교체 완료 후에는 **이전 메시지들에 접근할 수 없습니다**.


### Delete Retention 기간의 의미와 필요성

- **Consumer 처리 시간 보장** : 모든 consumer가 tombstone을 **충분히 처리할 수 있는 시간**을 제공합니다.
    - Batch processing이나 **주기적으로 실행되는 consumer**도 삭제 정보를 놓치지 않습니다.
    - Network 장애나 **일시적 consumer 중단** 상황에서도 복구 후 처리가 가능합니다.

- **새로운 Consumer 보호** : retention 기간 중에 **새로 추가되는 consumer**가 올바른 상태를 구성할 수 있습니다.
    - 전체 topic을 처음부터 읽는 경우에도 **삭제된 key들을 정확히 인식**합니다.
    - Scale-out이나 **disaster recovery 상황**에서 일관된 상태 복구가 가능합니다.

- **동일 Key 재생성 구분** : retention 기간 내에 **같은 key로 새로운 메시지**가 오는 경우를 올바르게 처리합니다.
    - 삭제 후 재생성과 **단순한 업데이트를 구분**할 수 있습니다.
    - Business logic에서 **create vs update 구분**이 중요한 경우 정확한 처리가 가능합니다.

- **점진적 정리의 안전장치** : **급작스러운 완전 삭제**로 인한 문제를 방지합니다.
    - 실수로 전송된 tombstone의 **영향을 최소화**할 수 있습니다.
    - 운영상 문제 발생 시 **manual intervention을 위한 시간**을 확보합니다.


---


## Tombstone과 Log Compaction의 상호작용

- Tombstone과 log compaction은 **상호 보완적인 관계**로, 함께 동작해야 완전한 삭제 메커니즘을 구현합니다.
- Log compaction이 **storage 효율성**을 제공한다면, tombstone은 **삭제의 정확성**을 보장합니다.
- 이 둘의 상호작용을 이해하면 **복잡한 삭제 시나리오**에서도 예측 가능한 동작을 설계할 수 있습니다.


### Compaction 과정에서 Tombstone이 다른 메시지에 미치는 영향

- **동일 Key 메시지들의 운명 결정** : tombstone은 **같은 key를 가진 모든 이전 메시지의 제거 여부**를 결정합니다.
    - Tombstone보다 낮은 offset의 메시지들은 **무조건 삭제 대상**이 됩니다.
    - Message의 중요도나 크기와 **관계없이 일괄 삭제**됩니다.
    - 이는 **단순하고 예측 가능한** 삭제 규칙을 제공합니다.

- **다른 Key 메시지들에 대한 영향 없음** : tombstone은 **해당 key에만 영향**을 미치며 다른 key들은 보호됩니다.
    - 같은 partition 내 **다른 key의 메시지들은 일반적인 compaction 규칙**을 따릅니다.
    - Key space의 **독립성이 보장**되어 부분적 삭제가 가능합니다.

- **Compaction 효율성에 미치는 영향** : tombstone은 **compaction 과정을 단순화**합니다.
    - 복잡한 비교 로직 없이 **명확한 삭제 기준**을 제공합니다.
    - Compaction engine이 **빠르게 삭제 대상을 식별**할 수 있습니다.

- **Storage 공간 회수** : tombstone에 의한 삭제로 **즉각적인 공간 절약 효과**를 얻습니다.
    - 대용량 메시지들이 삭제되면 **segment 크기가 대폭 감소**합니다.
    - 삭제된 공간은 **다른 메시지들을 위해 재활용**됩니다.


### 같은 Key를 가진 메시지들과 Tombstone의 관계

- **Timeline 기반 처리** : 같은 key의 메시지들은 **발생 시간 순서에 따라 처리**됩니다.
    - 가장 오래된 메시지부터 **최신 tombstone까지의 timeline**을 구성합니다.
    - 각 메시지의 **상대적 위치**가 삭제 여부를 결정합니다.

- **Tombstone 이전 메시지들** : tombstone보다 **앞서 발생한 모든 메시지**는 삭제됩니다.
    - 생성, 수정, 부분 삭제 등 **어떤 종류의 메시지든 예외 없이 삭제**됩니다.
    - 메시지의 **business 중요도와 무관**하게 temporal order만 고려됩니다.

- **Tombstone 이후 메시지들** : tombstone 다음에 **같은 key로 새로운 메시지**가 오면 삭제 상태가 해제됩니다.
    - 새로운 메시지는 **해당 key의 재생성**을 의미합니다.
    - 이전 tombstone은 **역사적 삭제 기록**이 되고, 새로운 메시지가 현재 상태가 됩니다.

- **복수 Tombstone 처리** : 같은 key에 **여러 개의 tombstone**이 있는 경우 가장 최신 것만 의미를 가집니다.
    - 중간 tombstone들은 **일반적인 compaction 규칙**에 따라 제거됩니다.
    - 최종적으로는 **하나의 tombstone만 남아** 삭제 상태를 표현합니다.


### Compaction 후 상태 변화 과정

- **첫 번째 Compaction 직후** : 해당 key에 대해서는 **tombstone만 남은 상태**가 됩니다.
    - 이전의 모든 data 메시지들이 **물리적으로 제거**됩니다.
    - Topic 크기는 **현저히 감소**하지만 삭제 정보는 보존됩니다.
    - 새로운 consumer는 **tombstone을 통해 삭제 상태를 즉시 인지**합니다.

- **Delete Retention 기간 중** : tombstone이 **삭제 정보의 유일한 source**가 됩니다.
    - 모든 consumer가 **이 tombstone을 기준으로 삭제 처리**를 수행합니다.
    - 동일 key의 **새로운 메시지 여부를 지속적으로 모니터링**합니다.
    - 이 기간이 **안전한 삭제를 위한 최소 보장 시간**입니다.

- **두 번째 Compaction (Tombstone 삭제)** : retention 기간 만료 후 **tombstone 자체도 제거**됩니다.
    - 해당 key에 대한 **모든 흔적이 topic에서 완전히 사라집니다**.
    - Topic에서 **해당 key의 존재 여부를 확인할 방법이 없어집니다**.
    - 새로운 consumer에게는 **처음부터 존재하지 않았던 key**처럼 보입니다.

- **완전 삭제 후 재생성** : tombstone 제거 후 **같은 key로 새로운 메시지**가 오는 경우입니다.
    - 이는 **완전히 새로운 key의 생성**으로 해석됩니다.
    - 이전 삭제 이력과는 **완전히 독립적인** 새로운 lifecycle을 시작합니다.
    - Consumer는 이를 **최초 생성 event**로 처리해야 합니다.


---


## Tombstone을 통한 상태 재구성

- Tombstone의 가장 중요한 활용 사례 중 하나는 **전체 topic을 읽어서 현재 상태를 재구성**하는 것입니다.
- 새로운 consumer나 **장애 복구 후 재시작하는 system**이 올바른 상태를 구성하기 위해 필수적입니다.
- 이 과정에서 tombstone은 **"존재하지 않는 key"를 명확히 식별**하는 역할을 수행합니다.


### Consumer가 전체 Topic을 읽을 때 Tombstone의 역할

- **완전한 상태 스냅샷 제공** : consumer가 topic을 처음부터 끝까지 읽으면서 **모든 key의 최종 상태**를 파악할 수 있게 합니다.
    - 존재하는 key들은 **가장 최신 메시지**를 통해 현재 값을 확인합니다.
    - 삭제된 key들은 **tombstone을 통해 부재 상태**를 확인합니다.
    - 이 둘을 합쳐서 **완전한 key space의 현재 상태**를 구성할 수 있습니다.

- **삭제와 부재의 구분** : tombstone 없이는 **"삭제된 key"와 "처음부터 없던 key"를 구분할 수 없습니다**.
    - Tombstone이 있으면 **"이 key는 과거에 존재했지만 현재는 삭제됨"**을 명확히 알 수 있습니다.
    - 이는 **audit이나 compliance** 관점에서 중요한 정보입니다.
    - Business logic에서 **delete vs never existed** 구분이 필요한 경우 핵심적입니다.

- **효율적인 상태 구성** : tombstone 덕분에 consumer가 **불필요한 처리를 피할 수 있습니다**.
    - 삭제된 key에 대해서는 **복잡한 상태 구성 로직을 수행하지 않아도** 됩니다.
    - Memory나 local storage에서도 **해당 key를 제외**하여 resource를 절약합니다.
    - 전체적으로 **더 빠르고 효율적인 initialization**이 가능합니다.

- **일관된 삭제 인식** : 모든 consumer가 **동일한 삭제 상태**를 인식할 수 있습니다.
    - Consumer group 내 **모든 instance가 같은 상태**를 가지게 됩니다.
    - 시간차를 두고 시작하는 consumer들도 **일관된 결과**를 얻습니다.
    - **분산 환경에서의 상태 일관성**이 자동으로 보장됩니다.


### 과거 메시지 복원 시 Tombstone의 영향

- **완전한 이력 재구성의 한계** : tombstone이 있으면 **해당 key의 과거 이력을 완전히 복원할 수 없습니다**.
    - Log compaction에 의해 **tombstone 이전의 모든 메시지**가 삭제되었기 때문입니다.
    - 삭제된 데이터의 **원본 내용이나 변경 이력**을 확인할 방법이 없습니다.
    - 이는 **audit 요구사항이 있는 시스템**에서는 중요한 제약사항입니다.

- **삭제 시점 정보만 보존** : tombstone을 통해서는 **언제 삭제되었는지**만 알 수 있습니다.
    - Tombstone의 timestamp를 통해 **삭제 발생 시점**을 확인할 수 있습니다.
    - 하지만 **삭제 이유나 삭제된 데이터의 내용**은 알 수 없습니다.
    - **최소한의 삭제 기록**만 유지되는 trade-off가 있습니다.

- **Point-in-time 복원의 복잡성** : 특정 시점의 상태로 복원할 때 **tombstone 처리가 복잡**해집니다.
    - 복원 시점이 **tombstone 이전**이라면 삭제되지 않은 상태로 복원해야 합니다.
    - 하지만 **원본 데이터가 이미 제거**되어 정확한 복원이 불가능할 수 있습니다.
    - 이런 경우를 위해 **별도의 backup 전략**이 필요할 수 있습니다.

- **Incremental 복원의 정확성** : 증분 방식으로 상태를 복원할 때 **tombstone 순서가 중요**합니다.
    - Tombstone을 **올바른 시점에 적용**해야 정확한 상태 재현이 가능합니다.
    - 삭제 후 재생성 시나리오에서는 **각 event의 temporal order**를 엄격히 지켜야 합니다.


### 완전한 상태 스냅샷 구성에서의 Tombstone 활용

- **Key Set 결정 알고리즘** : 전체 topic을 읽으면서 **최종적으로 존재하는 key들의 집합**을 결정합니다.
    - 각 key에 대해 **가장 최신 메시지**를 추적합니다.
    - 최신 메시지가 tombstone이면 **해당 key를 제외**합니다.
    - 최신 메시지가 일반 메시지면 **해당 key와 값을 포함**합니다.

- **Memory 효율적인 처리** : tombstone을 만나면 **즉시 해당 key의 정보를 제거**하여 memory를 절약합니다.
    - 삭제된 key에 대한 **불필요한 data structure 유지를 방지**합니다.
    - 대용량 dataset에서 **memory pressure를 크게 줄일 수 있습니다**.
    - **GC overhead도 감소**시켜 전체적인 성능을 향상시킵니다.

- **상태 검증 메커니즘** : 구성된 상태의 **완전성과 일관성을 검증**할 수 있습니다.
    - Tombstone count와 **실제 삭제 처리 count를 비교**하여 누락을 확인합니다.
    - 예상 key 개수와 **실제 구성된 key 개수를 대조**하여 정확성을 검증합니다.
    - **Checksum이나 hash 기반 검증**도 가능합니다.

- **Snapshot 저장과 복원** : 구성된 상태를 **persistent snapshot으로 저장**할 때도 tombstone 정보를 활용합니다.
    - 삭제된 key들을 **명시적으로 기록**하여 나중에 올바른 복원이 가능하게 합니다.
    - Snapshot 기반 **빠른 초기화**를 구현할 수 있습니다.
    - **Full scan을 피하고 incremental update**만으로 상태를 유지할 수 있습니다.


### 분산 환경에서의 일관된 상태 보장

- **Replication과 Tombstone** : tombstone도 **일반 메시지와 동일한 replication** 메커니즘을 따릅니다.
    - 모든 replica에서 **동일한 tombstone이 동일한 위치**에 저장됩니다.
    - Leader 장애 시에도 **follower가 일관된 삭제 상태**를 유지합니다.
    - **Cross-datacenter replication**에서도 삭제 정보가 정확히 전파됩니다.

- **Consumer Group 내 일관성** : 같은 consumer group의 **모든 instance가 동일한 삭제 인식**을 가집니다.
    - Partition 재분배 시에도 **새로운 consumer가 올바른 삭제 상태**를 인지합니다.
    - **Exactly-once semantics**를 구현할 때도 tombstone 처리가 일관되게 동작합니다.

- **Network Partition 내성** : 일시적인 network 문제가 있어도 **tombstone 정보는 보존**됩니다.
    - **CAP theorem의 Partition tolerance**를 tombstone이 지원합니다.
    - 복구 후 **모든 node가 동일한 삭제 상태로 수렴**합니다.

- **Multi-Region 배포** : 여러 region에 걸친 배포에서도 **tombstone 기반 일관성**이 유지됩니다.
    - **Cross-region replication lag**가 있어도 최종적으로 일관된 상태가 됩니다.
    - **Disaster recovery** 시나리오에서도 삭제 정보가 손실되지 않습니다.


---


## Tombstone 설계 시 고려사항

- Tombstone을 효과적으로 활용하려면 **system 설계 단계에서부터 신중한 고려**가 필요합니다.
- **Business 요구사항과 기술적 제약** 사이의 균형을 맞춰야 합니다.
- 특히 **삭제의 완전성과 복구 가능성** 사이에서 적절한 선택을 해야 합니다.


### 삭제의 완전성 vs 데이터 보존 요구사항

- **완전 삭제가 필요한 경우** : GDPR, CCPA 등 **개인정보보호 규정 준수**가 필요한 상황입니다.
    - 사용자 요청 시 **개인 데이터를 완전히 제거**해야 합니다.
    - Tombstone과 delete retention을 통해 **법적 요구사항을 충족**할 수 있습니다.
    - **Right to be forgotten** 구현의 핵심 메커니즘입니다.

- **Audit 요구사항과의 충돌** : 일부 규제 산업에서는 **삭제 기록도 보존**해야 할 수 있습니다.
    - 금융, 의료 분야에서는 **"무엇이 언제 삭제되었는지"** 기록이 필요합니다.
    - 이 경우 **별도의 audit log system**과 tombstone을 병행 운영해야 합니다.
    - **Tombstone header에 audit 정보**를 포함하는 방법도 고려할 수 있습니다.

- **Business 연속성 고려** : 실수로 삭제된 데이터의 **복구 가능성**도 중요합니다.
    - **Delete retention 기간을 충분히 길게** 설정하여 복구 시간을 확보합니다.
    - **별도의 backup system**과의 연계를 통해 emergency 복구를 준비합니다.
    - **Soft delete + tombstone** 조합으로 단계적 삭제를 구현할 수도 있습니다.


### Performance와 Storage 효율성 균형

- **Tombstone Overhead** : tombstone도 **disk space와 network bandwidth**를 사용합니다.
    - 삭제가 빈번한 system에서는 **tombstone으로 인한 overhead**가 상당할 수 있습니다.
    - **Delete retention 기간**을 적절히 조정하여 불필요한 storage 사용을 최소화해야 합니다.

- **Compaction 성능 영향** : tombstone이 많으면 **log compaction 과정이 복잡**해집니다.
    - 더 많은 **CPU와 memory resource**가 compaction에 필요할 수 있습니다.
    - **Compaction 주기와 tombstone 생성 비율**의 균형을 맞춰야 합니다.

- **Consumer 처리 부하** : 모든 consumer가 **tombstone을 처리하는 logic**을 구현해야 합니다.
    - **추가적인 code complexity**와 처리 시간이 필요합니다.
    - **Null pointer exception 방지**를 위한 defensive programming이 필수입니다.


### 시스템 복잡성과 운영 고려사항

- **Configuration 관리** : tombstone 관련 **다양한 설정값들을 적절히 조정**해야 합니다.
    - `delete.retention.ms`, `min.compaction.lag.ms` 등의 **상호 의존성**을 이해해야 합니다.
    - **환경별로 다른 설정**이 필요할 수 있어 관리 복잡성이 증가합니다.

- **Monitoring과 Alerting** : tombstone 동작을 **지속적으로 모니터링**해야 합니다.
    - **비정상적인 tombstone 생성률**이나 처리 지연을 감지해야 합니다.
    - **Compaction 실패**로 인한 tombstone 누적 문제를 조기에 발견해야 합니다.

- **Debugging 어려움** : tombstone으로 인한 **삭제 문제를 진단하기 어려울 수 있습니다**.
    - 데이터가 **언제, 왜 사라졌는지** 추적하기 복잡합니다.
    - **Log level에서의 debugging tool**과 적절한 logging 전략이 필요합니다.

- **Team 교육** : 개발팀 전체가 **tombstone 개념과 처리 방법**을 숙지해야 합니다.
    - **Consumer 개발 시 tombstone 처리**를 빠뜨리기 쉽습니다.
    - **Code review와 testing 과정**에서 tombstone 시나리오를 반드시 확인해야 합니다.


---


## Reference

- <https://kafka.apache.org/documentation/#compaction>
- <https://cwiki.apache.org/confluence/display/KAFKA/Log+Compaction>
- <https://docs.confluent.io/platform/current/kafka/post-deployment.html#tombstones>

