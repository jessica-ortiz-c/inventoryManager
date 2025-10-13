import { Product } from "../types/Product";

export {}; 

const BASE_URL = "http://localhost:9090/products";

export const productService = {
//   async getProducts(page = 0, size = 10, sortBy = "name", order = "asc") {
//     const res = await fetch(`${BASE_URL}?page=${page}&size=${size}&sortBy=${sortBy}&order=${order}`);
//     if (!res.ok) throw new Error("Error fetching products");
//     const data = await res.json();
//     return {
//       products: data.content,
//       totalPages: data.totalPages,
//       totalElements: data.totalElements
//     };
//   },   

async getProducts({
    page = 0,
    size = 10,
    sortBy = "name",
    order = "asc",
    name = "",
    category = "",
    availability = "all",
  }: {
    page?: number;
    size?: number;
    sortBy?: string;
    order?: "asc" | "desc";
    name?: string;
    category?: string;
    availability?: string;
  }) {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sortBy,
      order,
    });

    if (name) params.append("name", name);
    if (category) params.append("category", category);
    if (availability && availability !== "all") params.append("availability", availability);

    const res = await fetch(`${BASE_URL}/paginated?${params.toString()}`);
    if (!res.ok) throw new Error("Error fetching products");

    return res.json();
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
