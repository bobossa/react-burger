import {
  DragIcon,
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from "./burger-constructor.module.css";
import PropTypes from "prop-types";

const BurgerConstructor = ({ data, setOrderDetailsModalOpen }) => {
  const total = data.reduce((acc, cur) => acc + cur.price, 0);

  const handleOrderButtonClick = () => {
    setOrderDetailsModalOpen(true);
  };

  return (
    <div className={`${burgerConstructorStyle.constructor_container} pt-25`}>
      <div className="pr-6">
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${data[0].name} (верх)`}
          price={data[0].price}
          thumbnail={data[0].image}
        />
      </div>
      <ul className={`${burgerConstructorStyle.list} pl-4 pr-4`}>
        {data.map(
          (ingredient, index) =>
            index > 0 &&
            index < data.length - 1 && (
              <li key={index} className={burgerConstructorStyle.list_item}>
                <DragIcon />
                <ConstructorElement
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                />
              </li>
            )
        )}
      </ul>
      <div className="pr-6">
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${data[data.length - 1].name} (низ)`}
          price={data[data.length - 1].price}
          thumbnail={data[data.length - 1].image}
        />
      </div>

      <div className={`${burgerConstructorStyle.button_container} pt-6 pr-6`}>
        <div className="mr-10">
          <span className="text text_type_digits-medium mr-2">{total}</span>
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
  );
};

BurgerConstructor.propTypes = {
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
  setOrderDetailsModalOpen: PropTypes.func.isRequired,
};
export default BurgerConstructor;
