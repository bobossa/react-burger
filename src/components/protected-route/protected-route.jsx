import { Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const userData = useSelector((state) => state.userReducer.userData);
  const location = useLocation();
  console.log(userData);
  console.log(children);

  if (userData) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} />;
  }
};

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
