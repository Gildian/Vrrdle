package com.example.vrrdle.cars;

import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;

public interface CarOfTheDayRepository extends JpaRepository<CaroftheDay, LocalDate> {}