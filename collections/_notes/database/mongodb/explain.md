---
layout: note
permalink: /260
title: MongoDB Explain - Query 실행 계획 분석하기
description: MongoDB의 explain() method는 query의 실행 계획과 성능 통계를 보여주어 query 최적화에 필수적인 정보를 제공합니다.
date: 2025-11-04
---


## MongoDB Explain

- MongoDB의 `explain()` method는 query가 어떻게 실행되는지에 대한 상세한 정보를 보여줍니다.
    - query 실행 계획(execution plan)을 확인할 수 있습니다.
    - index 사용 여부, 검사한 document 수, 실행 시간 등의 성능 지표를 포함합니다.

- `explain()`은 query 최적화의 핵심 도구입니다.
    - 성능 병목 지점을 파악할 수 있습니다.
    - index가 제대로 사용되고 있는지 확인할 수 있습니다.


---


## Explain 사용 방법

- `explain()` method를 query 끝에 추가하여 실행 계획을 확인합니다.


### 기본 사용법

- query method chain의 마지막에 `explain()`을 추가합니다.

```js
// find query
db.collection.find({ field: value }).explain();

// aggregate query
db.collection.aggregate([
    { $match: { field: value } }
]).explain();

// update query
db.collection.update({ field: value }, { $set: { newField: newValue } }).explain();

// delete query
db.collection.remove({ field: value }).explain();
```


### Explain Mode

- `explain()` method는 `queryPlanner`, `executionStats`, `allPlansExecution` 세 가지 상세도(verbosity) mode를 지원합니다.
    - `queryPlanner`는 계획만 보여주고, `executionStats`는 실제 실행 통계를 포함하며, `allPlansExecution`은 모든 후보 계획을 비교합니다.


#### queryPlanner

- query optimizer가 선택한 실행 계획만 반환합니다.
    - 실제로 query를 실행하지 않습니다.
    - 가장 가벼운 정보만 포함합니다.
    - 기본 mode입니다.

```js
db.users.find({ email: "test@example.com" }).explain("queryPlanner");

// 또는 mode 생략 (기본값)
db.users.find({ email: "test@example.com" }).explain();
```

- 주요 정보는 어떤 index를 사용할 계획인지, 어떤 실행 전략을 선택했는지입니다.

#### executionStats

- query를 실제로 실행하고 성능 통계를 반환합니다.
    - 실행 시간, 검사한 document 수, 반환한 document 수 등을 포함합니다.
    - 성능 분석에 가장 유용한 mode입니다.

```js
db.users.find({ email: "test@example.com" }).explain("executionStats");
```

- 실제 실행 결과를 기반으로 하므로 정확한 성능 측정이 가능합니다.

#### allPlansExecution

- optimizer가 고려한 모든 후보 실행 계획을 반환합니다.
    - 각 계획의 실행 통계를 비교할 수 있습니다.
    - 가장 많은 정보를 포함하지만, 실행 시간이 가장 깁니다.

```js
db.users.find({ email: "test@example.com" }).explain("allPlansExecution");
```

- 여러 index 중 어떤 것이 선택되었는지, 왜 선택되었는지를 분석할 때 유용합니다.


---


## Explain 결과 구조

- `explain()` 결과는 JSON 형식으로 반환되며, `queryPlanner`, `executionStats`, `serverInfo` 세 개의 최상위 field로 구성됩니다.
    - `queryPlanner`는 실행 계획 정보를, `executionStats`는 실행 통계를, `serverInfo`는 server 정보를 담고 있습니다.


### queryPlanner

- query optimizer가 선택한 실행 계획 정보를 담고 있습니다.
    - `winningPlan`에는 선택된 계획이, `rejectedPlans`에는 고려되었지만 선택되지 않은 계획들이 포함됩니다.

```js
{
    "queryPlanner": {
        "namespace": "database.collection",
        "indexFilterSet": false,
        "parsedQuery": { ... },
        "winningPlan": { ... },
        "rejectedPlans": [ ... ]
    }
}
```

- `namespace` : database와 collection 이름입니다.
- `indexFilterSet` : index filter가 적용되었는지 여부입니다.
- `parsedQuery` : 분석된 query 조건입니다.
- `winningPlan` : 선택된 실행 계획입니다.
- `rejectedPlans` : 고려되었지만 선택되지 않은 계획들입니다.


