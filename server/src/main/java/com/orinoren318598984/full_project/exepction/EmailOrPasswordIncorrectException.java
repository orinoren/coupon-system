package com.orinoren318598984.full_project.exepction;

public class EmailOrPasswordIncorrectException extends RuntimeException {
	String message;

	public EmailOrPasswordIncorrectException(String message) {
		super(message);
		this.message = message;

	}

	@Override
	public String getMessage() {
		return message;
	}

}
