package com.orinoren318598984.full_project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class FullProjectApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext run = SpringApplication.run(FullProjectApplication.class, args);
//		DailyJobService dailyJobService = run.getBean(DailyJobService.class);
//		dailyJobService.startJob();
	}

}
