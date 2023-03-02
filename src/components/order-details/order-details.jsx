import orderDetailsStyles from "./order-details.module.css";
import done from "../../images/done.png";
import PropTypes from "prop-types";
import { IngredientType } from "../../utils/prop-types";

const OrderDetails = ({ data }) => {
  return (
    <div className={`${orderDetailsStyles.container}`}>
      <h3
        className={`text text_type_digits-large pt-10 ${orderDetailsStyles.title}`}
      >
        {data.orderNumber}
      </h3>
      <p className="text text_type_main-medium pt-8 pb-15">
        идентификатор заказа
      </p>
      <img className="pb-15" src={done} alt="done" />
      <p className="text text_type_main-default pb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive pb-15">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

OrderDetails.propTypes = {
  data: PropTypes.shape({ IngredientType }).isRequired,
};

export default OrderDetails;
