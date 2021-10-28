package com.orinoren318598984.full_project.exepction;

public class CouponCategoryException extends RuntimeException {
	String message;

	public CouponCategoryException(String message) {
		super(message);
		this.message = message;

	}

	@Override
	public String getMessage() {
		return message;
	}
}
