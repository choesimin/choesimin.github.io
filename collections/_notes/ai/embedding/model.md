---
layout: note
permalink: /358
title: Embedding Model - Vector 변환 전용 AI Model
description: embedding model은 text나 image를 숫자 vector로 변환하는 것만을 목적으로 하는 specialized AI model입니다.
date: 2025-07-24
---


## Embedding Model : 비정형 Data를 Vector로 변환하는 전용 AI Model

- embedding model은 text, image 등을 **vector로 변환하는 것만을 목적**으로 만들어진 specialized AI model입니다.
    - 일반적인 ChatGPT나 Claude 같은 대화형 AI와 달리, embedding model은 대화나 text 생성 기능이 전혀 없습니다.
    - 오직 input을 받아서 고정된 크기의 숫자 list(vector)로 변환하는 **"변환기" 역할**만 수행합니다.

- embedding model은 **항상 다른 system과 조합하여 사용**되며, 큰 AI system의 한 "부품" 역할을 합니다.
    1. 사용자 input을 embedding model이 vector로 변환합니다.
    2. vector 검색으로 관련 정보를 찾습니다.
    3. 찾은 정보를 LLM에 전달하여 최종 답변을 생성합니다.


---


## Embedding Model의 학습 과정

- embedding model은 **neural network가 대량의 text data를 학습**하여 만들어집니다.
    - AI model이 수많은 문서를 읽으면서 단어들 사이의 관계와 pattern을 스스로 발견합니다.
    - 이 과정을 통해 embedding 변환 규칙을 익히고, 의미적 representation을 생성하는 능력을 갖게 됩니다.


### Model 학습을 위한 Data와 Pattern 발견

- AI model은 **Wikipedia, news article, 책 등 수억 개의 문장을 분석**합니다.
    - 방대한 corpus에서 statistical pattern과 linguistic structure를 추출합니다.
    - data의 규모가 클수록 더 정확하고 robust한 embedding을 생성할 수 있습니다.

- 이 과정에서 "사과는 빨갛다", "사과를 먹었다", "과일 중에 사과" 등의 문장들을 통해 **"사과"의 특성을 학습**합니다.
    - 동일한 entity가 다양한 context에서 어떻게 사용되는지 파악합니다.
    - 단어의 syntactic property와 semantic property를 동시에 학습합니다.

- **비슷한 맥락에서 자주 등장하는 단어들은 비슷한 의미**를 가진다고 판단하도록 model이 학습됩니다.
    - distributional hypothesis에 기반하여 co-occurrence pattern을 분석합니다.
    - 주변 단어들의 분포를 통해 target 단어의 의미를 추론합니다.


### 단어의 맥락 학습

- **초기에는 단어 하나씩 static embedding**을 만들었습니다.
    - 각 단어가 고정된 하나의 vector representation을 가졌습니다.
    - context에 관계없이 동일한 embedding을 사용하는 방식이었습니다.

- **Word2Vec**은 주변 단어들을 보고 가운데 단어를 맞추는 방식으로 학습했습니다.
    - CBOW(Continuous Bag of Words)와 Skip-gram 두 가지 architecture를 제공합니다.
    - shallow neural network를 사용하여 계산 효율성을 높였습니다.

- **GloVe(Global Vectors)**는 전체 문서에서 단어들이 함께 나타나는 빈도를 분석했습니다.
    - global co-occurrence matrix를 구성하여 word-word co-occurrence statistics를 활용합니다.
    - matrix factorization 기법을 통해 embedding을 학습합니다.

- 하지만 **같은 단어라도 문맥에 따라 의미가 달라질 수 있다는 한계**가 있었습니다.
    - "은행에 갔다"는 "금융기관"을 의미하고, "강가의 은행에 앉았다"는 "강변"을 의미합니다.
    - polysemy(다의어) 문제를 해결하기 어려웠습니다.


### 맥락을 고려한 현대적 방법

- 현재는 **문맥을 고려해서 같은 단어도 상황에 따라 다른 embedding**을 만듭니다.
    - contextual embedding이라고 불리는 dynamic representation 방식을 사용합니다.
    - 동일한 단어라도 주변 context에 따라 서로 다른 vector 값을 가집니다.

- **BERT(Bidirectional Encoder Representations from Transformers)**는 문장 전체를 이해해서 각 단어의 정확한 의미를 파악합니다.
    - bidirectional attention을 통해 좌우 양방향의 context 정보를 모두 활용합니다.
    - masked language modeling을 통해 self-supervised learning을 수행합니다.

- **GPT(Generative Pre-trained Transformer)** 같은 model도 문장의 sequential context를 고려합니다.
    - autoregressive language modeling으로 다음 token을 예측하면서 학습합니다.
    - unidirectional attention으로 이전 context만을 참조합니다.

- **transformer architecture**를 사용해서 문장 안의 모든 단어들이 서로 어떤 관계인지 분석합니다.
    - self-attention mechanism을 통해 각 position이 다른 모든 position과의 관계를 계산합니다.
    - parallel processing이 가능하여 RNN 계열보다 빠른 학습이 가능합니다.


### Model의 학습 과정과 원리

