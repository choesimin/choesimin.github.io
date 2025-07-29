---
layout: note
permalink: /367
title: Prompt Architecture - AI에게 체계적으로 지시할 수 있는 10가지 방법
description: AI와의 상호작용에서 명확하고 관련성 높은 응답을 얻기 위해서는 prompt를 목적에 맞춰 잘 구조화하는 것이 중요하며, 이를 위한 다양한 prompt architecture가 개발되고 있습니다.
date: 2025-07-29
---


## 구조화 전략으로 AI와 효과적으로 상호작용하기

- Prompt Architecture는 **AI로부터 원하는 결과를 얻기 위해 역할, 맥락, 목표 등을 체계적으로 구조화하는 전략**입니다.
    - AI model에 대한 구조화된 접근 방식이 결과물의 품질을 크게 향상시킨다는 것이 확인되었습니다.
- 무작정 질문하는 것보다 **체계적인 framework를 활용할 때 더 정확하고 유용한 결과**를 얻을 수 있으며, **재사용 가능한 template을 구축**하여 작업 효율성을 높일 수 있습니다.
- 각 framework는 **특정 상황과 목적에 최적화**되어 있으며, client-side UI 개발에서 전략 표기법을 기반으로 한 form rendering system에 활용되는 등 **실무에서 즉시 적용 가능한 실용적 방법론**입니다.


---


## 1. Role, Task, Format (RTF) Framework

- **역할 정의, 작업 명시, 형식 지정**의 3단계로 구성된 **가장 기본적인 framework**입니다.

> "역사 교사로서, 고등학생이 이해할 수 있는 방식으로 제1차 세계대전의 원인을 bullet point list로 설명해주세요."

- **Role** : AI가 수행해야 할 역할을 명확히 정의합니다.
    - "교사로서", "project manager로서", "software 개발자로서" 등의 구체적인 역할을 부여합니다.
- **Task** : AI가 수행해야 할 구체적인 작업을 명시합니다.
    - "광합성 과정을 설명하세요", "project 계획을 outline하세요", "Python 함수를 작성하세요" 등의 명확한 지시 사항을 제공합니다.
- **Format** : 응답 형식을 구체적으로 지정합니다.
    - "단계별 guide로", "bullet point list로", "주석이 포함된 code로" 등의 형식을 요구합니다.


---


## 2. Context, Input, Output (CIO) Framework

- **맥락 제공, 입력 data 명시, 출력 요구 사항 정의**로 구성된 **data 중심적 framework**입니다.

> "젊은 성인을 대상으로 하는 marketing campaign을 위해, 제품의 친환경적 특징을 강조하는 social media post를 작성해주세요."

- **Context** : AI가 이해해야 할 배경이나 상황을 제공합니다.
    - "business meeting에서", "programming 초보자를 위해" 등의 상황적 맥락을 설정합니다.
- **Input** : AI가 고려해야 할 입력 data나 정보를 명시합니다.
    - "다음 data를 활용하여", "Python 언어를 사용하여" 등의 구체적인 입력 조건을 제시합니다.
- **Output** : AI가 생성해야 할 결과물을 정의합니다.
    - "요약을 작성하세요", "해결책을 제시하세요", "간단한 보고서를 작성하세요" 등의 출력 요구 사항을 명시합니다.


---


## 3. Problem, Solution, Execution (PSE) Framework

- **문제 정의, 해결책 요청, 실행 방법 안내**로 구성된 **문제 해결 중심 framework**입니다.

> "우리 website의 loading 시간이 매우 느립니다. 이를 개선하려면 어떻게 해야 하나요? 단계별 guide를 제공해주세요."

- **Problem** : 해결해야 할 문제나 도전 과제를 구체적으로 설명합니다.
    - "website loading 속도가 느립니다", "고객 이탈률이 높습니다" 등의 명확한 문제 상황을 제시합니다.
- **Solution** : AI에게 해결책 제공을 요청합니다.
    - "loading 속도를 개선하려면 어떻게 해야 하나요?", "이탈률을 줄이는 방법은 무엇인가요?" 등의 해결책을 요구합니다.
- **Execution** : 해결책을 실행하기 위한 구체적인 단계나 조언을 요청합니다.
    - "단계별 guide를 제공하세요", "실행 가능한 action plan을 만들어주세요" 등의 실행 방법을 요구합니다.


---


