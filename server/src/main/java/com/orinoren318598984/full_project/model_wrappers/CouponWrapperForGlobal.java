package com.orinoren318598984.full_project.model_wrappers;

import com.orinoren318598984.full_project.service.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CouponWrapperForGlobal extends CouponWrapper {
    private String companyName;
    private Long numberOfPurchased;

    public CouponWrapperForGlobal(Long id, Long companyId, Long categoryId, String title, String description, LocalDate startDate, LocalDate endDate, Integer amount, Double price, Long ImageId, byte[] Image, String companyName, Long numberOfPurchased) {
        super(id, companyId, categoryId, title, description, startDate, endDate, amount, price, ImageId, Image);
        this.companyName = companyName;
        this.numberOfPurchased = numberOfPurchased;
    }


    @Override
    public List<CouponWrapperForGlobal> convertMultiDimensionListToOneDimensionArray(List<Object> listOfObjects) {
        WrapperUtils wrapperUtils = new WrapperUtils();
        List<CouponWrapperForGlobal> couponWrappers = (List<CouponWrapperForGlobal>) wrapperUtils.convertMultiDimensionListToOneDimensionArray(listOfObjects, Role.GLOBAL);
        return couponWrappers;
    }

}
