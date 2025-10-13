package com.jessicaortiz.inventorymanagement.repository;

import com.jessicaortiz.inventorymanagement.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends MongoRepository<Product, UUID> {

    @Query("SELECT DISTINCT p.category FROM Product p")
List<String> findDistinctCategories();

}