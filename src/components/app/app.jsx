import React from "react";
import AppHeader from "../header/header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Error from "../error/error";
import Loading from "../loading/loading";
import { getIngredients } from "../../utils/burger-api";
import style from "./app.module.css";

export default function App() {
  const [data, setData] = React.useState([]);
  const [hasError, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const json = await getIngredients();
        setData(json.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <div className={`${style.app} pb-10`}>
      <AppHeader />
      <main className={style.main}>
        <section className={style.main_container}>
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
