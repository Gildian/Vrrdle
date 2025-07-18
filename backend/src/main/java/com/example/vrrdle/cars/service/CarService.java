package com.example.vrrdle.cars.service;

import com.example.vrrdle.cars.model.Car;
import com.example.vrrdle.cars.model.CarOfTheDay;
import com.example.vrrdle.cars.repository.CarRepository;
import com.example.vrrdle.cars.repository.CarOfTheDayRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.scheduling.annotation.Scheduled;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;
import java.time.LocalDate;

@Service
public class CarService {
    
    private static final Logger logger = LoggerFactory.getLogger(CarService.class);

    private final CarRepository carsRepository;
    private final CarOfTheDayRepository carOfTheDayRepository;

    public CarService(CarRepository carsRepository, CarOfTheDayRepository carOfTheDayRepository) {
        this.carsRepository = carsRepository;
        this.carOfTheDayRepository = carOfTheDayRepository;
    }

    public List<Car> getAllCars() {
        logger.info("Fetching all cars");
        return carsRepository.findAll();
    }

    public Optional<Car> getRandomCar() {
        logger.info("Fetching random car");
        return carsRepository.findRandomCar();
    }
    
    @Transactional
    public Optional<Car> getCarOfTheDay() {
        LocalDate today = LocalDate.now();
        logger.info("Fetching car of the day for {}", today);
        
        return carOfTheDayRepository.findById(today)
            .map(cotd -> carsRepository.findById(cotd.getCarName()).orElse(null))
            .or(() -> {
                Optional<Car> randomCar = getRandomCar();
                if (randomCar.isPresent()) {
                    Car car = randomCar.get();
                    carOfTheDayRepository.save(new CarOfTheDay(today, car.getName()));
                    logger.info("Selected new car of the day: {}", car.getName());
                    return randomCar;
                }
                logger.warn("No cars available for car of the day");
                return Optional.empty();
            });
    }
    
    @Scheduled(cron = "0 0 0 * * *") // Every day at midnight
    public void selectCarOfTheDay() {
        LocalDate today = LocalDate.now();
        logger.info("Scheduled car of the day selection for {}", today);
        
        if (!carOfTheDayRepository.existsById(today)) {
            Optional<Car> randomCar = getRandomCar();
            if (randomCar.isPresent()) {
                Car car = randomCar.get();
                carOfTheDayRepository.save(new CarOfTheDay(today, car.getName()));
                logger.info("Scheduled selection of car of the day: {}", car.getName());
            } else {
                logger.warn("No cars available for scheduled car of the day selection");
            }
        } else {
            logger.info("Car of the day already exists for {}", today);
        }
    }
}

