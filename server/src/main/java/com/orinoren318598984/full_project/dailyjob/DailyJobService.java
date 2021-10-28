package com.orinoren318598984.full_project.dailyjob;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.orinoren318598984.full_project.model.Coupon;
import com.orinoren318598984.full_project.repository.CouponRepo;

@Component
public class DailyJobService {
	@Autowired
	private CouponRepo couponDao;

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