### executionStats

- query 실행 통계를 담고 있으며, 반환된 document 수, 검사한 document 수, 실행 시간 등 성능 분석에 필요한 핵심 지표들을 포함합니다.
    - `executionStats` mode 또는 `allPlansExecution` mode에서만 포함됩니다.

```js
{
    "executionStats": {
        "executionSuccess": true,
        "nReturned": 1,
        "executionTimeMillis": 5,
        "totalKeysExamined": 1,
        "totalDocsExamined": 1,
        "executionStages": { ... }
    }
}
```

- `executionSuccess` : 실행 성공 여부입니다.
- `nReturned` : 반환된 document 수입니다.
- `executionTimeMillis` : 총 실행 시간(milliseconds)입니다.
- `totalKeysExamined` : 검사한 index key 수입니다.
- `totalDocsExamined` : 검사한 document 수입니다.
- `executionStages` : 실행 단계별 상세 정보입니다.


### serverInfo

- MongoDB server 정보를 담고 있으며, host 주소, version, git version 등이 포함됩니다.

```js
{
    "serverInfo": {
        "host": "localhost:27017",
        "version": "7.0.0",
        "gitVersion": "..."
    }
}
```


---


## 실행 계획 읽는 방법

- `explain()` 결과에서 query가 실제로 어떻게 실행되는지 이해하려면 `winningPlan`의 stage 구조와 `executionStages`의 통계를 함께 분석해야 합니다.


### winningPlan 구조

- 선택된 실행 계획의 단계별 구조를 tree 형태로 나타내며, 각 node는 `COLLSCAN`, `IXSCAN`, `FETCH` 같은 실행 단계(stage)를 나타냅니다.

```js
{
    "winningPlan": {
        "stage": "FETCH",
        "inputStage": {
            "stage": "IXSCAN",
            "keyPattern": { "email": 1 },
            "indexName": "email_1"
        }
    }
}
```

- 위는 먼저 index scan(`IXSCAN`)을 수행한 후, document를 가져오는(`FETCH`) 2단계 계획입니다.


### 주요 Stage 종류

- 실행 계획은 `COLLSCAN`, `IXSCAN`, `FETCH`, `SORT` 등 다양한 stage로 구성되며, 각 stage는 query 실행의 특정 단계를 나타냅니다.

#### COLLSCAN

- 전체 collection을 순회하며 검색합니다.
    - index를 사용하지 않는 가장 느린 방식입니다.
    - 대용량 collection에서는 성능 문제를 일으킵니다.

```js
{
    "stage": "COLLSCAN",
    "direction": "forward"
}
```

- `COLLSCAN`이 나타나면 index 추가를 고려해야 합니다.

#### IXSCAN

- index를 사용하여 검색합니다.
    - 효율적인 검색 방식입니다.
    - 어떤 index를 사용했는지 확인할 수 있습니다.

```js
{
    "stage": "IXSCAN",
    "keyPattern": { "email": 1 },
    "indexName": "email_1",
    "isMultiKey": false,
    "direction": "forward",
    "indexBounds": {
        "email": ["[\"test@example.com\", \"test@example.com\"]"]
    }
}
```

- `keyPattern` : index의 key pattern입니다.
- `indexName` : 사용된 index 이름입니다.
- `isMultiKey` : 배열 field에 대한 index인지 여부입니다.
- `indexBounds` : index 검색 범위입니다.

#### FETCH

- index scan 결과를 바탕으로 실제 document를 가져옵니다.
    - `IXSCAN` 다음에 자주 나타납니다.

```js
{
    "stage": "FETCH",
    "inputStage": {
        "stage": "IXSCAN",
        ...
    }
}
```

#### SORT

- 결과를 정렬합니다.
    - memory에서 정렬하는 경우 성능이 저하될 수 있습니다.
    - index를 사용한 정렬이 더 효율적입니다.

```js
{
    "stage": "SORT",
    "sortPattern": { "createdAt": -1 },
    "memLimit": 104857600,
    "type": "simple",
    "inputStage": { ... }
}
```

