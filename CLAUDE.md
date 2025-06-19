# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 사용하는 가이던스를 제공합니다.

## Project 개요

- 이 project는 programming 주제, algorithm, graphics를 다루는 개인 지식 base 역할을 하는 Jekyll 기반 정적 문서 site입니다.
- site는 목차 생성, 검색 기능, interactive graphics와 같은 고급 기능을 갖춘 계층적 note collection으로 구성되어 있습니다.
- 모든 content는 한국어로 작성되며, 기술적 정확성과 명확성을 중시합니다.
- 문서 작성 시 `collections/_notes/writing/structured-writing.md`에 정의된 엄격한 규칙을 반드시 준수해야 합니다.


---


## 개발 명령어

- 이 project는 Ruby와 Jekyll을 사용하여 구축되며, Bundle을 통해 의존성을 관리합니다.
- 개발과 배포를 위해 다음 명령어를 사용합니다.

### 환경 설정

- Ruby와 Bundler가 설치되어 있어야 합니다.
- 의존성 설치 : `bundle install`

### Local 개발

- site local 실행 : `bundle exec jekyll serve`
    - live reload가 적용되어 file 변경 시 자동으로 반영됩니다.
    - 기본적으로 `http://localhost:4000`에서 접근할 수 있습니다.

### Build 및 배포

- 정적 site build : `bundle exec jekyll build`
    - 생성된 file은 `_site/` directory에 저장됩니다.
- 생성된 file 정리 : `bundle exec jekyll clean`


---


## 문서 작성 규칙 (엄격히 준수 필요)

### 기본 작성 원칙

- Markdown 문법을 사용합니다.
- 한국어로 상세하고 풍부한 설명을 제공합니다.
    - 기본적으로 '합니다체'를 사용합니다.
    - 명사형 문장이 더 적합한 경우에는 명사형 문장도 사용할 수 있습니다.
- 모든 문장은 반드시 마침표로 종료합니다.
    - 명사나 명사형 문장도 반드시 마침표로 종료합니다.
- 어려운 전문 용어가 등장하면, 용어에 대한 부연 설명을 따로 추가합니다.

### 문체 규칙

- 문장은 간결하고 명확하게 작성합니다.
    - 문장이 너무 길어지면, 문장을 나누어 각 문장이 하나의 개념만을 담도록 합니다.
    - 하나의 개념을 담는 문장이 인과 관계나 조건 관계로 이어져 길어지는 경우에는, 쉼표(`,`)로 구분하여 문장을 나눕니다.
- 담백하고 무난한 문체를 사용합니다.
    - 더 쉽고 간결한 표현이 있다면, 그 표현을 사용합니다.
- **금지 표현** : "위와 같은", "아래와 같은", "다음과 같은", "다음 단계로", "다음 순서로" 등의 표현은 사용하지 않습니다.
    - 하나의 문장은 그 문장 자체로 충분히 명확하게 설명되어야 하기 때문에, 지칭할 대상들을 함축하여 명확히 작성합니다.
- "이를 통해", "이러한" 등의 표현 대신, 더 명확하고 직접적인 표현을 사용합니다.
- "~할 수 있습니다.", "~될 수 있습니다." 등의 완곡한 표현을 남용하지 않습니다.
    - 꼭 필요한 경우에만 사용하고, 가능하면 "합니다.", "됩니다."와 같은 직설적인 표현을 사용합니다.
- 같은 개념에 대해 설명하는 경우라도, 다양한 표현을 사용하여 반복을 최소화합니다.

### 띄어쓰기 규칙

- 공식적인 한국어 띄어쓰기 규칙을 따릅니다.
- 붙여쓰는 것이 허용되는 경우에도, 띄우는 것이 원칙이라면 띄워 씁니다.
- **필수 띄어쓰기 예시** :
    - 건의사항 → 건의 사항
    - 경력사항 → 경력 사항
    - 변경사항 → 변경 사항
    - 유지보수 → 유지 보수
    - 개선방안 → 개선 방안
    - 기대효과 → 기대 효과

### 영어 단어 표기 규칙

- 영어가 원어인 단어는 한국어가 아닌 영어로 표기합니다.
    - 예 : '데이터베이스' → 'database', '버튼' → 'button', '업데이트' → 'update', '로그' → 'log'
