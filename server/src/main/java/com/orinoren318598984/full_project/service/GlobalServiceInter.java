package com.orinoren318598984.full_project.service;

import com.orinoren318598984.full_project.model_wrappers.CouponWrapperForGlobal;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

public interface GlobalServiceInter {
	
	 List<CouponWrapperForGlobal> getAllCoupons();
	 List<CouponWrapperForGlobal> getCouponsSearchResult(String searchInput, Optional<Double> maxPriceSearch , Optional<List<Integer>> categorySearch);
}
