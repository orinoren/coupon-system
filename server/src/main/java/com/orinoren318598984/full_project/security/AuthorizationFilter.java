package com.orinoren318598984.full_project.security;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.extern.slf4j.Slf4j;

/**
 * AuthorizationFilter
 * works as a middleware between the ADMIN ,COMPANY ,CUSTOMER api that need Authorization to access
 */
@Slf4j
public class AuthorizationFilter implements Filter {
	/**
	 * This method <br/>
	 * Checks if the request header method is options if it is exit this filter.<br/>
	 * if not takes the JWT from the Authorization header and check if its exist and if it starts with Bearer(unique to JWT) <br/>
	 * if one of the conditions is not met then a UNAUTHORIZED response send back to user.<br/>
	 * if the conditions are satisfied then pass the request and response to the next filter to continue the operations.
	 *  @param request the request provide by the user
	 * @param response the response provide by the system
	 * @param chain pass the request and response to the next filter to continue the operations.
	 * @throws ServletException
	 * @throws IOException
	 */
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws ServletException, IOException {
		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		log.info(httpRequest.getMethod());
		log.info(httpRequest.getRequestURI());
		if (!httpRequest.getMethod().equalsIgnoreCase("options")) {
			String token = httpRequest.getHeader("Authorization");
			log.info(token);
			if (token != null && token.startsWith("Bearer ")) {
				log.info("token passed");
			} else {
				log.info("needs to login");
				httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized please login");
			}
		}
		log.info("-------------------------------------------------------------------------");
		if (!httpResponse.isCommitted()) {
			chain.doFilter(httpRequest, httpResponse);
		}
	}

}
