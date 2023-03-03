import React from "react";
import {
  DragIcon,
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import { IngredientType } from "../../utils/prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { ORDER_DATA } from "../../utils/constants";

const BurgerConstructor = ({ data }) => {
  const [isOrderDetailsModalOpen, setOrderDetailsModalOpen] =
    React.useState(false);
  const { bun, ingredients, totalBuns, totalIngredients } =
    React.useMemo(() => {
      const bun = data.find((item) => item.type === "bun");
      const ingredients = data.filter((item) => item.type !== "bun");
      return {
        bun: bun,
        ingredients: ingredients,
        totalBuns: bun.price * 2,
        totalIngredients: ingredients.reduce(
          (total, ingredient) => total + ingredient.price,
          0
        ),
      };
    }, [data]);

  const handleOrderButtonClick = () => {
    setOrderDetailsModalOpen(true);
  };

  return (
    <>
      {isOrderDetailsModalOpen && (
        <Modal onClose={setOrderDetailsModalOpen}>
          <OrderDetails data={ORDER_DATA} />
        </Modal>
      )}
      <div className={`${style.constructor_container} pt-25`}>
        <div className="pr-6">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        <ul className={`${style.list} pl-4 pr-4`}>
          {ingredients.map((ingredient, index) => (
            <li key={index} className={style.list_item}>
              <DragIcon />
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </li>
          ))}
        </ul>
        <div className="pr-6">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>

        <div className={`${style.button_container} pt-6 pr-6`}>
          <div className="mr-10">
            <span className="text text_type_digits-medium mr-2">
              {totalBuns + totalIngredients}
            </span>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={handleOrderButtonClick}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
    </>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(IngredientType)).isRequired,
};
export default BurgerConstructor;
