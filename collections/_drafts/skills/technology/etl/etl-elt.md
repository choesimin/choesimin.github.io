---
layout: skill
title: ETL과 ELT의 차이
date: 2024-12-21
---









ETL, ELT 용어를 보신 적이 있나요?
마케팅 솔루션의 소개서나 데이터 관련 서비스 제공하는 웹사이트에서 ETL, ELT 용어가 심심찮게 등장하는데요,
마케팅 데이터 전문기업인 비즈스프링의 Tech Stack에서도 ETL, ELT 가 등장하는 것을 확인하실 수 있습니다.

쉽게 말해 데이터를 다루는 방법을 의미하는데요.
ETL과 ELT의 구체적인 의미와 장단점, 차이점에 대해 알아보고,
기업에서 사용할 데이터 통합 방법을 결정하는 데 도움되는 사례들을 살펴 보도록 하겠습니다.

  목차

1. ETL 이란?
2. ELT 이란?
3. ETL vs ELT 12가지 차이점
4. ETL 에서 ELT 로 흐름이 변화된 배경
5. 사용사례 살펴보기

1. ETL 이란?

ETL은 조직이 다양한 소스에서 데이터를 추출하여 단일 데이터베이스로 가져오는 데 도움이 되는 데이터 통합 프로세스로
데이터를 추출(E), 변환(T), 적재(L) 순으로 데이터를 처리하는 프로세스이며, 관계형 SQL 기반 데이터 구조만 허용합니다.

 각 단계별 개념은 아래 설명과 같습니다.

○ Extract(추출) : 원본 데이터베이스 또는 데이터 소스에서 데이터를 가져오는 것을 말한다.
○ Transform(변환): 데이터의 구조를 변경하는 프로세스를 의미한다. 용도에 맞는 필터링, Resahping, 정재 등의 단계를 통해 필요한 형태로 변환한다.
○ Load (적재): 데이터를 스토리지에 저장하는 프로세스를 의미한다 .

▶︎ 장점
① 데이터를 구조화/변환한 후 ETL을 사용하면 보다 빠르고 효율적이며 안정적인 데이터 분석이 가능합니다.
② 관계형 SQL 기반 데이터로 변환하여 GDPR, HIPAA 및 CCPA와 같은 데이터 개인 정보 보호 및 보호 규정을 준수할 수 있습니다.
③ 정교한 데이터 변환을 수행할 수 있습니다.
④ ETL은 20년 이상 사용된 프로세스 입니다.

▶︎ 단점
① 데이터를 변환하여 과정의 시간이 다소 소요되어 데이터 수집 프로세스를 더 느리게 만듭니다.
② ETL 프로세스를 설정하는 초기 비용은 프로젝트에 필요한 프로세스와 변환을 정의해야 할 수 있으므로 높을 수 있습니다.
③ ETL 프로세스를 지속적으로 유지 관리하고, 다른 데이터 유형을 요구할 경우 변경하는 입력 소스를 최신 상태로 유지해야하기 때문에 유지보수가 필요합니다.


2. ELT 란?

ELT는 데이터를 추출(E), 로드(L) 및 변환(T)을 하는 프로세스를 의미하며,
위에 언급한 ETL의 T와 L의 위치가 바뀐 개념으로 생각하시면 됩니다.
데이터 로드 후 변환 하기 때문에 별도의 스테이징 서버가 필요하지 않습니다.

▶︎ 장점
① 클라우드 기반으로 스키마 변경과 같은 작업을 자동화하므로 유지 관리가 최소화됩니다.
② 정형, 비정형, 반정형(semi-structured) 데이터 유형의 모든 데이터 타입을 활용할 수 있다.
③ 클라우드에서 스토리지를 빠르게 확장할 수 있어 대규모의 데이터를 수집 관리할 수 있다.
④ 데이터를 적제 후 변환하기 때문에 데이터 로드 시간이 짧다.

▶︎ 단점
① 데이터 보안은 스토리지에 대량의 원시 데이터를 로드하기 때문에
개인정보보호규정 및 규정준수 규칙에 문제가 될 수 있습니다.
② 모든 데이터를 저장하고 다양한 사용자와 애플리케이션이 액세스할 수 있도록 하면 보안 위험이 따릅니다.
기업은 데이터를 마스킹하고, 암호화 하여 대상 시스템의 보안 조치를 취해야 한다.

3. ETL vs ELT 12가지 차이점

아래 표를 통해 ETL/ ELT의 데이터 통합 접근 방식 간의 주요 차이점을 알아 봅시다.

 ETL	ELT
프로세스	추출, 변환, 적재	추출, 적재, 변환
 자료구조	전처리 된 데이터 / 데이터 웨어 하우스 지원	 원천 데이터 (Raw Data) / 데이터 레이크 지원
 데이터 활용목적	현재 사용 중	미결정 상태
 접근성	변경하기 쉽지 않고 비용도 많이 소요됨.	접근성 높고 신속한 업데이트
사용자	비즈니스 현업 전문가	 데이터 과학자
 제공시기	20년 이상 사용된 잘 개발된 프로세스이며 ETL전문가를 쉽게 사용할 수 있습니다.	 새로운 기술로 ETL 파이프라인에 비해 전문가를 찾기가 어렵습니다.
