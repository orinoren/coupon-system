package com.orinoren318598984.full_project.model;

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
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Builder
@NoArgsConstructor
@Data
@Entity
@Table(name = "customer")
@JsonPropertyOrder({"id"})
public class Customer {
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	@Column(name = "ID")
	private Long id;
	@Column(name = "FIRST_NAME")
	private String first_name;
	@Column(name = "LAST_NAME")
	private String last_name;
	@Column(name = "EMAIL")
	private String email;
	@Column(name = "PASSWORD")
	private String password;
    @JsonIgnore
	@OneToMany(mappedBy = "customerPurchaseId" ,cascade = CascadeType.ALL)
	private List<CouponPurchase> customerPurchase ;

	@Override
	public String toString() {
		return String.format("%s  %s  %s  %s  %s ", "Customer: " + "id " + id, "first name: " + first_name,
				"last name: " + last_name, "email: " + email, "password: " + password);
	}

}
