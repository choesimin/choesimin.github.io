---
name: writing
description: Apply note document writing conventions
---

# 문서 작성 Convention
- Markdown 문법 사용
- 한국어 합니다체로 작성하되, 명사형 종결도 허용
- 영문 용어는 영어로 표기
- 마침표 필수
- emoji 금지

## Front Matter
- 모든 문서는 front matter로 시작
- `permalink`는 숫자로 지정
- `description`은 정확히 한 문장
```yaml
---
layout: note
permalink: /[번호]
title: [제목]
description: [설명]
date: YYYY-MM-DD
---
```

## 문장 구조화 규칙
- 제목을 제외한 모든 문장은 `- `로 시작하여 목록화
- 상하위 항목은 4칸 들여쓰기로 구분
- 상위 항목은 핵심 내용을 완전한 문장으로 작성
    - 하위 항목은 구체적인 보충 설명
    - 상위 항목이 있더라도 하위 항목이 없으면 단독으로 완결된 문장이어야 함

## Heading 작성 규칙
- `#` (1단계 heading)은 사용하지 않음, `##`부터 시작
- `####`까지 사용 가능하며, `#####` 이하는 사용하지 않음
- heading은 마침표로 끝내지 않음
- 제목 내 영어 단어는 첫 글자 대문자
- heading 바로 아래에 반드시 bulleted 문장(`- `) 하나 이상 작성
    - heading에서 바로 하위 heading이나 code block으로 넘어가지 않음
- heading 아래 설명은 구체적으로 작성
    - "~하는 방법입니다", "~의 동작입니다" 같은 추상적 표현 금지

## 단락 구분 규칙
- `##` 단락 사이 : `---` 구분선과 빈 줄 두 개
- `###` 단락 사이 : 빈 줄 두 개
- `####` 단락 사이 : 빈 줄 한 개

## 영어 단어 표기 규칙
- 영어 원어 단어는 영어로 표기 (database, button, system, server 등)
- 고유 명사는 대문자, 일반 명사는 소문자 (Debezium, Linux / system, database)
- 문장 시작이 일반 명사이면 소문자로 시작
- 제목 내 영어 단어는 첫 글자 대문자
- 첫 등장 시 괄호로 한글 병기 가능, 이후에는 영어만 사용
    - 예 : `default parameter(기본 매개 변수)는 parameter에 기본값을 지정하는 기능입니다.`

## 금지 표현
- "다음과 같은", "위와 같은", "아래와 같은"
- "이를 통해", "이러한"
- "~에 대해 알아보겠습니다", "~를 소개합니다", "~를 다룹니다"
- "~할 수 있습니다" (남발 금지)
- "~를 제공합니다", "~를 달성합니다", "~를 구현합니다"를 연속해서 반복하는 번역체 종결

## 문장 완결성 규칙
- 문장은 콜론(`:`)으로 끝나지 않음
    - 나쁜 예 : "`val`과 `const val`의 차이점 :"
    - 좋은 예 : "`val`과 `const val`은 값 결정 시점, 사용 가능 type, 선언 위치에서 차이가 있습니다."
- 문장 끝에 괄호로 부연 설명하지 않음
    - 나쁜 예 : "`send`는 값을 channel에 보냅니다 (suspend 함수)."
    - 좋은 예 : "`send`는 suspend 함수로, 값을 channel에 보냅니다."

## 특수 문자 규칙
- colon(`:`) 앞뒤에 공백 하나씩 추가
- emoji(✓, ✗, ⚠️ 등) 사용 금지
- code 요소(class, function, keyword, annotation)는 backtick으로 감쌈
    - 예 : `Channel`, `Flow`, `launch`, `suspend`
- 수식과 Big O 표기도 backtick 사용
    - 예 : `O(1)`, `O(n)`, `n²`
- 개념적 용어는 backtick 없이 작성
    - 예 : scope, buffer, handler, pattern

## 다이어그램 규칙
- 이미지 대신 Mermaid.js 문법 사용
- `@` 기호 사용 금지 (파싱 오류 발생)
- color style 적용 금지
- node ID는 lower_snake_case 사용
    - 나쁜 예 : `A[Class A]`, `G[God Object]`
    - 좋은 예 : `class_a[Class A]`, `god_object[God Object]`

## Table 규칙
- 구분자는 `| --- |`로 통일
- 내용은 명사형으로 작성, 마침표 없음

## 참고 자료 규칙
- 문서 하단에 `## Reference` heading 추가
- 형식 : `- <url>`

## 문서 독립성
- 저장소 내 다른 문서로 링크하지 않음
- 관련 내용은 링크 대신 핵심 내용을 간략히 요약

## 작성 전 준비
- `collections/_notes`의 기존 문서를 여러 편 읽고 문체와 구조 파악
- 흐름, 계층 구조, 관계 설명 시 Mermaid.js 다이어그램 적극 활용

## 작성 후 검증 체크리스트
- 각 heading 아래에 bulleted 설명이 하나 이상 있는가?
- heading 아래 요약이 구체적인가? (추상적 표현 없는가?)
- 금지 표현을 사용하지 않았는가?
- 번역체 종결이 반복되지 않는가?
- 영어 표기 규칙이 일관되게 적용되었는가?
- 모든 문장이 마침표로 끝나는가?
- colon 앞뒤에 공백이 있는가?
- emoji를 사용하지 않았는가?
