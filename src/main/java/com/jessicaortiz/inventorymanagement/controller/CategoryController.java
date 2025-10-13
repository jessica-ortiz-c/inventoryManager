package com.jessicaortiz.inventorymanagement.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.jessicaortiz.inventorymanagement.model.Category;
import com.jessicaortiz.inventorymanagement.service.CategoryService;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "*") // ajusta origen para seguridad (dev: * ok)
public class CategoryController {

    private final CategoryService service;

    public CategoryController(CategoryService service) {
        this.service = service;
    }

    // GET /categories -> lista completa de categorías (con id y name)
    @GetMapping
    public ResponseEntity<List<Category>> all() {
        return ResponseEntity.ok(service.findAll());
    }

    // GET /categories/names -> solo nombres (si lo prefieres)
    @GetMapping("/names")
    public ResponseEntity<List<String>> names() {
        return ResponseEntity.ok(service.findAllNames());
    }

    // POST /categories -> crear categoría
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
