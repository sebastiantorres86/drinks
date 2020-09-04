import React, { createContext, useEffect, useState } from "react";
import Axios from "axios";

// Create the context
export const ModalContext = createContext();

const ModalProvider = (props) => {
  // Provider's State
  const [idRecipe, setidRecipe] = useState(null);
  const [infoRecipe, setRecipe] = useState({});

  // Once we have a recipe, call the API
  useEffect(() => {
    const getRecipe = async () => {
      if (!idRecipe) return;

      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`;

      const result = await Axios.get(url);

      setRecipe(result.data.drinks[0]);
    };
    getRecipe();
  }, [idRecipe]);

  return (
    <ModalContext.Provider
      value={{
        infoRecipe,
        setidRecipe,
        setRecipe,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
