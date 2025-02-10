---
layout: skill
title: Grafana - JSON Model로 Dashbaord 그리기
date: 2025-02-10
---




## Grafana Dashboard JSON Model

- Grafana dashboard는 JSON object로 표현되며, dashboard의 metadata를 저장합니다.
    - metadata에는 dashboard의 속성, panel의 metadata, template 변수, panel의 query 등이 포함됩니다.

- dashboard의 JSON model을 이해하면, dashboard를 code로 관리하거나 dashboard template을 만들 수 있습니다.

- JSON model은 dashboard setting menu에서 확인할 수 있습니다.


### JSON Model 설정 항목

- JSON model에는 `title`, `timezone`, `refresh`, `time`, `panels` 등의 속성이 포함됩니다.
    - 이 외에도 `templating`, `annotations`, `links`, `schemaVersion` 등의 속성이 있지만, 간단한 dashboard를 만들 때는 사용하지 않습니다.

| 항목 | 설명 | 값 |
| --- | --- | --- |
| `title` | dashboard 제목 | string |
| `timezone` | 시간대 설정 | `browser`, `utc`, `local` |
| `refresh` | auto-refresh 간격 | `5s`, `10s`, `1m`, `5m`, `10m`, `30m`, `1h`, `2h`, `6h`, `12h`, `24h`, ... |
| `time` | data 조회 기간 | `{"from": "now-1h", "to": "now"}` |
| `panels` | 시각화 구성 요소 | panel array |

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




---




## Dashboard Panel 작성 문법

- panel은 dashboard에 표시되는 시각화 구성 요소입니다.
    - panel은 `panels` 속성에 배열로 저장됩니다.

- `type`, `title`, `datasource`, `targets` 등의 속성을 가집니다.
    - panel의 위치와 크기를 설정하는 `gridPos` 속성은 직접 입력하기 보다, dashboard에서 panel을 이동하고 크기를 조정한 후 JSON model을 확인하는 것이 좋습니다.



- `type`은 panel의 종류입니다.
- `title`은 panel의 제목입니다.
- `datasource`는 panel에서 사용할 data source입니다.
- `targets`는 panel의 query입니다.

```json
{
    "type": "graph",
    "title": "Panel Title",
    "datasource": "Prometheus",
    "targets": [
        {
            "expr": "up"
        }
    ]
}
```

- panel의 종류에 따라 속성이 다르며, panel의 종류에 따라 속성을 추가하거나 변경해야 합니다.
    - `graph`, `table`, `text`, `singlestat`, `gauge`, `heatmap`, `alertlist`, `stat`, `logs`, `dashboardlist`, `news`, `clock`, `welcome`, `row`, `column` 등의 panel이 있습니다.





---




## Reference

- <https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/view-dashboard-json-model>
