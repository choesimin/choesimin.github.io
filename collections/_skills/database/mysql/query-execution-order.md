---
layout: skill
permalink: /215
title: MySQL Query 작성/실행 순서
description: MySQL query의 작성 순서와 실행 순서가 다릅니다.
date: 2023-11-23
---


## 작성 순서

```mermaid
flowchart TD

select[SELECT] --> from[FROM] --> join[JOIN, ON] --> where[WHERE] --> group[GROUP BY] --> having[HAVING] --> order[ORDER BY] --> limit[LIMIT, OFFSET]
```


