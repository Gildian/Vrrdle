package com.example.vrrdle.cars.repository;

import com.example.vrrdle.cars.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.Optional;

public interface CarRepository extends JpaRepository<Car, String> {
    
    @Query(value = "SELECT * FROM cars ORDER BY RANDOM() LIMIT 1", nativeQuery = true)
    Optional<Car> findRandomCar();
}
