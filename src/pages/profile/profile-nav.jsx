import style from "./profile.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  NavLink,
  Route,
  useMatch,
  useLocation,
  Routes,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { logout } from "../../services/actions/user";
import OrderHistory from "../../components/order-history/order-history";
import { updateUserData } from "../../services/actions/user";

export const ProfileNavigation = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleLogout = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    dispatch(logout(refreshToken));
  };

  return (
    <section className={style.navBar}>
      <nav className={style.navigation}>
        <ul className={`${style.list}`}>
          <li className={style.list_item}>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${style.link_active} ${style.link} text text_type_main-medium`
                  : `${style.link} text text_type_main-medium`
              }
              to={`${pathname}`}
              exact
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${style.link_active} ${style.link} text text_type_main-medium`
                  : `${style.link} text text_type_main-medium`
              }
              to={`${pathname}/orders`}
            >
              История заказов
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isActive
                  ? `${style.link_active} ${style.link} text text_type_main-medium`
                  : `${style.link} text text_type_main-medium`
              }
              to="/login"
              onClick={handleLogout}
            >
              Выход
            </NavLink>
          </li>
        </ul>
        {pathname === "/profile" ? (
          <div className="pt-20">
            <span className="text text_type_main-default text_color_inactive">
              В этом разделе вы можете изменить свои персональные данные
            </span>
          </div>
        ) : null}
      </nav>
    </section>
  );
};