- AI model은 **"빈칸 맞추기" 게임을 통해 학습**됩니다.
    - "나는 ___을 먹었다"에서 빈칸에 올 수 있는 단어를 예측하도록 훈련됩니다.
    - masked language modeling task를 통해 context로부터 missing token을 추론합니다.

- **정답을 많이 맞출수록 단어의 의미를 잘 이해**한 것으로 판단합니다.
    - prediction accuracy를 통해 model의 language understanding 능력을 평가합니다.
    - cross-entropy loss를 minimize하는 방향으로 parameter를 update합니다.

- **수백만 번의 연습을 통해 model이 단어와 문장의 의미를 체득**하고, 이를 바탕으로 embedding을 생성하는 능력을 갖게 됩니다.
    - gradient descent optimization을 통해 반복적으로 parameter를 조정합니다.
    - large-scale distributed training을 통해 massive dataset에서 효율적으로 학습합니다.


---


## Embedding Model의 구현과 활용

- embedding model은 **text나 image를 vector로 변환하는 것이 유일한 목적**입니다.
    - 입력 data의 semantic information을 fixed-size numerical representation으로 encoding합니다.
    - 변환된 vector는 downstream task에서 feature로 활용됩니다.

- **대화나 text 생성 기능은 없으며**, 다른 AI system의 component로 활용됩니다.
    - generative capability가 아닌 representation learning에 특화되어 있습니다.
    - modular design을 통해 다양한 application에 plug-and-play 방식으로 적용됩니다.


### Embedding Model의 Architecture 특징

- embedding model은 **input을 받아서 vector만 출력**합니다.
    - encoder-only architecture를 사용하여 representation learning에 최적화되어 있습니다.
    - output layer에서 fixed-size dense vector를 생성합니다.

- **text 생성, 질문 답변, 추론 등의 기능은 전혀 제공하지 않습니다.**
    - decoder나 language modeling head가 없어 text generation이 불가능합니다.
    - 오직 input의 semantic representation만을 추출합니다.

- **빠르고 효율적인 vector 생성에 특화**되어 있습니다.
    - inference 속도를 위해 model size와 computational complexity가 최적화되어 있습니다.
    - batch processing을 통해 multiple input을 동시에 처리할 수 있습니다.


### 주요 Embedding Model들

- **Sentence-BERT(SBERT)**는 문장 단위의 embedding 생성에 특화된 model입니다.
    - BERT를 기반으로 하되 sentence-level representation에 최적화되어 있습니다.
    - siamese network architecture를 통해 sentence pair의 similarity를 효과적으로 학습합니다.

- **OpenAI의 text-embedding-ada-002**는 다양한 task에 범용적으로 활용 가능한 model입니다.
    - large-scale training data로 학습되어 높은 일반화 성능을 보입니다.
    - API 형태로 제공되어 쉽게 활용할 수 있습니다.

- **E5(Text Embeddings by Weakly-Supervised Contrastive Pre-training)**는 Microsoft에서 개발한 multilingual embedding model입니다.
    - contrastive learning을 통해 cross-lingual representation을 학습합니다.
    - 여러 언어 간의 semantic similarity를 효과적으로 capturing합니다.


### 실제 활용 방식

- embedding model은 **항상 다른 system과 함께 사용**됩니다.
    - standalone application이 아닌 component로서의 역할을 수행합니다.
    - 다른 AI model들과의 pipeline을 구성하여 complete solution을 제공합니다.

- **RAG(Retrieval-Augmented Generation)** 에서의 활용 예시입니다.
    - 사용자 질문을 embedding model로 vector 변환합니다.
    - vector database에서 유사한 문서들을 cosine similarity 기반으로 검색합니다.
    - 찾은 문서들을 LLM에게 context로 전달하여 답변을 생성합니다.
    - 이를 통해 LLM의 knowledge cutoff 한계를 극복하고 real-time information을 활용할 수 있습니다.

- **recommendation system**에서도 user preference와 item을 같은 vector space에 mapping하여 개인화된 추천을 제공합니다.
    - user의 과거 interaction history를 embedding으로 변환합니다.
    - item의 content feature도 동일한 space에 embedding합니다.
    - user embedding과 item embedding 간의 similarity를 계산하여 recommendation score를 산출합니다.

- **semantic search engine**에서는 query와 document 간의 의미적 유사도를 기반으로 검색 결과를 제공합니다.
    - traditional keyword matching의 한계를 극복합니다.
    - conceptual search가 가능하여 더 relevant한 결과를 제공합니다.


### Performance 최적화

- **실제 service에서는 embedding 생성 속도가 중요**합니다.
    - latency requirement를 만족하기 위해 inference optimization이 필수입니다.
    - real-time application에서는 millisecond 단위의 응답 시간이 요구됩니다.

- **여러 text를 한 번에 처리하는 batch processing**으로 throughput을 향상시킵니다.
    - GPU memory를 효율적으로 활용하여 parallel processing을 수행합니다.
    - batch size를 조정하여 latency와 throughput 간의 trade-off를 최적화합니다.

