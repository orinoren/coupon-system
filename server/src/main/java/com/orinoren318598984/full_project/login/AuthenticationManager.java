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

/**
 * This class responsible to supply the relevant userdetails determine by the email and password inserted.
 */

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

    /**
     * This Method takes email and password as parameters and checks which type of user is trying to login.<br/>
     * 1. Calls {@link AdminService#login(String, String)} to Check if the email and password are match to the admin credentials.<br/>
     * if there is a match set the userDetails id to 1, role to ADMIN and return the userDetails.<br/>
     * if no match the methods continues.<br/>
     * 2. Calls {@link CompanyService#login(String, String)} to Check if the email and password are match to any company credentials in the database.<br/>
     * *  if there is a match set the userDetails id and name to company id and name that return from the database , role to COMPANY and return the userDetails.<br/>
     * *  if no match the methods continues.<br/>
     * 3.	   Calls {@link CustomerService#login(String, String)} to Check if the email and password are match to any customer credentials in the database.<br/>
     * if there is a match set the userDetails id and name to customer id and name that return from the database , role to CUSTOMER and return the userDetails.<br/>
     * if no match throws {@link EmailOrPasswordIncorrectException}.<br/>
     *
     * @param email    String
     * @param password String
     * @return
     * @throws EmailOrPasswordIncorrectException
     */
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
