package com.example.vrrdle.cars;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Random;
import java.time.LocalDate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.scheduling.annotation.Scheduled;

@Service
public class CarService {

    private final CarSpringDataJpaRepository carsRepository;
    private final Random random = new Random();
    private final CarOfTheDayRepository carOfTheDayRepository;

public CarService(CarSpringDataJpaRepository carsRepository, CarOfTheDayRepository carOfTheDayRepository) {
    this.carsRepository = carsRepository;
    this.carOfTheDayRepository = carOfTheDayRepository;
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
    
    @Transactional
    public Cars getCarOfTheDay() {
        LocalDate today = LocalDate.now();
        return carOfTheDayRepository.findById(today)
            .map(cotd -> carsRepository.findById(cotd.getCarName()).orElse(null))
            .orElseGet(() -> {
                Cars randomCar = getRandomCar();
                if (randomCar != null) {
                    carOfTheDayRepository.save(new CaroftheDay(today, randomCar.getName()));
                }
                return randomCar;
            });
    }
    @Scheduled(cron = "0 0 0 * * *") // Every day at midnight
    public void selectCarOfTheDay() {
        LocalDate today = LocalDate.now();
        if (!carOfTheDayRepository.existsById(today)) {
            Cars randomCar = getRandomCar();
            if (randomCar != null) {
                carOfTheDayRepository.save(new CaroftheDay(today, randomCar.getName()));
            }
        }
    }
}

