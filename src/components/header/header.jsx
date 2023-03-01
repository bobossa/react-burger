import React from "react";
import {
  Logo,
  ProfileIcon,
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./header.module.css";

const AppHeader = () => {
  return (
    <header
      className={`${headerStyles.header} text text_type_main-default pt-4 pb-4`}
    >
      <nav>
        <ul className={headerStyles.list}>
          <li>
            <a
              href="#"
              className={`pt-5 pr-5 pb-5 ${headerStyles.link_active} ${headerStyles.link}`}
            >
              <BurgerIcon type="primary" />
              <span className={`ml-2`}>Конструктор</span>
            </a>
          </li>
          <li>
            <a href="#" className={`p-5 ${headerStyles.link}`}>
              <ListIcon type="secondary" />
              <span className={`ml-2`}>Лента заказов</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className={headerStyles.logo}>
        <Logo />
      </div>
      <a
        href="#"
        className={`p-5 ${headerStyles.link} ${headerStyles.profile}`}
      >
        <ProfileIcon type="secondary" />
        <span className={`ml-2`}>Личный кабинет</span>
      </a>
    </header>
  );
};
export default AppHeader;
