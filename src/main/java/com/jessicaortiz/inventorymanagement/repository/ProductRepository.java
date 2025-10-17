package com.jessicaortiz.inventorymanagement.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.jessicaortiz.inventorymanagement.model.Product;

/**
 * Repository interface for accessing {@link Product} entities from MongoDB.
 *
 * <p>Provides standard CRUD operations and a custom query to retrieve distinct category names.</p>
 */
@Repository
public interface ProductRepository extends MongoRepository<Product, UUID> {

    /**
     * Retrieves all distinct category names from the products collection.
     *
     * @return a list of distinct category strings
     */
    @Query("SELECT DISTINCT p.category FROM Product p")
    List<String> findDistinctCategories();

}