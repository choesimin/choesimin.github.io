---
layout: note
permalink: /502
title: LLM Domain Skill - Agent가 스스로 Domain을 다루게 하기
description: agent가 domain 작업을 수행하는 데 필요한 지식을 구조화된 markdown 묶음으로 누적하고 domain skill로 packaging해서, agent가 그 지식을 스스로 갱신하고 호출 시점에 활용하도록 합니다.
date: 2026-05-04
---


## Agent가 Domain을 다룬다는 것

- agent가 domain 작업을 반복 수행하려면 domain 지식이 **누적**되고, 그 지식을 호출 시점에 **활용** 가능해야 합니다.
    - 누적과 활용이 한 곳에서 일어나도록 domain 지식을 LLM Wiki 형태로 정리하고, domain skill 단위로 packaging합니다.
    - skill로 packaging하면 agent가 작업 시점에 `SKILL.md` 진입점을 통해 필요한 지식을 스스로 찾아 호출합니다.


### Domain 지식이 필요한 이유

- agent가 domain 작업을 수행하려면 일반 지식 외에 **그 domain의 정책과 system 구조**를 알아야 합니다.
    - 예를 들어, 일반적인 LLM은 결제 정책의 idempotency 규칙, 자사 service의 endpoint 구조, DB의 table 관계를 알지 못합니다.
        - idempotency는 같은 요청을 여러 번 보내도 한 번 처리한 것과 동일한 결과를 보장하는 성질입니다.
    - 이런 지식 없이 agent에게 "결제 환불 처리 추가" 같은 작업을 시키면 잘못된 가정으로 code를 작성하거나 system과 충돌하는 결과를 만듭니다.

- 한 번의 작업마다 인간이 필요한 맥락을 prompt로 주입하는 방식은 **반복 작업이 누적될수록 비효율적**입니다.
    - 인간이 매번 같은 정책을 설명하고 같은 file 위치를 알려주면 agent가 스스로 작업한다고 부를 수 없습니다.
    - **누적된 지식 저장소**가 있어야 agent가 호출 시점에 자기 task와 관련된 지식을 **스스로** 가져옵니다.


### Domain 지식의 누적

- LLM Domain Skill은 domain 정책, source code 구조, API contract, DB schema를 wiki 형태로 **영구적으로 누적**하여 agent가 매번 작업할 때 참조합니다.
    - RAG처럼 query마다 chunk를 재조합하지 않고, **미리 정리되고 cross-reference된 skill**을 통째로 활용합니다.
    - 같은 domain에서 여러 task를 반복 수행하는 agent에게는 RAG보다 skill 형태가 자연스러운데, **지식이 누적되고 일관성이 유지**되기 때문입니다.

```mermaid
graph LR
    user[사용자 Task<br>결제 환불 처리 추가]
    agent[LLM Agent]
    llm[LLM 본체<br>일반 지식]
    skill["LLM Domain Skill<br>(domain 정책, code 구조,<br>API, DB schema)"]
    output[작업 결과<br>code, PR, 분석]

    user --> agent
    llm -.일반 지식 공급.-> agent
    skill -.domain 지식 공급.-> agent
    agent --> output
```

- **유지 비용이 작다는 점**이 skill 형태의 강점이며, 이 비용 구조가 자주 변경되는 외부 자료를 유연하게 다룰 수 있게 만듭니다.
    - source code와 DB schema처럼 자주 변하는 자료는 수동 유지로는 며칠 만에 stale해지지만, **LLM이 sync, lint, cross-reference 갱신을 전담**하면 이 부담이 사라집니다.
    - **memories layer가 외부 자료와 wiki 사이의 연결 metadata를 단방향으로 추적**하므로, Human은 sync 명령만 주면 됩니다.

- 자동화 구조가 없다면, skill은 변경되는 외부 자료를 다루는 유지 비용을 감당하지 못해 금방 stale(낡은) 상태가 되며, **누적된 지식이라는 가치가 사라지게** 됩니다.


### Skill 형태로의 활용

