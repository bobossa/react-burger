import ingredientDetailsStyles from "./ingredients-details.module.css";

import PropTypes from "prop-types";
import { IngredientType } from "../../utils/prop-types";

const IngredientDetails = ({ data }) => {
  return (
    <div className={`${ingredientDetailsStyles.container}`}>
      <img width="480" height="240" alt={data.name} src={data && data.image} />

      <p className="text text_type_main-medium pt-4 pb-8">
        {data && data.name}
      </p>

      <ul className={`${ingredientDetailsStyles.list} pt-8`}>
        <li
          className={`${ingredientDetailsStyles.listItem} text text_type_main-default text_color_inactive`}
        >
          <span>Калории,ккал</span>
          {data.calories}
        </li>

        <li
          className={`${ingredientDetailsStyles.listItem} text text_type_main-default text_color_inactive`}
        >
          <span>Белки, г</span>
          {data.proteins}
        </li>

        <li
          className={`${ingredientDetailsStyles.listItem} text text_type_main-default text_color_inactive`}
        >
          <span>Жиры, г</span>
          {data.fat}
        </li>

        <li
          className={`${ingredientDetailsStyles.listItem} text text_type_main-default text_color_inactive`}
        >
          <span>Углеводы, г</span>
          {data.carbohydrates}
        </li>
      </ul>
    </div>
  );
};

IngredientDetails.propTypes = {
  data: PropTypes.shape(IngredientType).isRequired,
};

export default IngredientDetails;
