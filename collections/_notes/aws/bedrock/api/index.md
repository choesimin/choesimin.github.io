---
layout: note
permalink: /375
title: AWS Bedrock API - InvokeModel vs Converse
description: AWS Bedrock의 InvokeModel API는 각 model별로 다른 request format을 사용해야 하지만 model의 모든 기능을 세밀하게 제어할 수 있는 반면, Converse API는 모든 model에 통일된 format을 제공하여 개발과 유지 보수는 간편하지만 model specific한 고급 기능 사용에는 제약이 있습니다.
date: 2025-08-24
---


# AWS Bedrock : InvokeModel API vs Converse API

- AWS Bedrock은 foundation model을 호출하기 위한 두 가지 runtime API를 제공합니다.
- InvokeModel API는 model별로 다른 format을 사용하는 전통적인 방식이며, Converse API는 모든 model에 통일된 interface를 제공하는 새로운 방식입니다.


---


## InvokeModel API

- Bedrock 출시 초기부터 제공된 기본 inference API입니다.
- 각 model provider별로 고유한 request/response format을 사용합니다.
- model의 native parameter를 직접 제어할 수 있어 세밀한 tuning이 가능합니다.


### 특징

- **model별 payload 구조**를 개발자가 직접 관리해야 합니다.
    - Anthropic Claude는 `messages` format을 사용합니다.
    - Meta Llama는 `prompt` format을 사용합니다.
    - Amazon Titan은 `inputText` format을 사용합니다.

- **provider specific parameter**를 모두 활용할 수 있습니다.
    - 각 model의 고유 기능과 parameter에 완전한 access가 가능합니다.
    - model별 최적화된 설정을 세밀하게 조정할 수 있습니다.


### 사용 예시

```python
import boto3
import json

bedrock_runtime = boto3.client('bedrock-runtime')

# Claude model 호출
claude_response = bedrock_runtime.invoke_model(
    modelId='anthropic.claude-3-sonnet-20240229-v1:0',
    body=json.dumps({
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 1000,
        "temperature": 0.7,
        "messages": [
            {"role": "user", "content": "Hello"}
        ]
    })
)

# Llama model 호출 - 완전히 다른 format
llama_response = bedrock_runtime.invoke_model(
    modelId='meta.llama3-8b-instruct-v1:0',
    body=json.dumps({
        "prompt": "Hello",
        "max_gen_len": 1000,
        "temperature": 0.7
    })
)
```


---


## Converse API

- 2024년에 도입된 통합 inference API입니다.
- 모든 supported model에 대해 **단일 request/response format**을 제공합니다.
- multi-turn conversation과 tool use를 표준화된 방식으로 지원합니다.


### 특징

- **통일된 interface**로 model 전환이 용이합니다.
    - 하나의 code로 여러 model을 사용할 수 있습니다.
    - model 변경 시 code 수정이 최소화됩니다.
    - learning curve가 낮아 개발 생산성이 향상됩니다.

- **표준화된 기능**을 일관되게 제공합니다.
    - system prompt, tool use, image 처리 등이 통일된 format으로 지원됩니다.
    - conversation history 관리가 자동화되어 있습니다.


### 사용 예시

```python
import boto3

bedrock_runtime = boto3.client('bedrock-runtime')

# 모든 model에 동일한 format 사용
def call_model(model_id, message):
    return bedrock_runtime.converse(
        modelId=model_id,
        messages=[
            {
                "role": "user",
                "content": [{"text": message}]
            }
        ],
        inferenceConfig={
            "maxTokens": 1000,
            "temperature": 0.7
        }
    )

# Claude 호출
claude_response = call_model(
    'anthropic.claude-3-sonnet-20240229-v1:0',
    "Hello"
)

# Llama 호출 - 동일한 code
llama_response = call_model(
    'meta.llama3-8b-instruct-v1:0',
    "Hello"
)
```


---


## 비교 분석

- 두 API는 서로 다른 use case에 최적화되어 있으며, project 요구 사항에 따라 선택해야 합니다.
- InvokeModel은 **flexibility**를, Converse는 **simplicity**를 우선시합니다.


### 주요 차이점

| 구분 | InvokeModel API | Converse API |
| --- | --- | --- |
| **출시 시기** | Bedrock 초기 (2023) | 2024년 추가 |
| **Request Format** | Model별 상이 | 통일된 format |
| **Code 복잡도** | Model별 처리 logic 필요 | 단일 logic으로 처리 |
| **Parameter 지원** | Model native parameter 전체 | 표준화된 parameter만 |
| **Tool Use** | Model별 구현 | 표준화된 구현 |
| **Learning Curve** | Model별 학습 필요 | 한 번만 학습 |
| **Model 전환** | Code 수정 필요 | Model ID만 변경 |
| **세밀한 제어** | 완벽한 제어 가능 | 제한적 |


### InvokeModel API가 적합한 경우

- model의 **고유 기능**을 최대한 활용해야 할 때.
- **세밀한 parameter tuning**이 필요한 production 환경.
- 특정 model에 **최적화된 application**을 구축할 때.
- model provider의 **최신 기능**을 즉시 사용해야 할 때.


### Converse API가 적합한 경우

- **여러 model을 비교**하거나 전환해야 할 때.
- **빠른 prototype** 개발이 필요할 때.
- **표준화된 chatbot**이나 assistant를 구축할 때.
- **code 유지 보수**를 간소화하고 싶을 때.


---


## Migration 전략

- 기존 InvokeModel API를 사용 중인 경우, Converse API로의 migration을 고려할 수 있습니다.
- 두 API는 공존 가능하므로 점진적 migration이 가능합니다.


### Migration 고려 사항

- **기능 호환성 검토**가 우선되어야 합니다.
    - 사용 중인 model specific parameter가 Converse API에서 지원되는지 확인합니다.
    - custom prompt template이나 특수 기능 의존성을 파악합니다.

- **hybrid approach**를 통한 점진적 전환이 가능합니다.
    - 신규 기능은 Converse API로 개발합니다.
    - 기존 기능은 안정성을 확인 후 순차적으로 migration합니다.
    - critical path는 InvokeModel API를 유지하고, 일반 기능은 Converse API로 전환합니다.


---


## Best Practices

- project 초기에 API 선택 기준을 명확히 정의합니다.
- 두 API의 장단점을 이해하고 적절히 조합하여 사용합니다.


### 권장 사항

- **개발 단계**에서는 Converse API로 빠르게 prototype을 구축합니다.
    - model 비교와 선택이 용이합니다.
    - 개발 속도가 향상됩니다.

- **production 단계**에서는 요구 사항에 따라 선택합니다.
    - 성능 최적화가 중요하면 InvokeModel API를 고려합니다.
    - 유지 보수성이 중요하면 Converse API를 선택합니다.

- **monitoring과 logging**은 사용하는 API와 관계없이 철저히 구현합니다.
    - API latency와 token usage를 tracking합니다.
    - error handling과 retry logic을 robust하게 구성합니다.


---


## Reference

- <https://docs.aws.amazon.com/bedrock/latest/userguide/inference.html>
- <https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html>
- <https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html>
- <https://aws.amazon.com/blogs/aws/new-converse-api-for-amazon-bedrock/>

