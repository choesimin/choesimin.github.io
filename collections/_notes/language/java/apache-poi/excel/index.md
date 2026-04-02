---
layout: note
permalink: /429
title: Apache POI Excel
description: Apache POI의 Excel 처리 기능은 Workbook, Sheet, Row, Cell 계층 구조를 기반으로 `.xlsx` file을 생성하고, header/data row 작성, column 너비 조정, cell formatting과 style 적용까지 수행합니다.
date: 2026-04-02
---


## Apache POI Excel

- Apache POI는 Excel file을 생성하고 download하는 기능을 web application에서 구현하는 데 적합합니다.
    - POI library는 `.xls` format과 `.xlsx` format을 모두 지원합니다.

| 주요 Class/Interface | 설명 |
| --- | --- |
| **Workbook** | Excel file 전체를 나타내는 최상위 interface |
| **XSSFWorkbook** | `.xlsx` format의 Excel file을 처리하는 class |
| **HSSFWorkbook** | `.xls` format의 Excel file을 처리하는 class |
| **Sheet** | Excel file 내의 개별 worksheet |
| **Row** | worksheet 내의 행 |
| **Cell** | worksheet 내의 개별 cell |


---


## 기본적인 사용 방법

- Apache POI는 Maven이나 Gradle을 통해 dependency를 추가하여 사용합니다.
    - 의존성을 추가한 후, `XSSFWorkbook`을 사용하여 Excel file을 생성하고, `Sheet`, `Row`, `Cell`을 사용하여 data를 삽입합니다.


### Dependency 추가

- Maven project에서는 `pom.xml`에 Apache POI dependency를 추가합니다.

```xml
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi</artifactId>
    <version>5.2.4</version>
</dependency>
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi-ooxml</artifactId>
    <version>5.2.4</version>
</dependency>
```

- Gradle project에서는 `build.gradle`에 dependency를 추가합니다.

```gradle
implementation 'org.apache.poi:poi:5.2.4'
implementation 'org.apache.poi:poi-ooxml:5.2.4'
```


### Workbook 생성

- `XSSFWorkbook`을 사용하여 새로운 Excel file을 생성합니다.

```java
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ExcelGenerator {
    public Workbook createExcelFile() {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("data 시트");
        
        return workbook;
    }
}
```


### Header Row 생성

- 첫 번째 row에 column header를 생성합니다.
    - cell style을 적용하여 header를 시각적으로 구분합니다.

```java
private void createHeaderRow(Sheet sheet, String[] headers) {
    Row headerRow = sheet.createRow(0);
    
    CellStyle headerStyle = sheet.getWorkbook().createCellStyle();
    Font headerFont = sheet.getWorkbook().createFont();
    headerFont.setBold(true);
    headerStyle.setFont(headerFont);
    
    for (int i = 0; i < headers.length; i++) {
        Cell cell = headerRow.createCell(i);
        cell.setCellValue(headers[i]);
        cell.setCellStyle(headerStyle);
    }
}
```


### Data Row 생성

- header row 다음부터 실제 data를 삽입합니다.
    - 다양한 data type에 따라 적절한 method를 사용합니다.

```java
private void createDataRows(Sheet sheet, List<DataObject> dataList) {
    int rowNum = 1; // header row 다음부터 시작
    
    for (DataObject data : dataList) {
        Row row = sheet.createRow(rowNum++);
        
        row.createCell(0).setCellValue(data.getName());
        row.createCell(1).setCellValue(data.getAge());
        row.createCell(2).setCellValue(data.getEmail());
        row.createCell(3).setCellValue(data.getCreatedDate());
    }
}

class DataObject {
    private String name;
    private int age;
    private String email;
    private Date createdDate;

    // getters and setters
}
```


### Column 너비 자동 조정

- `autoSizeColumn()`으로 data 길이에 맞게 column 너비를 자동으로 조정합니다.

```java
private void autoSizeColumns(Sheet sheet, int columnCount) {
    for (int i = 0; i < columnCount; i++) {
        sheet.autoSizeColumn(i);
    }
}
```


---


## Cell Formatting 및 Style 적용

