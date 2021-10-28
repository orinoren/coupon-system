package com.orinoren318598984.full_project.exepction;

public class NotFoundException extends RuntimeException {
	String message;

	public NotFoundException(String message) {
		super(message);
		this.message = message;

	}

	@Override
	public String getMessage() {
		return message;
	}
}
