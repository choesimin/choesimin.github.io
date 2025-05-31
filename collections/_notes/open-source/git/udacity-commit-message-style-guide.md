---
layout: note
permalink: /317
title: Udacity Git Commit Message Style Guide
description: Udacity에서 제공하는 Git commit message style guide를 사용하여, 일관된 commit message를 작성함으로써, team 전체의 생산성을 향상시킬 수 있습니다.
date: 2025-04-22
---


## Udacity의 Git Commit Message Convention

- Git commit message는 project history를 체계적으로 기록하기 위한 중요한 요소입니다.
    - 잘 작성된 commit message는 code review를 용이하게 하고 project 관리 효율성을 높입니다.

- Udacity의 style guide는 일관성 있는 형식의 commit message 작성법을 제시합니다.
    - Udacity는 대규모 공개 online lecture를 제공하는 교육 기관이며, 이상적인 commit message에 대해 혼란을 겪는 학생들을 위해서 Git commit message style guide를 정하여 제공하고 있습니다.
        - 이 guide는 Udacity 과정의 학생들이 project 제출 시 준수해야 하는 기준입니다.
    - Udacity의 평가자들은 이 guide에 따라 commit message의 품질을 평가합니다.

- Udacity의 style guide는 가장 흔히 사용되는 commit message style이기도 합니다.

- Udacity guide는 영어를 기준으로 작성된 guide이기 때문에, 한글로 작성할 때는 규칙을 유지하면서도 한글에 맞게 변형하여 작성하는 것이 좋습니다.
    - 예를 들어, 영어에서는 대문자로 시작하는 것이 일반적이지만, 한글에서는 대문자 개념이 없으므로 대문자 규칙은 적용이 불가능합니다.
    - 또는, 영어에서는 동사를 사용해 명령형으로 작성하는 것이 일반적이지만, 한글에서는 명령형이 아닌 명사형으로 작성하는 것이 자연스럽습니다.
    - 이런 식으로 한글에 맞게 변형하여 작성하는 것이 더 자연스럽고 읽기 쉬운 commit message를 작성하는 데 도움이 됩니다.


---


## Message Structure

```txt
type: subject

body

footer
```

- commit message는 title, body, footer의 세 가지 주요 구성 요소로 이루어집니다.
    - 이 중 title은 subject와 type으로 또 나뉩니다.

- 각 구성 요소(title, body, footer)는 빈 줄로 구분하여 작성합니다.

| 구성 | **Title** | **Body** | **Footer** |
| --- | --- | --- | --- |
| **필수 여부** | 필수 | 선택 | 선택 |
| **형식** | `type: subject` | `body` | `footer` |
| **구성** | type(commit 유형 분류)과 subject(commit 내용 간략 요약)으로 구성 | 복잡한 변경이나 중요 결정 설명 위주, what(무엇을)과 why(왜) 설명 | issue tracker ID 참조, 주요 변경에 대한 호환성 정보 |
| **역할** | commit의 목적과 성격을 명확히 나타냄, commit 내용을 간결하게 요약 | commit에 대한 자세한 맥락과 설명 제공, 복잡한 변경 사항이나 중요한 결정 사항 설명 | issue tracker와의 연결성 제공, 변경 사항 호환성 정보 제공, 이전 기능 중단 명시 |
| **글자 수 제한** | subject 영역은 50자 이내 | 한 줄에 72자 이내 | 한 줄에 72자 이내|
| **특징** | 마침표 사용 안 함 | "어떻게"에 대한 내용은 작성하지 않음 | 부가 정보 제공 |


### Type

- type은 commit의 목적과 성격을 명확히 나타내는 분류 체계입니다.

| Type | 설명 | 특징 |
| --- | --- | --- |
| **feat** | 새로운 기능 추가 |  |
| **fix** | bug 수정 |  |
| **docs** | 문서 변경 | README 수정 등 |
| **style** | code 변경 없이 형식만 수정 | semi colon, code formatting 등 |
| **refactor** | production code refactoring | 기능에는 변경 없음 |
| **test** | test code 추가/개선 관련 변경 | production code 수정 없음 |
| **chore** | production code 변경 없는 유지 보수 작업 | build file update, package manager 설정 수정 등 |


### Subject

- subject는 commit 내용을 간결하게 요약한 문장입니다.
    - 50자 이내로 제한합니다.
    - 대문자로 시작합니다.
    - 마침표를 사용하지 않습니다.

- 영어로 작성할 때는 명령형 현재 시제를 사용하여 작성합니다.
    - "Add feature"와 같이 commit이 "무엇을 하는지"를 명령형으로 서술합니다.
    - "Added feature", "Adds feature"와 같은 표현은 지양합니다.

- 한글로 작성할 때는 명사형 현재 시제를 사용하여 작성합니다.
    - "자동 이메일 알림 시스템 구현"과 같이 commit이 "무엇을 하는지"를 명사형으로 서술합니다.
    - "자동 이메일 알림 시스템을 구현했음", "자동 이메일 알림 시스템을 구현하는 중"와 같은 표현은 지양합니다.


