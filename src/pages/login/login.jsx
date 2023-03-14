import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../../services/actions/user";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./login.module.css";

const Login = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state) => state.userReducer.userData);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userData) {
      location.state && location.state.previousLocation
        ? navigate(location.state.previousLocation.pathname)
        : navigate("/");
    }
  }, [userData, navigate, location]);

  return (
    <main className={style.container}>
      <form className={style.form} onSubmit={onSubmit}>
        <h1 className={`${style.title} text text_type_main-medium`}>Вход</h1>
        <div className="mt-6 mb-6">
          <Input
            type={"text"}
            placeholder={"E-mail"}
            ref={ref}
            name={"e-mail"}
            value={email}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <PasswordInput
            name={"password"}
            value={password}
            onChange={onPasswordChange}
          />
        </div>
        <Button htmlType="submit" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        {"Вы — новый пользователь? "}
        <Link className={style.link} to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        {"Забыли пароль? "}
        <Link className={style.link} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </main>
  );
};

export default Login;
