# Visual Studio Code
- 
---




# VSCode + Vim plugin 반복 입력 문제
- macOS에선 VSCode + Vim plugin 사용 시 key가 반복 입력되지 않는 문제가 생김
- solution : terminal에 아래 command 입력
	- defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false
---




# References
- https://awesometic.tistory.com/205
	- macOS 반복입력 문제 해결법
