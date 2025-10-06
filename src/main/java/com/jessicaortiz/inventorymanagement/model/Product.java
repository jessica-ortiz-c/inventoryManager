package com.jessicaortiz.inventorymanagement.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.List;
import lombok.*;

import jakarta.validation.constraints.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    private UUID id; 
    private String name;

    @NotEmpty(message = "Category must have at least one element")
    private List<@NotBlank String> category; //For a list of categories

    private BigDecimal price;

    @FutureOrPresent(message = "Expiration date must be today or in the future")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate expirationDate; // opcional pero debe ser > hoy si se proporciona

    private Integer stock;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate creationDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate updateDate;

}
