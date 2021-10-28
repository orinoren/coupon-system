package com.orinoren318598984.full_project.controller;

import java.util.List;

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

@Slf4j
@RestController
@RequestMapping("admin/")
public class AdminController {

	@Autowired
	private AdminServiceInter adminService;

	@PostMapping(value="add-company" ,consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Company> addCompany(@RequestBody Company company) {
		log.info(company.toString());
		Company companyAdded = adminService.addCompany(company);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(companyAdded);
	}

	@PutMapping("update-company")
	public ResponseEntity<String> updateCompany(@RequestBody Company company) {
		System.out.println(company);
		adminService.updateCompany(company);
		return ResponseEntity.ok(company + " Updated succescfully");
	}

	@DeleteMapping("delete-company")
	public ResponseEntity<String> deleteCompany(@RequestParam("id") Long companyId) {
		adminService.deleteCompany(companyId);
		return ResponseEntity.ok("Company with id :" + companyId + " Deleted succesfully ");
	}
		
	@GetMapping("get-all-companies")
	public ResponseEntity<List<Company>> getAllCompanies() {
		List<Company> allCompanies = adminService.getAllCompanies();
		return ResponseEntity.ok(allCompanies); 
	}

	@GetMapping("get-one-company")
	public ResponseEntity<Company> getOneCompany(@RequestParam("id") Long companyId) {
		Company company = adminService.getOneCompany(companyId);
		return ResponseEntity.ok(company);
	}

	@PostMapping("add-customer")
	public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer) {
		Customer addedCustomer = adminService.addCustomer(customer);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(addedCustomer);
	}

	@PutMapping("update-customer")
	public ResponseEntity<String> updateCustomer(@RequestBody Customer customer) {
		adminService.updateCustomer(customer);
		return ResponseEntity.ok(customer + " Updated succesfully");
	}

	@DeleteMapping("delete-customer")
	public ResponseEntity<String> deleteCustomer(@RequestParam("id") Long customerId) {
		adminService.deleteCustomer(customerId);
		return ResponseEntity.ok("Customer with id : " + customerId + " Deleted succesfully");
	}

	@GetMapping("get-all-customers")
	public ResponseEntity<List<Customer>> getAllCustomers() {
		List<Customer> allCustomers = adminService.getAllCustomers();
		return ResponseEntity.ok(allCustomers);
	}

	@GetMapping("get-one-customer")
	public ResponseEntity<Customer> getOneCustomer(@RequestParam("id") Long customerId) {
		log.info(customerId.toString());
		Customer customer = adminService.getOneCustomer(customerId);
		return ResponseEntity.ok(customer);
	}

}
