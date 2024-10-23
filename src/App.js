import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./route/PrivateRoute";
import TodoPage from "./pages/TodoPage";
import { useEffect } from "react";
import api from "./utils/api";
import { useDispatch } from "react-redux";
import { authenticateAction } from "./redux/actions/authenticateAction";

function App() {
  const dispatch = useDispatch();
  //토큰을 통해 유저정보를 가져온다
  const getUser = async () => {
    try {
      const storedToken = sessionStorage.getItem("token");
      if (storedToken) {
        const response = await api.get("/user/me");
        dispatch(authenticateAction.login(response.data.user));
      }
    } catch (error) {
      dispatch(authenticateAction.login(null));
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <TodoPage />
          </PrivateRoute>
        }
      />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
