package com.orinoren318598984.full_project.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.orinoren318598984.full_project.model_wrappers.CouponWrapperForCompany;
import com.orinoren318598984.full_project.model_wrappers.CouponWrapperForGlobal;
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

import javax.persistence.EntityManager;

/**
 * CompanyService
 * this class is responsible for all the business logic for company operation
 * and works as a middleware between the company controller layer and the dao layer
 */
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

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private CouponWrapperForCompany wrapper;

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private QueryUtils queryUtils;


    /**
     * Calls {@link CompanyRepo#findByEmailAndPassword(String, String)} to find a match of the email and password in the database.
     *
     * @param email    company user email
     * @param password company user password
     * @return Optional company if present else empty optional
     */
    @Override
    public Optional<Company> login(String email, String password) {
        Optional<Company> optionalCompany = companyDao.findByEmailAndPassword(email, password);
        if (optionalCompany.isPresent()) {
            return optionalCompany;
        }
        return Optional.empty();
    }

    /**
     * 1. Creating a new coupon image object, <br/>
     * 2. Set the coupon image to the bytes of the coupon image file . <br/>
     * 3. call {@link CouponImageDao#save(Object)} to save the image in the database.
     * 4. return the coupon image id that return from the database after added.
     *
     * @param file the coupon image
     * @return coupon image id that return from the database after added
     */
    @Override
    public Long addCouponImage(MultipartFile file) {
        CouponImage couponImage = new CouponImage();
        try {
            couponImage.setImage(file.getBytes());
        } catch (IOException e) {

        }
        CouponImage couponImageDetail = couponImageDao.save(couponImage);
        return couponImageDetail.getId();
    }

    /**
     * 1. Calls {@link CouponImageDao#findById(Object)} with the image id to retrieve the coupon image, <br/>
     * 2. Set the coupon image to the bytes of the coupon image file . <br/>
     * 3. call {@link CouponImageDao#save(Object)} to save the image in the database.
     * 4. return the coupon image id .
     *
     * @param file the coupon image.
     * @param id   the coupon image id to update.
     * @return coupon image id .
     */
    @Override
    public Long updateCouponImage(MultipartFile file, Long id) {
        Optional<CouponImage> optionalImage = couponImageDao.findById(id);
        CouponImage couponImage = optionalImage.get();
        try {
            couponImage.setImage(file.getBytes());
        } catch (IOException e) {
        }
        couponImageDao.save(couponImage);
        return couponImage.getId();
    }

    /**
     * 1. convert the coupon string to {@link CouponWrapperForCompany}.<br/>
     * 2. calls {@link CategoryRepo#findById(Object)}to check if coupon category is existed.<br/>
     * if not throw {@link CouponCategoryException} <br/>
     * if the category is present building a coupon object with the <code>couponObjWrapper</code> details.<br/>
     * 3. Calls {@link CouponValid#couponValidCheck(Coupon, List)} to check if the coupon details are valid.<br/>
     * 4.Checks of the file is not null <br/>
     * if true call {@link #addCouponImage(MultipartFile)} to add the image to the database
     * and retreive the image id and set it to the coupon object .<br/>
     * if false set the coupon object image id to 0 (default image in the database).<br/>
     * 5. calls {@link CompanyRepo#save(Object)} to add the coupon to the database and retrun it .
     *
     * @param coupon coupon string to add (CouponWrapperForCompany)
     * @param file   coupon image
     * @return the added coupon
     */
    @Override
    @Transactional(readOnly = false)
    public Coupon addCoupon(String coupon, MultipartFile file) {
        CouponWrapperForCompany couponObjWrapper = null;
        try {
            couponObjWrapper = objectMapper.readValue(coupon, CouponWrapperForCompany.class);
        } catch (JsonProcessingException e) {

        }
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
            Coupon couponAdded = couponDao.save(couponBuilder);
            return couponAdded;
        } else {
            throw new CouponCategoryException("this category not exist");
        }

    }


    /**
     * 1. convert the coupon string to {@link CouponWrapperForCompany}.<br/>
     * 2. calls {@link CouponRepo#findById(Object)}to check if the coupon is existed.<br/>
     * if not exist or the coupon company id is not equal to this current company that logged in {@link NotFoundException} is thrown.<br/>
     * 3. calls {@link CategoryRepo#findById(Object)}to check if coupon category is existed.<br/>
     * if not throw {@link CouponCategoryException} <br/>
     * if the category is present building a coupon object with the <code>couponObjWrapper</code> details.<br/>
     * 4. Calls {@link CouponValid#couponValidCheck(Coupon, List)} to check if the coupon details are valid.<br/>
     * 5. Checks of the file is not null <br/>
     * if true call {@link #updateCouponImage(MultipartFile, Long)} to update the image to the database.
     * and retreive the image id and set it to the coupon object .<br/>
     * 6. calls {@link CompanyRepo#save(Object)} to update the coupon to the database and retrun it .
     *
     * @param coupon coupon string to add (CouponWrapperForCompany)
     * @param file   coupon image
     * @return the updated coupon
     */
    @Override
    @Transactional(readOnly = false)
    public Coupon updateCoupon(String coupon, MultipartFile file) {
        CouponWrapperForCompany couponObjWrapper = null;
        try {
            couponObjWrapper = objectMapper.readValue(coupon, CouponWrapperForCompany.class);
        } catch (JsonProcessingException e) {
            log.info("error");

        }
        Coupon couponBuilder = null;
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

    /**
     * 1. Calls {@link CouponRepo#findById(Object)} to check if the coupon is exist.<br/>
     * if coupon is not present throw {@link NotFoundException}. <br/>
     * if coupon is present check if the coupon image id is 0 (check if the coupon has a default image that not need to be delete)<br/>
     * if is not 0 calls {@link CouponImageDao#deleteById(Object)} with the coupon image
     * id to delete the image from the database.<br/>
     * 2. calls {@link CouponRepo#deleteById(Object)} to delete the coupon.
     *
     * @param couponId
     */
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

    /**
     * Calls {@link CouponWrapperForCompany#convertMultiDimensionListToOneDimensionArray(List companyCouponList)}
     * to convert the data from the database to List of <code>CouponWrapperForCompany</code>
     *
     * @return list of company coupons.
     */
    @Override
    public List<CouponWrapperForCompany> getCompanyCouponsWithImages() {
        List<CouponWrapperForCompany> couponWrappers = (List<CouponWrapperForCompany>) wrapper.convertMultiDimensionListToOneDimensionArray(couponDao.findByCompanyIdWithImages(getCompanyId()));
        return couponWrappers;
    }

    /**
     * 1. Calls {@link CategoryRepo#findById(Object)} to check if the category exist.<br/>
     * if not present throw {@link NotFoundException}. <br/>
     * if category is present calls {@link CouponRepo#findByCompanyIdAndCategoryIdWithImages(Long, Long)}
     * to get all the coupons by chosen category and return it.
     *
     * @param categoryId
     * @return coupon list by chosen category.
     */
    @Override
    public List<Object> getCompanyCouponsByCategoryWithImages(Long categoryId) {
        Optional<Category> optionalCategory = categoryDao.findById(categoryId);
        if (optionalCategory.isPresent()) {
            return couponDao.findByCompanyIdAndCategoryIdWithImages(getCompanyId(), categoryId);
        } else {
            throw new NotFoundException("this category not exist");
        }

    }

    /**
     * Calls {@link CouponRepo#findByCompanyIdAndPriceLessThanWithImages(Long, Double)}
     * to get all the coupons with price less than max price and return it.
     *
     * @param maxPrice
     * @return coupon list with price less than max price .
     */
    @Override
    public List<Object> getCompanyCouponsByMaxPriceWithImages(Double maxPrice) {
        List<Object> CompanyCouponsByPriceLessThan = couponDao
                .findByCompanyIdAndPriceLessThanWithImages(getCompanyId(), maxPrice);
        return CompanyCouponsByPriceLessThan;
    }

    /**
     * 1.Create a SQL query prefix .<br/>
     * 2.calls {@link QueryUtils#getSearchQuery(Optional, Optional, String)} to retrieve the next query segment. <br/>
     * 3.calls {@link EntityManager#createQuery(String)} with the query that
     * made and getting the result from the database.<br/>
     * 4.calls {@link CouponWrapperForCompany#convertMultiDimensionListToOneDimensionArray(List)} to convert the result
     * to list of <code>{@link CouponWrapperForCompany}</code> and return it.
     *
     * @param searchInput    the title of the coupon that the user want to search
     * @param maxPriceSearch the max price of the coupons that the user want to search
     * @param categorySearch list of the category's id that the user want to search
     * @return list of <code>{@link CouponWrapperForCompany}</code>
     */
    @Override
    public List<CouponWrapperForCompany> getCompanyCouponsSearchResult(String searchInput, Optional<Double> maxPriceSearch, Optional<List<Integer>> categorySearch) {
        String query = "select c ,ci.image from Coupon c\n" +
                "inner join CouponImage ci on c.couponImage = ci.id and c.company.id=" + getCompanyId() +
                "\nwhere\n";
        query += queryUtils.getSearchQuery(categorySearch, maxPriceSearch, searchInput);
        List resultList = entityManager.createQuery(query).getResultList();
        List<CouponWrapperForCompany> list = (List<CouponWrapperForCompany>) wrapper.convertMultiDimensionListToOneDimensionArray(resultList);
        return list;
    }

    @Override
    public Company getCompanyDetails() {
        return companyDao.findById(getCompanyId()).get();
    }

    public Long getCompanyId() {
        return user.getUserId();
    }

    /**
     * Calls {@link CouponRepo#findByCompanyId(Long)} to retreive the list of coupons.
     *
     * @return list of coupons.
     */
    @Override
    public List<Coupon> getCompanyCoupons() {
        List<Coupon> companyCoupons = couponDao.findByCompanyId(getCompanyId());
        return companyCoupons;
    }

    /**
     * 1. Calls {@link CategoryRepo#findById(Object)} to check if the category is exist.<br/>
     * if not present throw {@link NotFoundException}. <br/>
     * if category is present calls {@link CouponRepo#findByCompanyIdAndCategoryId(Long, Long)}
     * to get all the coupons by chosen category and return it.
     *
     * @param categoryId
     * @return coupon list by chosen category.
     */
    @Override
    public List<Coupon> getCompanyCouponsByCategory(Long categoryId) {
        Optional<Category> optionalCategory = categoryDao.findById(categoryId);
        if (optionalCategory.isPresent()) {
            return couponDao.findByCompanyIdAndCategoryId(getCompanyId(), categoryId);
        } else {
            throw new NotFoundException("this category not exist");
        }
    }

    /**
     * Calls {@link CouponRepo#findByCompanyIdAndPriceLessThan(Long, Double)} to retrieve the
     * company coupons less than the price inserted.
     *
     * @param maxPrice
     * @return
     */
    @Override
    public List<Coupon> getCompanyCouponsByMaxPrice(Double maxPrice) {
        List<Coupon> CompanyCouponsByPriceLessThan = couponDao.findByCompanyIdAndPriceLessThan(getCompanyId(),
                maxPrice);
        return CompanyCouponsByPriceLessThan;
    }
}
