---
layout: skill
permalink: /56
title: Stream Data Processing - 실시간으로 들어오는 정보 처리하기
description: Stream Data Processing은 끊임없이 발생하는 정보를 실시간으로 처리하는 방식입니다.
date: 2024-12-26
---


## Stream Data Processing : 끊임없이 발생하는 정보를 실시간으로 처리하기

- **실시간 stream data을 정제하는 작업**은 stream 처리 방식의 ETL(Extract, Transform, Load) 과정 중 **Transform(변환) 단계**와 관련이 깊습니다.

- Stream Data Processing은 기업의 운영 방식과 경쟁력에 근본적인 변화를 가져올 수 있습니다.
    - stream 처리를 통해 data가 생성되자마자 분석 system에 data를 공급할 수 있습니다.
        - 기업은 거의 실시간으로 핵심적인 통찰력(insight)을 얻을 수 있습니다.
    - 실시간 의사 결정, 즉각적인 고객 대응, 실시간 위험 감지 등의 이점을 얻을 수 있습니다.


### Stream Processing 도구 선택하기

- data 처리를 위해서 이미 수많은 도구들이 존재하며, 개발자는 목적에 맞는 도구를 잘 선택하는 것이 중요합니다.
- 개발자는 실시간으로 data를 공급하기 위해 업무의 요건과 난이도에 따라서 data pipeline을 설계합니다.
- data의 종류에 적합한 data 처리 방식을 채택하고, 빠른 처리를 위해 더 많은 resource를 할당하기도 합니다.
- data 처리를 위한 도구들은 각각의 특성과 장단점이 있으므로, project의 요구 사항과 운영 환경에 맞춰 적절한 도구를 선택해야 합니다.
    - 업무의 편의성과 복잡성의 수준에 따라 사용하기에 적합한 기술이 달라집니다.


### Stream Processing이 Batch Processing보다 기술적으로 더 어려운 이유

- **streaming 환경은 실시간으로 결과를 반영**해야 하기 때문에, **지연(latency)이 허용되지 않습니다.**
    - 전통적인 batch ETL 방식에서는 data가 일정 기간 동안 축적된 후 처리되며, 통상적으로 몇시간 이상의 data 지연(latency)이 존재합니다.

1. **Data Join의 복잡성** : 실시간으로 들어오는 data를 join하기 위해 **Stream Join이라는 새로운 paradigm이 필요**합니다.
    - 기존 data와 join해야 할 경우, 전통적인 database join 방식으로는 처리가 불가능합니다.
    - 새로운 Memory 관리 방식, 새로운 상태 저장 방식이 필요합니다.

2. **Resource 할당 방식** : streaming 환경에서는 지속적으로 높은 수준의 computing resource을 유지해야 하며, 이는 system architecture와 비용 구조에 큰 영향을 미칩니다.
    - batch 처리에서는 필요한 시점에 대량의 computing resource을 일시적으로 할당할 수 있었습니다.

3. **오류 처리의 중요성** : 실시간 streaming에서는 data 손실이나 처리 지연이 즉각적인 business 영향으로 이어질 수 있어, 훨씬 더 정교한 error 처리와 복구 mechanism이 필요합니다.
    - batch 처리에서는 error가 발생하면 전체 batch를 재실행할 수 있었습니다. 


