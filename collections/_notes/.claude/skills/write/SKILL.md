---
name: write
description: Write note documents following structure, formatting, and style conventions
---

# 문서 작성 Convention
- Markdown 문법 사용
- 한국어 합니다체로 작성하되, 명사형 종결도 허용
- 영문 용어는 영어로 표기
- 마침표 필수
- emoji 금지

## Front Matter
```yaml
---
layout: note
permalink: /[번호]
title: [제목]
description: [설명]
date: YYYY-MM-DD
---
```
- 모든 문서는 front matter로 시작
- `permalink`는 숫자로 지정
- `description`은 정확히 한 문장이며, 문서의 핵심 내용을 담은 합니다체 문장으로 작성
    - "~설명합니다", "~다룹니다", "~소개합니다" 같은 meta 표현 금지
    - 나쁜 예 : "LAZY와 EAGER loading 전략을 설명합니다."
    - 좋은 예 : "LAZY는 실제 접근 시점에 query를 실행하고, EAGER는 즉시 loading하지만 N+1 위험이 있어 실무에서는 모든 연관 관계를 LAZY로 설정합니다."

## 문장 구조화 규칙
- 제목을 제외한 모든 문장은 `- `로 시작하여 목록화
- 상하위 항목은 4칸 들여쓰기로 구분
- 상위 항목은 핵심 내용을 완전한 문장으로 작성
    - 하위 항목은 구체적인 보충 설명
    - 상위 항목이 있더라도 하위 항목이 없으면 단독으로 완결된 문장이어야 함
- 하나의 bullet은 원칙적으로 하나의 문장으로 작성
    - 두 문장을 하나의 bullet에 나란히 쓰지 않음
    - 해결 방법 1 : 접속사(`~이며`, `~이므로`, `~지만` 등)로 자연스럽게 이어지면 한 bullet 안에서 결합
    - 해결 방법 2 : 두 번째 문장이 첫 문장의 보충 설명이면 하위 bullet으로 분해
    - 나쁜 예 : `worktree 합치는 명령은 없습니다. branch merge로 통합합니다.`
    - 좋은 예 (접속사 결합) : `worktree 합치는 명령은 없으며, branch merge로 통합합니다.`
    - 좋은 예 (하위 bullet 분해) : 상위 bullet에 `worktree 합치는 명령은 없습니다.`, 하위 bullet에 `branch merge로 작업 결과를 통합합니다.`

## Heading 작성 규칙
- `#`(1단계 heading)은 사용하지 않음, `##`부터 시작
- `####`까지 사용 가능하며, `#####` 이하는 사용하지 않음
- heading은 마침표로 끝내지 않음
- 제목 내 영어 단어는 첫 글자 대문자
- heading 바로 아래에 반드시 bulleted 문장(`- `) 하나 이상 작성
    - heading에서 바로 하위 heading이나 code block으로 넘어가지 않음
- heading 아래 설명은 구체적으로 작성
    - "\~하는 방법입니다", "\~의 동작입니다" 같은 추상적 표현 금지

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
- 영어 단어/inline code 뒤에 한글 조사가 올 때 공백 없이 붙여 쓰기
    - 적용 대상 : 영어 단어, backtick으로 감싼 inline code, code path, file 이름 등
    - 조사 예 : 은/는, 이/가, 을/를, 의, 에, 로, 와/과, 이며, 이고, 입니다, 이므로, 에서, 부터, 까지 등
    - 나쁜 예 : `` `index.md` 는 ``, `operation 이며`, `referenced_by 와`, `payment.md 의`
    - 좋은 예 : `` `index.md`는 ``, `operation이며`, `referenced_by와`, `payment.md의`

## 금지 표현
- "다음과 같은", "위와 같은", "아래와 같은"
- "이를 통해", "이러한"
- "\~에 대해 알아보겠습니다", "\~를 소개합니다", "\~를 다룹니다"
- "\~할 수 있습니다" (남발 금지)
- "\~를 제공합니다", "\~를 달성합니다", "\~를 구현합니다"를 연속해서 반복하는 번역체 종결
- 과장된 비유와 수사 : "핵심 전장", "근본적 paradigm", "혁명적 변화", "정수"

