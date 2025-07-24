---
layout: note
permalink: /355
date: 2025-07-24
title: Vector DB - 고차원 Vector 검색에 특화된 Database System
description: vector database는 embedding vector의 저장과 유사도 기반 검색에 특화된 database system입니다.
---


## Vector Database

- vector database는 **embedding vector의 저장과 유사도 기반 검색에 특화된 database system**입니다.
    - 전통적인 relational database와 달리, 고차원 vector space에서의 nearest neighbor search에 최적화되어 있습니다.
    - 수백만 개의 vector 중에서 query vector와 가장 유사한 것들을 millisecond 단위로 찾아낼 수 있습니다.

- AI application의 핵심 infrastructure로서 **semantic search, recommendation, RAG 등 다양한 use case**에서 활용됩니다.
    - embedding model이 생성한 vector를 효율적으로 관리하고 검색하는 역할을 담당합니다.
    - real-time application에서 요구되는 low latency와 high throughput을 동시에 지원합니다.


---


## Vector Database의 필요성

- **전통적인 database는 exact match 기반의 검색만 지원**하여 vector similarity search에 적합하지 않습니다.
    - relational database의 WHERE clause는 정확한 값 일치나 범위 검색만 가능합니다.
    - text 검색도 keyword matching 방식으로 semantic similarity를 고려하지 못합니다.

- **vector database는 "가장 비슷한" vector들을 찾아주는 특별한 기능**이 있습니다.
    - cosine similarity, euclidean distance, dot product 등 다양한 similarity metric을 지원합니다.
    - approximate nearest neighbor(ANN) algorithm을 사용하여 빠른 검색을 제공합니다.

- **수백 차원의 vector들 사이의 거리를 빠르게 계산**할 수 있도록 최적화되어 있습니다.
    - specialized data structure와 indexing 방법으로 고차원 space에서의 curse of dimensionality 문제를 완화합니다.
    - vectorized operation과 parallel processing을 통해 computation을 가속화합니다.


### Traditional Database의 한계

- **curse of dimensionality 문제**로 인해 고차원 vector 검색에서 성능이 급격히 저하됩니다.
    - 차원이 증가할수록 모든 점들이 비슷한 거리에 위치하게 되어 meaningful similarity 구분이 어려워집니다.
    - index 구조가 고차원 space에서는 효과적이지 않습니다.

- **similarity metric의 부재**로 vector 간의 의미적 유사도를 계산할 수 없습니다.
    - SQL의 standard function으로는 cosine similarity나 euclidean distance 계산이 복잡합니다.
    - custom function을 작성하더라도 성능 최적화가 어렵습니다.

- **scalability 문제**로 대용량 vector data에서는 실용적이지 않습니다.
    - brute force search의 시간 복잡도는 O(n)으로 data 크기에 비례하여 증가합니다.
    - real-time application에서 요구되는 low latency를 제공하기 어렵습니다.


### Traditional Database vs Vector Database 비교

| 구분 | Traditional Database | Vector Database |
| --- | --- | --- |
| 검색 방식 | Exact match, Range query | Similarity search, Nearest neighbor |
| 주요 연산 | CRUD, JOIN, Aggregation | Distance calculation, Vector similarity |
| Index 구조 | B-tree, Hash index | HNSW, IVF, LSH |
| Query 언어 | SQL | Vector-specific API, Custom query |
| 최적화 대상 | Transaction throughput, ACID | Search latency, Recall accuracy |
| 활용 분야 | Business application, OLTP/OLAP | AI application, Semantic search |
| 성능 척도 | QPS, Transaction time | Recall@K, Search latency |
| 확장성 | Vertical/Horizontal scaling | Distributed vector indexing |


---


## Vector 검색 Algorithm과 최적화 기법

- vector database는 **approximate nearest neighbor(ANN) algorithm**을 사용하여 검색 속도를 대폭 향상시킵니다.
    - 완벽한 정확도를 조금 포기하는 대신 실용적인 검색 시간을 확보합니다.
    - 대부분의 application에서는 top-k 결과의 순서가 완벽하지 않아도 충분히 유용합니다.


### Indexing 기법

- **Hierarchical Navigable Small World(HNSW)**는 가장 널리 사용되는 graph-based indexing 방법입니다.
    - multi-layer graph structure를 구성하여 효율적인 greedy search를 수행합니다.
    - 상위 layer에서는 long-range connection으로 빠른 navigation을, 하위 layer에서는 정확한 search를 제공합니다.
    - logarithmic time complexity를 구현하여 large-scale dataset에서도 빠른 검색이 가능합니다.

