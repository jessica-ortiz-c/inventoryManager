package com.jessicaortiz.inventorymanagement.controller;

import com.jessicaortiz.inventorymanagement.dto.ProductRequestDTO;
import com.jessicaortiz.inventorymanagement.model.Product;
import com.jessicaortiz.inventorymanagement.service.ProductService;
import com.jessicaortiz.inventorymanagement.service.CategoryService;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    @MockBean
    private CategoryService categoryService;

    @Test
    void testCreateProduct_Success() throws Exception {
        Product product = Product.builder()
                .id(UUID.randomUUID())
                .name("Laptop")
                .price(new BigDecimal("2000"))
                .category("Electronics")
                .stock(5)
                .expirationDate(LocalDate.now().plusDays(10))
                .build();

        Mockito.when(productService.create(any(ProductRequestDTO.class)))
                .thenReturn(product);

        mockMvc.perform(post("/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                {
                    "name": "Laptop",
                    "price": 2000.00,
                    "category": "Electronics",
                    "stock": 5,
                    "expirationDate": "2025-12-31"
                }
                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Laptop"));
    }
}
