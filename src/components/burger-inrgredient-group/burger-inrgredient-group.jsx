import BurgerIngredient from "../burger-ingredient/burger-ingredient";

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
          data={item}
          setTargetIndegrient={setTargetIndegrient}
          setIngredientModalOpen={setIngredientModalOpen}
        />
      )
  );
};

export default BurgerIngredientGroup;