- 한글로 표현할 수 있는 단어는 영어로 작성하지 않습니다.
    - 예 : 'automation' → '자동화', 'effort' → '노력'
- 첫 글자는 **대명사만** 대문자로 표기하고, 나머지는 소문자로 표기합니다.
    - 예 : 'Debezium', 'Linux' (대명사), 'system', 'database' (일반 명사)
- 문장을 시작하는 단어가 대명사가 아니라면 소문자로 시작합니다.
    - 예 : "database의 약어는 DB입니다.", "table level lock으로 특정 table의 변경만 제한합니다."

### 문장 구조화 규칙 (핵심)

- **모든 문장 앞에 `- `를 넣어 항목화**하고, **각 항목에는 하나의 문장만** 들어가도록 합니다.
    - 제목(header)을 제외한 모든 문장에 적용되는 규칙입니다.
    - 단계에 대한 정의가 필요한 경우에는 ordered list를 사용하여 순서를 부여합니다.
- **계층적 list 구조**를 사용합니다.
    - 주요 개념은 상위 항목으로 배치하고, 세부 설명은 하위 항목으로 배치합니다.
    - 상위 항목의 상위 개념은 포괄적이고 추상적인 내용으로, 하위 항목의 하위 개념은 구체적이고 실용적인 내용으로 구성합니다.
    - 예시나 추가 설명이 필요한 경우 항목의 하위 항목에 추가하여, 설명을 계층적으로 구조화합니다.
    - 상위 항목은 하위 항목들의 결론 또는 결과이고, 하위 항목은 상위 항목에 대한 설명 또는 원인입니다.
- 상위 항목과 하위 항목은 **4칸 들여쓰기**로 구분합니다.

### 제목 작성 규칙

- 제목은 기본적으로 명사형으로 작성하지만, 실행 방법이나 과정을 설명하는 경우 동명사형도 허용합니다.
    - 명사 : "확인", "설정", "사용"
    - 동명사 : "확인하기", "설정하기", "사용하기"
- 제목은 마침표로 끝내지 않습니다.
- 제목은 추상화 수준에 따라 1단계(`#`), 2단계(`##`), 3단계(`###`), 4단계(`####`) 제목을 사용합니다.
- **1단계 제목은 최상단에 위치하며 문서에서 한 번만 사용**합니다.
- **모든 제목은 반드시 하위 내용을 포함**해야 합니다.
    - 제목 다음에 바로 다른 제목이 오는 것은 **절대 금지**됩니다.
    - 모든 제목 아래에는 최소 1개 이상의 항목화된 문장(`- `로 시작)이 반드시 들어가야 합니다.
    - 하위 제목이 있는 경우에도, 상위 제목 바로 아래에 해당 section의 개괄 설명을 먼저 작성한 후 하위 제목을 배치합니다.
- 제목은 "개요", "특징" 등과 같이 함축하지 말고, 표현력 있게 작성합니다.
- 제목에 들어가는 영어 단어들의 첫 글자는 대문자로 표기합니다.
- 제목에서도 명령어(command)는 backtick으로 감쌉니다.

### 전체 내용 구조화 규칙

- 내용의 전체적인 구조는 **두괄식**으로 구성합니다.
    - 결론이나 요약 내용이 글의 처음에 나오도록 하고, 뒤에는 부가적인 내용이 뒤따르게 합니다.
- 글이나 단락의 시작 부분에 "~에 대해 알아보겠습니다.", "~에 대해 설명하겠습니다.", "~를 소개합니다."와 같은 표현은 사용하지 않습니다.
- **1단계 제목(`#`) 내용 단락**과, **2단계 제목(`##`) 내용 단락**은 `---`로 구분합니다.
    - `---`의 위와 아래에는 빈 줄을 2개 추가하여, 내용을 더 명확히 구분합니다.
- 3단계 제목(`###`) 내용 단락은 빈 줄 2개로 구분합니다.
- 4단계 제목(`####`) 내용 단락은 빈 줄을 1개로 구분합니다.

### Highlight 및 특수 문자 규칙

- 내용 중 keyword나 중요한 내용은 **bold체**로 강조하며, 다른 강조 효과는 사용하지 않습니다.
- 각 문장의 핵심이 되는 부분을 강조 표시합니다.
- colon(`:`)의 앞과 뒤에는 공백을 하나씩 추가합니다.
- code 성격의 단어는 backtick으로 감싸고, code block은 backtick 3개로 감싸서 표현합니다.

