package com.orinoren318598984.full_project.utils;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Component;

import com.orinoren318598984.full_project.exepction.CouponAmountException;
import com.orinoren318598984.full_project.exepction.CouponCategoryException;
import com.orinoren318598984.full_project.exepction.CouponDateException;
import com.orinoren318598984.full_project.exepction.CouponDescriptionException;
import com.orinoren318598984.full_project.exepction.CouponPriceException;
import com.orinoren318598984.full_project.exepction.CouponTitleException;
import com.orinoren318598984.full_project.model.Coupon;

/**
 * this class responsible for coupon properties validation
 */
@Component
public class CouponValid {

	/**
	 * calling all required methods for validation
	 * 
	 * @param coupon
	 * @throws CouponCategoryException
	 * @throws CouponTitleException
	 * @throws CouponDescriptionException
	 * @throws CouponDateException
	 * @throws CouponAmountException
	 * @throws CouponAmountException
	 */
	public void couponValidCheck(Coupon coupon, List<Coupon> companyCoupons)
			throws CouponCategoryException, CouponTitleException, CouponDescriptionException, CouponDateException,
			CouponAmountException, CouponPriceException {
		titleValidCheck(coupon, companyCoupons);
		descriptionValidCheck(coupon);
		startDateValidCheck(coupon);
		endDateValidCheck(coupon);
		amountValidCheck(coupon);
		priceValidCheck(coupon);
//		imageValidCheck(coupon);

	}

	/**
	 * validation for coupon title ; 1 : coupon title is unique by searching if is
	 * not found in {@link com.dao.CompaniesDBDAO#getAllCompanyCoupons} 2 : input is
	 * less 255 char ;
	 * 
	 * @param coupon
	 * @throws CouponTitleException
	 */
	public void titleValidCheck(Coupon coupon, List<Coupon> companyCoupons) throws CouponTitleException {
		String title = coupon.getTitle();
		if (title.length() > 255 || title.length() == 0) {
			throw new CouponTitleException("COUPON TITLE NOT VALID (length must be 1...255 characters");

		} else {
			for (Coupon couponIter : companyCoupons) {
				if (couponIter.getTitle().equalsIgnoreCase(title) && !couponIter.getId().equals(coupon.getId())) {
					throw new CouponTitleException("TITLE MUST BE UNIQUE(duplicate coupon title)");
				}
			}
		}
	}

	/**
	 * validation for coupon title ; 1 : until input is less 255 char ;
	 * 
	 * @param coupon
	 * @throws CouponDescriptionException
	 */
	public void descriptionValidCheck(Coupon coupon) throws CouponDescriptionException {
		String description = coupon.getDescription();

		if (description.length() > 255) {
			throw new CouponDescriptionException("COUPON DESCRIPTION NOT VALID (length must be under 255 characters");
		}
	}

	/**
	 * validation for coupon start date ; 1 : date format is not found by the
	 * <code>Matcher</code> 2 : date is not a real date 3 : date is not passed
	 * already 4 : date is in range of today or one year late
	 * 
	 * @param coupon
	 * @throws CouponDateException
	 */
	public void startDateValidCheck(Coupon coupon) throws CouponDateException {
		LocalDate startDate = coupon.getStartDate();
		if (startDate.isBefore(LocalDate.now())) {
			throw new CouponDateException("START DATE NOT VALID (must be today or after)");
		} else if (startDate.isAfter(LocalDate.now().plusYears(1).plusDays(1))) {
			throw new CouponDateException("START DATE NOT VALID (max start date is 1 year from now)");
		}
	}

	/**
	 * validation for coupon start date ; : date format is not found by the
	 * <code>Matcher</code> 2 : date is not a real date 3 : date is before start
	 * date
	 * 
	 * @param coupon
	 * @throws CouponDateException
	 */
	public void endDateValidCheck(Coupon coupon) throws CouponDateException {
		LocalDate endDate = coupon.getEndDate();

		if (endDate.isBefore(coupon.getStartDate())) {
			throw new CouponDateException("END DATE NOT VALID (must be after start date)");
		}
	}

	/**
	 * validation for coupon amount ; calls
	 * {@link com.loginsystem.MenuUtils#intValidCheck}
	 * 
	 * @param coupon
	 * @throws CouponAmountException
	 */
	public void amountValidCheck(Coupon coupon) throws CouponAmountException {
		int amount = coupon.getAmount();
		if (amount < 0) {
			throw new CouponAmountException("Coupon amount not valid please enter 1 or above");
		}
	}

	/**
	 * validation for coupon price ; until input is bigger then 0
	 * 
	 * @param coupon
	 * @throws CouponPriceException
	 */
	public void priceValidCheck(Coupon coupon) throws CouponPriceException {
		double price = coupon.getPrice();

		if (price < 0) {
			throw new CouponPriceException("TRY AGAIN (ONLY POSITIVE NUMBER REQUIRED)");
		}
	}

//	/**
//	 * validation for coupon title ; : until input is less 255 char ;
//	 * 
//	 * @param coupon
//	 */
//	public void imageValidCheck(Coupon coupon) {
//		String image = coupon.getImage();
//
//		if (image.length() > 255) {
//			System.out.println("COUPON IMAGE NOT VALID (length must be under 255 characters");
//		}
//	}


}