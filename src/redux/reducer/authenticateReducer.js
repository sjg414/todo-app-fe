import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  user: null,
};

//인증관련 슬라이스
const authenticateSlice = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      //로그인 성공 시 user 정보 저장
      state.user = action.payload.user;
    },
    logoutSuccess(state, action) {
      //로그아웃 시 초기화
      state.user = null;
      sessionStorage.removeItem("token");
    },
  },
});

export const authenticateActions = authenticateSlice.actions;
export default authenticateSlice.reducer;