- skill로 packaging한다는 것은 누적된 지식 묶음에 **이름표(`SKILL.md`)와 진입점**을 붙여 agent가 호출 시점에 쉽게 찾아 활용하도록 만드는 것입니다.
    - `SKILL.md` frontmatter의 name과 description이 agent에게 이 skill이 무엇이고 언제 호출해야 하는지를 알립니다.
    - 진입점이 있어야 agent가 작업 시작 시점에 자기 task와 관련된 skill을 식별하여 활용 가능합니다.
    - skill 형태는 **framework 중립적**이므로 Claude Code, OpenCode, Codex, 직접 만든 LLM application 모두에서 동일하게 사용됩니다.

- 한 domain skill의 범위는 단일 domain의 지식, API spec, DB schema, source code repository 등 한 작업 영역에 묶이는 자료 전체입니다.
    - business domain(결제, 주문, 환불), 외부 service와의 통합 contract, 자사 service의 code 구조가 한 skill에 함께 들어갈 수 있습니다.
    - 작업 영역이 **너무 넓으면** description이 모호해져 호출 정확도가 떨어지고, **너무 좁으면** cross-reference의 가치가 사라집니다.


---


## 기존 LLM Wiki와의 차이

- 활용 목적이 다르며, 기존 LLM Wiki는 **Human의 학습과 탐색**을 위해 만들어진 반면 LLM Domain Skill은 **LLM agent의 자율 작업 reference**로 만들어집니다.
    - 활용 목적이 다르면 어떤 자료를 source로 넣을지, page를 어떻게 구조화할지가 달라집니다.
    - Human용 wiki는 **paper와 article 중심**이지만, agent용 skill은 **system을 구성하는 모든 자료(code, schema, contract)**를 포함해야 자율 작업이 가능합니다.

- 외부 자료의 성격도 달라지며, 기존 LLM Wiki는 article이나 paper처럼 **한 번 수집하면 변하지 않는 자료**를 가정합니다.
    - agent용 skill에서는 GitHub repository, Confluence page, DB schema처럼 **외부에서 계속 변하는 자료**가 주가 되므로 **변경 추적**이 필수입니다.
    - 변경 추적은 source 종류별로 다르며(commit hash, page version, content hash 등), 각 종류 folder의 `AGENTS.md`에 절차를 정의합니다.

| 구분 | 기존 LLM Wiki | LLM Domain Skill |
| --- | --- | --- |
| **활용 목적** | Human의 학습·탐색 | LLM agent의 자율 작업 reference |
| **소비자** | Human (직접 읽기) | LLM agent (작업 중 invoke) |
| **진입점** | `index.md` | `SKILL.md` (frontmatter 포함) |
| **source 종류** | article, paper, transcript | github, confluence, markdown, pdf, image 등 |
| **source 변경** | 거의 없음 | 자주 발생, 종류별 추적 mechanism |
| **수집 방식** | Human이 markdown 변환 후 저장 | 외부 reference + on-demand fetch |
| **변경 대응** | 새 source 추가 (ingest) | 기존 source 변경 (sync) |
| **page 분류** | sources, concepts, entities, comparisons | domain, api, database (skill 단위) |

- 분류 축도 다르며, 단일 domain을 다루는 skill에서는 추상과 구체의 구분(concept vs entity)이나 종합 비교(comparisons)의 의미가 약해집니다.
    - domain 한정 skill은 그 domain의 정책, workflow, 외부 contract만 다루면 충분하며, 추상 개념을 별도 page로 두는 빈도가 낮습니다.
    - comparisons는 여러 domain을 가로지르는 분석에 적합한 분류이므로, 단일 skill 안에서는 자연스럽지 않습니다.


### 가장 좋은 Domain 자료 : Source Code와 DB Schema

- article과 paper는 domain을 **외부에서 설명**하지만, source code와 DB schema는 **domain 그 자체**를 드러냅니다.
    - source code는 logic의 실제 동작을, DB schema와 API spec은 system의 contract를 담습니다.
    - agent가 자율 작업을 하려면 그 작업을 수행할 system 자체를 알아야 하므로, 이 두 자료가 article·paper에 더해 source 종류로 추가됩니다.

