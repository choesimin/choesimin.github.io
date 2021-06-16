# Git
- 형상 관리 도구(Configuration Management Tool) 중 하나
	- 형상 관리 도구는 version 관리 system이라고도 함
---




# git commit
- commit은 git 저장소에 local directory에 있는 모든 file에 대한 snapshot을 기록하는 것
- directory 전체를 복사하여 붙여넣는 것과 유사하지만, 훨씬 유용함
- git은 commit을 가볍게 유지하고자 하기때문에, commit할 때마다 directory 전체를 복사하진 않음
- 각 commit은 저장소의 이전 version과 다음 version의 변경 내역('delta'라고도 함)을 저장
	- 그래서 대부분의 commit이 그 commit 위의 부모 commit의 가리킴
- 저장소를 복제(clone)하려면 모든 변경분(delta)를 풀어내야 하는데, 이 때문에 명령행 결과로 'resolving deltas'라는 문구를 볼 수 있음
- commit은 project의 snapshot들로 생각하면 됨
- commit은 매우 가볍고 commit 사이의 전환도 매우 빠름
---




# git branch
- branch는 특정 commit에 대한 참조(reference)
	- branch를 많이 만들어도 memory나 disk 공간에 부담이 되지 않음
	- 따라서 작업을 커다란 branch로 만들기보다 작은 단위로 잘게 나누는 것이 좋음
- branch는 가벼움
- 하나의 commit과 그 부모 commit들을 포함하는 작업 내역
- git branch [branch명]
	- branch 만들기
- git checkout [branch명]
	- 변경분을 commit하기 전에 새 branch로 이동하게 됨
---




# git merge
- 두 branch를 합치는 방법
	- 새 branch를 따로 새 기능을 개발한 다음 합칠 수 있음
- git merge
	- git의 합치기(merge)는 두 개의 부모(parent)를 가리키는 특별한 commit을 만들어 냄
		- 두 개의 부모가 있는 commit이라는 것은 "한 부모의 모든 작업 내역과 나머지 부모의 모든 작업, 그리고 그 두 부모의 모든 부모들의 작업내역을 포함한다"라는 의미가 있음
	- 
	
---




# References
- https://learngitbranching.js.org/?locale=ko
	- git game
- https://git-scm.com/book/ko/v2
	- pro git book
