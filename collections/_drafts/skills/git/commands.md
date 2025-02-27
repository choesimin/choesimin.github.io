---
layout: skill
title: Git - 명령어 총 정리
version: 2023-07-12
---




## `git init`

- 명령어를 실행한 곳에 `.git`이라는 하위 directory를 만듭니다.
- `.git`에는 저장소에 필요한 skeleton(뼈대) file이 들어있습니다.




## `git add`

```sh
git add [file_name]
```

- staging area에 file을 추가합니다.
- file의 상태가 `Modified`에서 `Staged`로 변합니다.

| Option | 설명 |
| --- | --- |
| `-A` | 대화형 mode로 추가 |
| `--interactive` | 대화형 mode로 추가 |
| `-i` | `--interactive` option과 같음 |
| `--patch` | file의 일부분만 추가 |
| `-p` | `-p` option과 같음 |




## `git commit`

- 작업 내용을 저장합니다.
- file의 상태가 `Staged`에서 `Committed`로 변합니다.
- Git은 staging area에 속한 snapshot을 commit합니다.
    - staging area에 넣지 않은 것은 이번 commit(저장) 대상에 포함되지 않습니다.
- commit을 해두면 나중에 snapshot끼리 비교하거나 예전 snapshot으로 되돌릴 수 있습니다.

| Option | 설명 |
| --- | --- |
| `-m [message]` | commit message를 지정하여 commit (commit message를 수정하도록 편집기가 실행되지 않음) |
| `-v` | commit message 편집기에 diff message도 추가 |
| `-a` | `Tracked` 상태의 file을 자동으로 staging area에 넣음 (`git add` 명령어를 commit할 때 함께 사용하는 option) |
| `--amend` | 기존 commit에 작업 내용을 합치고, commit message를 수정 |
| `--amend --no-edit` | `--amend` option에서 commit message 수정 기능을 사용하지 않음 (commit message를 수정하도록 편집기가 실행되지 않음) |

- `--amend` option은 기존의 commit에 변경 내용(staging area)을 추가한 새로운 commit을 만들고, 기존 commit을 덮어씁니다.
    - 새로운 commit이 생성된 것이기 때문에 때문에 commit hash 값도 바뀝니다.




## `git clone`

```sh
git clone [repository_url]
```

- remote repository에 있는 모든 data를 복사합니다.
- project history를 전부 받아옵니다.




## `git status`

- file의 상태를 확인합니다.

| Option | 설명 |
| --- | --- |
|--short|상태를 간략하게 보여줌|
|-s|'--short'와 동일|

---

# git diff

- 수정했지만 아직 Unstaged 상태인 file을 비교해 볼 수 있음
    - Working Directory에 있는 것과 staging area에 있는 것을 비교

| Option | 설명 |
| --- | --- |
|--staged|staging area에 넣은(Staged) file의 변경 부분 보기|
|--cached|'--staged'와 동일|

---

# git rm

- Tracked 상태의 file을 staging area에서 삭제
- 일반 삭제와의 차이
    - Working Directory에서 file을 삭제 -> Unstaged 상태
    - 'git rm'으로 삭제한 file -> Stated 상태

| Option | 설명 |
| --- | --- |
|-f|이미 file을 수정했거나 staging area에 추가했을 때 강제로 삭제|
|--cached|staging area에서만 제거하고 Working Directory에 있는 file은 지우지 않고 남겨두기 (hard disk에 있는 file은 그대로 두고 Git만 추적하지 않게 함)|

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

| 주요 Option | 설명 |
| --- | --- |
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
|-S <문자열>|해당 문자열이 추가된 commit과 없어진 commit만 검색할 수 있음|

| 조회 범위 Option | 설명 |
| --- | --- |
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

- git reset HEAD <file>...
- Staged 상태 -> Unstaged 상태
- 위험한 명령어 (특히 '--hard' option)
- 아에 과거의 특정 사건(commit)으로 되돌림
    - 과거로 갔다는 기록(history)을 남기지 않음
- commit history를 깔끔하게 유지할 수 있음
- 혼자 작업할 때 편하게 되돌아갈 수 있음
- 다른 사람과 같은 branch에서 작업할 때 commit이 뒤섞여버릴 수 있음

