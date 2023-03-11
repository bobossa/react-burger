import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { IngredientType } from "../../utils/prop-types";
import style from "./burger-ingredient.module.css";
import { setIngredientModalOpen } from "../../services/actions/modal";
import { ingredientSelect } from "../../services/actions/ingredients";

const BurgerIngredient = ({ data }) => {
  const dispatch = useDispatch();
  const selectedIngredients = useSelector(
    (store) => store.ingredientReducer.selectedIngredients
  );
  const initialIngredients = useSelector(
    (store) => store.ingredientReducer.ingredients
  );

  const handleClick = () => {
    dispatch(ingredientSelect(data));
    dispatch(setIngredientModalOpen(true));
  };

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredient",
    item: data,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const { ingredientCount } = useMemo(() => {
    let ingredientCount = 0;
    selectedIngredients.forEach(
      (ingredient) =>
        ingredient.name === data.name &&
        (ingredient.type === "bun"
          ? (ingredientCount += 2)
          : (ingredientCount += 1))
    );

    return {
      ingredientCount: ingredientCount,
    };
  }, [selectedIngredients]);

  return (
    <li
      className={`${style.list_item} ${isDrag && style.dragging}`}
      onClick={handleClick}
      ref={dragRef}
    >
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
      {ingredientCount > 0 && (
        <Counter count={ingredientCount} size="default" />
      )}
    </li>
  );
};
BurgerIngredient.propTypes = {
  data: PropTypes.shape(IngredientType).isRequired,
};

export default BurgerIngredient;
