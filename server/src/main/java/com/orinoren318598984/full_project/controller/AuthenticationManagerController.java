package com.orinoren318598984.full_project.controller;

import java.util.Map;

import com.orinoren318598984.full_project.utils.StringResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orinoren318598984.full_project.config.JwtConfig;
import com.orinoren318598984.full_project.login.AuthenticationManager;
import com.orinoren318598984.full_project.security.Jwt;
import com.orinoren318598984.full_project.service.UserDetailsService;

/**
 * REST API FOR Authentication
 * Triggers when a user try to login to the website.
 */
@RestController
@RequestMapping("/")
public class AuthenticationManagerController {

	@Autowired
	private Jwt myJwtToken;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtConfig jwtConfig;

	/**
	 * When a login made from the client the userDetails Map contains the email and the password of the user.
	 * with those details {@link com.orinoren318598984.full_project.login.AuthenticationManager#login(email, password)} that returns <code>UserDetailsService</code> .
	 * creating a jwtToken with the userDetailsService.
	 * @param  userDetails 
	 * @return ResponseEntity with Authorization header that contains the JwtToken and a Role header that conatins the user Role.
	 */
	@PostMapping("login")
	public ResponseEntity<Void> login(@RequestBody Map<String, String> userDetails) {
		String email = userDetails.get("email");
		String password = userDetails.get("password");
		UserDetailsService user = authenticationManager.login(email, password);
		String userJwt = myJwtToken.createJWT(user);
		return ResponseEntity.status(HttpStatus.OK).header("Authorization",jwtConfig.getJwtPrefix() +userJwt).header("Role",user.getRole().name()).build();

	}
}
