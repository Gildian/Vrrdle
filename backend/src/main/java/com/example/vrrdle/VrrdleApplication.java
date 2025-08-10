package com.example.vrrdle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class VrrdleApplication {
    public static void main(String[] args) {
        SpringApplication.run(VrrdleApplication.class, args);
    }
}
