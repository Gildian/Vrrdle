package com.example.vrrdle.cars.controller;

import com.example.vrrdle.cars.model.Car;
import com.example.vrrdle.cars.service.CarService;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Optional;

@RestController
public class CarController {
    
    private static final Logger logger = LoggerFactory.getLogger(CarController.class);
    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping("/api/v1/cars/today")
    public ResponseEntity<Car> getCarOfTheDay() {
        logger.info("API request for car of the day");
        Optional<Car> carOfTheDay = carService.getCarOfTheDay();
        
        if (carOfTheDay.isPresent()) {
            return ResponseEntity.ok(carOfTheDay.get());
        } else {
            logger.warn("No car of the day available");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Keep the old endpoint for backward compatibility
    @GetMapping("/api/cars")
    public ResponseEntity<Car> index() {
        return getCarOfTheDay();
    }
}
