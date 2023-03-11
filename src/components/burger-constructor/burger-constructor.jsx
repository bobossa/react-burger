import { useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DragIcon,
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import { IngredientType } from "../../utils/prop-types";
import Loading from "../loading/loading";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { ORDER_DATA } from "../../utils/constants";
import { IngredientsContext } from "../../services/actions/ingredients-context";
import { useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  setOrderDetailsModalOpen,
  setIngredientModalOpen,
} from "../../services/actions/modal";
import { ingredientsMove } from "../../services/actions/ingredients";

import { selectedIngredientDelete } from "../../services/actions/ingredients";
import { ingredientAdd } from "../../services/actions/ingredients";

import {
  getOrdeDetails,
  orderDetailsDelete,
} from "../../services/actions/order";
import SelectedIngredient from "../selected-ingredient/selected-igredient";

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const selectedIngredients = useSelector(
    (store) => store.ingredientReducer.selectedIngredients
  );
  const initialIngredients = useSelector(
    (store) => store.ingredientReducer.ingredients
  );

  const isOrderDetailsModalOpen = useSelector(
    (store) => store.modalReducer.isOrderDetailsModalOpen
  );
  const orderDetails = useSelector((store) => store.modalReducer.orderDetails);
  //const data = React.useContext(IngredientsContext);

  const { bun, ingredients, totalSum } = useMemo(() => {
    const bun = selectedIngredients.find((item) => item.type === "bun");
    const ingredients = selectedIngredients.filter(
      (item) => item.type !== "bun"
    );
    const totalBuns = bun && bun.price * 2;
    const totalIngredients = ingredients.reduce(
      (total, ingredient) => total + ingredient.price,
      0
    );
    const totalSum = selectedIngredients.reduce(
      (total, item) =>
        item.type === "bun" ? total + item.price * 2 : total + item.price,
      0
    );

    return {
      bun: bun,
      ingredients: ingredients,
      totalSum: totalSum,
    };
  }, [selectedIngredients]);

  const handleOrderButtonClick = () => {
    const dataIds = selectedIngredients.map((d) => d._id);

    dispatch(getOrdeDetails(dataIds));
    dispatch(setOrderDetailsModalOpen(true));
  };

  const [{ isHover }, dropIngredientsContainer] = useDrop({
    accept: "ingredient",
    drop(ingredient) {
      onDropHandler(ingredient);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });
  const onDropHandler = (droppableIngredient) => {
    const selectedIngredient = initialIngredients.find(
      (ingredient) => ingredient._id === droppableIngredient._id
    );

    const selectedBun = selectedIngredients.find(
      (ingredient) => ingredient.type === "bun"
    );
    const selectedBunIndex = selectedIngredients.indexOf(selectedBun);

    if (selectedIngredient.type === "bun" && selectedBun) {
      const newSelectedIngredients = selectedIngredients.slice();
      newSelectedIngredients.splice(selectedBunIndex, 1, selectedIngredient);
      dispatch(ingredientAdd([...newSelectedIngredients]));
    } else {
      dispatch(ingredientAdd([...selectedIngredients, selectedIngredient]));
    }
  };

  const moveIngredient = useCallback(
    (dragIndex, hoverIndex) => {
      const buns = selectedIngredients.filter(
        (ingredient) => ingredient.type === "bun"
      );
      const ingredients = selectedIngredients.filter(
        (ingredient) => ingredient.type !== "bun"
      );

      const newContentIngredients = ingredients;
      newContentIngredients.splice(
        hoverIndex,
        0,
        newContentIngredients.splice(dragIndex, 1)[0]
      );
      const movedInregientsWithBun = [...buns, ...newContentIngredients];

      dispatch(ingredientsMove([...movedInregientsWithBun]));
    },
    [selectedIngredients, dispatch]
  );

  const onModalClose = () => {
    isOrderDetailsModalOpen && dispatch(setOrderDetailsModalOpen(false));
    isOrderDetailsModalOpen && dispatch(orderDetailsDelete());
  };
  return (
    <>
      {isOrderDetailsModalOpen && (
        <Modal onClose={onModalClose}>
          {orderDetails ? <OrderDetails data={orderDetails} /> : <Loading />}
        </Modal>
      )}

      <div
        className={`${style.constructor_container} pt-25`}
        ref={dropIngredientsContainer}
      >
        <div className="pr-6">
          {bun ? (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          ) : (
            <p className="pt-10 pb-12 text text_type_main-medium">
              Выберите булку
            </p>
          )}
        </div>
        <ul className={`${style.list} pl-4 pr-4`}>
          {ingredients.map((ingredient, index) => (
            <SelectedIngredient
              key={index}
              index={index}
              ingredientId={ingredient._id}
              ingredient={ingredient}
              moveIngredientFunc={moveIngredient}
            />
          ))}
        </ul>
        <div className="pr-6">
          {bun && (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}
        </div>

        <div className={`${style.button_container} pt-6 pr-6`}>
          <div className="mr-10">
            <span className="text text_type_digits-medium mr-2">
              {totalSum}
            </span>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={handleOrderButtonClick}
            disabled={selectedIngredients.length === 0}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
    </>
  );
};

export default BurgerConstructor;
