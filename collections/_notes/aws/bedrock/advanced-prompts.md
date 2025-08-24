---
layout: note
permalink: /374
title: Amazon Bedrock Agent Advanced Prompts
description: Advanced Prompts는 사용자 요청 처리를 Pre-processing(전처리), Orchestration(실행 조율), Post-processing(후처리)의 3단계로 구조화하여 agent의 동작을 세밀하게 제어하는 체계입니다.
date: 2025-08-24
---


## AWS Bedrock Agent의 Advanced Prompt 체계

- AWS Bedrock Agent는 사용자 요청을 처리하는 과정을 **Pre-processing**, **Orchestration**, **Post-processing**의 3단계로 구조화하여 체계적인 AI agent workflow를 구현합니다.
- 각 단계는 독립적인 prompt를 가지며, agent의 동작을 세밀하게 제어할 수 있도록 설계되었습니다.
- 3단계 prompt 체계를 통해 복잡한 business logic과 다양한 use case에 대응할 수 있는 유연성을 제공합니다.


---


## Pre-processing (전처리 단계)

- Pre-processing은 사용자의 원시 입력을 받아 agent가 이해하고 처리할 수 있는 형태로 변환하는 첫 번째 단계입니다.
- 사용자 의도를 분석하고 요청을 분류하여 다음 단계의 처리를 준비합니다.
- input validation과 보안 검증을 수행하여 안전한 처리를 보장합니다.


### 주요 기능과 역할

- **입력 정제** : 사용자 입력에서 불필요한 요소를 제거하고 핵심 내용만 추출합니다.
    - 오타 교정이나 약어 확장 등의 text normalization을 수행합니다.
    - 다국어 입력을 처리하여 agent가 이해할 수 있는 형식으로 변환합니다.

- **의도 파악** : 사용자가 무엇을 원하는지 명확히 식별합니다.
    - 질문, 명령, 정보 요청 등 요청의 type을 분류합니다.
    - 여러 의도가 섞인 복합 요청을 개별 task로 분해합니다.

- **context 수집** : 요청 처리에 필요한 추가 정보를 수집합니다.
    - session history에서 관련 정보를 추출합니다.
    - user profile이나 권한 정보를 확인합니다.

- **보안 검증** : 악의적인 입력이나 부적절한 요청을 filtering합니다.
    - prompt injection 공격을 방지합니다.
    - 민감한 정보 노출을 차단합니다.


### Prompt 작성 예시

```
당신은 입력 전처리 담당자입니다.
사용자의 요청을 분석하여 다음 정보를 추출하세요:
1. 주요 의도 (질문/명령/정보요청)
2. 필요한 entity들 (날짜, 이름, 제품명 등)
3. 처리 우선순위
4. 보안 위험 여부

부적절한 요청은 즉시 차단하고, 
정상 요청은 구조화된 형식으로 변환하세요.
```


---


## Orchestration (실행 조율 단계)

- Orchestration은 전처리된 요청을 바탕으로 실제 작업을 수행하는 핵심 단계입니다.
- 여러 tool이나 knowledge base를 조율하여 요청을 처리하고 결과를 생성합니다.
- agent의 reasoning과 decision making이 이루어지는 중심 단계입니다.


### 핵심 처리 과정

- **작업 계획 수립** : 요청을 처리하기 위한 step-by-step 계획을 생성합니다.
    - 필요한 tool과 resource를 식별합니다.
    - 작업 순서와 dependency를 결정합니다.
    - 각 step의 성공 조건을 정의합니다.

- **Tool 선택과 실행** : 적절한 tool을 선택하여 작업을 수행합니다.
    - API 호출, database query, 계산 등의 action을 실행합니다.
    - 여러 tool의 결과를 조합하여 복합적인 답변을 생성합니다.
    - tool 실행 실패 시 대체 방안을 모색합니다.

- **Knowledge Base 활용** : 저장된 지식을 검색하고 활용합니다.
    - RAG(Retrieval-Augmented Generation) pattern을 구현합니다.
    - 관련 문서나 data를 검색하여 context를 보강합니다.
    - 검색 결과의 relevance를 평가하고 filtering합니다.

- **반복적 처리** : 복잡한 요청을 여러 차례 반복하여 처리합니다.
    - 중간 결과를 평가하고 다음 action을 결정합니다.
    - 필요시 추가 정보를 요청하거나 clarification을 수행합니다.


### Chain of Thought 구현

- Orchestration prompt에서 **Chain of Thought(CoT)** reasoning을 구현하여 복잡한 문제를 단계적으로 해결합니다.
    - 각 단계의 reasoning을 명시적으로 기록합니다.
    - 중간 결과를 검증하고 오류를 수정합니다.
    - 최종 답변에 도달하기까지의 logic flow를 추적합니다.


### Prompt 작성 예시

```
당신은 작업 조율자입니다.
주어진 요청을 처리하기 위해:

1. 먼저 필요한 정보를 knowledge base에서 검색하세요
2. 검색 결과가 불충분하면 외부 API를 호출하세요
3. 각 단계의 결과를 검증하고 다음 action을 결정하세요
4. 모든 정보를 종합하여 완전한 답변을 구성하세요

사용 가능한 도구:
- search_knowledge_base()
- call_external_api()
- calculate()
- validate_result()

각 단계마다 reasoning을 명확히 기록하세요.
```


