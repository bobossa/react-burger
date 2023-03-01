import React from "react";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

import burgerIngredientsStyle from "./burger-ingredients.module.css";
import PropTypes from "prop-types";

const BurgerIngredients = ({
  data,
  setIngredientModalOpen,
  setTargetIndegrient,
}) => {
  const [current, setCurrent] = React.useState("bun");

  const onTabClick = (title) => setCurrent(title);
  const handleIngredientClick = (evt) => {
    const id = evt.currentTarget.dataset.id;
    const targetIngredient = data.find((ingredient) => ingredient._id === id);
    setTargetIndegrient(targetIngredient);
    setIngredientModalOpen(true);
  };

  const itemTemplate = ({ image, price, name, _id }) => {
    return (
      <li
        data-id={_id}
        key={_id}
        className={burgerIngredientsStyle.list_item}
        onClick={handleIngredientClick}
      >
        <img
          alt={name}
          src={image}
          className={`${burgerIngredientsStyle.image} ml-4 mr-4`}
        />
        <div className={`${burgerIngredientsStyle.price_info} mt-4 mb-4`}>
          <span className="text text_type_digits-default mr-2">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <h3
          className={`${burgerIngredientsStyle.text} text text_type_main-default`}
        >
          {name}
        </h3>
        <Counter count={1} size="default" />
      </li>
    );
  };

  return (
    <div className={burgerIngredientsStyle.main_container}>
      <h1 className="mt-10 mb-5 text text_type_main-large">Соберите бургер</h1>
      <div className="" style={{ display: "flex" }}>
        <Tab value="bun" active={current === "bun"} onClick={onTabClick}>
          Булки
        </Tab>
        <Tab value="sause" active={current === "sause"} onClick={onTabClick}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={onTabClick}>
          Начинки
        </Tab>
      </div>

      <div
        className={`${burgerIngredientsStyle.ingredients_container} mt-10 ingredients-container`}
      >
        <h2 className="mb-6 text text_type_main-medium">Булки</h2>
        <ul className={`${burgerIngredientsStyle.list} pt-6 pb-10 pr-4 pl-4`}>
          {data.map((item) => item.type === "bun" && itemTemplate(item))}
        </ul>
        <h2 className="mb-6 text text_type_main-medium">Соусы</h2>
        <div className={`${burgerIngredientsStyle.list} pt-6 pb-10 pr-4 pl-4`}>
          {data.map((item) => item.type === "sauce" && itemTemplate(item))}
        </div>
        <h2 className="mb-6 text text_type_main-medium">Начинки</h2>
        <div className={`${burgerIngredientsStyle.list} pt-6 pb-10 pr-4 pl-4`}>
          {data.map((item) => item.type === "main" && itemTemplate(item))}
        </div>
      </div>
    </div>
  );
};
BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      proteins: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      __v: PropTypes.number,
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
  setIngredientModalOpen: PropTypes.func.isRequired,
  setTargetIndegrient: PropTypes.func.isRequired,
};
export default BurgerIngredients;
