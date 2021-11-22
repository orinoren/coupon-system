package com.orinoren318598984.full_project.model_wrappers;

import com.orinoren318598984.full_project.model.Coupon;
import com.orinoren318598984.full_project.service.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CouponWrapperForAdmin extends CouponWrapper {
    private String companyName;


    public CouponWrapperForAdmin(Long id, Long companyId, Long categoryId, String title, String description, LocalDate startDate, LocalDate endDate, Integer amount, Double price, Long ImageId, byte[] Image, String companyName) {
        super(id, companyId, categoryId, title, description, startDate, endDate, amount, price, ImageId, Image);
        this.companyName = companyName;
    }


@Override
    public List<CouponWrapperForAdmin> convertMultiDimensionListToOneDimensionArray(List<Object> listOfObjects) {
        WrapperUtils wrapperUtils = new WrapperUtils();
        List<CouponWrapperForAdmin> couponWrappers = (List<CouponWrapperForAdmin>) wrapperUtils.convertMultiDimensionListToOneDimensionArray(listOfObjects, Role.ADMIN);
        return couponWrappers;
    }

}
