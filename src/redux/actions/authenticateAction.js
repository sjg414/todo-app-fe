import { authenticateActions } from "../reducer/authenticateReducer";

function login(token, user) {
  return (dispatch, getState) => {
    dispatch(authenticateActions.loginSuccess({ token, user }));
  };
}

function logout() {
  return (dispatch, getState) => {
    dispatch(authenticateActions.logoutSuccess());
  };
}

export const authenticateAction = { login, logout };
