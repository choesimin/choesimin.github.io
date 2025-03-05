---
layout: skill
permalink: /18
title: MySQL View - 가상 Table을 만들어 명령문에 연결하기
description: MySQL에서 View는 가상 table로, data를 실제로 저장하지 않고 보여주는데 중점을 둔 기능입니다.
date: 2023-08-04
---


## MySQL View : Data를 실제로 저장하지 않고 보여주는 기능

- View는 MySQL 5.0부터 사용 가능한 특정 명령문에 연결되는 가상 table이며, data를 실제로 저장하지 않고 오직 보여주는데 중점을 둔 기능입니다.
    - SELECT, WEHRE, SubQuery, UNION, JOIN 등 다양한 결합과 조건으로 만들어진 data를 View에 넣어, 편리하고 빠르게 data에 접근하도록 할 수 있습니다.

- View의 기반 table의 data를 수정하면, View에도 반영됩니다.
    - 반대로 View의 data를 수정하면, 기반 table의 data도 같이 바뀝니다.

- View로 생성된 가상 table에도 data의 UPDATE 및 INSERT가 가능합니다.
    - 예외적으로, JOIN, UNION, SubQuery 등으로 만들어진 View는 data를 조작할 수 없습니다.


