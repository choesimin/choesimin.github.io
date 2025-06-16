---
layout: note
permalink: /
title: Apache POI - Java에서 Excel file download하기
description: 
date: 2025-06-16
published: false
---


## Apache POI

- Apache POI는 Microsoft Office 문서를 Java program에서 읽고 쓸 수 있게 해주는 open source library입니다.
- Excel file을 생성하고 download하는 기능을 web application에서 구현할 수 있습니다.
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

- Apache POI는 Maven이나 Gradle을 통해 dependency를 추가하여 사용할 수 있습니다.
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
- cell style을 적용하여 header를 시각적으로 구분할 수 있습니다.

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

class  DataObject {
    private String name;
    private int age;
    private String email;
    private Date createdDate;

    // getters and setters
}
```


### Column 너비 자동 조정

- data 길이에 맞게 column 너비를 자동으로 조정합니다.

```java
private void autoSizeColumns(Sheet sheet, int columnCount) {
    for (int i = 0; i < columnCount; i++) {
        sheet.autoSizeColumn(i);
    }
}
```


---


## Cell Formatting 및 Style 적용

-  Excel file에서 cell에 다양한 formatting과 style을 적용할 수 있습니다.


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

- Excel file을 생성하는 기능을 구현하는 것 외에도, 예외 처리 및 성능 최적화를 고려해야 합니다.


### Exception 처리

- Excel file 생성 과정에서 발생할 수 있는 exception을 적절히 처리합니다.

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

- cell style 재사용을 통해 성능를 향상시킵니다.

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
