package com.orinoren318598984.full_project.model_wrappers;

import com.orinoren318598984.full_project.model.Coupon;
import com.orinoren318598984.full_project.service.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import java.util.List;

@NoArgsConstructor
@Data
public class CouponWrapperForCompany extends CouponWrapper {

    public CouponWrapperForCompany(Long id, Long companyId, Long category, String title, String description, LocalDate startDate, LocalDate endDate, Integer amount, Double price, Long imageId, byte[] image) {
        super(id, companyId, category, title, description, startDate, endDate, amount, price, imageId, image);
    }



    @Override
    public List<CouponWrapperForCompany> convertMultiDimensionListToOneDimensionArray(List<Object> listOfObjects) {
        WrapperUtils wrapperUtils = new WrapperUtils();
        List<CouponWrapperForCompany> couponWrappers = (List<CouponWrapperForCompany>) wrapperUtils.convertMultiDimensionListToOneDimensionArray(listOfObjects, Role.COMPANY);
        return couponWrappers;
    }


}
