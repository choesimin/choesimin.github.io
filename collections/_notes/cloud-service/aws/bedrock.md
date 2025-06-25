---
layout: note
permalink: /68
title: Amazon Bedrock - 완전 관리형 AI Service
description: 
date: 2025-06-25
published: false
---


# Amazon Bedrock 개요

- Amazon Bedrock은 AWS가 제공하는 완전 관리형 generative AI service입니다.
- 여러 foundation model을 통합하여 제공하며, 기업이 AI application을 쉽게 구축하고 배포할 수 있도록 지원합니다.
- serverless 방식으로 운영되어 infrastructure 관리 부담 없이 AI 기능을 활용할 수 있습니다.


---


## 주요 특징

- **다양한 Foundation Model 지원** : Anthropic Claude, Meta Llama, Cohere Command, Amazon Titan 등 여러 AI model을 단일 API로 접근할 수 있습니다.
- **완전 관리형 service** : model hosting, scaling, monitoring 등의 infrastructure 관리를 AWS가 담당합니다.
- **보안 및 규정 준수** : enterprise급 보안 기능과 data privacy 보호 기능을 제공합니다.
- **비용 효율성** : 사용한 만큼만 비용을 지불하는 pay-as-you-go 모델을 적용합니다.


---


## 지원 Foundation Model

- **Anthropic Claude** : 대화형 AI와 text 생성에 특화된 model입니다.
    - Claude 3 Haiku, Claude 3 Sonnet, Claude 3 Opus 등 다양한 버전을 지원합니다.
    - 긴 context 처리와 안전한 AI 응답 생성에 강점을 가집니다.

- **Meta Llama** : open source 기반의 대화형 AI model입니다.
    - Llama 2와 Code Llama 등의 변형 model을 포함합니다.
    - code 생성과 다국어 처리에 우수한 성능을 보입니다.

- **Cohere Command** : business 환경에 최적화된 text 생성 model입니다.
    - 요약, 분류, 질의응답 등의 작업에 특화되어 있습니다.
    - 다국어 지원과 embedding 기능을 제공합니다.

- **Amazon Titan** : AWS에서 자체 개발한 foundation model입니다.
    - text 생성과 embedding 기능을 모두 지원합니다.
    - AWS service와의 통합성이 뛰어납니다.


---


## 핵심 기능

### Model 접근 및 관리

- **통합 API** : 여러 foundation model을 하나의 API interface로 접근할 수 있습니다.
- **model 비교** : 동일한 prompt에 대해 여러 model의 응답을 비교하여 최적의 model을 선택할 수 있습니다.
- **version 관리** : model의 version 변경과 rollback을 간편하게 수행할 수 있습니다.

### Fine-tuning 및 customization

- **custom model 생성** : 기업의 특정 data를 사용하여 model을 fine-tuning할 수 있습니다.
- **knowledge base 통합** : 기업 내부 문서와 data를 AI model에 연결하여 retrieval-augmented generation(RAG)을 구현할 수 있습니다.
- **agent 기능** : 복잡한 작업을 자동화하는 AI agent를 구축할 수 있습니다.

### 보안 및 규정 준수

- **data 격리** : 고객의 data는 다른 고객과 완전히 분리되어 처리됩니다.
- **암호화** : 전송 중과 저장 중인 data 모두 암호화됩니다.
- **access 제어** : AWS IAM을 통한 세밀한 권한 관리가 가능합니다.
- **규정 준수** : SOC, GDPR, HIPAA 등 주요 규정을 준수합니다.


---


## 사용 사례

### Content 생성 및 편집

- **marketing content 작성** : 광고 문구, blog post, social media content 등을 자동 생성할 수 있습니다.
- **문서 요약** : 긴 문서나 report를 핵심 내용으로 요약할 수 있습니다.
- **번역 및 현지화** : 다국어 content 번역과 문화적 맥락을 고려한 현지화를 수행할 수 있습니다.

### Customer service 자동화

- **chatbot 구축** : 고객 문의에 대한 자동 응답 system을 구축할 수 있습니다.
- **sentiment 분석** : 고객 feedback의 감정과 만족도를 분석할 수 있습니다.
- **ticket 분류** : 고객 문의를 자동으로 분류하여 적절한 담당자에게 배정할 수 있습니다.

### Code 개발 지원

- **code 생성** : 자연어 설명을 바탕으로 code를 자동 생성할 수 있습니다.
- **code review** : 기존 code의 문제점을 찾고 개선 방안을 제시할 수 있습니다.
- **documentation 생성** : code에 대한 주석과 documentation을 자동으로 생성할 수 있습니다.

