package com.jessicaortiz.inventorymanagement.controller;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.mockito.ArgumentMatchers.anyString;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import com.jessicaortiz.inventorymanagement.model.Category;
import com.jessicaortiz.inventorymanagement.service.CategoryService;

@ExtendWith(MockitoExtension.class)
class CategoryControllerTest {

    @Mock
    private CategoryService service;

    @InjectMocks
    private CategoryController controller;
    
    @SuppressWarnings("null")
    @Test
    void all_shouldReturnAllCategories() {
        List<Category> categories = List.of(
            new Category("1", "Food"),
            new Category("2", "Drinks")
        );
        when(service.findAll()).thenReturn(categories);

        ResponseEntity<List<Category>> response = controller.all();

        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals(2, response.getBody().size());
        verify(service).findAll();
    }

    @Test
    void names_shouldReturnCategoryNames() {
        List<String> names = List.of("Food", "Drinks");
        when(service.findAllNames()).thenReturn(names);

        ResponseEntity<List<String>> response = controller.names();

        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals(names, response.getBody());
        verify(service).findAllNames();
    }

    @Test
    void create_shouldCreateCategory() {
        Category category = new Category("1", "NewCategory");
        when(service.create("NewCategory")).thenReturn(category);

        ResponseEntity<Category> response = controller.create(Map.of("name", "NewCategory"));

        assertEquals(200, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals(category, response.getBody());
        verify(service).create("NewCategory");
    }

    @Test
    void create_shouldReturnBadRequestWhenNameIsMissing() {
        ResponseEntity<Category> response = controller.create(Map.of());

        assertEquals(400, response.getStatusCode().value());
        verify(service, never()).create(anyString());
    }

    @Test
    void create_shouldReturnConflictWhenAlreadyExists() {
        when(service.create("Duplicate")).thenThrow(new IllegalArgumentException("Already exists"));

        ResponseEntity<Category> response = controller.create(Map.of("name", "Duplicate"));

        assertEquals(409, response.getStatusCode().value());
        verify(service).create("Duplicate");
    }
}
