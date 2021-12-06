package com.orinoren318598984.full_project.config;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 * Configuration for Jwt token .
 * 1. All properties place in application.properties file an injected to this JwtConfig instance.
 * 2. SecretKey : create a bean of SecretKey that Creates a new SecretKey instance for use with
 *    HMAC-SHA algorithms based on the secret key property byte array.
 * */
@Configuration
@NoArgsConstructor
@Data
@AllArgsConstructor
public class JwtConfig {
	@Value("${jwt.secretKey}")
	private String secretKey;
	@Value("${jwt.jwtPrefix}")
	private String jwtPrefix;
	@Value("${jwt.tokenExpirationAfterDays}")
	private Integer tokenExpirationAfterDays;
	@Value("${jwt.issuer}")
	private String issuer ;

	@Bean
	public SecretKey secretKeyForSign() {
		SecretKey secretKeyForSigning = Keys.hmacShaKeyFor(secretKey.getBytes());
		return secretKeyForSigning;
	}
}
