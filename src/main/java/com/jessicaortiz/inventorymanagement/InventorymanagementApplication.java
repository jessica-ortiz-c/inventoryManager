package com.jessicaortiz.inventorymanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main entry point for the Inventory Management application.
 * 
 * <p>This class bootstraps the Spring Boot context and starts the embedded server.</p>
 */
@SpringBootApplication
public class InventorymanagementApplication {

	/**
     * Launches the Spring Boot application.
     *
     * @param args runtime arguments
     */
	public static void main(String[] args) {
		SpringApplication.run(InventorymanagementApplication.class, args);
	}

}