## 4. Situation, Action, Result (SAR) Framework

- **상황 설명, 행동 요청, 결과 정의**로 구성된 **목표 지향적 framework**입니다.

> "data science 분야 취업 면접을 준비하고 있습니다. machine learning 관련 일반적인 질문들에 대한 답변 준비를 도와주시고, 상세한 설명이 포함된 답변을 제공해주세요."

- **Situation** : 현재 상황이나 scenario를 구체적으로 설명합니다.
    - "data science 분야 취업 면접을 준비하고 있습니다", "새로운 team project를 시작합니다" 등의 상황을 제시합니다.
- **Action** : AI가 취해야 할 구체적인 행동을 명시합니다.
    - "일반적인 면접 질문에 대한 답변 준비를 도와주세요", "project timeline을 작성해주세요" 등의 행동을 요청합니다.
- **Result** : 원하는 결과나 성과를 정의합니다.
    - "상세하고 체계적인 답변을 제공하세요", "실현 가능한 일정표를 만들어주세요" 등의 결과를 요구합니다.


---


## 5. Who, What, How, Why (WWHW) Framework

- **대상, 내용, 방법, 이유**를 명시하는 **포괄적이고 체계적인 framework**입니다.

> "programming 초보자를 위해, Python의 loop 개념을 간단한 언어로 설명하여 빠른 시작을 도와주세요."

- **Who** : 대상 사용자나 audience를 정의합니다.
    - "programming 초보자를 위해", "designer team을 위해" 등의 구체적인 대상을 명시합니다.
- **What** : 필요한 것이나 원하는 것을 설명합니다.
    - "Python의 loop 개념을 설명하세요", "project timeline을 작성하세요" 등의 구체적인 요구 사항을 제시합니다.
- **How** : 방법이나 형식을 요청합니다.
    - "간단한 언어로", "시각적 diagram으로" 등의 접근 방식을 지정합니다.
- **Why** : 목적이나 이유를 제공하여 AI의 focus를 안내합니다.
    - "빠른 시작을 돕기 위해", "적시에 project 전달을 보장하기 위해" 등의 목적을 명확히 합니다.


---


## 6. Situation, Task, Action, Result (STAR) Framework

- **상황, 과제, 행동, 결과**로 구성된 **business 및 project management 중심 framework**입니다.

> "새로운 제품을 위한 marketing campaign을 계획해야 합니다. target audience와 핵심 message를 제안하고, 포괄적인 campaign 전략을 개발해주세요."

- **Situation** : 상황이나 맥락을 설명합니다.
    - "새로운 제품을 위한 marketing campaign을 계획해야 합니다", "team 생산성을 향상시켜야 합니다" 등의 상황을 제시합니다.
- **Task** : 과제나 목표를 정의합니다.
    - "campaign 전략을 개발하세요", "생산성 향상 방안을 마련하세요" 등의 구체적인 과제를 설정합니다.
- **Action** : 구체적인 행동이나 단계를 요청합니다.
    - "target audience와 핵심 message를 제안하세요", "workflow 최적화 방법을 제시하세요" 등의 행동을 요구합니다.
- **Result** : 원하는 결과나 성과물을 요청합니다.
    - "포괄적인 campaign 계획을 작성하세요", "실행 가능한 개선 plan을 제공하세요" 등의 결과물을 요구합니다.


---


## 7. Goal, Obstacles, Methods, Results (GOMR) Framework

- **목표, 장애물, 방법, 결과**로 구성된 **장애물 극복 중심 framework**입니다.

> "website 사용자 참여도를 증가시키고 싶지만, content가 social media에서 충분히 공유되지 않습니다. content를 더 공유하기 쉽게 만드는 방법을 제안하고, 참여도 향상을 위한 실행 가능한 tip list를 제공해주세요."

- **Goal** : 달성하고자 하는 목표를 명시합니다.
    - "website 사용자 참여도를 증가시키고 싶습니다", "brand 인지도를 향상시키고 싶습니다" 등의 구체적인 목표를 설정합니다.
- **Obstacles** : 목표 달성을 방해하는 장애물이나 도전 과제를 식별합니다.
    - "content가 social media에서 충분히 공유되지 않습니다", "경쟁이 치열합니다" 등의 구체적인 장애물을 명시합니다.
