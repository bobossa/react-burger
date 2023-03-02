import React from "react";
import appStyles from "./app.module.css";

import AppHeader from "../header/header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Error from "../error/error";
import Loading from "../loading/loading";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredients-details/ingredient-details";
import { getIngredients } from "../../utils/burger-api";

export default function App() {
  const [data, setData] = React.useState([]);
  const [hasError, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const json = await getIngredients();
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
              <BurgerIngredients data={data} />
              <BurgerConstructor data={data} />
            </>
          )}
        </section>
      </main>
    </div>
  );
}
