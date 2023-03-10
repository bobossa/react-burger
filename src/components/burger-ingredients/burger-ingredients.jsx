import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredients-details/ingredient-details";

import style from "./burger-ingredients.module.css";
import BurgerIngredientGroup from "../burger-inrgredient-group/burger-inrgredient-group";
import { setIngredientModalOpen } from "../../services/actions/modal";

import { selectedIngredientDelete } from "../../services/actions/ingredients";

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const contentRef = useRef(null);
  const bunContentRef = useRef(null);
  const sauceContentRef = useRef(null);
  const mainContentRef = useRef(null);
  const isIngredientsModalOpen = useSelector(
    (store) => store.modalReducer.isIngredientsModalOpen
  );

  const [targetIndegrient, setTargetIndegrient] = React.useState(null);
  const [current, setCurrent] = React.useState("bun");
  const initialIngredients = useSelector(
    (store) => store.ingredientReducer.ingredients
  );

  const onTabClick = (tab) => {
    setCurrent(tab);
    document
      .querySelector(`#${tab}`)
      .scrollIntoView({ block: "start", behavior: "smooth" });
  };

  const onScroll = () => {
    const mainInterval = Math.abs(
      contentRef.current.getBoundingClientRect().top -
        mainContentRef.current.getBoundingClientRect().top
    );
    const bunInterval = Math.abs(
      contentRef.current.getBoundingClientRect().top -
        bunContentRef.current.getBoundingClientRect().top
    );

    const sauceInterval = Math.abs(
      contentRef.current.getBoundingClientRect().top -
        sauceContentRef.current.getBoundingClientRect().top
    );

    const minimalInterval = Math.min(bunInterval, sauceInterval, mainInterval);

    let currentTabName = "";
    if (minimalInterval >= bunInterval) {
      currentTabName = "bun";
    }
    if (minimalInterval >= sauceInterval) {
      currentTabName = "sause";
    }
    if (minimalInterval >= mainInterval) {
      currentTabName = "main";
    }
    setCurrent(currentTabName);
  };

  useEffect(() => {
    document.querySelector(`#${current}`).scrollIntoView();

    document
      .querySelector(`#${current}`)
      .closest("div")
      .addEventListener("scroll", onScroll);
  }, [current]);

  const burgerIngredientArr = ["??????????", "??????????", "??????????????"];
  const burgerIngredientDict = {
    ??????????: "bun",
    ??????????: "sause",
    ??????????????: "main",
  };
  const tabRefDict = {
    ??????????: bunContentRef,
    ??????????: sauceContentRef,
    ??????????????: mainContentRef,
  };

  const onModalClose = () => {
    isIngredientsModalOpen && dispatch(setIngredientModalOpen(false));
    isIngredientsModalOpen && dispatch(selectedIngredientDelete());
  };

  return (
    <>
      {isIngredientsModalOpen && (
        <Modal title="???????????? ????????????????????????" onClose={onModalClose}>
          <IngredientDetails data={targetIndegrient} />
        </Modal>
      )}

      <div className={style.main_container}>
        <h1 className="mt-10 mb-5 text text_type_main-large">
          ???????????????? ????????????
        </h1>
        <div className={style.tab_container}>
          <Tab value="bun" active={current === "bun"} onClick={onTabClick}>
            ??????????
          </Tab>
          <Tab value="sause" active={current === "sause"} onClick={onTabClick}>
            ??????????
          </Tab>
          <Tab value="main" active={current === "main"} onClick={onTabClick}>
            ??????????????
          </Tab>
        </div>

        <div
          className={`${style.ingredients_container} mt-10 ingredients-container`}
          onScroll={onScroll}
          ref={contentRef}
        >
          {burgerIngredientArr.map((group, index) => (
            <section key={index + 1} id={burgerIngredientDict[group]}>
              <h2 className="mb-6 text text_type_main-medium">{group}</h2>
              <ul
                className={`${style.list} pt-6 pb-10 pr-4 pl-4`}
                ref={tabRefDict[group]}
              >
                <BurgerIngredientGroup
                  group={group}
                  data={initialIngredients}
                />
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
};

export default BurgerIngredients;
