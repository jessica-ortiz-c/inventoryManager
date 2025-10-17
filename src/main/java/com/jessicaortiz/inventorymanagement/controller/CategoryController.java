package com.jessicaortiz.inventorymanagement.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jessicaortiz.inventorymanagement.model.Category;
import com.jessicaortiz.inventorymanagement.service.CategoryService;

/**
 * REST controller that handles HTTP requests related to category management.
 * 
 * <p>Provides endpoints for retrieving, creating, and listing category names.
 * Cross-Origin Resource Sharing (CORS) is allowed from all origins (to be restricted in production).</p>
 */
@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "*") // ajusta origen para seguridad (dev: * ok)
public class CategoryController {

    private final CategoryService service;

    /**
     * Constructs a new CategoryController with the provided {@link CategoryService}.
     *
     * @param service the category service for handling business logic
     */
    public CategoryController(CategoryService service) {
        this.service = service;
    }

    /**
     * Retrieves all categories stored in the database.
     *
     * @return a {@link ResponseEntity} containing a list of {@link Category} objects
     */
    @GetMapping
    public ResponseEntity<List<Category>> all() {
        return ResponseEntity.ok(service.findAll());
    }

    /**
     * Retrieves only the names of all categories.
     *
     * @return a {@link ResponseEntity} containing a list of category names
     */
    @GetMapping("/names")
    public ResponseEntity<List<String>> names() {
        return ResponseEntity.ok(service.findAllNames());
    }

    /**
     * Creates a new category if it does not already exist.
     *
     * @param body a map containing the category name in the "name" key
     * @return the created {@link Category}, or 400 if invalid, or 409 if already exists
     */
    @PostMapping
    public ResponseEntity<Category> create(@RequestBody Map<String, String> body) {
        String name = body.get("name");
        if (name == null || name.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        try {
            Category created = service.create(name);
            return ResponseEntity.ok(created);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(409).build(); // conflicto: ya existe
        }
    }
}
