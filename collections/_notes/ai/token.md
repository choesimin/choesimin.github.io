---
layout: note
permalink: /359
title: Token - AI가 언어를 처리하는 기본 단위
description: Token은 AI 언어 model이 text를 처리하는 가장 작은 기본 단위로, tokenization 방식에 따라 model 성능과 비용이 크게 달라집니다.
date: 2025-07-28
---


## Token : AI 언어 처리의 기본 단위

- token은 **AI 언어 model이 text를 처리하는 가장 작은 기본 단위**입니다.
    - 복잡한 자연어를 computer가 이해할 수 있는 형태로 분해하는 과정에서 사용됩니다.
    - 단어, 부분 단어, 문자, 기호 등 의미 있는 text 조각으로 구성됩니다.

- **tokenization은 연속된 text를 개별 token으로 나누는 과정**으로, AI model의 성능과 효율성에 직접적인 영향을 미칩니다.
    - model이 처리할 수 있는 입력 길이의 제한을 결정합니다.
    - token 수에 따라 계산 비용과 처리 시간이 달라집니다.


---


## Token의 역할

- token은 **AI model이 언어를 이해하기 위해 text를 분해하는 최소 단위**입니다.
    - 인간에게는 자연스러운 문장도 AI에게는 숫자와 기호의 연속으로 변환되어야 합니다.
    - 이 변환 과정에서 token이 중간 단계 역할을 담당합니다.

- **의미적 완결성을 고려하여 text를 분할**합니다.
    - 자주 사용되는 단어는 하나의 token으로 유지됩니다.
    - 희귀하거나 복잡한 단어는 여러 개의 작은 token으로 분할됩니다.
    - 언어의 특성과 문맥을 고려하여 최적의 분할 지점을 찾습니다.


### Text 처리 과정에서의 Token

- **raw text에서 numerical representation까지의 bridge 역할**을 수행합니다.
    - 사용자 입력 text → tokenization → token sequence → numerical encoding → AI 처리.
    - AI 출력 → numerical decoding → token sequence → detokenization → 최종 text.

- **vocabulary 구성의 기준**이 됩니다.
    - AI model은 미리 정의된 token vocabulary를 가지고 있습니다.
        - vocabulary란 model이 이해할 수 있는 token의 집합입니다.
    - vocabulary에 없는 새로운 단어는 기존 token들의 조합으로 표현됩니다.
    - vocabulary 크기는 model의 표현력과 계산 효율성 간의 trade-off를 결정합니다.


---


## Tokenization 방식과 특징

- tokenization은 **언어와 model에 따라 다양한 방식**으로 구현됩니다.
    - 각 방식마다 고유한 장단점과 적용 분야가 있습니다.
    - 최근에는 subword 기반 방식이 주류를 이루고 있습니다.


### Word-level Tokenization

- **단어 단위로 text를 분할하는 가장 직관적인 방식**입니다.
    - 공백과 구두점을 기준으로 단어를 구분합니다.
    - 인간의 언어 이해 방식과 가장 유사합니다.

- **vocabulary 크기가 매우 커지는 문제**가 있습니다.
    - 모든 단어를 개별 token으로 처리하면 수십만 개의 vocabulary가 필요합니다.
    - 새로운 단어나 오타에 대해 처리하기 어렵습니다.
    - memory 사용량과 계산 복잡도가 급격히 증가합니다.


### Character-level Tokenization

- **개별 문자를 token으로 사용하는 방식**입니다.
    - vocabulary 크기가 매우 작아 효율적입니다.
    - 모든 text를 표현할 수 있어 coverage 문제가 없습니다.

- **의미적 연관성이 떨어지는 한계**가 있습니다.
    - 문자 단위로는 단어의 의미를 파악하기 어렵습니다.
    - 긴 sequence가 생성되어 처리 효율성이 낮아집니다.
    - long-range dependency를 학습하기 어렵습니다.


### Subword Tokenization

- **단어와 문자 사이의 중간 단위를 사용하는 현대적 방식**입니다.
    - 단어의 일부분이나 morpheme을 기준으로 분할합니다.
    - vocabulary 크기와 표현력 사이의 균형을 맞춥니다.

