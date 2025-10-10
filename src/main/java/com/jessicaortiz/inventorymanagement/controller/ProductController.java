package com.jessicaortiz.inventorymanagement.controller;

import com.jessicaortiz.inventorymanagement.dto.ProductRequestDTO;
import com.jessicaortiz.inventorymanagement.model.Product;
import com.jessicaortiz.inventorymanagement.service.ProductService;

import org.springframework.web.bind.annotation.*;
import java.util.*;

import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/products")
//home http://192.168.1.72:3000/  methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS}
@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    //GET /products
    @GetMapping
    public ResponseEntity<List<Product>> getAll() {
        return ResponseEntity.ok(productService.getAll());
    }
    
    //GET /products/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable UUID id) {
        return productService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //POST /products
    @PostMapping
    public ResponseEntity<Product> create(@Valid @RequestBody ProductRequestDTO dto) {
        //System.out.println("DTO recibido: " + dto); // 👈 imprime todo
        return ResponseEntity.ok(productService.create(dto));
    }

    //PUT /products/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable UUID id,
                                          @Valid @RequestBody ProductRequestDTO dto) {
        return ResponseEntity.ok(productService.update(id, dto));
    }

    //POST /products/{id}/outofstock
    @PostMapping("/{id}/outofstock")
    public ResponseEntity<Product> outOfStock(@PathVariable UUID id) {
        Product updated = productService.markOutOfStock(id);
        return ResponseEntity.ok(updated);
    }

    //PUT /products/{id}/instock?stock=[#]
    @PutMapping("/{id}/instock")
    public ResponseEntity<Product> inStock(@PathVariable UUID id, @RequestParam int stock) {
        Product updated = productService.updateStock(id, stock);
        return ResponseEntity.ok(updated);
    }

    //DELETE /products/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
