package com.orinoren318598984.full_project.exepction;

public class AutharizationException extends RuntimeException {

	String message;

	public AutharizationException(String message) {
		super(message);
		this.message = message;

	}

	@Override
	public String getMessage() {
		return message;
	}
}
