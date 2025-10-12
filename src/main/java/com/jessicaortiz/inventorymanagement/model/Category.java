package com.jessicaortiz.inventorymanagement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;

@Document(collection = "categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category {
    @Id
    private String id;

    // Guardamos el nombre en minúsculas/trim para evitar duplicados lógicos
    private String name;
}