- `CellStyle`과 `DataFormat`을 사용하여 숫자, 날짜 format과 color, border 등의 시각적 style을 cell 단위로 지정합니다.


### 숫자 Format 적용

- 숫자 data에 천 단위 구분자나 소수점 format을 적용합니다.

```java
private void applyCellFormat(Workbook workbook, Cell cell, double value) {
    CellStyle numberStyle = workbook.createCellStyle();
    DataFormat format = workbook.createDataFormat();
    numberStyle.setDataFormat(format.getFormat("#,##0.00"));
    
    cell.setCellValue(value);
    cell.setCellStyle(numberStyle);
}
```


### 날짜 Format 적용

- 날짜 data에 원하는 format을 적용합니다.

```java
private void applyDateFormat(Workbook workbook, Cell cell, Date date) {
    CellStyle dateStyle = workbook.createCellStyle();
    CreationHelper createHelper = workbook.getCreationHelper();
    dateStyle.setDataFormat(createHelper.createDataFormat().getFormat("yyyy-mm-dd"));
    
    cell.setCellValue(date);
    cell.setCellStyle(dateStyle);
}
```


### Cell Color 및 Border 적용

- cell background color와 border를 설정합니다.

```java
private CellStyle createStyledCell(Workbook workbook) {
    CellStyle style = workbook.createCellStyle();
    
    // background color 설정
    style.setFillForegroundColor(IndexedColors.LIGHT_BLUE.getIndex());
    style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
    
    // border 설정
    style.setBorderTop(BorderStyle.THIN);
    style.setBorderBottom(BorderStyle.THIN);
    style.setBorderLeft(BorderStyle.THIN);
    style.setBorderRight(BorderStyle.THIN);
    
    return style;
}
```


---


## Error 처리 및 최적화

- `Workbook`은 `Closeable`을 구현하므로 반드시 `close()`를 호출해야 하며, `CellStyle`은 매번 생성하지 않고 cache하여 재사용해야 성능이 유지됩니다.


### Exception 처리

- `IOException`, `InvalidFormatException` 등을 catch하고, `finally` block이나 try-with-resources로 `Workbook`을 반드시 닫습니다.

```java
public ResponseEntity<byte[]> safeDownloadExcel() {
    try {
        Workbook workbook = createExcelFile();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        
        workbook.write(outputStream);
        workbook.close();
        
        return createDownloadResponse(outputStream.toByteArray());
        
    } catch (IOException e) {
        logger.error("Excel file 생성 중 오류 발생", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    } catch (Exception e) {
        logger.error("예상치 못한 오류 발생", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
```


### Memory Leak 방지

- `Workbook` resource를 반드시 해제하여 memory leak을 방지합니다.

```java
public void createExcelWithProperResourceManagement() {
    Workbook workbook = null;
    try {
        workbook = new XSSFWorkbook();
        // Excel file 작업 수행
        processExcelFile(workbook);
        
    } catch (IOException e) {
        logger.error("Excel 처리 중 오류", e);
    } finally {
        if (workbook != null) {
            try {
                workbook.close();
            } catch (IOException e) {
                logger.error("Workbook 종료 중 오류", e);
            }
        }
    }
}
```


### 성능 최적화

- `CellStyle`을 매번 생성하지 않고 cache하여 재사용하면 성능이 향상됩니다.

```java
public class OptimizedExcelGenerator {
    private final Map<String, CellStyle> styleCache = new HashMap<>();
    
    private CellStyle getCachedStyle(Workbook workbook, String styleKey) {
        return styleCache.computeIfAbsent(styleKey, key -> createCellStyle(workbook, key));
    }
    
    private CellStyle createCellStyle(Workbook workbook, String styleType) {
        CellStyle style = workbook.createCellStyle();
        
        switch (styleType) {
            case "header":
                Font headerFont = workbook.createFont();
                headerFont.setBold(true);
                style.setFont(headerFont);
                break;
            case "number":
                DataFormat format = workbook.createDataFormat();
                style.setDataFormat(format.getFormat("#,##0"));
                break;
        }
        
        return style;
    }
}
```


---


## Reference

- <https://poi.apache.org/>

