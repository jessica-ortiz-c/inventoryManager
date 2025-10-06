package com.jessicaortiz.inventorymanagement.controller;

import com.jessicaortiz.inventorymanagement.dto.ProductRequestDTO;
import com.jessicaortiz.inventorymanagement.model.Product;
import com.jessicaortiz.inventorymanagement.service.ProductService;
import com.jessicaortiz.inventorymanagement.repository.ProductRepository;

import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.stream.*;
import java.time.LocalDate;

import org.springframework.http.ResponseEntity;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/products")
//home http://192.168.1.72:3000/  methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS}
@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }
  

    //API endpoints
    //GET /products
    @GetMapping //@RequestParam(required = false) String name, @RequestParam(required = false) String category
    public ResponseEntity<List<Product>> getAll() {
        return ResponseEntity.ok(productService.getAll());
    }
    

    @GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable UUID id) {
        return productService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //POST /products
    @PostMapping
    public ResponseEntity<Product> create(@Valid @RequestBody ProductRequestDTO dto) {
        return ResponseEntity.ok(productService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable UUID id,
                                          @Valid @RequestBody ProductRequestDTO dto) {
        return ResponseEntity.ok(productService.update(id, dto));
    }

/*     //POST /products/{id}/outofstock
    @PostMapping("/{id}/outofstock")
    public ResponseEntity<Product> outOfStock(@PathVariable UUID id){
        return repository.findById(id)
                .map(p -> {
                    p.setStock(0);
                    Product updated = repository.save(p);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }
  
    //PUT /products/{id}/instock
    @PutMapping("/{id}/instock")
    public ResponseEntity<Product> inStock(@PathVariable UUID id,@RequestParam int stock){
        return repository.findById(id)
                .map(p -> {
                    p.setStock(stock);
                    Product updated = repository.save(p);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }
 */

 @PostMapping("/{id}/outofstock")
    public ResponseEntity<Product> outOfStock(@PathVariable UUID id) {
        Product updated = productService.markOutOfStock(id);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/{id}/instock")
    public ResponseEntity<Product> inStock(@PathVariable UUID id, @RequestParam int stock) {
        Product updated = productService.updateStock(id, stock);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
