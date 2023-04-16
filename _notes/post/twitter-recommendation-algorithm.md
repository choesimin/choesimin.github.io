layout: note
title: Twitter의 추천 algorighm
version: 2024-04-15
---




- 2023년 3월 31일, Twitter는 home timeline의 **"For You" feed 추천 Algorithm**을 Github와 자사의 기술 blog에 공개했습니다.
    - Github
        - <https://github.com/twitter/the-algorithm>
        - <https://github.com/twitter/the-algorithm-ml>
    - Twitter 기술 blog
        - <https://blog.twitter.com/engineering/en_us/topics/open-source/2023/twitter-recommendation-algorithm>

- Twitter의 home에는 두 개의 timeline이 표시됩니다.
    | Timeline | 설명 |
    | - | - |
    | follw | 'follow한 사람의 posting'만 볼 수 있습니다. |
    | 추천(For You) | 'follow한 사람의 posting', 'follow하지 않는 사람의 posting', '광고' 등이 추천 algorithm으로 선정되어 보여집니다. |

- 이 글에선 추천 algorithm의 내용을 설명하고, source code를 분석합니다.




---




## Algorithm 내용 : 추천 timeline의 tweet들을 선정하는 방법

- 추천 algorithm은 timeline 상위에 노출시킬 tweet들을 선정합니다.
    - Twitter에는 매일 5억개 정도의 tweet들이 게시됩니다.

- 화면에 표시되는 tweet들은 선정을 위한 pipeline을 거칩니다.
    1. Candidate Sources : 후보를 선정합니다.
        - In-Network Source + Out-of-Network Sources
    2. Ranking : 순위를 매깁니다.
    3. Heuristics & Filters : 균형 있고 다양하게 보일 수 있도록 filtering합니다.
    4. Mixing : tweet들과 non-tweet들을 섞습니다.



### 1. Candidate Sources

- 수억 개의 후보 중에서 약 1500개 정도의 관련성 있는 최신 tweet들을 가져오는 작업입니다.
- In-Network(follow하는 사람들)과 Out-of-Network(follow하지 않는 사람들)에게서 후보를 가져옵니다.
    - 추천 timeline은 평균적으로 In-Network 50%, Out-of-Network 50% 비율로 구성됩니다.

#### In-Network Source

- follow한 사람의 tweet들 중에 가장 '최신'이며 가장 '관련성 있는' tweet들을 가져옵니다.
    - logistic 회귀 model을 사용하여 follow하는 사람들의 tweet들을 관련성에 따라 순위를 매깁니다.
        - logistic 회귀(regression)는 수학을 사용하여 두 data 요인 간의 관계를 찾는 data 분석 기법입니다.
    - 높은 순위의 tweet들을 다음 단계로 보냅니다.

- "Real Graph"는 In-Network에서 순위를 정할 때 사용되는 핵심 component입니다.
    - Real Graph는 두 사용자 간의 참여(engagement) 가능성을 예측하는 model입니다.
        - engagement는 상호 간의 관계를 맺는 모든 행위를 의미합니다.
            - ex) 댓글 작성하기
    - '사용자(user)'와 '사용자가 follow하는 사람(author of tweet)' 간의 Real Graph 점수가 높을 수록 더 많은 tweet이 후보에 포함됩니다.
    - Real Graph에 대한 논문 : <https://www.ueo-workshop.com/wp-content/uploads/2014/04/sig-alternate.pdf>

#### Out-of-Network Sources

- Out-of-Network에서 관련성 있는 tweet들을 찾는 것은 In-Network에서 찾는 것보다 더 까다롭습니다.
- Twitter는 이 문제를 해결하기 위해 두 가지 접근법을 사용합니다.
    1. Social Graph
    2. Embedding Spaces

##### 1. Social Graph 접근법

