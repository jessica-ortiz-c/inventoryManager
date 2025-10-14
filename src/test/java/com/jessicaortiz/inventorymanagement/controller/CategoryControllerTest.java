package com.jessicaortiz.inventorymanagement.controller;

import com.jessicaortiz.inventorymanagement.model.Category;
import com.jessicaortiz.inventorymanagement.service.CategoryService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.*;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.Mockito.*;

@WebMvcTest(CategoryController.class)
class CategoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CategoryService service;

    @Test
    void testGetAllCategories_ReturnsList() throws Exception {
        List<Category> categories = List.of(new Category("1", "Food"));
        when(service.findAll()).thenReturn(categories);

        mockMvc.perform(get("/categories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Food"));
    }

    @Test
    void testCreateCategory_Success() throws Exception {
        Category cat = new Category("1", "Electronics");
        when(service.create("Electronics")).thenReturn(cat);

        mockMvc.perform(post("/categories")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"Electronics\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Electronics"));
    }

    @Test
    void testCreateCategory_Conflict() throws Exception {
        when(service.create("Food")).thenThrow(new IllegalArgumentException());

        mockMvc.perform(post("/categories")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"Food\"}"))
                .andExpect(status().isConflict());
    }
}
