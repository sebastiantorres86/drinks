import React, { useContext, useState } from "react";
import { ModalContext } from "../context/ModalContext";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 1),
  },
}));

const Recipe = ({ recipe }) => {
  // Material-ui modal configuration
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // Extract the context values
  const { infoRecipe, setidRecipe, setRecipe } = useContext(ModalContext);

  // Show and format ingredients
  const showIngredients = (infoRecipe) => {
    let ingredients = [];
    for (let index = 1; index < 16; index++) {
      if (infoRecipe[`strIngredient${index}`]) {
        ingredients.push(
          <li>
            {infoRecipe[`strIngredient${index}`]}{" "}
            {infoRecipe[`strMeasure${index}`]}
          </li>
        );
      }
    }

    return ingredients;
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{recipe.strDrink}</h2>

        <img
          className="card-img-top"
          src={recipe.strDrinkThumb}
          alt={`${recipe.strDrink}`}
        />

        <div className="card-body">
          <button
            type="button"
            className="btn btn-block btn-primary"
            onClick={() => {
              setidRecipe(recipe.idDrink);
              handleOpen();
            }}
          >
            See recipe
          </button>
          <Modal
            open={open}
            onClose={() => {
              setidRecipe(null);
              setRecipe({});
              handleClose();
            }}
          >
            <div style={modalStyle} className={classes.paper}>
              <h2>{infoRecipe.strDrink}</h2>
              <h3 className="mt-4">Instructions</h3>
              <p>{infoRecipe.strInstructions}</p>

              <img className="img-fluid my-4" src={infoRecipe.strDrinkThumb} />

              <h3>Ingredients and amounts</h3>
              <ul>{showIngredients(infoRecipe)}</ul>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
