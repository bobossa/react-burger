import React from "react";
import appStyles from "./app.module.css";

import AppHeader from "../header/header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Error from "../error/error";
import Loading from "../loading/loading";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredients-details/ingredient-details";
import { GET_DATA_URL } from "../../utils/constants";
import { ORDER_DATA } from "../../utils/constants";

export default function App() {
  const [data, setData] = React.useState([]);
  const [hasError, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [targetIndegrient, setTargetIndegrient] = React.useState({});
  const [isIngredientsModalOpen, setIngredientModalOpen] =
    React.useState(false);
  const [isOrderDetailsModalOpen, setOrderDetailsModalOpen] =
    React.useState(false);
  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(GET_DATA_URL);
        const json = await res.json();
        setData(json.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div className={`${appStyles.app} pb-10`}>
      <AppHeader />
      <main className={appStyles.main}>
        <section className={appStyles.main_container}>
          {hasError ? (
            <Error />
          ) : loading ? (
            <Loading />
          ) : (
            <>
              <BurgerIngredients
                data={data}
                setIngredientModalOpen={setIngredientModalOpen}
                setTargetIndegrient={setTargetIndegrient}
              />
              <BurgerConstructor
                data={data}
                setOrderDetailsModalOpen={setOrderDetailsModalOpen}
              />
              {isOrderDetailsModalOpen && (
                <Modal onClose={setOrderDetailsModalOpen}>
                  <OrderDetails
                    onClose={setOrderDetailsModalOpen}
                    data={ORDER_DATA}
                  />
                </Modal>
              )}

              {isIngredientsModalOpen && (
                <Modal
                  title="Детали ингредиентов"
                  onClose={setIngredientModalOpen}
                >
                  <IngredientDetails
                    onClose={setIngredientModalOpen}
                    data={targetIndegrient}
                  />
                </Modal>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
}
