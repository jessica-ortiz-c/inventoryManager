package com.jessicaortiz.inventorymanagement.dto;

import jakarta.validation.constraints.DecimalMin;
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
    private Double price;

    @NotNull(message = "Stock is required")
    //@Positive(message = "Stock must be greater than zero")
    @Min(value = 0, message = "Stock cannot be negative")
    private Integer stock;
}
