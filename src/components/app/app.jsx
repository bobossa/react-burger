import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AppHeader from "../header/header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Error from "../error/error";
import Loading from "../loading/loading";
import { getIngredients } from "../../services/actions/ingredients";
import style from "./app.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function App() {
  const [data, setData] = React.useState([]);
  const [hasError, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const ingredientsReq = useSelector(
    (store) => store.ingredientReducer.ingredientsReq
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={`${style.app} pb-10`}>
      <AppHeader />
      <main className={style.main}>
        <section className={style.main_container}>
          {hasError ? (
            <Error />
          ) : ingredientsReq ? (
            <Loading />
          ) : (
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients data={data} />
              <BurgerConstructor />
            </DndProvider>
          )}
        </section>
      </main>
    </div>
  );
}
