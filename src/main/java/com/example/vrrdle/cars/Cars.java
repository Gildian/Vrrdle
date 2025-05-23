package com.example.vrrdle.cars;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Cars {
    @Id
    private String name;
    private String make;
    private String model;
    private String mp3FileName;

    public Cars(String name, String make, String model, String mp3FileName) {
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
