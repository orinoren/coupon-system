package com.orinoren318598984.full_project.controller;

import java.util.Collections;
import java.util.List;

import com.orinoren318598984.full_project.model_wrappers.CouponWrapper;
import com.orinoren318598984.full_project.model_wrappers.CouponWrapperForGlobal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orinoren318598984.full_project.service.GlobalServiceInter;

@RestController
@RequestMapping("global/")
public class GlobalController {

	@Autowired
	private GlobalServiceInter global;

	@GetMapping("coupons")
	public ResponseEntity<List<CouponWrapperForGlobal>> getAllCoupons() {

		return ResponseEntity.ok(global.getAllCoupons());
	}

}
