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


@Document(collection = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Product {

    @Id
    private UUID id; // Cambiado de UUID a String

    private String name;
    private String category; // Ahora es string
    private BigDecimal price;
    private LocalDate expirationDate;

    private Integer stock;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate creationDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate updateDate;
}
