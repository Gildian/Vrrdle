package com.example.vrrdle.cars;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.time.LocalDate;

@Entity
public class CaroftheDay {
    @Id
    private LocalDate date;
    private String carName;

    public CaroftheDay() {}

    public CaroftheDay(LocalDate date, String carName) {
        this.date = date;
        this.carName = carName;
    }

    public LocalDate getDate() { return date; }
    public String getCarName() { return carName; }
}