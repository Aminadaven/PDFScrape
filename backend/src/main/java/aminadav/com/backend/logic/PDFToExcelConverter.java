package aminadav.com.backend.logic;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;
import technology.tabula.*;
import technology.tabula.extractors.SpreadsheetExtractionAlgorithm;

import java.io.File;
import java.io.FileOutputStream;
import java.util.List;

public final class PDFToExcelConverter {
    public static File convert(MultipartFile pdfFile) throws Exception {
        try (PDDocument document = PDDocument.load(pdfFile.getInputStream())) {
            ObjectExtractor objectExtractor = new ObjectExtractor(document);
            SpreadsheetExtractionAlgorithm spreadsheetExtractor = new SpreadsheetExtractionAlgorithm();

            SXSSFWorkbook wb = new SXSSFWorkbook();
            Sheet sh = wb.createSheet();
            for (PageIterator pageIterator = objectExtractor.extract(); pageIterator.hasNext(); ) {
                Page page = pageIterator.next();
                int backRows = 0;
                for (Table tables : spreadsheetExtractor.extract(page)) {
                    List<List<RectangularTextContainer>> rows = tables.getRows();
                    for (int i = backRows; i < backRows + rows.size(); i++) {
                        List<RectangularTextContainer> cells = rows.get(i - backRows);
                        Row row = sh.createRow(i);

                        for (int j = 0; j < cells.size(); j++) {
                            org.apache.poi.ss.usermodel.Cell cell = row.createCell(j);
                            cell.setCellValue(cells.get(j).getText());
                        }
                    }
                    backRows += rows.size();
                }
            }
            String excelFilename = pdfFile.getOriginalFilename().replace(".pdf", ".xlsx");
            File excelFile = new File(excelFilename);
            try (FileOutputStream out = new FileOutputStream(excelFile)) {
                wb.write(out);
            }
            // dispose of temporary files backing this workbook on disk
            wb.dispose();
            return excelFile;
        }
    }
}