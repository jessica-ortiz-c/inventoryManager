import { Product } from "../types/Product";

export {}; // <- Esto hace que sea un módulo garantizado

const BASE_URL = "http://localhost:9090/products";

export const productService = {
  async getProducts(page = 0, size = 10, sortBy = "name", order = "asc") {
    const res = await fetch(`${BASE_URL}?page=${page}&size=${size}&sortBy=${sortBy}&order=${order}`);
    if (!res.ok) throw new Error("Error fetching products");
    const data = await res.json();
    return {
      products: data.content,
      totalPages: data.totalPages,
      totalElements: data.totalElements
    };
  },   

  async createProduct(product: Product) {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error("Error creating product");
    return res.json();
  },

  async updateProduct(id: string, product: Product) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error("Error updating product");
    return res.json();
  },

  async deleteProduct(id: string) {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error deleting product");
  },
};
