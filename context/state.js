import { createContext, useContext } from "react";
import categories from "../.json/categories.json";

const HeaderContext = createContext();

export const TaxonomySlugProvider = ({ children }) => {
  return (
    <HeaderContext.Provider value={{ categories }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => {
  return useContext(HeaderContext);
};