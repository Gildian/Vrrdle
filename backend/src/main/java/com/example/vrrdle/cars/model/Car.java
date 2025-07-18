package com.example.vrrdle.cars.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "cars")
public class Car {
    @Id
    @NotBlank(message = "Car name cannot be blank")
    @Size(max = 100, message = "Car name must be less than 100 characters")
    private String name;
    
    @Column(name = "make")
    @NotBlank(message = "Make cannot be blank")
    @Size(max = 50, message = "Make must be less than 50 characters")
    private String make;
    
    @Column(name = "model")
    @NotBlank(message = "Model cannot be blank")
    @Size(max = 50, message = "Model must be less than 50 characters")
    private String model;
    
    @Column(name = "mp3_file_name")
    @NotBlank(message = "MP3 file name cannot be blank")
    private String mp3FileName;

    public Car() {
        // No-argument constructor required by JPA
    }

    public Car(String name, String make, String model, String mp3FileName) {
        this.name = name;
        this.make = make;
        this.model = model;
        this.mp3FileName = mp3FileName;
    }

    public String getName() {
        return name;
    }

    public String getMake() {
        return make;
    }

    public String getModel() {
        return model;
    }

    public String getMp3FileName() {
        return mp3FileName;
    }
    
    @Override
    public String toString() {
        return "Cars{" +
                "name='" + name + '\'' +
                ", make='" + make + '\'' +
                ", model='" + model + '\'' +
                ", mp3FileName='" + mp3FileName + '\'' +
                '}';
    }
}
