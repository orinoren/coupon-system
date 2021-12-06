package com.orinoren318598984.full_project.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.orinoren318598984.full_project.security.AuthorizationFilter;
/**
* Configuration for AuthorizationFilter
 * 1. Create a bean for <code>FilterRegistrationBean<AuthorizationFilter></code> .
 * 2. Set the filter to <code>AuthorizationFilter</code>.
 * 3. Add url patterns to make this <code>AuthorizationFilter</code> works only for admin/company/customer
 * end points.
 * 4. Set the order of the filter to 1 to works as the first filter.
 * */

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
