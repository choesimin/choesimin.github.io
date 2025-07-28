---
layout: note
permalink: /361
title: Bedrock API - Amazon Bedrock을 사용하는 기본적인 방법
description: Bedrock API는 Amazon Bedrock의 각 AI model을 사용하는 programming interface로, Claude, Titan, Llama 등 model마다 서로 다른 호출 방식과 parameter 구조를 가지고 있습니다.
date: 2025-07-28
---


## Bedrock API : 각 AI Model을 호출하는 기본 방법

- Bedrock API는 **Amazon Bedrock service에 hosting된 다양한 AI model들을 사용하기 위한 programming interface**입니다.
    - AWS SDK를 통해 Claude, Titan, Llama 등 각 model에 접근할 수 있습니다.
    - 각 model마다 고유한 API 형식과 parameter 구조를 가지고 있습니다.

- **model별로 서로 다른 호출 방식**을 사용하기 때문에 각 model의 특성을 이해하고 적절한 방법으로 접근해야 합니다.
    - Claude는 대화형 Messages API를, Titan은 단순 text 방식을, Mistral은 instruction 기반 형식을 사용합니다.
    - **각 AI model은 서로 다른 API 구조와 parameter 체계**를 가지고 있습니다.
        - 동일한 기능이라도 model에 따라 완전히 다른 request format이 필요합니다.
        - model 제조사의 original API 특성이 그대로 반영되어 있습니다.


---


## Bedrock API의 기본 구조

- Bedrock API는 **두 개의 주요 endpoint**로 구분됩니다.
    - **bedrock** : model 관리와 Bedrock service 설정을 위한 API.
    - **bedrock-runtime** : 실제 AI model 추론 요청을 위한 API.

- **일반적으로 bedrock-runtime endpoint를 주로 사용**합니다.
    - AI model과의 상호작용은 대부분 runtime endpoint를 통해 이루어집니다.
    - model 추론, text 생성, image 생성 등의 작업이 여기에 해당합니다.


### AWS SDK와 Authentication

- **boto3 Python SDK**를 통해 Bedrock API에 접근할 수 있습니다.
    - AWS credential 설정이 선행되어야 합니다.
    - region 설정을 통해 사용할 AWS 지역을 지정합니다.

- boto3를 통해 **기본 client 생성**할 수 있습니다.
    - `boto3.client("bedrock-runtime", region_name="us-west-2")`와 같이 runtime client를 생성합니다.
    - 각 model 호출은 이 client를 통해 이루어집니다.

- **필요한 IAM 권한**을 설정해야 합니다.
    - Bedrock service 사용 권한과 특정 model 접근 권한이 필요합니다.
    - model마다 개별적인 권한 설정이 가능합니다.


### JSON 기반 통신

- **모든 요청과 응답은 JSON 형식**으로 이루어집니다.
    - request body에 model parameter와 prompt를 JSON으로 구성하여 전송합니다.
    - response도 JSON 형태로 받아서 parsing하여 사용합니다.

- **invoke_model method**가 핵심 호출 방법입니다.
    - modelId로 사용할 model을 지정합니다.
    - body에 JSON 형태의 request data를 포함합니다.
    - response에서 생성된 content를 추출하여 활용합니다.


---


## 실제 사용 시 고려 사항

- **model별 특성을 이해하고 적절한 방식으로 접근**해야 합니다.
    - 각 model의 강점과 약점을 파악하여 용도에 맞게 선택해야 합니다.
    - 동일한 작업이라도 model에 따라 prompt 구성이 달라질 수 있습니다.


### Model 선택 기준

- **작업 유형에 따른 model 적합성**을 고려해야 합니다.
    - Claude : 복잡한 추론과 긴 문서 처리에 강함.
    - Titan : AWS ecosystem과의 통합과 간단한 작업에 적합.
    - Llama : open-source 특성과 customization에 유리.

- **비용과 성능의 trade-off**를 평가해야 합니다.
    - model마다 token당 가격이 다릅니다.
    - 응답 속도와 품질도 차이가 있습니다.
    - 용도에 따라 적절한 model을 선택하는 것이 경제적입니다.


### 호환성 관리

- **model 간 전환 시 code 수정이 불가피**합니다.
    - request 구조가 다르므로 상당한 code 변경이 필요합니다.
    - parameter mapping과 response parsing 로직을 각각 구현해야 합니다.