## 문장 자립성 규칙
- 각 문장은 그 자체로 의미가 통해야 하며, 앞 문장이나 다음 항목을 가리켜 정보를 미루지 않음
    - 안내문 pattern 금지 : 다음에 올 항목을 예고만 하는 문장은 쓰지 않음
    - 나쁜 예 : "agent loop는 4개의 핵심 원리로 작동합니다." (아래 4개 항목을 예고만 함)
    - 나쁜 예 : "이 한계들을 보완하기 위해 다섯 가지 layer가 필요합니다." (다음 절로 미룸)
    - 해결 방법 1 : 안내 bullet을 삭제하고 하위 항목들이 직접 의미를 전달하게 함
    - 해결 방법 2 : 가리키는 대상의 실제 이름이나 내용을 그 자리에 직접 씀
- 앞 문장을 가리키는 지칭 표현은 별도 bullet에서 사용하지 않음
    - 금지 : "이 원리", "이 구조", "이 계약", "이 한계", "이 문제", "이 흐름", "위 구성", "앞서 짚은"
    - 같은 bullet 내부의 상위 -> 하위 흐름에서 "이"는 허용
    - 별도 bullet으로 떨어져 있을 때는 실제 대상 이름을 직접 씀
    - 나쁜 예 : 별도 bullet에 "이 계약 덕분에 LLM은 호출 가능한 함수처럼 동작합니다."
    - 좋은 예 : "schema 기반 호출 계약 덕분에 LLM은 호출 가능한 함수처럼 동작합니다."
- 개수 지칭 표현 사용 금지
    - 금지 : "다섯 구성 요소", "5가지 layer", "세 가지 방법", "이 다섯 layer"
    - 항목 이름을 직접 나열 : "file system, sandbox, context 관리, sub-agent, hook"

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

## Diagram 규칙
- image 대신 Mermaid.js 문법 사용
- `@` 기호 사용 금지 (parsing 오류 발생)
- color style 적용 금지
- node ID는 lower_snake_case 사용
    - 나쁜 예 : `A[Class A]`, `G[God Object]`
    - 좋은 예 : `class_a[Class A]`, `god_object[God Object]`

## Code Block 규칙
- fenced code block에는 항상 언어 식별자 명시
- 일반 text, directory tree, ASCII 도식, 출력 dump는 `plaintext` 사용 (`text`는 일부 renderer에서 동작하지 않음)
    - 나쁜 예 : ` ```text `
    - 좋은 예 : ` ```plaintext `
- shell command는 `bash`, 그 외 언어는 표준 식별자 사용 (`kotlin`, `python`, `yaml`, `markdown`, `mermaid` 등)
- 식별자 없이 ` ``` `로만 시작하지 않음 (rendering이 일관되지 않음)

## Table 규칙
- 구분자는 `| --- |`로 통일
- 내용은 명사형으로 작성, 마침표 없음

## 참고 자료 규칙
- 문서 하단에 `## Reference` heading 추가
- 형식 : `- <url>`

## 문서 끝 규칙
- file 맨 아래에 빈 줄이 하나 있어야 함

## 문서 독립성
- 저장소 내 다른 문서로 연결(link)하지 않음
- 관련 내용은 link 대신 핵심 내용을 간략히 요약

## 작성 전 준비
- [sample.md](./sample.md) file을 읽고 문체와 구조 파악
- 흐름, 계층 구조, 관계 설명 시 Mermaid.js diagram 적극 활용

## 작성 후 검증 목록
- `description`이 핵심 내용 요약인가 ("~설명합니다" 같은 meta 표현을 쓰지 않았는가)
- 각 heading 아래에 bulleted 설명이 하나 이상 있는가
- heading 아래 요약이 구체적인가 (추상적 표현 없는가)
- 금지 표현을 사용하지 않았는가
- 번역체 종결이 반복되지 않는가
- 한 bullet 안에 독립된 문장이 여러 개 들어 있지 않은가
- 영어 표기 규칙이 일관되게 적용되었는가
- 영어 단어와 inline code 뒤에 한글 조사를 공백 없이 붙여 썼는가
- code block에 언어 식별자가 명시되어 있고 일반 text는 `plaintext`를 사용했는가
- 모든 문장이 마침표로 끝나는가
- colon 앞뒤에 공백이 있는가
- emoji를 사용하지 않았는가
- file 맨 아래에 빈 줄이 하나 있는가
