package aminadav.com.pdfscrape;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import technology.tabula.*;
import technology.tabula.extractors.SpreadsheetExtractionAlgorithm;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;

public final class PDFToExcelConverter {
    public static String convert(String filename) throws IOException {
        File pdfFile = new File(filename);
        PDDocument document = PDDocument.load(pdfFile);

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
        String excelFilename = filename.replace(".pdf", "-" + timeStamp() + ".xlsx");
        FileOutputStream out = new FileOutputStream(excelFilename);
        wb.write(out);
//        pdfFile.delete();
        Files.deleteIfExists(Path.of(filename));
        out.close();
        // dispose of temporary files backing this workbook on disk
        wb.dispose();
        return excelFilename;
    }

    private static String timeStamp() {
        return LocalDateTime.now(ZoneOffset.UTC).format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
    }
}