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

	@Query(value = "select c, com.name ,ci.image ,count(*)\n" +
			"from Coupon as c\n" +
			"left join CouponPurchase as cp on cp.couponPurchaseId=c.id  \n" +
			"join CouponImage as ci on c.couponImage = ci.id\n" +
			"join Company as com on c.company = com.id\n"+
			"group by \n" +
			"c.id\n" +
			"order by count(*)\n" +
			"desc")
	List<Object>findAllCouponsAndImages();
	
	List<Coupon> findByEndDateBefore(LocalDate expireDate);

	void deleteByEndDateBefore(LocalDate expireDate);
	
	@Query(value = "select c ,ci.image from Coupon c inner join CouponImage ci on c.couponImage = ci.id and c.company.id=?1")
	List<Object> findByCompanyIdWithImages(Long companyId);
	@Query(value = "select c ,ci.image from Coupon c inner join CouponImage ci on c.couponImage = ci.id and c.company.id=?1 and c.category=?2")
	List<Object> findByCompanyIdAndCategoryIdWithImages(Long companyId, Long categoryId);
	@Query(value = "select c ,ci.image from Coupon c inner join CouponImage ci on c.couponImage = ci.id and c.company.id=?1 and c.price=?2")
	List<Object> findByCompanyIdAndPriceLessThanWithImages(Long companyId, Double maxPrice);

	@Query(value = "select c , ci.image,count(*) from Coupon c join c.couponPurchase as cp on cp.customerPurchaseId=?1 join CouponImage as ci on c.couponImage=ci.id group by c.id")
	List<Object> findByCouponPurchaseCustomerPurchaseIdWithImages(Customer customerId);
	@Query(value = "select c ,ci.image from Coupon c ,CouponPurchase as cp inner join CouponImage ci on c.couponImage = ci.id and cp.customerPurchaseId=?1 and c.category=?2")
	List<Object> findByCouponPurchaseCustomerPurchaseIdAndCategoryIdIdWithImages(Long customerId, Long categoryId);
	@Query(value = "select c ,ci.image from Coupon c ,CouponPurchase as cp inner join CouponImage ci  on c.couponImage = ci.id and cp.customerPurchaseId=?1 and c.price=?2")
	List<Object> findByCouponPurchaseCustomerPurchaseIdAndPriceLessThanWithImages(Long customerId, Double maxPrice);
	
	List<Coupon> findByCompanyId(Long companyId);
	List<Coupon> findByCompanyIdAndCategoryId(Long companyId, Long categoryId);
	List<Coupon> findByCompanyIdAndPriceLessThan(Long companyId, Double maxPrice);
	List<Coupon> findByCouponPurchaseCustomerPurchaseId(Long customerId);
	List<Coupon> findByCouponPurchaseCustomerPurchaseIdAndCategoryId(Long customerId, Long categoryId);
 	List<Coupon> findByCouponPurchaseCustomerPurchaseIdAndPriceLessThan(Long customerId, Double maxPrice);
}