- **Methods** : 장애물을 극복하기 위한 방법이나 전략을 요청합니다.
    - "content를 더 공유하기 쉽게 만드는 방법을 제안하세요", "차별화 전략을 제시하세요" 등의 방법을 요구합니다.
- **Results** : 기대하는 결과나 성과를 정의합니다.
    - "social media 참여도 향상을 위한 실행 가능한 tip list를 제공하세요", "측정 가능한 성과 지표를 포함하세요" 등의 결과를 요구합니다.


---


## 8. Background, Problem, Objective, Solution (BPOS) Framework

- **배경, 문제, 목표, 해결책**으로 구성된 **전략적 문제 해결 framework**입니다.

> "tech 업계의 작은 startup으로서 우수한 인재를 유치하는 데 어려움을 겪고 있습니다. 채용 process를 개선하고 싶습니다. 경쟁이 치열한 시장에서 우수한 인재를 유치하기 위한 tip을 제공해주세요."

- **Background** : 배경 정보나 맥락을 제공합니다.
    - "tech 업계의 작은 startup입니다", "제조업 분야에서 20년 운영된 회사입니다" 등의 배경을 설명합니다.
- **Problem** : 문제나 도전 과제를 명시합니다.
    - "우수한 인재를 유치하는 데 어려움을 겪고 있습니다", "시장 점유율이 감소하고 있습니다" 등의 문제를 제시합니다.
- **Objective** : 목표나 목적을 정의합니다.
    - "채용 process를 개선하고 싶습니다", "경쟁력을 회복하고 싶습니다" 등의 목표를 설정합니다.
- **Solution** : 해결책이나 전략을 요청합니다.
    - "경쟁이 치열한 시장에서 우수한 인재를 유치하기 위한 tip을 제공하세요", "차별화된 경쟁 전략을 제안하세요" 등의 해결책을 요구합니다.


---


## 9. Problem, Analysis, Solution, Action (PASA) Framework

- **문제, 분석, 해결책, 행동**으로 구성된 **분석적 문제 해결 framework**입니다.

> "고객 이탈률이 높습니다. 이것의 원인이 무엇일까요? 이탈률을 줄이기 위해 어떤 전략을 구현할 수 있을까요? 고객 retention 개선을 위한 단계별 계획을 제공해주세요."

- **Problem** : 문제나 도전 과제를 정의합니다.
    - "고객 이탈률이 높습니다", "생산성이 저하되고 있습니다" 등의 구체적인 문제를 제시합니다.
- **Analysis** : 문제에 대한 분석을 요청합니다.
    - "높은 이탈률의 원인이 무엇일까요?", "생산성 저하의 근본 원인을 분석해주세요" 등의 분석을 요구합니다.
- **Solution** : 잠재적인 해결책을 요청합니다.
    - "이탈률을 줄이는 전략을 제안하세요", "생산성 향상 방안을 제시하세요" 등의 해결책을 요구합니다.
- **Action** : 해결책을 실행하기 위한 구체적인 행동을 요청합니다.
    - "고객 retention 개선을 위한 단계별 계획을 제공하세요", "즉시 적용 가능한 실행 plan을 만들어주세요" 등의 행동을 요구합니다.


---


## 10. Scenario, Challenge, Approach, Outcome (SCAO) Framework

- **scenario, 도전 과제, 접근법, 결과**로 구성된 **전략적 계획 수립 framework**입니다.

> "다음 분기에 새로운 제품을 출시하며, 빠르게 brand 인지도를 구축해야 합니다. 이를 달성하기 위해 어떤 marketing 전략을 사용해야 할까요? 첫 달 내에 reach를 최대화하는 계획을 작성해주세요."

- **Scenario** : scenario나 맥락을 설명합니다.
    - "다음 분기에 새로운 제품을 출시합니다", "신규 시장에 진출을 계획하고 있습니다" 등의 scenario를 제시합니다.
- **Challenge** : 도전 과제나 장애물을 식별합니다.
    - "빠르게 brand 인지도를 구축해야 합니다", "제한된 예산으로 시장 침투를 해야 합니다" 등의 도전 과제를 명시합니다.
- **Approach** : 접근법이나 전략을 요청합니다.
    - "빠른 brand 인지도 구축을 위해 어떤 marketing 전략을 사용해야 할까요?", "비용 효율적인 시장 진입 전략은 무엇인가요?" 등의 접근법을 요구합니다.
