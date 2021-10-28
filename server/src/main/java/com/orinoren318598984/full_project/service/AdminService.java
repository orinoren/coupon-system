package com.orinoren318598984.full_project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.orinoren318598984.full_project.exepction.NameException;
import com.orinoren318598984.full_project.exepction.NotFoundException;
import com.orinoren318598984.full_project.model.Company;
import com.orinoren318598984.full_project.model.Customer;
import com.orinoren318598984.full_project.repository.CompanyRepo;
import com.orinoren318598984.full_project.repository.CustomerRepo;
import com.orinoren318598984.full_project.utils.CompanyValid;
import com.orinoren318598984.full_project.utils.CustomerValid;

@Service
public class AdminService implements ClientService, AdminServiceInter {
	@Autowired
	private CompanyRepo companyDao;
	@Autowired
	private CustomerRepo customerDao;
	@Autowired
	private CompanyValid companyValid;
	@Autowired
	private CustomerValid customerValid;

	@Override
	public Optional<Boolean> login(String email, String password) {
		if (email.equalsIgnoreCase("admin@admin.com") && password.equalsIgnoreCase("admin")) {
			return Optional.of(true);
		}
		return Optional.of(false);
	}

	@Override
	@Transactional(readOnly = false)
	public Company addCompany(Company company) {
		companyValid.companyValidCheck(company, this.getAllCompanies());
		return companyDao.save(company);

	}

	@Override
	@Transactional(readOnly = false)
	public void updateCompany(Company company) {
		Optional<Company> optionalCompany = companyDao.findById(company.getId());
		if (optionalCompany.isPresent()) {
			if (!optionalCompany.get().getName().equals(company.getName())) {
				throw new NameException("you cant update company name");
			}
			companyValid.companyValidCheck(company, this.getAllCompanies());
			companyDao.save(company);

		} else {
			throw new NotFoundException("company with id  : " + company.getId() + " not found please try again");
		}
	}

	@Override
	@Transactional(readOnly = false)
	public void deleteCompany(Long companyId) {
		Optional<Company> optionalCompany = companyDao.findById(companyId);
		if (optionalCompany.isPresent()) {
			companyDao.deleteById(companyId);

		} else {
			throw new NotFoundException("Company with id : " + companyId + " not found please try again");
		}
	}

	@Override
	public List<Company> getAllCompanies() {
		return companyDao.findAll();
	}

	@Override
	public Company getOneCompany(Long companyId) {

		return companyDao.findById(companyId)
				.orElseThrow(() -> new NotFoundException("company with id : " + companyId + " not found"));
	}

	@Override
	@Transactional(readOnly = false)
	public Customer addCustomer(Customer customer) {
		customerValid.customerValidCheck(customer, this.getAllCustomers());
		Customer customerAdded = customerDao.save(customer);
		System.out.println(customerAdded + "\nAdded succesfully");
		return customerAdded;
	}

	@Override
	@Transactional(readOnly = false)
	public void updateCustomer(Customer customer) {
		Optional<Customer> optionalCustomer = customerDao.findById(customer.getId());
		if (optionalCustomer.isPresent()) {
			customerValid.customerValidCheck(customer, this.getAllCustomers());
			customerDao.save(customer);
		} else {
			throw new NotFoundException("Customer with id : " + customer.getId() + " not found please try again");
		}

	}

	@Override
	@Transactional(readOnly = false)
	public void deleteCustomer(Long customerIdToDelete) {
		Optional<Customer> optionalCustomer = customerDao.findById(customerIdToDelete);
		if (optionalCustomer.isPresent()) {

			customerDao.deleteById(customerIdToDelete);
		} else {
			throw new NotFoundException("Customer with id : " + customerIdToDelete + " not found please try again");
		}
	}

	@Override
	public List<Customer> getAllCustomers() {
		List<Customer> customerList = customerDao.findAll();
		return customerList;
	}

	@Override
	public Customer getOneCustomer(Long customerId) {
		return customerDao.findById(customerId)
				.orElseThrow(() -> new NotFoundException("customer with id : " + customerId + " not found"));
	}
}