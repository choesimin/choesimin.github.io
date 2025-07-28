---
layout: note
permalink: /362
title: Converse API - Amazon Bedrock 통합 Interface
description: Converse API는 Amazon Bedrock에서 다양한 AI model을 통일된 방식으로 사용할 수 있게 해주는 interface로, multimodal 입력과 streaming 응답을 지원합니다.
date: 2025-07-28
---


## Converse API : Amazon Bedrock의 통합 AI Model Interface

- Converse API는 **Amazon Bedrock에서 다양한 AI model을 통일된 방식으로 사용할 수 있게 해주는 통합 interface**입니다.
    - Anthropic Claude, Meta Llama, Amazon Titan 등 서로 다른 공급 업체의 model들을 동일한 API 형식으로 호출할 수 있습니다.
    - 각 model의 고유한 API 구조를 신경 쓰지 않고 일관된 방식으로 개발할 수 있습니다.

- **multimodal 입력과 streaming 응답을 기본적으로 지원**하여 현대적인 AI application 개발에 필요한 기능들을 갖추고 있습니다.
    - text, image, document 등 다양한 형태의 입력을 하나의 API 호출로 처리합니다.
    - 실시간 streaming으로 긴 응답도 사용자에게 즉시 전달할 수 있습니다.


---


## Converse API의 핵심 개념

- Converse API는 **model 간 차이를 추상화하여 개발 복잡성을 줄이는 것**이 주요 목적입니다.
    - 각 AI model마다 다른 request/response 형식을 통일된 구조로 표준화(standardization)합니다.
    - 동일한 code로 여러 model을 교체하며 test하고 비교할 수 있습니다.

- **ContentBlock 기반의 구조화된 message system**을 사용합니다.
    - text, image, 문서 등을 개별 content block으로 구성하여 전송합니다.
    - 복잡한 multimodal 입력도 직관적으로 구성할 수 있습니다.


### 통합 Interface의 장점

- **model 간 호환성**이 뛰어납니다.
    - Claude에서 Llama로, Titan에서 Claude로 model을 변경할 때 최소한의 code 수정만 필요합니다.
    - A/B testing이나 model 성능 비교가 쉬워집니다.

- **일관된 parameter 체계**를 사용합니다.
    - temperature, topP, maxTokens 등의 parameter가 모든 model에서 동일한 방식으로 작동합니다.
    - 각 model의 고유한 parameter 이름이나 범위를 외울 필요가 없습니다.

- **표준화된 error handling**을 지원합니다.
    - 모든 model에서 동일한 형태의 error response를 받을 수 있습니다.
    - exception handling code를 model별로 따로 작성할 필요가 없습니다.


---


## 기본 사용 방법과 구조

- Converse API는 **boto3 client를 통해 Python에서 사용**할 수 있습니다.
    - AWS SDK의 일부로 제공되어 기존 AWS service와 자연스럽게 통합됩니다.
    - authentication과 authorization은 기존 AWS credential system을 사용합니다.


### 기본 호출 구조

```python
import boto3
client = boto3.client("bedrock-runtime", region_name="us-west-2")
response = client.converse(
    modelId="anthropic.claude-3-haiku-20240307-v1:0",
    messages=[
        {
            "role": "user",
            "content": [
                {"text": "안녕하세요, 오늘 날씨는 어때요?"},
                {"image": {"format": "png", "source": "base64_encoded_image_data"}}
            ]
        }
    ],
    inferenceConfig={
        "maxTokens": 1000,
        "temperature": 0.7,
        "topP": 0.9
    }
)

print(response["message"]["content"][0]["text"])
```

- **client.converse()** method를 사용하여 AI model과 상호작용합니다.
    - modelId로 사용할 model을 지정합니다.
    - messages array에 대화 내용을 구성합니다.
    - inferenceConfig로 생성 parameter를 설정합니다.

- **필수 parameter**에 modelId, messages, inferenceConfig가 있습니다.
    - **modelId** : 사용할 AI model의 식별자.
        - "anthropic.claude-3-haiku-20240307-v1:0", "meta.llama-3.1:0" 등.
    - **messages** : 대화 내용을 담은 message 배열.
    - **inferenceConfig** : maxTokens, temperature, topP 등의 생성 설정.

