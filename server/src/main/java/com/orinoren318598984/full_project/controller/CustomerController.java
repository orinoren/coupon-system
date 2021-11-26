package com.orinoren318598984.full_project.controller;

import java.util.List;

import com.orinoren318598984.full_project.model_wrappers.CouponWrapper;
import com.orinoren318598984.full_project.model_wrappers.CouponWrapperForCustomer;
import com.orinoren318598984.full_project.service.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.orinoren318598984.full_project.model.Coupon;
import com.orinoren318598984.full_project.model.Customer;
import com.orinoren318598984.full_project.service.CustomerServiceInter;

@RestController
@RequestMapping("customer/")
public class CustomerController {

    @Autowired
    private CustomerServiceInter customerService;

    @PostMapping("coupon")
    public ResponseEntity<String> PurchaseCoupon(@RequestBody List<Long> couponsId) {
        System.out.println(couponsId);
        customerService.PurchaseCoupon(couponsId);
        return ResponseEntity.ok("coupon purchase made successfully");
    }

    @GetMapping("coupons")
    public ResponseEntity<List<CouponWrapperForCustomer>> getCustomerCoupons() {
        CouponWrapper wrapper = new CouponWrapperForCustomer();
        List<Object> customerCoupons = customerService.getCustomerCouponsWithImages();
        List<CouponWrapperForCustomer> couponWrapperList =(List<CouponWrapperForCustomer>)wrapper.convertMultiDimensionListToOneDimensionArray(customerCoupons);
        return ResponseEntity.ok(couponWrapperList);
    }

    @GetMapping("coupons/{category}")
    public ResponseEntity<List<Coupon>> getCustomerCoupons(@PathVariable("category") Long categoryId) {
        List<Coupon> customerCouponsByCategory = customerService.getCustomerCoupons(categoryId);
        return ResponseEntity.ok(customerCouponsByCategory);
    }

    @GetMapping(path = "coupons",params = "price")
    public ResponseEntity<List<Coupon>> getCustomerCoupons(@RequestParam("price") Double maxPrice) {
        List<Coupon> customerCouponsByMaxPrice = customerService.getCustomerCoupons(maxPrice);
        return ResponseEntity.ok(customerCouponsByMaxPrice);
    }

    @GetMapping("details")
    public ResponseEntity<Customer> getCustomerDetails() {
        Customer customerDetails = customerService.getCustomerDetails();
        return ResponseEntity.ok(customerDetails);
    }
}
