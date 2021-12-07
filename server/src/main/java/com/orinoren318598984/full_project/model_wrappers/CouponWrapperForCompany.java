package com.orinoren318598984.full_project.model_wrappers;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.orinoren318598984.full_project.model.Coupon;
import com.orinoren318598984.full_project.service.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

import java.util.List;

/**
 * This class helps to convert the coupon details from the database
 * to a comfortable object that can handle easily in the client side.<br/>
 */
@NoArgsConstructor
@Data
@Component
public class CouponWrapperForCompany extends CouponWrapper {
    @JsonIgnore
    @Autowired
    private WrapperUtils wrapperUtils;

    public CouponWrapperForCompany(Long id, Long companyId, Long category, String title, String description, LocalDate startDate, LocalDate endDate, Integer amount, Double price, Long imageId, byte[] image) {
        super(id, companyId, category, title, description, startDate, endDate, amount, price, imageId, image);
    }


    /**
     * Calls {@link WrapperUtils#convertMultiDimensionListToOneDimensionArray(List, Role)} to get the List of CouponWrapperForCompany.
     * @param listOfObjects
     * @return couponWrappers
     */
    @Override
    public List<CouponWrapperForCompany> convertMultiDimensionListToOneDimensionArray(List<Object> listOfObjects) {
        List<CouponWrapperForCompany> couponWrappers = (List<CouponWrapperForCompany>) wrapperUtils.convertMultiDimensionListToOneDimensionArray(listOfObjects, Role.COMPANY);
        return couponWrappers;
    }


}
