package com.orinoren318598984.full_project.exepction;

public class NameException extends RuntimeException {
	String message;

	public NameException(String message) {
		super(message);
		this.message = message;

	}

	@Override
	public String getMessage() {
		return message;
	}

}
