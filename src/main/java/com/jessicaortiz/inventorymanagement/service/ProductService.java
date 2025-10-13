package com.jessicaortiz.inventorymanagement.service;

import com.jessicaortiz.inventorymanagement.dto.ProductRequestDTO;
import com.jessicaortiz.inventorymanagement.model.Product;
import com.jessicaortiz.inventorymanagement.repository.ProductRepository;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

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

    public Page<Product> getFilteredProducts(
        int page,
        int size,
        String sortBy,
        String order,
        String name,
        String categories,
        String availability
    ) {
        // Determinar dirección del ordenamiento (asc o desc)
        Sort.Direction direction = order.equalsIgnoreCase("desc")
            ? Sort.Direction.DESC
            : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));

        // Obtener todos los productos
        List<Product> allProducts = productRepository.findAll();

        // Filtrar según los parámetros
        List<Product> filtered = allProducts.stream()
            .filter(p -> name == null || name.isEmpty() ||
                    p.getName().toLowerCase().contains(name.toLowerCase()))
            .filter(p -> categories == null || categories.isEmpty() ||
                    categories.contains(p.getCategory()))
            .filter(p -> availability == null || availability.equals("all") ||
                    (availability.equals("in") && p.getStock() > 0) ||
                    (availability.equals("out") && p.getStock() == 0))
            // ✅ Aplicar ordenamiento manual si no usas repositorio con paginación dinámica
            .sorted((p1, p2) -> {
                try {
                    Object val1 = Product.class.getDeclaredMethod("get" + capitalize(sortBy)).invoke(p1);
                    Object val2 = Product.class.getDeclaredMethod("get" + capitalize(sortBy)).invoke(p2);
                    if (val1 instanceof Comparable && val2 instanceof Comparable) {
                        int result = ((Comparable) val1).compareTo(val2);
                        return direction == Sort.Direction.ASC ? result : -result;
                    }
                } catch (Exception ignored) {}
                return 0;
            })
            .toList();

        // Paginación manual
        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), filtered.size());
        List<Product> paged = filtered.subList(start, end);

        return new PageImpl<>(paged, pageable, filtered.size());
    }

    // 🔹 Método auxiliar para capitalizar el campo de ordenamiento
    private String capitalize(String str) {
        if (str == null || str.isEmpty()) return str;
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }

public List<String> getDistinctCategories() {
    return productRepository.findDistinctCategories();
}


}
