---
layout: skill
title: AWS AutoScaling - 부하에 따라 Instance 갯수를 자동으로 조정하기
date: 2023-07-30
---




- AWS의 AutoScaling service는 수평적 확장과 축소를 통해 application의 부하(load)를 처리할 수 있는 정확한 수의 instance를 보유하도록 보장합니다.
    - CloudWatch가 현재 상황을 지표와 비교하여, Instance의 갯수를 자동으로 조정합니다.

| Scale Out/In | Scale Up/Down |
| --- | --- |
| 수평적인 확장과 축소입니다. server의 수를 조정합니다. | 수직적인 확장과 축소입니다. server의 성능을 조정합니다. |




## AutoScaling 설정하는 방법


### 1. EC2 Instance의 Image 만들기

- application을 담고 있는 EC2 Instance의 Image를 만듭니다.
- 수평적 확장(scale out)은 기준이 되는 Instance를 복제하고, 복제 Instance를 만들어 기동하는 방식으로 이루어집니다.
    - 따라서 기준 Instance의 Image는 기동될 때 application이 즉시 실행될 수 있는 상태여야 합니다.

- Instanece의 Image를 만들면, AMI와 snapshot이 나옵니다.
    - application은 snapshot에 들어있으며, AMI는 이 snapshot을 활용하기 위한 도구입니다.


### 2. Launch Template(시작 Template) 만들기

- Launch Template은 EC2 Instance를 쉽게 만들 수 있도록 미리 환경을 설정해두는 것입니다.
    - 그래서 Template을 만드는 과정은 EC2 Instance를 만드는 과정과 유사함

1. Auto Scaling guidance(지침)을 사용하도록 설정합니다.
2. 생성해 둔 AMI를 선택합니다.
3. Instance 유형을 설정합니다.
4. Key pair를 설정합니다.
5. Network 설정은 그냥 넘어갑니다.
    - 이후에 Auto Scaling Group을 생성하면서 설정할 것이기 때문입니다.


### 3. Auto Scaling Group 만들기

- Auto Scaling Group을 만들면 EC2 Instance가 Desired capacity 설정만큼 만들어집니다.

1. 이름을 입력합니다.
2. Launch Template 선택합니다.
3. VPC와 Subnet을 선택합니다.
    - 후에 scale out할 때 가용 영역을 번걸아가며 골고루 만듭니다.
    - scale in할 때는 Instance가 무작위로 지워지지만, 가용 영역을 번갈아가며 지웁니다.
4. Load Balancer 사용 여부를 선택합니다.
    - Auto Scaling과 ELB를 함께 사용하는 것이 훨씬 더 안정적이기 때문에 Load balancer의 사용을 권장합니다.
    - 아래는 새로운 Load balancer 생성할 때의 설정 예시입니다.
        - Load balancer type : ALB
        - Load balancer scheme : Internet-facing
        - Availability Zones and subnets : 모두 선택
        - Listeners and routing
            - Protocol : HTTP
            - Port : 80
            - Target group : 새로 생성
5. Health check grace period (상태 확인 유예 기간) 설정합니다.
    - 상태가 정상이어야 새로운 Instance에 요청을 전달합니다.
    - 생성하고 기동될 때까지 시간이 걸리기 때문에, 기동이 완료될 때까지는 상태 검사를 하지 않습니다.
    - 유예 기간이 너무 짧으면 기동하기 전에 상태 검사를 하여 오류로 판단할 가능성이 있습니다.
    - 유예 기간이 너무 길면 Instance가 확장될 때까지의 시간이 필요 이상으로 오래 걸릴 수 있습니다.
6. Desired capacity(원하는 용량), Minimum capacity(최소 용량), Maximum capacity(최대 용량)을 설정합니다.
    - 운영 상황에 적합하게 설정합니다.
7. Scaling 정책(policy)을 선택합니다.
    - 정책은 나중에 CloudWatch에서 설정하기 때문에 일반적으로 Auto Scaling Group을 생성할 때는 '없음'으로 선택합니다.
    - Target tracking scaling policy (대상 추적 크기 조정 정책)을 선택하면 하나의 지표만을 가지고 확장과 축소를 합니다.
        - 예를 들어, CPU 사용량이 50% 이상이면 확장, 50% 이하면 축소.
8. Instance scale-in protection(축소 보호) 여부를 선택합니다.
    - 확장(scale out)하면 다시 축소(scale in)하지 않도록 하는 설정입니다.
9. (Optional) 알림을 추가합니다.
    - 확장과 축소의 trigger event에 대한 알림을 설정할 수 있습니다.


### 4. Load balancer 접속 주소 설정하기

1. (Optional) Load balancer의 Listener 규칙에서 HTTPS를 추가하고, 인증서를 선택합니다.
2. Route 53에서 domain 주소를 Load balancer를 연결합니다.


### 5. Auto Scaling Group의 동적 크기 조정 정책(Dynamic scaling policy) 만들기

- 일반적으로 확장과 축소에 대한 두가지 정책을 설정합니다.

1. 정책 유형을 Simple scaling(단순 크기 조정)으로 설정합니다.
2. 정책 이름을 설정합니다.
3. CloudWatch 경보(alarm)를 생성합니다.
    1. 지표(metric)를 선택합니다.
        - 예를 들어, EC2 > By Auto Scaling Group > CPUUtilization.
    2. 측정 대상 값(CPU 사용량)의 평균을 계산하는 주기(period)를 설정합니다.
        - 주기가 짧을수록 더 정확하지만 더 비쌉니다.
    3. 조건을 선택합니다.
        - 예를 들어, CPU 사용량이 70% 이상.
    4. email notification을 설정합니다.
        - 지표를 넘었을 때 email로 알려줍니다.
    5. 경보의 이름을 입력합니다.
4. 조정 정책에 생성한 CloudWatch 경보를 지정합니다.
5. 경보 발생에 대한 작업(action)을 지정합니다.
    - Auto Scaling이 연속으로 되지 않도록 대기 시간을 함께 지정합니다.
        - 기본 값이 300초인데, 운영 환경에서는 일반적으로 더 짧게 설정합니다.


### 6. (Optional) 부하를 주어 Auto Scaling이 잘 작동하는지 확인하기

- 어떤 지표를 주었는지에 따라 test 방법이 다릅니다.

#### CPU 사용률이 지표인 경우

1. Auto Scaling Group이 생성한 Instance에 접속합니다.
2. `top` 명령어로 CPU 사용량을 확인합니다.
    - `top`는 `q`로 종료할 수 있습니다.
3. `yes > /dev/null &` 명령어로 scale out test를 진행합니다.
    - 불필요한 작업을 반복적으로 수행하여 CPU 사용률을 올립니다.
4. `pkill -9 yes` 명령어를 수행하고 Enter key를 입력하여 scale in test를 진행합니다.
    - 불필요한 작업을 종료하여 CPU 사용률을 줄입니다.
5. 확장/축소 시에 notification mail이 잘 오는지 확인합니다.
6. CloudWatch Dashboard에서 경보를 확인합니다.




---




## Reference

- AWS Cloud 핵심 Service 활용 및 ECS EKS 개발 환경 구축 (강의) - 이한기
