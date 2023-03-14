import { useState, useRef, useEffect } from "react";
import style from "./reset-password.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  resetPassword,
  setForgotPasswordState,
} from "../../services/actions/user";
import { useDispatch, useSelector } from "react-redux";

const ResetPassword = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isPasswordForgot = useSelector(
    (state) => state.userReducer.isPasswordForgot
  );
  const location = useLocation();
  const userData = useSelector((state) => state.userReducer.userData);

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!password || !code) {
      return;
    }

    dispatch(resetPassword(password, code));
    dispatch(setForgotPasswordState(false));
    setCode("");
    setPassword("");
    navigate("/");
  };

  useEffect(() => {
    if (userData) {
      location.state && location.state.previousLocation
        ? navigate(location.state.previousLocation.pathname)
        : navigate("/");
    } else {
      !isPasswordForgot && navigate("/forgot-password");
    }
  }, [userData, navigate, location, isPasswordForgot]);

  return (
    <main className={style.container}>
      <form className={style.form} onSubmit={onSubmit}>
        <h1 className={`${style.title} text text_type_main-medium mb-6`}>
          Восстановление пароля
        </h1>
        <PasswordInput
          name={"password"}
          placeholder={"Введите новый пароль"}
          value={password}
          onChange={onPasswordChange}
        />
        <div className="mb-6 mt-6">
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            name={"e-mail"}
            value={code}
            error={false}
            ref={ref}
            errorText={"Ошибка"}
            size={"default"}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
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

export default ResetPassword;
