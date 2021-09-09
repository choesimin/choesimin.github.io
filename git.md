# git

- 3가지 상태
  1. Committed : data가 local database에 안전하게 저장한 상태
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
|||
|-|-|
|-v|편집기에 diff message도 추가됨|
|-a|Tracked 상태의 file을 자동으로 Staging Area에 넣음|
|--amend|commit 합치기 (기존의 commit을 덮어씀)|

---

# git clone

- server에 있는 모든 data를 복사
- project history를 전부 받아옴

---

# git status

- file의 상태 확인
|||
|-|-|
|--short|상태를 간략하게 보여줌|
|-s|'--short'와 동일|

---

# git diff

- 수정했지만 아직 Unstaged 상태인 file을 비교해볼 수 있음
  - Working Directory에 있는 것과 Staging Area에 있는 것을 비교

|||
|-|-|
|--staged|Staging Area에 넣은(Staged) file의 변경 부분 보기|
|--cached|'--staged'와 동일|

---

# git rm

- Tracked 상태의 file을 Staging Area에서 삭제
- 일반 삭제와의 차이
  - Working Directory에서 file을 삭제 -> Unstaged 상태
  - 'git rm'으로 삭제한 file -> Stated 상태

|||
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
  |||
  |-|-|
  |--patch|각 commit의 diff 결과 조회|
  |-p|'--patch'와 동일|
  |--stat|각 commit에서 수정된 file의 통계 정보 조회|
  |--shortstat|--stat 명령의 결과 중에서 수정한 file, 추가된 line, 삭제된 line만 조회|
  |--name-only|commit 정보 중에서 수정된 file의 목록 조회|
  |--name-status|수정된 file의 목록 + 파일 추가, 수정, 삭제 여부 조회|
  |--abbrev-commit|40자 짜리 SHA-1 checksum 중 처음 몇 자만 조회|
  |--relative-date|정확한 시간이 아닌 '2 weeks ago'와 같이 상대적인 형식으로 조회|
  |--graph|branch와 merge history 정보까지 ASCII graph로 조회|
  |--pretty|지정한 형식으로 조회. 이 option에는 oneline, short, full, fuller, format이 있음. format은 원하는 형식으로 출력할 때 사용|
  |--oneline|--pretty=oneline --abbrev-commit 을 함께 사용한 것|
  |--decorate|branch가 어떤 commit을 가리키는지 조회|
- 조회 범위를 제한하는 option
  |||
  |-|-|
  |-(n)|최근 n 개의 commit만 조회|
  |--since, --after|명시한 날짜 이후의 commit만 조회|
  |--until, --before|명시한 날짜 이전의 commit만 조회|
  |--author|입력한 저자의 commit만 조회|
  |--committer|입력한 committer의 commit만 조회|
  |--grep|commit message 안의 text 검색|
  |-S|commit 변경(추갸/삭제) 내용 안의 text 검색|
  |--no-merges|merge commit 표시하지 않기|

---

# git reset

|||
|-|-|
|||
- git reset HEAD <file>...
- Staged 상태 -> Unstaged 상태
- 위험한 명령어 (특히 '--hard' option)

---

# git checkout

|||
|-|-|
|-- <file>|discard changes in work directory (변경 취소 : Modified 상태 file이 초기화됨)|
|<tag 이름>|tag를 checkout|
|<branch 이름>|해당 branch로 이동|
|-b <branch 이름>|branch를 만들면서 checkout까지 한번에 하기 (branch + checkout)|

---

# git remote

- 원격 저장소 조회
|||
|-|-|
|-v|단축 이름과 URL 전체 조회|
|add <단축 이름> <URL>|Work Directory에 새 remote 저장소 추가|
|show <remote 저장소 이름>|remote 저장소의 구체적인 정보를 확인|
|rename <단축 이름>|remote 저장소의 이름 바꾸기|
|remove <단축 이름>|remote 저장소 삭제 (추적 branch 정보나 모든 설정 내용도 함께 삭제됨)|
|rm <단축 이름>|'remove'와 동일|

---

# git fetch

- local에는 없지만 remote에 있는 모든 data를 가져옴
- 자동으로 merge하지는 않음

---

# git pull

- git fetch + git merge
- server에서 data를 가져오고 그 data를 자동으로 현재 작업하는 code와 merge시킴

---

# git push

