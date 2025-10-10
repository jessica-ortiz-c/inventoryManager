package com.jessicaortiz.inventorymanagement.service;

import com.jessicaortiz.inventorymanagement.dto.ProductRequestDTO;
import com.jessicaortiz.inventorymanagement.model.Product;
import com.jessicaortiz.inventorymanagement.repository.ProductRepository;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;

import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Page<Product> getAllPaginated(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public Optional<Product> getById(UUID id) {
        return productRepository.findById(id);
    }

    public Product create(ProductRequestDTO dto) {
        Product product = new Product();
        product.setId(UUID.randomUUID());
        product.setName(dto.getName());
        product.setCategory(dto.getCategory());
        product.setPrice(dto.getPrice()); 
        product.setStock(dto.getStock());
        product.setCreationDate(LocalDate.now());
        product.setUpdateDate(LocalDate.now());
        product.setExpirationDate(dto.getExpirationDate()); 

        return productRepository.save(product);
    }

    public Product update(UUID id, ProductRequestDTO dto) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existing.setName(dto.getName());
        existing.setCategory(dto.getCategory());
        existing.setPrice(dto.getPrice());
        existing.setStock(dto.getStock());
        existing.setUpdateDate(LocalDate.now());
        existing.setExpirationDate(dto.getExpirationDate()); 

        return productRepository.save(existing);
    } 

    public Product save(Product product) {
        if (product.getId() == null) {
            product.setId(UUID.randomUUID());
        }
        return productRepository.save(product);
    }

    public void delete(UUID id) {
        productRepository.deleteById(id);
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
