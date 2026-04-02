---
layout: note
permalink: /428
title: Apache POI
description: Apache POI는 Apache Software Foundation이 개발한 Java library로, Microsoft Office file format(Excel, Word, PowerPoint)을 순수 Java로 읽고 쓸 수 있으며, HSSF/XSSF/SXSSF 등 format별 전용 component를 제공합니다.
date: 2026-04-02
---


## Apache POI

- **Apache POI**는 Microsoft Office 문서를 Java program에서 읽고 쓸 수 있게 해주는 open source library입니다.
    - Word, Excel, PowerPoint 등 다양한 Microsoft Office format을 지원합니다.
    - 100% 순수 Java로 구현되어 있어 platform에 관계없이 사용합니다.
    - Apache Software Foundation에서 개발하고 유지 관리합니다.


### 역사 및 배경

- POI project는 1999년에 시작되어 20년 이상의 역사를 가지고 있습니다.
    - 초기에는 Excel file 처리만을 목표로 했지만, 현재는 Microsoft Office 전반을 지원합니다.
- **POI**라는 이름은 "Poor Obfuscation Implementation"의 줄임말로, Microsoft의 복잡한 file format을 해석한다는 의미입니다.


### 지원하는 File Format

- POI가 지원하는 Microsoft Office file format입니다.

| Format | 확장자 |
| --- | --- |
| **Excel** | `.xls` (Excel 97-2003), `.xlsx` (Excel 2007+) |
| **Word** | `.doc` (Word 97-2003), `.docx` (Word 2007+) |
| **PowerPoint** | `.ppt` (PowerPoint 97-2003), `.pptx` (PowerPoint 2007+) |
| **Visio** | `.vsd` (Visio 2003-2010) |
| **Publisher** | `.pub` (Publisher 98+) |
| **Outlook** | `.msg` (Outlook message file) |


---


## POI 구성 요소

- POI는 format별로 전용 component를 분리하여 구성합니다.


### Core Component

- Microsoft Office file을 처리하는 핵심 component입니다.

| Component | 설명 |
| --- | --- |
| **POIFS** (Poor Obfuscation Implementation File System) | Microsoft의 OLE2 compound document format 처리 |
| **HSSF** (Horrible Spreadsheet Format) | Excel 97-2003 format인 `.xls` file 처리 |
| **XSSF** (XML Spreadsheet Format) | Excel 2007+ format인 `.xlsx` file 처리 |
| **SXSSF** (Streaming XML Spreadsheet Format) | 대용량 Excel file을 memory 효율적으로 처리 |


### Document Processing Component

- Word와 PowerPoint 문서를 처리하는 component입니다.

| Component | 설명 |
| --- | --- |
| **HWPF** (Horrible Word Processor Format) | Word 97-2003 format인 `.doc` file 처리 |
| **XWPF** (XML Word Processor Format) | Word 2007+ format인 `.docx` file 처리 |
| **HSLF** (Horrible Slide Layout Format) | PowerPoint 97-2003 format인 `.ppt` file 처리 |
| **XSLF** (XML Slide Layout Format) | PowerPoint 2007+ format인 `.pptx` file 처리 |


### Utility Component

- 공통 기능과 실험적 기능을 포함하는 component입니다.

| Component | 설명 |
| --- | --- |
| **SS** (SpreadSheet) | Excel format 간 공통 interface |
| **Common** | 모든 POI component에서 공통으로 사용하는 utility class |
| **Scratchpad** | 개발 중이거나 실험적인 기능 |


---


## 기본 설정 및 Dependency

- POI를 사용하려면 Maven이나 Gradle로 dependency를 추가합니다.


### Maven Dependency 설정

- 기본 POI core library와 필요한 추가 module을 선택적으로 추가합니다.

```xml
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi</artifactId>
    <version>5.2.4</version>
</dependency>
```


### Gradle Dependency 설정

- `build.gradle`에 dependency를 추가합니다.

```groovy
implementation 'org.apache.poi:poi:5.2.4'
```


---


## Excel 처리 기능

- POI는 `XSSFWorkbook`으로 `.xlsx` file을 생성하고, `WorkbookFactory`로 기존 file을 읽어 `Sheet`, `Row`, `Cell` 단위로 data를 처리합니다.


### Excel File 생성 및 조작

- `XSSFWorkbook`으로 Excel workbook을 생성하고 data를 입력합니다.

