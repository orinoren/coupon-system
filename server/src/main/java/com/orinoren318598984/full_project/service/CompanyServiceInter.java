package com.orinoren318598984.full_project.service;

import java.util.List;
import java.util.Optional;

import com.orinoren318598984.full_project.model_wrappers.CouponWrapperForCompany;
import org.springframework.web.multipart.MultipartFile;

import com.orinoren318598984.full_project.model.Company;
import com.orinoren318598984.full_project.model.Coupon;

public interface CompanyServiceInter {

	public Coupon addCoupon(String coupon, MultipartFile file);

	public Coupon updateCoupon(String coupon,MultipartFile file);

	public void deleteCoupon(Long couponId);

	public List<Coupon> getCompanyCoupons();

	public List<Coupon> getCompanyCouponsByCategory(Long categoryId);

	public List<Coupon> getCompanyCouponsByMaxPrice(Double maxPrice);

	public List<CouponWrapperForCompany> getCompanyCouponsWithImages();

	public List<Object> getCompanyCouponsByCategoryWithImages(Long categoryId);

	public List<Object> getCompanyCouponsByMaxPriceWithImages(Double maxPrice);

	public Company getCompanyDetails();

	Long addCouponImage(MultipartFile file);

	Long updateCouponImage(MultipartFile file,Long id);

	List<CouponWrapperForCompany> getCompanyCouponsSearchResult(String searchInput, Optional<Double> maxPriceSearch , Optional<List<Integer>> categorySearch);
}
