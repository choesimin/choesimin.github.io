---
layout: skill
permalink: /136
title: ksqlDB의 Join - Stream과 Table의 실시간 결합
description: ksqlDB는 Stream-Stream, Stream-Table, Table-Table 간의 Join을 지원하여 실시간 data를 실시간으로 결합할 수 있습니다.
date: 2025-01-07
---


## Join : 실시간 Data를 실시간으로 결합하기

- ksqlDB는 **Stream-Stream, Stream-Table, Table-Table 간의 Join 기능**을 제공하고 있습니다.

```txt
ksqlDB의 Join = raw event data + contextual data = Meaningful Business Data
```

- ksqlDB의 Join은 **실시간으로 흐르는 raw event data에 contextual data(문맥 정보)를 결합하는 mechanism**입니다. 
    - 일반적으로 streaming system에서 흐르는 event data는 경량화와 처리 효율성을 위해 최소한의 필수 정보만을 포함합니다.
    - 하지만 이러한 raw data만으로는 실질적인 business 의사결정이나 분석에 필요한 충분한 정보를 갖지 못합니다.
    - 이때 Join을 통해 이 raw event에 **부가적인 문맥 정보(contextual data)를 실시간으로 보강**할 수 있습니다.
    - 기존 batch 처리 방식과 달리 **event가 발생하는 즉시 필요한 정보가 결합**됩니다.

- ksqlDB Join의 핵심은 **상태 관리**(state management)입니다.
    - streaming system에서는 지속적으로 data가 흐르기 때문에, Join에 필요한 data의 상태를 계속해서 추적하고 관리해야 합니다.
    - ksqlDB는 이러한 상태 관리를 자동으로 처리하며, 이를 통해 개발자는 복잡한 상태 관리 logic을 직접 구현할 필요 없이 business logic에 집중할 수 있습니다.

- 따라서 ksqlDB의 Join은 단순한 data 결합 이상의 의미를 가집니다.
    - 실시간 streaming 환경에서 raw data를 의미있는 business data로 변환하는 **실시간 data 보강(real-time data enrichment) mechanism**이라고 할 수 있습니다.

- ksqlDB의 Join은 기능적으로는 RDBMS의 Join과 유사하지만, 서로 완전히 다른 개념입니다.
    - **ksqlDB의 Join은 data streaming 환경에서 실시간 data 처리와 결합을 위해 설계된 개념**으로, 전통적인 RDBMS의 정적 data 결합과는 다른 paradigm을 가지고 있습니다.

| 비교 항목 | RDBMS | ksqlDB | 설명 |
| 