```java
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ExcelProcessor {
    public void createExcelFile() throws IOException {
        // 새 workbook 생성
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Data Sheet");
        
        // Header row 생성
        Row headerRow = sheet.createRow(0);
        headerRow.createCell(0).setCellValue("이름");
        headerRow.createCell(1).setCellValue("나이");
        headerRow.createCell(2).setCellValue("부서");
        
        // Data row 생성
        Row dataRow = sheet.createRow(1);
        dataRow.createCell(0).setCellValue("김철수");
        dataRow.createCell(1).setCellValue(30);
        dataRow.createCell(2).setCellValue("개발팀");
        
        // File 저장
        FileOutputStream fileOut = new FileOutputStream("sample.xlsx");
        workbook.write(fileOut);
        fileOut.close();
        workbook.close();
    }
}
```


### Excel File 읽기

- `WorkbookFactory.create()`로 기존 Excel file을 읽어서 data를 추출합니다.

```java
public void readExcelFile(String filePath) throws IOException {
    FileInputStream file = new FileInputStream(filePath);
    Workbook workbook = WorkbookFactory.create(file);
    
    Sheet sheet = workbook.getSheetAt(0);
    
    for (Row row : sheet) {
        for (Cell cell : row) {
            switch (cell.getCellType()) {
                case STRING:
                    System.out.print(cell.getStringCellValue() + "\t");
                    break;
                case NUMERIC:
                    System.out.print(cell.getNumericCellValue() + "\t");
                    break;
                case BOOLEAN:
                    System.out.print(cell.getBooleanCellValue() + "\t");
                    break;
                default:
                    System.out.print("UNKNOWN\t");
            }
        }
        System.out.println();
    }
    
    workbook.close();
    file.close();
}
```


---


## Word 문서 처리 기능

- POI는 `XWPFDocument`를 통해 `.docx` 문서를 생성하고, 단락(`XWPFParagraph`)과 표(`XWPFTable`) 단위로 내용을 읽고 씁니다.


### Word 문서 생성

- `XWPFDocument`로 Word 문서를 생성하고 내용을 추가합니다.

```java
import org.apache.poi.xwpf.usermodel.*;

public class WordProcessor {
    public void createWordDocument() throws IOException {
        XWPFDocument document = new XWPFDocument();
        
        // 제목 추가
        XWPFParagraph titleParagraph = document.createParagraph();
        titleParagraph.setAlignment(ParagraphAlignment.CENTER);
        XWPFRun titleRun = titleParagraph.createRun();
        titleRun.setText("문서 제목");
        titleRun.setBold(true);
        titleRun.setFontSize(18);
        
        // 본문 추가
        XWPFParagraph paragraph = document.createParagraph();
        XWPFRun run = paragraph.createRun();
        run.setText("이것은 Apache POI를 사용하여 생성된 Word 문서입니다.");
        
        // Table 추가
        XWPFTable table = document.createTable(3, 3);
        table.getRow(0).getCell(0).setText("이름");
        table.getRow(0).getCell(1).setText("나이");
        table.getRow(0).getCell(2).setText("부서");
        
        // File 저장
        FileOutputStream out = new FileOutputStream("sample.docx");
        document.write(out);
        out.close();
        document.close();
    }
}
```


### Word 문서 읽기

- `XWPFDocument`로 기존 Word 문서의 단락과 표를 읽어옵니다.

```java
public void readWordDocument(String filePath) throws IOException {
    FileInputStream fis = new FileInputStream(filePath);
    XWPFDocument document = new XWPFDocument(fis);
    
    // 모든 단락 읽기
    List<XWPFParagraph> paragraphs = document.getParagraphs();
    for (XWPFParagraph paragraph : paragraphs) {
        System.out.println(paragraph.getText());
    }
    
    // 모든 표 읽기
    List<XWPFTable> tables = document.getTables();
    for (XWPFTable table : tables) {
        for (XWPFTableRow row : table.getRows()) {
            for (XWPFTableCell cell : row.getTableCells()) {
                System.out.print(cell.getText() + "\t");
            }
            System.out.println();
        }
    }
    
    document.close();
    fis.close();
}
```


---


## PowerPoint 처리 기능

- POI는 `XMLSlideShow`를 통해 `.pptx` file을 생성하고, slide 단위로 text와 shape를 읽고 씁니다.


### PowerPoint 생성

- `XMLSlideShow`로 PowerPoint presentation을 생성하고 slide를 추가합니다.