- **Inverted File Index(IVF)**는 clustering 기반의 indexing 방법입니다.
    - k-means clustering을 통해 vector space를 여러 region으로 나눕니다.
    - query vector와 가까운 cluster만 검색하여 computation을 줄입니다.
    - cluster 수와 search 범위를 조정하여 accuracy-speed trade-off를 제어할 수 있습니다.

- **Product Quantization(PQ)**는 memory 효율성을 위한 compression 기법입니다.
    - 고차원 vector를 여러 subspace로 나누어 각각을 independently quantize합니다.
    - 원본 vector 대신 quantized code를 저장하여 memory 사용량을 크게 줄입니다.
    - approximate distance computation을 통해 빠른 similarity search를 지원합니다.


### Hybrid Search 기법

- **dense vector와 sparse vector를 결합**한 hybrid search로 검색 품질을 향상시킵니다.
    - dense vector는 semantic similarity를, sparse vector는 keyword matching을 담당합니다.
    - BM25나 TF-IDF 같은 traditional IR method와 embedding search를 조합합니다.

- **multi-stage retrieval pipeline**을 통해 recall과 precision을 동시에 최적화합니다.
    - 첫 번째 stage에서는 빠른 retrieval로 candidate set을 구성합니다.
    - 두 번째 stage에서는 re-ranking model로 정확도를 높입니다.
    - 각 stage마다 다른 algorithm과 parameter를 사용하여 최적화합니다.


---


## 주요 Vector Database 솔루션

- vector database 시장은 **specialized solution과 general-purpose database의 vector extension**으로 구분됩니다.
    - 각각 고유한 장단점과 적합한 use case가 있어 requirements에 따라 선택해야 합니다.
    - performance, scalability, cost, ease of use 등을 종합적으로 고려하여 평가합니다.


### Specialized Vector Database

- **Pinecone**은 fully managed cloud service로 제공되는 vector database입니다.
    - serverless architecture로 auto-scaling과 zero-downtime deployment를 지원합니다.
    - RESTful API와 다양한 SDK를 통해 쉬운 integration이 가능합니다.
    - metadata filtering과 namespace 기능으로 flexible data organization을 갖추고 있습니다.

- **Weaviate**는 GraphQL API를 제공하는 open-source vector database입니다.
    - schema-based approach로 structured data와 vector search를 결합합니다.
    - built-in vectorization module로 embedding 생성과 저장을 통합 처리합니다.
    - cloud service와 self-hosted option을 모두 지원합니다.

- **Milvus/Zilliz**는 대규모 production 환경에 특화된 vector database입니다.
    - distributed architecture로 petabyte-scale data 처리가 가능합니다.
    - multiple index type과 similarity metric을 지원하여 다양한 use case에 대응합니다.
    - Kubernetes 기반 deployment로 enterprise-grade reliability를 제공합니다.

- **Chroma**는 AI application 개발에 특화된 lightweight vector database입니다.
    - Python-first design으로 data scientist와 ML engineer에게 친화적입니다.
    - embedding function integration으로 seamless workflow를 지원합니다.
    - local development부터 production deployment까지 consistent experience를 갖추고 있습니다.


### Traditional Database의 Vector Extension

- **PostgreSQL + pgvector**는 기존 relational database에 vector search 기능을 추가한 solution입니다.
    - existing PostgreSQL infrastructure를 활용하여 migration cost를 최소화합니다.
    - ACID transaction과 vector search를 함께 사용할 수 있습니다.
    - SQL query로 relational data와 vector data를 조합하여 complex query가 가능합니다.

- **Elasticsearch**는 full-text search engine에 vector search 기능을 통합했습니다.
    - dense_vector field type으로 vector storage와 search를 지원합니다.
    - text search와 vector search를 hybrid query로 결합할 수 있습니다.
    - 기존 Elasticsearch ecosystem과의 호환성을 유지합니다.

- **Redis**는 in-memory database의 빠른 성능을 vector search에 활용합니다.
    - RediSearch module을 통해 vector indexing과 search를 지원합니다.
    - extremely low latency가 요구되는 real-time application에 적합합니다.
    - cache와 vector database 기능을 하나의 system에서 통합 지원합니다.


---


## Vector Database Architecture와 설계 원칙

- vector database는 **고유한 data structure와 algorithm**을 기반으로 설계됩니다.
    - traditional RDBMS와는 다른 storage layout과 query processing 방식을 사용합니다.
    - vector-specific optimization과 hardware acceleration을 적극 활용합니다.


### Storage Architecture

