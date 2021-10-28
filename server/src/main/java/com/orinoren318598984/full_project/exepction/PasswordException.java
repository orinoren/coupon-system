package com.orinoren318598984.full_project.exepction;

public class PasswordException extends RuntimeException {
	String message;

	public PasswordException(String message) {
		super(message);
		this.message = message;

	}

	@Override
	public String getMessage() {
		return message;
	}
}
