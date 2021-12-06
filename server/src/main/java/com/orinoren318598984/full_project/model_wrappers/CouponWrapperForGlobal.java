package com.orinoren318598984.full_project.model_wrappers;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.orinoren318598984.full_project.service.Role;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;


@NoArgsConstructor
@Data
@Component
public class CouponWrapperForGlobal extends CouponWrapper {
    private String companyName;
    private Long numberOfPurchased;
    @Autowired
    private WrapperUtils wrapperUtils;

    public CouponWrapperForGlobal(Long id, Long companyId, Long categoryId, String title, String description, LocalDate startDate, LocalDate endDate, Integer amount, Double price, Long ImageId, byte[] Image, String companyName, Long numberOfPurchased) {
        super(id, companyId, categoryId, title, description, startDate, endDate, amount, price, ImageId, Image);
        this.companyName = companyName;
        this.numberOfPurchased = numberOfPurchased;
    }


    @Override
    public List<CouponWrapperForGlobal> convertMultiDimensionListToOneDimensionArray(List<Object> listOfObjects) {
        List<CouponWrapperForGlobal> couponWrappers = (List<CouponWrapperForGlobal>) wrapperUtils.convertMultiDimensionListToOneDimensionArray(listOfObjects, Role.GLOBAL);
        return couponWrappers;
    }

}
