package com.orinoren318598984.full_project.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "customer_vs_coupons")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CouponPurchase {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "coupon_id")
	private Coupon couponPurchaseId ;

	@ManyToOne
	@JoinColumn(name = "customer_id")
	private Customer customerPurchaseId;

}