- **BPE(Byte Pair Encoding)**가 가장 널리 사용되는 subword 기법입니다.
    - 자주 함께 나타나는 문자 pair를 점진적으로 병합합니다.
    - 통계적 frequency를 바탕으로 optimal subword를 찾아냅니다.
    - GPT, BERT 등 대부분의 modern language model에서 사용됩니다.

- **SentencePiece**는 언어 독립적인 tokenization을 지원합니다.
    - 공백이 없는 언어(중국어, 일본어 등)도 효과적으로 처리합니다.
    - 다국어 model에서 일관된 tokenization을 보장합니다.


---


## 언어별 Tokenization 특성

- **각 언어의 고유한 특성**에 따라 tokenization 방식이 달라집니다.
    - 문자 system, 단어 구조, 형태론적 특성을 고려해야 합니다.
    - 동일한 tokenizer라도 언어에 따라 다른 결과를 생성합니다.


### 영어 Tokenization

- **공백 기반 단어 분리가 상대적으로 명확**합니다.
    - 대부분의 단어가 공백으로 구분되어 처리가 용이합니다.
    - subword 분할도 morphological boundary와 잘 일치합니다.

- 일반적으로 단어 단위로 분할되지만, subword 방식도 사용됩니다.

| 예시 | Tokenization 결과 |
| --- | --- |
| "Hello world!" | ["Hello", "world", "!"] |
| "running" | ["run", "ning"] (subword 방식) |
| "unhappiness" | ["un", "happy", "ness"] (prefix, root, suffix 분리) |


### 한국어 Tokenization

- **교착어 특성으로 인한 복잡한 형태 변화**를 고려해야 합니다.
    - 어근에 다양한 어미와 조사가 결합되어 형태가 변합니다.
    - 동일한 의미라도 문맥에 따라 다른 형태로 나타납니다.

- 한국어 tokenization은 **형태소 분석**과 밀접하게 연관되어 있습니다.

| 예시 | Tokenization 결과 |
| --- | --- |
| "안녕하세요" | ["안녕", "하세요"] 또는 ["안", "녕", "하", "세", "요"] (형태소 단위) |
| "가겠습니다" | ["가", "겠", "습니다"] (어근 + 시제 + 존댓말) |
| "학교에서" | ["학교", "에서"] (조사 분리) |

- 따라서 **형태소 분석과의 연계**가 중요합니다.
    - 의미 단위로 분할하면 model의 이해도가 향상됩니다.
    - 하지만 computational cost와 complexity가 증가합니다.


### 중국어와 일본어 Tokenization

- **공백이 없는 연속된 문자열**을 처리해야 합니다.
    - 단어의 경계를 자동으로 찾아내는 word segmentation이 필요합니다.
    - 문맥을 고려하여 의미 단위로 분할해야 합니다.

- **다양한 문자 체계의 혼용**을 고려해야 합니다.
    - 일본어: 히라가나, 가타카나, 한자가 혼재
    - 중국어: 간체자와 번체자의 차이
    - 각 문자 체계마다 다른 tokenization 전략이 필요합니다.

| 예시 | Tokenization 결과 |
| --- | --- |
| "我爱自然语言处理" | ["我", "爱", "自然", "语言", "处理"] (중국어) |
| "自然言語処理が好きです" | ["自然", "言語", "処理", "が", "好き", "です"] (일본어) |


---


## Token 수와 비용 계산

- **대부분의 AI service는 token 수를 기준으로 과금**합니다.
    - 입력 token과 출력 token에 대해 각각 다른 요금을 적용합니다.
    - token 효율성이 직접적인 비용 절감으로 이어집니다.


### Token 수 예측의 어려움

- **동일한 text라도 tokenizer에 따라 token 수가 달라집니다.**
    - 각 AI service provider마다 고유한 tokenization 방식을 사용합니다.
    - 사전에 정확한 token 수를 예측하기 어려운 경우가 많습니다.

- **언어별 token 효율성의 차이**가 존재합니다.
    - 영어는 일반적으로 token 효율성이 높습니다.
    - 한국어, 중국어 등은 상대적으로 더 많은 token이 필요합니다.
    - 이는 training data의 언어 분포와 tokenizer 설계에 기인합니다.

