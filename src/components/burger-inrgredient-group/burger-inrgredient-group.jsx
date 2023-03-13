import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import PropTypes from "prop-types";
import { IngredientType } from "../../utils/prop-types";

const BurgerIngredientGroup = ({ group, data }) => {
  const burgerIngredientDict = {
    Булки: "bun",
    Соусы: "sauce",
    Начинки: "main",
  };

  return data.map(
    (item) =>
      item.type === burgerIngredientDict[group] && (
        <BurgerIngredient key={item._id} data={item} />
      )
  );
};

BurgerIngredientGroup.propTypes = {
  group: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape(IngredientType).isRequired)
    .isRequired,
};

export default BurgerIngredientGroup;
