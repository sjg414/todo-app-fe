import { authenticateActions } from "../reducer/authenticateReducer";

function login(token) {
  return (dispatch, getState) => {
    dispatch(authenticateActions.loginSuccess({ token }));
  };
}

function logout() {
  return (dispatch, getState) => {
    dispatch(authenticateActions.logoutSuccess());
  };
}

export const authenticateAction = { login, logout };
