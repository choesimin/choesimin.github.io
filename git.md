# git

- 3가지 상태
  1. Committed : data가 local dataabase에 안전하게 저장한 상태
  2. Modified : 수정한 file을 아직 local database에 commit하지 않은 상태
  3. Staged : 현재 수정한 파일을 곹 commit할 것이라고 표시한 상태

- Working Directory files
  - Tracked files (관리대상임) : 이미 snapshot에 포함되어 있던 file
    - Unmodified files (수정하지 않음)
      - 처음 저장소를 clone하면 모든 file이 이 상태임
        - file을 checkout하고 나서 아무것도 수정하지 않았기 때문
    - Modified files (수정함)
      - 마지막 commit 이후, 아무것도 수정하지 않은 상태에서 어떤 file을 수정하면 Git은 그 file을 Modified 상태로 인식
    - Staged files (commit으로 저장소에 기록할 상태) : Git이 알고 있는 file
  - Untracked files (관리대상이 아님)
    - 나머지 file 모두
    - Working Directory에 있는 file 중 snapshot에도 Staging Area에도 포함되지 않은 file
    - 새로운 file을 만들면 Untracked files에 들어감

---

# git init

- .git이라는 하위 Directory를 만듬
- 저장소에 필요한 뼈대(skeleton) file이 들어있음

---

# git add

- file 추가
- 상태 : Modified -> Staged

---

# git commit

- file commit
- 상태 : Staged -> Committed
- Git은 Staging Area에 속한 snapshot을 commit함
  - Staging Area에 넣지 않은 것은 다음에 commit할 수 있음
  - 나중에 snapshot끼리 비교하거나 예전 snapshot으로 되돌릴 수 있음
|Option|Explanation|
|-|-|
|-v|편집기에 diff message도 추가됨|
|-a|Trackd 상태의 file을 자동으로 Staging Area에 넣음 (add하지 않아도 됨)|

---

# git clone

- server에 있는 모든 data를 복사
- project history를 전부 받아옴

---

# git status

- file의 상태 확인

## -s

- == --short
- 상태를 간략하게 보여줌

---

# git diff

- 수정했지만 아직 Unstaged 상태인 file을 비교해볼 수 있음
  - Working Directory에 있는 것과 Staging Area에 있는 것을 비교

|Option|Explanation|
|-|-|
|--staged (== -cached)|Staging Area에 넣은(Staged) file의 변경 부분 보기|

---

# git rm

- Tracked 상태의 file을 Staging Area에서 삭제
- 일반 삭제와의 차이
  - Working Directory에서 file을 삭제 -> Unstaged 상태
  - 'git rm'으로 삭제한 file -> Stated 상태

|Option|Explanation|
|-|-|
|-f|이미 file을 수정했거나 Staging Area에 추가했을 때 강제로 삭제|
|--cached|Staging Area에서만 제거하고 Working Directory에 있는 file은 지우지 않고 남겨두기 (hard disk에 있는 file은 그대로 두고 Git만 추적하지 않게 함)|

---

# git mv

- file 이름 변경
- 아래 명령어를 수행한 것과 같음
  ```sh
  mv README.md README
  git rm README.md
  git add README
  ```
- 일종의 단축 명령어

---

# git log

- commit history 조회
- 주요 option
  |Option|Explanation|
  |-|-|
  |-p (== --patch)|각 commit의 diff 결과 조회|
  |--stat|각 commit에서 수정된 file의 통계 정보 조회|
  |--shortstat|--stat 명령의 결과 중에서 수정한 file, 추가된 line, 삭제된 line만 조회|
  |--name-only|commit 정보 중에서 수정된 file의 목록 조회|
  |--name-status|수정된 file의 목록 + 파일 추가, 수정, 삭제 여부 조회|
  |--abbrev-commit|40자 짜리 SHA-1 checksum 중 처음 몇 자만 조회|
  |--relative-date|정확한 시간이 아닌 '2 weeks ago'와 같이 상대적인 형식으로 조회|
  |--graph|branch와 merge history 정보까지 ASCII graph로 조회|
  |--pretty|지정한 형식으로 조회. 이 option에는 oneline, short, full, fuller, format이 있음. format은 원하는 형식으로 출력할 때 사용|
  |--oneline|--pretty=oneline --abbrev-commit 을 함께 사용한 것|
- 조회 범위를 제한하는 option
  |Option|Explanation|
  |-|-|
  |-(n)|최근 n 개의 commit만 조회|
  |--since, --after|명시한 날짜 이후의 commit만 조회|
  |--until, --before|명시한 날짜 이전의 commit만 조회|
  |--author|입력한 저자의 commit만 조회|
  |--committer|입력한 committer의 commit만 조회|
  |--grep|commit message 안의 text 검색|
  |-S|commit 변경(추갸/삭제) 내용 안의 text 검색|

---

# Reference

- https://git-scm.com/book/ko/v2
  - pro git 2nd edition (2014)
