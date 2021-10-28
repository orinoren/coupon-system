package com.orinoren318598984.full_project.utils;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Component;

import com.orinoren318598984.full_project.exepction.EmailException;
import com.orinoren318598984.full_project.exepction.NameException;
import com.orinoren318598984.full_project.exepction.PasswordException;
import com.orinoren318598984.full_project.model.Company;

/**
 * this class responsible for customer properties validation
 */

@Component
public class CompanyValid {


	/**
	 * this method is for company validation and calls all the validation
	 * methods that required for the company {@link#companyNameValidCheck} ;
	 * {@link#companyEmailValidCheck} ; {@link#companyPasswordValidCheck}
	 * 
	 * @param company
	 * @throws NameException
	 * @throws EmailException
	 * @throws PasswordException
	 */
	public void companyValidCheck(Company company , List<Company> allCompanies) throws NameException, EmailException, PasswordException {
		companyNameValidCheck(company , allCompanies);
		companyEmailValidCheck(company , allCompanies);
		companyPasswordValidCheck(company);

	}

	/**
	 * validation for company name; 1 : uses regex to make sure the name contain
	 * first character as a letter ; 2 : check if names contain less then 254
	 * characters ; 3 : check if company name already exist in the system ;
	 * 
	 * @param company
	 * @throws NameException
	 */

	public void companyNameValidCheck(Company company , List<Company> allCompanies) throws NameException {
		String name = company.getName();
		boolean uniqueName = true;
		Pattern patternForCompanyName;
		Matcher matcherForCompany;
		patternForCompanyName = Pattern.compile("^[A-Z]+[A-Z0-9\\W]*{1,254}$", Pattern.CASE_INSENSITIVE);
		matcherForCompany = patternForCompanyName.matcher(name);
		if (matcherForCompany.find()) {
			for (Company companyIter : allCompanies) {
				if (!companyIter.getId().equals(company.getId())) {
					if (companyIter.getName().equalsIgnoreCase(name)) {
						uniqueName = false;
						throw new NameException("Sorry Company name is already taken please try again");
					}
				}
			}

			if (uniqueName) {
				company.setName(name);
			}
		} else if (name.length() > 254) {
			throw new NameException("Company name not valid (contains more then 254 charactes)");
		} else {
			throw new NameException("Company name not valid (name cannot contain symbols \\ digit at first");
		}
	}

	/**
	 * validation for customer_Email; 1 : uses regex to make sure the email in a
	 * valid pattern ; 2 : check if email contain less then 254 characters; 3 :
	 * check if company email does not already exist in the system;
	 * 
	 * @param company
	 * throws EmailException
	 */
	public void companyEmailValidCheck(Company company,List<Company>allCompanies) throws EmailException {
		String email = company.getEmail();
		boolean uniqueEmail = true;
		Pattern patternForCompanyEmail;
		Matcher matcherForCompanyEmail;
		patternForCompanyEmail = Pattern.compile("^[^@]+@[^@.]+\\.[A-Z.]{2,6}$", Pattern.CASE_INSENSITIVE);
		matcherForCompanyEmail = patternForCompanyEmail.matcher(email);
		if (matcherForCompanyEmail.find()) {
			for (Company companyItreator : allCompanies) {
				if (!companyItreator.getId().equals(company.getId())) {
					if (companyItreator.getEmail().equalsIgnoreCase("admin@admin.com")
							|| companyItreator.getEmail().equalsIgnoreCase(email)) {
						uniqueEmail = false;
						throw new EmailException("Sorry Company email already taken please try again");
					}
				}
			}
			if (uniqueEmail) {
				company.setEmail(email);
			}
		} else {
			throw new EmailException("Email not valid");

		}
	}

	/**
	 * validation for company_password 1 :uses regex to make sure the password match
	 * the pattern at least 1(capital letter,lower letter , symbol ,number) and 8 or
	 * more characters ;
	 * 
	 * @param comapny
	 * @throws PasswordException
	 */
	public void companyPasswordValidCheck(Company company) throws PasswordException {
		String password = company.getPassword();
		Pattern patternForCompany;
		Matcher matcherForCompany;
		patternForCompany = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W])[A-Za-z\\d\\W]{8,}$");
		matcherForCompany = patternForCompany.matcher(password);
		if (!matcherForCompany.find()) {
			throw new PasswordException("Weak password try again");
		} else {
			company.setPassword(password);
		}
	}
}
