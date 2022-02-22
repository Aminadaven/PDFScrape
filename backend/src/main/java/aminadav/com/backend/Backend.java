package aminadav.com.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class Backend {
    public static void main(String[] args) {
        SpringApplication.run(Backend.class, args);
    }
}