- 매 작업마다 codebase를 탐색하면 비효율적이고 일관성도 흔들리므로, skill에 한 번 정리하여 후속 작업이 동일한 mental model을 공유하게 합니다.

- 외부 자료는 대부분 계속 변하므로, **변경 추적**이 sources layer 설계의 핵심 제약이며 sync operation의 출발점입니다.
    - source code는 commit, DB schema는 migration, Confluence page는 정책 갱신으로 변합니다.


---


## Layer 구조

- LLM Domain Skill은 **sources, memories, skills 세 layer**로 나뉘며, 각 layer는 단일 책임을 갖습니다.
    - `sources/`는 외부 자료 자체를 보관합니다.
        - byte로 보관하거나 외부 reference만 보관합니다.
    - `memories/`는 외부 자료의 정리(memory)와 wiki와의 연결 metadata를 책임집니다.
        - 영향 분석은 이 layer에서 시작합니다.
    - `skills/`는 순수 wiki입니다.
        - business 관점 page만 두며, 자료 연결 정보는 frontmatter에 두지 않습니다.

- raw 외부 자료가 memory로 정제되고, 그 memory를 토대로 skills의 wiki가 쌓이는 가공 흐름입니다.

```mermaid
graph TB
    external["외부 자료<br>(참조 또는 byte)"]
    sources["sources/<br>외부 자료 보관"]
    memories["memories/<br>정리 + 연결 metadata"]
    skills["skills/<br>순수 wiki"]

    external -.fetch on-demand.-> sources
    sources -.referenced_files.-> memories
    memories -.used_by.-> skills
```

| layer | 위치 | 책임 | 비고 |
| --- | --- | --- | --- |
| `AGENTS.md` | skill repo root | 전체 flow의 진입점 | ingest/sync 명령 정의와 layer 사이 작업 흐름 |
| `sources/<type>/` | skill repo 안 | 외부 자료 보관 | byte 저장 종류는 원본 file, 참조 종류는 URL과 변경 식별자만 |
| `memories/<type>/` | skill repo 안 | 외부 자료의 memory + wiki와의 연결 metadata | 영향 분석의 출발점 |
| `memories/<type>/AGENTS.md` | source 종류 folder 안 | 해당 source 종류의 고유 절차 | fetch, 변경분 추출, frontmatter format |
| `skills/know-<domain>/` | skill repo 안 | 순수 wiki | 자료 연결 정보 frontmatter에 두지 않음 |
| `skills/know-<domain>/SKILL.md` | skill folder 안 | 진입점 | skill manifest와 page catalog |


### 외부 자료의 종류와 저장 방식

- 외부 자료는 종류에 따라 **byte 저장**과 **참조만 보관**으로 나뉩니다.
    - link rot 위험과 repo 용량 부담의 trade-off를 종류별로 다르게 풉니다.

| 종류 | 저장 방식 | 위치 | 변경 식별자 |
| --- | --- | --- | --- |
| **github** | 참조만 | URL + last_commit | commit hash |
| **confluence** | 참조만 | URL + page version | page version |
| **markdown** | byte 저장 | `sources/markdown/` | content hash |
| **pdf** | byte 저장 | `sources/pdf/` | content hash |
| **image** | byte 저장 | `sources/image/` | content hash |

- byte 저장 종류는 **link rot 위험이 크거나 LLM이 직접 파싱·해석해야** 합니다.
    - image는 vision 재해석에 byte가 필수이고, pdf는 외부에서 사라지면 복구 불가능합니다.

- 참조만 보관하는 종류는 **외부 system이 안정적이고 fetch 비용이 낮아** 항상 최신을 가져올 수 있습니다.
    - github은 git remote, confluence는 API export로 fetch on-demand 합니다.

- 종류와 무관하게 변경 식별자는 `memories/<type>/<group>/index.md` 에 보관하며, sync는 식별자 비교로 변경 영역을 추출합니다.


### Sources Layer