### Mermaid Diagram 작성 규칙

- 도식이 필요한 경우엔 image를 사용하지 않고 Mermaid.js 문법을 사용하여 직접 그립니다.
- Mermaid.js chart에는 color style을 적용하지 않습니다.
- Mermaid.js chart는 component를 선언하는 선언부와 component를 사용하는 호출부를 나누어 작성합니다.
    - 선언부는 chart의 상단에 위치하고, 호출부는 chart의 하단에 위치합니다.
    - 약어를 남용하지 않고, component의 이름은 명사형으로 간결하게 작성합니다.
    - component 식별값은 lower snake case로 작성합니다.

### Table 작성 규칙

- header row와 body row의 구분자는 `| --- |`로 통일합니다.
- table 안에 들어가는 내용은 명사형 단어를 사용하며, 각 내용은 쉼표로 구분합니다.
- table의 각 항목 내용은 명사형 단어나 문장을 사용하며, 마침표로 끝내지 않습니다.


---


## Architecture

### Jekyll 구성

- **site 제목** : SIMIN
- **설명** : 영원한 건 없지만, 이건 오래 남겠지
- **collection directory** : `collections/` (사용자 정의 위치)
- **주요 collection** : `_config.yml`에 정의된 세 가지 content type이 있습니다.
    - `notes` : 기술 문서 (output: true)
    - `graphics` : interactive graphics/시각화 (output: true)
    - `problems` : algorithm 문제 (output: true)

### Layout System

- **default.html** : base layout입니다.
    - sidebar navigation이 포함되어 있습니다.
    - 외부 link (Brunch, Instagram, GitHub)가 footer에 위치합니다.
    - 3개의 주요 section으로 navigation을 구성합니다 : Notes, Algorithms, Graphics.
- **note.html** : 기술 note용 layout입니다.
    - default layout을 확장합니다.
    - table of contents(TOC)와 comment system(Giscus)을 포함합니다.
    - 작성 날짜를 표시합니다.
- **problem.html** : algorithm 문제용 layout입니다.
- **resume.html** : 이력서/CV용 layout입니다.

### Content 구성

- note는 `collections/_notes/`에서 주제별로 계층적으로 구성됩니다.
- 각 주제별 directory 구조는 특정 domain의 지식을 체계적으로 정리하도록 설계되었습니다.
    - `language/` : programming 언어별 상세 문서 (Java, JavaScript, TypeScript, Kotlin 등)
    - `framework/` : framework 및 library 사용법 (Spring, MyBatis)
    - `database/` : database 기술 및 관리 기법 (MySQL, MongoDB, transaction, lock 등)
    - `cloud-service/` : cloud platform 활용법 (AWS service별 상세 가이드)
    - `paradigm/` : software 설계 및 개발 방법론 (Clean Architecture, OOP, TDD 등)
    - `open-source/` : 주요 open source 도구 활용법 (Docker, Git, Kafka, Debezium 등)
    - `frontend/` : web 기술 및 UI 개발 (CSS, HTML, SVG, React)
    - `linux-tool/` : Linux 명령어 및 system 관리 도구
    - `network/` : network protocol 및 architecture
    - `software-design/` : design pattern 및 architecture pattern
    - `technology/` : 신기술 concept 및 구현 방법 (CDC, ETL, Machine Learning 등)
    - `writing/` : 기술 문서 작성 방법론 및 communication 기법

### Client-side 기능

- **note-tree.js** : 계층적 navigation system입니다.
    - 접을 수 있는 section을 제공합니다.
    - descendant 개수를 표시하여 content 볼륨을 직관적으로 파악할 수 있습니다.
    - tree 구조의 toggle 기능을 통해 필요한 section만 확장하여 볼 수 있습니다.
- **toc.js** : 자동 목차 생성 system입니다.
    - article 내의 heading(`h2`, `h3`, `h4`, `h5`, `h6`)을 기반으로 목차를 자동 생성합니다.
    - scroll 위치에 따라 현재 reading 중인 section을 highlight합니다.
    - 목차 click을 통한 빠른 section 이동을 지원합니다.
- **default.js** : 기본 UI 및 UX 기능을 제공합니다.
    - page 상단에 reading 진행률을 표시하는 progress bar를 제공합니다.
    - 전역 검색 기능을 구현합니다.
