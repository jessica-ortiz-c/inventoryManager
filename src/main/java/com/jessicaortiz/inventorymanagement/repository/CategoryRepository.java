package com.jessicaortiz.inventorymanagement.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.jessicaortiz.inventorymanagement.model.Category;

/**
 * Repository interface for managing {@link Category} entities in MongoDB.
 * 
 * <p>Provides query methods to find categories by name and check for existence ignoring case.</p>
 */
public interface CategoryRepository extends MongoRepository<Category, String> {

    /**
     * Finds a category by its name, ignoring case sensitivity.
     *
     * @param name category name
     * @return an {@link Optional} containing the category if found
     */
    Optional<Category> findByNameIgnoreCase(String name);

    /**
     * Checks whether a category exists with the given name (case-insensitive).
     *
     * @param name category name
     * @return {@code true} if exists, otherwise {@code false}
     */
    boolean existsByNameIgnoreCase(String name);
}
