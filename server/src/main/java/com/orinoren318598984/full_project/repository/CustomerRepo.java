package com.orinoren318598984.full_project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orinoren318598984.full_project.model.Customer;

@Repository
public interface CustomerRepo extends JpaRepository<Customer, Long> {
	Optional<Customer> findByEmailAndPassword(String email, String password);
}
