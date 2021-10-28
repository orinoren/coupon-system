package com.orinoren318598984.full_project.exepction;

import com.orinoren318598984.full_project.model.Coupon;

public class CouponPurchaseException extends RuntimeException {
	String message;
	Coupon coupon;

	public CouponPurchaseException(String message, Coupon coupon) {
		super(message);
		this.message = message;
		this.coupon = coupon;

	}

	@Override
	public String getMessage() {
		return message;
	}

	public Coupon getCoupon() {
		return this.coupon;
	}
}