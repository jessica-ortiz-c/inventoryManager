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
    public Product findById(UUID id){
        return products.get(id);
    }
  
    //Save or update a product
    public Product save(Product p){
        products.put(p.getId(), p);
        return p;
    }
  
    //Remove a product
    public void delete(UUID id){
        products.remove(id);
    }
}