- **text 복잡도에 따른 변동성**이 큽니다.
    - 일반적인 vocabulary는 적은 token으로 표현됩니다.
    - 전문 용어, 고유 명사, 새로운 단어는 더 많은 token이 필요합니다.
    - code, 수식, 특수 기호는 예상보다 많은 token을 소모할 수 있습니다.


### Token 계산 도구와 API

- **일부 service provider는 token 계산 도구를 공급**합니다.
    - OpenAI의 tiktoken library로 GPT model의 token 수를 미리 계산할 수 있습니다.
    - Anthropic은 최근 token 계산 API를 공개했습니다.
    - Google, Cohere 등도 비슷한 도구들을 순차적으로 출시하고 있습니다.

- **정확한 비용 예측을 위한 사전 testing**이 중요합니다.
    - 실제 사용할 text sample로 token 수를 측정해봅니다.
    - batch processing 시 token 수의 분포를 파악합니다.
    - 예상 사용량에 따른 월별 비용을 계산합니다.


---


## Token 최적화 전략

- **효율적인 token 사용은 성능과 비용 모두에 영향**을 미칩니다.
    - 불필요한 token을 줄이면 처리 속도가 빨라지고 비용이 절감됩니다.
    - 하지만 의미 전달에 필수적인 정보는 유지해야 합니다.


### 입력 Text 최적화

- **불필요한 공백과 formatting을 제거**합니다.
    - 연속된 공백, tab, 줄바꿈 등을 정리합니다.
    - 하지만 문맥 이해에 필요한 구조는 보존해야 합니다.

- **중복되는 정보를 간소화**합니다.
    - 같은 내용을 반복하는 문장을 통합합니다.
    - 핵심 정보만 남기고 부차적인 설명을 제거합니다.

- **abbreviation과 acronym을 활용**합니다.
    - 자주 사용되는 긴 용어는 줄임말로 대체합니다.
    - 단, model이 이해할 수 있는 범위 내에서 사용해야 합니다.


### Prompt Engineering을 통한 최적화

- **효율적인 prompt 구조**를 설계합니다.
    - 핵심 지시 사항을 앞쪽에 배치합니다.
    - 예시는 필요 최소한으로 제한합니다.
    - template화하여 재사용 가능한 형태로 만듭니다.

- **context length 관리**를 체계적으로 수행합니다.
    - 대화 history에서 오래된 내용을 정리합니다.
    - 중요한 context만 선별하여 유지합니다.
    - sliding window 방식으로 관리합니다.


---


## Token과 AI Model 성능의 관계

- **token의 품질과 구성이 model output에 직접적인 영향**을 미칩니다.
    - 적절한 tokenization은 model의 이해도를 높입니다.
    - 부적절한 token 분할은 의미 손실을 가져올 수 있습니다.


### Tokenization이 성능에 미치는 영향

- **의미 단위 보존**이 중요합니다.
    - 관련된 morpheme이 분리되면 의미 파악이 어려워집니다.
    - 합성어나 전문 용어의 적절한 처리가 필요합니다.

- **consistency 유지**가 성능 향상의 핵심입니다.
    - 동일한 개념이 항상 같은 방식으로 tokenize되어야 합니다.
    - 불규칙한 분할은 model 학습을 방해합니다.

- **vocabulary coverage**를 확보해야 합니다.
    - out-of-vocabulary 문제를 최소화해야 합니다.
    - domain-specific term에 대한 적절한 처리가 필요합니다.


### Token 길이와 처리 효율성

- **적절한 token 길이**가 processing efficiency를 결정합니다.
    - 너무 긴 token: 계산 복잡도 증가, memory 사용량 증가
    - 너무 짧은 token: sequence 길이 증가, context window 비효율

- **batch processing에서의 고려 사항**입니다.
    - token 수의 분산이 클수록 padding overhead가 증가합니다.
    - 비슷한 길이의 sequence를 함께 처리하는 것이 효율적입니다.


---


## Reference

- <https://huggingface.co/docs/transformers/tokenizer_summary>
- <https://openai.com/blog/tiktoken>
- <https://github.com/google/sentencepiece>
- <https://arxiv.org/abs/1508.07909>
- <https://platform.openai.com/tokenizer>
- <https://docs.anthropic.com/claude/docs/tokens-and-billing>

