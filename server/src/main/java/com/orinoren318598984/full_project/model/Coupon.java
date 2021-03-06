package com.orinoren318598984.full_project.model;

import java.time.LocalDate;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import com.fasterxml.jackson.annotation.JsonUnwrapped;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "coupon")
@Data
public class Coupon {
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	@Column(name = "id")
	private Long id;
	@ManyToOne
	@JoinColumn(name = "company_id")
	private Company company;
	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;
	@Column(name = "TITLE")
	private String title;
	@Column(name = "DESCRIPTION")
	private String description;
	@Column(name = "START_DATE", columnDefinition = "DATE")
	private LocalDate startDate;
	@Column(name = "END_DATE", columnDefinition = "DATE")
	private LocalDate endDate;
	@Column(name = "AMOUNT")
	private Integer amount;
	@Column(name = "PRICE")
	private Double price;

	private Long couponImage;

	@OneToMany(mappedBy = "couponPurchaseId", cascade = CascadeType.REMOVE)
	private List<CouponPurchase> couponPurchase ;

	@Override
	public String toString() {
		return String.format("%s  %s  %s  %s  %s  %s  %s  %s  %s", "Coupon: " + id,
				"companyId: " + company.getId(), "categoryId: " + category.getId(), "title: " + title,
				"description: " + description, "start date: " + startDate, "end date: " + endDate, "amount: " + amount,
				"price: " + price);
	}

}
