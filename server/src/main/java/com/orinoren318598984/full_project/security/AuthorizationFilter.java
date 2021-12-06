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

@Slf4j
public class AuthorizationFilter implements Filter {

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
