---
layout: skill
permalink: /300
title: Git Commit Template 지정하기 (git config commit.template)
description: commit template은 일관성 있는 commit message를 작성하기 위한 표준 양식입니다.
date: 2025-03-10
---


## Git Commit Template

- 일관된 commit message format은 project의 유지 보수성을 높이는 중요한 요소입니다.
    - commit history를 관리하고, 변경 사항을 추적하는 데 도움이 됩니다.
    - 특히, 협업하는 project에서는 commit message의 일관성이 더욱 중요합니다.

- commit message를 일관성 있게 작성하기 위해 **commit template**을 사용할 수 있습니다.
    - commit template은 commit message의 구조와 내용을 정의하는 표준 양식입니다.
    - template을 사용하면 commit message의 형식을 일관되게 유지할 수 있습니다.


---


## Commit Template 설정 방법

- `.gitmessage` file을 생성하여 commit template을 정의하고, git 설정에 등록합니다.


### 1. Template File 작성

- commit template을 정의하는 file을 생성하고, 원하는 양식을 작성합니다.
    - terminal에서는 `touch .gitmessage`나 `vim .gitmessage` 명령어로 file을 생성할 수 있습니다.

```bash
touch .gitmessage
```


### 2. Git 설정에 Template 등록

- `git config` 명령어를 사용하여 project에 commit template을 설정합니다.

```bash
# 현재 project에만 template 적용
git config commit.template .gitmessage
```

#### 전역 설정

- 모든 project에 전역적으로 적용하려면 `--global` option을 추가해 실행합니다.

```bash
# 전역적으로 template 적용
git config --global commit.template ~/.gitmessage
```


### 3. template 사용하기

- 설정 후 `git commit` 명령어를 실행하면 설정한 template이 editor에 자동으로 load됩니다.
    - 정의해둔 template의 안내에 따라 commit message를 작성하고, 작성이 완료되면 저장하고 editor를 종료합니다.


---


## Commit Template의 다양한 예시

- 기본적인 template부터 enterprise, Emoji 활용 template, open source project, frontend/backend project, mobile app, ML/AI project, DevOps/Infra 등, 다양한 상황에 맞는 다양한 template 형식이 존재합니다.

- template 선택에 정답은 없으며, project의 상황과 환경에 맞추어 적절한 template을 선택하는 것이 중요합니다.


### 기본 Conventional Commit Style

```txt
# <type>(<scope>): <subject>
# |<----  제목은 최대 50자까지 입력  ---->|
#
# 변경 사항에 대한 상세 설명을 작성합니다.
# |<----   본문은 각 줄당 72자까지   ---->|
#
# 꼬리말:
# - 관련 이슈: #123
# - Breaking Changes가 있을 경우 상세히 명시
#
# --- 커밋 타입 ---
# feat: 새로운 기능 추가
# fix: 버그 수정
# docs: 문서 수정
# style: 코드 포맷팅, 세미콜론 누락 등 (코드 변경 없음)
# refactor: 코드 리팩토링
# test: 테스트 코드 추가 또는 수정
# chore: 빌드 프로세스, 패키지 매니저 설정 등
# perf: 성능 개선
# ci: CI 관련 설정 변경
# build: 빌드 시스템, 외부 의존성 변경
# revert: 이전 커밋으로 되돌림
```


### 기업형 상세 Template

```txt
# [<TYPE>] <JIRA-ID>: <subject>
# |<----  제목은 최대 50자까지 입력  ---->|
#
# ------ 아래 항목을 반드시 채워주세요 ------
# 변경 내용 요약: 
# (What) 어떤 변경사항이 있는지 간략히 서술
#
# 변경 사유: 
# (Why) 왜 이런 변경이 필요했는지 설명
#
# 특이 사항: 
# 테스트 방법, 주의할 점, 관련 문서 링크 등
#
# ------ 선택적으로 채워주세요 ------
# 관련 작업: 
# - 관련 JIRA 티켓: PROJ-123
# - 관련 PR: #456
# - 관련 팀원: @username
#
# --- 커밋 타입 ---
# FEAT: 새로운 기능 추가
# FIX: 버그 수정
# DOCS: 문서 수정
# STYLE: 코드 포맷팅, 세미콜론 누락 등 (코드 변경 없음)
# REFACTOR: 코드 리팩토링
# TEST: 테스트 코드 추가 또는 수정
# CHORE: 빌드 프로세스, 패키지 매니저 설정 등
# PERF: 성능 개선
# SEC: 보안 이슈 수정
```


