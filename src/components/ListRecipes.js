import React, { useContext } from "react";
import Recipe from "./Recipe";
import { RecipesContext } from "../context/RecipeContext";

const ListRecipes = () => {
  // Extract the recipes
  const { recipes } = useContext(RecipesContext);

  console.log(recipes);

  return (
    <div className="row mt-5">
      {recipes.map((recipe) => (
        <Recipe key={recipe.idDrink} recipe={recipe} />
      ))}
    </div>
  );
};

export default ListRecipes;