- `memLimit` : 정렬에 사용할 수 있는 최대 memory입니다.
- index를 사용하면 `SORT` stage 없이 정렬된 결과를 얻을 수 있습니다.

#### LIMIT

- 결과 개수를 제한합니다.

```js
{
    "stage": "LIMIT",
    "limitAmount": 10,
    "inputStage": { ... }
}
```

#### SKIP

- 결과에서 일부를 건너뜁니다.

```js
{
    "stage": "SKIP",
    "skipAmount": 20,
    "inputStage": { ... }
}
```

#### COUNT

- document 개수를 셉니다.

```js
{
    "stage": "COUNT",
    "inputStage": { ... }
}
```

#### TEXT

- text index를 사용한 전문 검색입니다.

```js
{
    "stage": "TEXT",
    "indexPrefix": {},
    "indexName": "content_text",
    "parsedTextQuery": { ... }
}
```

#### AND_SORTED / AND_HASH

- 여러 index scan 결과를 병합합니다.

```js
{
    "stage": "AND_SORTED",
    "inputStages": [
        { "stage": "IXSCAN", ... },
        { "stage": "IXSCAN", ... }
    ]
}
```

#### OR

- 여러 조건의 결과를 합칩니다.

```js
{
    "stage": "OR",
    "inputStages": [
        { "stage": "IXSCAN", ... },
        { "stage": "IXSCAN", ... }
    ]
}
```


---


## 성능 지표 확인 방법

- `executionStats`에서 확인해야 할 핵심 지표는 `nReturned`, `totalDocsExamined`, `totalKeysExamined`, `executionTimeMillis`이며, 이들의 비율과 절댓값을 통해 query의 효율성을 판단합니다.


### nReturned vs totalDocsExamined

- 반환된 document 수 대비 검사한 document 수의 비율로, query의 선택성(selectivity)을 나타냅니다.
    - 이상적으로는 1 : 1 비율에 가까워야 합니다.
    - 비율이 높을수록 불필요한 document를 많이 검사한 것이므로 비효율적입니다.

```js
{
    "nReturned": 1,              // 반환된 document : 1개
    "totalDocsExamined": 1000    // 검사한 document : 1000개
}
// 1000개를 검사해서 1개만 반환 (매우 비효율적)
```

- 비율이 높으면 index 추가 또는 query 조건 개선이 필요합니다.


### nReturned vs totalKeysExamined

- 반환된 document 수 대비 검사한 index key 수의 비율로, index의 선택성을 나타냅니다.
    - index를 사용하는 경우의 효율성을 보여줍니다.

```js
{
    "nReturned": 10,
    "totalKeysExamined": 10,
    "totalDocsExamined": 10
}
// 매우 효율적 (1 : 1 : 1 비율)
```


### executionTimeMillis

- query 실행에 걸린 총 시간(밀리초)으로, query 성능의 절대적 기준입니다.
    - 일반적으로 100ms 이하가 적절합니다.
    - 1000ms(1초) 이상이면 심각한 성능 문제입니다.

```js
{
    "executionTimeMillis": 5  // 5ms (빠름)
}
```

```js
{
    "executionTimeMillis": 1500  // 1.5초 (느림)
}
```

- 실행 시간이 길면 최적화가 필요합니다.


### 단계별 상세 통계

- `executionStages`는 각 stage에서 몇 개의 document를 검사했는지, 얼마나 시간이 걸렸는지 등 stage별 상세 통계를 보여주어 병목 지점을 파악할 수 있게 합니다.

```js
{
    "executionStages": {
        "stage": "FETCH",
        "nReturned": 1,
        "executionTimeMillisEstimate": 0,
        "works": 2,
        "advanced": 1,
        "needTime": 0,
        "needYield": 0,
        "docsExamined": 1,
        "inputStage": {
            "stage": "IXSCAN",
            "nReturned": 1,
            "executionTimeMillisEstimate": 0,
            "works": 2,
            "advanced": 1,
            "keysExamined": 1,
            "indexName": "email_1"
        }
    }
}
```

- `nReturned` : 해당 stage에서 반환한 document 수입니다.
- `executionTimeMillisEstimate` : 해당 stage의 예상 실행 시간입니다.
- `works` : query executor가 수행한 작업 단위 수입니다.
- `advanced` : 다음 stage로 전달한 결과 수입니다.
- `needTime` : 추가 처리가 필요했던 횟수입니다.
- `docsExamined` : 검사한 document 수입니다.
- `keysExamined` : 검사한 index key 수입니다.


