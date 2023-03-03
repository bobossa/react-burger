import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import PropTypes from "prop-types";
import { IngredientType } from "../../utils/prop-types";

const BurgerIngredientGroup = ({
  group,
  data,
  setTargetIndegrient,
  setIngredientModalOpen,
}) => {
  const burgerIngredientDict = {
    Булки: "bun",
    Соусы: "sauce",
    Начинки: "main",
  };

  return data.map(
    (item) =>
      item.type === burgerIngredientDict[group] && (
        <BurgerIngredient
          key={item._id}
          data={item}
          setTargetIndegrient={setTargetIndegrient}
          setIngredientModalOpen={setIngredientModalOpen}
        />
      )
  );
};

BurgerIngredientGroup.propTypes = {
  group: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape(IngredientType).isRequired)
    .isRequired,
  setTargetIndegrient: PropTypes.func.isRequired,
  setIngredientModalOpen: PropTypes.func.isRequired,
};

export default BurgerIngredientGroup;