- **선택적 parameter**에 system, toolConfig, guardrailConfig가 있습니다.
    - **system** : system prompt 설정.
    - **toolConfig** : function calling을 위한 도구 설정.
    - **guardrailConfig** : 안전 filter 설정.


### Message 구조

- **각 message는 role과 content로 구성**됩니다.
    - role : "user" 또는 "assistant".
    - content : 하나 이상의 ContentBlock 배열.

- **ContentBlock의 종류**는 여러 가지가 될 수 있습니다.
    - **text** : 일반 text 내용.
    - **image** : image data (format, source 지정).
    - **document** : 문서 파일 (name, format, source 지정).
    - **toolUse** : function calling 실행 요청.
    - **toolResult** : function 실행 결과.


---


## Multimodal 기능

- Converse API는 **text와 다른 media type을 자연스럽게 결합**하여 처리할 수 있습니다.
    - 하나의 message에 text 설명과 image를 함께 포함할 수 있습니다.
    - AI model이 image를 보고 text로 답변하거나, text 설명을 바탕으로 image를 생성할 수 있습니다.


### Image 처리

- **다양한 image format을 지원**합니다.
    - PNG, JPEG, GIF, WebP 등 일반적인 형식들을 처리할 수 있습니다.
    - base64 encoding을 통해 image data를 전송합니다.

- **image 분석과 생성이 모두 가능**합니다.
    - Claude나 다른 vision model로 image 내용을 분석하고 설명할 수 있습니다.
    - Titan Image Generator로 text 설명을 바탕으로 새로운 image를 생성할 수 있습니다.

- **image와 text의 연관성**을 이해합니다.
    - "이 image에서 무엇을 볼 수 있나요?"와 같은 질문에 구체적으로 답변합니다.
    - image의 맥락을 고려하여 관련된 추가 정보를 생성합니다.


### Document 처리

- **PDF, text 파일 등을 직접 upload**하여 분석할 수 있습니다.
    - 긴 문서의 내용을 요약하거나 특정 정보를 추출할 수 있습니다.
    - 문서의 구조와 formatting을 이해하여 맥락에 맞는 답변을 생성합니다.

- **document와 관련된 질문**을 자연스럽게 처리합니다.
    - "이 계약서의 주요 조건은 무엇인가요?", "이 보고서에서 언급된 핵심 지표들을 정리해주세요" 등.


---


## Streaming 응답

- **ModelWithResponseStream을 통한 실시간 응답**을 지원합니다.
    - 긴 응답을 기다리지 않고 생성되는 대로 즉시 확인할 수 있습니다.
    - 사용자 경험 측면에서 응답성이 크게 향상됩니다.


### Streaming의 장점

- **체감 응답 속도가 빨라집니다**.
    - 전체 응답 완료를 기다리지 않고 첫 단어부터 즉시 표시할 수 있습니다.
    - 긴 창작물이나 분석 결과를 생성할 때 특히 유용합니다.

- **사용자가 진행 상황을 실시간으로 확인**할 수 있습니다.
    - AI가 현재 어떤 내용을 생성하고 있는지 파악할 수 있습니다.
    - 원하지 않는 방향으로 진행되면 중간에 중단할 수 있습니다.

- **network 효율성**이 개선됩니다.
    - 작은 chunk 단위로 전송되어 memory 사용량이 줄어듭니다.
    - 긴 응답에서도 안정적인 연결을 유지할 수 있습니다.


### Streaming 구현

- **event-driven 방식**으로 응답을 처리합니다.
    - 각 chunk가 도착할 때마다 callback function이 호출됩니다.
    - chunk를 순차적으로 조합하여 완전한 응답을 구성합니다.

- **error handling**이 중요합니다.
    - streaming 중간에 연결이 끊어지거나 오류가 발생할 수 있습니다.
    - partial response 상황에 대한 적절한 처리가 필요합니다.


---


## Function Calling 지원

- Converse API는 **external tool과의 연동을 위한 function calling**을 지원합니다.
    - AI model이 필요에 따라 외부 API를 호출하거나 특정 작업을 수행할 수 있습니다.
    - 단순한 질문 답변을 넘어서 실제 작업을 수행하는 AI agent 구현이 가능합니다.


