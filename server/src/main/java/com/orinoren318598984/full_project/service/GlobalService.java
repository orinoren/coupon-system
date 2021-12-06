package com.orinoren318598984.full_project.service;

import java.util.List;
import java.util.Optional;

import com.orinoren318598984.full_project.model_wrappers.CouponWrapper;
import com.orinoren318598984.full_project.model_wrappers.CouponWrapperForGlobal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.orinoren318598984.full_project.repository.CouponRepo;

import javax.persistence.EntityManager;

@Service
public class GlobalService implements GlobalServiceInter {
    @Autowired
    private CouponRepo couponDao;

    @Autowired
    private CouponWrapperForGlobal wrapper;
    @Autowired
    private EntityManager entityManager;

    @Autowired
    private QueryUtils queryUtils;

    @Override
    public List<CouponWrapperForGlobal> getAllCoupons() {
        List<CouponWrapperForGlobal> couponWrappers = (List<CouponWrapperForGlobal>) wrapper.convertMultiDimensionListToOneDimensionArray(couponDao.findAllCouponsAndImages());
        return couponWrappers;
    }

    @Override
    public List<CouponWrapperForGlobal> getCouponsSearchResult(String searchInput, Optional<Double> maxPriceSearch, Optional<List<Integer>> categorySearch) {
        String query = "select c, com.name ,ci.image ,count(*)\n" +
                "from Coupon as c\n" +
                "left join CouponPurchase as cp on cp.couponPurchaseId=c.id  \n" +
                "join CouponImage as ci on c.couponImage = ci.id\n" +
                "join Company as com on c.company = com.id\n" +
                "where\n";
        query += queryUtils.getSearchQuery(categorySearch, maxPriceSearch, searchInput);
        System.out.println(query);
        List resultList = entityManager.createQuery(query).getResultList();
        List<CouponWrapperForGlobal> list = (List<CouponWrapperForGlobal>) wrapper.convertMultiDimensionListToOneDimensionArray(resultList);
        return list;
    }


}
