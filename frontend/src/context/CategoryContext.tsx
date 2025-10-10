import React, { createContext, useContext, useState, useEffect } from 'react';

// Función para obtener categorías iniciales desde localStorage o valores por defecto
const getInitialCategories = (): string[] => {
  const stored = localStorage.getItem('categories');
  return stored ? JSON.parse(stored) : ['Food', 'Electronics', 'Clothing'];
};

// Tipado del contexto
interface CategoryContextType {
  categories: string[];
  addCategory: (cat: string) => void;
}

// Crear el contexto con valores por defecto
const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  addCategory: () => {},
});

// Hook para usar el contexto
export const useCategoryContext = () => useContext(CategoryContext);

// Proveedor del contexto
export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<string[]>(getInitialCategories);

  const addCategory = (newCat: string) => {
    const trimmedCat = newCat.trim();
    if (trimmedCat && !categories.includes(trimmedCat)) {
      setCategories((prev) => [...prev, trimmedCat]);
    }
  };

  // Sincronizar con localStorage
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  return (
    <CategoryContext.Provider value={{ categories, addCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
