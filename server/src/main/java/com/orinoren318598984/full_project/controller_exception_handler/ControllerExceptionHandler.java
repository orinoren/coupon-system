package com.orinoren318598984.full_project.controller_exception_handler;

import com.orinoren318598984.full_project.utils.StringResponse;
import org.springframework.beans.factory.annotation.Autowired;
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
public class ControllerExceptionHandler {
    @Autowired
    private StringResponse stringResponse;

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<StringResponse> notFoundExceptionHandler(NotFoundException e) {
        stringResponse.setMessege(e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(stringResponse);
    }

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<StringResponse> NullPointerExceptionHandler(NullPointerException e) {
        stringResponse.setMessege(e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(stringResponse);
    }

    @ExceptionHandler(EmailOrPasswordIncorrectException.class)
    public ResponseEntity<StringResponse> EmailOrPasswordIncorrectExceptionHandler(EmailOrPasswordIncorrectException e) {
        stringResponse.setMessege(e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(stringResponse);
    }

    @ExceptionHandler(AutharizationException.class)
    public ResponseEntity<StringResponse> AutharizationExceptionHandler(AutharizationException e) {
        stringResponse.setMessege(e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(stringResponse);
    }

    @ExceptionHandler(NameException.class)
    public ResponseEntity<StringResponse> NameExceptionHandler(NameException e) {
        String forCompanyMsg = "Sorry Company name is already taken please try again";
        if (e.getMessage().equals(forCompanyMsg)) {
            stringResponse.setMessege(e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(stringResponse);
        }
        stringResponse.setMessege(e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(stringResponse);
    }

    @ExceptionHandler(EmailException.class)
    public ResponseEntity<StringResponse> EmailExceptionHandler(EmailException e) {
        String forCompanyMsg = "Sorry Company email already taken please try again";
        String forCustomerMsg = "Sorry Customer email already taken please try again";
        if (e.getMessage().equals(forCompanyMsg) || e.getMessage().equals(forCustomerMsg)) {
            stringResponse.setMessege(e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(stringResponse);
        }
        stringResponse.setMessege(e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(stringResponse);
    }

    @ExceptionHandler(PasswordException.class)
    public ResponseEntity<StringResponse> PasswordExceptionHandler(PasswordException e) {
        stringResponse.setMessege(e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(stringResponse);
    }

    @ExceptionHandler(CouponCategoryException.class)
    public ResponseEntity<StringResponse> CouponCategoryExceptionHandler(CouponCategoryException e) {
        stringResponse.setMessege(e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(stringResponse);
    }

    @ExceptionHandler(CouponTitleException.class)
    public ResponseEntity<StringResponse> CouponTitleExceptionHandler(CouponTitleException e) {
        String couponMsg = "TITLE MUST BE UNIQUE(duplicate coupon title)";
        if (e.getMessage().equals(couponMsg)) {
            stringResponse.setMessege(e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(stringResponse);
        }
        stringResponse.setMessege(e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(stringResponse);
    }

    @ExceptionHandler(CouponDescriptionException.class)
    public ResponseEntity<StringResponse> CouponDescriptionExceptionHandler(CouponDescriptionException e) {
        stringResponse.setMessege(e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(stringResponse);
    }

    @ExceptionHandler(CouponAmountException.class)
    public ResponseEntity<StringResponse> CouponAmountExceptionHandler(CouponAmountException e) {
        stringResponse.setMessege(e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(stringResponse);
    }

    @ExceptionHandler(CouponPriceException.class)
    public ResponseEntity<StringResponse> CouponPriceExceptionHandler(CouponPriceException e) {
        stringResponse.setMessege(e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(stringResponse);
    }

    @ExceptionHandler(CouponDateException.class)
    public ResponseEntity<StringResponse> CouponDateExceptionHandler(CouponDateException e) {
        stringResponse.setMessege(e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(stringResponse);
    }

    @ExceptionHandler(CouponPurchaseException.class)
    public ResponseEntity<StringResponse> CouponPurchaseExceptionHandler(CouponPurchaseException e) {
        stringResponse.setMessege(e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(stringResponse);
    }


}
