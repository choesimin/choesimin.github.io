---
layout: note
permalink: /495
title: OpenCode Plugin 만들기
description: OpenCode plugin은 npm install 한 줄로 가져다 쓸 수 있는 기능 묶음이며, 직접 만들 때는 async factory 함수 하나를 export하는 TypeScript module로 작성합니다.
date: 2026-04-15
---


## Plugin의 최소 구조

- OpenCode plugin은 `Plugin` type(`(input) => Promise<Hooks>`)을 만족하는 **async factory 함수**를 export하는 module입니다.
    - factory 함수는 context를 받아 hook object를 반환합니다.
    - 가장 작은 plugin은 file 하나, 함수 하나로 끝납니다.
    - 여러 plugin 함수를 한 module에서 export할 수 있고, runtime은 `{ server: Plugin }` 형태의 module object도 entrypoint로 인식합니다.

```ts
import type { Plugin } from "@opencode-ai/plugin"

export const MyPlugin: Plugin = async (ctx) => {
    return {
        event: async ({ event }) => {
            if (event.type === "session.idle") {
                console.log("Session is idle")
            }
        },
    }
}
```

- factory 함수가 받는 context object(`ctx`)는 project 정보, SDK client, shell API를 포함합니다.

| Field | 설명 |
| --- | --- |
| `project` | 현재 project 정보 |
| `directory` | 실행 directory 경로 |
| `worktree` | git worktree 경로 |
| `client` | opencode SDK client (session, tui, app 등의 API) |
| `$` | Bun shell API |


---


## Project 구조

- plugin은 `.opencode/plugins/`에 file을 두는 **local plugin**과, npm package로 배포하는 **npm plugin** 두 방식으로 만듭니다.
    - local plugin은 빠르게 시작하기 좋고, npm plugin은 여러 project에서 재사용할 때 적합합니다.


### Local Plugin 구조

- `.opencode/plugins/`에 `.ts` 또는 `.js` file을 두면 별도 설정 없이 동작합니다.
    - 가장 단순한 형태는 file 하나로 끝납니다.
    - 기능이 커지면 helper module을 분리하고 `package.json`을 추가합니다.

```
my-project/
├── .opencode/
│   ├── plugins/
│   │   └── my-plugin.ts          # plugin entry point
│   └── package.json              # 외부 dependency가 있을 때만 필요
├── opencode.json
└── ...
```

- `~/.config/opencode/plugins/`에 두면 모든 project에서 global하게 적용됩니다.

- local plugin이 외부 npm package를 사용하려면 config directory(`.opencode/` 또는 `~/.config/opencode/`)에 `package.json`을 둡니다.
    - OpenCode가 startup 시 `bun install`을 실행해 의존성을 설치합니다.


### npm Plugin 구조 : 단일 기능

- 단일 기능을 하는 plugin은 `src/`에 source를 두고 `dist/`로 build하는 구조가 일반적입니다.
    - wakatime, smart-title, model-announcer 등 대부분의 community plugin이 이 구조를 따릅니다.

```
opencode-my-plugin/
├── src/
│   ├── index.ts                  # plugin factory export
│   ├── logger.ts                 # logging utility
│   └── config.ts                 # config loading
├── dist/                         # build output
├── package.json
├── tsconfig.json
└── README.md
```

- `package.json`에서 `@opencode-ai/plugin`은 보통 `dependencies`에 둡니다.
    - 공식 plugin template과 community package 대부분이 이 방식을 사용합니다.


### npm Plugin 구조 : 대규모

- oh-my-opencode처럼 여러 기능을 묶는 대규모 plugin은 역할별로 directory를 분리합니다.
    - entry point에서 config, manager, tool, hook, interface를 순서대로 조립하는 pipeline 구조가 됩니다.

```
opencode-my-harness/
├── src/
│   ├── index.ts                  # plugin factory : pipeline 조립
│   ├── plugin-config.ts          # config load, merge, validation
│   ├── plugin-interface.ts       # 내부 hook을 OpenCode handler로 mapping
│   ├── plugin-dispose.ts         # unload 시 정리 logic
│   ├── create-managers.ts        # manager instance 생성
│   ├── create-hooks.ts           # hook 조합
│   ├── create-tools.ts           # tool registry 구성
│   ├── agents/                   # specialized agent 정의
│   ├── hooks/                    # 개별 hook 구현
│   ├── tools/                    # custom tool 구현
│   ├── features/                 # background task, tmux, skill 등
│   ├── config/schema/            # Zod schema 정의
│   ├── mcp/                      # 내장 MCP server
│   └── shared/                   # logger, validator 등 공통 utility
├── dist/
├── package.json
├── tsconfig.json
└── README.md
```

