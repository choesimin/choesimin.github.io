---
layout: note
permalink: /373
title: Amazon Bedrock Agent Session Summarization
description: Session Summarization은 긴 대화를 자동으로 요약하여 context window를 효율적으로 관리하면서도 중요한 정보는 보존하는 memory 최적화 기능입니다.
date: 2025-08-24
---


## 대화를 요약하여 효율적으로 관리하기

- Session Summarization은 Bedrock Agent의 **Memory 기능**을 활성화했을 때 사용할 수 있는 대화 요약 mechanism입니다.
- 긴 대화 session을 자동으로 요약하여 context window를 효율적으로 관리하고, 대화의 연속성을 유지합니다.
- Memory 기능과 함께 작동하여 agent가 이전 대화 내용을 기억하고 활용할 수 있도록 지원합니다.


---


## Session Summarization의 작동 원리

- 대화가 길어지면 전체 history를 매번 전송하는 것이 비효율적이므로, 중간 요약을 생성하여 context를 압축합니다.
- 설정된 threshold를 초과하면 자동으로 이전 대화를 요약하고, 요약본과 최근 대화만 유지합니다.
- 요약 과정에서 중요한 정보는 보존하고 반복적이거나 불필요한 내용은 제거합니다.


### 요약 Trigger 조건

- **Message 수 기준** : 대화 turn이 특정 개수를 초과하면 요약을 시작합니다.
    - 기본값은 보통 10-20개 turn으로 설정됩니다.
    - business 요구 사항에 따라 조정 가능합니다.

- **Token 수 기준** : context window의 일정 비율을 초과하면 요약을 실행합니다.
    - model의 최대 token limit의 70-80% 도달 시 작동합니다.
    - 안전 margin을 확보하여 overflow를 방지합니다.

- **시간 기준** : 일정 시간이 경과하면 자동으로 요약합니다.
    - session timeout 전에 중간 요약을 생성합니다.
    - 장시간 대화에서 memory 효율성을 유지합니다.


### 요약 생성 Process

1. **정보 추출** : 대화에서 핵심 정보를 식별하고 추출합니다.
    - 사용자의 주요 요청과 의도를 파악합니다.
    - agent가 제공한 중요한 답변과 결정 사항을 기록합니다.
    - 약속, 날짜, 숫자 등 구체적인 정보를 보존합니다.

2. **중요도 평가** : 각 대화 내용의 중요도를 평가합니다.
    - business critical한 정보는 높은 우선순위로 처리합니다.
    - 인사말이나 확인 응답 등은 낮은 우선순위로 분류합니다.

3. **요약문 생성** : 구조화된 요약을 생성합니다.
    - 시간 순서를 유지하면서 내용을 압축합니다.
    - 논리적 흐름이 끊기지 않도록 연결성을 보장합니다.

4. **검증과 보정** : 생성된 요약의 품질을 확인합니다.
    - 원본 대화의 의미가 왜곡되지 않았는지 검증합니다.
    - 누락된 중요 정보가 없는지 확인합니다.


---


## Memory와의 통합 구조

- Session Summarization은 Memory 기능의 핵심 component로 작동하여 장기 대화를 가능하게 합니다.
- 요약된 내용은 memory store에 저장되어 future session에서도 참조 가능합니다.
- 계층적 memory 구조를 통해 단기 memory와 장기 memory를 효과적으로 관리합니다.


### Memory 계층 구조

- **Working Memory** : 현재 대화의 최근 message들을 저장합니다.
    - 즉각적인 context 참조를 위해 full text를 유지합니다.
    - 빠른 access를 위해 cache에 보관합니다.

- **Session Memory** : 현재 session의 요약 정보를 저장합니다.
    - 대화 시작부터 현재까지의 축약된 history를 포함합니다.
    - 중간 요약과 최근 대화를 조합하여 관리합니다.

- **Long-term Memory** : 여러 session에 걸친 정보를 저장합니다.
    - 사용자별 preference와 history를 유지합니다.
    - knowledge graph 형태로 구조화하여 저장합니다.


### Memory 저장 형식 1 : Structured Format

- JSON이나 XML 형태로 구조화하여 저장합니다.

