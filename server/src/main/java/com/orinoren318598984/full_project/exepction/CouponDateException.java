package com.orinoren318598984.full_project.exepction;

public class CouponDateException extends RuntimeException {
	String message;

	public CouponDateException(String message) {
		super(message);
		this.message = message;

	}

	@Override
	public String getMessage() {
		return message;
	}
}