- 복잡한 state를 가진 기능은 manager class로 분리하고, factory 함수 안에서 조립합니다.
    - manager 간 직접 의존을 피하고 callback이나 shared state로 통신하면 순환 의존이 생기지 않습니다.

- hook은 tier별로 나누어 조합합니다.
    - core hook(session lifecycle, tool guard, context transform), continuation hook(loop 재개, todo enforcement), skill hook(skill 주입) 등으로 분리합니다.

- plugin unload 시 background task abort, MCP shutdown, LSP 종료 등을 한 곳에서 처리하는 dispose 함수를 둡니다.


---


## Hook 구현

- plugin이 걸 수 있는 hook은 크게 event, tool, shell, config, auth/provider, chat, permission, command, compaction 계열로 나뉩니다.
    - 필요한 hook만 선택적으로 구현하면 됩니다.
    - 전체 hook은 `@opencode-ai/plugin`의 `Hooks` type에서 확인합니다.

| Hook | 용도 |
| --- | --- |
| `event` | 모든 runtime lifecycle event 수신 |
| `config` | runtime config 동적 수정 (custom command 등록 등) |
| `tool` | custom tool 등록 |
| `tool.execute.before` / `tool.execute.after` | tool 실행 전후 개입 |
| `tool.definition` | tool 정의 변형 |
| `shell.env` | shell 실행 시 env 주입 |
| `auth` / `provider` | 인증 / provider 등록 |
| `chat.message` / `chat.params` / `chat.headers` | LLM 호출 직전 message·param·header 수정 |
| `permission.ask` | 권한 요청 처리 |
| `command.execute.before` | command 실행 전 개입 |
| `experimental.chat.messages.transform` | message 변환 |
| `experimental.chat.system.transform` | system prompt 변환 |
| `experimental.session.compacting` | 압축 시 보존 컨텍스트 지정 |
| `experimental.compaction.autocontinue` | 압축 후 자동 재개 제어 |
| `experimental.text.complete` | text completion 개입 |


### Event Hook

- `event` handler는 runtime 전반의 lifecycle event를 수신합니다.
    - `event.type`으로 분기하여 원하는 event에만 반응합니다.
    - session, message, file, command, permission, TUI, todo, LSP 등 대부분의 runtime 동작에 대응하는 event가 있습니다.

```ts
event: async ({ event }) => {
    if (event.type === "session.idle") {
        // session이 idle 상태가 되었을 때
    }
    if (event.type === "session.created") {
        // 새 session이 생성되었을 때
    }
}
```


### Tool Hook

- `tool.execute.before`와 `tool.execute.after`로 tool 실행 전후에 개입합니다.
    - before에서 argument를 수정하거나 error를 throw해 실행을 차단합니다.
    - after에서 output을 검증하거나 후처리합니다.

```ts
// .env file 읽기 차단
"tool.execute.before": async (input, output) => {
    if (input.tool === "read" && output.args.filePath.includes(".env")) {
        throw new Error("Do not read .env files")
    }
}
```

- vibeguard plugin처럼 `tool.execute.before`에서 argument 값을 복원(restore)하는 용도로도 사용합니다.
    - LLM에게는 난독화된 값을 보여주고, 실제 실행 시에는 원래 값을 넣는 구조입니다.


### Shell Hook

- `shell.env`로 agent와 user terminal의 shell 실행에 environment variable을 주입합니다.

```ts
"shell.env": async (input, output) => {
    output.env.MY_API_KEY = "secret"
    output.env.PROJECT_ROOT = input.cwd
}
```


### Config Hook

- `config` handler는 runtime config를 동적으로 수정합니다.
    - custom slash command 등록이 대표적인 사용처입니다.

```ts
async config(config) {
    config.command = config.command ?? {}
    config.command["my-command"] = {
        template: "Do something specific",
        description: "My custom command",
    }
}
```


### Compaction Hook

- `experimental.session.compacting`으로 context 압축 시 보존할 정보를 지정합니다.

```ts
"experimental.session.compacting": async (input, output) => {
    output.context.push("## Preserved State\nImportant info to keep across compaction")
}
```


### Chat Transform Hook (Experimental)

- `experimental.chat.messages.transform`으로 LLM에 보내기 전 message를 변환합니다.
    - model-announcer plugin은 이 hook으로 현재 model 정보를 context에 주입합니다.
    - vibeguard plugin은 이 hook으로 민감 정보를 난독화합니다.
    - experimental prefix가 붙어 있어 향후 API 변경 가능성이 있습니다.


---


## Custom Tool 등록

- `@opencode-ai/plugin`의 `tool` helper로 LLM이 호출할 수 있는 custom tool을 정의합니다.
    - `description`은 LLM이 tool 호출 시점을 판단하는 근거이므로 구체적으로 작성합니다.
    - `args`는 `tool.schema`로 기술하며, `.describe()`로 각 argument의 용도를 설명합니다.
    - `execute`는 `args`와 `context`를 받아 string을 반환하는 async 함수입니다.

