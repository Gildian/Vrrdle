package com.example.vrrdle.cars;

import com.example.vrrdle.cars.model.Car;
import com.example.vrrdle.cars.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class CarCommandLineRunner implements CommandLineRunner {
    
    private static final Logger logger = LoggerFactory.getLogger(CarCommandLineRunner.class);

    @Autowired
    private CarRepository repository;

    @Override
    public void run(String... args) throws Exception {
        logger.info("Initializing car data");
        
        // Add some sample cars
        repository.save(new Car("Lamborghini Aventador", "Lamborghini", "Aventador", "/sounds/example1.wav"));
        repository.save(new Car("Ferrari 488 GTB", "Ferrari", "488 GTB", "/sounds/example1.wav"));
        repository.save(new Car("Porsche 911 Turbo", "Porsche", "911 Turbo", "/sounds/example1.wav"));
        repository.save(new Car("McLaren 720S", "McLaren", "720S", "/sounds/example1.wav"));
        repository.save(new Car("Bugatti Chiron", "Bugatti", "Chiron", "/sounds/example1.wav"));
        
        logger.info("Car data initialization completed. Total cars: {}", repository.count());
    }
}
