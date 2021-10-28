package com.orinoren318598984.full_project.service;

import java.util.Optional;

import org.springframework.stereotype.Component;

@Component
public interface ClientService  {
	 Optional<?> login(String email, String password);
}