### Body

- body는 commit에 대한 자세한 맥락과 설명을 제공합니다.
    - 복잡한 변경 사항이나 중요한 결정 사항을 설명할 때 사용합니다.
    - 각 줄은 72자를 넘지 않도록 합니다.

- "무엇을" 변경했는지와 "왜" 변경했는지에 초점을 맞춥니다.
    - "어떻게" 구현했는지는 code 자체가 설명하므로 본문에서는 생략합니다.

- 제목과 본문 사이에는 반드시 한 줄을 비워둡니다.


### Footer

- footer는 issue tracker와의 연결성을 제공합니다.
    - "Resolves: #123"와 같이 해결된 issue를 참조합니다.
    - "See also: #456, #789"와 같이 관련 issue를 추가로 언급할 수 있습니다.

- footer는 issue tracker ID 참조 외에도 주요 변경 사항을 명시하는 데 사용됩니다.
    - "BREAKING CHANGE: API 응답 구조 변경"과 같이 이전 version과 호환되지 않는 변경 사항을 표시합니다.
    - "Deprecated: 다음 버전에서 user_info() 함수는 제거될 예정임"과 같이 기능 중단 예고를 명시할 수 있습니다.
    - 이러한 정보는 다른 개발자들에게 중요한 영향을 미치는 변경 사항을 미리 알리는 역할을 합니다.


---


## Commit Message 예시

```txt
feat: Implement automatic email notification system

Add functionality to automatically send email notifications when a user 
submits a new form. This addresses the customer feedback requesting 
immediate confirmation of their submissions.

The system uses the existing email service API but adds a new template 
specifically designed for form submissions. Error handling is included
to prevent failed notifications from affecting the form submission process.

Resolves: #142
See also: #65, #78
```

```txt
feat: 자동 이메일 알림 시스템 구현

사용자가 새 양식을 제출할 때 자동으로 이메일 알림을 보내는 기능 추가.
이는 제출 즉시 확인을 요청하는 고객 피드백을 반영한 것임.

기존 이메일 서비스 API를 사용하되, 양식 제출용으로 특별히 디자인된 새 템플릿을 추가함.
알림 실패가 양식 제출 과정에 영향을 미치지 않도록 오류 처리 기능 포함.

해결: #142
참고: #65, #78
```


---


## Commit Guide를 준수했을 때의 장점

- 일관된 commit message는 project history를 이해하기 쉽게 만듭니다.
   - 새로운 팀원이 project에 합류했을 때 빠르게 맥락을 파악할 수 있습니다.
   - 특정 변경 사항을 추적하고 이해하는 시간을 단축합니다.
   - code review 과정에서 변경 의도를 명확히 전달할 수 있습니다.
   - 여러 branch 간의 merge conflict 해결 시 의사 결정을 용이하게 합니다.

- 체계적인 변경 기록은 향후 발생할 수 있는 문제 해결에 도움이 됩니다.
   - bug가 발생했을 때 관련 변경 사항을 쉽게 찾을 수 있습니다.
   - 변경 이유와 맥락을 이해하는 데 필요한 정보를 제공합니다.
   - git bisect와 같은 도구를 사용하여 문제가 시작된 commit을 효율적으로 찾아낼 수 있습니다.
   - 새로운 bug fix가 이전 변경과 충돌하지 않도록 context를 제공합니다.

- team 협업 효율성을 크게 향상시킵니다.
   - 모든 팀원이 동일한 형식으로 소통함으로써 의사소통 오류를 줄입니다.
   - code review 시간을 단축하고 review 품질을 높입니다.
   - 분산된 환경에서 작업하는 팀원들 간의 원활한 정보 공유를 지원합니다.
   - 새로운 기능 개발 시 관련 이전 작업을 쉽게 참조할 수 있습니다.

- 자동화 도구와의 통합이 용이해집니다.
   - CI/CD pipeline에서 commit type에 따른 자동 배포 정책 설정이 가능합니다.
   - semantic versioning과 연계하여 자동으로 version 번호를 관리할 수 있습니다.
   - commit 내용을 기반으로 자동 changelog 생성이 가능합니다.
   - issue tracker와 연동하여 작업 상태를 자동으로 update할 수 있습니다.

- 개발자의 전문성 향상에 기여합니다.
   - 명확한 commit message 작성 습관은 coding 작업의 목적과 방향성을 더 정확히 인식하게 합니다.
   - 자신의 변경 사항을 체계적으로 설명하는 능력을 기릅니다.
   - 다른 팀원들의 code와 변경 사항을 더 잘 이해하고 배울 수 있습니다.
   - 장기적으로 더 나은 설계 결정과 coding 관행을 발전시키는 데 도움이 됩니다.


---


## Reference

- <https://udacity.github.io/git-styleguide/>
