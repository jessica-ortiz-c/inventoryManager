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

@Data
public class ProductRequestDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "1.00", message = "Price must be greater than 0")
    private BigDecimal price;

    @NotBlank(message = "Category is required")
    private String category;

    @NotNull(message = "Stock is required")
    @Min(value = 0, message = "Stock cannot be negative")
    private Integer stock;


    @FutureOrPresent(message = "Expiration date must be today or in the future")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate expirationDate;
}
