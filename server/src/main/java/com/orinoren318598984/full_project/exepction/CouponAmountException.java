package com.orinoren318598984.full_project.exepction;

public class CouponAmountException extends RuntimeException {
	String message;

	public CouponAmountException(String message) {
		super(message);
		this.message = message;

	}

	@Override
	public String getMessage() {
		return message;
	}
}
