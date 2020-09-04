import React, { useContext, useState } from "react";
import { CategoryContext } from "../context/CategoryContext";
import { RecipesContext } from "../context/RecipeContext";

const Form = () => {
  const [search, saveSearch] = useState({
    name: "",
    category: "",
  });

  const { categories } = useContext(CategoryContext);
  const { searchRecipe, saveconsult } = useContext(RecipesContext);

  // Function to read the contents
  const getDataRecipe = (e) => {
    saveSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      className="col-12"
      onSubmit={(e) => {
        e.preventDefault();
        searchRecipe(search);
        saveconsult(true);
      }}
    >
      <fieldset className="text-center">
        <legend className="pt-3">Search drinks by category or ingredient</legend>
      </fieldset>

      <div className="row mt-4">
        <div className="col-md-4 mb-3">
          <input
            name="name"
            className="form-control"
            type="text"
            placeholder="Search by ingredient"
            onChange={getDataRecipe}
          />
        </div>
        <div className="col-md-4 mb-3">
          <select
            className="form-control"
            name="category"
            onChange={getDataRecipe}
          >
            <option value="">-- Select Category --</option>
            {categories.map((category) => (
              <option key={category.strCategory} value={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4 mb-3">
          <input
            type="submit"
            className="btn btn-block btn-primary"
            value="Find drinks"
          />
        </div>
      </div>
    </form>
  );
};

export default Form;
