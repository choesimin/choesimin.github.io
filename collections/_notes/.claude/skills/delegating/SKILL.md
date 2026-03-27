---
name: delegating
description: Structure and delegate a task to external AI agent (Codex, Copilot, Gemini)
allowed-tools: Bash(codex *), Bash(copilot *), Bash(gemini *)
user-invocable: false
---

# 외부 AI Agent에게 작업 위임
- 외부 AI agent(Codex, Copilot, Gemini)에 작업을 위임할 때 위임 내용을 구조화하고, CLI를 호출하여 실행

## 위임 구조화 절차
1. 작업 맥락 파악 : 현재 작업의 목적과 배경을 대화 흐름 또는 관련 문서에서 확인
2. 위임 prompt 구성 : 목적, 배경, 지시, 기대 결과물, 제약 조건을 모두 포함
    - 작업 목적과 배경 : 왜 이 작업을 하는지, 어떤 맥락인지
    - 구체적인 지시 사항 : 무엇을 어떻게 해야 하는지
    - 기대 결과물 : 작업 완료 시 어떤 상태여야 하는지
    - 제약 조건 : 건드리지 말아야 할 것, 지켜야 할 convention 등
3. 대상 agent의 CLI를 호출하여 실행
4. 결과 검토 및 처리 : 결과를 확인하고 후속 조치 결정
    - 결과가 기대 결과물을 충족하면 -> 완료 보고
    - 결과가 불충분하거나 추가 작업이 필요하면 -> session resume으로 재위임
    - 결과가 실패이거나 방향 판단이 필요하면 -> 사용자에게 보고 후 지시 대기

## 위임 Prompt Template
- prompt는 배경, 목표, 지시, 제약 4개 section으로 구성함
    - `[배경]` : project 개요, 관련 domain 지식, 현재 상태
    - `[목표]` : 이번 작업에서 달성해야 할 것
    - `[지시]` : 구체적인 실행 단계 또는 방향
    - `[제약]` : 변경 금지 항목, 따라야 할 convention, 주의 사항

## Session Resume
- 첫 호출 시 session ID를 추출하여 기억함
- 이후 같은 project 작업은 session resume으로 이어서 실행
- codebase 분석 초기화 비용을 줄이기 위해, 같은 project에 대한 연속 작업은 resume을 우선 사용

## Agent별 CLI reference
- Codex : [codex.md](codex.md)
- Copilot : [copilot.md](copilot.md)
- Gemini : [gemini.md](gemini.md)
