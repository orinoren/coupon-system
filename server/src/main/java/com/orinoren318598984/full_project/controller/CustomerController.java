package com.orinoren318598984.full_project.controller;

import java.util.List;
import java.util.Optional;

import com.orinoren318598984.full_project.model_wrappers.CouponWrapper;
import com.orinoren318598984.full_project.model_wrappers.CouponWrapperForCompany;
import com.orinoren318598984.full_project.model_wrappers.CouponWrapperForCustomer;
import com.orinoren318598984.full_project.service.CompanyServiceInter;
import com.orinoren318598984.full_project.service.Role;
import com.orinoren318598984.full_project.utils.StringResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.orinoren318598984.full_project.model.Coupon;
import com.orinoren318598984.full_project.model.Customer;
import com.orinoren318598984.full_project.service.CustomerServiceInter;

/**
 * REST API FOR CUSTOMER
 */
@RestController
@RequestMapping("customer/")
public class CustomerController {

    @Autowired
    private CustomerServiceInter customerService;

    @Autowired
    private StringResponse stringResponse;

    /**
     * Calls {@link CustomerServiceInter#purchaseCoupon(List)}  }
     * @param couponsId - contains all coupons id that the customer wants to purchase.
     * @return ResponseEntity with <code>StringResponse</code>
     */
    @PostMapping("coupon")
    public ResponseEntity<StringResponse> purchaseCoupon(@RequestBody List<Long> couponsId) {
        customerService.purchaseCoupon(couponsId);
        stringResponse.setMessege("coupon purchase made successfully");
        return ResponseEntity.ok(stringResponse);
    }

    /**
     * Calls {@link CustomerServiceInter#getCustomerCouponsWithImages()}
     * @return ResponseEntity with a list of {@link com.orinoren318598984.full_project.model_wrappers.CouponWrapperForCustomer}
     */
    @GetMapping("coupons")
    public ResponseEntity<List<CouponWrapperForCustomer>> getCustomerCoupons() {
        return ResponseEntity.ok(customerService.getCustomerCouponsWithImages());
    }
    /**
     * Calls {@link CustomerServiceInter#getCustomerCouponsWithImages(Long)}}
     * @param categoryId
     * @return ResponseEntity with a list of Objects
     */
    @GetMapping("coupons/{category}")
    public ResponseEntity<List<Coupon>> getCustomerCoupons(@PathVariable("category") Long categoryId) {
        List<Coupon> customerCouponsByCategory = customerService.getCustomerCoupons(categoryId);
        return ResponseEntity.ok(customerCouponsByCategory);
    }

    /**
     * Calls {@link CustomerServiceInter#getCustomerCoupons(Double)}
     * @param maxPrice
     * @return ResponseEntity with a list of Objects
     */
    @GetMapping(path = "coupons",params = "price")
    public ResponseEntity<List<Coupon>> getCustomerCoupons(@RequestParam("price") Double maxPrice) {
        List<Coupon> customerCouponsByMaxPrice = customerService.getCustomerCoupons(maxPrice);
        return ResponseEntity.ok(customerCouponsByMaxPrice);
    }

    /**
     * Calls {@link CustomerServiceInter#getCustomerDetails()}
     * @return ResponseEntity with a Customer
     */
    @GetMapping("details")
    public ResponseEntity<Customer> getCustomerDetails() {
        Customer customerDetails = customerService.getCustomerDetails();
        return ResponseEntity.ok(customerDetails);
    }
    @GetMapping({"search/{searchInput}","search/{searchInput}/{maxPriceSearch}/{categorySearch}"})
    public ResponseEntity<List<CouponWrapperForCustomer>> getSearchCustomerCouponResult(@PathVariable String searchInput, @PathVariable Optional<Double> maxPriceSearch , @PathVariable Optional<List<Integer>>categorySearch) {
        return ResponseEntity.ok(customerService.getCustomerCouponsSearchResult(searchInput,maxPriceSearch,categorySearch));
    }

}
