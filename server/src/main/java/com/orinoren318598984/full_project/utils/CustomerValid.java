package com.orinoren318598984.full_project.utils;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Component;

import com.orinoren318598984.full_project.exepction.EmailException;
import com.orinoren318598984.full_project.exepction.NameException;
import com.orinoren318598984.full_project.exepction.PasswordException;
import com.orinoren318598984.full_project.model.Customer;

@Component
public class CustomerValid {

	/**
	 * this method is for adding customers validation and calls all the validation
	 * methods that required for customer details
	 * {@link#customerFirstNameValidCheck}; {@link#customerLastNameValidCheck} ;
	 * {@link#customerEmailValidCheck} ; {@link#customerPasswordValidCheck}
	 * 
	 * @param customer
	 * @throws NameException
	 * @throws EmailException
	 * @throws PasswordException
	 */
	public void customerValidCheck(Customer customer, List<Customer> allCustomers)
			throws NameException, EmailException, PasswordException {
		customerFirstNameValidCheck(customer);
		customerLastNameValidCheck(customer);
		customerEmailValidCheck(customer, allCustomers);
		customerPasswordValidCheck(customer);

	}

	/**
	 * validation for customer first_name; 1 : uses regex to make sure the name
	 * contain only letters ; 2 : check if names contain less then 254 characters
	 * 
	 * @param customer
	 * @throws NameException
	 */
	public void customerFirstNameValidCheck(Customer customer) throws NameException {
		String firstName = customer.getFirst_name();
		Pattern patternForCustomer;
		Matcher matcherForCustomer;
		patternForCustomer = Pattern.compile("^[A-Z]+{1,254}$", Pattern.CASE_INSENSITIVE);
		matcherForCustomer = patternForCustomer.matcher(firstName);
		if (!matcherForCustomer.find()) {
			if (firstName.length() > 254) {
				throw new NameException("first name not valid (contains 0 or more then 254 charactes)");
			} else {
				throw new NameException("customer first name not valid (Requierd just letters)");
			
			}
		}
	}

	/**
	 * validation for customer last_name; 1 : uses regex to make sure the name
	 * contain only letters ; 2 : check if names contain less then 254 characters
	 * 
	 * @param customer
	 * @throws NameException
	 */
	public void customerLastNameValidCheck(Customer customer) throws NameException {
		String lastName = customer.getLast_name();
		Pattern patternForCustomer;
		Matcher matcherForCustomer;
		patternForCustomer = Pattern.compile("^[A-Z]+{1,254}$", Pattern.CASE_INSENSITIVE);
		matcherForCustomer = patternForCustomer.matcher(lastName);
		if (!matcherForCustomer.find()) {
			if (lastName.length() > 254) {
				throw new NameException("last name not valid (contains 0 or more then 254 charactes)");
			} else {
				throw new NameException("customer last name not valid (Requierd just letters)");
			}
		}
	}

	/**
	 * validation for customer_Email; 1 : uses regex to make sure the email in a
	 * valid pattern ; 2 : check if email contain less then 254 characters; 3 :
	 * check if customer email does not already exist in the system;
	 * 
	 * @param customer
	 * @throws EmailException
	 */
	public void customerEmailValidCheck(Customer customer, List<Customer> allCustomers) throws EmailException {
		String email = customer.getEmail();
		Pattern patternForCustomer;
		Matcher matcherForCustomer;
		patternForCustomer = Pattern.compile("^[^@]+@[^@.]+\\.[A-Z.]{2,6}$", Pattern.CASE_INSENSITIVE);
		matcherForCustomer = patternForCustomer.matcher(email);
		if (matcherForCustomer.find()) {
			for (Customer customerIter : allCustomers) {
				if (!customerIter.getId().equals(customer.getId())) {
					if (email.equalsIgnoreCase("admin@admin.com") || customerIter.getEmail().equalsIgnoreCase(email)) {
						throw new EmailException("Sorry Customer email already taken please try again");
					}
				}
			}
		} else {
			if (email.length() > 254) {
				throw new EmailException("EMAIL NOT VALID (REQUIRED LESS THE 254 CHARACTERS)");
			} else {
				throw new EmailException("Email not valid");
			}
		}
	}

	/**
	 * validation for customer_password 1 :uses regex to make sure the password
	 * match the pattern at least 1(capital letter,lower letter , symbol ,number)
	 * and 8 or more characters ;
	 * 
	 * @param customer
	 * @throws PasswordException
	 */
	public void customerPasswordValidCheck(Customer customer) throws PasswordException {
		String password = customer.getPassword();
		Pattern patternForCustomer;
		Matcher matcherForCustomer;
		patternForCustomer = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W])[A-Za-z\\d\\W]{8,}$");
		matcherForCustomer = patternForCustomer.matcher(password);
		if (!matcherForCustomer.find())
			throw new PasswordException("Weak password");

	}
}
