---
name: scrape
description: Extract web page content and YouTube video transcripts using defuddle
---

# Web Page Content 추출
- `defuddle` CLI를 사용하여 web page에서 본문 content를 추출

## 기본 사용법
- markdown 추출 : `defuddle parse -m "<url>"`
- JSON 추출 (metadata 포함) : `defuddle parse -j "<url>"`
- 특정 속성만 추출 : `defuddle parse -p <property> "<url>"`
    - 사용 가능한 property : title, description, domain, author, published, wordCount
- file에서 추출 : `defuddle parse -m <file-path>`

## 출력 형식
- `-m` : 본문을 markdown 형식으로 출력
- `-j` : title, author, description, domain, published, wordCount, content 등 metadata를 포함한 JSON 출력
- `-p` : 지정한 단일 property 값만 출력
- flag 없이 실행하면 HTML 형식으로 출력

## 결과 저장
- stdout 출력이 기본이며, `-o <file>` flag로 file에 저장 가능
- 출력이 길 경우 `| head -n <lines>` 로 제한하여 확인

## YouTube 영상 추출
- YouTube URL을 전달하면 자막(transcript)을 자동으로 추출
- transcript에는 timestamp 정보가 포함됨
- 자막이 없는 영상은 추출이 제한될 수 있음

## 사용 시 참고
- URL은 반드시 따옴표로 감싸서 전달
- 언어 우선순위 지정 : `-l <code>` (BCP 47 형식, 예: ko, en, ja)
- JavaScript로 rendering되는 SPA page는 추출이 제한될 수 있으나, YouTube 등 일부 site는 async extractor로 지원
