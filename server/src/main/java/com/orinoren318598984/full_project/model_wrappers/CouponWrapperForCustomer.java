package com.orinoren318598984.full_project.model_wrappers;

import com.orinoren318598984.full_project.model.Coupon;
import com.orinoren318598984.full_project.service.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CouponWrapperForCustomer extends CouponWrapper {

    private Long sameCouponAmount;

    public CouponWrapperForCustomer(Long id, Long companyId, Long categoryId, String title, String description, LocalDate startDate, LocalDate endDate, Integer amount, Double price, Long ImageId, byte[] Image, Long sameCouponAmount) {
        super(id, companyId, categoryId, title, description, startDate, endDate, amount, price, ImageId, Image);
        this.sameCouponAmount = sameCouponAmount;
    }

    @Override
    public List<CouponWrapperForCustomer> convertMultiDimensionListToOneDimensionArray(List<Object> listOfObjects) {
        WrapperUtils wrapperUtils = new WrapperUtils();
        List<CouponWrapperForCustomer> couponWrappers = (List<CouponWrapperForCustomer>) wrapperUtils.convertMultiDimensionListToOneDimensionArray(listOfObjects, Role.CUSTOMER);
        return couponWrappers;
    }

}
