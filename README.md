# Breakable Toy I

This breakable toy I consists in an **inventory manager** project, developed to simulate real-world requirements. The goal is to explore and practice full-stack development using modern technologies.

## ⚙️ Tech Stack
- **Frontend**: React, TypeScript, Material UI, MUI X Data Grid, Base UI
- **Backend**: Spring Boot, Java, Maven
- **Tools**: Git



## 📚 Table of Contents
- [Prerequisite](#️-prerequisites)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Goals and Challenges](#-project-goals-and-challenges)
- [Key Features](#-key-features)
- [Project Structure](#️-project-structure)

<!-- - [Images] -->

## 🛠️ Prerequisites
Before you can use this project you need to install all the utilities 

For npm (Node Package Manager), you check if it's installed by running:
```bash 
npm -v
npm install
```

## 📦 Installation
1. Clone the repository:

```bash
git clone https://github.com/jessica-ortiz-c/inventoryManager.git

```

## 🚀 Usage
To run the project, use the following command to run the backend:
```bash
mvn spring-boot:run
```
> The backend is running in port 9090, if you would like to change it you can modify it at application.properties

In another terminal, navigate to the frontend folder: 

```bash
cd frontend
npm start
```

Now you can visit the app `http://localhost:3000`

## 🎯 Project Goals and Challenges

- Establish weekly goals and have good time management.  

- Adapting to new tools, learning to use them correctly.  

- Being able to develop the project using selected technologies effectively

- Design functional solutions  

-  Being creative and if possible, try to be the most efficient for maintainability and escalating. 

## 📌 Key Features

- **Search module**, where you can search any product filtering by name, category or availability

- **New product button**, allow you to add a new product

- **Product Table**, shows 10 products at a time from the inventory

- **Edit and Delete buttons**,  which allow you to edit or remove any product from the inventory

- **Pagination**, navigates through inventory table

- **Summary Section**, where you can see a summary of the products from this inventory. 


<!-- ## Visual representation with images -->

<!-- > Below are images showing the layout... -->

## 🗂️ Project structure

```text
inventoryManager/
├── src/
│   └── main/
│       └── java/com/jessicaortiz/inventorymanagement/
│           ├── controller/
│           │   └── ProductController.java
│           ├── model/
│           │   └── Product.java
│           ├── repository/
│           │   └── ProductRepository.java
│           ├── InventorymanagementApplication.java
│       └── resources/
│           └── application.properties
│   └── test/java/com/jessicaortiz/inventorymanagement/
│       └── InventorymanagementApplicationTests.java
├── frontend/
│   ├── src/
|   |   ├── components/
|   |   |   ├── __tests__/
|   |   ├── context/
|   |   |   └── CategoryContext.tsx
|   |   └── types/
|   |        └── Product.ts
|   └── App.tsx
├── .gitignore
├── mvnw
├── mvnw.cmd
├── pom.xml
└── README.md
```
[Back to top](#breakable-toy-i)
