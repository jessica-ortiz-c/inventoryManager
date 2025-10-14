package com.jessicaortiz.inventorymanagement.service;

import com.jessicaortiz.inventorymanagement.model.Category;
import com.jessicaortiz.inventorymanagement.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CategoryServiceTest {

    @Mock
    private CategoryRepository repository;

    @InjectMocks
    private CategoryService service;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateIfNotExists_NewCategory() {
        when(repository.findByNameIgnoreCase("food")).thenReturn(Optional.empty());
        when(repository.save(any(Category.class)))
                .thenReturn(new Category("1", "food"));

        Category result = service.createIfNotExists("food");

        assertEquals("food", result.getName());
        verify(repository, times(1)).save(any(Category.class));
    }

    @Test
    void testCreateIfNotExists_AlreadyExists() {
        Category existing = new Category("1", "food");
        when(repository.findByNameIgnoreCase("food")).thenReturn(Optional.of(existing));

        Category result = service.createIfNotExists("food");

        assertEquals(existing, result);
        verify(repository, never()).save(any());
    }

    @Test
    void testCreate_DuplicateThrowsException() {
        when(repository.existsByNameIgnoreCase("food")).thenReturn(true);

        assertThrows(IllegalArgumentException.class, () -> service.create("food"));
    }
}
