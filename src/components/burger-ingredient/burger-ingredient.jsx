import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import PropTypes from "prop-types";
import { IngredientType } from "../../utils/prop-types";
import style from "./burger-ingredient.module.css";

const BurgerIngredient = ({
  data,
  setTargetIndegrient,
  setIngredientModalOpen,
}) => {
  const handleClick = () => {
    setTargetIndegrient(data);
    setIngredientModalOpen(true);
  };

  return (
    <li onClick={handleClick} className={style.list_item}>
      <img
        alt={data.name}
        src={data.image}
        className={`${style.image} ml-5 mr-5`}
      />
      <div className={`${style.price} mt-5 mb-5`}>
        <span className="text text_type_digits-default mr-2">{data.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={`${style.text} text text_type_main-default`}>
        {data.name}
      </h3>
      <Counter count={1} size="default" />
    </li>
  );
};
BurgerIngredient.propTypes = {
  data: PropTypes.shape(IngredientType).isRequired,
};

export default BurgerIngredient;
