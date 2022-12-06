package aminadav.com.backend.controller;

import aminadav.com.backend.logic.FileService;
import aminadav.com.backend.model.FileEntity;
import aminadav.com.backend.model.FileResponse;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.util.UriUtils;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

@Log
@RestController
@CrossOrigin(origins = {"http://localhost:8080",
        "http://localhost:80",
        "http://localhost:3000"},
        exposedHeaders = "*")
@RequestMapping("files")
public class FilesController {

    private final FileService fileService;

    @Autowired
    public FilesController(FileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                log.warning("Empty file. Operation stopped.");
                throw new Exception();
            }
            fileService.save(file);
            log.info("File saved: " + file.getOriginalFilename());
            return ResponseEntity
                    .ok("File uploaded successfully: " + file.getOriginalFilename());
        } catch (Exception e) {
            return ResponseEntity
                    .internalServerError()
                    .body("Could not upload the file: " + file.getOriginalFilename()
                            + " more details: " + e.getMessage());
        }
    }

    @GetMapping
    public List<FileResponse> list() {
        return fileService.getAllFiles()
                .stream()
                .map(this::mapToFileResponse)
            .toList();
    }

    private FileResponse mapToFileResponse(FileEntity fileEntity) {
        String downloadURL = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/files/")
                .path(fileEntity.getId())
                .toUriString();
        FileResponse fileResponse = new FileResponse();
        fileResponse.setId(fileEntity.getId());
        fileResponse.setName(fileEntity.getName());
        fileResponse.setSize(fileEntity.getSize());
        fileResponse.setUrl(downloadURL);

        return fileResponse;
    }

    @GetMapping("{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String id) {
        Optional<FileEntity> fileEntityOptional = fileService.getFile(id);

        if (fileEntityOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        FileEntity fileEntity = fileEntityOptional.get();

        return ResponseEntity.ok().
                header("Content-Type", MediaType.APPLICATION_OCTET_STREAM_VALUE)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" +
                        UriUtils.encode(fileEntity.getName(), StandardCharsets.UTF_8) + "\"")
                .body(fileEntity.getData());
    }
}
