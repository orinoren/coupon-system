package com.orinoren318598984.full_project.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "company")
@Builder
@JsonPropertyOrder({"id"})
public class Company {
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private Long id;
	@Column(name = "COMPANY_NAME")
	private String name;
	@Column(name = "COMPANY_EMAIL")
	private String email;
	@Column(name = "COMPANY_PASSWORD")
	private String password;
	@OneToMany(mappedBy = "companyOfCoupon", cascade = CascadeType.ALL)
	@JsonIgnore
	private final List<Coupon> couponsOfCompany = new ArrayList<Coupon>();

	public Company(String name, String email, String password) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
	}

	@JsonProperty("company_id")
	public Long getId() {
		return id;
	}

	@Override
	public String toString() {
		return String.format("%s %s %s %s", "Company: " + "companyId: " + id, "name: " + name, "email: " + email,
				"password: " + password);
	}

}
