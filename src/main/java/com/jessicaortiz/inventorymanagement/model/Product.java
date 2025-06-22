package com.jessicaortiz.inventorymanagement.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.util.List;

public class Product {

    private UUID id; 
    private String name;
    private List<String> category; //For a list of categories
    private BigDecimal price;
    private LocalDate expirationDate;
    private Integer stock;


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate creationDate;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate updateDate;

    public Product() {
        this.creationDate = LocalDate.now();
        this.updateDate = LocalDate.now();
    }
  
    // Getters
    public UUID getId() { return id; }
    public String getName() { return name; }
    public List<String> getCategory() {return category;}
    public BigDecimal getPrice() { return price; }
    public LocalDate getExpirationDate() { return expirationDate; }
    public Integer getStock() { return stock; }
    public LocalDate getCreationDate() { return creationDate; }
    public LocalDate getUpdateDate() { return updateDate; }
  
    // Setters
    public void setId(UUID id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setCategory(List<String> category) {this.category = category;}
    public void setPrice(BigDecimal price) { this.price = price; }
    public void setExpirationDate(LocalDate expirationDate) { this.expirationDate = expirationDate; }
    public void setStock(Integer stock) { this.stock = stock; }
    public void setCreationDate(LocalDate creationDate) { this.creationDate = creationDate; }
    public void setUpdateDate(LocalDate updateDate) { this.updateDate = updateDate; }
}