### Emoji 활용 Template (Gitmoji)

```txt
# <emoji> <type>: <subject>
# |<----  제목은 최대 50자까지 입력  ---->|
#
# 본문 설명
# |<----   본문은 각 줄당 72자까지   ---->|
#
# 꼬리말
# - 관련 이슈: #123
#
# --- 커밋 타입과 이모지 ---
# ✨ feat: 새로운 기능 추가
# 🐛 fix: 버그 수정
# 📝 docs: 문서 수정
# 💄 style: 코드 스타일, 포맷팅 변경
# ♻️ refactor: 코드 리팩토링
# ✅ test: 테스트 코드 추가 또는 수정
# 🔧 chore: 빌드 프로세스, 설정 변경
# ⚡️ perf: 성능 개선
# 🔒 security: 보안 이슈 수정
# 🚀 deploy: 배포 관련 변경
# 🎨 ui: UI/디자인 변경
# 🗃️ db: 데이터베이스 관련 변경
# 🔍 seo: SEO 개선
```


### 간소화된 기본 Template

```txt
# 제목: 변경 사항을 한 줄로 요약 (50자 이내)
# 
# 본문: 변경 사항에 대한 자세한 설명 (선택 사항)
# - 왜 이 변경이 필요했는지
# - 어떤 문제를 해결하는지
# - 다른 방법보다 이 방법을 선택한 이유
# 
# 관련 이슈: #123 (해당되는 경우)
```


### Open Source Project Template

```txt
# <type>(<scope>): <subject>
# |<----  제목은 최대 50자까지 입력  ---->|
#
# 변경 사항에 대한 상세 설명:
# - 어떤 문제를 해결하는지
# - 어떻게 해결했는지
# - 영향을 받는 부분
#
# Breaking Changes (있을 경우):
# - 어떤 호환성 문제가 발생할 수 있는지
# - 사용자가 어떻게 마이그레이션해야 하는지
#
# 관련 이슈: #123, #456
#
# Signed-off-by: Your Name <your.email@example.com>
#
# --- 커밋 타입 ---
# feat: 새로운 기능 추가
# fix: 버그 수정
# docs: 문서 수정
# style: 코드 스타일 변경 (기능 변경 없음)
# refactor: 코드 리팩토링
# perf: 성능 개선
# test: 테스트 관련 변경
# build: 빌드 시스템 또는 외부 의존성 변경
# ci: CI 구성 파일 및 스크립트 변경
# chore: 그 외 변경사항
# revert: 이전 커밋 되돌림
```


### Frontend Project Template

```txt
# <type>(<scope>): <subject>
# |<----  제목은 최대 50자까지 입력  ---->|
#
# 변경 사항 설명:
# |<----   본문은 각 줄당 72자까지   ---->|
#
# 스크린샷 또는 GIF (UI 변경 시):
# [여기에 이미지 링크 추가]
#
# 테스트 방법:
# 1. 어떤 화면으로 이동
# 2. 어떤 버튼 클릭
# 3. 결과 확인
#
# 관련 이슈: #123
#
# --- 커밋 타입 ---
# feat: 새로운 기능 추가
# fix: 버그 수정
# style: UI 스타일 변경
# refactor: 코드 리팩토링
# perf: 성능 개선
# a11y: 접근성 개선
# i18n: 국제화/현지화
# test: 테스트 추가/수정
# chore: 빌드 프로세스 변경
# docs: 문서 수정
# deps: 의존성 업데이트
```


### Backend Project Template

```txt
# <type>(<scope>): <subject>
# |<----  제목은 최대 50자까지 입력  ---->|
#
# 변경 사항 상세 설명:
# |<----   본문은 각 줄당 72자까지   ---->|
#
# 데이터베이스 변경 (있을 경우):
# - 스키마 변경:
# - 마이그레이션 필요 여부:
# - 데이터 마이그레이션 방법:
#
# API 변경 (있을 경우):
# - 엔드포인트:
# - 요청/응답 형식:
# - 하위 호환성 유지 여부:
#
# 성능 고려사항:
# - 예상되는 부하:
# - 최적화 방안:
#
# 관련 이슈: #123
#
# --- 커밋 타입 ---
# feat: 새로운 기능 추가
# fix: 버그 수정
# perf: 성능 개선
# refactor: 코드 리팩토링
# db: 데이터베이스 관련 변경
# api: API 관련 변경
# test: 테스트 추가/수정
# config: 설정 변경
# sec: 보안 관련 수정
# docs: 문서 수정
# deps: 의존성 업데이트
```


