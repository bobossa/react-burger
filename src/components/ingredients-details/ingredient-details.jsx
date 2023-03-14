import { useSelector } from "react-redux";
import style from "./ingredients-details.module.css";
import { useParams, useLocation } from "react-router-dom";

const IngredientDetails = () => {
  const ingredients = useSelector(
    (store) => store.ingredientReducer.ingredients
  );
  const { ingredientId } = useParams();
  console.log(ingredientId);

  const selectedIngredient = ingredients.find(
    (ingredient) => ingredient._id === ingredientId
  );
  const location = useLocation();
  console.log(location);
  const center = !location.state?.background ? style.center : "";
  const box = !location.state?.background ? style.box : "";
  console.log(box);
  return (
    <>
      {selectedIngredient && (
        <>
          <div className={`${style.titleContainer} ${box}`}>
            <h3
              className={`${style.title} ${center} text text_type_main-large pr-15`}
            >
              Детали ингредиента
            </h3>
          </div>
          <div className={`${style.container}`}>
            <img
              className={`${style.img}`}
              alt={selectedIngredient.name}
              src={selectedIngredient && selectedIngredient.image}
            />

            <p className="text text_type_main-medium pt-4 pb-8">
              {selectedIngredient && selectedIngredient.name}
            </p>

            <ul className={`${style.list} pt-8`}>
              <li
                className={`${style.listItem} text text_type_main-default text_color_inactive`}
              >
                <span>Калории,ккал</span>
                {selectedIngredient.calories}
              </li>

              <li
                className={`${style.listItem} text text_type_main-default text_color_inactive`}
              >
                <span>Белки, г</span>
                {selectedIngredient.proteins}
              </li>

              <li
                className={`${style.listItem} text text_type_main-default text_color_inactive`}
              >
                <span>Жиры, г</span>
                {selectedIngredient.fat}
              </li>

              <li
                className={`${style.listItem} text text_type_main-default text_color_inactive`}
              >
                <span>Углеводы, г</span>
                {selectedIngredient.carbohydrates}
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default IngredientDetails;
