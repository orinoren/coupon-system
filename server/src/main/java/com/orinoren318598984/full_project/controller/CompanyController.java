package com.orinoren318598984.full_project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.orinoren318598984.full_project.model.Company;
import com.orinoren318598984.full_project.model.Coupon;
import com.orinoren318598984.full_project.service.CompanyServiceInter;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("company/")
public class CompanyController {

	@Autowired
	private CompanyServiceInter companyService;
	@Autowired
	private ObjectMapper objectMapper;


	@PostMapping("add-coupon")
	public ResponseEntity<Coupon> addCoupon(@RequestParam(value = "file" ,required = false) MultipartFile file, @RequestParam("coupon") String coupon) {
		Coupon couponObj = null;
		try {
			if(file==null) {
				log.info("isnull");
			}
			log.info(coupon);
			couponObj = objectMapper.readValue(coupon, Coupon.class);
		} catch (JsonProcessingException e) {
			log.info("error");
		}
		Coupon addedCoupon = companyService.addCoupon(couponObj, file);
		return ResponseEntity.status(HttpStatus.CREATED).body(addedCoupon);
	}

	@PutMapping("update-coupon")
	public ResponseEntity<Coupon> updateCoupon(@RequestParam(value = "file" ,required = false) MultipartFile file,@RequestParam("coupon") String coupon) {
		Coupon couponObj = null;
		try {
			couponObj = objectMapper.readValue(coupon, Coupon.class);
		} catch (JsonProcessingException e) {
			log.info("error");
			e.printStackTrace();
		}
		Coupon updatedCoupon = companyService.updateCoupon(couponObj,file);
		return ResponseEntity.ok(updatedCoupon);

	}

	@DeleteMapping("delete-coupon")
	public ResponseEntity<String> deleteCoupon(@RequestParam("id") Long couponId) {
		companyService.deleteCoupon(couponId);
		return ResponseEntity.ok("Coupon with id : " + couponId + " Deleted successfully");

	}

	@GetMapping("get-company-coupons")
	public ResponseEntity<List<Object>> getCompanyCoupons() {
		return ResponseEntity.ok(companyService.getCompanyCouponsWithImages());
	}

	@GetMapping("get-company-coupons-by-category")
	public ResponseEntity<List<Object>> getCompanyCouponsByCategory(@RequestParam("categoryId") Long categoryId) {
		List<Object> companyCouponsByCategory = companyService.getCompanyCouponsByCategoryWithImages(categoryId);
		return ResponseEntity.ok(companyCouponsByCategory);
	}

	@GetMapping("get-company-by-max-price")
	public ResponseEntity<List<Object>> getCompanyCouponsByMaxPrice(@RequestParam("maxPrice") Double maxPrice) {
		List<Object> companyCouponsByMaxPrice = companyService.getCompanyCouponsByMaxPriceWithImages(maxPrice);
		return ResponseEntity.ok(companyCouponsByMaxPrice);
	}

	@GetMapping("153")
	public ResponseEntity<Company> getCompanyDetails() {
		companyService.getCompanyDetails();
		return null;
	}

}
