package com.orinoren318598984.full_project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.orinoren318598984.full_project.repository.CouponRepo;

@Service
public class UniversalService implements UniversalServiceInter {
	@Autowired
	private CouponRepo couponDao;


	
	@Override
	public List<Object> getAllCoupons() {
		return couponDao.findAllCouponAndImages();
	}


}
