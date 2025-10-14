package com.jessicaortiz.inventorymanagement.service;

import com.jessicaortiz.inventorymanagement.dto.ProductRequestDTO;
import com.jessicaortiz.inventorymanagement.model.Product;
import com.jessicaortiz.inventorymanagement.repository.ProductRepository;
import org.junit.jupiter.api.*;
import org.mockito.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceTest {

    @Mock
    private ProductRepository repository;

    @InjectMocks
    private ProductService service;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    private ProductRequestDTO sampleDTO() {
        ProductRequestDTO dto = new ProductRequestDTO();
        dto.setName("Chocolate");
        dto.setCategory("Food");
        dto.setPrice(new BigDecimal("10.00"));
        dto.setStock(5);
        dto.setExpirationDate(LocalDate.now().plusDays(10));
        return dto;
    }

    @Test
    void testCreate_SavesProductSuccessfully() {
        ProductRequestDTO dto = sampleDTO();

        when(repository.save(any(Product.class))).thenAnswer(inv -> inv.getArgument(0));

        Product result = service.create(dto);

        assertEquals("Chocolate", result.getName());
        assertNotNull(result.getId());
        verify(repository, times(1)).save(any(Product.class));
    }

    @Test
    void testMarkOutOfStock_SetsStockToZero() {
        UUID id = UUID.randomUUID();
        Product existing = Product.builder()
                .id(id).name("Laptop").stock(10).build();

        when(repository.findById(id)).thenReturn(Optional.of(existing));
        when(repository.save(any(Product.class))).thenReturn(existing);

        Product updated = service.markOutOfStock(id);

        assertEquals(0, updated.getStock());
        verify(repository, times(1)).save(existing);
    }
}
