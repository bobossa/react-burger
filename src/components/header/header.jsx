import React from "react";
import {
  Logo,
  ProfileIcon,
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./header.module.css";

const AppHeader = () => {
  return (
    <header className={`${style.header} text text_type_main-default pt-4 pb-4`}>
      <nav>
        <ul className={style.list}>
          <li>
            <a
              href="#"
              className={`pt-5 pr-5 pb-5 ${style.link_active} ${style.link}`}
            >
              <BurgerIcon type="primary" />
              <span className={`ml-2`}>Конструктор</span>
            </a>
          </li>
          <li>
            <a href="#" className={`p-5 ${style.link}`}>
              <ListIcon type="secondary" />
              <span className={`ml-2`}>Лента заказов</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className={style.logo}>
        <Logo />
      </div>
      <a href="#" className={`p-5 ${style.link} ${style.profile}`}>
        <ProfileIcon type="secondary" />
        <span className={`ml-2`}>Личный кабинет</span>
      </a>
    </header>
  );
};
export default AppHeader;
