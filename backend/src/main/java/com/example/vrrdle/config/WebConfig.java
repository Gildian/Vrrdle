package com.example.vrrdle.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Value("${cors.allowed-origins:http://localhost:5173}")
    private String allowedOrigins;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true)
                    .allowedOrigins(allowedOrigins.split(","));
            }
            
            @Override
            public void addResourceHandlers(ResourceHandlerRegistry registry) {
                // Ensure static resources are properly served
                registry.addResourceHandler("/static/**")
                        .addResourceLocations("classpath:/static/")
                        .setCachePeriod(3600); // Cache for 1 hour
            }
        };
    }
}