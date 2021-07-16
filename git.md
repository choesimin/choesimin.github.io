# Git

- 형상 관리 도구(Configuration Management Tool) 중 하나
	- 형상 관리 도구 == version 관리 system

### 차이가 아니라 snapshot

- git은 data를 file system snapshot의 연속으로 취급
  - 크기가 아주 작음
- file이 달라지지 않았으면 git은 성능을 위해서 file을 새로 저장하지 않음
  - 단지 이전 상태의 file에 대한 link만 저장

### 거의 모든 명령을 local에서 실행

- 거의 모든 명령을 local file과 daeta만 사용하기 때문에 network에 있는 다른 computer는 필요 없음
- project의 모든 history가 local disk에 있기 때문에 모든 명령이 순식간에 실행됨

### git 무결성

- git은 data를 저장하기 전에 항상 checksum을 구하고 그 checksum으로 data를 관리
- checksum은 git에서 사용하는 가장 기본적인 data 단위이자 git의 기본 철학임
  - git 없이는 checksum을 다룰 수 없어서 file의 상태도 알 수 없음
    - 심지어 data를 잃어버릴 수 있음
  - git은 SHA-1 hash를 사용하여 checksum을 만듬
    - file의 내용이나 directory 구조를 이용하여 checksum을 구함
  - git은 모든 것을 hash로 식별
    - 따라서 git은 file을 이름으로 저장하지 않고 해당 file의 hash로 저장

### git은 data를 추가만 함

- git은 database에 data를 추가만 하며, 되돌리거나 삭제할 방법이 없음
- 다른 VCS 처럼 git도 commit하지 않으면 변경사항을 잃어버릴 수 있음
  - 그러나 일단 snapshot을 commit하고 나면 data를 안전하게 가지고 있을 수 있음

### 3가지 상태

- git의 file은 3가지 상태로 관리됨
  1. Commited
    - data가 local database에 안전하게 저장된 상태
  2. Modified
    - file이 수정된 상태
    - 아직 local database에 commit하지 않은 것을 말함
  3. Staged
    - 수정됨 상태의 file을 곧 commit할 것이라고 표시한 상태
- 3가지 상태는 git project의 3가지 영역과 연관되어 있음
  1. Git Directory (.git repository)
    - project의 metadata와 객체 database를 저장하는 곳
    - git의 핵심
    - 다른 computer에 있는 저장소를 clone하거나 project 생성할 때 만들어짐
  2. Working Directory of tree
    - project의 특정 version을 checkout한 것
  3. Staging Area
    - Git Directory에 있음
    - 단순한 file로 곧 commit할 file에 대한 정보를 저장
    - index라는 용어로 쓰이기도 함
- git의 작업 흐름
  1. Work Directory의 file을 수정 : Modified
  2. file을 stage해서 Staging Area에 snapshot을 만듬 : Staged
  3. Staging Area에 있는 snapshot을 commit해서 Git Directory에 영구적인 snapshot으로 저장 : Commited

---

# Commands

### git commit

- commit은 git 저장소에 local directory에 있는 모든 file에 대한 snapshot을 기록하는 것
- directory 전체를 복사하여 붙여넣는 것과 유사하지만, 훨씬 유용함
- git은 commit을 가볍게 유지하고자 하기때문에, commit할 때마다 directory 전체를 복사하진 않음
- 각 commit은 저장소의 이전 version과 다음 version의 변경 내역('delta'라고도 함)을 저장
	- 그래서 대부분의 commit이 그 commit 위의 부모 commit의 가리킴
- 저장소를 복제(clone)하려면 모든 변경분(delta)를 풀어내야 하는데, 이 때문에 명령행 결과로 'resolving deltas'라는 문구를 볼 수 있음
- commit은 project의 snapshot들로 생각하면 됨
- commit은 매우 가볍고 commit 사이의 전환도 매우 빠름

### git branch

- branch는 특정 commit에 대한 참조(reference)
	- branch를 많이 만들어도 memory나 disk 공간에 부담이 되지 않음
	- 따라서 작업을 커다란 branch로 만들기보다 작은 단위로 잘게 나누는 것이 좋음
- branch는 가벼움
- 하나의 commit과 그 부모 commit들을 포함하는 작업 내역
- git branch [branch명]
	- branch 만들기
- git checkout [branch명]
	- 변경분을 commit하기 전에 새 branch로 이동하게 됨

### git merge

- 두 branch를 합치는 방법
	- 새 branch를 따로 새 기능을 개발한 다음 합칠 수 있음
- git merge
	- git의 합치기(merge)는 두 개의 부모(parent)를 가리키는 특별한 commit을 만들어 냄
		- 두 개의 부모가 있는 commit이라는 것은 "한 부모의 모든 작업 내역과 나머지 부모의 모든 작업, 그리고 그 두 부모의 모든 부모들의 작업내역을 포함한다"라는 의미가 있음
	
---

# Reference
- https://learngitbranching.js.org/?locale=ko
	- git game
- https://git-scm.com/book/ko/v2
	- pro git book
