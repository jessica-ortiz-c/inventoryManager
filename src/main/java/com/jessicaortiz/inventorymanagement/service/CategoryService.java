package com.jessicaortiz.inventorymanagement.service;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.jessicaortiz.inventorymanagement.model.Category;
import com.jessicaortiz.inventorymanagement.repository.CategoryRepository;

@Service
public class CategoryService {

    private final CategoryRepository repo;

    public CategoryService(CategoryRepository repo) {
        this.repo = repo;
    }

    public List<Category> findAll() {
        return repo.findAll();
    }

    public List<String> findAllNames() {
        return repo.findAll().stream().map(Category::getName).collect(Collectors.toList());
    }

    public Category createIfNotExists(String name) {
        String normalized = normalize(name);
        return repo.findByNameIgnoreCase(normalized)
            .orElseGet(() -> repo.save(new Category(null, normalized)));
    }

    public Category create(String name) {
        String normalized = normalize(name);
        if (repo.existsByNameIgnoreCase(normalized)) {
            throw new IllegalArgumentException("Category already exists: " + normalized);
        }
        return repo.save(new Category(null, normalized));
    }

    private String normalize(String s) {
        if (s == null) return null;
        return s.trim();
    }
}