- **Outcome** : 원하는 결과나 성과를 정의합니다.
    - "첫 달 내에 reach를 최대화하는 계획을 작성하세요", "6개월 내 시장 점유율 목표를 달성하는 plan을 제시하세요" 등의 결과를 요구합니다.


---


## Framework 선택 Guide

- 상황과 목적에 따라 **적절한 framework를 선택**하는 것이 중요합니다.
- 여러 framework를 **조합하여 사용**할 수도 있으며, 필요에 따라 framework를 **customizing**할 수 있습니다.


### 목적별 Framework 추천

- **기본적인 작업 요청** : RTF Framework가 가장 적합합니다.
    - 역할, 작업, 형식만 명시하면 되는 단순한 요청에 효과적입니다.
- **Data 기반 작업** : CIO Framework를 사용합니다.
    - 특정 data나 정보를 바탕으로 결과물을 생성해야 할 때 유용합니다.
- **문제 해결** : PSE 또는 PASA Framework를 선택합니다.
    - PSE는 직접적인 해결책이 필요할 때, PASA는 분석이 우선 필요할 때 사용합니다.
- **전략 수립** : STAR, GOMR, BPOS, SCAO Framework 중 선택합니다.
    - business context나 조직적 맥락이 중요한 경우에 적합합니다.
- **교육 및 설명** : WWHW Framework가 효과적입니다.
    - 대상 audience가 명확하고 교육적 목적이 강할 때 사용합니다.


### Framework 조합 전략

- **복합적인 요청**의 경우 여러 framework의 요소를 결합할 수 있습니다.
    - RTF의 역할 정의 + GOMR의 장애물 식별 + PASA의 분석 요청 등의 조합이 가능합니다.
- **단계별 접근**을 통해 복잡한 문제를 해결할 수 있습니다.
    - 첫 번째 prompt에서 PASA로 문제 분석을 하고, 두 번째 prompt에서 STAR로 실행 계획을 수립하는 방식입니다.


### Framework 효과성 평가

- **응답 품질**을 기준으로 framework의 효과성을 평가합니다.
    - 원하는 정보가 포함되었는지, 적절한 수준의 상세함을 가지고 있는지 확인합니다.
- **재사용 가능성**을 고려하여 향후 유사한 작업에 활용할 수 있는지 검토합니다.
- **시간 효율성**을 측정하여 framework 사용이 실제로 더 나은 결과를 빠르게 얻을 수 있는지 확인합니다.


---


## Prompt Architecture 활용 Best Practice

- 효과적인 Prompt Architecture 활용을 위해서는 **체계적인 접근과 지속적인 개선**이 필요합니다.
- 실무에서의 적용 경험을 통해 **개인화된 framework library**를 구축할 수 있습니다.


### 효과적인 Prompt 작성 원칙

- **명확성과 구체성**을 최우선으로 합니다.
    - 모호한 표현보다는 구체적이고 측정 가능한 요구 사항을 제시합니다.
    - 예상되는 결과물의 형태와 범위를 명확히 설정합니다.
- **맥락 정보를 충분히 제공**합니다.
    - AI가 적절한 수준과 style로 응답할 수 있도록 배경 정보를 포함합니다.
    - 대상 audience나 사용 목적을 명시하여 응답의 방향성을 제시합니다.
- **단계적 접근**을 통해 복잡한 작업을 분해합니다.
    - 큰 작업을 여러 개의 작은 단위로 나누어 각각에 적합한 framework를 적용합니다.


### Framework 개선과 발전

- **사용 결과를 기록**하여 어떤 framework가 어떤 상황에서 효과적인지 분석합니다.
- **개인화된 변형**을 통해 자신의 작업 style과 요구 사항에 맞는 framework를 개발합니다.
- **새로운 framework 개발**을 통해 특수한 상황이나 업무 영역에 특화된 구조를 만들 수 있습니다.


### 주의 사항 및 한계점

- **지나친 복잡성**은 오히려 효율성을 떨어뜨릴 수 있으므로 적절한 수준을 유지해야 합니다.
- **framework에 얽매이지 않고** 상황에 따라 유연하게 접근하는 것이 중요합니다.
- **AI model의 한계**를 이해하고, framework만으로는 해결할 수 없는 영역이 있음을 인식해야 합니다.


---


## Reference

- <https://medium.com/@balajibal/prompt-architectures-an-overview-of-structured-prompting-strategies-05b69a494956>

