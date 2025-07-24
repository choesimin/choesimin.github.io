---
layout: note
permalink: /357
title: Embedding - 비정형 Data를 Vector로 변환하는 AI 핵심 기술
description: embedding은 의미적으로 유사한 data들이 수학적으로도 가까운 거리에 위치하도록 하여, AI가 인간의 언어와 개념을 이해할 수 있게 합니다.
date: 2025-07-24
---


## Embedding : 비정형 Data를 Vector로 변환하는 AI 핵심 기술

- embedding은 **비정형 data를 고차원 vector space의 수치로 변환**하는 representation learning 기술입니다.
   - computer가 이해할 수 없는 symbolic data를 연산 가능한 numerical form으로 mapping하여, machine learning algorithm이 처리할 수 있도록 합니다.
       - 단어, 문장, image, audio 등을 computer가 이해할 수 있는 숫자 형태로 바꿉니다.
   - 예를 들어 "사과"라는 단어를 [0.2, -0.8, 0.5, 0.1, ...]과 같은 수백 개의 숫자 list로 변환합니다.
   - 숫자들은 무작위가 아니라, 단어나 문장의 의미를 수학적으로 표현한 것입니다.

- embedding의 핵심은 **원본 data의 semantic relationship을 vector space에서의 geometric relationship으로 보존**하는 것입니다.
   - **의미적으로 유사한 data들이 수학적으로도 가까운 거리에 위치하도록** 합니다.


### Embedding이 필요한 이유

- computer는 "사과"나 "바나나"라는 단어 자체를 이해할 수 없습니다.
   - computer에게 문자는 단순한 symbol에 불과하고, 의미를 파악할 수 없습니다.
   - 하지만 숫자로 변환하면 computer가 계산을 통해 "사과와 바나나는 둘 다 과일이므로 비슷하다"는 것을 알 수 있습니다.

- 기존의 keyword matching 방식과 달리, **embedding은 의미의 유사성을 파악**할 수 있습니다.
   - keyword matching : "자동차"를 검색하면 정확히 "자동차"가 들어간 문서만 찾습니다.
   - embedding 검색 : "자동차"를 검색하면 "차량", "승용차", "SUV" 등 관련된 의미의 문서도 찾을 수 있습니다.

- machine learning model은 **수치 data만 처리**할 수 있기 때문에, text나 image 같은 비정형 data를 숫자로 변환하는 과정이 필수입니다.
   - neural network의 모든 연산은 행렬 곱셈과 덧셈 등 수학적 계산으로 이루어집니다.
   - 따라서 모든 input data는 반드시 숫자 형태로 제공되어야 합니다.


---


## Embedding과 Vector Space

- embedding vector는 **고차원 공간상의 한 점**으로 표현되며, 각 차원은 특정한 의미적 특성을 나타냅니다.
   - 일반적으로 50차원에서 1024차원 사이의 고차원 vector를 사용합니다.
   - 각 차원은 "성별", "감정", "추상성" 등과 같은 잠재적 의미 특성을 encoding합니다.

- **cosine similarity**를 통해 두 vector 간의 의미적 유사도를 측정합니다.
   - cosine similarity는 -1에서 1 사이의 값으로, 1에 가까울수록 의미가 유사함을 나타냅니다.
   - 두 vector가 이루는 각도가 작을수록 의미적으로 유사하다고 판단합니다.


### Vector Space에서의 의미 관계

- embedding vector는 고차원 공간에서 점으로 표현됩니다.
   - 각 단어나 문장은 고차원 공간의 한 좌표로 mapping됩니다.
   - 이 공간에서의 위치가 해당 data의 의미적 특성을 결정합니다.

- 의미가 비슷한 단어들은 vector space에서 **가까운 위치에 cluster를 형성**합니다.
   - "강아지", "고양이", "토끼"는 서로 가까운 곳에 위치합니다.
   - "사과", "바나나", "오렌지"도 또 다른 가까운 곳에 위치합니다.
   - 동일한 category나 domain에 속하는 단어들이 자연스럽게 grouping됩니다.

- **의미적 관계가 geometric relationship으로 표현**되어, 유사도 계산이 가능해집니다.
   - 두 vector 사이의 거리나 각도를 계산해서 얼마나 비슷한 의미인지 측정할 수 있습니다.
   - euclidean distance나 cosine similarity 등의 수학적 metric을 사용합니다.


### Vector 연산을 통한 의미 조작

- embedding의 신기한 점은 **vector 계산으로 의미를 조작**할 수 있다는 것입니다.
   - vector의 덧셈과 뺄셈을 통해 새로운 의미를 만들어낼 수 있습니다.
   - 이는 embedding이 언어의 구조적 특성을 학습했다는 증거입니다.

- 유명한 예시로 **"king - man + woman = queen"**이 있습니다.
   - "왕"에서 "남성" 요소를 빼고 "여성" 요소를 더하면 "여왕"과 비슷한 결과가 나옵니다.
   - 이는 성별이라는 의미적 차원이 vector space에서 하나의 방향으로 표현되고 있음을 보여줍니다.

