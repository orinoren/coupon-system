package com.orinoren318598984.full_project.model_wrappers;


import com.orinoren318598984.full_project.model.Coupon;
import com.orinoren318598984.full_project.service.Role;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * This class provide utils to manipulate the data
 * retreive from the database to the relevant coupon wrapper for easily handling in the client side.<br/>
 * couponInnerObjectArray[0] always will be the basic coupon details and all the next elements will be extra info for each user.
 */
@Component
public class WrapperUtils {

    /**
     * This method
     * 1. Convert the list to array of objects.
     * 2. enter a for loop to get each object in the array.
     * 3. calls {@link #getCouponWrapperForRelaventRole(Role, Object[])} to retrive the coupon wrraper list for the relevant role.
     *
     * @param couponObjectList the multi dimension list that retreived from the database.
     * @param role             the role of the current user request.
     * @return couponWrapperList for the relevant user.
     */
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

    /**
     * This methods
     * 1. Calls {@link #convertArrayToCouponWrapper(Object[], Role)} to convert and retrevie the coupon wrapper from the array.
     *
     * @param role                   the role of the current user request.
     * @param couponInnerObjectArray object array that contains the all data of one coupon to the relevant user.
     * @return couponWrapper for the relevant user.
     */
    private Optional<? extends CouponWrapper> getCouponWrapperForRelaventRole(Role role, Object[] couponInnerObjectArray) {
        Optional<? extends CouponWrapper> couponWrapper = convertArrayToCouponWrapper(couponInnerObjectArray, role);
        return Optional.of(couponWrapper.get());
    }

    /**
     * This Method<br/>
     * 1. Casting the couponInnerObjectArray[0] to coupon.<br/>
     * 2. enter a switch case block by the role of the user.<br/>
     * 3. case GLOBAL - <br/>casting couponInnerObjectArray[1] to the company name. <br/>
     * casting couponInnerObjectArray[2] to the coupon image.<br/>
     * casting couponInnerObjectArray[3] to the number of purchases of the same coupon to help sort them by most purchased coupons.<br/>
     * making a new CouponWrapperForGlobal Object with the data relevant to the global user and return it.<br/>
     * case Company - <br/>
     * casting couponInnerObjectArray[1] to the coupon image.<br/>
     * making a new CouponWrapperForCompany Object with the data relevant to the company user and return it.<br/>
     * case Customer - <br/>
     * casting couponInnerObjectArray[1] to the coupon image.<br/>
     * casting couponInnerObjectArray[2] to number of coupons that repeat themselves to make the
     * customer see only one of them with deatil of how many he got of the same coupon .<br/>
     * making a new CouponWrapperForCustomer Object with the data relevant to the company user and return it.<br/>
     *
     * @param couponInnerObjectArray object array that contains the all data of one coupon to the relevant user.
     * @param role                   the role of the current user request.
     * @return the relevant coupon wrapper for each user role.
     */
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
                Long sameCouponAmount = (Long) couponInnerObjectArray[2];
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
