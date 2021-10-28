package com.orinoren318598984.full_project.exepction;

public class CouponPriceException extends RuntimeException {
	String message;

	public CouponPriceException(String message) {
		super(message);
		this.message = message;

	}

	@Override
	public String getMessage() {
		return message;
	}
}