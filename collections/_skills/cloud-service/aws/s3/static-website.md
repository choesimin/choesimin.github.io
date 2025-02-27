---
layout: skill
title: Amazon S3 - S3로 정적 Website 구축하기
date: 2023-08-13
---


- S3를 사용하여 정적 Website를 구축할 수 있습니다.


---


## S3로 정적 Website 만드는 과정


### 1. S3 Bucket 만들기

1. Bucket의 이름을 hosting할 website의 주소와 동일하게 지정합니다.
2. 지역(`Region`)을 설정합니다.
    - 접속 지역이 hosting 지역과 멀면, Website의 loading이 오래 걸립니다.
    - S3를 CloudFront에 등록하여, CDN 방식으로 loading 속도를 개선할 수 있습니다.
3. 객체 소유권(`Object Ownership`) 설정에서 ACL을 활성화(`ACLs enabled`)합니다.
4. 접근 제어(`Block all public access`) option을 비활성화합니다.
5. Bucket을 생성합니다.


### 2. Bucket에 `index.html` Upload하기

1. upload할 file을 선택합니다.
2. upload할 file의 권한(`Permissions`)을 공개 권한으로 설정합니다.
    1. `Access control list (ACL)`를 `Choose from predefined ACLs`로 설정합니다.
    2. `Predefined ACLs`을 `Grant public-read access`로 설정합니다.
3. upload합니다.


### 3. 정적 Website Hosting(`Static website hosting`) 설정하기

- `Bucket detail` > `Properties` > `Static website hosting` 항목을 편집(`Edit`)합니다.

1. Index 문서(`Index document`)를 `index.html`로 지정합니다.
2. (Optional) 오류 문서(`Error document`)를 지정합니다.
    - 예를 들어, 404 Not Found page.
3. 편집을 완료합니다.
4. `Bucket website endpoint` url로 website hosting이 잘 되고 있는지 확인할 수 있습니다.
    - 이 url은 S3의 주소이기 때문에 website 주소로 적합하지 않습니다.
    - 따라서 다음 단계에서 Route 53에서 이 주소를 domain 주소에 연결합니다.


### 4. Domain 주소 연결하기

- Route 53 의 `Hosting Zone`에서 Record를 생성(`Create Record`)합니다.

1. 유형(`Record Type`)을 `A`로 지정합니다.
2. 별칭(`Alias`) option을 활성화합니다.
3. Traffic Routing 대상(`Route traffic to`)을 설정합니다.
    1. `Alias to S3 website endpoint`를 선택합니다.
    2. 생성한 Bucket이 있는 지역(region)을 선택합니다.
    3. S3 Bucket 주소를 선택합니다.


---


## Reference

- AWS Cloud 핵심 Service 활용 및 ECS EKS 개발 환경 구축 (강의) - 이한기