- sources는 외부 자료 자체를 종류별 folder로 분리해서 보관합니다.
    - byte 저장 종류는 원본 file이 그대로 들어갑니다.
    - 참조 종류는 URL과 변경 식별자만 보관하며, 실제 byte는 fetch 시점에만 temp folder에 가져옵니다.

- sources layer의 핵심 의도는 **외부 자료를 안정적인 위치에 두는 것**이며, 그 자료의 정제·연결은 memories layer가 책임집니다.


### Memories Layer

- memories는 외부 자료의 정리(memory)와 wiki와의 연결 metadata를 모두 책임집니다.
    - 종류별 folder로 분리되며, 각 folder가 자기만의 ingest·sync 절차를 갖습니다.
    - 묶음 단위와 memory 단위가 source 종류에 따라 다른데, 자세한 내용은 다음 section에서 다룹니다.

- memory frontmatter의 두 field가 **양쪽 layer를 잇는 매개점**입니다.
    - `referenced_files` 가 sources 방향으로 외부 자료 식별자를 기록합니다.
    - `used_by` 가 skills 방향으로 이 memory를 활용하는 skill page를 기록합니다.

- 두 link 모두 **단방향**입니다.
    - 외부 자료는 frontmatter를 가질 수 없으므로 역방향 link를 둘 수 없습니다. sync 시 식별자 비교로 보강합니다.
    - skill page도 자료 연결 정보를 frontmatter에 두지 않습니다. 본문에서는 가독성용 link로 자유롭게 인용 가능합니다.

- 영향 분석 chain은 한 방향으로 완결됩니다.
    - 외부 자료 변경 감지 -> 식별자 비교로 영향받는 memory 식별 -> memory의 `used_by`로 영향받는 skill page 식별 -> skill page 갱신.


### Skills Layer

- skills는 순수 wiki layer입니다.
    - business 관점의 정책·workflow·schema를 정리한 page만 들어가고, **자료 연결 정보는 frontmatter에 두지 않습니다**.
    - skill page에서 외부 자료를 인용할 때는 본문에서 file:line 형태로 자유롭게 link합니다.
    - 영향 분석은 memories layer가 단방향으로 책임지므로 skill page는 자기 출처를 frontmatter에 명시할 필요가 없습니다.

- `skills/`는 한 개 이상의 domain skill folder를 담는 container이며, 같은 repo 안의 skill들은 sources와 memories를 공유합니다.
    - skill page 사이의 기계적 추적용 cross-reference는 frontmatter `related_pages`에 둡니다.

- domain skill 이름은 **`know-<domain>` 형태**로 그 skill이 어떤 domain을 아는가를 명시합니다.
    - `skills/` folder 안에 write skill이나 scrape skill 같은 행위 skill이 함께 있어도 명명만으로 구분됩니다.


---


## Memory의 구조

- 한 source 묶음은 **묶음 단위 `index.md` + 그 아래 topic 단위 memory**로 표현합니다.
    - `index.md` 는 묶음 meta(url, 변경 추적 식별자, topic 목록)를 담아 묶음 단위의 진입점이 됩니다.
    - 각 topic memory는 한 주제와 관련된 file:line 또는 section 단위 참조를 모아 정리합니다.

- topic memory의 frontmatter에는 두 종류의 link가 들어갑니다.
    - `referenced_files` 에는 외부 자료의 path와 symbol을 기록합니다. 이 정보가 sync 시 영향 분석의 핵심 자료가 됩니다.
    - `used_by` 에는 이 memory를 활용하는 skill page 목록을 기록합니다.


### Source 종류별 차이

- 묶음 단위, memory 단위, sub-file 추적 정밀도가 source 종류에 따라 다릅니다.

| 종류 | 묶음 단위 | memory 단위 | sub-file 추적 |
| --- | --- | --- | --- |
| **github** | repo | topic (file 묶음) | file:line + symbol |
| **confluence** | space 또는 page tree | page | page 단위 |
| **markdown** | 문서 collection | 한 문서 | file 단위 |
| **pdf** | document | section | file 단위 (section 식별자 부재) |
| **image** | image collection | 한 image와 설명 | file 단위 (sub-image 식별자 부재) |