- **model 크기를 줄이거나 정밀도를 낮춰서** 속도와 resource 사용량을 최적화합니다.
    - knowledge distillation을 통해 smaller student model을 학습합니다.
    - quantization을 적용하여 model weight의 precision을 줄입니다.
    - pruning을 통해 불필요한 parameter를 제거합니다.


---


## Embedding Model의 평가와 선택 기준

- embedding model의 성능은 **downstream task에서의 효과로 평가**됩니다.
    - intrinsic evaluation과 extrinsic evaluation 두 가지 방법으로 평가합니다.
    - 실제 application에서의 performance가 가장 중요한 지표입니다.


### 평가 Metric과 Benchmark

- **semantic textual similarity(STS) benchmark**를 통해 embedding의 품질을 측정합니다.
    - human annotator가 평가한 similarity score와 embedding similarity 간의 correlation을 계산합니다.
    - Spearman correlation coefficient가 주요 평가 지표로 사용됩니다.

- **MTEB(Massive Text Embedding Benchmark)**는 다양한 task에 대한 종합적인 평가를 제공합니다.
    - classification, clustering, retrieval, reranking 등 8가지 task category를 포함합니다.
    - 56개의 dataset에서 embedding model의 성능을 비교 평가합니다.

- **information retrieval task**에서는 nDCG(Normalized Discounted Cumulative Gain)와 recall@k를 사용합니다.
    - query와 관련된 document를 얼마나 잘 찾아내는지 측정합니다.
    - ranking quality와 coverage를 동시에 평가합니다.


### Model 선택 시 고려 사항

- **domain compatibility**를 고려하여 특정 영역에 특화된 model을 선택합니다.
    - 의료, 법률, 금융 등 specialized domain에서는 domain-specific model이 더 좋은 성능을 보입니다.
    - general-purpose model과 domain-specific model 간의 성능 차이를 비교 평가합니다.

- **multilingual requirement**가 있는 경우 cross-lingual embedding model을 선택합니다.
    - 여러 언어를 동일한 vector space에 mapping하는 능력이 중요합니다.
    - zero-shot cross-lingual transfer 성능을 평가하여 model을 선택합니다.

- **computational resource constraint**를 고려하여 model size와 inference time을 평가합니다.
    - edge device나 resource-limited environment에서는 lightweight model이 필요합니다.
    - accuracy와 efficiency 간의 trade-off를 고려하여 최적의 model을 선택합니다.


---


## Embedding Model의 한계와 개선 방향

- embedding model은 강력한 기능을 제공하지만 **여러 fundamental limitation**들이 존재합니다.
    - 이러한 한계를 이해하고 적절한 mitigation strategy를 적용해야 합니다.
    - 지속적인 연구를 통해 더 robust하고 reliable한 embedding model이 개발되고 있습니다.


### Training Data Dependency

- **model의 성능은 training data의 품질과 다양성에 크게 의존**합니다.
    - biased training data는 biased embedding을 생성하여 unfair한 결과를 초래할 수 있습니다.
    - training corpus에 포함되지 않은 domain이나 topic에서는 성능이 저하됩니다.

- **data scarcity problem**은 특히 specialized domain에서 심각합니다.
    - 의료, 법률 등의 전문 분야에서는 충분한 양의 고품질 data를 확보하기 어렵습니다.
    - few-shot learning이나 transfer learning을 통해 이 문제를 완화하려는 연구가 진행됩니다.


### Semantic Drift와 Context Window

- **long text에서는 semantic drift 현상**이 발생할 수 있습니다.
    - 긴 문서에서 앞부분과 뒷부분의 주제가 다를 때 embedding이 ambiguous해질 수 있습니다.
    - context window의 크기 제한으로 인해 전체 context를 고려하지 못하는 문제가 있습니다.

- **hierarchical embedding**이나 **chunk-based approach**를 통해 이 문제를 해결하려는 시도가 있습니다.
    - 문서를 작은 chunk로 나누어 각각 embedding을 생성하고 이를 조합하는 방법입니다.
    - 다층적 구조를 통해 local context와 global context를 모두 고려합니다.


### Embedding Dimension과 Interpretability

- **optimal embedding dimension을 선택하는 것이 어렵습니다.**
    - 차원이 너무 높으면 computational cost가 증가하고 curse of dimensionality 문제가 발생합니다.
    - 차원이 너무 낮으면 information loss가 발생하여 성능이 저하됩니다.

- **embedding의 interpretability 부족**은 실제 application에서 문제가 될 수 있습니다.
    - black box nature로 인해 embedding이 어떤 semantic feature를 encoding하는지 이해하기 어렵습니다.
    - debugging이나 model improvement를 위해서는 interpretability가 중요합니다.


---


## Reference

- <https://arxiv.org/abs/1301.3781>
- <https://arxiv.org/abs/1810.04805>
- <https://arxiv.org/abs/1908.10084>
- <https://arxiv.org/abs/2210.07316>
- <https://arxiv.org/abs/2212.03533>
- <https://huggingface.co/blog/sentence-transformers>
- <https://platform.openai.com/docs/guides/embeddings>
- <https://www.microsoft.com/en-us/research/blog/e5-large-scale-fine-tuning-for-text-embeddings/>

