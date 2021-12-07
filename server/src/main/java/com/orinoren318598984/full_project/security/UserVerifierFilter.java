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

/**
 * UserVerifierFilter
 * works as a middleware between the client and system api for every request.
 */
@Slf4j
@Order(2)
@Component
public class UserVerifierFilter implements Filter {

	@Autowired
	private Jwt myJwt;
	@Autowired
	private UserDetailsService userDetails;

	private Date nowDate = Date.valueOf(LocalDate.now());

	/**
	 * This method
	 * Checks if the request header method is options if it is exit this filter.<br/>
	 * if not takes the JWT from the Authorization header and check if its exist <br/>
	 * if exist makes a String tokenToParse that contain the JWT without the prefix Bearer in the start 7 characters.<br/>
	 * Calls {@link Jwt#parseJWS(String)} with tokenToParse if an exception is thrown during
	 * the parse an UNAUTHORIZED response send to the user. <br/>
	 * if token parsed successfully a check for the expiration time of the token is get checked.<br/>
	 * if the time expired an UNAUTHORIZED response send to the user. <br/>
	 * if not expired then a check for if the current user role is match to his api that he is trying to access<br/>
	 * by getting the user role from the token and matching to the url api first part(admin/company/customer) that he try to access.<br/>
	 * after all the checks been passed successfully the system can set the userDetailsService userId to the user id from the token.
	 * @param request the request provide by the user
	 * @param response the response provide by the system
	 * @param chain pass the request and response to the next filter to continue the operations
	 * @throws IOException
	 * @throws ServletException
	 */
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		log.info("user verifier filter ");
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		if (!httpRequest.getMethod().equalsIgnoreCase("options")) {
			String token = httpRequest.getHeader("Authorization");
			Jws<Claims> jwtAfterParse = null;
			if (token != null) {
				try {
					String tokenToParse = token.substring(7);
					jwtAfterParse = myJwt.parseJWS(tokenToParse);
				} catch (Exception e) {
					if (!httpResponse.isCommitted()) {
						httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "TOKEN NOT APPROVED");
					}
				}
				if (!httpResponse.isCommitted() && jwtAfterParse.getBody().getExpiration().before(nowDate)) {
					httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED,
							"Please verify your login details");
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
		}
		log.info("-------------------------------------------------------------------------------------------");
		if (!httpResponse.isCommitted()) {
			chain.doFilter(httpRequest, httpResponse);
		}

	}
}
