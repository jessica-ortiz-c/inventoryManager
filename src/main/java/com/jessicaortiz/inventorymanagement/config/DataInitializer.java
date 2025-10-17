package com.jessicaortiz.inventorymanagement.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.jessicaortiz.inventorymanagement.service.CategoryService;


/**
 * Configuration class responsible for initializing default application data.
 * 
 * <p>This class defines a {@link CommandLineRunner} bean that runs automatically
 * when the application starts. It ensures that a set of default categories exist
 * in the database by invoking the {@link CategoryService#createIfNotExists(String)} method.</p>
 * 
 * <p>Default categories created: <b>Food</b>, <b>Electronics</b>, and <b>Clothing</b>.</p>
 */
@Configuration
public class DataInitializer {

    /**
     * Initializes default categories if they do not exist in the database.
     *
     * @param categoryService the service used to manage category persistence
     * @return a {@link CommandLineRunner} that inserts the default categories at startup
     */
    @Bean
    CommandLineRunner initCategories(CategoryService categoryService) {
        return args -> {
            String[] defaults = new String[] { "Food", "Electronics", "Clothing" };
            for (String name : defaults) {
                categoryService.createIfNotExists(name);
            }
        };
    }
}
