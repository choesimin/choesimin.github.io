---
layout: note
permalink: /22
title: Repeater - 신호를 증폭시키는 장비
description: 중계기는 전기 신호를 증폭하여 전송 거리를 연장하는 network 장비로, network의 성능을 유지하는 데 중요한 역할을 합니다.
date: 2024-09-30
---


## Repeater : 신호를 증폭하여 전송 거리 연장하기

- **Repeater(중계기, 中繼器)**는 **전기 신호를 정형(일그러진 전기 신호를 복원)하고 증폭하는 기능을 가진 network 중계 장비**입니다.
    - digital 방식의 통신 선로에서 신호를 전송할 때, 전송하는 거리가 멀어지면 신호가 감쇠(attenuation)하는 성질이 있습니다.
    - repeater는 이 감쇠를 보상하여 신호를 증폭시키고, 또는 새롭게 재생하여 전송 거리를 연장시켜주는 신호 중계 장치입니다.

- repeater는 실제 물리 신호와 전송되는 data를 해석하려고 시도하지는 않으므로 **OSI 모델의 첫 번째 계층(Layer 1)인 물리 계층(Physical Layer)에서 동작**합니다.
    - 수신된 전기 신호 또는 광신호를 감지한 후, 이를 **단순히 증폭하여 다시 전송**함으로써 신호가 더 먼 거리까지 전파될 수 있도록 합니다.

- repeater는 **장거리 통신이 필요한 경우에 유용**합니다.
    - 예를 들어, 대형 건물이나 주택에서 WiFi 등의 무선 LAN 신호가 닿지 않는 곳이 있을 때, repeater를 설치하여 신호를 증폭시키고, 모든 공간에서 안정적으로 network에 접속할 수 있도록 할 수 있습니다.

- **현대의 대부분의 network 장비는 repeater 기능을 기본적으로 지원**하기에, 일반적인 상황에서 따로 repeater를 사용할 필요는 거의 없습니다.

```mermaid
flowchart LR

A[송신기] -->|신호 전송| B[Cable]
B -->|감쇠된 신호| C[Repeater]
C -->|증폭된 신호| D[Cable]
D --> E[수신기]
```


### Repeater의 역할과 기능

- **신호 증폭** : 전송 과정에서 약해진 신호를 원래의 강도로 재생하여 data가 손실 없이 전달되도록 합니다.
- **신호 재생성** : 손상된 신호를 재생성하여 깨끗한 신호로 복원합니다.
- **전송 거리 연장** : 기존 cable의 한계를 넘어 더 넓은 지역에 network를 확장할 수 있게 합니다.


### Repeater의 장점

- **비용 효율성** : 단순한 구조로 인해 비교적 저렴하게 구매 및 설치할 수 있습니다.
- **설치 용이성** : 설정이 필요 없으며, 전원만 연결하면 바로 사용할 수 있습니다.
- **호환성** : 다양한 종류의 network cable과 호환됩니다.


### Repeater의 단점

- **Network 성능 저하** : 신호를 단순히 증폭하기 때문에, network 내에 repeater가 많이 사용되면 지연(latency)이 증가할 수 있습니다.
- **충돌 발생 가능성** : 동일한 network segment 내에서 다수의 repeater를 사용할 경우, data 충돌이 발생할 수 있습니다.
- **부가 기능 부족** : data filtering이나 관리 기능이 없어 network 관리가 어렵습니다.


### Repeater 설치 시 고려사항

- **전원 공급** : repeater는 전원이 필요하므로, 설치 위치에 전원 consent(power outlet)가 있는지 확인해야 합니다.
- **신호 품질 확인** : repeater를 통해 증폭할 신호가 이미 적절한 품질을 유지하고 있는지 확인해야 합니다.
- **최적의 배치** : 신호 감쇠가 시작되기 전에 repeater를 설치하여 최적의 신호 증폭 환경을 만들어야 합니다.


---


## Reference

- <https://ko.wikipedia.org/wiki/중계기>
- <https://blog.naver.com/emulticom/221277758544>
