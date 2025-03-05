---
layout: skill
permalink: /131
title: Twitter의 Tweet 추천 Algorithm
description: Twitter의 home timeline의 "For You" feed 추천 Algorithm을 설명합니다.
date: 2023-04-16
---


## Twitter가 Tweet을 추천하는 방법

- 2023년 3월 31일, Twitter는 home timeline의 **"For You" feed 추천 Algorithm**을 Github와 자사의 기술 blog에 공개했습니다.
    - algorithm source code : <https://github.com/twitter/the-algorithm>
    - machine learning source code : <https://github.com/twitter/the-algorithm-ml>
    - algorithm에 대한 설명 : <https://blog.twitter.com/engineering/en_us/topics/open-source/2023/twitter-recommendation-algorithm>

- Twitter의 home에는 두 개의 timeline이 표시됩니다.
    1. Follwing timeline : 'follow한 사람의 posting'을 볼 수 있습니다.
    2. For You (추천) timeline : 'follow한 사람의 posting', 'follow하지 않는 사람의 posting', '광고' 등이 추천 algorithm으로 선정되어 보여집니다.

- 이 글은 추천 algorithm에 대해 설명합니다.


