package com.jessicaortiz.inventorymanagement.service;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.jessicaortiz.inventorymanagement.model.Category;
import com.jessicaortiz.inventorymanagement.repository.CategoryRepository;

/**
 * Service class responsible for managing product categories.
 * <p>
 * This class provides business logic for CRUD operations related to {@link Category},
 * including creation, retrieval, and validation of unique names. It serves as
 * the intermediary layer between the controller and the repository.
 * </p>
 *
 * <h3>Key Responsibilities:</h3>
 * <ul>
 *   <li>Retrieve all categories or their names only.</li>
 *   <li>Create new categories, avoiding duplicates via normalization and validation.</li>
 *   <li>Automatically create default categories if not already present.</li>
 * </ul>
 */
@Service
public class CategoryService {

    private final CategoryRepository repo;

    /**
     * Constructs a new {@code CategoryService} with dependency injection of
     * the {@link CategoryRepository}.
     *
     * @param repo the repository used for persistence operations
     */
    public CategoryService(CategoryRepository repo) {
        this.repo = repo;
    }

    /**
     * Retrieves all existing categories from the database.
     *
     * @return a list of all {@link Category} objects
     */
    public List<Category> findAll() {
        return repo.findAll();
    }

    /**
     * Retrieves the names of all registered categories.
     *
     * @return a list of category names as {@link String}
     */
    public List<String> findAllNames() {
        return repo.findAll().stream().map(Category::getName).collect(Collectors.toList());
    }

    /**
     * Creates a category if it does not already exist.
     * <p>
     * This method normalizes the input name, checks for existence ignoring case,
     * and creates the category if absent.
     * </p>
     *
     * @param name the name of the category to be created
     * @return the created or existing {@link Category} object
     */
    public Category createIfNotExists(String name) {
        String normalized = normalize(name);
        return repo.findByNameIgnoreCase(normalized)
            .orElseGet(() -> repo.save(new Category(null, normalized)));
    }

    /**
     * Creates a new category only if it does not exist.
     * Throws an exception when a duplicate name is found.
     *
     * @param name the category name to create
     * @return the newly created {@link Category}
     * @throws IllegalArgumentException if the category already exists
     */
    public Category create(String name) {
        String normalized = normalize(name);
        if (repo.existsByNameIgnoreCase(normalized)) {
            throw new IllegalArgumentException("Category already exists: " + normalized);
        }
        return repo.save(new Category(null, normalized));
    }

    /**
     * Normalizes a string by trimming whitespace.
     *
     * @param s the input string
     * @return a trimmed version of the string, or {@code null} if input is null
     */
    private String normalize(String s) {
        if (s == null) return null;
        return s.trim();
    }
}
