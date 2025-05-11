package com.example.vrrdle.cars;

import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class CarService {
    private static List<Cars> cars = new ArrayList<>();
    static {
        cars.add(new Cars("Car1", "Make1", "Model1", "car1.mp3"));
        cars.add(new Cars("Car2", "Make2", "Model2", "car2.mp3"));
        cars.add(new Cars("Car3", "Make3", "Model3", "car3.mp3"));
        // Add more cars as needed
    }

    public List<Cars> getAllCars() {
        return cars;
    }
    
    public Cars getRandomCar() {
        int randomIndex = (int) (Math.random() * cars.size());
        return cars.get(randomIndex);
    }
}