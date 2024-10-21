import React from "react";
import { useSelector } from "react-redux";
import TodoPage from "../pages/TodoPage";
import { Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const authenticate = useSelector((state) => state.auth.authenticate);
  const token = useSelector((state) => state.auth.token);
  const sessionToken = sessionStorage.getItem("token");
  return authenticate === true && token === sessionToken ? (
    <TodoPage />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