- **abstraction layer 구현**을 고려할 수 있습니다.
    - model별 차이를 숨기는 wrapper 함수를 만들 수 있습니다.
    - 하지만 각 model의 고유한 기능을 제한할 수 있습니다.

- **Converse API로의 migration**을 검토할 수 있습니다.
    - 통일된 interface를 원한다면 Converse API 사용을 고려합니다.
    - 하지만 일부 model별 고유 기능은 사용하지 못할 수 있습니다.


### Error Handling

- **model별로 다른 error 형식**을 처리해야 합니다.
    - error code와 message 구조가 model마다 다릅니다.
    - 동일한 문제라도 model에 따라 다른 error로 나타날 수 있습니다.

- **retry logic 구현**시 model 특성을 고려해야 합니다.
    - throttling 정책이 model마다 다를 수 있습니다.
    - 일부 model은 특정 유형의 request에 더 민감할 수 있습니다.

- **graceful degradation**을 구현할 수 있습니다.
    - 주 model 실패 시 backup model로 자동 전환하는 로직
    - 각 model의 특성에 맞게 prompt를 자동 변환하는 기능


---


## Bedrock API vs Converse API

| 특징 | Bedrock API | Converse API |
| --- | --- | --- |
| **호출 방식** | model별로 다름 | 통일된 interface 제공 |
| **parameter 구조** | model별로 다름 | 통일된 parameter set 제공 |
| **고유 기능** | 각 model의 고유 기능 사용 가능 | 일부 고유 기능 제한 |
| **복잡성** | 높음 (model별로 다름) | 낮음 (통일된 구조) |

- **Bedrock API는 각 model의 고유한 특성을 그대로 유지**합니다.
    - model 제조사의 original API와 최대한 유사한 형태로 구성되어 있습니다.
    - 각 model의 고유한 기능과 parameter를 모두 활용할 수 있습니다.
    - 더 세밀한 제어가 가능하지만 복잡성이 증가합니다.
        - 각 model의 고유한 기능과 parameter를 모두 활용할 수 있습니다.
        - 하지만 model 간 전환이나 호환성 관리가 어려워집니다.

- **Converse API는 통일된 interface를 제공**합니다.
    - 다양한 model을 동일한 방식으로 호출할 수 있습니다.
    - model 간 전환이 용이하고 code 유지보수가 간편합니다.
    - 사용하기 쉬운 abstraction layer를 제공하지만, 일부 model의 고유 기능은 제한될 수 있습니다.


### Bedrock API를 선택해야 하는 경우

- **특정 model의 고유 기능이 중요한 경우**에 사용합니다.
    - Claude의 특별한 reasoning 기능이나 Titan의 AWS 통합 기능 등.
    - Converse API에서 지원하지 않는 특수한 parameter가 필요한 경우.

- **performance 최적화가 중요한 경우**에 사용합니다.
    - 각 model에 최적화된 prompt engineering을 적용하고 싶을 때.
    - model별 특성을 최대한 활용하여 최고의 성능을 얻고 싶을 때.

- **기존 system과의 연동이 필요한 경우**에 사용합니다.
    - 이미 특정 model API에 최적화된 code가 있는 경우.
    - 특정 model에 특화된 workflow가 구축되어 있는 경우.


### Converse API를 선택해야 하는 경우

- **다양한 model을 통합적으로 사용하고 싶은 경우**에 사용합니다.
    - 여러 model을 동일한 방식으로 호출하여 일관된 결과를 얻고 싶을 때.
    - model 간 전환이 잦은 경우에 유리합니다.

- **개발 생산성을 높이고 싶은 경우**에 사용합니다.
    - 통일된 interface로 개발과 유지보수를 간편하게 하고 싶을 때.
    - model별로 다른 parameter 구조를 신경 쓰지 않고 개발하고 싶을 때.

- **AI model의 고유 기능이 크게 중요하지 않은 경우**에 사용합니다.
    - 일반적인 text 생성, 요약, 번역 등의 작업에 적합합니다.


---


## Reference

- <https://docs.aws.amazon.com/bedrock/latest/userguide/api-setup.html>
- <https://docs.aws.amazon.com/bedrock/latest/APIReference/welcome.html>
- <https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-runtime.html>
- <https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters.html>
- <https://github.com/aws-samples/amazon-bedrock-samples>

