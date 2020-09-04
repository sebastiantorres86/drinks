import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";

// Create the context
export const CategoryContext = createContext();

// Provider is where the functions and state are located
const CategoryProvider = (props) => {
  // Create the context state
  const [categories, saveCategories] = useState([]);

  // Execute the API call
  useEffect(() => {
    const getCategories = async () => {
      const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";

      const categories = await Axios.get(url);

      saveCategories(categories.data.drinks);
    };
    getCategories();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
