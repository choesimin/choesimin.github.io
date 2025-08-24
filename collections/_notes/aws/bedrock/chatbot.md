---
layout: note
permalink: /3??
title: Amazon Bedrock을 이용한 AI Chatboat 구축하기 (MCP, RAG 사용)
description: MCP, RAG
date: 2025-08-09
published: false
---















---


# MCP 설정하기

1. MCP 서버 설정
    - Google Analytics MCP 서버 설치 및 구성
    - Python 환경 및 필수 패키지 설치
    - Google Analytics Admin API 및 Data API 활성화

2. 인증 구성
    - Application Default Credentials (ADC) 설정
    - Google Analytics 읽기 전용 스코프 권한 구성
    - 서비스 계정 또는 사용자 인증 선택 및 설정

3. Lambda 함수 연동
    - 현재 bedrock-chatbot Lambda 함수에 MCP 클라이언트 기능 추가
    - Google Analytics API 호출을 위한 새로운 엔드포인트 생성
    - requirements.txt에 필요한 패키지 추가

4. 테스트 및 배포
    - 로컬 환경에서 MCP 연결 테스트
    - AWS Lambda에서 Google Analytics 데이터 접근 검증
    - CloudFormation 템플릿 업데이트 (필요시)


---


# Google Analytics MCP 연결 가이드

## 개요
이 프로젝트에 Google Analytics MCP (Model Context Protocol) 연결 기능을 추가했습니다. 이를 통해 Lambda 함수에서 Google Analytics 데이터를 직접 조회하고 분석할 수 있습니다.

## 설정 방법

### 1. Google Analytics API 활성화
1. [Google Cloud Console](https://console.cloud.google.com/)에 로그인
2. 프로젝트 생성 또는 기존 프로젝트 선택
3. API 및 서비스 → 라이브러리에서 다음 API 활성화:
   - Google Analytics Data API
   - Google Analytics Admin API

### 2. 서비스 계정 생성 및 키 발급
1. Google Cloud Console → IAM 및 관리자 → 서비스 계정
2. 서비스 계정 생성
3. 키 탭에서 키 추가 → JSON 키 생성
4. JSON 키 파일 다운로드

### 3. Google Analytics 권한 설정
1. Google Analytics 계정에서 해당 속성(Property)으로 이동
2. 관리 → 속성 사용자 관리
3. 서비스 계정 이메일 주소 추가 (뷰어 권한 부여)

### 4. AWS 배포 설정
배포 시 다음 파라미터를 설정해야 합니다:

```bash
sam deploy --parameter-overrides \
  Environment=dev \
  GoogleCredentials='{"type":"service_account","project_id":"your-project-id",...}'
```

또는 환경변수로 설정:
```bash
export GOOGLE_CREDENTIALS='{"type":"service_account","project_id":"your-project-id",...}'
```

## API 사용법

### 엔드포인트
```
POST https://your-api-gateway-url/analytics
```

### 지원하는 액션

#### 1. 기본 리포트 조회 (`get_reports`)
```json
{
  "property_id": "123456789",
  "action": "get_reports",
  "start_date": "7daysAgo",
  "end_date": "today",
  "metrics": ["sessions", "pageviews"],
  "dimensions": ["date"]
}
```

#### 2. 실시간 데이터 조회 (`get_realtime`)
```json
{
  "property_id": "123456789",
  "action": "get_realtime"
}
```

#### 3. 속성 정보 조회 (`get_property_info`)
```json
{
  "property_id": "123456789",
  "action": "get_property_info"
}
```

### 응답 예시

#### 성공 응답
```json
{
  "status": "success",
  "data": {
    "rows": [
      {
        "date": "20231201",
        "sessions": "1234",
        "pageviews": "5678"
      }
    ],
    "row_count": 1,
    "dimensions": ["date"],
    "metrics": ["sessions", "pageviews"]
  },
  "property_id": "123456789"
}
```

#### 실시간 데이터 응답
```json
{
  "status": "success",
  "data": {
    "realtime_data": [
      {
        "country": "South Korea",
        "city": "Seoul",
        "active_users": "42"
      }
    ],
    "total_active_users": 42,
    "timestamp": 1701234567
  },
  "type": "realtime"
}
```

#### 에러 응답
```json
{
  "error": "Google Analytics API 호출 중 오류가 발생했습니다: 인증 실패",
  "status": "analytics_error"
}
```

## 보안 고려사항

1. **서비스 계정 키 보안**: JSON 키 파일은 안전하게 보관하고, 환경변수나 AWS Secrets Manager를 통해 관리
2. **최소 권한 원칙**: Google Analytics에서 뷰어 권한만 부여
3. **API 키 순환**: 정기적으로 서비스 계정 키 갱신

## 문제해결

### 1. 인증 오류
- 서비스 계정 키가 올바른지 확인
- Google Analytics에서 서비스 계정에 권한이 부여되었는지 확인
- API가 활성화되었는지 확인

### 2. 속성 ID 오류
- Google Analytics에서 올바른 속성 ID 확인
- 속성 ID는 숫자만 포함 (예: 123456789)

### 3. 권한 오류
- 서비스 계정이 해당 속성에 액세스 권한이 있는지 확인
- 뷰어 이상의 권한이 부여되었는지 확인

## 참고 자료

- [Google Analytics Data API 문서](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [Google Analytics Admin API 문서](https://developers.google.com/analytics/devguides/config/admin/v1)
- [Model Context Protocol](https://modelcontextprotocol.io/)












---


## Reference

- <https://aws.amazon.com/ko/blogs/tech/amazon-bedrock-agents-mcp-model-context-protocol/>

