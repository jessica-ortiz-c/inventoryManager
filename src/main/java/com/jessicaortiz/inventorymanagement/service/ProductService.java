package com.jessicaortiz.inventorymanagement.service;

import com.jessicaortiz.inventorymanagement.dto.ProductRequestDTO;
import com.jessicaortiz.inventorymanagement.model.Product;
import com.jessicaortiz.inventorymanagement.repository.ProductRepository;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAll() {
        return productRepository.findAll();
    }

    public Optional<Product> getById(UUID id) {
        return productRepository.findById(id);
    }

    public Product create(ProductRequestDTO dto) {
        Product product = new Product();
        product.setId(UUID.randomUUID());
        product.setName(dto.getName());
        product.setPrice(BigDecimal.valueOf(dto.getPrice())); 
        product.setStock(dto.getStock());
        product.setCreationDate(LocalDate.now());
        product.setUpdateDate(LocalDate.now());

        return productRepository.save(product);
    }

    public Product update(UUID id, ProductRequestDTO dto) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existing.setName(dto.getName());
        existing.setPrice(BigDecimal.valueOf(dto.getPrice()));
        existing.setStock(dto.getStock());
        existing.setUpdateDate(LocalDate.now());

        return productRepository.save(existing);
    }

    public void delete(UUID id) {
        productRepository.delete(id);
    }

    public Product markOutOfStock(UUID id) {
        return productRepository.findById(id)
                .map(p -> {
                    p.setStock(0);
                    return productRepository.save(p);
                })
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id " + id));
    }

    public Product updateStock(UUID id, int stock) {
        return productRepository.findById(id)
                .map(p -> {
                    p.setStock(stock);
                    return productRepository.save(p);
                })
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id " + id));
    }
}
