package com.orinoren318598984.full_project.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import com.orinoren318598984.full_project.model_wrappers.CouponWrapperForCompany;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.annotation.RequestScope;
import org.springframework.web.multipart.MultipartFile;

import com.orinoren318598984.full_project.exepction.CouponCategoryException;
import com.orinoren318598984.full_project.exepction.NotFoundException;
import com.orinoren318598984.full_project.model.Category;
import com.orinoren318598984.full_project.model.Company;
import com.orinoren318598984.full_project.model.Coupon;
import com.orinoren318598984.full_project.model.CouponImage;
import com.orinoren318598984.full_project.repository.CategoryRepo;
import com.orinoren318598984.full_project.repository.CompanyRepo;
import com.orinoren318598984.full_project.repository.CouponImageDao;
import com.orinoren318598984.full_project.repository.CouponRepo;
import com.orinoren318598984.full_project.utils.CouponValid;

import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequestScope
@NoArgsConstructor
public class CompanyService implements ClientService, CompanyServiceInter {

    @Autowired
    private CompanyRepo companyDao;

    @Autowired
    private CouponRepo couponDao;

    @Autowired
    private CategoryRepo categoryDao;

    @Autowired
    private CouponValid couponValid;

    @Autowired
    private UserDetailsService user;

    @Autowired
    private CouponImageDao couponImageDao;

    @Override
    public Optional<Company> login(String email, String password) {
        Optional<Company> optionalCompany = companyDao.findByEmailAndPassword(email, password);
        if (optionalCompany.isPresent()) {
            return optionalCompany;
        }
        return Optional.empty();
    }

