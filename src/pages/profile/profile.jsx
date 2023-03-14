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
import { ProfileNavigation } from "./profile-nav";

const Profile = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleLogout = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    dispatch(logout(refreshToken));
  };

  const userData = useSelector((state) => state.userReducer.userData);
  const accessToken = useSelector((state) => state.userReducer.accessToken);

  const [nameValue, setNameValue] = useState("?");
  const [loginValue, setLoginValue] = useState("?");
  const [passwordValue, setPasswordValue] = useState("");
  const [isDataChanged, setIsDataChanged] = useState(false);
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const onNameClick = () => nameInputRef.current.focus();

  const oтEmailClick = () => emailInputRef.current.focus();

  const onPasswordClick = () => passwordInputRef.current.focus();

  const onNameChange = (evt) => {
    const value = evt.target.value;
    setNameValue(value);
    value === userData.name ? setIsDataChanged(false) : setIsDataChanged(true);
  };

  const onEmailChange = (evt) => {
    const value = evt.target.value;
    setLoginValue(value);
    value === userData.email ? setIsDataChanged(false) : setIsDataChanged(true);
  };

  const onPasswordChange = (evt) => {
    const value = evt.target.value;
    setPasswordValue(value);
    value === passwordValue ? setIsDataChanged(false) : setIsDataChanged(true);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch(updateUserData(accessToken, nameValue, loginValue, passwordValue));
  };

  const onCancelEditing = (evt) => {
    evt.preventDefault();
    setNameValue(userData.name);
    setLoginValue(userData.email);
    setPasswordValue("");
  };

  useEffect(() => {
    if (userData) {
      setLoginValue(userData.email);
      setNameValue(userData.name);
      setPasswordValue("");
    }
  }, [userData]);

  return (
    <main className={style.container}>
      <ProfileNavigation />
      {/* <Routes>
          <Route
            exact
            path="/profile"
            element={ */}
      <form className={style.form} onSubmit={onSubmit}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onNameChange}
          icon={"EditIcon"}
          value={nameValue}
          name={"name"}
          error={false}
          ref={nameInputRef}
          onIconClick={onNameClick}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Input
          type={"text"}
          placeholder={"Логин"}
          onChange={onEmailChange}
          icon={"EditIcon"}
          value={loginValue}
          name={"name"}
          error={false}
          ref={emailInputRef}
          onIconClick={oтEmailClick}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Input
          type={"text"}
          placeholder={"Пароль"}
          onChange={onPasswordChange}
          icon={"EditIcon"}
          value={passwordValue}
          name={"name"}
          error={false}
          ref={passwordInputRef}
          onIconClick={onPasswordClick}
          errorText={"Ошибка"}
          size={"default"}
        />
        {isDataChanged && (
          <div className={style.buttons_container}>
            <Button
              htmlType="submit"
              onClick={onCancelEditing}
              type="secondary"
              size="medium"
            >
              Отмена
            </Button>
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        )}
      </form>
      {/* }
          />
        </Routes> */}
    </main>
  );
};
export default Profile;
