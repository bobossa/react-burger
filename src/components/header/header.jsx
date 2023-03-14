import React from "react";
import {
  Logo,
  ProfileIcon,
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./header.module.css";
import { NavLink, Link } from "react-router-dom";

const AppHeader = () => {
  return (
    <header className={`${style.header} text text_type_main-default pt-4 pb-4`}>
      <nav>
        <ul className={style.list}>
          <li>
            <NavLink
              exact={true}
              className={({ isActive, isPending }) =>
                isActive
                  ? `pt-5 pr-5 pb-5 ${style.link_active}`
                  : `pt-5 pr-5 pb-5 ${style.link}`
              }
              to="/"
            >
              <BurgerIcon type="primary" />
              <span className={`ml-2`}>Конструктор</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              exact={true}
              className={({ isActive, isPending }) =>
                isActive ? `p-5 ${style.link_active}` : `p-5 ${style.link}`
              }
              to="/profile/orders"
            >
              <ListIcon type="secondary" />
              <span className={`ml-2`}>Лента заказов</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={style.logo}>
        <Link to={"/"}>
          <Logo />
        </Link>
      </div>
      <NavLink
        exact={true}
        className={({ isActive, isPending }) =>
          isActive
            ? `p-5 ${style.link_active} ${style.link} ${style.profile} `
            : `p-5 ${style.link} ${style.profile}`
        }
        to="/profile"
      >
        <ProfileIcon type="secondary" />
        <span className={`ml-2`}>Личный кабинет</span>
      </NavLink>
    </header>
  );
};
export default AppHeader;
