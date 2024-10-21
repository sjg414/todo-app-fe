import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../utils/api";
import { useDispatch } from "react-redux";
import { authenticateAction } from "../redux/actions/authenticateAction";

const LoginPage = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/user/login", { email, password });
      if (response.status === 200) {
        //로그인 성공 시
        setUser(response.data.user);
        sessionStorage.setItem("token", response.data.token); //세션스토리지에 토큰 값 저장
        api.defaults.headers["authorization"] = "Bearer " + response.data.token; //헤더에 토큰 값 저장(get 호출 시 BE에서 헤더에서 토큰값을 읽기 위해서)
        dispatch(authenticateAction.login(response.data.token));
        setError("");
        alert("로그인에 성공하였습니다.");
        navigate("/");
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="display-center">
      {error && <div className="error-font">{error}</div>}
      <Form className="login-box" onSubmit={handleLogin}>
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