### Tool 정의와 사용

- **toolConfig에서 사용 가능한 tool들을 정의**합니다.
    - 각 tool의 이름, 설명, parameter schema를 명시합니다.
    - AI model이 언제 어떤 tool을 사용해야 하는지 판단할 수 있도록 충분한 정보를 제공합니다.

- **model이 자동으로 적절한 tool을 선택**합니다.
    - 사용자 요청을 분석하여 필요한 tool을 식별합니다.
    - tool 호출을 위한 parameter를 자동으로 생성합니다.

- **tool 실행 결과를 다시 model에 전달**하여 최종 응답을 생성합니다.
    - toolResult ContentBlock을 통해 실행 결과를 전달합니다.
    - model이 결과를 해석하여 사용자에게 의미 있는 답변을 제공합니다.


### 활용 사례

- **외부 API 연동** : 날씨 정보, 주식 가격, 뉴스 검색 등의 실시간 정보 가져오기.
    - "오늘 서울 날씨 어때?"라는 질문에 실제 날씨 API를 호출하여 정확한 정보를 제공합니다.

- **database 조회** : 고객 정보, 주문 내역, 재고 상황 등을 database에서 조회.
    - 자연어 질문을 SQL query로 변환하여 실행하고 결과를 해석합니다.

- **계산 및 분석** : 복잡한 수학 계산이나 data 분석을 외부 tool로 수행.
    - 정확한 계산 결과를 바탕으로 신뢰할 수 있는 답변을 생성합니다.


---


## 개발 시 고려 사항

- Converse API 사용 시 **효율적인 개발을 위한 몇 가지 고려 사항**들이 있습니다.
    - API 호출 최적화와 비용 관리가 중요합니다.
    - 다양한 model의 특성을 이해하고 적절히 활용해야 합니다.


### Model 선택 전략

- **각 model의 고유한 강점**을 고려해야 합니다.
    - Claude : 긴 context와 복잡한 추론에 강함.
    - Llama : code 생성과 technical writing에 특화.
    - Titan : AWS ecosystem과의 긴밀한 통합.

- **용도에 따른 model 선택**이 비용 효율성에 영향을 미칩니다.
    - 간단한 요약 : 경량 model로 충분.
    - 복잡한 분석 : 고성능 model 필요.
    - 창작 작업 : 창의성이 뛰어난 model 선택.

- **fallback 전략**을 고려할 수 있습니다.
    - 주 model이 실패하거나 과부하일 때 대체 model로 자동 전환.
    - model별 응답 시간과 성공률을 monitoring하여 동적으로 선택.


### 비용 최적화

- **token 사용량 관리**가 중요합니다.
    - maxTokens 설정으로 예상치 못한 긴 응답 방지.
    - 불필요한 system prompt나 context 제거.
    - streaming을 활용하여 필요한 시점에 응답 중단.

- **caching 전략**을 활용할 수 있습니다.
    - 동일한 질문에 대한 응답을 cache하여 재사용.
    - 비슷한 context나 document에 대한 응답 최적화.
    - session 기반 context 관리로 중복 전송 방지.

- **batch processing**을 고려합니다.
    - 여러 요청을 모아서 처리하면 효율성이 높아질 수 있습니다.
    - 비실시간 작업은 batch로 처리하여 비용 절감.


### Error Handling과 Monitoring

- **다양한 error 상황**에 대한 대비가 필요합니다.
    - model 과부하로 인한 throttling.
    - content policy 위반으로 인한 block.
    - network 문제나 service 장애.

- **retry logic과 exponential backoff**를 구현합니다.
    - 일시적 오류에 대해서는 자동으로 재시도.
    - 반복적 실패 시 적절한 간격으로 재시도 조정.
    - 최대 재시도 횟수 제한으로 무한 loop 방지.

- **logging과 monitoring**을 통해 운영 관리합니다.
    - API 호출 성공률과 응답 시간 tracking.
    - token 사용량과 비용 monitoring.
    - user 요청 pattern 분석을 통한 최적화.


---


## Reference

- <https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html>
- <https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html>
- <https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html>
- <https://aws.amazon.com/bedrock/pricing/>
- <https://github.com/aws-samples/amazon-bedrock-samples>

