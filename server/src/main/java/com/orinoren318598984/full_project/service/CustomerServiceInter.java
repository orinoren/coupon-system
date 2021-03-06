package com.orinoren318598984.full_project.service;

import java.util.List;
import java.util.Optional;

import com.orinoren318598984.full_project.model.Coupon;
import com.orinoren318598984.full_project.model.Customer;
import com.orinoren318598984.full_project.model_wrappers.CouponWrapperForCompany;
import com.orinoren318598984.full_project.model_wrappers.CouponWrapperForCustomer;

public interface CustomerServiceInter {

	public void purchaseCoupon(List<Long> couponsId);


	public List<Coupon> getCustomerCoupons();

	public List<Coupon> getCustomerCoupons(Long categoryId);

	public List<Coupon> getCustomerCoupons(Double maxPrice);

	public List<CouponWrapperForCustomer> getCustomerCouponsWithImages();

	public List<Object> getCustomerCouponsWithImages(Long categoryId);

	public List<Object> getCustomerCouponsWithImages(Double maxPrice);

	public Customer getCustomerDetails();

	List<CouponWrapperForCustomer> getCustomerCouponsSearchResult(String searchInput, Optional<Double> maxPriceSearch , Optional<List<Integer>> categorySearch);

}
