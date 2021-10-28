package com.orinoren318598984.full_project.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.orinoren318598984.full_project.service.UniversalServiceInter;

@RestController
@RequestMapping("universal/")
public class UniversalController {

	@Autowired
	private UniversalServiceInter universal;

	@GetMapping("get-all-coupons")
	public ResponseEntity<List<Object>> getAllCoupons() {
		List<Object> allCoupons = universal.getAllCoupons();

		Collections.shuffle(allCoupons);

		return ResponseEntity.ok(allCoupons);
	}

}
