package com.orinoren318598984.full_project.service;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Component
@RequestScope
@NoArgsConstructor
public class UserDetailsService {
	private Long userId;
	private String username;
	private Role role;

}
