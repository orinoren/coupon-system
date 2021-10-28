package com.orinoren318598984.full_project.security;

import java.sql.Date;
import java.time.LocalDate;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.orinoren318598984.full_project.config.JwtConfig;
import com.orinoren318598984.full_project.service.UserDetailsService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Service
@NoArgsConstructor
@AllArgsConstructor
public class Jwt {

	@Autowired
	private JwtConfig jwtConfig;

	@Autowired
	private SecretKey secretKey;

	private Date tokenStartDate = Date.valueOf(LocalDate.now());



	public String createJWT(UserDetailsService user) {
		String jws = Jwts.builder()
				.setSubject(user.getUsername())
				.claim("userId", user.getUserId())
				.claim("role", user.getRole().name())
				.setIssuer(jwtConfig.getIssuer())
				.setIssuedAt(tokenStartDate)
				.setExpiration(Date.valueOf(LocalDate.now().plusDays(jwtConfig.getTokenExpirationAfterDays())))
				.signWith(secretKey)
				.compact();
		return jws;
	}

	public Jws<Claims> parseJWS(String jws) {
		Jws<Claims> jwsParsed = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(jws);
		return jwsParsed;
	}
}
