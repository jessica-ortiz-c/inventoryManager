package com.jessicaortiz.inventorymanagement.repository;

import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.jessicaortiz.inventorymanagement.model.Category;

public interface CategoryRepository extends MongoRepository<Category, String> {
    Optional<Category> findByNameIgnoreCase(String name);
    boolean existsByNameIgnoreCase(String name);
}
