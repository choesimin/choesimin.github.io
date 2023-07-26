---
layout: note
title: Amazon EBS - EC2 Instance의 용량 관리하기
date: 2023-07-23
---




## EBS : Elastic Block Store

- EBS는 block 수준의 storage volume을 제공합니다.
    - EC2 Instance의 가동을 중지하지 않고 Instance의 storage volume을 늘리거나 줄일 수 있습니다.
    - volumne이 block으로 나눠져 있기 때문에, 장난감 Lego를 조립하듯이 사용하는 것이 가능합니다.

- EBS의 Volume은 persistant(영구적인) volume입니다.
    - EC2 Instance와 EBS의 Volume은 따로 떨어져 있기 때문에 Instance가 지워져도 Volume은 지워지지 않습니다.
    - EC2 설정에서 Instance를 지울 때 Volumn을 같이 지울지, 지우지 않을지 결정할 수 있습니다.

- Instance와 Volume은 network로 통신합니다.
    - Instance에 Volume을 붙이려면 반드시 같은 가용 영역에 있어야 합니다.

- EC2 Instance에 대한 EBS Volume은 root volume과 additional volume으로 구성됩니다.
    - root volume : Instance의 OS(AMI)와 application을 위한 volume입니다.
    - additional volume : 추가 공간을 확보하기 위한 추가 volume입니다.




---




# Reference

- AWS Cloud 핵심 Service 활용 및 ECS EKS 개발 환경 구축 (강의) - 이한기
