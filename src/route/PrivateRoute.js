import React from "react";
import { useSelector } from "react-redux";
import TodoPage from "../pages/TodoPage";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  return user ? (
    children //하위 페이지가 자동으로 들어가진다.(따로 props로 넘겨줄 필요 없음!!)
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
