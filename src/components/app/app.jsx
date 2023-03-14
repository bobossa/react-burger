import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AppHeader from "../header/header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import Error from "../error/error";
import Loading from "../loading/loading";
import { getIngredients } from "../../services/actions/ingredients";
import { getUserData } from "../../services/actions/user";
import style from "./app.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import NotFound404 from "../../pages/not-found-404/not-found-404";
import ProtectedRoute from "../protected-route/protected-route";
import { useLocation, Routes, Route, useNavigate } from "react-router-dom";
import IngredientDetails from "../ingredients-details/ingredient-details";
import OrderHistory from "../order-history/order-history";
import { setIngredientModalOpen } from "../../services/actions/modal";

import { selectedIngredientDelete } from "../../services/actions/ingredients";
import Modal from "../modal/modal";

export default function App() {
  const [data, setData] = React.useState([]);
  const [hasError, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const accessToken = useSelector((state) => state.userReducer.accessToken);
  const ingredientsReq = useSelector(
    (store) => store.ingredientReducer.ingredientsReq
  );
  const [targetIndegrient, setTargetIndegrient] = React.useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const background =
    (navigate.action === "PUSH" || navigate.action === "REPLACE") &&
    location.state &&
    location.state?.background;
  console.log(navigate);

  React.useEffect(() => {
    dispatch(getUserData(accessToken));
    dispatch(getIngredients());
  }, [dispatch]);

  const isIngredientsModalOpen = useSelector(
    (store) => store.modalReducer.isIngredientsModalOpen
  );

  const onModalClose = () => {
    isIngredientsModalOpen && dispatch(setIngredientModalOpen(false));
    isIngredientsModalOpen && dispatch(selectedIngredientDelete());
    background && navigate(-1);
  };

  return (
    <div className={`${style.app} pb-10`}>
      <AppHeader />
      <Routes location={background || location}>
        <Route
          exact={true}
          path="/"
          element={
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
          }
        />
        <Route exact={true} path="/login" element={<Login />} />

        <Route exact={true} path="/register" element={<Register />} />

        <Route
          exact={true}
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          exact={true}
          path="/reset-password"
          element={<ResetPassword />}
        />

        <Route
          exact={true}
          path="/ingredients/:ingredientId"
          element={<IngredientDetails title="Детали ингредиента" />}
        />

        <Route
          exact={true}
          path="/profile/orders/:orderNumber"
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          }
        />

        <Route
          exact={true}
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound404 />} />
        {/* {background && (
          <Route
            exact={true}
            path="/ingredients/:ingredientId"
            element={
              <Modal title="Детали ингредиентов" onClose={onModalClose}>
                <IngredientDetails data={targetIndegrient} />
              </Modal>
            }
          />
        )} */}
      </Routes>
    </div>
  );
}
