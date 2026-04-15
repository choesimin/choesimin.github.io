---
layout: note
permalink: /494
title: OpenCode - Open Source AI Coding Agent
description: OpenCode는 provider에 종속되지 않는 client/server architecture 기반의 open source AI coding agent로, TUI 중심 경험과 LSP 통합을 제공하며 Claude, OpenAI, Google, local model 등 어떤 LLM과도 연결할 수 있습니다.
date: 2026-04-15
---


## OpenCode : Open Source AI Coding Agent

- OpenCode는 terminal에서 동작하는 **open source AI coding agent**로, anomalyco가 주도하여 개발하고 있습니다.
    - Claude Code와 유사한 capability를 제공하지만 source code 전체가 공개되어 있습니다.
    - neovim 사용자와 terminal.shop 제작자들이 만들어 TUI 경험에 특히 집중한 도구입니다.

- 특정 LLM provider에 묶여 있지 않은 **provider-agnostic 설계**가 핵심입니다.
    - Claude, OpenAI, Google 등 주요 상용 model을 지원합니다.
    - Ollama 같은 local model도 동일한 방식으로 연결할 수 있습니다.
    - 추천 model을 묶은 OpenCode Zen service도 함께 운영됩니다.

- terminal TUI와 desktop application 형태로 사용할 수 있습니다.
    - terminal에서는 보통 WezTerm, Alacritty, Ghostty, Kitty 같은 modern terminal과 조합하여 사용합니다.
    - desktop application은 macOS, Windows, Linux를 모두 지원합니다.

- 권한 기반 agent mode, LSP 내장, plugin과 custom tool 확장, multi-provider 설정을 핵심 기능으로 갖추고 있습니다.
    - LSP가 내장되어 있어 agent가 code 수정 직후 type error와 diagnostic을 확인합니다.
    - plugin은 event hook, custom tool, config 변경, chat transform 등을 조합해 OpenCode의 거의 모든 동작을 확장하거나 교체할 수 있는 확장 system입니다.
    - agent별로 model과 prompt, permission을 개별 설정하여 작업 성격에 맞게 분업합니다.


---


## 설계 철학

- OpenCode는 open source, provider 독립성, TUI 우선, client/server 분리라는 네 가지 원칙 위에 설계되어 있습니다.


### 100% Open Source

- source code 전체가 공개되어 누구나 읽고, 수정하고, fork할 수 있습니다.
    - 상용 AI coding agent가 black box로 동작하는 것과 대비되는 지점입니다.
    - community 기여를 전제로 한 개발 process를 따릅니다.

- license는 자유로운 사용과 재배포를 보장합니다.
    - 기업 환경에서도 내부 tool로 fork하여 사용할 수 있습니다.


### Provider-Agnostic

- OpenCode는 특정 LLM provider에 결합되어 있지 않습니다.
    - 단일 provider lock-in을 피하기 위한 의도적 선택입니다.
    - model 성능 격차가 좁혀지고 pricing이 하락하는 추세에서 유연성을 확보합니다.

- `opencode.json` 설정 file에서 provider와 model을 자유롭게 전환합니다.
    - API key만 교체하면 동일한 workflow를 다른 model로 실행합니다.
    - 작업 성격에 따라 서로 다른 model을 agent별로 지정하는 것도 가능합니다.


### TUI-First Experience

- OpenCode는 terminal을 부차적 interface가 아닌 1급 interface로 취급합니다.
    - 제작자들이 neovim 사용자이자 terminal.shop 운영자라는 배경에서 나온 방향성입니다.
    - keyboard 중심 navigation, theme, keybind customization을 기본으로 제공합니다.

- `Tab` key로 agent mode를 전환하는 등 terminal 관습에 충실한 interaction을 설계합니다.
    - `build` agent는 전체 권한을 가진 개발용 mode입니다.
    - `plan` agent는 read-only mode로, file 수정을 차단하고 bash 실행 전 승인을 요청합니다.


### Client/Server Architecture

- OpenCode는 **client와 server를 분리한 architecture**를 채택합니다.
    - server는 project가 있는 machine에서 실행되어 실제 작업을 처리합니다.
    - client는 server에 연결하여 interaction만 담당합니다.

- 이 구조 덕분에 TUI는 여러 client 중 하나일 뿐입니다.
    - 예를 들어, desktop machine에서 server를 돌리고 mobile에서 원격으로 driving하는 구성이 가능합니다.
    - 미래에 어떤 새로운 interface가 추가되더라도 server 쪽은 그대로 유지됩니다.


---


## Reference

- <https://github.com/anomalyco/opencode>
- <https://opencode.ai/docs>
- <https://opencode.ai/docs/plugins>