- 다른 예시로는 **"Paris - France + Italy = Rome"**과 같은 관계도 성립합니다.
   - 수도와 국가의 관계가 vector 연산으로 표현될 수 있습니다.
   - 이는 embedding이 단순히 단어를 외우는 것이 아니라 의미의 구조를 학습했다는 증거입니다.


---


## Embedding의 종류와 활용 분야

- embedding 기술은 **처리하는 data 유형에 따라 다양한 형태**로 발전했습니다.
   - 각 data type마다 고유한 특성을 고려한 specialized embedding 방법이 개발되었습니다.
   - 최근에는 multimodal embedding으로 여러 유형의 data를 하나의 공간에 표현하는 연구도 활발합니다.


### Text Embedding

- **Word2Vec**은 주변 단어의 맥락을 통해 단어의 의미를 학습하는 대표적인 word embedding 기법입니다.
   - CBOW(Continuous Bag of Words)와 Skip-gram 두 가지 architecture를 제공합니다.
   - "distribute semantics" 가설에 기반하여, 비슷한 맥락에서 사용되는 단어는 비슷한 의미를 가진다고 가정합니다.

- **BERT**는 transformer architecture를 기반으로 한 contextual embedding model입니다.
   - 동일한 단어라도 문맥에 따라 다른 vector 값을 가집니다.
   - bidirectional attention을 통해 양방향 문맥 정보를 모두 고려합니다.

- **Sentence-BERT**는 문장 전체의 의미를 하나의 vector로 표현하는 기술입니다.
   - 문장 간 유사도 측정이나 semantic search에 특화되어 있습니다.
   - 기존 BERT보다 inference 속도가 빠르면서도 높은 성능을 유지합니다.


### Image Embedding

- **CNN 기반 embedding**은 convolutional neural network를 통해 image의 visual feature를 추출합니다.
   - ResNet, VGG, EfficientNet 등의 pre-trained model을 feature extractor로 사용합니다.
   - 마지막 fully connected layer 이전의 feature map을 embedding vector로 활용합니다.

- **CLIP(Contrastive Language-Image Pre-training)**은 text와 image를 동일한 embedding space에 mapping하는 multimodal 기술입니다.
   - image와 해당 image를 설명하는 text가 유사한 vector 값을 가지도록 학습합니다.
   - zero-shot image classification이나 image retrieval에 활용됩니다.


### Audio Embedding

- **spectrogram 기반 embedding**은 audio signal을 frequency domain으로 변환하여 처리합니다.
   - MFCC(Mel-Frequency Cepstral Coefficients)나 mel-spectrogram을 input으로 사용합니다.
   - speech recognition, music classification, audio similarity 등에 활용됩니다.

- **Wav2Vec**은 raw audio waveform을 직접 처리하는 self-supervised learning 기법입니다.
   - transformer architecture를 통해 audio의 temporal dependency를 학습합니다.
   - downstream task에 fine-tuning하여 높은 성능을 낼 수 있습니다.


---


## Embedding 생성 과정과 학습 방법

- embedding 생성은 **대량의 unlabeled data를 통한 unsupervised learning**으로 이루어집니다.
   - label이 없는 raw data에서 pattern을 찾아 meaningful representation을 학습합니다.
   - 이를 통해 비교적 적은 비용으로 고품질의 embedding을 얻을 수 있습니다.


### Self-Supervised Learning

- **masking 기법**을 통해 model이 스스로 학습 목표를 생성합니다.
   - BERT의 경우 일부 단어를 [MASK] token으로 가리고, 원래 단어를 예측하도록 학습합니다.
   - 이 과정에서 주변 단어들과의 관계를 파악하여 의미적 representation을 학습합니다.

- **contrastive learning**은 positive pair와 negative pair를 구분하도록 학습하는 방법입니다.
   - 유사한 의미의 data는 가깝게, 다른 의미의 data는 멀게 배치하도록 loss function을 설계합니다.
   - SimCLR, CLIP 등의 model에서 사용되는 핵심 기법입니다.


### Transfer Learning과 Fine-tuning

- **pre-trained embedding model**을 특정 domain이나 task에 맞게 조정하는 과정입니다.
   - 일반적인 corpus로 학습된 embedding을 의료, 법률, 금융 등 specialized domain에 적용할 때 사용합니다.
   - domain-specific vocabulary나 표현을 추가 학습하여 성능을 향상시킵니다.

- **few-shot learning**을 통해 적은 양의 labeled data로도 효과적인 adaptation이 가능합니다.
   - pre-trained embedding의 일반적인 language understanding 능력을 활용합니다.
   - 새로운 domain의 소량 data만으로도 빠르게 학습할 수 있습니다.


---


## Embedding의 실제 활용 사례

