import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./route/PrivateRoute";
import TodoPage from "./pages/TodoPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginWithToken } from "./redux/reducer/authenticateSlice";

function App() {
  const dispatch = useDispatch();

  //토큰을 통해 유저정보를 가져온다
  const getUser = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch(loginWithToken());
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
