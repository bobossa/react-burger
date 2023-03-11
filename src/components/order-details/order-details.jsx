import React from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./order-details.module.css";
import done from "../../images/done.png";
import PropTypes from "prop-types";

const OrderDetails = () => {
  const data = useSelector((store) => store.orderDetails);
  console.log(data);
  return (
    <div className={`${style.container}`}>
      <h3 className={`text text_type_digits-large pt-10 ${style.title}`}>
        {data.order.number}
      </h3>
      <p className="text text_type_main-medium pt-8 pb-15">
        идентификатор заказа
      </p>
      <img className="pb-15" src={done} alt="done" />

      <p className="text text_type_main-default pb-2">
        {data.success
          ? `Ваш '${data.name}' начали готовить`
          : "Ваш заказ в очереди на приготовление"}
      </p>
      {data.success && (
        <p className="text text_type_main-default text_color_inactive pb-15">
          Дождитесь готовности на орбитальной станции
        </p>
      )}
    </div>
  );
};

OrderDetails.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    order: PropTypes.shape({
      number: PropTypes.number.isRequired,
    }).isRequired,
    success: PropTypes.bool.isRequired,
  }).isRequired,
};

export default OrderDetails;