---


## 실전 활용 사례

- 실제로 성능 문제가 발생하는 대표적인 상황들(index 누락, 비효율적 정렬, regex 검색 등)에서 `explain()` 결과를 분석하고 개선하는 방법을 보여줍니다.


### Index가 없는 경우

- index가 없어서 `COLLSCAN`이 발생하고, 전체 collection을 순회하여 성능이 저하되는 사례입니다.

```js
// query
db.users.find({ email: "test@example.com" }).explain("executionStats");

// 결과
{
    "queryPlanner": {
        "winningPlan": {
            "stage": "COLLSCAN",  // 전체 collection scan
            "direction": "forward"
        }
    },
    "executionStats": {
        "nReturned": 1,
        "executionTimeMillis": 250,  // 느림
        "totalDocsExamined": 100000  // 100,000개 검사
    }
}
```

- `COLLSCAN`이 발생하고 있습니다.
    - 100,000개 document를 검사해서 1개만 반환했습니다.
    - 실행 시간이 250ms로 느립니다.

- index를 추가하여 개선합니다.

```js
// index 생성
db.users.createIndex({ email: 1 });

// 다시 확인
db.users.find({ email: "test@example.com" }).explain("executionStats");

// 개선된 결과
{
    "queryPlanner": {
        "winningPlan": {
            "stage": "FETCH",
            "inputStage": {
                "stage": "IXSCAN",  // index 사용
                "indexName": "email_1"
            }
        }
    },
    "executionStats": {
        "nReturned": 1,
        "executionTimeMillis": 2,   // 빠름
        "totalKeysExamined": 1,     // 1개만 검사
        "totalDocsExamined": 1      // 1개만 검사
    }
}
```


### 정렬 최적화

- `SORT` stage가 나타나 memory에서 정렬이 발생하는 경우, compound index를 추가하여 정렬을 제거하는 사례입니다.

```js
// query
db.products.find({ category: "electronics" })
    .sort({ price: -1 })
    .limit(10)
    .explain("executionStats");

// index 없는 경우
{
    "winningPlan": {
        "stage": "LIMIT",
        "inputStage": {
            "stage": "SORT",  // memory에서 정렬
            "sortPattern": { "price": -1 },
            "memLimit": 104857600,
            "inputStage": {
                "stage": "FETCH",
                "inputStage": {
                    "stage": "IXSCAN",
                    "indexName": "category_1"
                }
            }
        }
    },
    "executionStats": {
        "nReturned": 10,
        "executionTimeMillis": 150,  // 느림
        "totalDocsExamined": 5000    // 많은 document 검사
    }
}
```

- memory에서 정렬(`SORT` stage)이 발생합니다.
    - 5,000개 document를 검사하여 정렬 후 10개만 반환합니다.

- compound index로 개선합니다.

```js
// compound index 생성
db.products.createIndex({ category: 1, price: -1 });

// 다시 확인
db.products.find({ category: "electronics" })
    .sort({ price: -1 })
    .limit(10)
    .explain("executionStats");

// 개선된 결과
{
    "winningPlan": {
        "stage": "LIMIT",
        "inputStage": {
            "stage": "FETCH",
            "inputStage": {
                "stage": "IXSCAN",  // index로 정렬된 순서대로 읽음
                "indexName": "category_1_price_-1"
            }
        }
    },
    "executionStats": {
        "nReturned": 10,
        "executionTimeMillis": 5,    // 빠름
        "totalDocsExamined": 10      // 10개만 검사
    }
}
```

- `SORT` stage가 사라졌습니다.
    - index가 이미 정렬된 순서로 data를 제공합니다.
    - 10개만 검사하고 바로 반환합니다.


### Covered Query

- projection을 사용하여 index만으로 모든 data를 제공하고, `FETCH` stage를 제거하여 성능을 극대화하는 사례입니다.