| Option | 설명 |
| --- | --- |
|--patch|file 일부만 Stage Area에서 내리기|

---

# git revert

- git revert <돌리고 싶은 commit ID>
- 현재에 있으면서 과거의 특정 사건(commit)들만 없던 일로 만듬
    - 과거로 되돌리겠다는 내용도 기록(commit 이력에 남김)
- 중간에 무슨 문제가 있었는지, 왜 돌아갔는지 등의 기록이 가능함
- 다른 사람과 같은 branch에서 작업할 때 code 충돌을 최소화할 수 있음

---

# git checkout

| Option | 설명 |
| --- | --- |
|-- <file>|discard changes in work directory (변경 취소 : Modified 상태 file이 초기화됨)|
|<tag_name>|tag를 checkout|
|<branch_name>|해당 branch로 이동|
|-b <branch_name>|branch를 만들면서 checkout까지 한번에 하기 (branch + checkout)|

---

# git remote

- 원격 저장소 조회
|||
|-|-|
|-v|remote_name과 URL 전체 조회|
|add <remote_name> <URL>|Work Directory에 새 remote 저장소 추가|
|show <remote_name>|remote 저장소의 구체적인 정보를 확인|
|rename <remote_name>|remote 저장소의 이름 바꾸기|
|remove <remote_name>|remote 저장소 삭제 (추적 branch 정보나 모든 설정 내용도 함께 삭제됨)|
|rm <remote_name>|'remove'와 동일|
|prune <remote_name>|remote 저장소에 추가되거나 삭제된 branch를 local에 적용|

---

# git fetch

- local에는 없지만 remote에 있는 모든 data를 가져옴
- 자동으로 merge하지는 않음
|||
|-|-|
|--all --prune|등록된 모든 remote 저장소의 branch를 동기화함 (추가/삭제 포함)|

---

# git pull

- git fetch + git merge
- server에서 data를 가져오고 그 data를 자동으로 현재 작업하는 code와 merge시킴

---

# git push

- Git은 local에 모든 version 관리 data를 복사(clone)해두고 있기 때문에 자유롭게 history를 local에서 수정해볼 수 있음
- 그러나 local의 version 관리 data 혹은 commit이 외부로 push가 된 후라면, 그 history에 대해선 수정을 가하면 안됨
- push된 data는 수정이 완전히 끝난 것임
    - 고쳐야할 이유가 생겼더라도 새로 수정 작업을 추가해야지, 이전 commit 자체를 수정할 수는 없음
    - 따라서 온전하게 수정 작업을 마무리했다는 확신 없이 작업 내용을 공유하는 remote 저장소로 보내는(push) 행동은 피해야 함

|||
|-|-|
|<remote_name> <branch_name>|remote 저장소(upstream)에 branch push 하기|
|<remote_name> <tag_name>|remote 저장소에 tag push 하기|
|<remote_name> --tags|remote server에 없는 tag 모두 push 하기|
|<remote_name> <branch_name> --delete|remote branch 삭제|

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
|<tag_name>|lightweight tag 붙이기|
|-a <tag_name> -m "<tag message>"|annotated tag 붙이기|
|-a <tag_name> <checksum(commit hashcode)>|commit에 나중에 tag 붙이기|

---

# git show

|||
|-|-|
|<tag_name>|별도의 tag 정보 왁인 (단순 commit 정보만을 보여줌)|

---

# git branch

- HEAD : 지금 작업하는 local branch를 가리키는 pointer
- branch를 이동하면 Working Directory의 file이 변경됨

|||
|-|-|
|-d <branch_name>|해당 branch 삭제|

