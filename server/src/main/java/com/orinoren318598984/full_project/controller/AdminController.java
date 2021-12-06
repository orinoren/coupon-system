package com.orinoren318598984.full_project.controller;

import java.util.List;

import com.orinoren318598984.full_project.utils.StringResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.orinoren318598984.full_project.model.Company;
import com.orinoren318598984.full_project.model.Customer;
import com.orinoren318598984.full_project.service.AdminServiceInter;

import lombok.extern.slf4j.Slf4j;
/**
 * REST API FOR ADMINISTRATOR
 * */
@Slf4j
@RestController
@RequestMapping("admin/")
public class AdminController {

	@Autowired
	private AdminServiceInter adminService;

	@Autowired
	private StringResponse stringResponse;

	/**
	 *  Calls {@link com.orinoren318598984.full_project.service.AdminService#addCompany(Company)}
	 * @param company
	 * @return ResponseEntity with the added Company
	 */
	@PostMapping(path="company" ,consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Company> addCompany(@RequestBody Company company) {
		Company companyAdded = adminService.addCompany(company);
		return ResponseEntity.status(HttpStatus.CREATED).body(companyAdded);
	}

	/**
	 *  Calls {@link com.orinoren318598984.full_project.service.AdminService#updateCompany(Company)}
	 * @param company
	 * @return ResponseEntity with the {@link com.orinoren318598984.full_project.utils.StringResponse}
	 */
	@PutMapping("company")
	public ResponseEntity<StringResponse> updateCompany(@RequestBody Company company) {
		adminService.updateCompany(company);
		stringResponse.setMessege(company + " Updated successfully");
		return ResponseEntity.ok(stringResponse);
	}

	/**
	 *  Calls {@link com.orinoren318598984.full_project.service.AdminService#deleteCompany(Long)}
	 * @param companyId
	 * @return ResponseEntity with the {@link com.orinoren318598984.full_project.utils.StringResponse}
	 */
	@DeleteMapping("company")
	public ResponseEntity<StringResponse> deleteCompany(@RequestParam("id") Long companyId) {
		adminService.deleteCompany(companyId);
		stringResponse.setMessege("Company with id :" + companyId + " Deleted successfully ");
		return ResponseEntity.ok(stringResponse);
	}

	/**
	 * @return ResponseEntity with a list of all companies.
	 */
	@GetMapping("companies")
	public ResponseEntity<List<Company>> getAllCompanies() {
		List<Company> allCompanies = adminService.getAllCompanies();
		return ResponseEntity.ok(allCompanies); 
	}

	/**
	 *
	 * @param companyId
	 * @return ResponseEntity with Company
	 */
	@GetMapping("company")
	public ResponseEntity<Company> getOneCompany(@RequestParam("id") Long companyId) {
		Company company = adminService.getOneCompany(companyId);
		return ResponseEntity.ok(company);
	}
	/**
	 *  Calls {@link com.orinoren318598984.full_project.service.AdminService#addCustomer(Customer)}
	 * @param customer
	 * @return ResponseEntity with the added Customer
	 */
	@PostMapping("customer")
	public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer) {
		Customer addedCustomer = adminService.addCustomer(customer);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(addedCustomer);
	}


	/**
	 *  Calls {@link com.orinoren318598984.full_project.service.AdminService#updateCustomer(Customer)}
	 * @param customer
	 * @return ResponseEntity with the {@link com.orinoren318598984.full_project.utils.StringResponse}
	 */
	@PutMapping("customer")
	public ResponseEntity<StringResponse> updateCustomer(@RequestBody Customer customer) {
		adminService.updateCustomer(customer);
		stringResponse.setMessege(customer + " Updated successfully");
		return ResponseEntity.ok(stringResponse);
	}

	/**
	 *  Calls {@link com.orinoren318598984.full_project.service.AdminService#deleteCustomer(Long)}
	 * @param customerId
	 * @return ResponseEntity with the {@link com.orinoren318598984.full_project.utils.StringResponse}
	 */
	@DeleteMapping("customer")
	public ResponseEntity<StringResponse> deleteCustomer(@RequestParam("id") Long customerId) {
		adminService.deleteCustomer(customerId);
		stringResponse.setMessege("Customer with id : " + customerId + " Deleted successfully");
		return ResponseEntity.ok(stringResponse);
	}

	/**
	 * @return ResponseEntity with a list of all customers.
	 */
	@GetMapping("customers")
	public ResponseEntity<List<Customer>> getAllCustomers() {
		List<Customer> allCustomers = adminService.getAllCustomers();
		return ResponseEntity.ok(allCustomers);
	}
	/**
	 * @return ResponseEntity a customer.
	 */
	@GetMapping("customer")
	public ResponseEntity<Customer> getOneCustomer(@RequestParam("id") Long customerId) {
		log.info(customerId.toString());
		Customer customer = adminService.getOneCustomer(customerId);
		return ResponseEntity.ok(customer);
	}

}
