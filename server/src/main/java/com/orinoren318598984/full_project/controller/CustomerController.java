package com.orinoren318598984.full_project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.orinoren318598984.full_project.model.Coupon;
import com.orinoren318598984.full_project.model.Customer;
import com.orinoren318598984.full_project.service.CustomerServiceInter;

@RestController
@RequestMapping("customer/")
public class CustomerController {

	@Autowired
	private CustomerServiceInter customerService;

	@PostMapping("purchase-coupon")
	public ResponseEntity<String> PurchaseCoupon(@RequestBody List<Long> couponsId) {
		System.out.println(couponsId);
		customerService.PurchaseCoupon(couponsId);
		return ResponseEntity.ok("coupon purchse made succesfully");
	}

	@GetMapping("get-customer-coupons")
	public ResponseEntity<List<Object>> getCustomerCoupons() {
		List<Object> customerCoupons = customerService.getCustomerCouponsWithImages();
		System.out.println(customerCoupons);
		return ResponseEntity.ok(customerCoupons);
	}

	@GetMapping("get-customer-coupons-by-category")
	public ResponseEntity<List<Coupon>> getCustomerCoupons(@RequestParam("category_Id") Long categoryId) {
		List<Coupon> customerCouponsByCategory = customerService.getCustomerCoupons(categoryId);
		return ResponseEntity.ok(customerCouponsByCategory);
	}

	@GetMapping("get-customer-coupons-by-max-price")
	public ResponseEntity<List<Coupon>> getCustomerCoupons(@RequestParam("max_price") Double maxPrice) {
		List<Coupon> customerCouponsByMaxPrice = customerService.getCustomerCoupons(maxPrice);
		return ResponseEntity.ok(customerCouponsByMaxPrice);
	}

	@GetMapping("get-customer-details")
	public ResponseEntity<Customer> getCustomerDetails() {
		Customer customerDetails = customerService.getCustomerDetails();
		return ResponseEntity.ok(customerDetails);
	}
}
