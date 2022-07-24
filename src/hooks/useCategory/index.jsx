import { useState, useMemo, createContext, useContext } from "react";

export const CategoryContext = createContext({
  category: {},
  setCategory: () => {},
});

export default function CategoryProviderContext({ children }) {
  const [category, setCategory] = useState();

  const value = useMemo(() => ({ category, setCategory }), [category]);

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}

export const useCategoryContext = () => {
  const { category, setCategory } = useContext(CategoryContext);
  return { category, setCategory };
};
