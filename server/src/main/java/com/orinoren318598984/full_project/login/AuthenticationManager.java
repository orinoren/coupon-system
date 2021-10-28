package com.orinoren318598984.full_project.login;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.orinoren318598984.full_project.exepction.EmailOrPasswordIncorrectException;
import com.orinoren318598984.full_project.model.Company;
import com.orinoren318598984.full_project.model.Customer;
import com.orinoren318598984.full_project.service.AdminService;
import com.orinoren318598984.full_project.service.CompanyService;
import com.orinoren318598984.full_project.service.CustomerService;
import com.orinoren318598984.full_project.service.Role;
import com.orinoren318598984.full_project.service.UserDetailsService;

@Component
public class AuthenticationManager {
	@Autowired
	private CompanyService companyService;
	@Autowired
	private CustomerService customerService;
	@Autowired
	private AdminService adminService;

	@Autowired
	private UserDetailsService userDetails;

	public UserDetailsService login(String email, String password) {

		if (adminService.login(email, password).get()) {
			userDetails.setUserId(1l);
			userDetails.setRole(Role.ADMIN);
			return userDetails;
		}
		Optional<Company> optionalCompany = companyService.login(email, password);
		if (optionalCompany.isPresent()) {
			userDetails.setUserId(optionalCompany.get().getId());
			userDetails.setUsername(optionalCompany.get().getName());
			userDetails.setRole(Role.COMPANY);

			return userDetails;
		}
		Optional<Customer> optionalCustomer = customerService.login(email, password);
		if (optionalCustomer.isPresent()) {
			userDetails.setUserId(optionalCustomer.get().getId());
			userDetails.setUsername(optionalCustomer.get().getFirst_name());
			userDetails.setRole(Role.CUSTOMER);
			return userDetails;
		}
		throw new EmailOrPasswordIncorrectException("email or password incorrect");
	}
}
