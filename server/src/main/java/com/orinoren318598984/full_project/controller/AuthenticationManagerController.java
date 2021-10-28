package com.orinoren318598984.full_project.controller;

import java.util.Map;

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

@RestController
@RequestMapping("/")
public class AuthenticationManagerController {

	@Autowired
	private Jwt myJwtToken;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtConfig jwtConfig;


	@PostMapping("login")
	public ResponseEntity<String> login(@RequestBody Map<String, String> userDetails) {
		String email = userDetails.get("email");
		String password = userDetails.get("password");
		UserDetailsService user = authenticationManager.login(email, password);
		String userJwt = myJwtToken.createJWT(user);
		return ResponseEntity.status(HttpStatus.OK).header("Authorization",jwtConfig.getJwtPrefix() +userJwt).header("Role",user.getRole().name()).body(" login succssfull");

	}
}