|||
|-|-|
|-d <branch_name>|해당 branch 삭제|
|<branch_name>|합칠 branch(HEAD가 있는 branch)에서 합쳐질 branch(merge 뒤에 적힌 branch)를 merge하는 것|
||branch의 목록을 보여줌|
|-v|각 branch의 마지막 commit message를 함께 보여줌|
|--merge|현재 checkout한 branch에 이미 merge한 branch 목록 (삭제 가능한 branch)|
|--no-merge|현재 checkout한 branch에 merge하지 않은 branch 목록 (삭제 불가능한 branch)|
|-D|merge하지 않은 branch 강제로 삭제|
|--merge|이미 merge한 branch 목록 확인 (삭제 가능한 branch)|
|--no-merge|현재 checkout한 branch에 merge하지 않은 branch 목록 (삭제 불가능한 branch)|
|--merge <branch_name>|해당 branch에 이미 merge한 branch 목록|
|--no-merge <branch_name>|해당 branch에 merge하지 않은 branch 목록|
|-a|모든 branch 확인|
|-r|remote branch들 확인|

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
|--abort|병합 전의 상태로 되돌림(commit 이전에 사용)|

---

# git rebase

- git rebase <basebranch> <topicbranch>
    - 아래의 두 명령어를 합친 것
        - git checkout <basebranch>
        - git merge <topicbranch>
- 과정
    1. 두 branch가 나뉘기 전인 공통 commit으로 이동
    2. 그 commit부터 지금 checkout한 branch가 가리키는 commit까지 diff를 차례로 만들어 어딘가에 임시로 저장해놓음
    3. rebase할 branch가 합칠 branch가 가리키는 commit을 가리키게 하고 아까 저장해 놓았던 변경 사항을 차례대로 적용
    4. 그리고 fast-forward함
- branch를 합치는 2가지 방법
    - merge
        - 두 branch의 최종 결과만을 가지고 합침
        - 3-way-merge를 통해 더 상세한 history를 기록할 수 있음
    - rebase
        - branch의 변경 사항을 순서대로 다른 branch에 적용함녀서 합침
        - 좀 더 깨끗한 history를 만듬
            - history가 선형 : 일을 병렬로 동시에 진행해도 rebase하면 모든 작업이 차례대로 수행된 것처럼 보임
            - project 관리자는 어떠한 통합 작업도 필요 없고 그저 master branch를 fast-forward 시키면 됨
- rebase, merge 모두 최종 결과물은 같고 commit history만 다름
- remote 저장소에 push한 commit을 rebase하면 안됨
    - rebase는 기존의 commit을 그대로 사용하는 것이 아니라, 내용은 같지만 다른 commit을 새로 만듬
    - 협업자와 공유를 위해 push pull을 하다 보면 history가 꼬여서 내 code가 엉망이 되어버림
- 되도록이면 merge를 사용하고 commit history를 가독성 있게 관리하기 위해서 rebase를 사용
    - local branch에서 작업할 때는 history를 정리하기 위해 rebase할 수도 있지만, remote 등 어딘가에 push로 내보낸 commit에 대해서는 절대 rebase하지 말아야 함

|||
|-|-|
|-i HEAD~n|마지막 n개(HEAD부터 n까지)의 commit을 수정 (실질적으로 가리키게 되는 것은 수정하려는 commit의 부모인 n+1 번째 이전의 commit임)|
|||

---

# git stash

- stack에 새로운 stash 만들기
- 아직 끝나지 않은 수정 사항을 stack에 잠시 저장했다가 나중에 다시 적용할 수 있음
    - branch가 달라져도 가능
- Working Directory에서 수정한 file들만 저장
    - Modified이면서 Tracked 상태일 file과 staging area에 있는 file들을 보관해두는 장소

|||
|-|-|
|(save)|stack에 새로운 stash 만들기 (save는 생략 가능)|
|(save) --keep-index|staging area에 있는 file을 stash하지 않음|
|(save) --include-untracked|추적 중이지 않은(Untracked) file을 같이 저장|
|(save) -u|'--include-untracked'와 동일|
|(save) --patch|수정된 모든 사항을 저장하지 않고, 대화형 prompt가 떠서 변경된 data 중 저장할 것과 저장하지 않을 것을 지정하여 저장|
|--all|모든 file을 stash (stash하고 변경 이력을 지우기 때문에 'git clean'에 비해 안전)|
|list|저장한 stash 확인|
|apply|가장 최근의 stash 적용|
|apply <stash_name>|해당 이름의 stash 적용|
|apply --index|Staged 상태까지 적용|
|drop <stash_name>|해당 stash 제거|
|pop <stash_name>|stash를 적용하고 바로 stack에서 제거|
|branch <branch_name>|stash할 당시의 commit을 checkout한 후 새로운 branch를 만들고 여기에 적용 (과정이 성공하면 stash를 삭제함)|

