package com.jessicaortiz.inventorymanagement.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.jessicaortiz.inventorymanagement.service.CategoryService;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initCategories(CategoryService categoryService) {
        return args -> {
            // Categorías por defecto
            String[] defaults = new String[] { "Food", "Electronics", "Clothing" };
            for (String name : defaults) {
                categoryService.createIfNotExists(name);
            }
        };
    }
}