```js
// query (projection 사용)
db.users.find(
    { email: "test@example.com" },
    { email: 1, _id: 0 }
).explain("executionStats");

// index 생성
db.users.createIndex({ email: 1 });

// 결과
{
    "winningPlan": {
        "stage": "PROJECTION_COVERED",  // covered query
        "transformBy": { "email": 1, "_id": 0 },
        "inputStage": {
            "stage": "IXSCAN",
            "indexName": "email_1"
        }
    },
    "executionStats": {
        "nReturned": 1,
        "executionTimeMillis": 1,
        "totalKeysExamined": 1,
        "totalDocsExamined": 0  // document를 전혀 검사하지 않음
    }
}
```

- `totalDocsExamined`가 0입니다.
    - index만으로 모든 data를 제공했습니다.
    - `FETCH` stage가 없어 더 빠릅니다.


### Regex 검색

- 정규 표현식 검색에서 prefix pattern(`^`)이 있으면 index를 활용하지만, 없으면 `COLLSCAN`이 발생하는 사례입니다.

```js
// prefix 검색
db.products.find({ name: /^Apple/ }).explain("executionStats");

// index 있는 경우
{
    "winningPlan": {
        "stage": "FETCH",
        "inputStage": {
            "stage": "IXSCAN",  // index 사용
            "indexName": "name_1",
            "indexBounds": {
                "name": ["[\"Apple\", \"Applf\")"]  // 범위 검색
            }
        }
    },
    "executionStats": {
        "nReturned": 50,
        "executionTimeMillis": 10,
        "totalKeysExamined": 50,
        "totalDocsExamined": 50
    }
}
```

- prefix 검색(`^`)은 index를 활용합니다.

```js
// 중간 문자열 검색
db.products.find({ name: /iPhone/ }).explain("executionStats");

// 결과
{
    "winningPlan": {
        "stage": "COLLSCAN",  // collection scan
        "filter": { "name": { "$regex": "iPhone" } }
    },
    "executionStats": {
        "nReturned": 20,
        "executionTimeMillis": 200,  // 느림
        "totalDocsExamined": 10000   // 전체 검사
    }
}
```

- prefix가 없는 regex는 index를 사용하지 못합니다.
    - text index를 고려해야 합니다.


---


## 성능 최적화를 위한 확인 사항

- `explain()` 결과를 분석할 때 확인해야 할 주요 항목들을 stage 종류, document 검사 비율, 실행 시간, index 효율성, covered query 가능 여부 순서로 점검합니다.


### Stage 종류 확인

- 실행 계획에 나타나는 stage를 확인하여 `COLLSCAN`이나 `SORT` 같은 비효율적인 stage가 있는지 파악합니다.

- `COLLSCAN`이 나타나는가?
    - YES : index 추가를 고려합니다.
    - NO : 다음 항목을 확인합니다.

- `IXSCAN`이 나타나는가?
    - YES : 올바른 index를 사용하는지 확인합니다.
    - NO : index가 없거나 query가 index를 활용하지 못하는 형태입니다.

- `SORT` stage가 나타나는가?
    - YES : 정렬을 위한 compound index 추가를 고려합니다.
    - NO : 정렬이 index를 통해 이루어지고 있습니다.


### Document 검사 비율 확인

- `totalDocsExamined`와 `nReturned`의 비율을 확인하여 query가 얼마나 많은 불필요한 document를 검사하는지 파악합니다.

- `totalDocsExamined` / `nReturned` 비율은 어떤가?
    - 1 : 1에 가까운가?
        - YES : 효율적입니다.
        - NO : index 개선이 필요합니다.
    - 10 : 1 이상인가?
        - YES : 심각한 비효율입니다. index 추가 또는 query 조건 개선이 필요합니다.


### 실행 시간 확인

- `executionTimeMillis`를 확인하여 query가 허용 가능한 시간 내에 완료되는지 판단합니다.

- `executionTimeMillis`가 100ms 이하인가?
    - YES : 일반적으로 적절합니다.
    - NO : 최적화가 필요합니다.

- 1000ms(1초) 이상인가?
    - YES : 심각한 성능 문제입니다. 즉시 개선이 필요합니다.


### Index 효율성 확인

- `totalKeysExamined`와 `nReturned`의 비율을 확인하여 index가 얼마나 효율적으로 사용되는지 파악합니다.

