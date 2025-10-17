package com.jessicaortiz.inventorymanagement.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a product stored in the MongoDB collection "products".
 *
 * <p>Each product includes information about pricing, category, stock, and relevant dates.</p>
 */
@Document(collection = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Product {

    /** Unique identifier for the product (UUID). */
    @Id
    private UUID id; 

     /** Product name. */
    private String name;

    /** Category name as a simple string reference. */
    private String category;

    /** Product price. */
    private BigDecimal price;

    /** Optional expiration date of the product. */
    private LocalDate expirationDate;

    /** Quantity in stock. */
    private Integer stock;

    /** Product creation date. */
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate creationDate;

    /** Last update date. */
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate updateDate;
}
