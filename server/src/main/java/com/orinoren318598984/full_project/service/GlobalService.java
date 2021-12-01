package com.orinoren318598984.full_project.service;

import java.util.List;

import com.orinoren318598984.full_project.model_wrappers.CouponWrapper;
import com.orinoren318598984.full_project.model_wrappers.CouponWrapperForGlobal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.orinoren318598984.full_project.repository.CouponRepo;

@Service
public class GlobalService implements GlobalServiceInter {
	@Autowired
	private CouponRepo couponDao;

	@Autowired
	private CouponWrapperForGlobal wrapper;

	@Override
	public List<CouponWrapperForGlobal> getAllCoupons() {
		List<CouponWrapperForGlobal> couponWrappers = (List<CouponWrapperForGlobal>) wrapper.convertMultiDimensionListToOneDimensionArray(couponDao.findAllCouponsAndImages());
		return couponWrappers;
	}


}
