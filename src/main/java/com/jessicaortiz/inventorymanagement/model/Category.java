package com.jessicaortiz.inventorymanagement.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Represents a product category entity stored in MongoDB.
 * 
 * <p>Each category is uniquely identified by an {@link #id} and a lowercase {@link #name}
 * to avoid logical duplicates.</p>
 */
@Document(collection = "categories")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category {

     /** Unique MongoDB identifier for the category. */
    @Id
    private String id;

    /** Category name stored in lowercase. */
    private String name;
}
