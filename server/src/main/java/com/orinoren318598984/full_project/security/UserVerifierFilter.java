package com.orinoren318598984.full_project.security;

import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.orinoren318598984.full_project.service.UserDetailsService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Order(2)
@Component
public class UserVerifierFilter implements Filter {

	@Autowired
	private Jwt myJwt;
	@Autowired
	private UserDetailsService userDetails;

	private Date nowDate = Date.valueOf(LocalDate.now());

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		if (!httpRequest.getMethod().equalsIgnoreCase("options")) {
			String token = httpRequest.getHeader("Authorization");
			log.info("user verefier filter ");
			if(token==null) {
			log.info("no token");
			}
			Jws<Claims> jwtAfterParse = null;
			if (token != null) {
				try {
					log.info("token not null");
					String tokenToParse = token.substring(7);
					jwtAfterParse = myJwt.parseJWS(tokenToParse);
					log.info("parse token");
				} catch (Exception e) {
					if (!httpResponse.isCommitted()) {
						httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "TOKEN NOT APPROVED");
					}
				}
				if (!httpResponse.isCommitted() && jwtAfterParse.getBody().getExpiration().before(nowDate)) {
					httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED,
							" (TOKEN DATE EXPIRED) Unauthrized please login again");
				}

				if (!httpResponse.isCommitted()) {
					String userRole = jwtAfterParse.getBody().get("role").toString();
					String[] UriSplit = httpRequest.getRequestURI().split("/");
					String requestUriForCheck = UriSplit[1];
					log.info(requestUriForCheck);
					log.info(userRole);
					if (!userRole.equalsIgnoreCase(requestUriForCheck)) {
						httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED,
								"(this section is only for " + requestUriForCheck + " )Unauthorized ");
					}
					Integer userIdFromToken = (Integer) jwtAfterParse.getBody().get("userId");

					log.info(userIdFromToken.toString());
					userDetails.setUserId(userIdFromToken.longValue());
				}

			}
		}log.info("-------------------------------------------------------------------------------------------");
		if (!httpResponse.isCommitted()) {
			chain.doFilter(httpRequest, httpResponse);
		}

	}
}
