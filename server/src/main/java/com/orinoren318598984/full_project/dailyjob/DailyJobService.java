package com.orinoren318598984.full_project.dailyjob;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.orinoren318598984.full_project.model.Coupon;
import com.orinoren318598984.full_project.repository.CouponRepo;

/**
 * DailyJobService
 * Thread that works every 00:00
 * and responsible for deleting the expired coupons.  
 */
@Component
public class DailyJobService {
	@Autowired
	private CouponRepo couponDao;

	/**
	 * 1. Thread that works every 00:00 o'clock <br/>
	 * 2. Open a transaction<br/>
	 * 3. Creating a variable of the current date today<br/>
	 * 4. Calls {@link CouponRepo#findByEndDateBefore(LocalDate)}  to retrieve all the coupons that expired. <br/>
	 * 5. If the list is not empty Calls {@link CouponRepo#deleteByEndDateBefore(LocalDate)}<br/>
	 */
	@Transactional(readOnly = false)
	@Scheduled(cron = "0 0 0 * * *")
	public void startJob() {
		LocalDate nowDate = LocalDate.now();
		List<Coupon> expiredCouponsList = couponDao.findByEndDateBefore(nowDate);
		if (!expiredCouponsList.isEmpty()) {
			couponDao.deleteByEndDateBefore(nowDate);
		}
	}

}
