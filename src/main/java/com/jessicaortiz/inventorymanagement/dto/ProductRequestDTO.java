package com.jessicaortiz.inventorymanagement.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * Data Transfer Object (DTO) for product creation and update requests.
 *
 * <p>Includes validation annotations to ensure data integrity before persistence.</p>
 */
@Data
public class ProductRequestDTO {

     /** The product name (required). */
    @NotBlank(message = "Name is required")
    private String name;

    /** The product price, must be ≥ 1.00. */
    @NotNull(message = "Price is required")
    @DecimalMin(value = "1.00", message = "Price must be greater than 0")
    private BigDecimal price;

    /** The category name associated with the product (required). */
    @NotBlank(message = "Category is required")
    private String category;

    /** Product stock level, cannot be negative. */
    @NotNull(message = "Stock is required")
    @Min(value = 0, message = "Stock cannot be negative")
    private Integer stock;

    /** 
     * Optional product expiration date, must be today or a future date.
     */
    @FutureOrPresent(message = "Expiration date must be today or in the future")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate expirationDate;
}
