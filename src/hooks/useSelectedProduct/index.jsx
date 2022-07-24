import { useState, useMemo, createContext, useContext } from "react";

export const ProductContext = createContext({
  product: {},
  setProduct: () => {},
});

export default function ProductProviderContext({ children }) {
  const [product, setProduct] = useState();

  const value = useMemo(() => ({ product, setProduct }), [product]);

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export const useProductContext = () => {
  const { product, setProduct } = useContext(ProductContext);
  return { product, setProduct };
};
