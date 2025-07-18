package com.example.vrrdle.cars.repository;

import com.example.vrrdle.cars.model.CarOfTheDay;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;

public interface CarOfTheDayRepository extends JpaRepository<CarOfTheDay, LocalDate> {}