- `totalKeysExamined` / `nReturned` 비율은 어떤가?
    - 1 : 1에 가까운가?
        - YES : index가 효율적으로 사용되고 있습니다.
    - 크게 차이나는가?
        - YES : index가 비효율적이거나 부적절합니다.


### Covered Query 가능 여부 확인

- `totalDocsExamined`가 0인지 확인하여 index만으로 query를 처리할 수 있는지 파악합니다.

- `totalDocsExamined`가 0인가?
    - YES : covered query입니다. 최적의 성능입니다.
    - NO : document를 읽어야 합니다.

- projection을 사용하여 covered query로 만들 수 있는가?
    - YES : projection을 추가하여 성능을 개선할 수 있습니다.


---


## 주의 사항

- `explain()`을 사용할 때 실행 mode에 따라 실제로 write가 수행될 수 있고, cache나 production 환경의 영향을 고려해야 하며, index 선택이 동적으로 변할 수 있다는 점을 유의해야 합니다.


### 실행 Mode에 따른 영향

- `executionStats`와 `allPlansExecution` mode는 실제로 query를 실행하므로, write 작업의 경우 실제 data가 변경됩니다.

```js
// 이 명령은 실제로 document를 삭제합니다
db.users.remove({ email: "test@example.com" }).explain("executionStats");
```

- write 작업의 계획만 보려면 `queryPlanner` mode를 사용합니다.

```js
// 실제로 삭제하지 않고 계획만 확인
db.users.remove({ email: "test@example.com" }).explain("queryPlanner");
```


### Cache 영향

- MongoDB는 query plan을 caching하므로, 첫 실행과 이후 실행의 성능이 다를 수 있습니다.
    - 정확한 측정을 위해 여러 번 실행하여 평균을 확인합니다.


### Production 환경 주의

- production 환경에서는 `explain()`이 실제 query를 실행하여 부하를 유발할 수 있으므로 주의가 필요합니다.
    - `executionStats` mode는 query를 실제로 실행하므로 부하를 유발합니다.
    - 대용량 collection에서는 실행 시간이 길어질 수 있습니다.

- 가능하면 개발 환경이나 복제본에서 test합니다.


### Index 선택 변경

- MongoDB는 query pattern과 data 분포에 따라 동적으로 최적의 index를 선택하므로, 시간이 지나면 선택되는 index가 달라질 수 있습니다.
    - data 분포가 변경되면 선택되는 index가 바뀔 수 있습니다.
    - 주기적으로 확인이 필요합니다.


---


## Explain 활용 전략

- 개발 단계에서 query 작성 시, index 설계 시, 성능 문제 해결 시, 정기 monitoring 시 등 각 상황에 맞게 `explain()`을 활용하는 구체적인 방법입니다.


### 개발 단계에서 활용

- 새로운 query를 작성할 때마다 `explain()`으로 성능을 미리 확인하여 문제를 조기에 발견합니다.
    - index가 사용되는지 확인합니다.
    - 성능이 예상과 일치하는지 확인합니다.


### Index 설계에 활용

- index 추가 전후로 `explain()`을 실행하여 index의 실제 효과를 측정하고, 불필요한 index를 방지합니다.
    - index가 실제로 사용되는지 확인합니다.
    - 성능이 개선되었는지 확인합니다.


### 성능 문제 해결에 활용

- 느린 query가 보고되면 `explain()`으로 원인(COLLSCAN, 높은 document 검사 비율, 비효율적 정렬 등)을 정확히 파악합니다.
    - `COLLSCAN`이 발생하는지 확인합니다.
    - document 검사 비율이 높은지 확인합니다.
    - 실행 시간이 어느 stage에서 많이 소요되는지 확인합니다.


### 정기적인 Monitoring에 활용

- production 환경의 주요 query들을 정기적으로 `explain()`으로 점검하여 data 증가나 변경에 따른 성능 저하를 조기에 발견합니다.
    - data 증가에 따른 성능 변화를 tracking합니다.
    - index 효율성을 monitoring합니다.


---


## Reference

- <https://www.mongodb.com/docs/manual/reference/explain-results/>
- <https://www.mongodb.com/docs/manual/reference/method/cursor.explain/>
- <https://www.mongodb.com/docs/manual/tutorial/analyze-query-plan/>