- pdf와 image는 **sub-file 식별자가 없어 변경 영역 추출 시 LLM이 재해석해야** 합니다.
    - file 변경은 감지되지만, file 안의 어디가 바뀌었는지는 LLM이 vision이나 재파싱으로 알아냅니다.

- 각 source 종류 folder의 `AGENTS.md`가 그 종류 고유의 ingest 절차, sync 절차, frontmatter format을 정의합니다.
    - 여러 skill이 같은 source 종류를 공유할 때 `AGENTS.md`를 재사용하므로 절차가 한 곳에 모입니다.


---


## Source to Skill - Ingest와 Sync

- 외부 자료를 skill에 반영하는 작업은 **ingest**와 **sync** 두 operation으로 나뉘며, 묶음 단위가 둘을 가르는 기준입니다.
    - **ingest** 는 묶음을 skill에 처음 등록하는 작업입니다. `index.md` 를 신규 생성하고 묶음 안의 자료를 memory로 분리합니다.
    - **sync** 는 등록된 묶음의 외부 변경을 skill에 전파하는 작업입니다. 기존 memory를 갱신하고 필요하면 새 memory를 만듭니다.
    - 한 묶음의 lifecycle은 **ingest 한 번 + sync N번** 구조입니다.

- 두 operation 모두 묶음 path를 인자로 받으며, path의 첫 segment(`github`, `confluence`, `pdf` 등)로 source 종류를 자동 식별합니다.
    - 종류별 절차의 차이는 `memories/<type>/AGENTS.md`에 캡슐화되어 operation 본체는 동일하게 유지됩니다.

| 구분 | Ingest | Sync |
| --- | --- | --- |
| **trigger 시점** | 묶음을 처음 등록할 때 | 등록된 묶음의 외부 자료가 변경되었을 때 |
| **명령 형태** | `ingest <묶음 path>` | `sync <묶음 path>` |
| **수행 빈도** | 묶음당 1회 | 묶음당 N회 |
| **`index.md` 처리** | 신규 생성 | meta 식별자 갱신 |
| **memory 처리** | 의미 단위로 분리하여 신규 생성 | 영향받는 memory 갱신, 필요 시 신규 생성 |

- LLM이 따르는 instruction은 두 위치로 나뉩니다.
    - **root `AGENTS.md`** 가 전체 flow의 진입점이며, ingest/sync 명령 정의와 layer 사이 작업 흐름을 담습니다.
    - **`memories/<type>/AGENTS.md`** 가 종류별 구체 절차(fetch 도구, 변경 식별자, 변경분 추출 방식)를 담습니다.
    - LLM은 명령을 받으면 root AGENTS.md를 읽어 흐름을 파악한 뒤, path의 첫 segment로 해당 종류의 AGENTS.md를 찾아 구체 절차를 수행합니다.

- skill folder는 instruction을 두지 않습니다. 순수한 wiki 저장소로서 agent가 답변 생성 시 read-only로 참조합니다.


---


## Example - Payment Domain Skill

- `know-payment` skill이 `payment-service` repo를 github source로 묶어 결제 domain을 정리하는 예제입니다.
    - 한 source 종류만 등장시켜 sources, memories, skills layer 사이의 흐름을 한눈에 보여줍니다.


### Directory 구조

- 위 mental model이 실제 directory에서 어떻게 표현되는지 보여줍니다.

```plaintext
llm-skill/
├── AGENTS.md                     # 전체 flow + ingest/sync 명령 진입점
├── sources/
│   └── (github은 외부 reference만 두므로 file 없음)
├── memories/
│   └── github/
│       ├── AGENTS.md             # github 고유 절차
│       └── payment-service/
│           ├── index.md          # url + last_commit + topic 목록
│           └── payment-flow.md   # 결제 승인 흐름 memory
└── skills/
    └── know-payment/
        ├── SKILL.md
        └── domain/
            └── payment.md
```


### Memory Group Index

- `memories/github/payment-service/index.md`는 repo 단위 memory group의 진입점이며, frontmatter에 group meta와 topic 목록이 모입니다.
    - github은 외부 자료 byte를 sources/에 두지 않으므로 url과 last_commit도 이 index가 보관합니다.

