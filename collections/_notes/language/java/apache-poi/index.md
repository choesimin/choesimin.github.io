---
layout: note
permalink: /
title: Apache POI - Microsoft 문서 관리를 위한 Java API
description: Apache POI는 Apache Software 재단에서 만든 library로, Microsoft Office file format을 순수 Java 언어로서 읽고 쓰는 기능을 제공합니다.
date: 2025-06-16
published: false
---





# Apache POI 완전 가이드

- Apache POI는 Microsoft Office 문서를 Java program에서 읽고 쓸 수 있게 해주는 open source library입니다.
- Word, Excel, PowerPoint 등 다양한 Microsoft Office format을 지원합니다.
- 100% 순수 Java로 구현되어 있어 platform에 관계없이 사용할 수 있습니다.
- Apache Software Foundation에서 개발하고 유지 관리하는 신뢰할 수 있는 library입니다.

## POI Project 개요

### 역사 및 배경

- POI project는 1999년에 시작되어 20년 이상의 역사를 가지고 있습니다.
- 초기에는 Excel file 처리만을 목표로 했지만, 현재는 Microsoft Office 전반을 지원합니다.
- **POI**라는 이름은 "Poor Obfuscation Implementation"의 줄임말로, Microsoft의 복잡한 file format을 해석한다는 의미입니다.

### 지원하는 file format

- **Excel** : `.xls` (Excel 97-2003), `.xlsx` (Excel 2007+)
- **Word** : `.doc` (Word 97-2003), `.docx` (Word 2007+)
- **PowerPoint** : `.ppt` (PowerPoint 97-2003), `.pptx` (PowerPoint 2007+)
- **Visio** : `.vsd` (Visio 2003-2010)
- **Publisher** : `.pub` (Publisher 98+)
- **Outlook** : `.msg` (Outlook message file)

## POI 구성 요소

### Core component

- **POIFS (Poor Obfuscation Implementation File System)** : Microsoft의 OLE2 compound document format을 처리합니다.
- **HSSF (Horrible Spreadsheet Format)** : Excel 97-2003 format인 `.xls` file을 처리합니다.
- **XSSF (XML Spreadsheet Format)** : Excel 2007+ format인 `.xlsx` file을 처리합니다.
- **SXSSF (Streaming XML Spreadsheet Format)** : 대용량 Excel file을 memory 효율적으로 처리합니다.

### Document processing component

- **HWPF (Horrible Word Processor Format)** : Word 97-2003 format인 `.doc` file을 처리합니다.
- **XWPF (XML Word Processor Format)** : Word 2007+ format인 `.docx` file을 처리합니다.
- **HSLF (Horrible Slide Layout Format)** : PowerPoint 97-2003 format인 `.ppt` file을 처리합니다.
- **XSLF (XML Slide Layout Format)** : PowerPoint 2007+ format인 `.pptx` file을 처리합니다.

### Utility component

- **SS (SpreadSheet)** : Excel format 간 공통 interface를 제공합니다.
- **Common** : 모든 POI component에서 공통으로 사용하는 utility class들을 포함합니다.
- **Scratchpad** : 아직 개발 중이거나 실험적인 기능들을 포함합니다.

## 기본 설정 및 dependency

### Maven dependency 설정

- 기본 POI core library와 필요한 추가 module을 선택적으로 추가합니다.

```xml
<dependency>
    <groupId>org.apache.poi</groupId>
    <artifactId>poi</artifactId>
    <version>5.2.4</version>
</dependency>
```

### Gradle dependency 설정

```groovy
implementation 'org.apache.poi:poi:5.2.4'
```


---


## Excel 처리 기능

### Excel file 생성 및 조작

- Excel workbook을 생성하고 data를 입력하는 기본적인 방법입니다.

```java
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ExcelProcessor {
    public void createExcelFile() throws IOException {
        // 새 workbook 생성
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("데이터 시트");
        
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

### Excel file 읽기

- 기존 Excel file을 읽어서 data를 추출하는 방법입니다.

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

## Word 문서 처리 기능

### Word 문서 생성

- Word 문서를 생성하고 내용을 추가하는 방법입니다.

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

- 기존 Word 문서의 내용을 읽어오는 방법입니다.

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

## PowerPoint 처리 기능

### PowerPoint 생성

- PowerPoint presentation을 생성하고 slide를 추가하는 방법입니다.

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

- 기존 PowerPoint file의 내용을 읽어오는 방법입니다.

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



## Error 처리 및 Best Practice

### Exception 처리 pattern

- POI 사용 시 발생할 수 있는 주요 exception들을 처리하는 방법입니다.

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
            // Resource 정리
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

### Performance 최적화 지침

- POI 사용 시 성능을 최적화하는 주요 방법들입니다.

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