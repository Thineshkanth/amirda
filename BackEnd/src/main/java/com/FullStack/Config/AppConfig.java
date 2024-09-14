package com.FullStack.Config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

@Configuration
public class AppConfig {


    @Bean
    public CommandLineRunner openSwaggerUi() {
        return args -> {
            // URL of the Swagger UI
            String swaggerUrl = "http://localhost:8080/swagger-ui.html";

            // Open Swagger UI in the default web browser
            openBrowser(swaggerUrl);
        };
    }

    private void openBrowser(String url) {
        try {
            // Try using 'xdg-open' (Linux), 'open' (macOS), or 'start' (Windows)
            String os = System.getProperty("os.name").toLowerCase();
            String cmd = null;

            if (os.contains("win")) {
                cmd = "rundll32 url.dll,FileProtocolHandler " + url;
            }

            if (cmd != null) {
                Runtime.getRuntime().exec(cmd);
            } else {
                System.out.println("Unsupported operating system for opening the browser.");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
