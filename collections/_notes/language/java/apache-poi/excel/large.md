---
layout: note
permalink: /430
title: Apache POI - 대용량 Excel 처리
description: 대용량 Excel data를 처리할 때는 XSSFWorkbook 대신 SXSSFWorkbook을 사용하여 streaming 방식으로 memory에 일정 row만 유지하고, database에서 batch 단위로 조회하여 memory 사용량을 최적화합니다.
date: 2026-04-02
---


## 대용량 Data 처리의 문제

- 일반적인 `XSSFWorkbook`은 **전체 Excel data를 memory에 load**하기 때문에 대용량 data 처리 시 `OutOfMemoryError`가 발생합니다.
    - 수만~수십만 row를 처리해야 하는 경우 memory 사용량을 최적화하는 전략이 필요합니다.


---


## SXSSFWorkbook 사용

- `SXSSFWorkbook`은 **streaming 방식으로 Excel file을 생성**하여 memory 사용량을 줄입니다.
    - 생성자의 인자로 memory에 유지할 row 수를 지정합니다.
    - 지정한 수를 초과하는 row는 자동으로 disk에 flush됩니다.
    - `XSSFWorkbook`과 동일한 `Workbook` interface를 구현하므로 사용법이 동일합니다.

```java
import org.apache.poi.xssf.streaming.SXSSFWorkbook;

public Workbook createLargeExcelFile(List<DataObject> largeDataList) {
    SXSSFWorkbook workbook = new SXSSFWorkbook(1000); // memory에 1000개 row만 유지
    Sheet sheet = workbook.createSheet("대용량 data");
    
    // header 생성
    createHeaderRow(sheet, new String[]{"이름", "나이", "이메일"});
    
    // data 생성
    int rowNum = 1;
    for (DataObject data : largeDataList) {
        Row row = sheet.createRow(rowNum++);
        row.createCell(0).setCellValue(data.getName());
        row.createCell(1).setCellValue(data.getAge());
        row.createCell(2).setCellValue(data.getEmail());
    }
    
    return workbook;
}
```


### XSSFWorkbook과 SXSSFWorkbook 비교

- 두 class의 핵심적인 차이는 **memory 사용 방식**입니다.

| 특성 | XSSFWorkbook | SXSSFWorkbook |
| --- | --- | --- |
| **memory 사용** | 전체 data를 memory에 load | 지정된 row 수만 memory에 유지 |
| **대용량 처리** | `OutOfMemoryError` 위험 | 안전하게 처리 가능 |
| **기존 row 접근** | 가능 | flush된 row는 접근 불가 |
| **읽기 기능** | 지원 | 쓰기 전용, 읽기 불가 |
| **임시 file** | 불필요 | disk에 임시 file 생성 |


### 임시 File 정리

- `SXSSFWorkbook`은 처리 중 disk에 임시 file을 생성하므로, 작업 완료 후 반드시 `dispose()`를 호출하여 정리합니다.

```java
SXSSFWorkbook workbook = new SXSSFWorkbook(1000);
try {
    // Excel 생성 작업 수행
    processLargeData(workbook);
    
    // file 저장
    FileOutputStream out = new FileOutputStream("large.xlsx");
    workbook.write(out);
    out.close();
} finally {
    workbook.dispose(); // 임시 file 정리
    workbook.close();
}
```


---


## Batch 처리 구현

- database에서 data를 **batch 단위로 조회**하여 memory 사용량을 최적화합니다.
    - 전체 data를 한 번에 조회하지 않고 일정 크기씩 나누어 가져옵니다.
    - batch 조회와 `SXSSFWorkbook`을 결합하면 memory 사용량을 최소화합니다.

```java
public void createExcelWithBatchProcessing(int batchSize) throws IOException {
    SXSSFWorkbook workbook = new SXSSFWorkbook();
    Sheet sheet = workbook.createSheet("배치 data");
    
    createHeaderRow(sheet, headers);
    
    int offset = 0;
    int rowNum = 1;
    List<DataObject> batch;
    
    do {
        batch = dataService.getDataBatch(offset, batchSize);
        
        for (DataObject data : batch) {
            Row row = sheet.createRow(rowNum++);
            populateRow(row, data);
        }
        
        offset += batchSize;
    } while (batch.size() == batchSize);
    
    // file 저장 또는 response 전송
    saveOrDownloadExcel(workbook);
}
```


---


## Reference

- <https://poi.apache.org/components/spreadsheet/how-to.html#sxssf>