|||
|-|-|
|<remote 저장소 이름> <branch 이름>|remote 저장소(upstream)에 branch push 하기|
|<remote 저장소 이름> <tag 이름>|remote 저장소에 tag push 하기|
|<remote 저장소 이름> --tags|remote server에 없는 tag 모두 push 하기|

---

# git tag

- lightweight tag
  - branch와 비슷한데 branch처럼 가리키는 지점을 최신 commit으로 이동시키지 않음
  - 단순히 특정 commit에 대한 pointer
- annotated tag
  - Git database에 tag를 만든 사람의 이름, email과 tag를 만든 날짜, tag message를 저장함
  - 일반적으로 annotated tag를 만들어 많은 정보를 사용할 수 있도록 하는 것이 좋지만, 임시로 생성하는 tag거나 이러한 정보를 유지할 필요가 없는 경우에는 lightweight tag를 사용할 수도 있음
|||
|-|-|
|--list|만들어진 tag 조회|
|-l|'--list'와 동일|
|-l "<검색어>"|검색하여 tag 조회|
|<tag 이름>|lightweight tag 붙이기|
|-a <tag 이름> -m "<tag message>"|annotated tag 붙이기|
|-a <tag 이름> <checksum(commit hashcode)>|commit에 나중에 tag 붙이기|

---

# git show

|||
|-|-|
|<tag 이름>|별도의 tag 정보 왁인 (단순 commit 정보만을 보여줌)|

---

# git branch

- HEAD : 지금 작업하는 local branch를 가리키는 pointer
- branch를 이동하면 Working Directory의 file이 변경됨

|||
|-|-|
|-d <branch 이름>|해당 branch 삭제|

---

# git merge

- fast-forward : branch pointer가 merge 과정 없이 최신 commit으로 이동하는 것
  - A branch에서 다른 B branch를 merge할 때, B branch가 A branch 이후의 commit을 가리키고 있으면, 그저 A branch가 B branch와 동일한 commit을 가리키도록 이동만 하는 것
- 3-way-merge
  - 각 branch가 가리키는 commit 두 개와 공통 조상 하나를 이용하어 합치는 것
  - 합친 결과를 별도의 commit으로 만들고나서 해당 branch가 가리키도록 이동시킴
  - == merge commit
- 충돌 (conflict)
  - 3-way-merge에서 발생
  - merge하는 두 branch에서 같은 file의 한 부분을 동시에 수정하면 Git은 해당 부분을 merge하지 못함
  - 충돌이 일어난 file은 'git status'하면 unmerged 상태로 표시됨
  - code에서 충돌을 알려주는 표시를 보고 수동으로 고쳐서 해결 가능
    - '=======' 위 쪽 : current (HEAD version : merge 명령을 실행할 때 작업하던 branch)
    - '=======' 아래 쪽 : incomming (충돌을 유발하는 branch)
  - 'git mergetool'을 사용하면 merge 도구로 해결 가능
  - 해결 후에 merge message에는 어떻게 충돌을 해결했고 좀 더 확인해야하는 부분은 무엇이고 왜 그렇게 해결했는지에 대해서 자세하게 기록 -> 나중에 이 merge commit을 이해하는 데에 도움을 줌


|||
|-|-|
|-d <branch 이름>|해당 branch 삭제|
|<branch 이름>|합칠 branch(HEAD가 있는 branch)에서 합쳐질 branch(merge 뒤에 적힌 branch)를 merge하는 것|
||branch의 목록을 보여줌|
|-v|각 branch의 마지막 commit message를 함께 보여줌|
|--merge|현재 checkout한 branch에 이미 merge한 branch 목록 (삭제 가능한 branch)|
|--no-merge|현재 checkout한 branch에 merge하지 않은 branch 목록 (삭제 불가능한 branch)|
|-D|merge하지 않은 branch 강제로 삭제|
|--merge|이미 merge한 branch 목록 확인 (삭제 가능한 branch)|
|--no-merge|현재 checkout한 branch에 merge하지 않은 branch 목록 (삭제 불가능한 branch)|
|--merge <branch 이름>|해당 branch에 이미 merge한 branch 목록|
|--no-merge <branch 이름>|해당 branch에 merge하지 않은 branch 목록|

---

# Reference

- https://git-scm.com/book/ko/v2
  - pro git 2nd edition (2014)