- embedding 기술은 **검색, 추천, 분류 등 다양한 AI application의 핵심 component**로 활용됩니다.
   - semantic search, recommendation system, content classification 등에서 필수적인 역할을 담당합니다.
   - 기존의 rule-based system을 대체하여 더 정확하고 유연한 결과를 제공합니다.


### Semantic Search

- **의미 기반 검색**에서 embedding은 query와 document 간의 semantic similarity를 계산합니다.
   - 사용자가 "빠른 운송 수단"을 검색하면 "항공기", "고속 열차" 등의 관련 문서를 찾아줍니다.
   - keyword matching으로는 불가능한 conceptual search가 가능해집니다.

- **multilingual search**에서는 서로 다른 언어의 query와 document를 동일한 embedding space에 mapping합니다.
   - 한국어 query로 영어 문서를 검색하거나, 그 반대의 경우도 가능합니다.
   - cross-lingual embedding을 통해 언어 장벽을 극복할 수 있습니다.


### Recommendation System

- **collaborative filtering**에서 embedding은 user와 item의 latent feature를 학습합니다.
   - 사용자의 과거 행동 pattern과 item의 특성을 vector로 표현하여 preference를 예측합니다.
   - matrix factorization이나 neural collaborative filtering 등의 기법에 활용됩니다.

- **content-based recommendation**에서는 item의 content feature를 embedding으로 표현합니다.
   - 영화의 경우 genre, director, cast 등의 정보를 종합하여 embedding vector를 생성합니다.
   - 사용자가 선호하는 content와 유사한 item을 추천할 수 있습니다.


### Natural Language Processing

- **sentiment analysis**에서 embedding은 text의 감정적 nuance를 capturing합니다.
   - 단순한 positive/negative 분류를 넘어서 세밀한 감정 분석이 가능합니다.
   - 문맥상의 미묘한 의미 차이도 embedding을 통해 구분할 수 있습니다.

- **machine translation**에서는 source language와 target language를 동일한 semantic space에 mapping합니다.
   - encoder-decoder architecture에서 중간 representation으로 embedding을 활용합니다.
   - attention mechanism과 결합하여 더 정확한 번역 결과를 생성합니다.


---


## Embedding의 한계와 개선 방향

- embedding 기술은 강력하지만 **여러 기술적 한계와 개선해야 할 부분**들이 존재합니다.
   - 이러한 한계를 이해하고 적절한 해결책을 적용하는 것이 중요합니다.
   - 지속적인 연구를 통해 더 robust하고 reliable한 embedding 기술이 개발되고 있습니다.


### 차원의 저주 문제

- **고차원 vector space**에서는 모든 점들이 비슷한 거리에 위치하게 되는 현상이 발생합니다.
   - 차원이 증가할수록 data point들 간의 거리 차이가 줄어들어 구분이 어려워집니다.
   - 이로 인해 similarity metric의 신뢰성이 떨어질 수 있습니다.

- **dimensionality reduction** 기법을 통해 중요한 정보는 보존하면서 차원을 줄이는 방법이 사용됩니다.
   - PCA, t-SNE, UMAP 등의 기법으로 고차원 embedding을 저차원으로 projection합니다.
   - 하지만 정보 손실이 불가피하므로 적절한 trade-off를 고려해야 합니다.


### Bias와 Fairness 문제

- **학습 data의 bias가 embedding에 그대로 반영**되는 문제가 있습니다.
   - 성별, 인종, 종교 등에 대한 사회적 편견이 embedding에 encoding될 수 있습니다.
   - 예를 들어 "의사"라는 단어가 남성 관련 단어들과 더 가깝게 위치할 수 있습니다.

- **debiasing 기법**을 통해 embedding에서 불공정한 bias를 제거하려는 연구가 진행됩니다.
   - gender subspace를 찾아서 제거하거나, adversarial training을 통해 bias를 줄이는 방법들이 제안됩니다.
   - 하지만 완전한 debias는 어려우며, 성능과의 trade-off도 고려해야 합니다.


### Out-of-Vocabulary 문제

- **학습 시 보지 못한 새로운 단어나 표현**에 대해서는 적절한 embedding을 생성하기 어렵습니다.
   - 신조어, 전문 용어, 오타 등에 대해서는 embedding을 생성할 수 없습니다.
   - 이는 실제 application에서 coverage 문제로 이어집니다.

- **subword tokenization** 기법을 통해 이 문제를 완화할 수 있습니다.
   - BPE(Byte Pair Encoding), SentencePiece 등을 사용하여 단어를 더 작은 unit으로 분해합니다.
   - 이를 통해 unseen word도 subword unit의 조합으로 표현할 수 있습니다.


---


## Reference

- <https://arxiv.org/abs/1301.3781>
- <https://arxiv.org/abs/1810.04805>
- <https://arxiv.org/abs/1908.10084>
- <https://arxiv.org/abs/2103.00020>
- <https://www.tensorflow.org/tutorials/text/word_embeddings>
- <https://huggingface.co/blog/sentence-transformers>

