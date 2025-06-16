---
published: false
---










---


## Web application에서 Excel download 구현하기

- Spring Boot나 Servlet 기반의 web application에서 Excel file을 download할 수 있도록 구현합니다.


### Spring Boot Controller 구현

- HTTP response를 통해 Excel file을 download할 수 있도록 controller를 구현합니다.

```java
@RestController
public class ExcelDownloadController {
    
    @GetMapping("/download/excel")
    public ResponseEntity<byte[]> downloadExcel() throws IOException {
        Workbook workbook = createExcelFile();
        
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "data.xlsx");
        
        return ResponseEntity.ok()
                .headers(headers)
                .body(outputStream.toByteArray());
    }
}
```








## Web Application 통합

### Spring Boot에서 POI 활용

- Spring Boot application에서 POI를 사용하여 Office 문서를 처리하는 방법입니다.

```java
@RestController
@RequestMapping("/documents")
public class DocumentController {
    
    @GetMapping("/excel/download")
    public ResponseEntity<byte[]> downloadExcel() throws IOException {
        Workbook workbook = createExcelReport();
        
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "report.xlsx");
        
        return ResponseEntity.ok()
                .headers(headers)
                .body(outputStream.toByteArray());
    }
    
    @PostMapping("/word/upload")
    public ResponseEntity<String> uploadWordDocument(@RequestParam("file") MultipartFile file) {
        try {
            XWPFDocument document = new XWPFDocument(file.getInputStream());
            String content = extractTextFromDocument(document);
            document.close();
            
            return ResponseEntity.ok(content);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("파일 처리 오류");
        }
    }
}
```

### 비동기 처리

- 대용량 file 처리를 위한 비동기 처리 구현 방법입니다.

```java
@Service
public class AsyncDocumentService {
    
    @Async
    public CompletableFuture<String> processLargeExcelFile(MultipartFile file) {
        try {
            Workbook workbook = WorkbookFactory.create(file.getInputStream());
            
            // 대용량 파일 처리 로직
            String result = processWorkbookInBackground(workbook);
            
            workbook.close();
            return CompletableFuture.completedFuture(result);
            
        } catch (Exception e) {
            CompletableFuture<String> future = new CompletableFuture<>();
            future.completeExceptionally(e);
            return future;
        }
    }
}
```

