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

/**
 * AdminService
 * this class is responsible for all the business logic for admin operation
 * and works as a middleware between the admin controller layer and the dao layer
 */
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

    /**
     * Checks if the email and password match the admin credentials. <br/>
     * if true return Optional with true else Optional with false.
     *
     * @param email    admin user email
     * @param password admin user password
     * @return Optional with true if the email and password match the admin credentials else Optional with false.
     */
    @Override
    public Optional<Boolean> login(String email, String password) {
        String adminEmail = "admin@admin.com";
        String adminPassword = "admin";
        if (adminEmail.equalsIgnoreCase(email) && adminPassword.equalsIgnoreCase(password)) {
            return Optional.of(true);
        }
        return Optional.of(false);
    }


    /**
     * 1. Calls {@link CompanyValid#companyValidCheck(Company, List)} to check if company details are valid.<br/>
     * if valid calls {@link CompanyRepo#save(Object)} to add the company to the database.
     *
     * @param company company object
     * @return added company
     */
    @Override
    @Transactional(readOnly = false)
    public Company addCompany(Company company) {
        companyValid.companyValidCheck(company, this.getAllCompanies());
        return companyDao.save(company);

    }

    /**
     * 1. checking if company is exist with {@link CompanyRepo#findById(Object)}
     * if not exist throw {@link NotFoundException} else
     * {@code optionalCompany} retrieved from the database <br/>
     * 2. checking if {@code optionalCompany} and {@code company} names are the same
     * if not {@link NameException}
     * thrown<br/>
     * 3. checking if company Details are valid
     * {@link CompanyValid#companyValidCheck(Company, List)}  if valid and no
     * exception as been thrown company details pass to
     * {@link CompanyRepo#save(Object)}
     *
     * @param company
     */
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

    /**
     * 1. checking if company is exist with {@link CompanyRepo#findById(Object companyId)}
     * if not exist throw {@link NotFoundException} else
     * {@code optionalCompany} retrieved from the database <br/>
     * 2. company id pass to {@link CompanyRepo#deleteById(Object)} to delete from the database.
     *
     * @param companyId
     */
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

    /**
     * 1. checking if company is exist with
     * {@link CompanyRepo#findById(Object)} if exist returns it else
     * throw {@link NotFoundException}
     *
     * @param companyId
     * @throws NotFoundException if not exist
     */
    @Override
    public Company getOneCompany(Long companyId) {

        return companyDao.findById(companyId)
                .orElseThrow(() -> new NotFoundException("company with id : " + companyId + " not found"));
    }

    /**
     * 1. checking if customer Details are valid
     * {@link CustomerValid#customerValidCheck(Customer, List)}  } if valid and no
     * exception as been thrown customer details pass to
     * {@link CompanyRepo#save(Object customer)}
     *
     * @param customer
     */
    @Override
    @Transactional(readOnly = false)
    public Customer addCustomer(Customer customer) {
        customerValid.customerValidCheck(customer, this.getAllCustomers());
        Customer customerAdded = customerDao.save(customer);
        return customerAdded;
    }


    /**
     * 1. checking if the customer exist with
     * {@link CustomerRepo#findById(Object customerId)} if not exist throw
     * {@link NotFoundException}<br/>
     * 2. checking if customer Details are valid
     * {@link CustomerValid#customerValidCheck(Customer, List)} if valid and no
     * exception as been thrown customer details pass to
     * {@link CustomerRepo#save(Object customer)}
     *
     * @param customer
     */
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


    /**
     * 1. checking if the customer exist with
     * {@link CustomerRepo#findById(Object customerId)}  if not exist throw {@link
     * NotFoundException} else {@code optionalCustomer} retrieved from the database
     * <br/>
     * 2. customer id pass to {@link CustomerRepo#deleteById(Object customerId) to delete the customer from
     * the database.
     *
     * @param customerIdToDelete
     */
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

    /**
     * 1. checking if the customer exist with
     * {@link CustomerRepo#findById(Object customerId)}  if exist returns it else
     * throw {@link NotFoundException}
     *
     * @param customerId
     * @return customer
     * @throws NotFoundException if not exist
     */
    @Override
    public Customer getOneCustomer(Long customerId) {
        return customerDao.findById(customerId)
                .orElseThrow(() -> new NotFoundException("customer with id : " + customerId + " not found"));
    }
}