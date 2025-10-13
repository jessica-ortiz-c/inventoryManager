import React, { createContext, useContext, useState, useEffect } from 'react';

interface CategoryContextType {
  categories: string[];
  addCategory: (cat: string) => void;
  refreshCategories: () => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  addCategory: () => {},
  refreshCategories: async () => {},
});

export const useCategoryContext = () => useContext(CategoryContext);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<string[]>([]);

  // 🔹 Obtener categorías desde el backend
  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:9090/categories/names'); // Endpoint correcto para nombres
      if (!res.ok) throw new Error('Error fetching categories');
      const data: string[] = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('❌ Error fetching categories:', err);
      // Opcional: mantener categorías por defecto si falla
      if (categories.length === 0) setCategories(['Food', 'Electronics', 'Clothing']);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // 🔹 Agregar categoría localmente
  const addCategory = (newCat: string) => {
    const trimmedCat = newCat.trim();
    if (trimmedCat && !categories.includes(trimmedCat)) {
      setCategories((prev) => [...prev, trimmedCat]);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        addCategory,
        refreshCategories: fetchCategories, // permite actualizar desde cualquier componente
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
