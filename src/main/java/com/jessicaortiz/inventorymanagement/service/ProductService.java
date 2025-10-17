package com.jessicaortiz.inventorymanagement.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.jessicaortiz.inventorymanagement.dto.ProductRequestDTO;
import com.jessicaortiz.inventorymanagement.model.Product;
import com.jessicaortiz.inventorymanagement.repository.ProductRepository;

import jakarta.persistence.EntityNotFoundException;

/**
 * Service layer that encapsulates business logic related to product management.
 * <p>
 * The {@code ProductService} handles CRUD operations, filtering, stock control,
 * and pagination of {@link Product} entities. It bridges the data layer and
 * the REST controllers.
 * </p>
 *
 * <h3>Main Features:</h3>
 * <ul>
 *   <li>Create, update, and delete products.</li>
 *   <li>Support for pagination and filtering by name, category, and availability.</li>
 *   <li>Automatic UUID generation for product identification.</li>
 *   <li>Stock management and category validation.</li>
 * </ul>
 */
@Service
public class ProductService {

    private final ProductRepository productRepository;

    /**
     * Constructor that injects the {@link ProductRepository}.
     *
     * @param productRepository repository for accessing product data
     */
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    /**
     * Retrieves all products with pagination support.
     *
     * @param pageable pagination configuration
     * @return a {@link Page} containing {@link Product} entities
     */
    public Page<Product> getAllPaginated(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    /**
     * Retrieves a product by its unique identifier.
     *
     * @param id the {@link UUID} of the product
     * @return an {@link Optional} containing the product if found
     */
    public Optional<Product> getById(UUID id) {
        return productRepository.findById(id);
    }

    /**
     * Creates a new product based on a {@link ProductRequestDTO}.
     *
     * @param dto data transfer object with product information
     * @return the saved {@link Product}
     */
    public Product create(ProductRequestDTO dto) {
        Product product = new Product();
        product.setId(UUID.randomUUID()); // Convertimos UUID a string
        product.setName(dto.getName());
        product.setCategory(dto.getCategory());
        product.setPrice(dto.getPrice()); 
        product.setStock(dto.getStock());
        product.setCreationDate(LocalDate.now());
        product.setUpdateDate(LocalDate.now());
        product.setExpirationDate(dto.getExpirationDate()); 

        return productRepository.save(product);
    }

    /**
     * Updates an existing product identified by its ID.
     *
     * @param id  the unique {@link UUID} of the product
     * @param dto the updated product information
     * @return the updated {@link Product}
     * @throws RuntimeException if the product is not found
     */
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

    /**
     * Saves a product to the database. Generates a UUID if not already set.
     *
     * @param product the product to persist
     * @return the persisted {@link Product}
     */
    public Product save(Product product) {
        if (product.getId() == null) {
            product.setId(UUID.randomUUID());
        }
        return productRepository.save(product);
    }

    /**
     * Deletes a product from the database by ID.
     *
     * @param id the UUID of the product to delete
     */
    public void delete(UUID id) {
        productRepository.deleteById(id);
    }

    /**
     * Marks a product as out of stock by setting its stock to zero.
     *
     * @param id the UUID of the product
     * @return the updated {@link Product}
     * @throws EntityNotFoundException if no product exists with the given ID
     */
    public Product markOutOfStock(UUID id) {
        return productRepository.findById(id)
                .map(p -> {
                    p.setStock(0);
                    return productRepository.save(p);
                })
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id " + id));
    }

    /**
     * Updates the stock level for a given product.
     *
     * @param id    the UUID of the product
     * @param stock the new stock value
     * @return the updated {@link Product}
     * @throws EntityNotFoundException if the product does not exist
     */
    public Product updateStock(UUID id, int stock) {
        return productRepository.findById(id)
                .map(p -> {
                    p.setStock(stock);
                    return productRepository.save(p);
                })
                .orElseThrow(() -> new EntityNotFoundException("Product not found with id " + id));
    }

    /**
     * Retrieves products filtered by several parameters such as name, category,
     * and availability (in stock/out of stock).
     *
     * @param page         current page number
     * @param size         number of products per page
     * @param sortBy       field to sort by (e.g. name, price)
     * @param order        sorting direction ("asc" or "desc")
     * @param name         optional filter by product name
     * @param categories   optional filter by category name
     * @param availability optional filter ("all", "in", "out")
     * @return a paginated list of filtered {@link Product} objects
     */
    public Page<Product> getFilteredProducts(
        int page,
        int size,
        String sortBy,
        String order,
        String name,
        String categories,
        String availability
    ) {
        Sort.Direction direction = order.equalsIgnoreCase("desc")
            ? Sort.Direction.DESC
            : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));

        List<Product> allProducts = productRepository.findAll();

        List<Product> filtered = allProducts.stream()
            .filter(p -> name == null || name.isEmpty() ||
                    p.getName().toLowerCase().contains(name.toLowerCase()))
            .filter(p -> categories == null || categories.isEmpty() ||
                    categories.contains(p.getCategory()))
            .filter(p -> availability == null || availability.equals("all") ||
                    (availability.equals("in") && p.getStock() > 0) ||
                    (availability.equals("out") && p.getStock() == 0))
            .sorted((p1, p2) -> {
                int result;
                switch (sortBy) {
                    case "name" -> result = p1.getName().compareToIgnoreCase(p2.getName());
                    case "price" -> result = p1.getPrice().compareTo(p2.getPrice());
                    case "stock" -> result = Integer.compare(p1.getStock(), p2.getStock());
                    default -> result = 0;
                }
                return direction == Sort.Direction.ASC ? result : -result;
            })

            .toList();

        int start = (int) pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), filtered.size());
        List<Product> paged = filtered.subList(start, end);

        return new PageImpl<>(paged, pageable, filtered.size());
    }

    /**
     * Retrieves the distinct list of categories assigned to products.
     *
     * @return a list of category names as {@link String}
     */
    public List<String> getDistinctCategories() {
        return productRepository.findDistinctCategories();
    }


}
