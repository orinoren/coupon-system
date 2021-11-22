package com.orinoren318598984.full_project.model_wrappers;


import com.orinoren318598984.full_project.model.Coupon;
import com.orinoren318598984.full_project.service.Role;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class WrapperUtils{

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
        switch (role) {
            case COMPANY:
                CouponWrapperForCompany couponWrapperCompany;
                couponWrapperCompany =
                        (CouponWrapperForCompany) convertArrayToCouponWrapper(couponInnerObjectArray, Role.COMPANY, couponInnerObjectArray.length).get();
                return Optional.of(couponWrapperCompany);
            case CUSTOMER:
                CouponWrapperForCustomer couponWrapperCustomer;
                couponWrapperCustomer =
                        (CouponWrapperForCustomer) convertArrayToCouponWrapper(couponInnerObjectArray,Role.CUSTOMER, couponInnerObjectArray.length).get();
                return Optional.of(couponWrapperCustomer);
            case ADMIN:
                CouponWrapperForAdmin couponWrapperAdmin;
                couponWrapperAdmin =
                        (CouponWrapperForAdmin) convertArrayToCouponWrapper(couponInnerObjectArray,Role.ADMIN, couponInnerObjectArray.length).get();
                return Optional.of(couponWrapperAdmin);
            default:
                return Optional.empty();
        }
    }

    private Optional<? extends CouponWrapper> convertArrayToCouponWrapper(Object[] couponInnerObjectArray,Role role, int innerArrayLength) {
        CouponWrapper couponWrapper = null;
        for (int j = 0; j < couponInnerObjectArray.length; j = j + innerArrayLength) {
            Coupon coupon = (Coupon) couponInnerObjectArray[0];
            byte[] image = (byte[]) couponInnerObjectArray[1];
            switch (role){
                case ADMIN:
                 return Optional.of(new CouponWrapperForAdmin(coupon.getId(),
                         coupon.getCompanyOfCoupon().getId(),
                         coupon.getCategoryOfCoupon().getId(),
                         coupon.getTitle(),
                         coupon.getDescription(),
                         coupon.getStartDate(),
                         coupon.getEndDate(),
                         coupon.getAmount(),
                         coupon.getPrice(),
                         coupon.getCouponImage(),
                         image,
                         (String) couponInnerObjectArray[2]));
                case COMPANY:
                    return Optional.of(new CouponWrapperForCompany(coupon.getId(),
                            coupon.getCompanyOfCoupon().getId(),
                            coupon.getCategoryOfCoupon().getId(),
                            coupon.getTitle(),
                            coupon.getDescription(),
                            coupon.getStartDate(),
                            coupon.getEndDate(),
                            coupon.getAmount(),
                            coupon.getPrice(),
                            coupon.getCouponImage(),
                            image));
                case CUSTOMER:
                    return Optional.of(new CouponWrapperForCustomer(coupon.getId(),
                            coupon.getCompanyOfCoupon().getId(),
                            coupon.getCategoryOfCoupon().getId(),
                            coupon.getTitle(),
                            coupon.getDescription(),
                            coupon.getStartDate(),
                            coupon.getEndDate(),
                            coupon.getAmount(),
                            coupon.getPrice(),
                            coupon.getCouponImage(),
                            image,
                            (Long)couponInnerObjectArray[2]));

            }
        }
        return Optional.empty();
    }


}