```json
{
  "session_id": "sess_12345",
  "user_id": "user_67890",
  "summary": {
    "key_topics": ["주문 문의", "배송 일정"],
    "decisions": ["환불 승인", "익일 재배송"],
    "context": "고객이 손상된 제품을 받아 환불 요청"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Memory 저장 형식 2 : Vector Embedding

- semantic search를 위해 vector로 변환하여 저장합니다.
- 유사한 대화나 주제를 빠르게 검색할 수 있습니다.
- RAG pattern과 결합하여 관련 memory를 retrieve합니다.


---


## Summarization Prompt 설정

- Session Summarization을 위한 전용 prompt를 설정하여 요약 품질을 제어합니다.
- 요약의 길이, 스타일, 포함할 정보 type을 세밀하게 지정합니다.
- domain specific한 요구 사항을 반영하여 customization합니다.


### Prompt Template 예시

```
대화 내용을 다음 기준으로 요약하세요:

필수 포함 정보:
- 사용자의 주요 요청과 목적
- 제공된 해결책이나 답변
- 약속된 후속 조치
- 중요한 날짜, 시간, 금액

요약 형식:
- 최대 200 단어 이내
- 시간 순서대로 정리
- 객관적이고 사실 중심적 서술

제외할 내용:
- 일반적인 인사말
- 반복된 확인 응답
- 부수적인 대화 내용

특별 지시사항:
- 고객 불만 사항은 상세히 기록
- 금전적 거래는 정확한 금액 포함
- 개인 정보는 anonymize 처리
```


### Domain별 Customization

- **Customer Service** : 문제 해결 과정과 고객 만족도를 중점적으로 요약합니다.
    - 초기 문제, 해결 과정, 최종 결과를 명확히 기록합니다.
    - 고객의 감정 상태와 만족도를 포함합니다.

- **Technical Support** : 기술적 문제와 해결 방법을 상세히 기록합니다.
    - error message, log, configuration 정보를 정확히 보존합니다.
    - 시도한 troubleshooting step을 순서대로 기록합니다.

- **Sales Consultation** : 고객 needs와 제안된 solution을 중심으로 요약합니다.
    - 예산, 요구 사항, 제약 조건을 명시합니다.
    - 제안된 product나 service와 가격 정보를 포함합니다.


---


## 성능 최적화 전략

- Session Summarization의 성능을 최적화하여 latency를 최소화하고 품질을 극대화합니다.
- 실시간 처리와 batch 처리를 적절히 조합하여 system 부하를 분산합니다.
- cache와 pre-computation을 활용하여 응답 속도를 향상시킵니다.


### Incremental Summarization

- **Progressive Update** : 전체를 다시 요약하지 않고 증분만 처리합니다.
    - 이전 요약에 새로운 대화 내용만 추가로 통합합니다.
    - computing resource를 절약하고 처리 시간을 단축합니다.

- **Sliding Window** : 일정 구간만 유지하며 오래된 내용은 제거합니다.
    - 최근 N개의 turn만 상세히 유지합니다.
    - 오래된 내용은 high-level 요약으로만 보관합니다.


### Parallel Processing

- **Async 처리** : 요약 생성을 background에서 비동기로 수행합니다.
    - 사용자 응답을 block하지 않고 처리합니다.
    - queue system을 활용하여 작업을 분산합니다.

- **Batch 요약** : 여러 session을 모아서 한 번에 처리합니다.
    - GPU utilization을 최적화합니다.
    - 비용 효율성을 향상시킵니다.


---


## 구현 시 주의 사항

- **정보 손실 방지** : 요약 과정에서 critical information이 손실되지 않도록 validation을 수행합니다.
    - 요약 전후의 key information을 비교 검증합니다.
    - 중요도가 높은 정보는 별도로 보관합니다.

- **Privacy 보호** : 개인 정보가 요약에 포함되는 방식을 제어합니다.
    - PII(Personally Identifiable Information)를 자동으로 masking합니다.
    - 규정 준수를 위한 data retention policy를 적용합니다.

- **일관성 유지** : 여러 번의 요약이 누적되어도 context가 왜곡되지 않도록 관리합니다.
    - 요약의 요약이 반복되는 것을 방지합니다.
    - 원본 대화를 주기적으로 참조하여 정확성을 검증합니다.

- **Fallback 전략** : 요약 실패 시 대체 방안을 준비합니다.
    - 요약 생성 실패 시 원본 대화를 그대로 사용합니다.
    - emergency truncation으로 최소한의 context를 보장합니다.


---


## Reference

- <https://docs.aws.amazon.com/bedrock/latest/userguide/agents-memory.html>
- <https://aws.amazon.com/blogs/machine-learning/enhance-conversational-ai-with-memory-in-amazon-bedrock-agents/>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html>

