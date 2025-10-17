package com.jessicaortiz.inventorymanagement.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jessicaortiz.inventorymanagement.dto.ProductRequestDTO;
import com.jessicaortiz.inventorymanagement.model.Product;
import com.jessicaortiz.inventorymanagement.service.CategoryService;
import com.jessicaortiz.inventorymanagement.service.ProductService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000/", allowedHeaders = "*")
public class ProductController {

    private final ProductService productService;
    private final CategoryService categoryService;

    public ProductController(ProductService productService, CategoryService categoryService) {
        this.productService = productService;
        this.categoryService = categoryService;
    }

    @GetMapping("/paginated")
    public Page<Product> getPaginatedProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String order,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String categories,
            @RequestParam(required = false) String availability
    ) {
        return productService.getFilteredProducts(page, size, sortBy, order, name, categories, availability);
    }

    @GetMapping
    public ResponseEntity<Page<Product>> getAllProducts(Pageable pageable) {
        return ResponseEntity.ok(productService.getAllPaginated(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable UUID id) {
        return productService.getById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Product> create(@Valid @RequestBody ProductRequestDTO dto) {
        categoryService.createIfNotExists(dto.getCategory());
        return ResponseEntity.ok(productService.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable UUID id, @Valid @RequestBody ProductRequestDTO dto) {
        return ResponseEntity.ok(productService.update(id, dto));
    }

    @PostMapping("/{id}/outofstock")
    public ResponseEntity<Product> outOfStock(@PathVariable UUID id) {
        return ResponseEntity.ok(productService.markOutOfStock(id));
    }

    @PutMapping("/{id}/instock")
    public ResponseEntity<Product> inStock(@PathVariable UUID id, @RequestParam int stock) {
        return ResponseEntity.ok(productService.updateStock(id, stock));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getProductCategories() {
        return ResponseEntity.ok(productService.getDistinctCategories());
    }
}
