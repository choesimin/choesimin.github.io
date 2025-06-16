---
published: false
---









## 대용량 Data 처리하기

- 대용량 data를 처리할 때는 memory 사용량을 최적화하는 방법이 필요합니다.


### SXSSFWorkbook 사용

- memory 효율성을 위해 대용량 data 처리 시 `SXSSFWorkbook`을 사용합니다.
- `SXSSFWorkbook`은 streaming 방식으로 Excel file을 생성하여 memory 사용량을 줄입니다.

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


### batch 처리 구현

- database에서 data를 batch 단위로 조회하여 memory 사용량을 최적화합니다.

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