시스템의 데이터 가용성	 데이터 웨어하우스 및 ETL 프로세스를 생성할 때 필요하다고 결정한 데이터만 변환하고 로드합니다 .	모든 데이터를 즉시 로드할 수 있으며 사용자는 나중에 변환 및 분석할 데이터를 결정할 수 있습니다.
데이터 지원	관계형 SQL 기반 구조	정형, 비정형 등 모든 데이터 유형을 수집
규정 준수	민감한 정보를 데이터 웨어하우스에 넣기 전에 수정하고 제거하기 때문에  GDPR, HIPAA 및 CCPA 규정 준수 표준을 더 쉽게 충족할 수 있습니다. 또한 해킹 및 부주의한 노출로부터 데이터를 보호합니다.	민감한 정보를 수정/제거하기 전에 데이터를 업로드하므로, GDPR, HIPAA 및 CCPA 표준을 위반할 수 있습니다.
데이터 크기	소량의 데이터로 정교한 데이터 변환에 사용	대용량 데이터에 사용
정보 로드 대기 시간	적재 후 데이터 변환에 다소 시간이 걸리며, ELT보다 느립니다. 그러나 데이터가 로드되면 정보 분석이 ELT보다 빠릅니다.	변환을 기다릴 필요가 없고 데이터가 대상 데이터 시스템에 한 번만 로드되기 때문에 데이터를 빠르게 처리 할 수 있습니다. 그러나 정보 분석은 ETL보다 느립니다.
유지보수	 프로세스의 지속적인 유지 관리가 필요하다.	클라우드 기반이며 자동화된 솔루션을 통합하므로 유지 관리가 거의 필요가 없다.
4. ETL에서 ELT로 흐름이 변화된 배경

근래에는 ‘ETL시대는 끝났다’는 이야기도 있는데요,
ETL은 ‘끝났다’고 이야기하는 건지. ETL에서 ELT로 흐름이 변화된 배경은 무엇인지 살펴봅니다.

▶︎ 대량의 데이터 발생

기업형 ETL(DW)는 복잡한 분석, 보고 및 운영을 수행하는데 있어 대부분의 조직에 기본적으로 사용되는 솔루션이었으나,
대용량의 광범위하고 다양한 데이터가 표준이 되는 빅데이터 시대에 데이터를 처리하는데 시간이 오래 걸리는
ETL 프로세는 부적합해졌습니다.

▶︎ 리소스 /유지보수 비용 부담 해소

ELT는 ETL 데이터하우스(DW)에 비해 클라우드 기반의 합리적인 가격으로 데이터 지속성을 생성하는데 효과적이며,
유지보수 비용이 적어 기업은 모든 비정형 데이터를 클라우드에 저장하고 데이터를 유연하게 처리할 수 있게 되었습니다.
기업에서는 데이터 처리 비용 부담 해소로 더 이상 변환 단계에서 데이터를 줄이거나 필터링할 필요가 없어졌으며,
이러한 배경에서 ETL에서 ELT로 흐름이 변화되고 있습니다.

5. 사례 살펴보기

▶︎ ETL 사용 사례

① ETL 프로세스는 대상의 기존 데이터에 맞게 (데이터는 모양, 데이터 형식, 언어, 표준시간대등) 변환하고,
정교한 데이터 변환을 수행합니다. 정밀도를 높일 수 있습니다.
② ETL 프로세스는 새 데이터를 기존 데이터와 결합하여 보고를 최신 상태로 유지하거나
기존 데이터에 대한 추가 인사이트를 제공할 수 있습니다.
③ 보고 도구나 서비스 같은 애플리케이션이 데이터를 원하는 형식으로 사용할 수 있습니다.

▶︎ ELT 사용 사례

① ELT는 구조화된 데이터와 구조화되지 않은 데이터의 방대한 양에서 가장 잘 작동합니다.
대상 시스템이 클라우드 기반인 한 ELT 솔루션을 사용하여 이러한 엄청난 양의 데이터를 더 빠르게 처리할 수 있습니다.
② 필요한 처리 능력을 처리할 수 있는 리소스가 있는 조직입니다.
ETL을 사용하면 대부분의 처리가 데이터가 웨어하우스에 도착하기 전에 파이프라인에 있는 동안 발생합니다.
ELT는 데이터가 이미 데이터 레이크에 도착하면 작업을 수행합니다.
③ 모든 데이터가 한 곳에서 가능한 한 빨리 필요한 회사입니다.
프로세스가 끝날 때 변환이 발생하면 ELT는 거의 모든 것보다 전송 속도를 우선시합니다.
즉, 좋은 데이터든 나쁜 데이터든 모든 데이터가 나중에 변환을 위해 데이터 레이크에 저장됩니다.

ETL 과 ELT는 서로 다른 방식으로 데이터 통합을 제공합니다.
ETL은 데이터 볼륨이 작거나 구조화된 데이터에 가장 적합한 프로세스이며,
수십년 동안 업계에서 사용된 접근 방식으로 데이터의 품질에 중점을 두고 신뢰성이 높은 데이터를 제공합니다.

반면 ELT는 모든 데이터를 저장하고 관리한다는 측면에서 유연성과 확장성을 내재하고 있으며
빅데이터를 분석하여 OLAP에서 추구하는 바를 한단계 더 넓혔다는 점에서 의의를 둘 수 있습니다.

ETL과 ELT 모두 동일한 목적을 수행하지만 구현 방식이 다르다는 점을 인식하는 것이 가장 중요하며,
데이터 통합 작업에 널리 사용되는 ETL과 ELT 두 가지 방식의 장단점을 잘 알면 비즈니스 목표를 달성할 수 있습니다.
감사합니다.














---




## Reference

- <https://blog.bizspring.co.kr/%ED%85%8C%ED%81%AC/etl-vs-elt>