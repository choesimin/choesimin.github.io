---
layout: skill
permalink: /161
title: ETL과 ELT의 차이
description: ETL은 추출, 변환, 적재 순서로 data를 처리하고, ELT는 추출, 적재, 변환 순서로 data를 처리합니다.
date: 2024-12-21
---


## ETL과 ELT

```mermaid
flowchart LR
    subgraph etl[ETL Process]
        direction LR
        e1[추출 Extract] --> t1[변환 Transform]
        t1 --> l1[적재 Load]
    end
    
    subgraph elt[ELT Process]
        direction LR
        e2[추출 Extract] --> l2[적재 Load]
        l2 --> t2[변환 Transform]
    end
```

- **Extract** (추출) : 원본 database 또는 data source에서 data를 가져오는 과정입니다.
- **Transform** (변환) : data의 구조를 변경하는 과정입니다.
    - 용도에 맞는 filtering, reshaping, 정제 등의 단계를 통해 필요한 형태로 변환합니다.
- **Load** (적재) : data를 storage에 저장하는 과정입니다.

|  | ETL | ELT |
| 