### 간단한 Mobile App 개발 Template

```txt
# [<platform>] <type>: <subject>
# |<----  제목은 최대 50자까지 입력  ---->|
#
# 변경 사항:
# 
# 테스트 완료 기기:
# - [ ] iPhone
# - [ ] Android
# - [ ] Tablet
#
# 스크린샷:
# [여기에 이미지 링크 추가]
#
# 관련 이슈: #123
#
# --- 플랫폼 ---
# iOS: iOS 관련 변경
# Android: Android 관련 변경
# Common: 공통 변경사항
#
# --- 커밋 타입 ---
# feat: 새로운 기능
# fix: 버그 수정
# ui: UI/디자인 변경
# perf: 성능 개선
# refactor: 코드 리팩토링
# test: 테스트 추가/수정
# deps: 의존성 업데이트
```


### ML/AI Project Template

```txt
# <type>(<scope>): <subject>
# |<----  제목은 최대 50자까지 입력  ---->|
#
# 변경 사항 설명:
# |<----   본문은 각 줄당 72자까지   ---->|
#
# 모델 변경 (있을 경우):
# - 알고리즘:
# - 하이퍼파라미터:
# - 성능 지표 변화:
#
# 데이터셋 변경 (있을 경우):
# - 데이터 소스:
# - 전처리 방법:
# - 데이터 크기/분포:
#
# 실험 결과:
# - 성능 향상:
# - 학습 시간:
# - 리소스 사용량:
#
# 관련 이슈: #123
#
# --- 커밋 타입 ---
# data: 데이터셋 변경
# model: 모델 구조 변경
# train: 학습 코드 변경
# eval: 평가 코드 변경
# feat: 새로운 기능 추가
# fix: 버그 수정
# perf: 성능 개선
# refactor: 코드 리팩토링
# docs: 문서 수정
# viz: 시각화 관련 변경
```


### DevOps/Infra Template

```txt
# <type>(<scope>): <subject>
# |<----  제목은 최대 50자까지 입력  ---->|
#
# 변경 사항 설명:
# |<----   본문은 각 줄당 72자까지   ---->|
#
# 인프라 변경 (있을 경우):
# - 변경된 리소스:
# - 영향 받는 환경:
# - 롤백 방법:
#
# 보안 고려사항:
# - 접근 권한 변경:
# - 인증/인가 변경:
# - 잠재적 취약점:
#
# 테스트 방법:
# - 테스트 환경:
# - 검증 단계:
#
# 관련 이슈: #123
#
# --- 커밋 타입 ---
# infra: 인프라 변경
# config: 설정 변경
# deploy: 배포 파이프라인 변경
# monitor: 모니터링 변경
# sec: 보안 관련 변경
# perf: 성능 최적화
# scale: 스케일링 관련 변경
# backup: 백업/복구 관련 변경
# docs: 문서 수정
# fix: 버그 수정
```


---


## Template을 이용한 실제 Commit Message 예시

- template들을 사용했을 때 실제 commit message 예시입니다.
    - commit message의 구조와 내용을 일관성 있게 유지하며, 변경 사항을 명확하게 설명합니다.

```txt
feat(auth): implement JWT authentication system

- 사용자 인증 프로세스를 JWT 기반으로 구현했습니다.
- 토큰 기반 인증으로 stateless 서버 구조를 지원합니다.
- 토큰 만료 시간은 2시간으로 설정했습니다.

관련 이슈: #123
```

```txt
🐛 fix: resolve memory leak in image processing module

- 대용량 이미지 처리 시 발생하던 메모리 누수 문제를 해결했습니다.
- 이미지 buffer 사용 후 명시적 해제를 추가했습니다.
- 64MB 이상 이미지에서 발생하던 OOM 오류가 해결되었습니다.

관련 이슈: #456
```

```txt
[iOS] perf: optimize app startup time

- 앱 시작 시간을 30% 개선했습니다.
- 불필요한 리소스 로딩을 지연 로딩 방식으로 변경했습니다.
- 초기 화면 렌더링 우선순위를 높였습니다.

테스트 완료 기기:
- [x] iPhone 12
- [x] iPhone 14 Pro
- [x] iPad Pro

관련 이슈: #789
```
