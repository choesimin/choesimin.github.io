---
layout: note
permalink: /
title: CSS의 크기 단위 - px, em, rem
description: 
date: 
published: false
---


## CSS Size Unit

- **반응형 web design에서 크기 단위 선택이 layout의 유연성을 결정합니다.**
    - 고정된 크기가 필요한 경우 px를 사용합니다.
    - 상황에 따라 유동적인 크기가 필요한 경우 em이나 rem을 사용합니다.
    - 상대적 크기 단위를 활용하면 다양한 device와 사용자 환경에 적응하는 web page를 구현합니다.


---


## 절대 단위와 상대 단위

### 절대 단위
- **px는 화면에서 고정된 물리적 크기를 나타내는 절대 단위입니다.**
    - 1px는 어떤 상황에서도 동일한 크기를 유지합니다.
    - 사용자가 browser 설정에서 font size를 변경해도 개발자가 지정한 px값은 변경되지 않습니다.
    - 인쇄물과 같이 크기가 고정되어야 하는 매체에 적합합니다.
    - web에서는 content의 유연성을 저하시킬 수 있습니다.

### 상대 단위
- **상대 단위는 특정 기준값에 따라 크기가 유동적으로 변하는 단위입니다.**
    - em, rem, %, vw, vh 등이 대표적인 상대 단위입니다.
    - device나 사용자 환경에 따라 content 크기가 적응적으로 변합니다.
    - 반응형 design에서 필수적으로 활용되는 단위입니다.

## px 단위의 특성

- **px는 사용자 접근성 측면에서 제한사항이 있습니다.**
    - browser 기본 font size는 일반적으로 16px로 설정됩니다.
    - 개발자가 font size를 px로 고정하면 사용자의 browser font size 설정을 무시합니다.
    - 시각 장애가 있는 사용자가 font size를 크게 설정해도 적용되지 않는 문제가 발생합니다.
    - 사용자 설정값을 덮어쓰는 특성이 있어 접근성을 저해합니다.

## em 단위의 작동 원리

- **em은 해당 요소의 font size를 기준으로 계산되는 상대 단위입니다.**
    - 현재 요소에 font size가 설정되지 않은 경우 부모 요소의 font size를 기준으로 합니다.
    - 중첩된 구조에서는 각 단계별로 계산이 누적됩니다.
    - 복잡한 중첩 구조에서는 실제 px값을 예측하기 어려워집니다.

### em 계산 예시
- **중첩된 요소에서 em값은 단계별로 누적 계산됩니다.**
    ```css
    .container {  /* 14px */
        font-size: 14px;
    }
    .title {  /* 14px × 2 = 28px */
        font-size: 2em;
    }
    .subtitle {  /* 14px × 1.5 = 21px */
        font-size: 1.5em;
    }
    .leading {  /* 21px × 0.5 = 10.5px */
        font-size: 0.5em;
        width: 0.3em;  /* 10.5px × 0.3 = 3.15px */
        height: 0.4em;  /* 10.5px × 0.4 = 4.2px */
    }
    ```
    - leading 요소는 subtitle 안에 중첩되어 있어 21px을 기준으로 계산됩니다.
    - width와 height도 해당 요소의 font size인 10.5px을 기준으로 계산됩니다.

## rem 단위의 작동 원리

- **rem은 root 요소인 html의 font size를 기준으로 계산되는 상대 단위입니다.**
    - root의 r을 따서 rem이라고 명명되었습니다.
    - html 요소에 font size가 설정되지 않은 경우 browser 기본값인 16px을 사용합니다.
    - 중첩 구조와 관계없이 항상 html의 font size만을 기준으로 계산됩니다.
    - 일관성 있는 크기 계산이 가능하여 예측 가능한 layout을 구현합니다.

### rem 계산 예시
- **rem은 중첩 구조와 무관하게 html font size만을 기준으로 계산됩니다.**
    ```css
    html {  /* root 기준값 */
        font-size: 14px;
    }
    .title {  /* 14px × 2 = 28px */
        font-size: 2rem;
    }
    .subtitle {  /* 14px × 1.5 = 21px */
        font-size: 1.5rem;
    }
    .leading {  /* 14px × 0.5 = 7px */
        font-size: 0.5rem;
        width: 0.3rem;  /* 14px × 0.3 = 4.2px */
        height: 0.4rem;  /* 14px × 0.4 = 5.6px */
    }
    ```
    - 모든 rem값은 html의 14px만을 기준으로 계산됩니다.
    - 중첩 단계와 관계없이 동일한 rem값은 항상 같은 px값을 가집니다.

## 단위 선택 지침

### rem 우선 사용 권장
- **대부분의 CSS 가이드에서는 rem을 우선적으로 사용할 것을 권장합니다.**
    - em은 중첩 구조에서 계산이 복잡해져 유지보수가 어려워집니다.
    - rem는 일관된 기준으로 계산되어 component 재사용성이 높습니다.
    - 예측 가능한 크기 계산으로 개발 효율성이 향상됩니다.
    - debugging과 수정 작업이 용이합니다.

### 상황별 적절한 단위 선택
- **각 단위의 특성에 맞는 용도로 활용하면 효과적인 styling이 가능합니다.**
    - **font size** : rem을 사용하여 전체적으로 일관된 typography를 구현합니다.
    - **padding과 margin** : em을 사용하여 해당 요소의 font size에 비례하는 간격을 설정합니다.
    - **고정 크기가 필요한 요소** : px를 사용하여 정확한 크기를 지정합니다.
    - **부모 요소에 따라 변해야 하는 요소** : em을 사용하여 상대적 크기를 구현합니다.

### 혼용 전략
- **project 특성에 따라 단위를 적절히 혼용하여 최적의 user experience를 제공합니다.**
    - 전체 page의 일관성이 중요한 경우 rem을 주로 사용합니다.
    - component 내부의 요소 간 비례 관계가 중요한 경우 em을 활용합니다.
    - 정밀한 pixel 단위 제어가 필요한 border나 shadow에는 px를 사용합니다.
    - 접근성을 고려하여 사용자 설정을 존중하는 상대 단위를 우선 고려합니다.