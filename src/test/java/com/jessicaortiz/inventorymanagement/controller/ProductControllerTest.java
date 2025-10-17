package com.jessicaortiz.inventorymanagement.controller;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import com.jessicaortiz.inventorymanagement.dto.ProductRequestDTO;
import com.jessicaortiz.inventorymanagement.model.Product;
import com.jessicaortiz.inventorymanagement.service.CategoryService;
import com.jessicaortiz.inventorymanagement.service.ProductService;

class ProductControllerTest {

    @Mock
    private ProductService productService;

    @Mock
    private CategoryService categoryService;

    @InjectMocks
    private ProductController controller;

    private ProductRequestDTO requestDTO;
    private Product product;

    @SuppressWarnings("unused")
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        requestDTO = new ProductRequestDTO();
        requestDTO.setName("Laptop");
        requestDTO.setPrice(new BigDecimal("2000"));
        requestDTO.setCategory("Electronics");
        requestDTO.setStock(10);
        requestDTO.setExpirationDate(LocalDate.of(2026, 1, 1));

        product = Product.builder()
                .id(UUID.randomUUID())
                .name("Laptop")
                .category("Electronics")
                .price(new BigDecimal("2000"))
                .stock(10)
                .expirationDate(LocalDate.of(2026, 1, 1))
                .build();
    }

    @Test
    void testCreate_Success() {
        when(productService.create(any(ProductRequestDTO.class))).thenReturn(product);

        ResponseEntity<Product> response = controller.create(requestDTO);
        Product responseBody = response.getBody();
        assertNotNull(responseBody);

        assertEquals(200, response.getStatusCode().value());
        assertEquals("Laptop", responseBody.getName());
        verify(categoryService).createIfNotExists("Electronics");
        verify(productService).create(requestDTO);
    }

    @SuppressWarnings("ThrowableResultIgnored")
    @Test
    void testCreate_Failure() {
        when(productService.create(any(ProductRequestDTO.class)))
                .thenThrow(new IllegalArgumentException("Invalid data"));

        assertThrows(IllegalArgumentException.class, () -> controller.create(requestDTO));
        verify(productService).create(requestDTO);
    }

    @Test
    void testGetById_Found() {
        when(productService.getById(any(UUID.class))).thenReturn(Optional.of(product));

        ResponseEntity<Product> response = controller.getById(product.getId());
        Product responseBody = response.getBody();
        assertNotNull(responseBody);

        assertEquals(200, response.getStatusCode().value());
        assertEquals("Laptop", responseBody.getName());
    }

    @Test
    void testGetById_NotFound() {
        when(productService.getById(any(UUID.class))).thenReturn(Optional.empty());

        ResponseEntity<Product> response = controller.getById(UUID.randomUUID());

        assertEquals(404, response.getStatusCode().value());
        assertNull(response.getBody());
    }

    @Test
    void testUpdateProduct() {
        when(productService.update(any(UUID.class), any(ProductRequestDTO.class))).thenReturn(product);

        ResponseEntity<Product> response = controller.update(product.getId(), requestDTO);
        Product responseBody = response.getBody();
        assertNotNull(responseBody);

        assertEquals(200, response.getStatusCode().value());
        assertEquals("Laptop", responseBody.getName());
    }

    @Test
    void testOutOfStock() {
        Product outOfStock = Product.builder()
                .id(product.getId())
                .name("Laptop")
                .stock(0)
                .build();

        when(productService.markOutOfStock(product.getId())).thenReturn(outOfStock);

        ResponseEntity<Product> response = controller.outOfStock(product.getId());
        Product responseBody = response.getBody();
        assertNotNull(responseBody);

        assertEquals(200, response.getStatusCode().value());
        assertEquals(0, responseBody.getStock());
    }

    @Test
    void testInStock() {
        Product updated = Product.builder()
                .id(product.getId())
                .name("Laptop")
                .stock(20)
                .build();

        when(productService.updateStock(product.getId(), 20)).thenReturn(updated);

        ResponseEntity<Product> response = controller.inStock(product.getId(), 20);
        Product responseBody = response.getBody();
        assertNotNull(responseBody);

        assertEquals(200, response.getStatusCode().value());
        assertEquals(20, responseBody.getStock());
    }

    @Test
    void testDeleteProduct() {
        doNothing().when(productService).delete(product.getId());

        ResponseEntity<Void> response = controller.delete(product.getId());

        assertEquals(204, response.getStatusCode().value());
        verify(productService).delete(product.getId());
    }

    @Test
    void testGetAllProducts() {
        Page<Product> page = new PageImpl<>(List.of(product));
        when(productService.getAllPaginated(any(Pageable.class))).thenReturn(page);

        ResponseEntity<Page<Product>> response = controller.getAllProducts(Pageable.unpaged());
        Page<Product> responseBody = response.getBody();
        assertNotNull(responseBody);

        assertEquals(200, response.getStatusCode().value());
        assertEquals(1, responseBody.getContent().size());
    }

    @Test
    void testGetProductCategories() {
        List<String> categories = List.of("Electronics", "Food");
        when(productService.getDistinctCategories()).thenReturn(categories);

        ResponseEntity<List<String>> response = controller.getProductCategories();
        List<String> responseBody = response.getBody();
        assertNotNull(responseBody);

        assertEquals(200, response.getStatusCode().value());
        assertEquals(2, responseBody.size());
    }
}
