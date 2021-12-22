package com.orinoren318598984.full_project.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

/**
 * Configuration for Cross origin .
 * */
@Configuration
public class CorsConfig implements WebMvcConfigurer {
/**
 * 1. AddMapping : enable cross-origin request handling for all the rest end points in this server.
 * 2. ExposedHeaders :  Allows Authorization and Role headers to be exposed in the response.
 * 3. AllowedMethods :Allows  "GET", "POST", "DELETE", "PUT", "OPTIONS" methods to enter the server.
 * */
	@Override
	public void addCorsMappings(CorsRegistry registry) {

		registry
				.addMapping("/**")
				.exposedHeaders("Authorization", "Role","Username")
				.allowedMethods("GET", "POST", "DELETE", "PUT", "OPTIONS");
	}
/**
 * 1. Making a bean of object mappper to help us use it in dependecy injection.
 * 2. Register Module <code>JavaTimeModule</code> to help us convert a date string to LocalDateTime.
 * (this Module is needed because when i want to pass an image with the coupon seperatly in need to pass them as params
 * and the coupon pass as a string from the client to the server . objectMapper helps to convert the dates in the coupon to LocalDate )
 * */
	@Bean
	public ObjectMapper objectMapper() {
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.registerModule(new JavaTimeModule());
		return objectMapper;
	}

}
