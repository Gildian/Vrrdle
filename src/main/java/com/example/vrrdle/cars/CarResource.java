package com.example.vrrdle.cars;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
@RestController
public class CarResource {
    private CarService carService;

    public CarResource(CarService carService) {
        this.carService = carService;
    }

    @GetMapping("/api/cars")
    public Cars index() {
        Cars car = carService.getRandomCar();
        return car;
    }
}