---

# git clean

- merge나 외부 도구가 만들어낸 file을 지우거나 이전 build 작업으로 생성된 각종 file을 지우는 데에 필요함
- Working Directory 안의 추적하고 있지 않은 모든 file이 지워지기 때문에 신중하게 사용해야 함
    - 'git stash --all' 명령을 이용하면 지우는 건 똑같지만, 먼저 모든 file을 stash하므로 더 안전함

|||
|-|-|
|(-?) <filename>|한 개의 file만 clean|
|-d|하위 directory까지 지우기|
|-f|강제(force) : '진짜로 그냥 해라'|
|-n|이 명령을 실행했을 때 어떤 일이 일어날지 미리 보기 (가상으로 실행해보고 어떤 file이 지워질지 알려줌)|
|-x|.gitignore로 무시된 file까지 함께 지우기|
|-i|대화형으로 실행 (file마다 지울지 말지 결정하거나 특정 pattern으로 걸러서 지울 수 있음)|

---

# git grep

- commit tree의 내용이나 Working Directory의 내용을 검색
    - 검색어에는 문자열이나 정규표현식을 사용 가능
- 매우 빠르고, Working Directory만이 아니라 Git history 내의 어떠한 정보라도 찾아낼 수 있음

|||
|-|-|
|--line-number <검색어>|찾을 문자열이 위치한 line number 함께 출력|
|-n <검색어>|'--line-number'와 동일|
|--count <검색어>|어떤 file에서 몇 개나 찾았는지 알려줌|
|-c <검색어>|'--count'와 동일|
|--show-function <검색어>|matching되는 line이 있는 함수나 method 찾기|
|-p <검색어>|'--show-function'과 동일|

---

# git cherry-pick

- 다른 branch에 있는 commit을 선택적으로 현재의 branch에 적용시킬 때 사용

|||
|-|-|
|<commit_hash_1>|해당 hash 값을 가진 commit을 가져와 현재 commit의 바로 뒤에 추가하기|
|<commit_hash_1> <commit_hash_2>|commit 여러 개 가져오기|
|<commit_hash_1>...<commit_hash_3>|commit과 commit 사이의 모든 commit을 가져오기|
|--continue|충돌이 발생한 경우, 충돌을 해결한 뒤 계속 진행하기|
|--abort|충돌이 발생한 경우, cherry-pick하기 이전으로 돌아가기|








---
---
---
---
---
---
---
---
---
---
---
---
---
---




1. 저장소 생성 및 복제
- git init: 새로운 Git 저장소 생성
- git clone: 원격 저장소 복제

2. 변경사항 관리
- git add: 파일을 스테이징 영역에 추가
- git status: 파일 상태 확인
- git diff: 파일 변경사항 비교
- git rm: 파일 삭제
- git mv: 파일 이름 변경

3. 커밋 관련
- git commit: 변경사항 커밋
- git log: 커밋 히스토리 조회
- git show: 태그와 커밋 정보 조회

4. 브랜치 관리
- git branch: 브랜치 생성, 삭제, 목록 조회
- git checkout: 브랜치 전환
- git merge: 브랜치 병합
- git rebase: 브랜치 재배치
- git cherry-pick: 특정 커밋만 선택적으로 적용

5. 원격 저장소 관리
- git remote: 원격 저장소 관리
- git fetch: 원격 저장소에서 데이터 가져오기
- git pull: 원격 저장소에서 데이터 가져오고 병합
- git push: 원격 저장소로 변경사항 전송

6. 되돌리기 관련
- git reset: 특정 커밋으로 되돌리기
- git revert: 특정 커밋만 취소
- git checkout -- [file]: 작업 디렉토리의 변경사항 취소

7. 임시 저장
- git stash: 작업 중인 변경사항 임시 저장

8. 태그 관리
- git tag: 태그 생성 및 관리

9. 작업 영역 정리
- git clean: 추적되지 않는 파일 삭제

10. 검색
- git grep: 소스코드 내용 검색



---


## Reference

- <https://git-scm.com/book/ko/v2>