- 사용자가 follow하는 사람과 선호하는 tweet들을 토대로 관심도 높은 후보를 생성합니다.
    1. 사용자가 follow하는 사람들이 최근에 어떤 tweet에 참여했는지.
    2. 사용자가 좋아하는 tweet들과 비슷한 tweet을 좋아하는 사람들이 최근에 어떤 것들을 좋아했는지.

- 위 질문들에 대한 답을 하면서 후보 tweet들을 생성하고, logistic 회귀 model을 사용하여 결과 tweet들의 순위를 매깁니다.
    - 이런 유형의 graph 순회(traversal) Out-of-Network 추천에 필수적입니다.
    - Twitter는 graph 순회를 실행하기 위해 자체 개발한 "GraphJet"을 사용합니다.
        - GraphJet은 사용자와 tweet 간의 실시간 상호 작용 graph를 유지하는 graph 처리 engine입니다.
        - GraphJet에 대한 논문 : <https://www.vldb.org/pvldb/vol9/p1281-sharma.pdf>

##### 2. Embedding 공간 접근법

- 


### 2. Ranking

- 후보 선정이 끝나고, 순위 작업이 시작되는 시점의 pipeline에는 최대 1500개의 후보가 있습니다.

- 순위 작업에서 모든 후보들은 동일한 중요도를 가지고 판단됩니다.
- 순위를 매길 때는 사용자의 긍정적 참여(좋아요, Retweet, 댓글 등)를 유도하기 위해 신경망을 사용합니다.
    - 신경망은 4800만 개의 parameter로 tweet 간의 상호 작용에 대해 지속적으로 학습되어 있습니다.
- 참여 확률()

- 


### 3. Heuristics & Filters



### 4. Mixing












## Source Code 분석 : 구조

The core components of the For You Timeline included in this repository are listed below:

| Type | Component | Description |
|------------|------------|------------|

| Candidate Source | [search-index](src/java/com/twitter/search/README.md) | Find and rank In-Network Tweets. ~50% of Tweets come from this candidate source. |
|                  | [cr-mixer](cr-mixer/README.md) | Coordination layer for fetching Out-of-Network tweet candidates from underlying compute services. |
|                  | [user-tweet-entity-graph](src/scala/com/twitter/recos/user_tweet_entity_graph/README.md) (UTEG)| Maintains an in memory User to Tweet interaction graph, and finds candidates based on traversals of this graph. This is built on the [GraphJet](https://github.com/twitter/GraphJet) framework. Several other GraphJet based features and candidate sources are located [here](src/scala/com/twitter/recos). |
|                  | [follow-recommendation-service](follow-recommendations-service/README.md) (FRS)| Provides Users with recommendations for accounts to follow, and Tweets from those accounts. |

| Ranking | [light-ranker](src/python/twitter/deepbird/projects/timelines/scripts/models/earlybird/README.md) | Light Ranker model used by search index (Earlybird) to rank Tweets. |
|         | [heavy-ranker](https://github.com/twitter/the-algorithm-ml/blob/main/projects/home/recap/README.md) | Neural network for ranking candidate tweets. One of the main signals used to select timeline Tweets post candidate sourcing. |
| Tweet mixing & filtering | [home-mixer](home-mixer/README.md) | Main service used to construct and serve the Home Timeline. Built on [product-mixer](product-mixer/README.md). |
|                          | [visibility-filters](visibilitylib/README.md) | Responsible for filtering Twitter content to support legal compliance, improve product quality, increase user trust, protect revenue through the use of hard-filtering, visible product treatments, and coarse-grained downranking. |
|                          | [timelineranker](timelineranker/README.md) | Legacy service which provides relevance-scored tweets from the Earlybird Search Index and UTEG service. |





---




# Reference

- <https://github.com/twitter/the-algorithm>
- <https://github.com/twitter/the-algorithm-ml>
- <https://blog.twitter.com/engineering/en_us/topics/open-source/2023/twitter-recommendation-algorithm>