### Data 분석 및 insight 도출

- **report 자동 생성** : 수치 data를 바탕으로 분석 report를 자동 생성할 수 있습니다.
- **trend 분석** : 시장 동향과 pattern을 분석하여 business insight를 제공할 수 있습니다.
- **예측 모델링** : 과거 data를 기반으로 미래 trend를 예측할 수 있습니다.


---


## 요금 체계

- **On-Demand 요금** : 실제 사용한 token 수에 따라 요금이 부과됩니다.
    - input token과 output token이 서로 다른 요금을 적용받습니다.
    - model별로 서로 다른 요금 체계를 가집니다.

- **Provisioned Throughput** : 일정한 처리량을 보장받는 대신 시간당 고정 요금을 지불합니다.
    - 대량의 요청을 처리해야 하는 경우에 비용 효율적입니다.
    - 예측 가능한 성능과 응답 시간을 보장받을 수 있습니다.

- **Model customization** : fine-tuning과 custom model 훈련에 대한 별도 요금이 적용됩니다.
    - 훈련 시간과 사용한 computing resource에 따라 요금이 계산됩니다.


---


## 통합 및 연동

### AWS Service 통합

- **Amazon S3** : 대용량 문서와 data set을 저장하고 AI model에 연결할 수 있습니다.
- **AWS Lambda** : serverless function을 통해 AI 기능을 event 기반으로 실행할 수 있습니다.
- **Amazon API Gateway** : RESTful API를 통해 외부 application과 연동할 수 있습니다.
- **AWS CloudWatch** : model 사용량과 성능을 monitoring하고 alert를 설정할 수 있습니다.

### 개발 도구 지원

- **SDK 제공** : Python, Java, JavaScript 등 주요 programming 언어를 위한 SDK를 제공합니다.
- **CLI 지원** : AWS CLI를 통해 command line에서 Bedrock 기능을 사용할 수 있습니다.
- **Console interface** : web 기반 관리 console에서 model을 테스트하고 관리할 수 있습니다.

### 제3자 도구 연동

- **LangChain** : 인기 있는 AI application framework와 연동이 가능합니다.
- **Streamlit** : data science application을 빠르게 구축할 수 있습니다.
- **Jupyter Notebook** : 연구 및 prototype 개발 환경에서 활용할 수 있습니다.


---


## 제한 사항 및 고려 사항

### 기술적 제한

- **model availability** : 모든 AWS region에서 모든 model을 사용할 수 있는 것은 아닙니다.
- **token 제한** : 각 model마다 최대 처리 가능한 token 수가 정해져 있습니다.
- **응답 시간** : 복잡한 요청의 경우 응답 시간이 길어질 수 있습니다.

### 비용 관리

- **예상치 못한 비용** : token 사용량이 급증할 경우 예상보다 높은 비용이 발생할 수 있습니다.
- **model별 요금 차이** : 고성능 model일수록 더 높은 비용이 적용됩니다.
- **data 전송 비용** : 대용량 data 처리 시 추가적인 data 전송 비용이 발생할 수 있습니다.

### 보안 및 규정 준수

- **data 위치** : 규정에 따라 특정 지역에만 data를 저장해야 하는 경우 고려해야 합니다.
- **sensitive data 처리** : 개인정보나 기밀 정보 처리 시 추가적인 보안 조치가 필요합니다.
- **audit trail** : 규정 준수를 위해 모든 API 호출과 data 처리 기록을 관리해야 합니다.


---


## 시작하기

### 사전 준비

- **AWS 계정** : Amazon Bedrock을 사용하기 위해 AWS 계정이 필요합니다.
- **IAM 권한 설정** : Bedrock service에 접근할 수 있는 적절한 권한을 설정해야 합니다.
- **model access 요청** : 일부 model의 경우 별도의 access 요청이 필요할 수 있습니다.

### 기본 설정

- **region 선택** : 사용하고자 하는 model이 지원되는 AWS region을 선택합니다.
- **model 활성화** : 사용할 foundation model을 활성화합니다.
- **API 호출 테스트** : console에서 간단한 prompt를 통해 model 동작을 확인합니다.

### 개발 환경 구성

- **SDK 설치** : 사용하는 programming 언어에 맞는 AWS SDK를 설치합니다.
- **인증 설정** : AWS credentials를 설정하여 API 호출을 위한 인증을 구성합니다.
- **첫 번째 application 개발** : 간단한 text 생성 application을 만들어 동작을 확인합니다.


---


## Reference

- <https://aws.amazon.com/bedrock/>
- <https://docs.aws.amazon.com/bedrock/>
