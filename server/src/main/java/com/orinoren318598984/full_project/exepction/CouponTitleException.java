package com.orinoren318598984.full_project.exepction;

public class CouponTitleException extends RuntimeException {
	String message;

	public CouponTitleException(String message) {
		super(message);
		this.message = message;

	}

	@Override
	public String getMessage() {
		return message;
	}
}