```markdown
---
url: https://github.com/company/payment-service
default_branch: main
last_commit: abc123def
topics:
  - path: payment-flow.md
    description: 결제 승인 흐름 (controller -> service -> 외부 PG)
  - path: refund-process.md
    description: 환불 처리 절차 (정책 검증 -> 부분 환불 -> 정산 갱신)
  - path: webhook-handler.md
    description: 외부 PG webhook 수신과 idempotency 처리
---

## Repository

- Payment service backend
- Spring Boot, Java 21
- 결제 승인, 환불, webhook 처리 담당
```


### Memory - 결제 흐름

- `memories/github/payment-service/payment-flow.md` 는 symbol 단위의 code 흐름을 정리하며, 변경 감지의 단위가 됩니다.

```markdown
---
referenced_files:
  - path: src/main/java/com/payment/api/PaymentController.java
    symbols: [PaymentController.createPayment, PaymentController.refund]
  - path: src/main/java/com/payment/service/PaymentService.java
    symbols: [PaymentService.process, PaymentService.checkIdempotency, PaymentService.persist]
used_by:
  - skills/know-payment/domain/payment.md
  - skills/know-payment/api/payment-endpoints.md
---

## 진입점

- `POST /api/payments`는 `PaymentController.java:42`의 `PaymentController.createPayment()`에서 처리합니다.

## 비즈니스 흐름

- `PaymentService.java:15`의 `PaymentService.process()`에서 idempotency 검사 -> 외부 PG 호출 -> 결과 저장 순서로 진행합니다.

## Idempotency 처리

- `PaymentService.java:99`에서 Redis idempotency key를 검사합니다.
- 중복 요청은 기존 결과를 반환하고, 신규 요청만 `ExternalPgClient.charge()`로 위임합니다.
```


### Skill Page - 결제 Domain

- `skills/know-payment/domain/payment.md`는 business 관점의 정책과 흐름을 본문에 서술합니다.
    - 자료 연결 정보는 memories layer가 책임지므로 frontmatter에는 두지 않고, 다른 skill page 참조만 `related_pages`에 둡니다.

```markdown
---
title: Payment Domain
related_pages:
  - domain/refund.md
---

## Domain 개요

- Payment domain은 결제 승인, 환불, 정산을 담당합니다.

## 정책

- 모든 결제는 idempotency를 보장하며, 동일 idempotency key로 들어온 중복 요청은 기존 결과를 반환합니다.

- 환불은 원 거래의 정산 상태에 따라 즉시 환불과 지연 환불로 분기합니다.
    - 정산이 끝난 거래는 다음 정산 cycle에서 차감되고, 정산 전 거래는 즉시 취소됩니다.

## Workflow

- 사용자 결제 요청 -> idempotency 검사 -> 외부 PG 호출 -> 결과 저장 -> webhook 대기 순서로 진행합니다.
```


### Sync 시 동작 예시

- `PaymentService.java`의 99번 line 근처에 idempotency 검사 logic 변경이 일어났다고 가정합니다.

```bash
# 1. sync 명령
$ sync memories/github/payment-service

# 2. AGENTS.md를 따라 last commit 확인
$ cat memories/github/payment-service/index.md | grep last_commit
last_commit: abc123def

# 3. fetch 후 diff
$ cd /tmp/payment-service && git fetch && git diff abc123def..HEAD --name-only
src/main/java/com/payment/service/PaymentService.java
```

- 변경 file path가 `payment-flow.md`의 referenced_files에 등록되어 있으므로, 해당 memory가 영향 대상으로 식별됩니다.
    - memory의 used_by에 등록된 `skills/know-payment/domain/payment.md`와 `skills/know-payment/api/payment-endpoints.md`가 다음 갱신 대상이 됩니다.
    - LLM이 diff를 읽어 idempotency 검사 logic 변경 내용을 memory에 반영하고, 정책 변경이 있으면 skill page도 갱신합니다.


---


## Reference

- <https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f>
- <https://docs.claude.com/en/docs/claude-code/skills>

