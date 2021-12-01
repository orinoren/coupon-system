package com.orinoren318598984.full_project.controller;

import java.util.List;

import com.orinoren318598984.full_project.model_wrappers.CouponWrapper;
import com.orinoren318598984.full_project.model_wrappers.CouponWrapperForCustomer;
import com.orinoren318598984.full_project.service.Role;
import com.orinoren318598984.full_project.utils.StringResponse;
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

    @Autowired
    private StringResponse stringResponse;
    @PostMapping("coupon")
    public ResponseEntity<StringResponse> PurchaseCoupon(@RequestBody List<Long> couponsId) {
        customerService.PurchaseCoupon(couponsId);
        stringResponse.setMessege("coupon purchase made successfully");
        return ResponseEntity.ok(stringResponse);
    }

    @GetMapping("coupons")
    public ResponseEntity<List<CouponWrapperForCustomer>> getCustomerCoupons() {

        return ResponseEntity.ok(customerService.getCustomerCouponsWithImages());
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
