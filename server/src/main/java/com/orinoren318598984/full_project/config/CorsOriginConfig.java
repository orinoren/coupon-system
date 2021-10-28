package com.orinoren318598984.full_project.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration
public class CorsOriginConfig {
	  @Bean
	  public CorsConfigurationSource corsConfigurationSource() {
	      CorsConfiguration configuration = new CorsConfiguration();
	      configuration.setAllowedOrigins(Arrays.asList("*"));
	      configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
	      configuration.setAllowedHeaders(Arrays.asList("Authorization", "content-type"));
	      configuration.setExposedHeaders(Arrays.asList("Authorization"));
	      UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	      source.registerCorsConfiguration("/**", configuration);
	      return source;
	  }
}