```java
import org.apache.poi.xslf.usermodel.*;

public class PowerPointProcessor {
    public void createPresentation() throws IOException {
        XMLSlideShow ppt = new XMLSlideShow();
        
        // 첫 번째 슬라이드 추가
        XSLFSlide slide1 = ppt.createSlide();
        XSLFTextBox title = slide1.createTextBox();
        title.setAnchor(new Rectangle(50, 50, 400, 100));
        
        XSLFTextParagraph titleParagraph = title.addNewTextParagraph();
        XSLFTextRun titleRun = titleParagraph.addNewTextRun();
        titleRun.setText("프레젠테이션 제목");
        titleRun.setFontSize(24.0);
        titleRun.setBold(true);
        
        // 두 번째 슬라이드 추가
        XSLFSlide slide2 = ppt.createSlide();
        XSLFTextBox content = slide2.createTextBox();
        content.setAnchor(new Rectangle(50, 150, 500, 200));
        
        XSLFTextParagraph contentParagraph = content.addNewTextParagraph();
        XSLFTextRun contentRun = contentParagraph.addNewTextRun();
        contentRun.setText("슬라이드 내용입니다.");
        
        // File 저장
        FileOutputStream out = new FileOutputStream("sample.pptx");
        ppt.write(out);
        out.close();
        ppt.close();
    }
}
```


### PowerPoint 읽기

- `XMLSlideShow`로 기존 PowerPoint file의 slide와 text를 읽어옵니다.

```java
public void readPresentation(String filePath) throws IOException {
    FileInputStream fis = new FileInputStream(filePath);
    XMLSlideShow ppt = new XMLSlideShow(fis);
    
    XSLFSlide[] slides = ppt.getSlides().toArray(new XSLFSlide[0]);
    
    for (int i = 0; i < slides.length; i++) {
        System.out.println("슬라이드 " + (i + 1) + ":");
        
        List<XSLFShape> shapes = slides[i].getShapes();
        for (XSLFShape shape : shapes) {
            if (shape instanceof XSLFTextShape) {
                XSLFTextShape textShape = (XSLFTextShape) shape;
                System.out.println(textShape.getText());
            }
        }
    }
    
    ppt.close();
    fis.close();
}
```


---


## Error 처리 및 Best Practice

- POI 사용 시 resource 관리와 exception 처리가 중요합니다.


### Exception 처리 Pattern

- POI 사용 시 발생하는 주요 exception을 처리하고, `finally` block에서 resource를 정리합니다.

```java
public class SafePoiProcessor {
    public void safeFileProcessing(String filePath) {
        FileInputStream fis = null;
        Workbook workbook = null;
        
        try {
            fis = new FileInputStream(filePath);
            workbook = WorkbookFactory.create(fis);
            
            // 파일 처리 로직
            processWorkbook(workbook);
            
        } catch (FileNotFoundException e) {
            logger.error("파일을 찾을 수 없습니다: " + filePath, e);
        } catch (IOException e) {
            logger.error("파일 읽기/쓰기 오류", e);
        } catch (InvalidFormatException e) {
            logger.error("지원하지 않는 파일 형식", e);
        } catch (Exception e) {
            logger.error("예상치 못한 오류 발생", e);
        } finally {
            closeQuietly(workbook);
            closeQuietly(fis);
        }
    }
    
    private void closeQuietly(Closeable resource) {
        if (resource != null) {
            try {
                resource.close();
            } catch (IOException e) {
                logger.warn("Resource 종료 중 오류", e);
            }
        }
    }
}
```


### Performance 최적화

- `CellStyle`을 매번 생성하지 않고 **cache하여 재사용**하면 성능이 크게 향상됩니다.

```java
public class PerformanceOptimizedProcessor {
    // Cell style 재사용을 위한 cache
    private final Map<String, CellStyle> styleCache = new HashMap<>();
    
    public void optimizedExcelProcessing(Workbook workbook) {
        Sheet sheet = workbook.createSheet("최적화된 시트");
        
        // Style 재사용
        CellStyle headerStyle = getCachedStyle(workbook, "header");
        CellStyle dataStyle = getCachedStyle(workbook, "data");
        
        // Bulk operation 사용
        for (int i = 0; i < 10000; i++) {
            Row row = sheet.createRow(i);
            Cell cell = row.createCell(0);
            cell.setCellValue("Data " + i);
            cell.setCellStyle(i == 0 ? headerStyle : dataStyle);
        }
        
        // Formula evaluation 최적화
        FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator();
        evaluator.evaluateAll();
    }
    
    private CellStyle getCachedStyle(Workbook workbook, String styleType) {
        return styleCache.computeIfAbsent(styleType, 
            type -> createStyle(workbook, type));
    }
}
```


---


## Reference

- <https://poi.apache.org/>
- <https://poi.apache.org/components/index.html>

