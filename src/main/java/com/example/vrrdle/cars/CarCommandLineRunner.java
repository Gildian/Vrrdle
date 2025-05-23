package com.example.vrrdle.cars;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CarCommandLineRunner implements CommandLineRunner {

    @Autowired
    private CarSpringDataJpaRepository repository;

    @Override
    public void run(String... args) throws Exception {
        repository.save(new Cars("Car1", "Make1", "Model1", "mp3File1"));
        System.out.println("CommandLineRunner executed");
    }
    
}
