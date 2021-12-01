package com.orinoren318598984.full_project.controller;

import java.util.List;

import com.orinoren318598984.full_project.model_wrappers.CouponWrapper;
import com.orinoren318598984.full_project.model_wrappers.CouponWrapperForCompany;
import com.orinoren318598984.full_project.service.Role;
import com.orinoren318598984.full_project.utils.StringResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
    private StringResponse stringResponse;

    @PostMapping("coupon")
    public ResponseEntity<Coupon> addCoupon(@RequestParam(value = "file", required = false) MultipartFile file, @RequestParam("coupon") String coupon) {
        Coupon addedCoupon = companyService.addCoupon(coupon, file);
        return ResponseEntity.status(HttpStatus.CREATED).body(addedCoupon);
    }

    @PutMapping("coupon")
    public ResponseEntity<Coupon> updateCoupon(@RequestParam(value = "file", required = false) MultipartFile file, @RequestParam("coupon") String coupon) {
        Coupon updatedCoupon = companyService.updateCoupon(coupon, file);
        return ResponseEntity.ok(updatedCoupon);

    }

    @DeleteMapping("coupon")
    public ResponseEntity<StringResponse> deleteCoupon(@RequestParam("id") Long couponId) {
        companyService.deleteCoupon(couponId);
        stringResponse.setMessege("Coupon with id : " + couponId + " Deleted successfully");
        return ResponseEntity.ok(stringResponse);

    }

    @GetMapping("coupons")
    public ResponseEntity<List<CouponWrapperForCompany>> getCompanyCoupons() {
        List<CouponWrapperForCompany> couponWrappers = companyService.getCompanyCouponsWithImages();
        return ResponseEntity.ok(couponWrappers);

    }

    @GetMapping("coupons/{category}")
    public ResponseEntity<List<Object>> getCompanyCouponsByCategory(@PathVariable("category") Long categoryId) {
        List<Object> companyCouponsByCategory = companyService.getCompanyCouponsByCategoryWithImages(categoryId);
        return ResponseEntity.ok(companyCouponsByCategory);
    }

    @GetMapping(path = "coupons", params = "price")
    public ResponseEntity<List<Object>> getCompanyCouponsByMaxPrice(@RequestParam("price") Double maxPrice) {
        List<Object> companyCouponsByMaxPrice = companyService.getCompanyCouponsByMaxPriceWithImages(maxPrice);
        return ResponseEntity.ok(companyCouponsByMaxPrice);
    }

    @GetMapping("details")
    public ResponseEntity<Company> getCompanyDetails() {
        return ResponseEntity.ok(companyService.getCompanyDetails());
    }

}
