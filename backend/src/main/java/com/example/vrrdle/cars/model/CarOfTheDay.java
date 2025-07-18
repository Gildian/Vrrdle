package com.example.vrrdle.cars.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "car_of_the_day")
public class CarOfTheDay {
    @Id
    private LocalDate date;
    private String carName;

    public CarOfTheDay() {}

    public CarOfTheDay(LocalDate date, String carName) {
        this.date = date;
        this.carName = carName;
    }

    public LocalDate getDate() { 
        return date; 
    }
    
    public void setDate(LocalDate date) { 
        this.date = date; 
    }
    
    public String getCarName() { 
        return carName; 
    }
    
    public void setCarName(String carName) { 
        this.carName = carName; 
    }
}