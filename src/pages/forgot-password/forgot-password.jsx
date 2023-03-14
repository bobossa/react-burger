import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  forgotPassword,
  setForgotPasswordState,
} from "../../services/actions/user";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./forgot-password.module.css";

const ForgotPassword = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      return;
    }
    dispatch(forgotPassword(email));
    dispatch(setForgotPasswordState(true));
    setEmail("");
    navigate("/reset-password");
  };

  return (
    <main className={style.container}>
      <form className={style.form} onSubmit={onSubmit}>
        <h1 className={`${style.title} text text_type_main-medium mb-6`}>
          Восстановление пароля
        </h1>
        <div className="mb-6">
          <Input
            type={"text"}
            placeholder={"Укажите e-mail"}
            ref={ref}
            name={"e-mail"}
            value={email}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            onChange={(evt) => setEmail(evt.target.value)}
          />
        </div>
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        {"Вспомнили пароль? "}
        <Link className={style.link} to="/login">
          Войти
        </Link>
      </p>
    </main>
  );
};

export default ForgotPassword;
