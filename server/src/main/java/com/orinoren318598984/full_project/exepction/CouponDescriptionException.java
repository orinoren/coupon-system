package com.orinoren318598984.full_project.exepction;

public class CouponDescriptionException extends RuntimeException{
	String message;

	public CouponDescriptionException(String message) {
		super(message);
		this.message = message;

	}

	@Override
	public String getMessage() {
		return message;
	}
}
