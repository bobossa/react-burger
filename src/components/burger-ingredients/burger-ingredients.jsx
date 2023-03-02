import React from "react";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredients-details/ingredient-details";

import burgerIngredientsStyle from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import { IngredientType } from "../../utils/prop-types";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";

const BurgerIngredients = ({ data }) => {
  const [isIngredientsModalOpen, setIngredientModalOpen] =
    React.useState(false);
  const [targetIndegrient, setTargetIndegrient] = React.useState({});
  const [current, setCurrent] = React.useState("bun");

  const onTabClick = (title) => setCurrent(title);

  return (
    <>
      {isIngredientsModalOpen ? (
        <Modal title="Детали ингредиентов" onClose={setIngredientModalOpen}>
          <IngredientDetails
            onClose={setIngredientModalOpen}
            data={targetIndegrient}
          />
        </Modal>
      ) : (
        <div className={burgerIngredientsStyle.main_container}>
          <h1 className="mt-10 mb-5 text text_type_main-large">
            Соберите бургер
          </h1>
          <div className="" style={{ display: "flex" }}>
            <Tab value="bun" active={current === "bun"} onClick={onTabClick}>
              Булки
            </Tab>
            <Tab
              value="sause"
              active={current === "sause"}
              onClick={onTabClick}
            >
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
            <ul
              className={`${burgerIngredientsStyle.list} pt-6 pb-10 pr-4 pl-4`}
            >
              {data.map(
                (item) =>
                  item.type === "bun" && (
                    <BurgerIngredient
                      data={item}
                      setTargetIndegrient={setTargetIndegrient}
                      setIngredientModalOpen={setIngredientModalOpen}
                    />
                  )
              )}
            </ul>
            <h2 className="mb-6 text text_type_main-medium">Соусы</h2>
            <div
              className={`${burgerIngredientsStyle.list} pt-6 pb-10 pr-4 pl-4`}
            >
              {data.map(
                (item) =>
                  item.type === "sauce" && (
                    <BurgerIngredient
                      data={item}
                      setTargetIndegrient={setTargetIndegrient}
                      setIngredientModalOpen={setIngredientModalOpen}
                    />
                  )
              )}
            </div>
            <h2 className="mb-6 text text_type_main-medium">Начинки</h2>
            <div
              className={`${burgerIngredientsStyle.list} pt-6 pb-10 pr-4 pl-4`}
            >
              {data.map(
                (item) =>
                  item.type === "main" && (
                    <BurgerIngredient
                      data={item}
                      setTargetIndegrient={setTargetIndegrient}
                      setIngredientModalOpen={setIngredientModalOpen}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(IngredientType)).isRequired,
};
export default BurgerIngredients;
