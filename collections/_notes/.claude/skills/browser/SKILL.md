---
name: browser
description: Extract web page content using defuddle or lightpanda based on the page type
allowed-tools: Bash(defuddle *), Bash(lightpanda *)
user-invocable: false
---

# Web Page Content 추출
- 두 가지 도구를 상황에 맞게 선택하여 web page content를 추출

## 도구 선택 기준
- defuddle -> 기본값. static page, news/media article, YouTube 자막 (`defuddle/README.md` 참조)
- lightpanda -> JS rendering이 필요한 SPA, defuddle 실패 시 fallback (`lightpanda/README.md` 참조)
