import React, { createContext, useContext, useState, useEffect } from 'react';

/* const getInitialCategories = () => {
  const stored = localStorage.getItem('categories');
  return stored ? JSON.parse(stored) : ['Food', 'Electronics', 'Clothing'];
}; */

//Create the context
const CategoryContext = createContext<{
  categories: string[];
  addCategory: (cat: string) => void;
}>({
  categories: [],
  addCategory: () => {},
});

// Hook for use the context
export const useCategoryContext = () => useContext(CategoryContext);

// Provider of context
export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<string[]>([
    'Food', 'Electronics', 'Clothing',
  ]);

  const addCategory = (newCat: string) => {
    if (!categories.includes(newCat)) {
      setCategories((prev) => [...prev, newCat]);
    }
  };

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);
  
  return (
    <CategoryContext.Provider value={{ categories, addCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
