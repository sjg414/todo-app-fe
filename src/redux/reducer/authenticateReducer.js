import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  user: null,
  token: "",
  authenticate: false,
};

const authenticateSlice = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      //로그인 성공 시 토큰값 저장 및 authenticate 값 true로 변경
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.authenticate = true;
    },
    logoutSuccess(state, action) {
      //로그아웃 시 초기화
      state.user = null;
      state.token = "";
      state.authenticate = false;
    },
  },
});

export const authenticateActions = authenticateSlice.actions;
export default authenticateSlice.reducer;
