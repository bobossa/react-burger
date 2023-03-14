import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registration } from "../../services/actions/user";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./register.module.css";

const Register = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer.userData);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    userData && navigate("/");
  }, [userData, navigate]);

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return;
    }
    dispatch(registration(email, name, password));
  };

  return (
    <main className={style.container}>
      <form className={style.form} onSubmit={onSubmit}>
        <h1 className={`${style.title} text text_type_main-medium`}>
          Регистрация
        </h1>
        <div className="mt-6 mb-6">
          <Input
            type={"text"}
            placeholder={"Имя"}
            ref={ref}
            name={"name"}
            value={name}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-6">
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
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        {"Уже зарегистрированы? "}
        <Link className={style.link} to="/login">
          Войти
        </Link>
      </p>
    </main>
  );
};

export default Register;