---


## Post-processing (후처리 단계)

- Post-processing은 orchestration 결과를 사용자에게 전달하기 적합한 형태로 가공하는 마지막 단계입니다.
- 응답의 품질을 향상시키고 사용자 경험을 최적화합니다.
- 최종 검증과 formatting을 수행하여 일관성 있는 응답을 보장합니다.


### 응답 최적화 작업

- **형식 변환** : 원시 결과를 사용자 친화적인 형식으로 변환합니다.
    - JSON data를 자연어로 변환합니다.
    - table이나 list 형태로 구조화합니다.
    - markdown이나 HTML formatting을 적용합니다.

- **품질 개선** : 응답의 가독성과 유용성을 향상시킵니다.
    - 문법과 맞춤법을 교정합니다.
    - 전문 용어를 쉬운 표현으로 설명합니다.
    - 응답 길이를 적절히 조절합니다.

- **개인화** : 사용자별 맞춤 응답을 생성합니다.
    - 사용자의 전문성 수준에 맞춰 설명을 조정합니다.
    - 선호하는 언어나 tone으로 응답을 작성합니다.
    - 이전 대화 context를 반영하여 일관성을 유지합니다.

- **추가 정보 제공** : 응답을 보강하는 부가 정보를 추가합니다.
    - 관련 link나 참고 자료를 첨부합니다.
    - 다음 단계 action을 제안합니다.
    - FAQ나 도움말 정보를 포함합니다.


### 최종 검증 Process

- **정확성 검증** : 응답 내용의 factual accuracy를 확인합니다.
    - 숫자나 날짜 정보의 정확성을 검증합니다.
    - 모순되는 내용이 없는지 확인합니다.

- **완전성 확인** : 사용자 요청이 모두 처리되었는지 검증합니다.
    - 누락된 정보가 없는지 확인합니다.
    - 부분 응답인 경우 명시적으로 표시합니다.

- **compliance 검사** : 정책과 규정을 준수하는지 확인합니다.
    - 민감한 정보가 포함되지 않았는지 검증합니다.
    - 법적, 윤리적 기준을 충족하는지 확인합니다.


### Prompt 작성 예시

```
당신은 응답 최적화 담당자입니다.
주어진 원시 결과를 다음과 같이 처리하세요:

1. 전문 용어를 일반 사용자가 이해할 수 있게 설명
2. 응답을 논리적인 순서로 재구성
3. 핵심 내용을 먼저 제시하고 세부사항은 뒤에 배치
4. 마지막에 요약과 다음 단계 제안 추가

형식 요구사항:
- 명확한 제목과 소제목 사용
- 중요 정보는 bold 처리
- 관련 링크는 하단에 정리

톤과 스타일:
- 친근하고 전문적인 어조 유지
- 간결하면서도 충분한 설명 제공
```


---


## 3단계 Prompt 체계의 장점

- **모듈화된 설계** : 각 단계를 독립적으로 개발하고 유지 보수할 수 있습니다.
    - 특정 단계만 수정해도 전체 system에 영향을 최소화합니다.
    - 단계별로 다른 model이나 logic을 적용할 수 있습니다.

- **세밀한 제어** : agent의 동작을 정밀하게 control할 수 있습니다.
    - 각 단계에서 발생할 수 있는 오류를 개별적으로 처리합니다.
    - business rule을 적절한 단계에 적용하여 효율성을 높입니다.

- **성능 최적화** : 각 단계를 목적에 맞게 최적화할 수 있습니다.
    - Pre-processing에서 불필요한 요청을 early rejection합니다.
    - Orchestration에서 병렬 처리를 통해 응답 시간을 단축합니다.
    - Post-processing에서 caching을 활용하여 반복 작업을 줄입니다.

- **확장성** : 새로운 기능을 쉽게 추가할 수 있습니다.
    - 새로운 tool이나 knowledge base를 orchestration에 통합합니다.
    - 다양한 output format을 post-processing에 추가합니다.


---


## 실제 구현 시 고려 사항

- **Prompt 길이 관리** : 각 단계의 prompt가 token limit을 초과하지 않도록 관리합니다.
    - 핵심 instruction만 포함하고 예시는 최소화합니다.
    - 반복적인 내용은 template으로 관리합니다.

- **Error Handling** : 각 단계에서 발생할 수 있는 오류를 체계적으로 처리합니다.
    - fallback mechanism을 구현하여 service 중단을 방지합니다.
    - 오류 발생 시 사용자에게 명확한 안내를 제공합니다.

- **Monitoring과 Logging** : 각 단계의 성능과 품질을 지속적으로 monitoring합니다.
    - 처리 시간, 성공률, 오류율 등의 metric을 추적합니다.
    - 문제 발생 시 빠른 debugging을 위한 상세 log를 기록합니다.

- **Version 관리** : prompt의 version을 체계적으로 관리합니다.
    - A/B testing을 통해 prompt 개선 효과를 측정합니다.
    - rollback 가능한 deployment strategy를 수립합니다.


---


## Reference

- <https://docs.aws.amazon.com/bedrock/latest/userguide/agents-prompt-templates.html>
- <https://aws.amazon.com/blogs/machine-learning/customize-aws-bedrock-agents-with-advanced-prompts/>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html>

