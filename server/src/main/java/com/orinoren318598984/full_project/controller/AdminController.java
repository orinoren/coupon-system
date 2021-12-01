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

@Slf4j
@RestController
@RequestMapping("admin/")
public class AdminController {

	@Autowired
	private AdminServiceInter adminService;

	@Autowired
	private StringResponse stringResponse;

	@PostMapping(path="company" ,consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Company> addCompany(@RequestBody Company company) {
		Company companyAdded = adminService.addCompany(company);
		return ResponseEntity.status(HttpStatus.CREATED).body(companyAdded);
	}

	@PutMapping("company")
	public ResponseEntity<StringResponse> updateCompany(@RequestBody Company company) {
		adminService.updateCompany(company);
		stringResponse.setMessege(company + " Updated successfully");
		return ResponseEntity.ok(stringResponse);
	}

	@DeleteMapping("company")
	public ResponseEntity<StringResponse> deleteCompany(@RequestParam("id") Long companyId) {
		adminService.deleteCompany(companyId);
		stringResponse.setMessege("Company with id :" + companyId + " Deleted successfully ");
		return ResponseEntity.ok(stringResponse);
	}
		
	@GetMapping("companies")
	public ResponseEntity<List<Company>> getAllCompanies() {
		List<Company> allCompanies = adminService.getAllCompanies();
		return ResponseEntity.ok(allCompanies); 
	}

	@GetMapping("company")
	public ResponseEntity<Company> getOneCompany(@RequestParam("id") Long companyId) {
		Company company = adminService.getOneCompany(companyId);
		return ResponseEntity.ok(company);
	}

	@PostMapping("customer")
	public ResponseEntity<Customer> addCustomer(@RequestBody Customer customer) {
		Customer addedCustomer = adminService.addCustomer(customer);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(addedCustomer);
	}

	@PutMapping("customer")
	public ResponseEntity<StringResponse> updateCustomer(@RequestBody Customer customer) {
		adminService.updateCustomer(customer);
		stringResponse.setMessege(customer + " Updated successfully");
		return ResponseEntity.ok(stringResponse);
	}

	@DeleteMapping("customer")
	public ResponseEntity<StringResponse> deleteCustomer(@RequestParam("id") Long customerId) {
		adminService.deleteCustomer(customerId);
		stringResponse.setMessege("Customer with id : " + customerId + " Deleted successfully");
		return ResponseEntity.ok(stringResponse);
	}

	@GetMapping("customers")
	public ResponseEntity<List<Customer>> getAllCustomers() {
		List<Customer> allCustomers = adminService.getAllCustomers();
		return ResponseEntity.ok(allCustomers);
	}

	@GetMapping("customer")
	public ResponseEntity<Customer> getOneCustomer(@RequestParam("id") Long customerId) {
		log.info(customerId.toString());
		Customer customer = adminService.getOneCustomer(customerId);
		return ResponseEntity.ok(customer);
	}

}
