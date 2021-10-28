package com.orinoren318598984.full_project.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.orinoren318598984.full_project.model.Coupon;
import com.orinoren318598984.full_project.model.Customer;

@Repository
public interface CouponRepo extends JpaRepository<Coupon, Long> {

	@Query(value = "select c ,ci.image from Coupon c inner join CouponImage ci on c.couponImage = ci.id")
	List<Object>findAllCouponAndImages();
	
	List<Coupon> findByEndDateBefore(LocalDate expireDate);

	void deleteByEndDateBefore(LocalDate expireDate);
	
	@Query(value = "select c ,ci.image from Coupon c inner join CouponImage ci on c.couponImage = ci.id and c.companyOfCoupon.id=?1")
	List<Object> findByCompanyOfCouponIdWithImages(Long companyId);
	@Query(value = "select c ,ci.image from Coupon c inner join CouponImage ci on c.couponImage = ci.id and c.companyOfCoupon.id=?1 and c.categoryOfCoupon=?2")
	List<Object> findByCompanyOfCouponIdAndCategoryOfCouponIdWithImages(Long companyId, Long categoryId);
	@Query(value = "select c ,ci.image from Coupon c inner join CouponImage ci on c.couponImage = ci.id and c.companyOfCoupon.id=?1 and c.price=?2")
	List<Object> findByCompanyOfCouponIdAndPriceLessThanWithImages(Long companyId, Double maxPrice);

	@Query(value = "select c , ci.image from Coupon c join c.couponPurchase as cp on cp.customerPurchaseId=?1 join CouponImage as ci on c.couponImage=ci.id")
	List<Object> findByCouponPurchaseCustomerPurchaseIdWithImages(Customer customerId);
	@Query(value = "select c ,ci.image from Coupon c ,CouponPurchase as cp inner join CouponImage ci on c.couponImage = ci.id and cp.customerPurchaseId=?1 and c.categoryOfCoupon=?2")
	List<Object> findByCouponPurchaseCustomerPurchaseIdAndCategoryOfCouponIdWithImages(Long customerId, Long categoryId);
	@Query(value = "select c ,ci.image from Coupon c ,CouponPurchase as cp inner join CouponImage ci  on c.couponImage = ci.id and cp.customerPurchaseId=?1 and c.price=?2")
	List<Object> findByCouponPurchaseCustomerPurchaseIdAndPriceLessThanWithImages(Long customerId, Double maxPrice);
	
	List<Coupon> findByCompanyOfCouponId(Long companyId);
	List<Coupon> findByCompanyOfCouponIdAndCategoryOfCouponId(Long companyId, Long categoryId);
	List<Coupon> findByCompanyOfCouponIdAndPriceLessThan(Long companyId, Double maxPrice);
	List<Coupon> findByCouponPurchaseCustomerPurchaseId(Long customerId);
	List<Coupon> findByCouponPurchaseCustomerPurchaseIdAndCategoryOfCouponId(Long customerId, Long categoryId);
	List<Coupon> findByCouponPurchaseCustomerPurchaseIdAndPriceLessThan(Long customerId, Double maxPrice);
}
