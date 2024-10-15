package com.study.dicomtest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.study.dicomtest.repository")
public class Dicomtest3Application {

	public static void main(String[] args) {
		SpringApplication.run(Dicomtest3Application.class, args);
	}

}
