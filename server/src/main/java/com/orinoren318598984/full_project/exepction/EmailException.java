package com.orinoren318598984.full_project.exepction;

public class EmailException extends RuntimeException {
	String message;

	public EmailException(String message) {
		super(message);
		this.message = message;

	}

	@Override
	public String getMessage() {
		return message;
	}
}
