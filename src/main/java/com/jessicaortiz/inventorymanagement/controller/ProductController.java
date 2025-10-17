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

/**
 * REST controller responsible for managing products.
 *
 * <p>Provides CRUD endpoints, pagination, filtering, and stock control.
 * Supports filtering by name, category, and availability.</p>
 */
@RestController
@RequestMapping("/products")
@CrossOrigin(allowedHeaders = "*")
public class ProductController {

    private final ProductService productService;
    private final CategoryService categoryService;

    /**
     * Creates a ProductController instance.
     *
     * @param productService service handling product logic
     * @param categoryService service handling category validation and creation
     */
    public ProductController(ProductService productService, CategoryService categoryService) {
        this.productService = productService;
        this.categoryService = categoryService;
    }

    /**
     * Retrieves a paginated and filtered list of products.
     *
     * @param page current page number
     * @param size number of elements per page
     * @param sortBy field used for sorting (default: name)
     * @param order sorting direction (asc or desc)
     * @param name optional name filter
     * @param categories optional category filter
     * @param availability optional availability filter
     * @return a paginated {@link Page} of {@link Product}
     */
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

    /**
     * Retrieves all products paginated using a {@link Pageable} request.
     *
     * @param pageable the pagination configuration
     * @return paginated list of products
     */
    @GetMapping
    public ResponseEntity<Page<Product>> getAllProducts(Pageable pageable) {
        return ResponseEntity.ok(productService.getAllPaginated(pageable));
    }

    /**
     * Finds a product by its unique identifier.
     *
     * @param id the UUID of the product
     * @return the product if found, or 404 if not found
     */
    @GetMapping("/{id}")
    public ResponseEntity<Product> getById(@PathVariable UUID id) {
        return productService.getById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Creates a new product.
     *
     * @param dto validated product creation data
     * @return the created {@link Product}
     */
    @PostMapping
    public ResponseEntity<Product> create(@Valid @RequestBody ProductRequestDTO dto) {
        categoryService.createIfNotExists(dto.getCategory());
        return ResponseEntity.ok(productService.create(dto));
    }

    /**
     * Updates an existing product by ID.
     *
     * @param id product identifier
     * @param dto updated product data
     * @return the updated {@link Product}
     */
    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable UUID id, @Valid @RequestBody ProductRequestDTO dto) {
        return ResponseEntity.ok(productService.update(id, dto));
    }

    /**
     * Marks a product as out of stock.
     *
     * @param id product identifier
     * @return the updated {@link Product}
     */
    @PostMapping("/{id}/outofstock")
    public ResponseEntity<Product> outOfStock(@PathVariable UUID id) {
        return ResponseEntity.ok(productService.markOutOfStock(id));
    }

    /**
     * Updates a product’s stock quantity.
     *
     * @param id product identifier
     * @param stock new stock value
     * @return the updated {@link Product}
     */
    @PutMapping("/{id}/instock")
    public ResponseEntity<Product> inStock(@PathVariable UUID id, @RequestParam int stock) {
        return ResponseEntity.ok(productService.updateStock(id, stock));
    }

    /**
     * Deletes a product by ID.
     *
     * @param id product identifier
     * @return HTTP 204 No Content
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Retrieves all distinct product categories.
     *
     * @return list of distinct category names
     */
    @GetMapping("/categories")
    public ResponseEntity<List<String>> getProductCategories() {
        return ResponseEntity.ok(productService.getDistinctCategories());
    }
}