- **columnar storage format**을 사용하여 vector dimension별 접근을 최적화합니다.
    - row-oriented storage보다 vectorized operation에 유리한 memory access pattern을 제공합니다.
    - compression algorithm을 적용하여 storage efficiency를 향상시킵니다.

- **memory hierarchy optimization**으로 빠른 data access를 보장합니다.
    - hot data는 memory에, warm data는 SSD에, cold data는 HDD에 tiered storage를 구성합니다.
    - prefetching과 caching strategy로 I/O bottleneck을 완화합니다.

- **distributed storage**로 large-scale dataset을 처리합니다.
    - consistent hashing이나 range partitioning으로 data를 여러 node에 분산합니다.
    - replication과 sharding을 통해 availability와 scalability를 확보합니다.


### Query Processing

- **parallel query execution**으로 multi-core CPU를 효율적으로 활용합니다.
    - vector operation은 inherently parallelizable하여 thread-level parallelism이 효과적입니다.
    - SIMD instruction을 사용하여 single instruction으로 multiple data를 처리합니다.

- **GPU acceleration**을 통해 대규모 vector computation을 가속화합니다.
    - CUDA나 OpenCL을 사용하여 thousands of thread로 parallel processing을 수행합니다.
    - specialized GPU library인 FAISS나 cuVS를 활용합니다.

- **approximate search algorithm**으로 scalability와 performance를 달성합니다.
    - accuracy parameter를 조정하여 application requirement에 맞는 trade-off를 설정합니다.
    - early termination과 pruning technique으로 불필요한 computation을 줄입니다.


---


## Vector Database 활용 사례와 Best Practice

- vector database는 **다양한 AI application의 backend infrastructure**로 활용됩니다.
    - 각 use case마다 고유한 requirement와 optimization 전략이 필요합니다.
    - performance metric과 business goal을 고려하여 적절한 configuration을 선택해야 합니다.


### Semantic Search 구현

- **document retrieval system**에서 user query와 semantically relevant document를 찾습니다.
    - query와 document를 동일한 embedding space에 mapping하여 similarity search를 수행합니다.
    - metadata filtering을 통해 date, category, author 등의 조건을 추가로 적용합니다.
    - re-ranking model을 사용하여 initial retrieval 결과의 순서를 개선합니다.

- **code search platform**에서는 natural language query로 relevant code snippet을 찾습니다.
    - code와 documentation을 embedding으로 변환하여 cross-modal search를 지원합니다.
    - programming language별로 specialized embedding model을 사용합니다.

- **e-commerce search**에서는 product description과 user intent matching을 수행합니다.
    - product catalog을 embedding으로 변환하여 semantic product discovery를 제공합니다.
    - user behavior data와 결합하여 personalized search 결과를 생성합니다.


### Recommendation System

- **content-based filtering**에서 item feature similarity를 계산합니다.
    - movie, music, article 등의 content를 embedding으로 표현하여 similar item을 추천합니다.
    - user preference profile도 embedding으로 학습하여 personalized recommendation을 제공합니다.

- **collaborative filtering**에서는 user-item interaction을 vector space에 modeling합니다.
    - matrix factorization technique으로 user와 item의 latent factor를 학습합니다.
    - implicit feedback data도 embedding으로 변환하여 활용합니다.


### RAG(Retrieval-Augmented Generation)

- **knowledge base retrieval**에서 LLM에게 제공할 relevant context를 찾습니다.
    - user question을 embedding으로 변환하여 관련 document chunk를 검색합니다.
    - retrieved passage들을 LLM prompt에 포함하여 더 accurate한 답변을 생성합니다.
    - dynamic retrieval로 conversation context에 따라 적응적으로 knowledge를 제공합니다.

- **multi-modal RAG**에서는 text, image, audio 등 다양한 modality를 통합 검색합니다.
    - cross-modal embedding을 사용하여 서로 다른 media type 간의 similarity를 계산합니다.
    - multimodal LLM에게 heterogeneous context를 제공하여 rich한 답변을 생성합니다.


### 성능 최적화 전략

- **index tuning**을 통해 특정 workload에 최적화된 성능을 보장합니다.
    - recall target과 latency requirement에 따라 index parameter를 조정합니다.
    - A/B testing을 통해 실제 traffic에서의 performance를 측정하고 개선합니다.

- **batch processing**으로 throughput을 향상시킵니다.
    - multiple query를 함께 처리하여 computation overhead를 줄입니다.
    - vectorized operation으로 CPU와 GPU utilization을 최대화합니다.

- **caching strategy**로 frequently accessed vector에 대한 response time을 개선합니다.
    - LRU cache나 application-specific caching policy를 적용합니다.
    - cache hit ratio를 monitoring하여 cache size와 eviction policy를 최적화합니다.


