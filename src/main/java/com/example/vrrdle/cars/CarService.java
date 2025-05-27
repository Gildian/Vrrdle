package com.example.vrrdle.cars;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Random;

@Service
public class CarService {

    private final CarSpringDataJpaRepository carsRepository;
    private final Random random = new Random();

    public CarService(CarSpringDataJpaRepository carsRepository) {
        this.carsRepository = carsRepository;
    }

    public List<Cars> getAllCars() {
        return carsRepository.findAll();
    }

    public Cars getRandomCar() {
        List<Cars> cars = carsRepository.findAll();
        if (cars.isEmpty()) {
            return null;
        }
        int randomIndex = random.nextInt(cars.size());
        return cars.get(randomIndex);
    }
}