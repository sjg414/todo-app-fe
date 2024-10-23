import { authenticateActions } from "../reducer/authenticateReducer";

function login(user) {
  return (dispatch, getState) => {
    dispatch(authenticateActions.loginSuccess({ user }));
  };
}

function logout() {
  return (dispatch, getState) => {
    dispatch(authenticateActions.logoutSuccess());
  };
}

export const authenticateAction = { login, logout };
