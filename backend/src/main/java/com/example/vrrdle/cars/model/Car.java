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
    
    @Column(name = "category")
    @NotBlank(message = "Category cannot be blank")
    @Size(max = 50, message = "Category must be less than 50 characters")
    private String category;
    
    @Column(name = "origin_country")
    @NotBlank(message = "Origin country cannot be blank")
    @Size(max = 50, message = "Origin country must be less than 50 characters")
    private String originCountry;
    
    @Column(name = "decade")
    @NotBlank(message = "Decade cannot be blank")
    @Size(max = 20, message = "Decade must be less than 20 characters")
    private String decade;

    public Car() {
        // No-argument constructor required by JPA
    }

    public Car(String name, String make, String model, String mp3FileName, String category, String originCountry, String decade) {
        this.name = name;
        this.make = make;
        this.model = model;
        this.mp3FileName = mp3FileName;
        this.category = category;
        this.originCountry = originCountry;
        this.decade = decade;
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
    
    public String getCategory() {
        return category;
    }
    
    public String getOriginCountry() {
        return originCountry;
    }
    
    public String getDecade() {
        return decade;
    }
    
    @Override
    public String toString() {
        return "Cars{" +
                "name='" + name + '\'' +
                ", make='" + make + '\'' +
                ", model='" + model + '\'' +
                ", mp3FileName='" + mp3FileName + '\'' +
                ", category='" + category + '\'' +
                ", originCountry='" + originCountry + '\'' +
                ", decade='" + decade + '\'' +
                '}';
    }
}