---


## Vector Database 운영과 Monitoring

- vector database의 **production 환경 운영**에는 specialized monitoring과 maintenance가 필요합니다.
    - traditional database와 다른 performance characteristic과 failure mode를 가집니다.
    - embedding model 변경이나 data drift에 대한 대응 방안도 필요합니다.


### Performance Monitoring

- **latency metric**은 p50, p95, p99 percentile로 측정하여 tail latency를 관리합니다.
    - approximate search의 특성상 query complexity에 따라 latency가 크게 달라질 수 있습니다.
    - real-time dashboard로 latency trend를 monitoring하고 threshold alert을 설정합니다.

- **recall quality**를 주기적으로 측정하여 search accuracy를 보장합니다.
    - ground truth dataset으로 recall@k metric을 계산하여 index quality를 평가합니다.
    - index corruption이나 parameter drift로 인한 quality degradation을 조기 발견합니다.

- **resource utilization**을 monitoring하여 capacity planning을 수행합니다.
    - CPU, memory, disk I/O, network bandwidth 사용률을 추적합니다.
    - GPU를 사용하는 경우 GPU memory와 utilization도 함께 monitoring합니다.


### Data Management

- **embedding model versioning**으로 model update에 따른 data inconsistency를 방지합니다.
    - model이 변경되면 기존 embedding과 호환되지 않을 수 있습니다.
    - rolling update strategy로 무중단 embedding re-generation을 수행합니다.

- **data lifecycle management**로 storage cost를 최적화합니다.
    - access pattern에 따라 hot/warm/cold tier로 data를 이동합니다.
    - retention policy에 따라 오래된 embedding을 자동으로 삭제합니다.

- **backup and disaster recovery**로 data protection을 보장합니다.
    - incremental backup으로 storage overhead를 최소화합니다.
    - cross-region replication으로 disaster scenario에 대비합니다.


---


## Vector Database의 한계와 개선 방향

- vector database 기술은 빠르게 발전하고 있지만 **여러 fundamental challenge**들이 남아 있습니다.
    - 이러한 한계를 이해하고 적절한 workaround를 적용하는 것이 중요합니다.
    - 연구 community에서는 이러한 문제들을 해결하기 위한 새로운 approach들을 개발하고 있습니다.


### Scalability Challenge

- **memory requirement**가 dataset 크기에 비례하여 증가하는 문제가 있습니다.
    - billion-scale vector dataset에서는 TB 단위의 memory가 필요할 수 있습니다.
    - compression technique과 disk-based index로 memory footprint를 줄이려는 연구가 진행됩니다.

- **index building time**이 large dataset에서는 hours 또는 days 단위로 소요될 수 있습니다.
    - incremental index update와 parallel index construction으로 이 문제를 완화합니다.
    - online learning을 통해 continuous data ingestion을 지원하는 방향으로 발전하고 있습니다.


### Accuracy-Performance Trade-off

- **approximate search의 한계**로 perfect recall을 보장하기 어렵습니다.
    - application에 따라 missed relevant result가 business impact을 가질 수 있습니다.
    - adaptive algorithm으로 query에 따라 dynamically accuracy level을 조정하는 연구가 있습니다.

- **high-dimensional space**에서는 meaningful similarity 구분이 어려워집니다.
    - dimensionality reduction과 feature selection으로 이 문제를 완화할 수 있습니다.
    - learned index와 neural ranking model을 결합한 hybrid approach도 연구되고 있습니다.


### Multi-tenancy와 Security

- **isolation mechanism**이 traditional database만큼 성숙하지 않습니다.
    - tenant별 resource allocation과 performance isolation이 어려울 수 있습니다.
    - namespace와 access control을 통해 basic isolation을 제공하지만 완전하지 않습니다.

- **data privacy**와 **encryption**에 대한 support가 제한적입니다.
    - embedding 자체가 원본 data의 sensitive information을 포함할 수 있습니다.
    - homomorphic encryption이나 differential privacy 기법을 적용하는 연구가 진행됩니다.


---


## Reference

- <https://arxiv.org/abs/1603.09320>
- <https://arxiv.org/abs/1702.08734>
- <https://arxiv.org/abs/1603.02754>
- <https://github.com/facebookresearch/faiss>
- <https://www.pinecone.io/learn/vector-database/>
- <https://weaviate.io/developers/weaviate>
- <https://milvus.io/docs>
- <https://www.trychroma.com/>
- <https://github.com/pgvector/pgvector>
- <https://redis.io/docs/interact/search-and-query/advanced-concepts/vectors/>

