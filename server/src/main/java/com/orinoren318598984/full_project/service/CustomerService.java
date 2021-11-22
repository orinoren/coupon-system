package com.orinoren318598984.full_project.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.annotation.RequestScope;

import com.orinoren318598984.full_project.exepction.CouponPurchaseException;
import com.orinoren318598984.full_project.exepction.NotFoundException;
import com.orinoren318598984.full_project.model.Coupon;
import com.orinoren318598984.full_project.model.CouponPurchase;
import com.orinoren318598984.full_project.model.Customer;
import com.orinoren318598984.full_project.repository.CouponPurchaseDao;
import com.orinoren318598984.full_project.repository.CouponRepo;
import com.orinoren318598984.full_project.repository.CustomerRepo;

import lombok.NoArgsConstructor;

@Service
@RequestScope
@NoArgsConstructor
public class CustomerService implements ClientService, CustomerServiceInter {

	@Autowired
	private CustomerRepo customerDao;

	@Autowired
	private CouponPurchaseDao CouponPurchaseDao;
	@Autowired
	private CouponRepo couponDao;

	@Autowired
	private UserDetailsService userDetails;

	@Override
	public Optional<Customer> login(String email, String password) {
		Optional<Customer> optionalCustomer = customerDao.findByEmailAndPassword(email, password);
		if (optionalCustomer.isPresent()) {
			return optionalCustomer;
		}
		return Optional.empty();
	}

	@Override
	@Transactional(readOnly = false)
	public synchronized void PurchaseCoupon(List<Long> couponsId) throws NotFoundException {
		System.out.println(getCustomerId());
		Customer thisCustomer = customerDao.findById(getCustomerId()).get();
		for (Long couponId : couponsId) {
			Optional<Coupon> optionalCoupon = couponDao.findById(couponId);
			if (optionalCoupon.isPresent()) {
				 if (optionalCoupon.get().getAmount() <= 0) {
					throw new CouponPurchaseException("there are no coupon left", optionalCoupon.get());
				} else if (optionalCoupon.get().getEndDate().isBefore(LocalDate.now())) {
					throw new CouponPurchaseException("this coupon has expired", optionalCoupon.get());
				} else {
					optionalCoupon.get().setAmount(optionalCoupon.get().getAmount() - 1);
					CouponPurchase purchase =new CouponPurchase();
					purchase.setCouponPurchaseId(optionalCoupon.get());
					purchase.setCustomerPurchaseId(thisCustomer);
					CouponPurchaseDao.save(purchase);
					
				}

			} else {
				throw new NotFoundException("this coupon not exist");
			}
		}
	}

	@Override
	public List<Coupon> getAllCoupons() {
		return couponDao.findAll();
	}

	@Override
	public List<Coupon> getCustomerCoupons() {
		return couponDao.findByCouponPurchaseCustomerPurchaseId(getCustomerId());
	}

	@Override
	public List<Coupon> getCustomerCoupons(Long categoryId) {
		return couponDao.findByCouponPurchaseCustomerPurchaseIdAndCategoryOfCouponId(getCustomerId(), categoryId);
	}

	@Override
	public List<Coupon> getCustomerCoupons(Double maxPrice) { 
		return couponDao.findByCouponPurchaseCustomerPurchaseIdAndPriceLessThan(getCustomerId(), maxPrice);
	}

	@Override
	public List<Object> getCustomerCouponsWithImages() {
		System.out.println("hihihihihi");
		return couponDao.findByCouponPurchaseCustomerPurchaseIdWithImages(getCustomerDetails());
	}

	@Override
	public List<Object> getCustomerCouponsWithImages(Long categoryId) {
	
		return couponDao.findByCouponPurchaseCustomerPurchaseIdAndCategoryOfCouponIdWithImages(getCustomerId(), categoryId);
	}

	@Override
	public List<Object> getCustomerCouponsWithImages(Double maxPrice) {
	
		return couponDao.findByCouponPurchaseCustomerPurchaseIdAndPriceLessThanWithImages(getCustomerId(), maxPrice);
	}
	
	@Override
	public Customer getCustomerDetails() {
		return customerDao.findById(getCustomerId()).get();
	}

	public Long getCustomerId() {
		return userDetails.getUserId();
	}



}
