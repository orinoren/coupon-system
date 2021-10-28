package com.orinoren318598984.full_project.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.orinoren318598984.full_project.security.AuthorizationFilter;

@Configuration
public class AuthorizationFilterConfig {

	@Bean
	public FilterRegistrationBean<AuthorizationFilter> loggingFilter(){
	    FilterRegistrationBean<AuthorizationFilter> registrationBean 
	      = new FilterRegistrationBean<>();
	        
	    registrationBean.setFilter(new AuthorizationFilter());
	    String[] arr= {"/admin/*","/customer/*","/company/*"};
	    registrationBean.addUrlPatterns(arr);
	    registrationBean.setOrder(1);
	        
	    return registrationBean;    
	}
	
}
