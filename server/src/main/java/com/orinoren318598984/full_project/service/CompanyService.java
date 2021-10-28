package com.orinoren318598984.full_project.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

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
	public Coupon addCoupon(Coupon coupon, MultipartFile file) {
		Optional<Category> optionalCategory = categoryDao.findById(coupon.getCategoryOfCoupon().getId());
		if (optionalCategory.isPresent()) {
			Coupon couponBuilder = Coupon.builder()
					.companyOfCoupon(getCompanyDetails())
					.categoryOfCoupon(optionalCategory.get())
					.title(coupon.getTitle())
					.description(coupon.getDescription())
					.startDate(coupon.getStartDate())
					.endDate(coupon.getEndDate())
					.amount(coupon.getAmount())
					.price(coupon.getPrice())
					.build();

			couponValid.couponValidCheck(couponBuilder, this.getCompanyCoupons());
			if (file != null) {
				Long addedCouponImageId = addCouponImage(file);
				couponBuilder.setCouponImage(addedCouponImageId);
			} else {
				couponBuilder.setCouponImage(0l);
			}
			log.info(coupon.toString());
			Coupon coupon2 = couponDao.save(couponBuilder);
			return coupon2;
		} else {
			throw new CouponCategoryException("this category not exist");
		}

	}

	@Override
	@Transactional(readOnly = false)
	public Coupon updateCoupon(Coupon coupon, MultipartFile file) {
		Optional<Coupon> optionalCoupon = couponDao.findById(coupon.getId());
		if (optionalCoupon.isPresent() && optionalCoupon.get().getCompanyOfCoupon().getId() == getCompanyId()) {
			if (coupon.getCategoryOfCoupon() != null) {
				Optional<Category> optionalCategory = categoryDao.findById(coupon.getCategoryOfCoupon().getId());
				if (optionalCategory.isPresent()) {
					coupon.setCompanyOfCoupon(getCompanyDetails());
					coupon.setCategoryOfCoupon(optionalCategory.get());
					couponValid.couponValidCheck(coupon, this.getCompanyCoupons());
					if (file != null) {
						updateCouponImage(file, coupon.getCouponImage());
					}

				} else {
					throw new CouponCategoryException("this category not exist");
				}
			}
		} else {
			throw new NotFoundException("coupon with id : " + coupon.getId() + " not found please try again");
		}

		Coupon updatedCoupon = couponDao.save(coupon);
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
		List<Coupon> companyCoupons = couponDao.findByCompanyOfCouponId(getCompanyId());
		return companyCoupons;
	}

	@Override
	public List<Coupon> getCompanyCouponsByCategory(Long categoryId) {
		Optional<Category> optionalCategory = categoryDao.findById(categoryId);
		if (optionalCategory.isPresent()) {
			return couponDao.findByCompanyOfCouponIdAndCategoryOfCouponId(getCompanyId(), categoryId);
		} else {
			throw new NotFoundException("this category not exist");
		}

	}

	@Override
	public List<Coupon> getCompanyCouponsByMaxPrice(Double maxPrice) {
		List<Coupon> CompanyCouponsByPriceLessThan = couponDao.findByCompanyOfCouponIdAndPriceLessThan(getCompanyId(),
				maxPrice);
		return CompanyCouponsByPriceLessThan;
	}

	@Override
	public List<Object> getCompanyCouponsWithImages() {
		List<Object> companyCoupons = couponDao.findByCompanyOfCouponIdWithImages(getCompanyId());
		return companyCoupons;
	}

	@Override
	public List<Object> getCompanyCouponsByCategoryWithImages(Long categoryId) {
		Optional<Category> optionalCategory = categoryDao.findById(categoryId);
		if (optionalCategory.isPresent()) {
			return couponDao.findByCompanyOfCouponIdAndCategoryOfCouponIdWithImages(getCompanyId(), categoryId);
		} else {
			throw new NotFoundException("this category not exist");
		}

	}

	@Override
	public List<Object> getCompanyCouponsByMaxPriceWithImages(Double maxPrice) {
		List<Object> CompanyCouponsByPriceLessThan = couponDao
				.findByCompanyOfCouponIdAndPriceLessThanWithImages(getCompanyId(), maxPrice);
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
