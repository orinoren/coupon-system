package com.orinoren318598984.full_project.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.NoArgsConstructor;

@NoArgsConstructor

@Entity
@Table(name = "category")
public class Category {

	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	@Column(name = "ID", insertable = false)
	private Long id;
	@Enumerated(EnumType.STRING)
	@Column(name = "NAME", insertable = false)
	private CategoryEnum name;

	@OneToMany(mappedBy = "categoryOfCoupon")
	@JsonIgnore
	private List<Coupon> coupons = new ArrayList<Coupon>();

	public Category(CategoryEnum name) {
		super();
		this.name = name;
	}
	@JsonProperty("category_id")
	public Long getId() {
		return id;
	}

	@Override
	public String toString() {
		return String.format("%s %s ", id, name);
	}

}
