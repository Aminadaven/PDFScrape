package aminadav.com.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.util.List;
import java.util.Optional;

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
        excelFile.delete();
        fileRepository.save(fileEntity);
    }

    public Optional<FileEntity> getFile(String id) {
        return fileRepository.findById(id);
    }

    public List<FileEntity> getAllFiles() {
        return fileRepository.findAll();
    }
}