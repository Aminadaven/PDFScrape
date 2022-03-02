package aminadav.com.backend.logic;

import aminadav.com.backend.model.FileEntity;
import aminadav.com.backend.model.FileRepository;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.util.List;
import java.util.Optional;

@Log
@Service
public class FileService {
    private final FileRepository fileRepository;

    @Autowired
    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public void save(MultipartFile file) throws Exception {
        File excelFile = PDFToExcelConverter.convert(file);
        FileEntity fileEntity = new FileEntity();
        fileEntity.setName(excelFile.getName());
        fileEntity.setData(Files.readAllBytes(excelFile.toPath()));
        fileEntity.setSize(excelFile.length());
        if ((excelFile.delete())) {
            log.info(String.format("The file %s has been deleted successfully", excelFile.getName()));
        } else {
            log.severe(String.format("The file %s has not been deleted!", excelFile.getName()));
        }
        fileRepository.save(fileEntity);
    }

    public Optional<FileEntity> getFile(String id) {
        return fileRepository.findById(id);
    }

    public List<FileEntity> getAllFiles() {
        return fileRepository.findAll();
    }
}