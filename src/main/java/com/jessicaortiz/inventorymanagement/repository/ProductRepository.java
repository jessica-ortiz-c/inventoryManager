package com.jessicaortiz.inventorymanagement.repository;

import com.jessicaortiz.inventorymanagement.model.Product;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Repository;

@Repository
public class ProductRepository {

    private final Map<UUID, Product> products = new ConcurrentHashMap<>();
  
    //Gets all the products
    public List<Product> findAll(){
        return new ArrayList<>(products.values()); 
    }
  
    //Finds a product by ID
    public Optional<Product> findById(UUID id){
        return Optional.ofNullable(products.get(id));
    }
  
    //Save or update a product
    public Product save(Product p) {
       if (p == null) {
        throw new IllegalArgumentException("Product cannot be null");
        }
        if (p.getId() == null) {
            p.setId(UUID.randomUUID());
            p.setCreationDate(java.time.LocalDate.now());
        }
        p.setUpdateDate(java.time.LocalDate.now());
        products.put(p.getId(), p);
        return p;
    }
  
    //Remove a product
    public void delete(UUID id){
        products.remove(id);
    }
}
