package com.orinoren318598984.full_project.model_wrappers;

import com.orinoren318598984.full_project.model.Coupon;
import com.orinoren318598984.full_project.service.Role;
import lombok.*;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class CouponWrapper {

    private Long id;

    private Long companyId;

    private Long categoryId;

    private String title;

    private String description;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer amount;

    private Double price;

    private Long ImageId;

    private byte[] Image;

    public abstract List<? extends CouponWrapper> convertMultiDimensionListToOneDimensionArray(List<Object> listOfObject);
}