package com.orinoren318598984.full_project.security;

import java.sql.Date;
import java.time.LocalDate;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.orinoren318598984.full_project.config.JwtConfig;
import com.orinoren318598984.full_project.service.UserDetailsService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

/**
 * JWT
 * This class responsible for create the JWT and parse the JWT to readable data.
 */
@Component
@NoArgsConstructor
@AllArgsConstructor
public class Jwt {

	@Autowired
	private JwtConfig jwtConfig;

	@Autowired
	private SecretKey secretKey;

	private Date tokenStartDate = Date.valueOf(LocalDate.now());

	/**
	 * This method creating a unique JWT for each user the logged in successfully.
	 * @param user the login user details.
	 * @return jws the created JWT string with the user details.
	 */
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

	/**
	 * This method convert the JWT with the secret key(unreadable) to jwt<Claims> that contains the parsed data of the token (readable).
	 * @param jws JWT with the secret key.
	 * @return
	 */
	public Jws<Claims> parseJWS(String jws) {
		Jws<Claims> jwsParsed = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(jws);
		return jwsParsed;
	}
}
