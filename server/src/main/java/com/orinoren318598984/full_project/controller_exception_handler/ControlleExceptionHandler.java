package com.orinoren318598984.full_project.controller_exception_handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.orinoren318598984.full_project.exepction.AutharizationException;
import com.orinoren318598984.full_project.exepction.CouponAmountException;
import com.orinoren318598984.full_project.exepction.CouponCategoryException;
import com.orinoren318598984.full_project.exepction.CouponDateException;
import com.orinoren318598984.full_project.exepction.CouponDescriptionException;
import com.orinoren318598984.full_project.exepction.CouponPriceException;
import com.orinoren318598984.full_project.exepction.CouponPurchaseException;
import com.orinoren318598984.full_project.exepction.CouponTitleException;
import com.orinoren318598984.full_project.exepction.EmailException;
import com.orinoren318598984.full_project.exepction.EmailOrPasswordIncorrectException;
import com.orinoren318598984.full_project.exepction.NameException;
import com.orinoren318598984.full_project.exepction.NotFoundException;
import com.orinoren318598984.full_project.exepction.PasswordException;

@ControllerAdvice
public class ControlleExceptionHandler {

	@ExceptionHandler(NotFoundException.class)
	public ResponseEntity<String> notFoundExceptionHandler(NotFoundException e){
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	}
	@ExceptionHandler(NullPointerException.class)
	public ResponseEntity<String> NullPointerExceptionHandler(NullPointerException e){
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	}
	@ExceptionHandler(EmailOrPasswordIncorrectException.class)
	public ResponseEntity<String> EmailOrPasswordIncorrectExceptionHandler(EmailOrPasswordIncorrectException e){
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
	}
	@ExceptionHandler(AutharizationException.class)
	public ResponseEntity<String> AutharizationExceptionHandler(AutharizationException e){
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
	}
	@ExceptionHandler(NameException.class)
	public ResponseEntity<String> NameExceptionHandler(NameException e){
		String forCompanyMsg ="Sorry Company name is already taken please try again";
		if(e.getMessage().equals(forCompanyMsg)) {
		return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	}

	@ExceptionHandler(EmailException.class)
	public ResponseEntity<String> EmailExceptionHandler(EmailException e){
		String forCompanyMsg ="Sorry Company email already taken please try again";
		String forCustomerMsg ="Sorry Customer email already taken please try again";
		if(e.getMessage().equals(forCompanyMsg)||e.getMessage().equals(forCustomerMsg)) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	}
	@ExceptionHandler(PasswordException.class)
	public ResponseEntity<String> PasswordExceptionHandler(PasswordException e){
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	}
	@ExceptionHandler(CouponCategoryException.class)
	public ResponseEntity<String> CouponCategoryExceptionHandler(CouponCategoryException e){
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	}
	@ExceptionHandler(CouponTitleException.class)
	public ResponseEntity<String> CouponTitleExceptionHandler(CouponTitleException e){
		String couponMsg = "TITLE MUST BE UNIQUE(duplicate coupon title)";
		if(e.getMessage().equals(couponMsg)) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	}
	@ExceptionHandler(CouponDescriptionException.class)
	public ResponseEntity<String> CouponDescriptionExceptionHandler(CouponDescriptionException e){
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	}
	@ExceptionHandler(CouponAmountException.class)
	public ResponseEntity<String> CouponAmountExceptionHandler(CouponAmountException e){
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	}
	@ExceptionHandler(CouponPriceException.class)
	public ResponseEntity<String> CouponPriceExceptionHandler(CouponPriceException e){
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	}
	@ExceptionHandler(CouponDateException.class)
	public ResponseEntity<String> CouponDateExceptionHandler(CouponDateException e){
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	}
	@ExceptionHandler(CouponPurchaseException.class)
	public ResponseEntity<String> CouponPurchaseExceptionHandler(CouponPurchaseException e){
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
	}
	
	
}