- **Simple Jekyll Search** : client-side 실시간 검색 system입니다.
    - build 시 생성되는 JSON index를 사용합니다.
    - keyword 입력과 동시에 관련 content를 실시간으로 filtering합니다.

### Styling System

- **default.css** : 전체 site의 base style과 layout을 정의합니다.
- **note.css** : 개별 article의 typography와 reading 경험을 최적화하는 style을 정의합니다.
- **home.css** : homepage 전용 style을 정의합니다.
- responsive design을 통해 desktop, tablet, mobile 환경에서 최적화된 경험을 제공합니다.

### 고급 기능

- **Mermaid diagram** : 복잡한 concept을 시각적으로 표현하는 diagram 기능입니다.
    - flowchart, sequence diagram, class diagram 등을 지원합니다.
    - include를 통해 모든 note에서 일관되게 사용할 수 있습니다.
    - color style을 적용하지 않고 기본 theme을 사용하여 가독성을 높입니다.
- **syntax highlighting** : Highlight.js를 통한 정확한 code highlighting 기능입니다.
    - 다양한 programming 언어를 지원합니다.
    - code block의 가독성을 크게 향상시킵니다.
- **comment system** : Giscus integration을 통한 community 기반 토론 기능입니다.
    - 각 article에 대한 질문과 토론을 할 수 있습니다.
    - GitHub account를 통한 authentication을 사용합니다.
- **Google Analytics** : 방문자 분석 및 content 성과 tracking 기능입니다.
- **자동 검색 index** : build 시 `assets/json/note-search.json`이 자동 생성됩니다.
    - 모든 note의 title, description, content가 index화됩니다.

### Build 결과물

- 빌드된 정적 site는 `_site/` directory에 생성됩니다.
- 각 note는 permalink에 따라 번호가 매겨진 HTML file (1.html, 2.html 등)로 생성됩니다.
- SEO 최적화를 위한 sitemap.xml이 자동 생성됩니다.
- 사용자 정의 404 page가 포함되어 있어 사용자 경험을 향상시킵니다.
- robots.txt를 통해 검색 engine crawling을 제어합니다.


---


## Content 작성 가이드

### Note 작성 Format

- 모든 note는 YAML frontmatter를 사용하여 metadata를 정의합니다.
- permalink는 숫자로 할당되며, 기존 번호를 재사용하지 않습니다.

```yaml
---
layout: note
permalink: /[번호]
title: [제목]
description: [설명]
date: YYYY-MM-DD
---
```

### Graphics 작성 Format

- `collections/_graphics/`에 사용자 정의 HTML file로 작성됩니다.
- embedded JavaScript를 사용하여 interactive 시각화를 구현합니다.
- 날짜 기반 naming convention을 따릅니다 : `YYYY-MM-DD-[제목].html`

### Problems 작성 Format

- algorithm 문제는 일관된 template을 사용하여 작성됩니다.
- 문제 설명, solution code, 시간/공간 복잡도 분석, 해설을 포함합니다.
- 날짜 기반 naming convention을 따릅니다 : `YYYY-MM-DD-[문제명].md`


---


## 개발 시 주의 사항

### File 구조 준수

- collection file은 반드시 `collections/` directory 내의 적절한 subdirectory에 위치해야 합니다.
- asset file은 `assets/` directory 내에 type별로 정리하여 위치시킵니다.
- layout file은 `_layouts/` directory에, include file은 `_includes/` directory에 위치합니다.

### 번호 체계 관리

- 각 note는 고유한 번호를 permalink로 사용하며, 이는 절대 변경하지 않습니다.
- 새로운 note 작성 시 기존 최대 번호 + 1을 사용합니다.
- 번호는 content와 무관하게 작성 순서대로 할당됩니다.

### Build 및 검증

- content 변경 후 반드시 local에서 `bundle exec jekyll serve`를 실행하여 정상 동작을 확인해야 합니다.
- Mermaid diagram이 올바르게 rendering되는지 확인해야 합니다.
- 내부 link 및 외부 link가 정상적으로 작동하는지 검증해야 합니다.
- responsive design이 mobile 환경에서도 올바르게 동작하는지 확인해야 합니다.
- 검색 기능이 새로운 content를 정상적으로 index하는지 확인해야 합니다.