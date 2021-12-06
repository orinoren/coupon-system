package com.orinoren318598984.full_project.controller;

import java.sql.Array;
import java.util.List;
import java.util.Optional;

import com.orinoren318598984.full_project.model.Category;
import com.orinoren318598984.full_project.model_wrappers.CouponWrapperForGlobal;
import com.orinoren318598984.full_project.repository.CategoryRepo;
import com.orinoren318598984.full_project.service.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.orinoren318598984.full_project.service.GlobalServiceInter;
import javax.persistence.EntityManager;

/**
 * REST API FOR GLOBAL USER
 */
@RestController
@RequestMapping("global/")
public class GlobalController {

	@Autowired
	private GlobalServiceInter global;
    @Autowired
    private CategoryRepo categoryRepo;

	/**
	 * @return ResponseEntity with {@link CouponWrapperForGlobal}
	 */
	@GetMapping("coupons")
	public ResponseEntity<List<CouponWrapperForGlobal>> getAllCoupons() {

		return ResponseEntity.ok(global.getAllCoupons());
	}

	@GetMapping({"search/{searchInput}","search/{searchInput}/{maxPriceSearch}/{categorySearch}"})
	public ResponseEntity<List<CouponWrapperForGlobal>> getSearchCouponResult(@PathVariable String searchInput, @PathVariable Optional<Double> maxPriceSearch , @PathVariable Optional<List<Integer>>categorySearch) {
		return ResponseEntity.ok(global.getCouponsSearchResult(searchInput,maxPriceSearch,categorySearch));
	}

	@GetMapping("categories")
	public ResponseEntity<List<Category>> getAllCategories() {
		return ResponseEntity.ok(categoryRepo.findAll());
	}

}
