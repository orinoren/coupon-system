package com.orinoren318598984.full_project.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.orinoren318598984.full_project.model.Category;
import com.orinoren318598984.full_project.model_wrappers.CouponWrapper;
import com.orinoren318598984.full_project.model_wrappers.CouponWrapperForCompany;
import com.orinoren318598984.full_project.model_wrappers.CouponWrapperForCustomer;
import com.orinoren318598984.full_project.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.annotation.RequestScope;

import com.orinoren318598984.full_project.exepction.CouponPurchaseException;
import com.orinoren318598984.full_project.exepction.NotFoundException;
import com.orinoren318598984.full_project.model.Coupon;
import com.orinoren318598984.full_project.model.CouponPurchase;
import com.orinoren318598984.full_project.model.Customer;

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
    private CategoryRepo categoryDao;

    @Autowired
    private UserDetailsService userDetails;

    @Autowired
    private CouponWrapperForCustomer wrapper;

    /**
     * Calls {@link CustomerRepo#findByEmailAndPassword(String, String)} to find a match of the email and password in the database.
     *
     * @param email    customer user email
     * @param password customer user password
     * @return Optional customer if present else empty Optional
     */
    @Override
    public Optional<Customer> login(String email, String password) {
        Optional<Customer> optionalCustomer = customerDao.findByEmailAndPassword(email, password);
        if (optionalCustomer.isPresent()) {
            return optionalCustomer;
        }
        return Optional.empty();
    }


    /**
     * Thread safe ;<br/>
     * 1. Calls {@link CustomerRepo#findById(Object customerId)} to
     * retrieve the customer object from the database .<br/>
     * 2. iterate over the couponsId list and on each iterate
     * calls {@link CouponRepo#findById(Object couponId)} to retrieve the coupon from the database <br/>
     * 3. check if the coupon is present if not {@link NotFoundException} is thrown <br/>
     * if coupon is present checks if coupon amount less than 0 or coupon end date already passed <br/>
     * if one of those conditions are true {@link CouponPurchaseException()} is thrown<br/>
     * 4. coupon amount decrement by 1 <br/>
     * 5. create a new object of <code>CouponPurchase</code><br/>
     * 6. set the <code>CouponPurchase</code> coupon id to the coupon from the list and the
     * customer to the current customer that retrieved from the database.
     *
     * @param couponsId list of coupons id's to purchase.
     */
    @Override
    @Transactional(readOnly = false)
    public synchronized void purchaseCoupon(List<Long> couponsId) throws NotFoundException {
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
                    CouponPurchase purchase = new CouponPurchase();
                    purchase.setCouponPurchaseId(optionalCoupon.get());
                    purchase.setCustomerPurchaseId(thisCustomer);
                    CouponPurchaseDao.save(purchase);

                }

            } else {
                throw new NotFoundException("this coupon not exist");
            }
        }
    }


    /**
     * Calls {@link CouponWrapperForCustomer#convertMultiDimensionListToOneDimensionArray(List customerCouponList)}
     * to convert the data from the database to List of <code>CouponWrapperForCustomer</code>
     *
     * @return list of customer coupons.
     */
    @Override
    public List<CouponWrapperForCustomer> getCustomerCouponsWithImages() {
        List<CouponWrapperForCustomer> couponWrapperList = (List<CouponWrapperForCustomer>) wrapper.convertMultiDimensionListToOneDimensionArray(couponDao.findByCouponPurchaseCustomerPurchaseIdWithImages(getCustomerDetails()));
        return couponWrapperList;
    }

    /**
     * 1. Calls {@link CategoryRepo#findById(Object)} to check if the category exist.<br/>
     * if not present throw {@link NotFoundException}. <br/>
     * if category is present calls {@link CouponRepo#findByCouponPurchaseCustomerPurchaseIdAndCategoryIdIdWithImages(Long, Long)}
     * to get all the coupons by chosen category and return it.
     *
     * @param categoryId
     * @return coupon list by chosen category.
     */
    @Override
    public List<Object> getCustomerCouponsWithImages(Long categoryId) {
        Optional<Category> optionalCategory = categoryDao.findById(categoryId);
        if (optionalCategory.isPresent()) {
            return couponDao.findByCouponPurchaseCustomerPurchaseIdAndCategoryIdIdWithImages(getCustomerId(), categoryId);
        } else {
            throw new NotFoundException("this category not exist");
        }
    }

    /**
     * Calls {@link CouponRepo#findByCouponPurchaseCustomerPurchaseIdAndPriceLessThanWithImages(Long, Double)}
     * to get all the coupons with price less than max price and return it.
     *
     * @param maxPrice
     * @return coupon list with price less than max price .
     */
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

    @Override
    public List<Coupon> getCustomerCoupons() {
        return couponDao.findByCouponPurchaseCustomerPurchaseId(getCustomerId());
    }

    @Override
    public List<Coupon> getCustomerCoupons(Long categoryId) {
        return couponDao.findByCouponPurchaseCustomerPurchaseIdAndCategoryId(getCustomerId(), categoryId);
    }

    @Override
    public List<Coupon> getCustomerCoupons(Double maxPrice) {
        return couponDao.findByCouponPurchaseCustomerPurchaseIdAndPriceLessThan(getCustomerId(), maxPrice);
    }


}
