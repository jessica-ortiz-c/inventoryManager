package com.jessicaortiz.inventorymanagement.controller;

import com.jessicaortiz.inventorymanagement.model.Product;
import com.jessicaortiz.inventorymanagement.repository.ProductRepository;

import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.stream.*;
import java.util.UUID;
import java.time.LocalDate;

import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/products")


@CrossOrigin(origins = "http://192.168.1.72:3000/", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})

public class ProductController {

    private final ProductRepository repository;

    public ProductController(ProductRepository repository) {
        this.repository = repository;
    }
  

    //API endpoints
    //GET /products
    //can filter with name and category

    @GetMapping
    public List<Product> getAll(@RequestParam(required = false) String name,
                                @RequestParam(required = false) String category) {

        Stream<Product> stream = repository.findAll().stream();

        if (name != null && !name.isEmpty()) {
            stream = stream.filter(p -> p.getName() != null &&
                    p.getName().toLowerCase()
                    .contains(name.toLowerCase()));
        }
        if (category != null && !category.isEmpty()) {
            stream = stream.filter(p -> 
                p.getCategory() != null &&
                p.getCategory().stream().anyMatch(c -> c.equalsIgnoreCase(category))
            );

        }
        
        return stream.toList();
    }
    
    //POST /products
    //Creates a product
    @PostMapping
    public Product create(@RequestBody Product product){
        if (product.getName() == null || product.getName().trim().isEmpty()) {
            throw new RuntimeException("Product name cannot be empty.");
        }
        if (product.getPrice() == null) {
            throw new RuntimeException("Price must be provided.");
        }
        if (product.getStock() == null) {
            throw new RuntimeException("Stock must be provided.");
        }
        
        product.setId(UUID.randomUUID()); 
        Product saved = repository.save(product);
        return saved;
    }
  
    //PUT /products/{id}
    //Updates product 
    @PutMapping("/{id}")
    public Product update(@PathVariable UUID id,@RequestBody Product product){
        Product existing = repository.findById(id);
        //System.out.println(id);
        if (existing == null) {
            throw new RuntimeException("Product not found.");
        }
         if (product.getName() == null || product.getName().trim().isEmpty()) {
            throw new RuntimeException("Product name cannot be empty.");
        }
        if (product.getPrice() == null) {
            throw new RuntimeException("Price must be provided.");
        }
        if (product.getStock() == null) {
            throw new RuntimeException("Stock must be provided.");
        }
        
        existing.setName(product.getName()); 
        existing.setCategory(product.getCategory()); 
        existing.setPrice(product.getPrice()); 
        existing.setStock(product.getStock()); 
        existing.setExpirationDate(product.getExpirationDate()); 
        existing.setUpdateDate(LocalDate.now());  
        return repository.save(existing);
    }
  
    //POST /products/{id}/outofstock
    @PostMapping("/{id}/outofstock")
    public Product outOfStock(@PathVariable UUID id){
        Product p = repository.findById(id);
        if (p == null) {
            throw new RuntimeException("Product not found.");
        }
        p.setStock(0);
        p.setUpdateDate(LocalDate.now()); 
        return repository.save(p);
    }
  
    //PUT /products/{id}/instock
    @PutMapping("/{id}/instock")
    public Product inStock(@PathVariable UUID id,@RequestParam int stock){
        Product p = repository.findById(id);
        if (p == null) {
            throw new RuntimeException("Product not found.");
        }
        p.setStock(stock);
        p.setUpdateDate(LocalDate.now()); 
        return repository.save(p);
    }

    //DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable UUID id) {
    Product existing = repository.findById(id);
    if (existing == null) {
        return ResponseEntity.notFound().build();
    }
    repository.delete(id);
    return ResponseEntity.noContent().build();
}
}
