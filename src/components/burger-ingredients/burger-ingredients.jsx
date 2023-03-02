import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredients-details/ingredient-details";

import style from "./burger-ingredients.module.css";
import PropTypes from "prop-types";
import { IngredientType } from "../../utils/prop-types";
import BurgerIngredientGroup from "../burger-inrgredient-group/burger-inrgredient-group";

const BurgerIngredients = ({ data }) => {
  const [isIngredientsModalOpen, setIngredientModalOpen] =
    React.useState(false);
  const [targetIndegrient, setTargetIndegrient] = React.useState({});
  const [current, setCurrent] = React.useState("bun");

  const onTabClick = (title) => setCurrent(title);

  const burgerIngredientArr = ["Булки", "Соусы", "Начинки"];

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
        <div className={style.main_container}>
          <h1 className="mt-10 mb-5 text text_type_main-large">
            Соберите бургер
          </h1>
          <div className={style.tab_container}>
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
            className={`${style.ingredients_container} mt-10 ingredients-container`}
          >
            {burgerIngredientArr.map((group, index) => (
              <section key={index + 1}>
                <h2 className="mb-6 text text_type_main-medium">{group}</h2>
                <ul className={`${style.list} pt-6 pb-10 pr-4 pl-4`}>
                  <BurgerIngredientGroup
                    group={group}
                    data={data}
                    setTargetIndegrient={setTargetIndegrient}
                    setIngredientModalOpen={setIngredientModalOpen}
                  />
                </ul>
              </section>
            ))}
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
