import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";

export const RecipesContext = createContext();

const RecipesProvider = (props) => {
  const [recipes, saveRecipes] = useState([]);
  const [search, searchRecipe] = useState({
    name: "",
    category: "",
  });
  const [consult, saveconsult] = useState(false);

  const { name, category } = search;

  useEffect(() => {
    if (consult) {
      const getRecipes = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}&c=${category}`;

        const result = await Axios.get(url)

        // console.log(result.data.drinks)
        saveRecipes(result.data.drinks)

      };

      getRecipes();
    }
  }, [search]);

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        searchRecipe,
        saveconsult,
      }}
    >
      {props.children}
    </RecipesContext.Provider>
  );
};

export default RecipesProvider;
