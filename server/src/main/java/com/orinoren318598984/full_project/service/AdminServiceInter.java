package com.orinoren318598984.full_project.service;

import java.util.List;

import com.orinoren318598984.full_project.model.Company;
import com.orinoren318598984.full_project.model.Customer;

public interface AdminServiceInter {

	public Company addCompany(Company company);

	public void updateCompany(Company company);

	public void deleteCompany(Long companyId);

	public List<Company> getAllCompanies();

	public Company getOneCompany(Long companyId);

	public Customer addCustomer(Customer customer);

	public void updateCustomer(Customer customer);

	public void deleteCustomer(Long customerId);

	public List<Customer> getAllCustomers();

	public Customer getOneCustomer(Long customerId);
}
