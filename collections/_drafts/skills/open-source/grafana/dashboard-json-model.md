---
layout: skill
title: Grafana - JSON Model로 Dashbaord 그리기
date: 2025-02-10
---




## Grafana Dashboard JSON Model : JSON으로 Dashboard 만들기

- Grafana dashboard는 JSON format으로 정의되며, 모든 설정을 code로 관리할 수 있습니다.

- dashboard의 JSON model은 dashboard setting menu에서 확인할 수 있습니다.


### JSON Model 구조

- JSON model에는 `title`, `timezone`, `refresh`, `time`, `panels` 등의 속성이 포함됩니다.
    - 이 외에도 `tags`, `templating`, `annotations`, `links` 등의 속성이 더 있지만, 간단한 dashboard를 만들 때는 사용하지 않아도 됩니다.

```json
{
    "title": "My Dashboard",
    "timezone": "browser",
    "refresh": "30s",
    "time": {
        "from": "now-6h",
        "to": "now"
    },
    "panels": [
        {
            "type": "text",
            "mode": "markdown",
            "title": "Information",
            "content": "This is a markdown text"
        }
    ]
}
```

| 항목 | 설명 | 값 |
| --- | --- | --- |
| `title` | dashboard 제목 | string |
| `timezone` | 시간대 설정 | `browser`, `utc`, `local` |
| `refresh` | auto-refresh 간격 | `5s`, `10s`, `1m`, `5m`, `10m`, `30m`, `1h`, `2h`, `6h`, `12h`, `24h`, ... |
| `time` | data 조회 범위 | `{"from": "now-1h", "to": "now"}` |
| `panels` | 시각화 구성 요소 | panel structure array |




---




## Panel 작성 문법

- panel은 dashboard에 표시되는 시각화 component입니다.
    - `panels` 속성에 배열로 여러 개가 저장되며, 각 panel은 독립적인 data source, query, visualization 설정을 가집니다.


### Panel의 구조

- panel은 **공통 속성과 `type`에 따라 추가 설정이 필요한 속성**을 가집니다.
    - `id`, `type`, `title`, `description`, `datasource`, `gridPos` 등이 모든 panel type에서 사용되는 공통 속성입니다.

- panel의 크기와 위치를 결정하는 `gridPos` 속성은 UI에서 설정합니다.
    - JSON으로 직접 position을 설정하면 panel이 겹치거나 빈 공간이 생길 수 있습니다.

- `id`는 panel의 고유 식별자로, dashboard에서 panel을 참조할 때 사용합니다.
    - `id`는 panel을 추가하면 자동으로 생성되어, 작성 시 생략 가능합니다.

```json
{
    "panels": [
        {
            "type": "graph",
            "title": "Panel Title",
            "description": "Panel Description",
            "datasource": "Prometheus",
            "targets": [
                {
                    "expr": "up"
                }
            ]
        }
    ]
}
```

| 항목 | 설명 | 값 |
| --- | --- | --- |
| `type` | panel 종류 | `text`, `row`, `graph`, `stat`, `gauge`, `table`, `logs`, ... |
| `title` | panel 제목 | string |
| `description` | panel 설명 | string |
| `datasource` | panel에서 사용할 data source | string |
| `targets` | panel의 query | query structure array |


### Panel의 종류

- panel type은 시각화 목적에 따라 선택합니다.
    - Metric 시각화 : `timeseries`, `stat`, `gauge`.
    - Data 표시 : `table`, `logs`.
    - 분석용 : `heatmap`, `pie chart`, `bar gauge`.




### Query Target Structure

- query 설정은 각 data source의 특성을 고려합니다.
    - Prometheus는 PromQL을, Elasticsearch는 Lucene query를 사용합니다.


### Panel의 종류


**Bar chart**
**Bar gauge**
**Candlestick**
**Canvas**
**Gauge**
**Geomap**
**Histogram**
**Pie chart**
**Stat**
**State timeline**
**Status history**
**Table**
**Time series**
**Trend**
**XY chart**

| Type | 설명 | 사용 |
| --- | --- | --- |
| **timeseries** | 시계열 data 그래프 | metric 추이 분석 |
| **stat** | 단일 수치 표시 | 현재 상태 모니터링 |
| **gauge** | gauge 형태로 수치 표시 | resource 사용량 표시 |
| **table** | data를 table 형태로 표시 | 상세 data 조회 |
| **logs** | log data 표시 | log 분석 |
| **heatmap** | Heat map 형태로 data 표시 | 분포도 분석 |
| **bar gauge** | Bar 형태로 수치 표시 | 비교 분석 |
| **pie chart** | 원형 차트로 data 표시 | 구성 비율 분석 |









### Common Panel Properties

```json
{
    "id": 1,
    "type": "timeseries",
    "title": "Panel Title",
    "description": "Panel Description",
    "datasource": {
        "type": "prometheus",
        "uid": "prometheus"
    },
    "gridPos": {
        "x": 0,
        "y": 0,
        "w": 12,
        "h": 8
    }
}
```

### Query Target Structure

```json
{
    "targets": [
        {
            "datasource": {
                "type": "prometheus",
                "uid": "prometheus"
            },
            "expr": "sum(rate(http_requests_total[5m])) by (status_code)",
            "instant": false,
            "range": true,
            "refId": "A"
        }
    ]
}
```









---




## Reference

- <https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/view-dashboard-json-model>
- <https://grafana.com/docs/grafana/latest/panels-visualizations/configure-standard-options/>
