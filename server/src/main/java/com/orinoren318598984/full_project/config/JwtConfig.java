package com.orinoren318598984.full_project.config;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
	public SecretKey secertKeyForSign() {
		SecretKey secretKeyForSigning = Keys.hmacShaKeyFor(secretKey.getBytes());
		return secretKeyForSigning;
	}
}