```ts
import { type Plugin, tool } from "@opencode-ai/plugin"

export const MyPlugin: Plugin = async (ctx) => {
    return {
        tool: {
            my_tool: tool({
                description: "Describe what this tool does for the LLM",
                args: {
                    query: tool.schema.string().describe("Search query"),
                    limit: tool.schema.number().optional().describe("Max results"),
                },
                async execute(args, context) {
                    const { directory, worktree } = context
                    return `Result for ${args.query}`
                },
            }),
        },
    }
}
```

- built-in tool과 이름이 충돌하면 plugin의 custom tool이 우선합니다.
    - 이를 이용해 built-in tool을 override할 수 있지만, 신중하게 사용해야 합니다.


---


## Community Plugin에서 발견한 Best Practice

- community plugin들의 source code를 살펴보면 export 방식, logging, config 관리, event handler 비동기 처리 등에서 공통된 practice가 보입니다.


### Export 방식

- **named export**와 **default export** 모두 사용됩니다.
    - wakatime, smart-title은 `export default` 방식을 사용합니다.
    - model-announcer, plugin-template은 named export를 사용합니다.
    - 어느 방식이든 OpenCode runtime이 인식합니다.


### Logging

- `console.log` 대신 `client.app.log()`를 사용해 구조화된 log를 남기는 plugin이 많습니다.
    - `service`, `level`, `message`, `extra` field로 구분됩니다.

```ts
await client.app.log({
    body: {
        service: "my-plugin",
        level: "info",
        message: "Plugin initialized",
        extra: { config: "loaded" },
    },
})
```

- debug mode 환경 변수를 두고 debug log를 분리하는 방식도 흔합니다.
    - vibeguard, smart-title 등이 이 방식을 사용합니다.


### Config 관리

- 복잡한 plugin은 자체 JSONC config file을 사용합니다.
    - user level(`~/.config/opencode/`)과 project level(`.opencode/`)을 분리하고 merge하는 방식이 관례입니다.
    - JSONC는 comment를 허용하는 JSON으로, 사용자가 설정에 주석을 달 수 있어 편리합니다.


### Fire-and-Forget Pattern

- event handler 안에서 무거운 작업을 할 때는 `.catch()`로 감싸서 non-blocking으로 실행합니다.
    - event handler가 오래 걸리면 OpenCode runtime 전체가 느려질 수 있습니다.

```ts
event: async ({ event }) => {
    if (event.type === "session.idle") {
        updateSessionTitle(client, sessionId, logger, config).catch((error) => {
            logger.error("event", "Title update failed", { error: error.message })
        })
    }
}
```


### Toast Notification

- 사용자에게 상태를 알릴 때 `client.tui.showToast()`를 사용합니다.

```ts
await client.tui.showToast({
    body: {
        title: "My Plugin",
        message: "Something happened",
        variant: "info",
        duration: 5000,
    },
})
```


### Lazy Import

- 무거운 dependency는 plugin 초기화 시점이 아닌 실제 필요한 시점에 dynamic import합니다.
    - plugin load 시간을 줄여 OpenCode startup에 영향을 주지 않습니다.

```ts
const { generateText } = await import("ai")
```


### Subagent Session 판별

- background agent나 subagent session에서는 특정 동작을 skip해야 하는 경우가 많습니다.
    - `client.session.get()`으로 `parentID` 존재 여부를 확인합니다.


---


## Plugin Load 순서와 등록

- plugin은 여러 source에서 함께 load되며, hook은 등록 순서대로 순차 실행됩니다.

1. global config(`~/.config/opencode/opencode.json`)에 등록된 npm plugin.
1. project config(`opencode.json`)에 등록된 npm plugin.
1. global plugin directory(`~/.config/opencode/plugins/`).
1. project plugin directory(`.opencode/plugins/`).

- 동일한 이름과 version의 npm package는 한 번만 load합니다.
    - local plugin과 npm plugin은 이름이 같아도 별개로 취급합니다.

- npm plugin은 `opencode.json`의 `plugin` array에 package 이름을 넣어 등록합니다.
    - OpenCode가 startup 시 Bun으로 자동 설치하고 cache합니다.
    - scoped package(`@org/name`)도 지원합니다.

```json
{
    "$schema": "https://opencode.ai/config.json",
    "plugin": [
        "opencode-wakatime",
        "@tarquinen/opencode-smart-title"
    ]
}
```


---


## Reference

- <https://opencode.ai/docs/plugins>
- <https://opencode.ai/docs/custom-tools>
- <https://opencode.ai/docs/ecosystem#plugins>
- <https://github.com/awesome-opencode/awesome-opencode>
- <https://github.com/zenobi-us/opencode-plugin-template>

