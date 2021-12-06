package com.orinoren318598984.full_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.orinoren318598984.full_project.model.Category;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepo extends JpaRepository<Category, Long> {
   String query="select c from Category as c where id=2 or id=3  ";
    @Query(value = query)
    List<Category> findByCategoryWith();
}
