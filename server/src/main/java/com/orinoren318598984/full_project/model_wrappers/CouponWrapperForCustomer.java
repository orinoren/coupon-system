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
import java.util.ArrayList;
import java.util.List;


@NoArgsConstructor
@Data
@Component
public class CouponWrapperForCustomer extends CouponWrapper {

    private Long sameCouponAmount;
    @JsonIgnore
    @Autowired
    private WrapperUtils wrapperUtils;

    public CouponWrapperForCustomer(Long id, Long companyId, Long categoryId, String title, String description, LocalDate startDate, LocalDate endDate, Integer amount, Double price, Long ImageId, byte[] Image, Long sameCouponAmount) {
        super(id, companyId, categoryId, title, description, startDate, endDate, amount, price, ImageId, Image);
        this.sameCouponAmount = sameCouponAmount;
    }

    @Override
    public List<CouponWrapperForCustomer> convertMultiDimensionListToOneDimensionArray(List<Object> listOfObjects) {
        List<CouponWrapperForCustomer> couponWrappers = (List<CouponWrapperForCustomer>) wrapperUtils.convertMultiDimensionListToOneDimensionArray(listOfObjects, Role.CUSTOMER);
        return couponWrappers;
    }

}
