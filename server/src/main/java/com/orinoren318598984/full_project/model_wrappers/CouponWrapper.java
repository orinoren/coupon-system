package com.orinoren318598984.full_project.model_wrappers;

import com.orinoren318598984.full_project.model.Coupon;
import com.orinoren318598984.full_project.service.Role;
import lombok.*;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Abstract class for coupon wrapper .<br/>
 * 1. This class helps to convert the coupon details from the database to a comfortable
 *    object that can handle easily in the client side.<br/>
 * 2. holds the associated properties for coupon wrappers for company/customer/global.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class CouponWrapper {

    private Long id;

    private Long companyId;

    private Long category;

    private String title;

    private String description;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer amount;

    private Double price;

    private Long ImageId;

    private byte[] Image;

    /**
     * This method helps to convert the multi dimension list that retrived from the databse to one dimension Array for easliy future operations.
     *
     * @param listOfObject
     * @return List<? extends CouponWrapper>
     */
    public abstract List<? extends CouponWrapper> convertMultiDimensionListToOneDimensionArray(List<Object> listOfObject);
}