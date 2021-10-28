package com.orinoren318598984.full_project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.orinoren318598984.full_project.model.Company;
@Repository
public interface CompanyRepo extends JpaRepository<Company,Long> {
	Optional<Company> findByEmailAndPassword(String email, String password);

}