    @Override
    public Long addCouponImage(MultipartFile file) {
        CouponImage couponImage = new CouponImage();
        try {
            couponImage.setImage(file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        CouponImage couponImageDetail = couponImageDao.save(couponImage);
        return couponImageDetail.getId();
    }

    @Override
    public Long updateCouponImage(MultipartFile file, Long id) {
        Optional<CouponImage> optionalImage = couponImageDao.findById(id);
        CouponImage couponImage = optionalImage.get();
        try {
            couponImage.setImage(file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
        couponImageDao.save(couponImage);
        return couponImage.getId();
    }

    @Override
    @Transactional(readOnly = false)
    public Coupon addCoupon(CouponWrapperForCompany couponObjWrapper, MultipartFile file) {
        Optional<Category> optionalCategory = categoryDao.findById(couponObjWrapper.getCategory());
        if (optionalCategory.isPresent()) {
            Coupon couponBuilder = Coupon.builder()
                    .id(couponObjWrapper.getId())
                    .category(optionalCategory.get())
                    .company(getCompanyDetails())
                    .title(couponObjWrapper.getTitle())
                    .description(couponObjWrapper.getDescription())
                    .startDate(couponObjWrapper.getStartDate())
                    .endDate(couponObjWrapper.getEndDate())
                    .amount(couponObjWrapper.getAmount())
                    .price(couponObjWrapper.getPrice())
                    .build();

            couponValid.couponValidCheck(couponBuilder, this.getCompanyCoupons());
            if (file != null) {
                Long addedCouponImageId = addCouponImage(file);
                couponBuilder.setCouponImage(addedCouponImageId);
            } else {
                couponBuilder.setCouponImage(0l);
            }
            log.info(couponObjWrapper.toString());
            Coupon coupon2 = couponDao.save(couponBuilder);
            return coupon2;
        } else {
            throw new CouponCategoryException("this category not exist");
        }

    }

    @Override
    @Transactional(readOnly = false)
    public Coupon updateCoupon(CouponWrapperForCompany couponObjWrapper, MultipartFile file) {
        Coupon couponBuilder=null;
        Optional<Coupon> optionalCoupon = couponDao.findById(couponObjWrapper.getId());
        if (optionalCoupon.isPresent() && optionalCoupon.get().getCompany().getId() == getCompanyId()) {
            if (couponObjWrapper.getCategory() != null) {
                Optional<Category> optionalCategory = categoryDao.findById(couponObjWrapper.getCategory());
                if (optionalCategory.isPresent()) {
                     couponBuilder = Coupon.builder()
                            .id(couponObjWrapper.getId())
                            .category(optionalCategory.get())
                             .couponImage(couponObjWrapper.getImageId())
                            .company(getCompanyDetails())
                            .title(couponObjWrapper.getTitle())
                            .description(couponObjWrapper.getDescription())
                            .startDate(couponObjWrapper.getStartDate())
                            .endDate(couponObjWrapper.getEndDate())
                            .amount(couponObjWrapper.getAmount())
                            .price(couponObjWrapper.getPrice())
                            .build();

                    couponValid.couponValidCheck(couponBuilder, this.getCompanyCoupons());
                    if (file != null) {
                        updateCouponImage(file, couponBuilder.getCouponImage());
                    }

                } else {
                    throw new CouponCategoryException("this category not exist");
                }
            }
        } else {
            throw new NotFoundException("coupon with id : " + couponBuilder.getId() + " not found please try again");
        }

        Coupon updatedCoupon = couponDao.save(couponBuilder);
        return updatedCoupon;
    }

    @Override
    @Transactional(readOnly = false)
    public void deleteCoupon(Long couponId) {
        Optional<Coupon> optionalCoupon = couponDao.findById(couponId);

        if (optionalCoupon.isPresent()) {
            if (!optionalCoupon.get().getCouponImage().equals(0l)) {
                couponImageDao.deleteById(optionalCoupon.get().getCouponImage());
            }
            couponDao.deleteById(couponId);
        } else {
            throw new NotFoundException("coupon with id : " + couponId + " not found please try again");
        }
    }

    @Override
    public List<Coupon> getCompanyCoupons() {
       log.info("hahaha");
        List<Coupon> companyCoupons = couponDao.findByCompanyId(getCompanyId());
        return companyCoupons;
    }

    @Override
    public List<Coupon> getCompanyCouponsByCategory(Long categoryId) {
        Optional<Category> optionalCategory = categoryDao.findById(categoryId);
        if (optionalCategory.isPresent()) {
            return couponDao.findByCompanyIdAndCategoryId(getCompanyId(), categoryId);
        } else {
            throw new NotFoundException("this category not exist");
        }

    }

    @Override
    public List<Coupon> getCompanyCouponsByMaxPrice(Double maxPrice) {
        List<Coupon> CompanyCouponsByPriceLessThan = couponDao.findByCompanyIdAndPriceLessThan(getCompanyId(),
                maxPrice);
        return CompanyCouponsByPriceLessThan;
    }

    @Override
    public List<Object> getCompanyCouponsWithImages() {
        List<Object> companyCoupons = couponDao.findByCompanyIdWithImages(getCompanyId());
        return companyCoupons;
    }

    @Override
    public List<Object> getCompanyCouponsByCategoryWithImages(Long categoryId) {
        Optional<Category> optionalCategory = categoryDao.findById(categoryId);
        if (optionalCategory.isPresent()) {
            return couponDao.findByCompanyIdAndCategoryIdWithImages(getCompanyId(), categoryId);
        } else {
            throw new NotFoundException("this category not exist");
        }

    }

    @Override
    public List<Object> getCompanyCouponsByMaxPriceWithImages(Double maxPrice) {
        List<Object> CompanyCouponsByPriceLessThan = couponDao
                .findByCompanyIdAndPriceLessThanWithImages(getCompanyId(), maxPrice);
        return CompanyCouponsByPriceLessThan;
    }

    @Override
    public Company getCompanyDetails() {
        return companyDao.findById(getCompanyId()).get();
    }

    public Long getCompanyId() {
        return user.getUserId();
    }

}
