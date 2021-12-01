package com.orinoren318598984.full_project.model_wrappers;


import com.orinoren318598984.full_project.model.Coupon;
import com.orinoren318598984.full_project.service.Role;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class WrapperUtils {

    public List<? extends CouponWrapper> convertMultiDimensionListToOneDimensionArray(List<Object> couponObjectList, Role role) {
        Object[] couponOuterObjectArray = couponObjectList.toArray();
        List<CouponWrapper> couponWrapperList = new ArrayList<>();
        for (int i = 0; i < couponOuterObjectArray.length; i++) {
            Object[] couponInnerObjectArray = (Object[]) couponOuterObjectArray[i];
            Optional<? extends CouponWrapper> couponWrapper = getCouponWrapperForRelaventRole(role, couponInnerObjectArray);
            couponWrapperList.add(couponWrapper.get());
        }
        return couponWrapperList;
    }

    private Optional<? extends CouponWrapper> getCouponWrapperForRelaventRole(Role role, Object[] couponInnerObjectArray) {
        return Optional.of(convertArrayToCouponWrapper(couponInnerObjectArray, role).get());
    }

    private Optional<? extends CouponWrapper> convertArrayToCouponWrapper(Object[] couponInnerObjectArray, Role role) {
            Coupon coupon = (Coupon) couponInnerObjectArray[0];
            switch (role) {
                case GLOBAL:
                    String companyName = (String) couponInnerObjectArray[1];
                    byte[] image = (byte[]) couponInnerObjectArray[2];
                    Long numberOfPurchases = (Long) couponInnerObjectArray[3];
                    return Optional.of(new CouponWrapperForGlobal(coupon.getId(),
                            coupon.getCompany().getId(),
                            coupon.getCategory().getId(),
                            coupon.getTitle(),
                            coupon.getDescription(),
                            coupon.getStartDate(),
                            coupon.getEndDate(),
                            coupon.getAmount(),
                            coupon.getPrice(),
                            coupon.getCouponImage(),
                            image,
                            companyName,
                            numberOfPurchases));
                case COMPANY:
                    byte[] imageForCompany = (byte[]) couponInnerObjectArray[1];
                    return Optional.of(new CouponWrapperForCompany(coupon.getId(),
                            coupon.getCompany().getId(),
                            coupon.getCategory().getId(),
                            coupon.getTitle(),
                            coupon.getDescription(),
                            coupon.getStartDate(),
                            coupon.getEndDate(),
                            coupon.getAmount(),
                            coupon.getPrice(),
                            coupon.getCouponImage(),
                            imageForCompany));
                case CUSTOMER:
                    byte[] imageForCustomer = (byte[]) couponInnerObjectArray[1];
                    Long sameCouponAmount=(Long)couponInnerObjectArray[2];
                    return Optional.of(new CouponWrapperForCustomer(coupon.getId(),
                            coupon.getCompany().getId(),
                            coupon.getCategory().getId(),
                            coupon.getTitle(),
                            coupon.getDescription(),
                            coupon.getStartDate(),
                            coupon.getEndDate(),
                            coupon.getAmount(),
                            coupon.getPrice(),
                            coupon.getCouponImage(),
                            imageForCustomer,
                            sameCouponAmount));

            }

        return Optional.empty();
    }


}
